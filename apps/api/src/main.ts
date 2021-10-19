import { Handler } from "@netlify/functions";

import express from 'express';
import helmet from 'helmet';

export const app: express.Application = express();
app.use(helmet());


const handler: Handler = async (event, context) => {
  console.log('main running');
  console.log(event, context);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World4" }),
  };
};

export { handler };

