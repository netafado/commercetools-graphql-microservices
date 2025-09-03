import { AsyncExecutor } from '@graphql-tools/utils';
import type { Config } from '@ecommerce/common';

import { loadSchemaFromRemote } from '@ecommerce/common';
import { print } from 'graphql';
import fetch from 'node-fetch';

export const configRemote: Config = {
  type: 'sdl',
  path: 'https://raw.githubusercontent.com/commercetools/commercetools-api-reference/main/api-specs/graphql/schema.sdl',
};

const isString = (value: unknown): boolean => {
  return typeof value === 'string';
};

export const commercetoolsExecutor: AsyncExecutor = async ({
  document,
  variables,
  context,
}) => {
  const query = isString(document) ? document : print(document);
  const token =
    context && typeof context.token === 'string' ? context.token : undefined;
  if (!token) {
    throw new Error("Missing or invalid 'token' in executor context.");
  }
  const fetchResult = await fetch(
    `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).catch((error) => {
    throw new Error(error);
  });
  const result = await fetchResult.json();
  return result;
};

export const loadCommertoolsSchema = async (
  name = 'commercetools',
  config = configRemote
) => {
  return await loadSchemaFromRemote({
    name,
    config,
    executor: commercetoolsExecutor,
  });
};
