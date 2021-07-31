import { IResolvers } from '../../graphql/__generated';

const resolver: IResolvers = {
  Query: {
    users: async (_, __, { orm }) => {
      return {
        edges: [],
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
      };
    },
  },
};

export default resolver;
