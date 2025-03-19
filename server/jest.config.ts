import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/src/tests/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js", "node"],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text", "lcov"],
    coveragePathIgnorePatterns: ["node_modules","dist"]
};

export default config;