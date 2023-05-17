module.exports = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
                tsConfig: {
                    importHelpers: true,
                },
            },
        ],
    },
    preset: 'ts-jest',
};