import { Config as IConfig } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Application as IApplication } from './application.interface.js';

export class Application implements IApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: IConfig
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
