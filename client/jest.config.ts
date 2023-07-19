import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
	testEnvironment: 'jest-environment-node',
	verbose: true,
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	rootDir: './',
	modulePaths: ['./src/']
};
export default config;
