module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // transformIgnorePatterns: ["node_modules/vuetify"],
  // moduleFileExtensions: ["js", "json", "vue", "ts"],
  // setupFilesAfterEnv: ["<rootDir>/tests/jest-setup.js"],
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)'],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx', 'mjs']
}

