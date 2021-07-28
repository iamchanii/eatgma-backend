import { join } from 'path';
import { connectionDirective } from './directives/connection';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

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
});
