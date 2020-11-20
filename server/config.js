const config = {
    app: {
        port: parseInt(process.env.APP_PORT) || 3001
    },
    db: {
        client: process.env.DB_CLIENT || 'pg',
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASE || 'postgres'
    }
};

export default config;