const { serialHooks } = require('electron-packager/src/hooks')

module.exports = {
  packagerConfig: {
    dir: "build",
    ignore: [
      ".idea", ".git",
      "public",
      "\.lock$",
      "\.md$",
      "forge.config.js",
      "tsconfig.json"
    ],
    prune: true,
    afterCopy: [serialHooks([
      (buildPath, electronVersion, platform, arch) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('afterComplete', buildPath, electronVersion, platform, arch)
            resolve()
          }, 1000)
        })
      },
      // (buildPath, electronVersion, platform, arch) => {
      //   console.log('second function')
      // }
    ])],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      //platforms: ['darwin'],
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
