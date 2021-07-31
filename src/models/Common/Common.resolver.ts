import { IResolvers } from '../../graphql/__generated';

const resolvers: IResolvers = {
  Query: {
    ping: () => {
      return 'Pong!';
    },
  },
};

export default resolvers;
