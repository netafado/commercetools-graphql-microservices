const { ApolloServer } = require('@apollo/server');

const {
  startServerAndCreateLambdaHandler,
  handlers,
} = require('@as-integrations/aws-lambda');
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { loadCommertoolsSchema } from './commercetools/schemaLoad/index.js';
import { stitchSchemas } from '@graphql-tools/stitch';
import { RemoteSchema } from '@ecommerce/common';

let graphQlServer: (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<void>;

const objectToArray = (obj?: RemoteSchema) => {
  if (!obj) {
    return [];
  }
  return Object.keys(obj).map((s) => obj[s]);
};

async function initializeServer() {
  const ctSchema = await loadCommertoolsSchema();

  const schema = stitchSchemas({
    subschemas: [...objectToArray(ctSchema)],
  });
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  graphQlServer = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventRequestHandler()
  );
}

// Initialize on cold start
initializeServer();

export const graphqlHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  if (!graphQlServer) {
    await initializeServer();
  }
  return graphQlServer(event, context);
};
