import chalk from 'chalk';
import { Command } from './command.interface.js';
import { Commands } from './commands.enum.js';

export class HelpCommand implements Command {
  public getName(): string {
    return Commands.help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(
      chalk.green(`
        Программа для подготовки данных для REST API сервера.
        Пример:
        ${chalk.bgGrey('cli.js --<command> [--arguments]')}
        Команды:
        ${chalk.bgCyan('--version:')}             # выводит номер версии
        ${chalk.bgYellow('--help:')}              # печатает этот текст
        ${chalk.bgMagenta('--import <path>:')}    # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `)
    );
  }
}
