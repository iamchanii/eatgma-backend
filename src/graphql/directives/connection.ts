import {
  addTypes,
  getDirectives,
  MapperKind,
  mapSchema,
} from '@graphql-tools/utils';
import {
  GraphQLBoolean,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { connectionArgs, connectionDefinitions } from 'graphql-relay';

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

            const { connectionType, edgeType } = connectionDefinitions({
              nodeType: knownTypeMap[typeName],
            });

            if (!knownTypeMap[connectionType.name]) {
              typesToAdd.push(connectionType);
            }

            if (!knownTypeMap[edgeType.name]) {
              typesToAdd.push(edgeType);
            }

            fieldConfig.type = connectionType;
            Object.assign(fieldConfig.args, connectionArgs);

            return fieldConfig;
          }
        },
      }),
      typesToAdd
    );
  },
};
