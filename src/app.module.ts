import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { appConf, packageDir } from "./context";
import { AccountModule } from "./modules/account/account.module";
import { AuthModule } from "./modules/auth/auth.module";
import { LoginModule } from "./modules/login/login.module";
import { MyCustomLogger } from "./typeorm-custom-logger";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: appConf.sqliteFiles.primary,
      enableWAL: false,
      entities: [`${packageDir}/dist/**/*.entity.js`],
      synchronize: false,
      logging: true,
      logger: new MyCustomLogger(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(packageDir, 'schema.gql'),
      sortSchema: true,
    }),
    AuthModule,
    AccountModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
