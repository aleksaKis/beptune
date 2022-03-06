import chalk from "chalk";
import { APP } from "../index";

const theme = {
  main: "#6fe872",
  bg: "#17292d",
  error: "#ff3b3b",
  info: "#ffe697",
};

const log = console.log;

export const introduce = () => {
  log(
    chalk.underline.hex(theme.main).bgHex(theme.bg)(
      `Welcome to ${chalk.bold(APP)}!`
    )
  );
};

export const showError = (error: unknown) => {
  log(chalk.hex(theme.error)(error));
};

export const showWarning = (message: string) => {
  log(chalk.hex(theme.info)(message));
};
