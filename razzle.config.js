module.exports = {
  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: true,
        forkTsChecker: {
          tsconfig: './tsconfig.json',
          tslint: false,
          typeCheck: true,
        },
      },
    },
  ],
};
