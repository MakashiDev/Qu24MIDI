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
		this.getGitVersion();
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
	async getGitVersion() {
		const response = await fetch(
			`https://api.github.com/repos/${this.githubPath}/releases/latest`
		);
		const data = await response.json();
		this.gitVersion = data.tag_name;
		console.log(`updater.js | Remote version: ${this.gitVersion}`);
		return this.gitVersion;
	}

	async compareVersions() {
		let localVersion = this.localVersion;
		let gitVersion = await this.getGitVersion();

		gitVersion = gitVersion.slice(1);

		console.log(`updater.js | Local version: ${localVersion}`);
		console.log(`updater.js | Remote version: ${gitVersion}`);

		const currentParts = localVersion.split(".").map(Number);
		const requiredParts = gitVersion.split(".").map(Number);

		for (let i = 0; i < 3; i++) {
			if (currentParts[i] < requiredParts[i]) {
				console.log("Update available");
				return -1; // Current version is lower
			} else if (currentParts[i] > requiredParts[i]) {
				console.log("No update available");
				return 1; // Current version is higher
			}
		}
		console.log("Versions are equal");
		return 0; // Versions are equal
	}
}
