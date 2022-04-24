// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: labels.js
// DESC: Provides functionality for world labels (3D labels)
// TYPE: Client (JavaScript)
// ===========================================================================

let businessLabels = [];
let houseLabels = [];
let jobLabels = [];

let propertyLabelNameFont = null;
let propertyLabelLockedFont = null;
let propertyLabelHeight = 1.0;

let jobNameLabelFont = null;
let jobHelpLabelFont = null;

let unlockedColour = toColour(50, 205, 50, 255);
let lockedColour = toColour(205, 92, 92, 255);
let jobHelpColour = toColour(234, 198, 126, 255);

let renderLabelDistance = 7.5;

let propertyLabelLockedOffset = 16;
let propertyLabelNameOffset = 18;
let propertyLabelPriceOffset = 16;

// ===========================================================================

function initLabelScript() {
	logToConsole(LOG_DEBUG, "[VRR.Label]: Initializing label script ...");
	propertyLabelNameFont = initLabelPropertyNameFont();
	propertyLabelLockedFont = initLabelPropertyLockedFont();
	jobNameLabelFont = initLabelJobNameFont();
	jobHelpLabelFont = initLabelJobHelpFont();
	logToConsole(LOG_DEBUG, "[VRR.Label]: Label script initialized!");
}

// ===========================================================================

function initLabelPropertyNameFont() {
	return lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
}

// ===========================================================================

function initLabelPropertyLockedFont() {
	return lucasFont.createDefaultFont(12.0, "Roboto", "Light");
}

// ===========================================================================

function initLabelJobNameFont() {
	return lucasFont.createDefaultFont(16.0, "Roboto", "Regular");
}

// ===========================================================================

function initLabelJobHelpFont() {
	return lucasFont.createDefaultFont(10.0, "Roboto", "Light");
}

// ===========================================================================

function renderPropertyEntranceLabel(name, position, locked, isBusiness, price, rentPrice, labelInfoType) {
	if(localPlayer == null) {
		return false;
	}

	if(propertyLabelNameFont == null) {
		return false;
	}

	if(propertyLabelLockedFont == null) {
		return false;
	}

	let tempPosition = position;
	tempPosition.z = tempPosition.z + propertyLabelHeight;
	let screenPosition = getScreenFromWorldPosition(tempPosition);

	if(screenPosition.x < 0 || screenPosition.x > game.width) {
		return false;
	}

	let text = "";
	if(price > "0") {
		text = `For sale: $${price}`;
		let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
		propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, toColour(200, 200, 200, 255), false, true, false, true);

		screenPosition.y -= propertyLabelPriceOffset;
	}

	text = "";
	if(rentPrice != "0") {
		text = `For rent: $${rentPrice} every payday`;
		let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
		propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, toColour(200, 200, 200, 255), false, true, false, true);

		screenPosition.y -= propertyLabelPriceOffset;
	}


	if(isBusiness) {
		text = (locked) ? "CLOSED" : "OPEN";
	} else {
		text = (locked) ? "LOCKED" : "UNLOCKED";
	}

	if(!locked && labelInfoType != VRR_PROPLABEL_INFO_NONE) {
		let infoText = "";
		switch(labelInfoType) {
			case VRR_PROPLABEL_INFO_ENTER:
				if(enterPropertyKey) {
					infoText = `Press ${toUpperCase(getKeyNameFromId(enterPropertyKey))} to enter`;
				} else {
					infoText = `Use /enter to enter`;
				}
				break;

			case VRR_PROPLABEL_INFO_BUY:
				infoText = `Use /buy to purchase items`;
				break;

			case VRR_PROPLABEL_INFO_BUYBIZ:
				infoText = `Use /buy to purchase items`;
				break;

			//case VRR_PROPLABEL_INFO_RENTBIZ:
			//    infoText = `Use /bizrent to buy this business`;
			//    break;

			case VRR_PROPLABEL_INFO_BUYHOUSE:
				infoText = `Use /housebuy to buy this house`;
				break;

			case VRR_PROPLABEL_INFO_RENTHOUSE:
				infoText = `Use /houserent to rent this house`;
				break;

			case VRR_PROPLABEL_INFO_ENTERVEH:
				infoText = "Enter a vehicle in the parking lot to buy it";
				break;

			case VRR_PROPLABEL_INFO_NONE:
			default:
				infoText = "";
				break;
		}
		if(getDistance(localPlayer.position, position) <= renderLabelDistance-2) {
			let size = propertyLabelLockedFont.measure(infoText, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
			propertyLabelLockedFont.render(infoText, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, toColour(234, 198, 126, 255), false, true, false, true);
			screenPosition.y -= propertyLabelLockedOffset;
		}
	}

	let size = propertyLabelLockedFont.measure(text, game.width, 0.0, 0.0, propertyLabelLockedFont.size, true, true);
	propertyLabelLockedFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelLockedFont.size, (locked) ? lockedColour : unlockedColour, false, true, false, true);

	screenPosition.y -= propertyLabelNameOffset;

	text = name || " ";
	size = propertyLabelNameFont.measure(text, game.width, 0.0, 0.0, propertyLabelNameFont.size, true, true);
	propertyLabelNameFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelNameFont.size, (isBusiness) ? toColour(0, 153, 255, 255) : toColour(17, 204, 17, 255), false, true, false, true);
}

