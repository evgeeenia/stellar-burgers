import '@testing-library/jest-dom';

// Mock fetch by default; individual tests can override
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

