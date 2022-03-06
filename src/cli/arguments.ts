import arg, { Spec } from "arg";
import { showError, showWarning } from "./logging";

const enum ERROR_MESSAGES {
  EXCLUDED_PATH = "Please provide path to music directory",
}

export enum SpecificationKeys {
  HELP = "--help",
  VERSION = "--version",
  PATH = "--path",
  P = "-p",
  V = "-v",
}

const SPECIFICATION: Spec = {
  [SpecificationKeys.HELP]: Boolean,
  [SpecificationKeys.VERSION]: Boolean,
  [SpecificationKeys.PATH]: String, // --path <string> or --path=<string>
  // Aliases
  [SpecificationKeys.V]: SpecificationKeys.VERSION,
  [SpecificationKeys.P]: SpecificationKeys.PATH,
};

export const args = arg(SPECIFICATION);

export const validateArguments = (
  args: arg.Result<typeof SPECIFICATION>
): void => {
  if (!args[SpecificationKeys.PATH]) {
    showWarning(ERROR_MESSAGES.EXCLUDED_PATH);
    // throw new Error();
  }
};
