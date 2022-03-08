import arg, { Spec } from "arg";
import { showInfo } from "./logging";
import { DEFAULT_DATA_PATH } from "../utils/constants";
import { ERROR_MESSAGES } from "./error";

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
  if (args[SpecificationKeys.PATH]) {
    showInfo(ERROR_MESSAGES.EXCLUDED_PATH);
    // throw new Error();
  }
};

export const getArgumentPath = (): string => {
  return args[SpecificationKeys.PATH] || args["_"][0] || DEFAULT_DATA_PATH;
};
