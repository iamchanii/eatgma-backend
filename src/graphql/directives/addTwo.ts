import { addTypes, visitSchema, VisitSchemaKind } from '@graphql-tools/utils';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const DIRECTIVE_NAME = 'addTwo';

export const addTwoDirective = {
  typeDefs: `directive @${DIRECTIVE_NAME} on OBJECT`,
  transformer: (schema: GraphQLSchema) => {
    const typesToAdd: Parameters<typeof addTypes>[1] = [];

    visitSchema(schema, {
      [VisitSchemaKind.OBJECT_TYPE]: (type) => {
        if (
          type.astNode?.directives?.some(
            (directive) => directive.name.value === DIRECTIVE_NAME
          )
        ) {
          typesToAdd.push(
            new GraphQLObjectType({
              ...type.toConfig(),
              name: `${type.name}Two`,
            })
          );
        }

        return undefined;
      },
    });

    return addTypes(schema, typesToAdd);
  },
};
