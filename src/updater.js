console.log("Updater.js loaded");
window.api.getVersion();
window.api.onVersion((arg) => {
	console.log(`updater.js | Local version: ${arg.version}`);
});

class Updater {
	constructor(githubPath) {
		this.githubPath = githubPath;
		// Example MakashiDev/Qu24_SysEx_Generator

		this.localVersion = null;
		this.gitVersion = null;
		this.githubURL = `
    https: //github.com/${this.githubPath}/releases/latest`;

		this.getLocalVersion();
		this.getGitVerion();
	}
	// Gets local version
	getLocalVersion() {
		window.api.getVersion();
		window.api.onVersion((arg) => {
			console.log(arg);
			this.localVersion = arg.version;
			return this.localVersion;
		});
	}

	// Gets remote version
	async getGitVerion() {
		const response = await fetch(
			`https://api.github.com/repos/${this.githubPath}/releases/latest`
		);
		const data = await response.json();
		this.gitVersion = data.tag_name;
		console.log(`updater.js | Remote version: ${this.gitVersion}`);
		return this.gitVersion;
	}

	// Compare local and remote version
	async compareVersions() {
		const gitVersion = this.gitVersion;
		const localVersion = this.localVersion;
		console.log(
			`updater.js | Local version: ${localVersion}  Remote version: ${gitVersion}`
		);
		if (gitVersion !== `v${localVersion}`) {
			return true;
		} else {
			return false;
		}
	}
}
