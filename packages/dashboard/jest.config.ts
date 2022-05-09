module.exports = {
  displayName: 'dashboard',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/dashboard',
  preset: '../../jest.preset.ts',
};
