declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      MONGODB_NAME: string;
      COOKIE_SECRET: string;
      DOMAIN: string;
      SOCKET_IO_URL: string;
    }
  }
}

export {};
