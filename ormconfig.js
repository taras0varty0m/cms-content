module.exports = {
  migrations: ["dist/migration/**/*.ts"],
  entities: ["dist/**/entities/*.entity.ts"],
  cli: {
    migrationsDir: "src/migration",
  },
  type: process.env.CONNECTION,
  host: process.env.DB_HOST ?? "localhost",
  username: process.env.USERNAME ?? "example",
  password: process.env.PASSWORD ?? "example",
  database: process.env.DATABASE ?? "example",
  port: 5432,
  autoLoadEntities: true,
  synchronize: true,
  logger: "simple-console",
  logging: "all",
};
