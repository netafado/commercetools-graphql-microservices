import { GraphQLSchema } from 'graphql';
import { RemoteSchema, ServiceProps } from './types.js';
import { schemaHandler } from '../schemaHandler/index.js';

export const loadSchemaFromRemote = async ({
  name,
  config,
  executor,
  merge,
  transforms,
}: ServiceProps): Promise<RemoteSchema | undefined> => {
  let schema: GraphQLSchema | undefined;

  try {
    if (!config.path) {
      console.error(`Unable to load the schema:[${name}]`);
      return;
    }
    schema = await schemaHandler[config.type](config);
  } catch (e) {
    console.error(e);
  }

  return schema
    ? {
        [name]: {
          schema,
          executor,
          merge,
          transforms,
        },
      }
    : undefined;
};
