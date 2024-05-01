import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  constructor() {}

  getName(): string {
    return '--import';
  }

  execute(..._parameters: string[]): void {}
}
