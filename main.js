const { app, BrowserWindow, ipcMain, shell } = require("electron");

console.log(`Local version: ${app.getVersion()}`);

const createWindow = () => {
	const win = new BrowserWindow({
		width: 400,
		height: 700,
		minHeight: 700,
		minWidth: 400,
		webPreferences: {
			nodeIntegration: true,
			preload: __dirname + "/preload.js",
			enableRemoteModule: true,
		},
		darkTheme: true,
	});

	win.loadFile("src/index.html");

	win.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: "deny" };
	});
};

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	ipcMain.on("app_version", (event) => {
		event.sender.send("app_version", { version: app.getVersion() });
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
