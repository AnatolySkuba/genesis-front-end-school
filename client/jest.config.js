module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'],
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  setupFiles: ['./src/setupTests.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'svg-jest',
  },
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/src/shared/lib/tests/__mocks__/fileMock.ts',
    '/axios/': 'axios/dist/node/axios.cjs',
    'features/(.*)$': '<rootDir>/src/features/$1',
    'shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};
