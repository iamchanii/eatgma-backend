import { join } from 'path';
import { addTwoDirective } from './directives/addTwo';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
  typeDefs: [
    addTwoDirective.typeDefs,
    mergeTypeDefs(
      loadFilesSync(join(process.cwd(), './src/models/'), {
        extensions: ['graphql'],
      })
    ),
  ],
  schemaTransforms: [addTwoDirective.transformer],
});
