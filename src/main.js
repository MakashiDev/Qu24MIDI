let mutesMIDIChannel = document.querySelector("#mutesMIDIChannel");
let mutesQuChannel = document.querySelector("#mutesQuChannel");
let mute = document.querySelector("#mute");

let levelsMIDIChannel = document.querySelector("#levelsMIDIChannel");
let levelsQuChannel = document.querySelector("#levelsQuChannel");
let level = document.querySelector("#level");

let muteOutput = document.querySelector("#mutesOutput");
let levelOutput = document.querySelector("#levelsOutput");

let mutesCopy = document.querySelector("#mutesCopy");
let levelsCopy = document.querySelector("#levelsCopy");

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

window.onload = function () {
	updateMuteOutput();
	updateLevelOutput();
};
