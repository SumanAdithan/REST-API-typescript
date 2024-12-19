declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: string;
        DB_LOCAL_URI: string;
        SESSION_SECRET: string;
        [key: string]: string | undefined;
    }
}
