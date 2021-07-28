import {
  addTypes,
  getDirectives,
  MapperKind,
  mapSchema,
} from '@graphql-tools/utils';
import {
  DirectiveNode,
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const DIRECTIVE_NAME = 'connection';

const getConnectionTypeName = (fieldConfig: GraphQLFieldConfig<any, any>) =>
  `${fieldConfig.type.toString()}Connection`;

const getEdgeTypeName = (fieldConfig: GraphQLFieldConfig<any, any>) =>
  `${fieldConfig.type.toString()}Edge`;

export const connectionDirective = {
  typeDefs: `directive @${DIRECTIVE_NAME} on FIELD_DEFINITION`,
  transformer: (schema: GraphQLSchema) => {
    const typesToAdd: GraphQLNamedType[] = [];
    const knownTypeMap = schema.getTypeMap();

    if (!knownTypeMap['PageInfo']) {
      knownTypeMap['PageInfo'] = new GraphQLObjectType({
        name: 'PageInfo',
        fields: {
          hasPreviousPage: { type: GraphQLNonNull(GraphQLBoolean) },
          hasNextPage: { type: GraphQLNonNull(GraphQLBoolean) },
          startCursor: { type: GraphQLNonNull(GraphQLString) },
          endCursor: { type: GraphQLNonNull(GraphQLString) },
        },
      });

      typesToAdd.push(knownTypeMap['PageInfo']);
    }

    return addTypes(
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const directives = getDirectives(schema, fieldConfig);
          const f = fieldConfig as any;

          if (directives[DIRECTIVE_NAME]) {
            if (!knownTypeMap[getEdgeTypeName(fieldConfig)]) {
              knownTypeMap[getEdgeTypeName(fieldConfig)] =
                new GraphQLObjectType({
                  name: getEdgeTypeName(fieldConfig),
                  fields: {
                    node: {
                      type: GraphQLNonNull(
                        knownTypeMap[fieldConfig.type.toString()]
                      ),
                    },
                    cursor: { type: GraphQLNonNull(GraphQLString) },
                  },
                });

              typesToAdd.push(knownTypeMap[getEdgeTypeName(fieldConfig)]);
            }

            if (!knownTypeMap[getConnectionTypeName(fieldConfig)]) {
              knownTypeMap[getConnectionTypeName(fieldConfig)] =
                new GraphQLObjectType({
                  name: getConnectionTypeName(fieldConfig),
                  fields: {
                    edges: {
                      type: GraphQLNonNull(
                        GraphQLList(
                          GraphQLNonNull(
                            knownTypeMap[getEdgeTypeName(fieldConfig)]
                          )
                        )
                      ),
                    },
                    pageInfo: {
                      type: GraphQLNonNull(knownTypeMap['PageInfo']),
                    },
                  },
                });

              typesToAdd.push(knownTypeMap[getConnectionTypeName(fieldConfig)]);
            }

            const directiveIndex = fieldConfig.astNode?.directives?.findIndex(
              (directive: DirectiveNode) =>
                directive.name.value !== DIRECTIVE_NAME
            );

            if (directiveIndex && directiveIndex >= 0) {
              f.astNode.directives.splice(directiveIndex, 1);
            }
          }

          return fieldConfig;
        },
      }),
      typesToAdd
    );
  },
};
