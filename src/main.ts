import { INestApplication, ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env'

function setupCors(app: INestApplication) {
  const env = app.get(EnvService)

  const options: CorsOptions = {
    origin: new RegExp(env.domain + '$'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }

  app.enableCors(options)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableShutdownHooks()

  setupCors(app)

  await app.listen(3000)
}

void bootstrap()

process.once('SIGUSR2', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
