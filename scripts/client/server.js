// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: server.js
// DESC: Provides server communication and cross-endpoint operations
// TYPE: Client (JavaScript)
// ===========================================================================

function initServerScript() {
	logToConsole(LOG_DEBUG, "[VRR.Server]: Initializing server script ...");
	addAllNetworkHandlers();
	logToConsole(LOG_DEBUG, "[VRR.Server]: Server script initialized!");
}

// ===========================================================================

function addAllNetworkHandlers() {
	logToConsole(LOG_DEBUG, "[VRR.Server]: Adding network handlers ...");

	addNetworkEventHandler("vrr.smallGameMessage", showSmallGameMessage);
	addNetworkEventHandler("vrr.working", setLocalPlayerWorkingState);
	addNetworkEventHandler("vrr.jobType", setLocalPlayerJobType);
	addNetworkEventHandler("vrr.passenger", enterVehicleAsPassenger);

	addNetworkEventHandler("vrr.freeze", setLocalPlayerFrozenState);
	addNetworkEventHandler("vrr.control", setLocalPlayerControlState);
	addNetworkEventHandler("vrr.fadeCamera", fadeLocalCamera);
	addNetworkEventHandler("vrr.removeFromVehicle", removeLocalPlayerFromVehicle);
	addNetworkEventHandler("vrr.clearPeds", clearLocalPlayerOwnedPeds);
	addNetworkEventHandler("vrr.restoreCamera", restoreLocalCamera);
	addNetworkEventHandler("vrr.cameraLookAt", setLocalCameraLookAt);
	addNetworkEventHandler("vrr.logo", setServerLogoRenderState);
	addNetworkEventHandler("vrr.ambience", setCityAmbienceState);
	addNetworkEventHandler("vrr.runCode", runClientCode);
	addNetworkEventHandler("vrr.clearWeapons", clearLocalPlayerWeapons);
	addNetworkEventHandler("vrr.giveWeapon",  giveLocalPlayerWeapon);
	addNetworkEventHandler("vrr.position", setLocalPlayerPosition);
	addNetworkEventHandler("vrr.heading", setLocalPlayerHeading);
	addNetworkEventHandler("vrr.interior", setLocalPlayerInterior);
	addNetworkEventHandler("vrr.minuteDuration", setMinuteDuration);
	addNetworkEventHandler("vrr.showJobRouteLocation", showJobRouteLocation);
	addNetworkEventHandler("vrr.hideJobRouteLocation", hideJobRouteLocation);
	addNetworkEventHandler("vrr.snow", setSnowState);
	addNetworkEventHandler("vrr.health", setLocalPlayerHealth);
	addNetworkEventHandler("vrr.enterPropertyKey", setEnterPropertyKey);
	addNetworkEventHandler("vrr.skinSelect", toggleSkinSelect);
	addNetworkEventHandler("vrr.hotbar", updatePlayerHotBar);
	addNetworkEventHandler("vrr.pedSpeech", playPedSpeech);
	addNetworkEventHandler("vrr.clearPedState", clearLocalPedState);
	addNetworkEventHandler("vrr.drunkEffect", setLocalPlayerDrunkEffect);
	addNetworkEventHandler("vrr.showItemActionDelay", showItemActionDelay);
	addNetworkEventHandler("vrr.set2DRendering", setPlayer2DRendering);
	addNetworkEventHandler("vrr.mouseCursor", toggleMouseCursor);
	addNetworkEventHandler("vrr.mouseCamera", toggleMouseCamera);
	addNetworkEventHandler("vrr.mouseCameraForce", setMouseCameraState);
	addNetworkEventHandler("vrr.weaponDamageEnabled", setPlayerWeaponDamageEnabled);
	addNetworkEventHandler("vrr.weaponDamageEvent", setPlayerWeaponDamageEvent);
	addNetworkEventHandler("vrr.spawned", onServerSpawnedPlayer);
	addNetworkEventHandler("vrr.money", setLocalPlayerCash);
	addNetworkEventHandler("vrr.armour", setLocalPlayerArmour);
	addNetworkEventHandler("vrr.wantedLevel", forceLocalPlayerWantedLevel);

	addNetworkEventHandler("vrr.delKeyBind", unBindAccountKey);
	addNetworkEventHandler("vrr.addKeyBind", bindAccountKey);
	addNetworkEventHandler("vrr.clearKeyBinds", clearKeyBinds);

	addNetworkEventHandler("vrr.nametag", updatePlayerNameTag);
	addNetworkEventHandler("vrr.ping", updatePlayerPing);

	addNetworkEventHandler("vrr.m", receiveChatBoxMessageFromServer);
	addNetworkEventHandler("vrr.chatScrollLines", setChatScrollLines);

	addNetworkEventHandler("vrr.radioStream", playStreamingRadio);
	addNetworkEventHandler("vrr.audioFileStream", playAudioFile);
	addNetworkEventHandler("vrr.stopRadioStream", stopStreamingRadio);
	addNetworkEventHandler("vrr.radioVolume", setStreamingRadioVolume);

	addNetworkEventHandler("vrr.veh.lights", setVehicleLights);
	addNetworkEventHandler("vrr.veh.engine", setVehicleEngine);
	addNetworkEventHandler("vrr.veh.repair", repairVehicle);

	addNetworkEventHandler("vrr.pedAnim", makePedPlayAnimation);
	addNetworkEventHandler("vrr.pedStopAnim", makePedStopAnimation);
	addNetworkEventHandler("vrr.localPlayerSkin", setLocalPlayerSkin);
	addNetworkEventHandler("vrr.forcePedAnim", forcePedAnimation);
	addNetworkEventHandler("vrr.hideAllGUI", hideAllGUI);
	addNetworkEventHandler("vrr.clientInfo", serverRequestedClientInfo);
	addNetworkEventHandler("vrr.interiorLights", updateInteriorLightsState);

	addNetworkEventHandler("vrr.syncElement", forceSyncElementProperties);
	addNetworkEventHandler("vrr.elementPosition", setElementPosition);
	addNetworkEventHandler("vrr.elementCollisions", setElementCollisionsEnabled);

	addNetworkEventHandler("vrr.vehBuyState", setVehiclePurchaseState);

	addNetworkEventHandler("vrr.showRegistration", showRegistrationGUI);
	addNetworkEventHandler("vrr.showNewCharacter", showNewCharacterGUI);
	addNetworkEventHandler("vrr.showLogin", showLoginGUI);

	addNetworkEventHandler("vrr.logLevel", setLogLevel);
	addNetworkEventHandler("vrr.infiniteRun", setLocalPlayerInfiniteRun);

	addNetworkEventHandler("vrr.business", receiveBusinessFromServer);
	addNetworkEventHandler("vrr.house", receiveHouseFromServer);

	addNetworkEventHandler("vrr.holdObject", makePedHoldObject);

	addNetworkEventHandler("vrr.playerPedId", sendLocalPlayerNetworkIdToServer);
}

