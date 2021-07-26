import { envelop, useSchema } from '@envelop/core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getGraphQLParameters, processRequest, Request } from 'graphql-helix';

// TODO
const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'World',
    },
  },
});

const getEnveloped = envelop({
  plugins: [useSchema(schema)],
});

export const getEnvelopedHandler = <TRequest>(
  req: TRequest,
  getQueryParametersRequest: (req: TRequest) => Request
) => {
  const { parse, validate, contextFactory, execute, schema } = getEnveloped({
    req,
  });
  const request = getQueryParametersRequest(req);

  const { operationName, query, variables } = getGraphQLParameters(request);

  return processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
    parse,
    validate,
    execute,
    contextFactory,
  });
};
