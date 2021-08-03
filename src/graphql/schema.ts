import { writeFileSync } from 'fs';
import { join } from 'path';
import { connectionDirective } from './directives/connection';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { introspectionFromSchema, printSchema } from 'graphql';

export const schema = makeExecutableSchema({
  typeDefs: [
    connectionDirective.typeDefs,
    mergeTypeDefs(
      loadFilesSync(join(process.cwd(), './src/models/'), {
        extensions: ['graphql'],
      })
    ),
  ],
  schemaTransforms: [connectionDirective.transformer],
  resolvers: mergeResolvers(
    loadFilesSync(join(process.cwd(), './src/models/**/*.resolver.ts')) as any[]
  ),
});

if (process.env.NODE_ENV !== 'production') {
  const schemaPath = join(process.cwd(), 'schema.graphql');
  writeFileSync(schemaPath, printSchema(schema), { encoding: 'utf8' });
}

export const introspection = introspectionFromSchema(schema);
