import { createContext } from './context';
import { schema } from './schema';
import {
  envelop,
  useExtendContext,
  useLogger,
  useMaskedErrors,
  useSchema,
  Plugin,
} from '@envelop/core';
import { getGraphQLParameters, processRequest, Request } from 'graphql-helix';

const getEnveloped = envelop({
  plugins: [
    useSchema(schema),
    useExtendContext(createContext),
    useLogger(),
    process.env.NODE_ENV === 'production' && useMaskedErrors(),
  ].filter(Boolean) as Plugin[],
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
