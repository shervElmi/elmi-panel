module.exports = {
  displayName: 'wp-dashboard',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/wp-dashboard',
  preset: '../../jest.preset.ts',
};