// ===========================================================================

function sendResourceReadySignalToServer() {
	sendNetworkEventToServer("vrr.clientReady");
}

// ===========================================================================

function sendResourceStartedSignalToServer() {
	sendNetworkEventToServer("vrr.clientStarted");
}

// ===========================================================================

function sendResourceStoppedSignalToServer() {
	if(isConnected) {
		sendNetworkEventToServer("vrr.clientStopped");
	}
}

// ===========================================================================

function setPlayer2DRendering(hudState, labelState, smallGameMessageState, scoreboardState, hotBarState, itemActionDelayState) {
	logToConsole(LOG_DEBUG, `[VRR.Main] Updating render states (HUD: ${hudState}, Labels: ${labelState}, Bottom Text: ${smallGameMessageState}, Scoreboard: ${scoreboardState}, HotBar: ${hotBarState}, Item Action Delay: ${itemActionDelayState})`);
	renderHUD = hudState;

	if(getGame() == VRR_GAME_GTA_IV) {
		natives.displayCash(hudState);
		natives.displayAmmo(hudState);
		natives.displayHud(hudState);
	} else {
		if(typeof setHUDEnabled != "undefined") {
			setHUDEnabled(hudState);
		}
	}

	renderLabels = labelState;
	renderSmallGameMessage = smallGameMessageState;
	renderScoreBoard = scoreboardState;
	renderHotBar = hotBarState;
	renderItemActionDelay = itemActionDelayState;
}

// ===========================================================================

