// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: job.js
// DESC: Provides job functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

let localPlayerJobType = 0;
let localPlayerWorking = false;
let jobRouteLocationBlip = null;
let jobRouteLocationSphere = null;

// ===========================================================================

function initJobScript() {
	logToConsole(LOG_DEBUG, "[VRR.Job]: Initializing job script ...");
	logToConsole(LOG_DEBUG, "[VRR.Job]: Job script initialized!");
}

// ===========================================================================

function setLocalPlayerJobType(tempJobType) {
	logToConsole(LOG_DEBUG, `[VRR.Main] Set local player job type to ${tempJobType}`);
	localPlayerJobType = tempJobType;
}

// ===========================================================================

function setLocalPlayerWorkingState(tempWorking) {
	logToConsole(LOG_DEBUG, `[VRR.Main] Setting working state to ${tempWorking}`);
	localPlayerWorking = tempWorking;
}

// ===========================================================================

function showJobRouteLocation(position, colour) {
	logToConsole(LOG_DEBUG, `[VRR.Job] Showing job route location`);
	if(getMultiplayerMod() == VRR_MPMOD_GTAC) {
		if(game.game == VRR_GAME_GTA_SA) {
			jobRouteLocationSphere = game.createPickup(1318, position, 1);
		} else {
			jobRouteLocationSphere = game.createSphere(position, 3);
			jobRouteLocationSphere.colour = colour;
		}

		if(jobRouteLocationBlip != null) {
			destroyElement(jobRouteLocationBlip);
		}

		blinkJobRouteLocationBlip(10, position, colour);
	}
}

// ===========================================================================

function enteredJobRouteSphere() {
	logToConsole(LOG_DEBUG, `[VRR.Job] Entered job route sphere`);
	tellServerPlayerArrivedAtJobRouteLocation();
	destroyElement(jobRouteLocationSphere);
	destroyElement(jobRouteLocationBlip);
	jobRouteLocationSphere = null;
	jobRouteLocationBlip = null;
}

// ===========================================================================

function blinkJobRouteLocationBlip(times, position, colour) {
	for(let i = 1 ; i <= times ; i++) {
		setTimeout(function() {
			if(jobRouteLocationBlip != null) {
				destroyElement(jobRouteLocationBlip);
				jobRouteLocationBlip = null;
			} else {
				jobRouteLocationBlip = game.createBlip(position, 0, 2, colour);
			}
		}, 500*i);
	}

	setTimeout(function() {
		jobRouteLocationBlip = game.createBlip(position, 0, 2, colour);
	}, 500*times+1);
}

// ===========================================================================

function hideJobRouteLocation() {
	destroyElement(jobRouteLocationSphere);
	destroyElement(jobRouteLocationBlip);
	jobRouteLocationSphere = null;
	jobRouteLocationBlip = null;
}

// ===========================================================================