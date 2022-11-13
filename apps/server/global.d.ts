import type { DefaultLogger } from '@gln-libs/node-infrastructure';

declare global {
  interface IPrototype {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prototype: any;
  }

  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test';
      HTTP_SERVER_PORT?: string;
      HTTP_SERVER_CORS_ORIGIN?: string;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    type TypedMethodDecorator = <T extends Function>(
      target: object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ) => TypedPropertyDescriptor<T> | void;
  }

  // eslint-disable-next-line no-var
  var logger: DefaultLogger;
}

export {};
