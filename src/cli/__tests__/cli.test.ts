import { DEFAULT_DATA_PATH, getDirectoryPath } from '../arguments';

describe('[cli] Arguments', () => {
  // Notice: this will fail when running test with flags since args catches args like --watch or arguments.test.ts
  // Should rethink about handling extra parameters as library paths
  it('should return default path when path is not provided', () => {
    const path = getDirectoryPath();
    expect(path).toEqual(DEFAULT_DATA_PATH);
  });
});
