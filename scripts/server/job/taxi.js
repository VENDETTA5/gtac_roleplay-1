// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2021 Asshat-Gaming (https://asshatgaming.com)
// ===========================================================================
// FILE: taxi.js
// DESC: Provides taxi driver job functions and usage
// TYPE: Job (JavaScript)
// ===========================================================================

function taxiSetFareCommand(command, params, client) {
    if(!canPlayerUseJobs(client)) {
        messagePlayerError(client, "You are not allowed to use jobs.");
        return false;
    }

    if(!canPlayerUseTaxiJob(client)) {
        messagePlayerError(client, "You are not allowed to use the taxi job.");
        return false;
    }

    if(!isPlayerWorking(client)) {
        messagePlayerError(client, "You are not working! Use /startwork first.");
        return false;
    }

    if(!doesPlayerHaveJobType(client, AG_JOB_TAXI)) {
        messagePlayerError(client, "You don't have a taxi job.");
        return false;
    }

	return true;
}