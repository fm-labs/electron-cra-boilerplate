module.exports = {
  packagerConfig: {
    dir: "build",
    ignore: [
      ".idea", ".git", "src", "public",
      "\.lock$", "\.md$",
      "forge.config.js",
      "tsconfig.json"
    ],
    prune: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
