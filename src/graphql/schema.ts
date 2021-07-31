import { writeFileSync } from 'fs';
import { join } from 'path';
import { connectionDirective } from './directives/connection';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchema } from 'graphql';

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
  resolvers: {
    Query: {
      ping: (_, __, context) => {
        console.log(context.orm);
        return 'Pong!';
      },
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  const schemaPath = join(process.cwd(), 'schema.graphql');
  writeFileSync(schemaPath, printSchema(schema), { encoding: 'utf8' });
}
