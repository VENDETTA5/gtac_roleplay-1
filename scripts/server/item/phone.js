// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: phone.js
// DESC: Provides features and usage for the phone item type
// TYPE: Server (JavaScript)
// ===========================================================================

// ===========================================================================

function getItemWithPhoneNumber(phoneNumber) {
    for(let i in getServerData().items) {
        if(getItemTypeData(getItemData(i).itemTypeIndex).useType == AG_ITEM_USETYPE_PHONE) {
            if(getItemData(i).value == phoneNumber) {
                return i;
            }
        }
    }
    return -1;
}

// ===========================================================================

function isPhoneItemEnabled(itemIndex) {
    return getItemData(itemIndex).enabled;
}

// ===========================================================================

function ringPhoneForNearbyPlayers(itemIndex) {
    if(isPhoneItemEnabled(itemIndex)) {

    }
}

// ===========================================================================

function phoneTransmit(radioFrequency, messageText, transmittingPlayer) {
    phoneOutgoingToNearbyPlayers(transmittingPlayer, messageText);
}

// ===========================================================================