// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: chatbox.js
// DESC: Provides extra chatbox features
// TYPE: Client (JavaScript)
// ===========================================================================

// ===========================================================================

let chatBoxHistory = [];
let bottomMessageIndex = 0;
let maxChatBoxHistory = 500;

let scrollAmount = 1;
let maxChatBoxLines = 6;

let scrollUpKey = false;
let scrollDownKey = false;

// ===========================================================================

function initChatBoxScript() {
	logToConsole(LOG_DEBUG, "[VRR.ChatBox]: Initializing chatbox script ...");
	scrollUpKey = getKeyIdFromParams("pageup");
	scrollDownKey = getKeyIdFromParams("pagedown");
	bindChatBoxKeys();
	logToConsole(LOG_DEBUG, "[VRR.ChatBox]: Chatbox script initialized!");
}

// ===========================================================================

function bindChatBoxKeys() {
	bindKey(toInteger(scrollUpKey), KEYSTATE_DOWN, chatBoxScrollUp);
	bindKey(toInteger(scrollDownKey), KEYSTATE_DOWN, chatBoxScrollDown);
}

// ===========================================================================

function unBindChatBoxKeys() {
	unbindKey(toInteger(scrollUpKey));
	unbindKey(toInteger(scrollDownKey));
}

// ===========================================================================

function receiveChatBoxMessageFromServer(messageString, colour) {
	let colouredString = replaceColoursInMessage(messageString);

	if(bottomMessageIndex >= chatBoxHistory.length-1) {
		message(colouredString, colour);
		bottomMessageIndex = chatBoxHistory.length-1;
	}
	addToChatBoxHistory(colouredString, colour);
}

// ===========================================================================

function setChatScrollLines(amount) {
	scrollAmount = amount;
}

// ===========================================================================

function addToChatBoxHistory(messageString, colour) {
	chatBoxHistory.push([messageString, colour]);
}

// ===========================================================================

function chatBoxScrollUp() {
	if(bottomMessageIndex > maxChatBoxLines) {
		bottomMessageIndex = bottomMessageIndex-scrollAmount;
		updateChatBox();
	}
}

// ===========================================================================

function chatBoxScrollDown() {
	if(bottomMessageIndex < chatBoxHistory.length-1) {
		bottomMessageIndex = bottomMessageIndex+scrollAmount;
		updateChatBox();
	}
}

// ===========================================================================

function clearChatBox() {
	for(let i = 0 ; i <= maxChatBoxLines ; i++) {
		message("", COLOUR_WHITE);
	}
}

// ===========================================================================

function updateChatBox() {
	clearChatBox();
	for(let i = bottomMessageIndex-maxChatBoxLines ; i <= bottomMessageIndex ; i++) {
		if(typeof chatBoxHistory[i] != "undefined") {
			message(chatBoxHistory[i][0], chatBoxHistory[i][1]);
		} else {
			message("", COLOUR_WHITE);
		}
	}
}

// ===========================================================================