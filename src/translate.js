/*
 * This translate's commands into MIDI messages.
 * Developed by: Christian Furr
 * Version: 1.0
 */

const channelNumbers = {
	FX1SEND: "00",
	FX2SEND: "01",
	FX3SEND: "02",
	FX4SEND: "03",
	FX1RETURN: "08",
	FX2RETURN: "09",
	FX3RETURN: "0a",
	FX4RETURN: "0b",
	DCA1: "10",
	DCA2: "11",
	DCA3: "12",
	DCA4: "13",
	1: "20",
	2: "21",
	3: "22",
	4: "23",
	5: "24",
	6: "25",
	7: "26",
	8: "27",
	9: "28",
	10: "29",
	11: "2a",
	12: "2b",
	13: "2c",
	14: "2d",
	15: "2e",
	16: "2f",
	17: "30",
	18: "31",
	19: "32",
	20: "33",
	21: "34",
	22: "35",
	23: "36",
	24: "37",
	25: "38",
	26: "39",
	27: "3a",
	28: "3b",
	29: "3c",
	30: "3d",
	31: "3e",
	32: "3f",
	STEREO1: "40",
	STEREO2: "41",
	STEREO3: "42",
	MUTE1: "50",
	MUTE2: "51",
	MUTE3: "52",
	MUTE4: "53",
	GROUP1: "68",
	GROUP2: "69",
	GROUP7: "6a",
	GROUP8: "6b",
	MIX1: "60",
	MIX2: "61",
	MIX3: "62",
	MIX4: "63",
	"MIX5-6": "64",
	"MIX7-8": "65",
	"MIX9-10": "66",
	LR: "67",
	"MATRIX1-2": "6a",
	"MATRIX3-4": "6d",
};

const faderLevels = {
	10: "7F",
	5: "72",
	0: "62",
	"-5": "4F",
	"-10": "3F",
	"-15": "36",
	"-20": "2F",
	"-25": "27",
	"-30": "1F",
	"-35": "17",
	"-40": "10",
	"-45": "0C",
	"-inf": "00",
};

class Translate {
	constructor(midiChannel) {
		this.channelNumbers = channelNumbers;
		this.midiChannel = midiChannel - 1;
	}

	muteON(channel) {
		/*
		 * This function will mute a channel
		 * @param channel - the channel to mute
		 * @return - the MIDI message to send
		 * N = MIDI Channel Number | The first number in the MIDI message
		 * CH = Channel Number | The second number in the MIDI message
		 * 7F = Velocity | The third number in the MIDI message
		 * With a 7F velocity, the it will mute the channel
		 * 9N, CH, 7F
		 * To stop the board from listening to the channel, send a velocity of 00
		 * 9N, CH, 00
		 */
		var channelNumber = this.channelNumbers[channel];
		var midiChannel = this.midiChannel;
		var part1 = this.format(["9" + midiChannel, channelNumber, "7F"]);
		var part2 = this.format(["9" + midiChannel, channelNumber, "00"]);
		let parts = [part1, part2];
		var message = this.formatParts(parts);
		return message;
	}

	muteOff(channel) {
		/*
		 * This function will unmute a channel
		 * @param channel - the channel to unmute
		 * @return - the MIDI message to send
		 * N = MIDI Channel Number | The first number in the MIDI message
		 * CH = Channel Number | The second number in the MIDI message
		 * 3F = Velocity | The third number in the MIDI message
		 * With a 3F velocity, the it will unmute the channel
		 * 9N, CH, 3F
		 * To stop the board from listening to the channel, send a velocity of 00
		 * 9N, CH, 00
		 */

		var channelNumber = this.channelNumbers[channel];
		var midiChannel = this.midiChannel;
		var part1 = this.format(["9" + midiChannel, channelNumber, "3F"]);
		var part2 = this.format(["9" + midiChannel, channelNumber, "00"]);
		let parts = [part1, part2];
		var message = this.formatParts(parts);
		return message;
	}

	setFader(channel, level) {
		var channelNumber = this.channelNumbers[channel];
		var midiChannel = this.midiChannel;
		var faderLevel = faderLevels[level];
		var part1 = this.format(["B" + midiChannel, "63", channelNumber]);
		var part2 = this.format(["B" + midiChannel, "62", "17"]);
		var part3 = this.format(["B" + midiChannel, "06", faderLevel]);
		var part4 = this.format(["B" + midiChannel, "26", "07"]);

		let parts = [part1, part2, part3, part4];
		return this.formatParts(parts);
	}

	remoteShutdown() {
		var midiChannel = this.midiChannel;
		var part1 = this.format(["B" + midiChannel, "63", "00"]);
		var part2 = this.format(["B" + midiChannel, "62", "5F"]);
		var part3 = this.format(["B" + midiChannel, "06", "00"]);
		var part4 = this.format(["B" + midiChannel, "26", "00"]);
		let parts = [part1, part2, part3, part4];
		return this.formatParts(parts);
	}

	format(hexList) {
		let hex1 = hexList[0];
		let hex2 = hexList[1];
		let hex3 = hexList[2];
		console.log(`Hex1: ${hex1} Hex2: ${hex2} Hex3: ${hex3}`);
		return hex1 + " " + hex2 + " " + hex3;
	}

	formatParts(parts) {
		let message = "";
		console.log(parts);
		parts.forEach((part) => {
			message += part + " ";
		});
		// Remove the last space
		message = message.slice(0, -1);
		console.log(`Message: ${message}`);
		return message;
	}
}
