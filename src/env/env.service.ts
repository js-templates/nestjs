import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvValues } from './env.validation'

@Injectable()
export class EnvService extends EnvValues {
  constructor(
    private configService: ConfigService<{ values: EnvValues }, true>,
  ) {
    super()
    Object.assign(this, configService.get('values', { infer: true }))
  }
}