// -------------------------------------------------------------------------

function renderPropertyExitLabel(position) {
	if(localPlayer == null) {
		return false;
	}

	if(propertyLabelNameFont == null) {
		return false;
	}

	if(propertyLabelLockedFont == null) {
		return false;
	}

	let tempPosition = position;
	tempPosition.z = tempPosition.z + propertyLabelHeight;
	let screenPosition = getScreenFromWorldPosition(tempPosition);

	if(screenPosition.x < 0 || screenPosition.x > game.width) {
		return false;
	}

	let text = "EXIT";
	let size = propertyLabelNameFont.measure(text, game.width, 0.0, 0.0, propertyLabelNameFont.size, true, true);
	propertyLabelNameFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, propertyLabelNameFont.size, COLOUR_WHITE, false, true, false, true);
}

// -------------------------------------------------------------------------

function renderJobLabel(name, position, jobType) {
	if(localPlayer == null) {
		return false;
	}

	if(jobNameLabelFont == null) {
		return false;
	}

	if(jobHelpLabelFont == null) {
		return false;
	}

	let tempPosition = position;
	tempPosition.z = tempPosition.z + propertyLabelHeight;
	let screenPosition = getScreenFromWorldPosition(tempPosition);

	if(screenPosition.x < 0 || screenPosition.x > game.width) {
		return false;
	}

	let text = "";
	if(jobType == localPlayerJobType) {
		if(localPlayerWorking) {
			text = "Use /uniform and /equip for job stuff, or /stopwork to go off duty";
		} else {
			text = "Use /startwork to go on duty";
		}
	} else {
		if(localPlayerJobType == 0) {
			text = "Use /takejob to work here";
		} else {
			text = "You already have a job. Use /quitjob if you want this one";
		}
	}

	let size = jobHelpLabelFont.measure(text, game.width, 0.0, 0.0, jobHelpLabelFont.size, true, true);
	jobHelpLabelFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, jobHelpLabelFont.size, COLOUR_YELLOW, false, true, false, true);

	screenPosition.y -= 18;

	text = name + " Job";
	size = jobNameLabelFont.measure(text, game.width, 0.0, 0.0, jobNameLabelFont.size, true, true);
	jobNameLabelFont.render(text, [screenPosition.x-size[0]/2, screenPosition.y-size[1]/2], game.width, 0.0, 0.0, jobNameLabelFont.size, COLOUR_WHITE, false, true, false, true);
}

// -------------------------------------------------------------------------

function processLabelRendering() {
	if(renderLabels && areWorldLabelsSupported()) {
		if(localPlayer != null) {
			if(!areServerElementsSupported()) {
				//for(let i in businesses) {
				//    if(pickups[i].getData("vrr.label.type") != null) {
				//        if(getDistance(localPlayer.position, pickups[i].position) <= renderLabelDistance) {

				// natives.getScreenViewportId
				// natives.getGameViewportId
				// natives.getViewportPositionOfCoord
			} else {
				let pickups = getElementsByType(ELEMENT_PICKUP);
				for(let i in pickups) {
					if(pickups[i].getData("vrr.label.type") != null) {
						if(getDistance(localPlayer.position, pickups[i].position) <= renderLabelDistance) {
							if(!pickups[i].isOnScreen) {
								let price = "0";
								let rentPrice = "0";
								let labelInfoType = VRR_PROPLABEL_INFO_NONE;
								if(pickups[i].getData("vrr.label.price") != null) {
									price = makeLargeNumberReadable(pickups[i].getData("vrr.label.price"));
								}

								if(pickups[i].getData("vrr.label.rentprice") != null) {
									rentPrice = makeLargeNumberReadable(pickups[i].getData("vrr.label.rentprice"));
								}

								if(pickups[i].getData("vrr.label.help") != null) {
									labelInfoType = pickups[i].getData("vrr.label.help");
								}

								switch(pickups[i].getData("vrr.label.type")) {
									case VRR_LABEL_BUSINESS:
										renderPropertyEntranceLabel(pickups[i].getData("vrr.label.name"), pickups[i].position, pickups[i].getData("vrr.label.locked"), true, price, rentPrice, labelInfoType);
										break;

									case VRR_LABEL_HOUSE:
										renderPropertyEntranceLabel("House", pickups[i].position, pickups[i].getData("vrr.label.locked"), false, price, rentPrice, labelInfoType);
										break;

									case VRR_LABEL_JOB:
										renderJobLabel(pickups[i].getData("vrr.label.name"), pickups[i].position, pickups[i].getData("vrr.label.jobType"));
										break;

									case VRR_LABEL_EXIT:
										renderPropertyExitLabel(pickups[i].position);
										break;
								}
							}
						}
					}
				}
			}
		}
	}
}

// -------------------------------------------------------------------------