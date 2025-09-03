import { loadFiles } from '@graphql-tools/load-files';
import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { print } from 'graphql';
import { GraphQLSchema, buildSchema } from 'graphql';
import { Config, LoadTypes } from './types.js';

type fnSchema = (config: Config) => Promise<GraphQLSchema>;

export const schemaHandler: Record<LoadTypes, fnSchema> = {
  files: async (config) => {
    const schemaLoaded = await loadFiles(config.path, {
      extensions: ['string', 'graphql'],
    });
    const text = print(schemaLoaded[0]);
    return buildSchema(text, { assumeValidSDL: true });
  },
  sdl: async (config) => {
    const remoteSchema = await fetch(config.path);
    const sc = await remoteSchema.text();
    return buildSchema(sc);
  },
  url: async (config) => {
    const remoteSchema = await loadSchema(config.path, {
      loaders: [new UrlLoader()],
    });
    return remoteSchema;
  },
};
