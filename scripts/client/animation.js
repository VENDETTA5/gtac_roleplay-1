// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: animation.js
// DESC: Provides animation functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

function makePedPlayAnimation(pedId, animGroup, animId, animType, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition, freezePlayer) {
	logToConsole(LOG_DEBUG, `[VRR.Animation] Playing animation ${animGroup}/${animId} for ped ${pedId}`);
	if(getGame() < VRR_GAME_GTA_IV) {
		if(animType == VRR_ANIMTYPE_NORMAL || animType == VRR_ANIMTYPE_SURRENDER) {
			if(getGame() == VRR_GAME_GTA_VC || getGame() == VRR_GAME_GTA_SA) {
				getElementFromId(pedId).clearAnimations();
			} else {
				getElementFromId(pedId).clearObjective();
			}
			getElementFromId(pedId).addAnimation(animGroup, animId);

			if(getElementFromId(pedId) == localPlayer && freezePlayer == true) {
				inAnimation = true;
				setLocalPlayerControlState(false, false);
				localPlayer.collisionsEnabled = false;
			}
		} else if(animType == VRR_ANIMTYPE_BLEND) {
			getElementFromId(pedId).position = getElementFromId(pedId).position;
			getElementFromId(pedId).blendAnimation(animGroup, animId, animSpeed);
		}
	} else {
		natives.requestAnims(animGroup);
		natives.taskPlayAnimNonInterruptable(getElementFromId(pedId), animId, animGroup, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition, -1);
	}
}

// ===========================================================================

function forcePedAnimation(pedId, animGroup, animId, animType, animSpeed, loop, loopNoControl, freezeLastFrame, returnToOriginalPosition) {
	if(getGame() < VRR_GAME_GTA_IV) {
		forcedAnimation = [animGroup, animId];
		getElementFromId(pedId).position = getElementFromId(pedId).position;
		getElementFromId(pedId).addAnimation(animGroup, animId);

		if(getElementFromId(pedId) == localPlayer) {
			inAnimation = true;
			setLocalPlayerControlState(false, false);
			localPlayer.collisionsEnabled = false;
		}
	}
}

// ===========================================================================

function makePedStopAnimation(pedId) {
	if(getElementFromId(pedId) == null) {
		return false;
	}

	if(getGame() != VRR_GAME_GTA_IV) {
		if(getGame() == VRR_GAME_GTA_VC || getGame() == VRR_GAME_GTA_SA) {
			getElementFromId(pedId).clearAnimations();
		} else {
			getElementFromId(pedId).clearObjective();
		}
	}

	if(getElementFromId(pedId) == localPlayer) {
		if(getGame() != VRR_GAME_GTA_IV) {
			localPlayer.collisionsEnabled = true;
		}
		setLocalPlayerControlState(true, false);
	}
}

// ===========================================================================