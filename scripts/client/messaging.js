// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: messaging.js
// DESC: Provides messaging/textdraw functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

let smallGameMessageFont = null;
let smallGameMessageText = "";
let smallGameMessageColour = COLOUR_WHITE;
let smallGameMessageTimer = null;

// ===========================================================================

function initMessagingScript() {
	logToConsole(LOG_DEBUG, "[VRR.Messaging]: Initializing messaging script ...");
	smallGameMessageFont = loadSmallGameMessageFont();
	logToConsole(LOG_DEBUG, "[VRR.Messaging]: Messaging script initialized!");
}

// ===========================================================================

function loadSmallGameMessageFont() {
	let tempSmallGameMessageFont = null;
	let fontStream = openFile("files/fonts/pricedown.ttf");
	if(fontStream != null) {
		tempSmallGameMessageFont = lucasFont.createFont(fontStream, 20.0);
		fontStream.close();
	}

	return tempSmallGameMessageFont;
}

// ===========================================================================

function loadBigGameMessageFont() {
	let tempBigGameMessageFont = null;
	let fontStream = openFile("files/fonts/pricedown.ttf");
	if(fontStream != null) {
		tempBigGameMessageFont = lucasFont.createFont(fontStream, 28.0);
		fontStream.close();
	}

	return tempBigGameMessageFont;
}

// ===========================================================================

function processSmallGameMessageRendering() {
	if(renderSmallGameMessage) {
		if(smallGameMessageFont != null) {
			if(smallGameMessageFont != "") {
				smallGameMessageFont.render(smallGameMessageText, [0, game.height-90], game.width, 0.5, 0.0, smallGameMessageFont.size, smallGameMessageColour, true, true, false, true);
			}
		}
	}
}

// ===========================================================================

function showSmallGameMessage(text, colour, duration) {
	logToConsole(LOG_DEBUG, `[VRR.Messaging] Showing small game message '${text}' for ${duration}ms`);
	if(smallGameMessageText != "") {
		clearTimeout(smallGameMessageTimer);
	}

	smallGameMessageColour = colour;
	smallGameMessageText = text;

	smallGameMessageTimer = setTimeout(function() {
		smallGameMessageText = "";
		smallGameMessageColour = COLOUR_WHITE;
		smallGameMessageTimer = null;
	}, duration);
}

// ===========================================================================