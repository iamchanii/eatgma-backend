import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(
    loadFilesSync(join(process.cwd(), './src/models/'), {
      extensions: ['graphql'],
    })
  ),
});
