import {
  addTypes,
  getDirectives,
  MapperKind,
  mapSchema,
} from '@graphql-tools/utils';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const DIRECTIVE_NAME = 'connection';

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

          if (directives[DIRECTIVE_NAME]) {
            const typeName = fieldConfig.type.toString();
            const connectionTypeName = `${typeName}Connection`;
            const edgeTypeName = `${typeName}Edge`;

            if (!knownTypeMap[edgeTypeName]) {
              knownTypeMap[edgeTypeName] = new GraphQLObjectType({
                name: edgeTypeName,
                fields: {
                  node: {
                    type: GraphQLNonNull(knownTypeMap[typeName]),
                  },
                  cursor: { type: GraphQLNonNull(GraphQLString) },
                },
              });

              typesToAdd.push(knownTypeMap[edgeTypeName]);
            }

            if (!knownTypeMap[connectionTypeName]) {
              knownTypeMap[connectionTypeName] = new GraphQLObjectType({
                name: connectionTypeName,
                fields: {
                  edges: {
                    type: GraphQLNonNull(
                      GraphQLList(GraphQLNonNull(knownTypeMap[edgeTypeName]))
                    ),
                  },
                  pageInfo: {
                    type: GraphQLNonNull(knownTypeMap['PageInfo']),
                  },
                },
              });

              typesToAdd.push(knownTypeMap[connectionTypeName]);
            }

            fieldConfig.type = knownTypeMap[
              connectionTypeName
            ] as GraphQLOutputType;

            if (!fieldConfig.args) {
              fieldConfig.args = {};
            }

            fieldConfig.args.first = { type: GraphQLInt };
            fieldConfig.args.after = { type: GraphQLString };
            fieldConfig.args.last = { type: GraphQLInt };
            fieldConfig.args.before = { type: GraphQLString };
          }

          return fieldConfig;
        },
      }),
      typesToAdd
    );
  },
};
