const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      preload: 'src/preload.js',
      builderOptions: {
        appId: 'com.sfirew.electron.task.monitor.app', // 認證的 appId
        productName: 'Electron Activity Monitor', // 專案名稱
        artifactName: '${name}.${ext}', // 檔案名稱樣板，有 ESLint 記得關掉
        copyright: 'Copyright©Kevin Zheng', // 版權
      },
      win: {
        requestedExecutionLevel: "requireAdministrator"
      },
      nsis: {
        oneClick: false, // 是否一鍵安裝
        perMachine: true, // 是否為每一台機器安裝
        allowToChangeInstallationDirectory: true, // 是否可更改安裝目錄
        createDesktopShortcut: true, // 是否建立桌面捷徑
        createStartMenuShortcut: true // 是否建立開始捷徑
      },
    }
  }
})
