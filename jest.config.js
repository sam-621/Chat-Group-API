module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  testRunner: 'jest-jasmine2',
  displayName: {
    name: 'SERVER',
    color: 'yellow',
  },
};
