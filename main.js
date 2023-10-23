const { app, BrowserWindow } = require("electron");

const { updateElectronApp } = require("update-electron-app");
updateElectronApp();

const createWindow = () => {
	const win = new BrowserWindow({
		width: 400,
		height: 700,
		webPreferences: {
			nodeIntegration: true,
		},
		darkTheme: true,
	});

	win.loadFile("src/index.html");
};

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
