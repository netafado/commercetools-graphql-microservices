import { MergedTypeConfig, Transform } from '@graphql-tools/delegate';
import { AsyncExecutor } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export type LoadTypes = 'files' | 'sdl' | 'url';

export type SchemaProps = {
  schema: GraphQLSchema;
  executor: AsyncExecutor;
  merge?: Record<string, MergedTypeConfig<any, any, Record<string, any>>>;
  transforms?: Array<Transform>;
};
export type RemoteSchema = Record<string, SchemaProps>;

export type ServiceProps = Omit<SchemaProps, 'schema'> & {
  name: string;
  config: {
    type: LoadTypes;
    path: string;
  };
};

export type Options = {
  authType?: string;
  transforms?: Array<Transform>;
  merge?: boolean;
};

export type ServiceConfig = {
  url: string;
  sdl?: string;
  schema?: string;
};

export type Config = {
  type: LoadTypes;
  path: string;
};
