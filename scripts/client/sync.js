// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: sync.js
// DESC: Provides some elements and data sync
// TYPE: Client (JavaScript)
// ===========================================================================

function processSync(event, deltaTime) {
	if(localPlayer != null) {
		if(!areServerElementsSupported()) {
			sendNetworkEventToServer("vrr.player.position", localPlayer.position);
			sendNetworkEventToServer("vrr.player.heading", localPlayer.heading);
		}

		if(localPlayer.health <= 0) {
			if(!calledDeathEvent) {
				logToConsole(LOG_DEBUG, `Local player died`);
				localPlayer.clearWeapons();
				calledDeathEvent = true;
				sendNetworkEventToServer("vrr.playerDeath");
			}
		}

		if(streamingRadioElement) {
			streamingRadio.position = getElementPosition(streamingRadioElement);
			//streamingRadio.volume = getStreamingRadioVolumeForPosition(streamingRadio.position);
		}
	}
}

// ===========================================================================

function receiveHouseFromServer(houseId, entrancePosition, blipModel, pickupModel, hasInterior) {
	if(getGame() == VRR_GAME_GTA_IV) {

	}
}

// ===========================================================================