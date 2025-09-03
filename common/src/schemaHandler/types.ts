import { Transform } from '@graphql-tools/delegate';
import { AsyncExecutor } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export type LoadTypes =  "files" | "sdl" | "url"


export type LoadServiceProps = {
  name: string;
  config: {
    type: LoadTypes
    path: string
  }
  executor: AsyncExecutor;
  merge?: Record<string, unknown>;
  transforms?: Transform[];
};

export type ReturnLoadSchemaFromRemote = Record<
  string,
  {
    schema: GraphQLSchema;
    executor: AsyncExecutor;
    merge?: Record<string, unknown>;
    transforms?: Array<Transform>;
  }
>;

export type LoadServiceOptions= {
  authType?: string;
  transforms?: Array<Transform>;
  merge?: boolean;
}

export type LoadServiceConfig = {
  url: string;
  sdl?: string;
  schema?: string;
}

export type Config = {
  type: LoadTypes
  path: string
}
