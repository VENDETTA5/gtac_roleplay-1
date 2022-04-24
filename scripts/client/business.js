// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: business.js
// DESC: Provides business functions and usage
// TYPE: Client (JavaScript)
// ===========================================================================

class BusinessData {
	constructor(index, name, entrancePosition, blipModel, pickupModel, hasInterior, hasItems) {
		this.index = index;
		this.name = name;
		this.entrancePosition = entrancePosition;
		this.blipModel = blipModel;
		this.pickupModel = pickupModel;
		this.hasInterior = hasInterior;
		this.hasItems = hasItems;
		this.blipId = -1;
	}
}

// ===========================================================================

function receiveBusinessFromServer(businessId, name, entrancePosition, blipModel, pickupModel, hasInterior, hasItems) {
	if(getGame() == VRR_GAME_GTA_IV) {
		if(getBusinessData(businessId) != false) {
			if(blipModel == -1) {
				natives.removeBlipAndClearIndex(getBusinessData(businessId).blipId);
				businesses.splice(getBusinessData(businessId).index, 1);
			} else {
				natives.setBlipCoordinates(getBusinessData(businessId).blipId, getBusinessData(businessId).entrancePosition);
				natives.changeBlipSprite(getBusinessData(businessId).blipId, getBusinessData(businessId).blipModel);
				natives.changeBlipNameFromAscii(getBusinessData(businessId).blipId, `${name.substr(0, 24)}${(name.length > 24) ? " ...": ""}`);
			}
		} else {
			if(blipModel != -1) {
				let blipId = natives.addBlipForCoord(entrancePosition);
				if(blipId) {
					let tempBusinessData = new BusinessData(businessId, name, entrancePosition, blipModel, pickupModel, hasInterior, hasItems);
					tempBusinessData.blipId = blipId;
					natives.changeBlipSprite(blipId, blipModel);
					natives.setBlipMarkerLongDistance(blipId, true);
					natives.changeBlipNameFromAscii(blipId, `${name.substr(0, 24)}${(name.length > 24) ? " ...": ""}`);
					businesses.push(tempBusinessData);
				}
			}
		}
	}
}

// ===========================================================================