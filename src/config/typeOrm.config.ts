import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-145-249-177.compute-1.amazonaws.com',
  port: 5432,
  username: 'uewusldryzhkqz',
  password: 'e59c6349816406ad42ec645dacbfa4d067f2f68806e9e59b42f03258395c7b32',
  database: 'd398dsi23vav8l',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
