import type { GraphQLSchema } from 'graphql';

const TypeSystemDirectiveLocation = [
  'SCHEMA',
  'SCALAR',
  'OBJECT',
  'FIELD_DEFINITION',
  'ARGUMENT_DEFINITION',
  'INTERFACE',
  'UNION',
  'ENUM',
  'ENUM_VALUE',
  'INPUT_OBJECT',
  'INPUT_FIELD_DEFINITION',
] as const;

type TypeSystemDirectiveLocation = typeof TypeSystemDirectiveLocation[number];

export interface Directive<DirectiveName extends string> {
  typeDefs:
    | `directive @${DirectiveName} on ${TypeSystemDirectiveLocation}`
    | `directive @${DirectiveName} on ${TypeSystemDirectiveLocation} | ${string}`;
  transformer(schema: GraphQLSchema): GraphQLSchema;
}
