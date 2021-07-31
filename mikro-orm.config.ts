import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  metadataProvider: TsMorphMetadataProvider,
  cache: {
    enabled: true,
  },
  entities: ['src/models/**/*.entity.ts'],
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
} as Options;
