module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(css|less|scss|sass)$': 'jest-css-modules-transform'
  },
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1',
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts$1',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@selectors(.*)$': '<rootDir>/src/services/selectors$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

