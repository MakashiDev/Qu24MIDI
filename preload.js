const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
	getVersion: () => ipcRenderer.send("app_version"),
	onVersion: (callback) =>
		ipcRenderer.on("app_version", (event, arg) => callback(arg)),
});
