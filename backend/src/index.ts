/// <reference types="./types/express" />
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { stitchedSchema } from './utils/schemaStitching';
import connectDB from './utils/connectDB';
import { authenticate } from './utils/authMiddleware';
import { generateToken } from './utils/tokenGeneration';
import { AccessLog } from './models/accessLog';
import cors from 'cors';
import { config } from 'dotenv';
import { mergeSchemas } from '@graphql-tools/schema';
config();

export const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'password';

  if (username === hardcodedUsername && password === hardcodedPassword) {
    const token = generateToken(username);
    await new AccessLog({ query: 'login', user: username }).save();
    return res.json({ token });
  } else {
    return res.status(401).send('Invalid credentials');
  }
});

app.use(authenticate);

const apolloServer = new ApolloServer({
  schema: stitchedSchema,
  context: ({ req }) => ({ user: req.user }),
});

connectDB().then(() => {
  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app });
    const PORT = 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
});
