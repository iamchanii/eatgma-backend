import { schema } from './schema';
import { envelop, useSchema } from '@envelop/core';
import { getGraphQLParameters, processRequest, Request } from 'graphql-helix';

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
