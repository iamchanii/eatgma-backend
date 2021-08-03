import { OwnContext } from '../context';
import { Directive } from '../types';
import { EnvelopError } from '@envelop/core';
import { getDirectives, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLFieldConfig } from 'graphql';

const DIRECTIVE_NAME = 'public';

const isFieldConfig = (value: any): value is GraphQLFieldConfig<any, any> =>
  !!value && value.resolve !== undefined;

export const publicDirective: Directive<typeof DIRECTIVE_NAME> = {
  typeDefs: 'directive @public on FIELD_DEFINITION',
  transformer: (schema) => {
    return mapSchema(schema, {
      [MapperKind.FIELD]: (fieldConfig) => {
        const directives = getDirectives(schema, fieldConfig);

        if (!directives[DIRECTIVE_NAME] && isFieldConfig(fieldConfig)) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async (source, args, ctx: OwnContext, info) => {
            if (!ctx.user) {
              throw new EnvelopError('인증 정보가 없습니다.');
            }
            return resolve(source, args, ctx, info);
          };

          return fieldConfig;
        }
      },
    });
  },
};
