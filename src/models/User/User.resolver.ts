import { IResolvers } from '../../graphql/__generated';
import { User } from './User.entity';
import { UserErrorCodes } from './errorCodes';
import { createAccessToken, createRefreshToken } from './lib/jwtUtils';
import { comparePassword, encryptPassword } from './lib/passwordUtils';
import { EnvelopError } from '@envelop/core';

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
  Mutation: {
    login: async (_, { input }, { orm }) => {
      const user = await orm.em.findOne(User, {
        email: input.email,
      });

      if (!user || !comparePassword(input.password, user.password)) {
        throw new EnvelopError('이메일 또는 패스워드를 확인해주세요.', {
          code: UserErrorCodes.INVALID_CREDENTIALS,
        });
      }

      const refreshToken = createRefreshToken();
      user.refreshToken = refreshToken;
      await orm.em.flush();

      const userNode = user.toNode();

      return {
        user: userNode,
        accessToken: createAccessToken(userNode),
        refreshToken,
      };
    },

    register: async (_, { input }, { orm }) => {
      const [, count] = await orm.em.findAndCount(User, {
        email: input.email,
      });

      if (count > 0) {
        throw new EnvelopError('이미 사용중인 이메일입니다.', {
          code: UserErrorCodes.ALREADY_USED_EMAIL,
        });
      }

      const user = new User();
      user.email = input.email;
      user.password = encryptPassword(input.password);
      await orm.em.persistAndFlush(user);

      return {
        user: user.toNode(),
      };
    },

    refreshToken: async (_, { input }, { orm }) => {
      const user = await orm.em.findOne(User, {
        refreshToken: input.refreshToken,
      });

      if (!user) {
        throw new EnvelopError('유효하지 않은 리프레시 토큰입니다.', {
          code: UserErrorCodes.INVALID_REFRESH_TOKEN,
        });
      }

      const accessToken = createAccessToken(user.toNode());
      const refreshToken = createRefreshToken();

      user.refreshToken = refreshToken;
      await orm.em.flush();

      return {
        accessToken,
        refreshToken,
      };
    },
  },
};

export default resolver;
