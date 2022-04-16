import arg, { Spec } from 'arg';

export const DEFAULT_DATA_PATH = '.';

export enum SpecificationKeys {
  HELP = '--help',
  VERSION = '--version',
  PATH = '--path',
  P = '-p',
  V = '-v',
}

const SPECIFICATION: Spec = {
  [SpecificationKeys.HELP]: Boolean,
  [SpecificationKeys.VERSION]: Boolean,
  [SpecificationKeys.PATH]: String, // --path <string> or --path=<string>
  // Aliases
  [SpecificationKeys.V]: SpecificationKeys.VERSION,
  [SpecificationKeys.P]: SpecificationKeys.PATH,
};

export const args = arg(SPECIFICATION, { permissive: true });

export const getDirectoryPath = (): string => {
  return args[SpecificationKeys.PATH] || args['_'][0] || DEFAULT_DATA_PATH;
};
