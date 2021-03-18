import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from "path";
import { StoreModule } from "./modules/store/store.module";

import { AdminModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MorganModule, MorganInterceptor } from "nest-morgan";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ envFilePath: './development.env' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: "/"
    }),
    AdminModule,
    AuthModule,
    StoreModule,
    MorganModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined')
    }
  ],
})
export class AppModule {}
