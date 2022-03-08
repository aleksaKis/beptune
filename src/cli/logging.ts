import chalk from "chalk";
import { APP } from "../index";
import { MetaData } from "../spotify/types";

const theme = {
  main: "#6fe872",
  bg: "#17292d",
  error: "#ff3b3b",
  info: "#ffe697",
  link: "#4da9f6",
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
  log(chalk.hex(theme.error)(error));
};

export const showInfo = (message: string) => {
  log(chalk.hex(theme.info)(message));
};

export const logMetadata = (metadata: MetaData, url: string): void => {
  showInfo(`Opening: ${chalk.underline.hex(theme.link)(url)}
${metadata?.artist}: ${metadata?.name} - ${metadata?.date}
`);
};

export const getSearchText = (album: string): string => {
  return `Searching for ${album} on ${chalk.green("Spotify")} `;
};

export const getScanningText = (path: string): string => {
  return `Scanning folders in: ${path}`;
};
