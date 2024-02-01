let mutesMIDIChannel = document.querySelector("#mutesMIDIChannel");
let mutesQuChannel = document.querySelector("#mutesQuChannel");
let mute = document.querySelector("#mute");

let levelsMIDIChannel = document.querySelector("#levelsMIDIChannel");
let levelsQuChannel = document.querySelector("#levelsQuChannel");
let level = document.querySelector("#level");

let sceneMIDIChannel = document.querySelector(`#scenesMidiChannel`);
let scene = document.querySelector("#sceneSelect");

let muteOutput = document.querySelector("#mutesOutput");
let levelOutput = document.querySelector("#levelsOutput");
let sceneOutput = document.querySelector(`#sceneOutput`);

let mutesCopy = document.querySelector("#mutesCopy");
let levelsCopy = document.querySelector("#levelsCopy");
let scenesCopy = document.querySelector(`#scenesCopy`);

// Check for updates
const updater = new Updater("MakashiDev/Qu24_SysEx_Generator");
async function checkForUpdates() {
	const gitVersion = await updater.getGitVersion();
	const localVersion = await updater.localVersion;
	console.log(`Local version: ${localVersion} + TICKLE TIME`);
	const version = document.querySelector("#version");
	version.innerHTML = `${localVersion}`;

	if ((await updater.compareVersions()) == -1) {
		const updateAlert = document.querySelector("#updateAlert");
		updateAlert.classList.remove("hidden");
		updateAlert.classList.add("flex");

		const updateCloseButton = document.querySelector("#updateClose");
		updateCloseButton.addEventListener("click", (ev) => {
			updateAlert.classList.remove("flex");
			updateAlert.classList.add("hidden");
		});

		const updateAlertMessage = document.querySelector(
			"#updateAlertMessage"
		);
		updateAlertMessage.innerHTML = `Update available: ${localVersion} -> ${gitVersion}`;

		const updateLink = document.querySelector("#updateLink");
		updateLink.href = `https://github.com${updater.githubURL}`;
	} else {
		console.log("No update available");
	}
}

checkForUpdates();

navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
	if (result.state === "granted" || result.state === "prompt") {
		console.log("Permission granted");
	}
});

function copyToClipboard(element) {
	navigator.clipboard.writeText(element.innerText).then(
		function () {
			console.log("Copied ", element.innerText);
		},
		function () {
			console.error("Unable to write to clipboard. :-(");
		}
	);
}

mutesCopy.addEventListener("click", (ev) => {
	console.log(ev);
	console.log(muteOutput.innerHTML);
	navigator.clipboard.writeText(muteOutput.innerHTML);
});
levelsCopy.addEventListener("click", (ev) => {
	console.log(ev);
	console.log(muteOutput.innerHTML);
	navigator.clipboard.writeText(levelOutput.innerHTML);
});
scenesCopy.addEventListener("click", (ev) => {
	console.log(ev);
	console.log(sceneOutput.innerHTML);
	navigator.clipboard.writeText(sceneOutput.innerHTML);
});

mutesMIDIChannel.addEventListener("change", updateMuteOutput);
mutesQuChannel.addEventListener("change", updateMuteOutput);
mute.addEventListener("change", updateMuteOutput);

function updateMuteOutput() {
	let translate = new Translate(mutesMIDIChannel.value);
	if (mute.value == "on") {
		muteOutput.innerText = translate.muteON(mutesQuChannel.value);
	} else {
		muteOutput.innerText = translate.muteOff(mutesQuChannel.value);
	}
}

levelsMIDIChannel.addEventListener("change", updateLevelOutput);
levelsQuChannel.addEventListener("change", updateLevelOutput);
level.addEventListener("change", updateLevelOutput);

function updateLevelOutput() {
	let translate = new Translate(levelsMIDIChannel.value);
	levelOutput.innerText = translate.setFader(
		levelsQuChannel.value,
		level.value
	);
	console.log(levelOutput.innerText);
}

sceneMIDIChannel.addEventListener("change", updateSceneOutput);
scene.addEventListener("change", updateSceneOutput);

function updateSceneOutput() {
	let translate = new Translate(sceneMIDIChannel.value);
	sceneOutput.innerText = translate.recallScene(
		parseInt(scene.value)
	);
}

window.onload = function () {
	updateMuteOutput();
	updateLevelOutput();
	updateSceneOutput();
};