// ===========================================================================
// Asshat-Gaming Roleplay
// https://github.com/VortrexFTW/gtac_asshat_rp
// Copyright (c) 2020 Asshat-Gaming (https://asshatgaming.com)
// ---------------------------------------------------------------------------
// FILE: bans.js
// DESC: Provides ban functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

const banType = {
    none: 0,
    account: 1,
    subAccount: 3,
    ipAddress: 4,
    uid: 5,
};

// ---------------------------------------------------------------------------

function initBanScript() {
    console.log("[Asshat.Ban]: Initializing ban script ...");
    console.log("[Asshat.Ban]: Ban script initialized!");
}

// ---------------------------------------------------------------------------

function accountBanCommand(command, params, client, fromDiscord) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	// Prevent banning admins with really high permissions
    if(doesClientHaveStaffPermission(targetClient, "ManageServer") || doesClientHaveStaffPermission(targetClient, "Developer")) {
		messageClientError(client, "You cannot ban this person!");
        return false;
	}

	messageAdminAction(`${getClientData(targetClient).accountData.name} has been banned from the server (account ban).`);
	banAccount(getClientData(targetClient).accountData.databaseId, getClientData(client).accountData.databaseId, "");
	targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function subAccountBanCommand(command, params, client, fromDiscord) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	// Prevent banning admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, "ManageServer") || doesClientHaveStaffPermission(targetClient, "Developer")) {
		messageClientError(client, "You cannot ban this person!");
		return false;
    }
    
    let splitParams = params.split(" ");
    let targetClient = getClientFromParams(splitParams[0]);
    let reason = splitParams.slice(1).join(" ");

	messageAdminAction(`${getClientData(targetClient).currentSubAccountData.name} has been banned from the server (character ban).`);
    banSubAccount(getClientData(targetClient).currentSubAccountData.databaseId, getClientData(client).accountData.databaseId, reason);
    targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function ipBanCommand(command, params, client, fromDiscord) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
    }

	// Prevent banning admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, "ManageServer") || doesClientHaveStaffPermission(targetClient, "Developer")) {
		messageClientError(client, "You cannot ban this person!");
		return false;
    }    
    
    let splitParams = params.split(" ");
    let targetClient = getClientFromParams(splitParams[0]);
    let reason = splitParams.slice(1).join(" ");    

    messageAdminAction(`${targetClient.name} has been banned from the server (IP ban).`);
    banIPAddress(targetClient.ip, getClientData(client).accountData.databaseId, reason);	
    server.banIP(targetClient.ip);
    targetClient.disconnect();
}

// ---------------------------------------------------------------------------

function subNetBanCommand(command, params, client, fromDiscord) {
	if(areParamsEmpty(params)) {
		messageClientSyntax(client, getCommandSyntaxText(command));
		return false;
    }

	// Prevent banning admins with really high permissions
	if(doesClientHaveStaffPermission(targetClient, "ManageServer") || doesClientHaveStaffPermission(targetClient, "Developer")) {
		messageClientError(client, "You cannot ban this person!");
		return false;
    }
    
    let splitParams = params.split(" ");
    let targetClient = getClientFromParams(splitParams[0]);
    let octetAmount = Number(splitParams[1]);
    let reason = splitParams.slice(2).join(" ");

	messageAdminAction(`${targetClient.name} has been banned from the server (subnet ban).`);
	banSubNet(targetClient.ip, getSubNet(targetClient.ip, octetAmount), getClientData(client).accountData.databaseId, reason);	
}

// ---------------------------------------------------------------------------

function banAccount(accountId, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapetoString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_detail, ban_who_banned, ban_reason) VALUES (${AG_BANTYPE_ACCOUNT}, ${accountId}, ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function banSubAccount(subAccountId, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapetoString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_detail, ban_who_banned, ban_reason) VALUES (${AG_BANTYPE_SUBACCOUNT}, ${subAccountId}, ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function banIPAddress(ipAddress, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapetoString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_detail, ban_who_banned, ban_reason) VALUES (${AG_BANTYPE_IPADDRESS}, INET_ATON(${ipAddress}), ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function banSubNet(ipAddressStart, ipAddressEnd, adminAccountId, reason) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let safeReason = dbConnection.escapetoString(reason);
        let dbQuery = queryDatabase(dbConnection, `INSERT INTO ban_main (ban_type, ban_ip_start, ban_ip_end, ban_who_banned, ban_reason) VALUES (${AG_BANTYPE_SUBNET}, INET_ATON(${ipAddressStart}), INET_ATON(${ipAddressEnd}), ${adminAccountId}, '${safeReason}');`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanAccount(accountId, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, `UPDATE ban_main SET ban_who_removed=${adminAccountId}, ban_removed=1 WHERE ban_type=${AG_BANTYPE_ACCOUNT} AND ban_detail=${accountId}`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanSubAccount(subAccountId, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, `UPDATE ban_main SET ban_who_removed=${adminAccountId}, ban_removed=1 WHERE ban_type=${AG_BANTYPE_SUBACCOUNT} AND ban_detail=${subAccountId}`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanIPAddress(ipAddress, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, `UPDATE ban_main SET ban_who_removed=${adminAccountId}, ban_removed=1 WHERE ban_type=${AG_BANTYPE_IPADDRESS} AND ban_detail=INET_ATON(${ipAddress})`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function unbanSubNet(ipAddressStart, ipAddressEnd, adminAccountId) {
    let dbConnection = connectToDatabase();
    if(dbConnection) {
        let dbQuery = queryDatabase(dbConnection, `UPDATE ban_main SET ban_who_removed=${adminAccountId}, ban_removed=1 WHERE ban_type=${AG_BANTYPE_SUBNET} AND ban_ip_start=INET_ATON(${ipAddressStart}) AND ban_ip_end=INET_ATON(${ipAddressEnd})`);
        freeDatabaseQuery(dbQuery);
        dbConnection.close();
        return true;
    }

    return false;
}

// ---------------------------------------------------------------------------

function isAccountBanned(accountId) {
    let bans = getServerData().bans;
    for(let i in bans) {
        if(bans[i].type == AG_BANTYPE_ACCOUNT) {
            if(bans[i].detail == accountId) {
                return true;
            }
        }
    }

    return false;
}

// ---------------------------------------------------------------------------

function isSubAccountBanned(subAccountId) {
    let bans = getServerData().bans;
    for(let i in bans) {
        if(bans[i].type == AG_BANTYPE_SUBACCOUNT) {
            if(bans[i].detail == subAccountId) {
                return true;
            }
        }
    }
    
    return false;
}

// ---------------------------------------------------------------------------

function isIpAddressBanned(ipAddress) {
    let bans = getServerData().bans;
    for(let i in bans) {
        if(bans[i].type == AG_BANTYPE_IPADDRESS) {
            if(bans[i].detail == ipAddress) {
                return true;
            }
        }
    }
    
    return false;
}

// ---------------------------------------------------------------------------

