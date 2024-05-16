import { Logger } from '../shared/libs/logger/index.js';
import { Application as IApplication } from './application.interface.js';

export class Application implements IApplication {
  constructor(private readonly logger: Logger) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}
