const { app, BrowserWindow } = require('electron');
const path = require('path');

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width : 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, "canvas.html"));
}

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
   }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});