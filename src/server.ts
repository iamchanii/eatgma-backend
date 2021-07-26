import { getEnvelopedHandler } from './graphql/envelop';
import fastify from 'fastify';
import cors from 'fastify-cors';

const app = fastify();

app.register(cors, {
  origin: 'https://studio.apollographql.com',
});

app.route({
  method: ['POST'],
  url: '/graphql',
  async handler(req, res) {
    const result = await getEnvelopedHandler(req, (req) => ({
      headers: req.headers,
      method: req.method,
      query: req.query,
      body: req.body,
    }));

    if (result.type === 'RESPONSE') {
      res.status(result.status);
      res.send(result.payload);
    } else {
      res.send({ errors: [{ message: 'Not Supported.' }] });
    }
  },
});

app.listen(3000, () => {
  console.log(`GraphQL server is running...`);
});
