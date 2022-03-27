import chalk, { ForegroundColor } from 'chalk';
import { APP } from '../index';
import { MetaData } from '../spotify';

const theme = {
  main: '#91deff',
  bg: '#0c1417',
  error: '#ff3b3b',
  info: '#ffe697',
  link: '#4da9f6',
};

const log = console.log;

export const introduce = () => {
  log(
    chalk.underline.hex(theme.main).bgHex(theme.bg)(
      `                   Welcome to ${chalk.bold(APP)}!                   `
    )
  );
};

export const showError = (error: unknown) => {
  log(chalk.hex(theme.error)(`Error - ${error}`));
};

export const showInfo = (message: string, color?: typeof ForegroundColor) => {
  color ? log(chalk[color](message)) : log(chalk.hex(theme.info)(message));
};

export const logMetadata = (metadata: MetaData, url: string): void => {
  showInfo(
    `Opening: ${chalk.underline.hex(theme.link)(url)}
${metadata?.artist}: ${metadata?.name} - ${metadata?.date}`
  );
};

export const getScanningText = (path: string): string => {
  return `Scanning ${path}...`;
};
