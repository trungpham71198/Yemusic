import '@app/config';

import { startHttpServer } from '@app/http.server';
import { connectMongoDB } from '@datasource/mongo';
import { defaultLogger } from '@gln-libs/node-infrastructure';

global.logger = defaultLogger();

const start = async () => {
  await connectMongoDB();
  startHttpServer();
};

start();
