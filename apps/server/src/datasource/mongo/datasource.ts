import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';

type TMongoConfig = {
  databaseTest: string;
  databaseHost: string;
  database: string;
  databaseUrl: string;
  mongoOptions: ConnectOptions;
};

const mongoConfig: TMongoConfig = {
  databaseTest: process.env.YEMUSIC_DB_TEST,

  databaseHost: process.env.DB_HOST,
  database: process.env.DB_DEFAULT,

  databaseUrl: process.env.YEMUSIC_DB_CONNECTION_STRING,

  mongoOptions: {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    authSource: process.env.AUTH_SOURECE,
  },
};

export const connectMongoDB = async (): Promise<void> => {
  mongoose.connect(
    mongoConfig.databaseUrl ||
      `mongodb://${mongoConfig.databaseHost}/${mongoConfig.database}`,
    mongoConfig.mongoOptions,
    err => {
      if (err) {
        logger.info(`💩 mongodb connection failed ${err}`);
      } else {
        logger.info('🌈 hello from mongodb');
      }
    }
  );
};