function onServerSpawnedPlayer(state) {
	logToConsole(LOG_DEBUG, `[VRR.Main] Setting spawned state to ${state}`);
	isSpawned = state;
	if(state) {
		setUpInitialGame();
		calledDeathEvent = false;
	}
}

// ===========================================================================

function tellServerPlayerUsedKeyBind(key) {
	sendNetworkEventToServer("vrr.useKeyBind", key);
}

// ===========================================================================

function tellServerPlayerArrivedAtJobRouteLocation() {
	sendNetworkEventToServer("vrr.arrivedAtJobRouteLocation");
}

// ===========================================================================

function tellServerItemActionDelayComplete() {
	sendNetworkEventToServer("vrr.itemActionDelayComplete");
}

// ===========================================================================

function sendServerClientInfo() {
	let clientVersion = "0.0.0.0";
	if(typeof CLIENT_VERSION_MAJOR != "undefined") {
		clientVersion = `${CLIENT_VERSION_MAJOR}.${CLIENT_VERSION_MINOR}.${CLIENT_VERSION_PATCH}.${CLIENT_VERSION_BUILD}`;
	}
	sendNetworkEventToServer("vrr.clientInfo", clientVersion, game.width, game.height);
}

// ===========================================================================

function sendServerNewAFKStatus(state) {
	sendNetworkEventToServer("vrr.afk", state);
}

// ===========================================================================

function anchorBoat(vehicleId) {

}

// ===========================================================================

function setEnterPropertyKey(key) {
	enterPropertyKey = key;
}

// ===========================================================================

function serverRequestedClientInfo() {
	sendServerClientInfo();
}

// ===========================================================================

function updateInteriorLightsState(state) {
	interiorLightsEnabled = state;
}

// ===========================================================================

function forceSyncElementProperties(elementId) {
	if(getElementFromId(elementId) == null) {
		return false;
	}

	syncElementProperties(getElementFromId(elementId));
}

// ===========================================================================

function setElementPosition(elementId, position) {
	if(getElementFromId(elementId) == null) {
		return false;
	}

	if(!getElementFromId(elementId).isSyncer) {
		return false;
	}

	getElementFromId(elementId).position = position;
}

// ===========================================================================

function setElementCollisionsEnabled(elementId, state) {
	if(getElementFromId(elementId) == null) {
		return false;
	}

	getElementFromId(elementId).collisionsEnabled = state;
}

// ===========================================================================

function setLocalPlayerPedPartsAndProps(parts, props) {
	for(let i in parts) {
		localPlayer.changeBodyPart(parts[0], parts[1], parts[2]);
	}

	for(let i in props) {
		localPlayer.changeBodyProp(props[0], props[1]);
	}
}

// ===========================================================================

function setLocalPlayerArmour(armour) {
	if(typeof localPlayer.armour != "undefined") {
		localPlayer.armour = armour;
	}
}

// ===========================================================================

function forceLocalPlayerWantedLevel(wantedLevel) {
	forceWantedLevel = toInteger(wantedLevel);
}

// ===========================================================================

function setLogLevel(level) {
	logLevel = level;
}

// ===========================================================================

function setLocalPlayerInfiniteRun(state) {
	if(localPlayer != null) {
		if(getGame() == VRR_GAME_GTA_III || getGame() == VRR_GAME_GTA_VC) {
			game.SET_PLAYER_NEVER_GETS_TIRED(game.GET_PLAYER_ID(), boolToInt(state));
		}
	}
}

// ===========================================================================

function setLocalPlayerSkin(skinId) {
	if(getGame() == VRR_GAME_GTA_IV) {
		//natives.changePlayerModel(natives.getPlayerId(), skinId);
		localPlayer.skin = allowedSkins[skinSelectorIndex][0];
	} else {
		localPlayer.skin = skinId;
	}
}

// ===========================================================================

function makePedHoldObject(pedId, modelIndex) {
	if(getGame() == VRR_GAME_GTA_IV) {
		natives.givePedAmbientObject(natives.getPedFromNetworkId(pedId), getGameConfig().objects[getGame()][modelIndex][1])
	}
}

// ===========================================================================

function sendLocalPlayerNetworkIdToServer() {
	sendNetworkEventToServer("vrr.playerPedId", natives.getNetworkIdFromPed(localPlayer));
}

// ===========================================================================