import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailConfig from './mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule.forFeature(mailConfig)],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'),
          port: configService.get<number>('mail.port'),
          secure: configService.get<boolean>('mail.secure'),
          auth: {
            user: configService.get<string>('mail.auth.user'),
            pass: configService.get<string>('mail.auth.pass'),
          },
          tls: {
            minVersion: 'TLSv1.2', // 明确指定最低 TLS 版本
            ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA', // 安全加密套件
          },
        },
        defaults: {
          from: configService.get<string>('mail.defaults.from'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.qq.com', // QQ 邮箱 SMTP 服务器
    //     port: 465, // QQ 邮箱端口
    //     secure: true, // 使用 SSL
    //     auth: {
    //       user: '2572310928@qq.com', // 你的 QQ 邮箱
    //       pass: 'iftphuetxaxreabd', // 不是邮箱密码，是 SMTP 授权码
    //     },
    //     tls: {
    //       minVersion: 'TLSv1.2', // 明确指定最低 TLS 版本
    //       ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA', // 安全加密套件
    //     },
    //   },
    //   defaults: {
    //     from: '"飞歌家维" <2572310928@qq.com>', // 发件人信息
    //   },
    //   template: {
    //     dir: join(__dirname, 'templates'), // 模板目录
    //     adapter: new HandlebarsAdapter(), // 使用 Handlebars 模板引擎
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
