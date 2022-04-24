// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: command.js
// DESC: Provides command data, functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

let serverCommands = [];

// ===========================================================================

let builtInCommands = [
	"refresh",
	"restart",
	"stop",
	"start",
	"reconnect",
	"setname",
	"connect",
	"disconnect",
	"say",
	"dumpdoc",
];

// ===========================================================================

function initCommandScript() {
	logToConsole(LOG_INFO, "[VRR.Command]: Initializing commands script ...");
	serverCommands = loadCommands();
	//addAllCommandHandlers();
	logToConsole(LOG_INFO, "[VRR.Command]: Initialized commands script!");
}

// ===========================================================================

function loadCommands() {
	let tempCommands = {
		accent: [
			commandData("accent", setAccentCommand, "<accent name/id>", getStaffFlagValue("None"), false, false, "Sets your character's accent"),
			commandData("accents", listAccentsCommand, "", getStaffFlagValue("None"), false, false, "Shows a list of all available accents"),
			commandData("accentlist", listAccentsCommand, "", getStaffFlagValue("None"), false, false, "Shows a list of all available accents"),
		],
		account: [
			commandData("login", loginCommand, "<password>", getStaffFlagValue("None"), false, false, "Login to an account"),
			commandData("register", registerCommand, "<password>", getStaffFlagValue("None"), false, false, "Creates an account"),
			commandData("changepass", changeAccountPasswordCommand, "<old password> <new password>", getStaffFlagValue("None"), true, false, "Change an account password"),
			commandData("iplogin", toggleAutoLoginByIPCommand, "", getStaffFlagValue("None"), true, false, "Toggle whether to automatically login if you join with the same IP as your last join"),
			commandData("autolastchar", toggleAutoSelectLastCharacterCommand, "", getStaffFlagValue("None"), true, false, "Toggle whether to automatically spawn with the last character you played as"),
			commandData("gui", toggleAccountGUICommand, "", getStaffFlagValue("None"), false, false, "Toggle whether to use GUI. If GUI is disabled on the server, it won't show even if you have GUI enabled."),
			commandData("2fa", toggleAccountTwoFactorAuthCommand, "", getStaffFlagValue("None"), true, false, "Set up and use two-factor authentication."),
			commandData("setemail", setAccountEmailCommand, "<email address>", getStaffFlagValue("None"), true, false, "Sets your email. To reset your password, you must have a valid email set and verified."),
			commandData("verifyemail", verifyAccountEmailCommand, "<verification code>", getStaffFlagValue("None"), true, false, "Confirms/verifies your email."),
			//commandData("setdiscord", setAccountDiscordCommand, "<discord id>", getStaffFlagValue("None"), true, false, "Set up the integration for discord. Allows you to see info and use in-game commands on discord."),
			commandData("notips", toggleNoRandomTipsCommand, "", getStaffFlagValue("None"), true, false, "Turn on and off random tips"),
			commandData("loginalert", toggleAccountLoginAttemptNotificationsCommand, "", getStaffFlagValue("None"), true, false, "Turn on and off email notifications for attempts to login to your account"),
			commandData("scrolllines", setAccountChatScrollLinesCommand, "", getStaffFlagValue("None"), true, false, "Sets how many chatbox lines to scroll at a time when using pageup/pagedown"),

		],
		ammunation: [],
		animation: [
			commandData("anim", playPlayerAnimationCommand, "<animation name>", getStaffFlagValue("None"), true, true, "Makes your player ped use an animation"),
			commandData("an", playPlayerAnimationCommand, "<animation name>", getStaffFlagValue("None"), true, true, "Makes your player ped use an animation"),
			commandData("e", playPlayerAnimationCommand, "<animation name>", getStaffFlagValue("None"), true, true, "Makes your player ped use an animation"),
			commandData("anims", showAnimationListCommand, "", getStaffFlagValue("None"), true, true, "Shows a list of animations"),
			commandData("animlist", showAnimationListCommand, "", getStaffFlagValue("None"), true, true, "Shows a list of animations"),
			commandData("stopanim", stopPlayerAnimationCommand, "", getStaffFlagValue("None"), true, true, "Stops your current animation"),
		],
		antiCheat: [
			//commandData("setac", toggleGlobalAntiCheatCommand, "<0/1 state>", getStaffFlagValue("Developer"), true, true),
			//commandData("ac", getGlobalAntiCheatStatusCommand, "<0/1 state>", getStaffFlagValue("Developer"), true, true),
		],
		ban: [
			commandData("aban", accountBanCommand, "<player name/id> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's account."),
			commandData("acctban", accountBanCommand, "<player name/id> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's account."),
			commandData("cban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's character."),
			commandData("charban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's character."),
			commandData("saban", subAccountBanCommand, "<player name/id> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's character (subaccount)."),
			commandData("ipban", ipBanCommand, "<player name/id> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's IP."),
			commandData("subnetban", subNetBanCommand, "<player name/id> <range> <reason>", getStaffFlagValue("BasicModeration"), true, true, "Bans a player's subnet."),
		],
		bitFlag: [],
		business: [
			commandData("addbiz", createBusinessCommand, "<name>", getStaffFlagValue("ManageBusinesses"), true, false, "Creates a business"),
			commandData("delbiz", deleteBusinessCommand, "[id]", getStaffFlagValue("ManageBusinesses"), true, true, "Deletes a business"),
			//commandData("addbizloc", createBusinessLocationCommand, "<type> <business id> <name>", getStaffFlagValue("ManageBusinesses"), true, false),
			//commandData("delbizloc", deleteBusinessLocationCommand, "[id]", getStaffFlagValue("ManageBusinesses"), true, false),
			commandData("bizreloadall", reloadAllBusinessesCommand, "", getStaffFlagValue("ManageBusinesses"), true, false, "Reloads all businesses from the database"),

			commandData("bizlock", lockUnlockBusinessCommand, "", getStaffFlagValue("None"), true, true, "Locks a business"),
			commandData("bizlights", toggleBusinessInteriorLightsCommand, "", getStaffFlagValue("None"), true, true, "Turns on/off a business's interior lights"),
			commandData("bizbuy", buyBusinessCommand, "", getStaffFlagValue("None"), true, true, "Purchases a business"),
			commandData("bizfee", setBusinessEntranceFeeCommand, "<amount>", getStaffFlagValue("None"), true, true, "Sets a fee to charge players when they enter the business."),
			commandData("biztill", viewBusinessTillAmountCommand, "", getStaffFlagValue("None"), true, true, "Shows the business's till (cash register) amount"),
			commandData("bizbalance", viewBusinessTillAmountCommand, "", getStaffFlagValue("None"), true, true, "Shows the business's till (cash register) amount"),
			commandData("bizwithdraw", withdrawFromBusinessCommand, "<amount>", getStaffFlagValue("None"), true, true, "Take money out of the business till (cash register)"),
			commandData("bizdeposit", depositIntoBusinessCommand, "<amount>", getStaffFlagValue("None"), true, true, "Put money into the business till (cash register)"),
			commandData("buy", buyFromBusinessCommand, "<slot> [amount]", getStaffFlagValue("None"), true, true, "Buy items from a business"),
			commandData("bizstock", stockItemOnBusinessFloorCommand, "<item name> <amount> <sell price>", getStaffFlagValue("None"), true, true, "Uses storage items to restock the business with."),
			commandData("bizstore", storeItemInBusinessStorageCommand, "<item name> <amount>", getStaffFlagValue("None"), true, true, "Moves items from the business to the business storage"),
			commandData("bizorder", orderItemForBusinessCommand, "<item name> <amount> <sell price>", getStaffFlagValue("None"), true, true, "Orders items to sell from a business"),
			commandData("bizitemprice", setBusinessItemSellPriceCommand, "<item slot> <sell price>", getStaffFlagValue("None"), true, true, "Sets the purchase price of a business item"),
			commandData("bizname", setBusinessNameCommand, "<name>", getStaffFlagValue("None"), true, true, "Changes a business name"),
			commandData("bizowner", setBusinessOwnerCommand, "<player name/id>", getStaffFlagValue("None"), true, true, "Changes the owner of a business"),
			commandData("bizdelowner", removeBusinessOwnerCommand, "", getStaffFlagValue("ManageBusinesses"), true, true, "Removes the owner of a business"),
			commandData("bizpublic", setBusinessPublicCommand, "", getStaffFlagValue("ManageBusinesses"), true, true, "Changes a business to public (city hall, govt buildings, etc)"),
			commandData("bizjob", setBusinessJobCommand, "", getStaffFlagValue("ManageBusinesses"), true, true, "Changes the owner of a business to a job"),
			commandData("bizrank", setBusinessRankCommand, "", getStaffFlagValue("None"), true, true, "Changes the job/clan rank required to use the business"),
			commandData("bizclan", setBusinessClanCommand, "", getStaffFlagValue("None"), true, true, "Changes the owner of a business to a clan"),
			commandData("bizbuyprice", setBusinessBuyPriceCommand, "<amount>", getStaffFlagValue("None"), true, true, "Changes the price to buy the business"),
			commandData("bizblip", setBusinessBlipCommand, "<type name/model id>", getStaffFlagValue("ManageBusinesses"), true, true, "Sets the business blip display"),
			commandData("bizpickup", setBusinessPickupCommand, "<type name/model id>", getStaffFlagValue("ManageBusinesses"), true, true, "Sets the business pickup display"),
			commandData("bizinfo", getBusinessInfoCommand, "[business id]", getStaffFlagValue("None"), true, true, "Shows business information"),
			commandData("bizflooritems", getBusinessFloorItemsCommand, "[business id]", getStaffFlagValue("None"), true, true, "Shows all business floor items (for sale) to a player"),
			commandData("bizflooritems", getBusinessStorageItemsCommand, "[business id]", getStaffFlagValue("None"), true, true, "Shows all business storage items (i.e. back room) to a player"),
			commandData("bizentrance", moveBusinessEntranceCommand, "", getStaffFlagValue("ManageBusinesses"), true, true, "Moves the entrance (exterior point) of the business"),
			commandData("bizexit", moveBusinessExitCommand, "", getStaffFlagValue("ManageBusinesses"), true, true, "Moves the exit (interior point) of the business"),
			commandData("bizinttype", setBusinessInteriorTypeCommand, "<interior template name/business id>", getStaffFlagValue("ManageBusinesses"), true, true, "Changes the business interior"),
			commandData("bizdefaultitems", giveDefaultItemsToBusinessCommand, "<item template>", getStaffFlagValue("ManageItems"), true, true, "Gives the business the default items based on template name"),
			commandData("bizdelflooritems", deleteBusinessFloorItemsCommand, "", getStaffFlagValue("ManageItems"), true, true, "Destroys all items on the business floor (for-sale items)"),
			commandData("bizdelstorageitems", deleteBusinessStorageItemsCommand, "", getStaffFlagValue("ManageItems"), true, true, "Destroys all items in the business's storage"),
			commandData("bizdealership", setBusinessEntranceLabelToDealershipCommand, "", getStaffFlagValue("ManageBusinesses"), true, true, "Sets the business's door label to vehicle dealership"),
		],
		chat: [
			commandData("me", meActionCommand, "<message>", getStaffFlagValue("None"), true, false, "Shows a custom action message in chat"),
			commandData("do", doActionCommand, "<message>", getStaffFlagValue("None"), true, false, "Shows a custom action description in chat"),
			commandData("s", shoutCommand, "<message>", getStaffFlagValue("None"), true, false, "Shout a message to others in the area"),
			commandData("shout", shoutCommand, "<message>", getStaffFlagValue("None"), true, false, "Shout a message to others in the area"),
			commandData("talk", talkCommand, "<message>", getStaffFlagValue("None"), true, false, "Say a message to others nearby"),
			commandData("local", talkCommand, "<message>", getStaffFlagValue("None"), true, false, "Say a message to others nearby"),
			commandData("l", talkCommand, "<message>", getStaffFlagValue("None"), true, false, "Say a message to others nearby"),
			commandData("w", whisperCommand, "<message>", getStaffFlagValue("None"), true, false, "Whisper a message to players very close to you"),
			commandData("whisper", whisperCommand, "<message>", getStaffFlagValue("None"), true, false, "Whisper a message to players very close to you"),
			commandData("clanchat", clanChatCommand, "<message>", getStaffFlagValue("None"), true, false, "Sends an OOC chat message to members in your clan"),
			commandData("clan", clanChatCommand, "<message>", getStaffFlagValue("None"), true, false, "Sends an OOC chat message to members in your clan"),
			commandData("c", clanChatCommand, "<message>", getStaffFlagValue("None"), true, false, "Sends an OOC chat message to members in your clan"),
			commandData("adminchat", adminChatCommand, "<message>", getStaffFlagValue("BasicModeration"), true, true, "Sends an OOC chat message to other admins"),
			commandData("a", adminChatCommand, "<message>", getStaffFlagValue("BasicModeration"), true, true, "Sends an OOC chat message to other admins"),
			commandData("achat", adminChatCommand, "<message>", getStaffFlagValue("BasicModeration"), true, true, "Sends an OOC chat message to other admins"),
			commandData("m", megaphoneChatCommand, "<message>", getStaffFlagValue("None"), true, true, "Shouts a message over a megaphone (portable bullhorn/loudspeaker)"),
		],
		clan: [
			commandData("clans", listClansCommand, "[search text]", getStaffFlagValue("None"), true, true, "List clans (search by partial name, if provided)"),
			commandData("clanranks", listClanRanksCommand, "[clan name]", getStaffFlagValue("None"), true, true, "Shows a list of a clan's ranks"),
			commandData("clanflags", showClanFlagListCommand, "", getStaffFlagValue("None"), true, true, "Shows a list of clan permission flags"),

			commandData("addclan", createClanCommand, "<name>", getStaffFlagValue("ManageClans"), true, true, "Creates an new empty, unowned clan."),
			commandData("delclan", deleteClanCommand, "<clan id>", getStaffFlagValue("ManageClans"), true, true, "Deletes a clan by ID or name"),

			commandData("clanaddrank", createClanRankCommand, "<rank id> <name>", getStaffFlagValue("None"), true, true, "Adds a clan rank"),
			commandData("clandelrank", deleteClanRankCommand, "<rank name>", getStaffFlagValue("None"), true, true, "Removes a clan rank"),

			commandData("clansetrank", setClanMemberRankCommand, "<player name/id> <rank name>", getStaffFlagValue("None"), true, true, "Sets the rank of a clan member"),

			commandData("clanowner", setClanOwnerCommand, "<player name/id>", getStaffFlagValue("None"), true, true, "Gives ownership of the clan to a player"),
			commandData("clantag", setClanTagCommand, "<tag>", getStaffFlagValue("None"), true, true, "Sets a clan's main tag"),
			commandData("clanranktag", setClanRankTagCommand, "<rank name/id> <tag>", getStaffFlagValue("None"), true, true, "Sets a clan rank's custom tag"),
			commandData("clanmembertag", setClanMemberTagCommand, "<player name/id> <tag>", getStaffFlagValue("None"), true, true, "Sets a clan members's custom tag"),
			commandData("clanrankname", setClanRankTitleCommand, "<rank name/id> <new name>", getStaffFlagValue("None"), true, true, "Sets a clan rank's title"),
			commandData("clanranklevel", setClanRankLevelCommand, "<rank name/id> <new level>", getStaffFlagValue("None"), true, true, "Sets a clan rank's level"),
			//commandData("clanrankenabled", toggleClanRankEnabledCommand, "<rank name/id>", getStaffFlagValue("None"), true, true, "Enables/disables a clan rank"),
			commandData("clanmembertitle", setClanMemberTitleCommand, "<player name/id> <title>", getStaffFlagValue("None"), true, true, "Sets a clan members's custom title"),
			commandData("clanaddrankflag", addClanRankFlagCommand, "<rank name/id> <flag name>", getStaffFlagValue("None"), true, true, "Gives a clan rank a clan permission."),
			commandData("clanrankflags", showClanRankFlagsCommand, "<rank name/id>", getStaffFlagValue("None"), true, true, "Lists a clan rank's permission flags"),
			commandData("clandelrankflag", removeClanRankFlagCommand, "<rank name/id> <flag name>", getStaffFlagValue("None"), true, true, "Takes a clan permission from a clan rank"),
			commandData("clanaddmemberflag", addClanMemberFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("None"), true, true, "Gives a clan member a clan permission"),
			commandData("clandelmemberflag", removeClanMemberFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("None"), true, true, "Takes a clan permission from a clan member"),
		],
		class: [],
		client: [],
		colour: [],
		command: [
			commandData("cmdenabletype", enableAllCommandsByType, "<type>", getStaffFlagValue("Developer"), true, true, "Enables all commands by type."),
			commandData("cmddisabletype", disableAllCommandsByType, "<type>", getStaffFlagValue("Developer"), true, true, "Disables all commands by type."),
			commandData("cmdenable", enableCommand, "<command>", getStaffFlagValue("Developer"), true, true, "Enable a specific command"),
			commandData("cmddisable", disableCommand, "<command>", getStaffFlagValue("Developer"), true, true, "Disables a specific command"),
		],
		config: [
			commandData("settime", setTimeCommand, "<hour> [minute]", getStaffFlagValue("ManageWorld"), true, true, "Sets the time. Hours are required, minute is optional and will default to 0"),
			commandData("setminuteduration", setMinuteDurationCommand, "<time in ms>", getStaffFlagValue("ManageWorld"), true, true, "Sets how long a minute lasts in milliseconds. 60000 is real time."),
			commandData("setweather", setWeatherCommand, "<weather id/name>", getStaffFlagValue("ManageWorld"), true, true, "Change the weather to specified type."),
			commandData("setsnow", setSnowingCommand, "<falling snow> <ground snow>", getStaffFlagValue("ManageWorld"), true, true, "Toggles winter/snow"),
			commandData("setlogo", toggleServerLogoCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles the corner server logo display on/off"),
			commandData("setgui", toggleServerGUICommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles server GUI on/off"),
			commandData("setguicolours", setServerGUIColoursCommand, "<red> <green> <blue>", getStaffFlagValue("ManageServer"), true, true),
			commandData("newcharspawn", setNewCharacterSpawnPositionCommand, "", getStaffFlagValue("ManageServer"), true, true, "Sets the starting spawn position for new characters"),
			commandData("newcharcash", setNewCharacterMoneyCommand, "<amount>", getStaffFlagValue("ManageServer"), true, true, "Sets the starting money for new characters"),
			commandData("newcharskin", setNewCharacterSkinCommand, "[skin id]", getStaffFlagValue("ManageServer"), true, true, "Sets the default skin for new characters"),
			commandData("reloadcfg", reloadServerConfigurationCommand, "", getStaffFlagValue("ManageServer"), true, true, "Loads and applies the server configuration"),
			commandData("reloademailcfg", reloadEmailConfigurationCommand, "", getStaffFlagValue("Developer"), true, true, "Loads and applies the email configuration"),
			commandData("reloaddbcfg", reloadDatabaseConfigurationCommand, "", getStaffFlagValue("Developer"), true, true, "Loads and applies the database configuration"),
			commandData("reloadlocalecfg", reloadLocaleConfigurationCommand, "", getStaffFlagValue("Developer"), true, true, "Loads and applies the locale configuration and texts"),
			commandData("reloadaccentcfg", reloadAccentConfigurationCommand, "", getStaffFlagValue("Developer"), true, true, "Loads and applies the accent configuration and texts"),

			commandData("setbizblips", toggleServerBusinessBlipsCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles all business blips on/off"),
			commandData("sethouseblips", toggleServerHouseBlipsCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles all house blips on/off"),
			commandData("setjobblips", toggleServerJobBlipsCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles all job blips on/off"),
			commandData("setbizpickups", toggleServerBusinessPickupsCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles all business pickups on/off"),
			commandData("sethousepickups", toggleServerHousePickupsCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles all house pickups on/off"),
			commandData("setjobpickups", toggleServerJobPickupsCommand, "<0/1 state>", getStaffFlagValue("ManageServer"), true, true, "Toggles all job pickups on/off"),
		],
		core: [],
		database: [
			commandData("dbquery", executeDatabaseQueryCommand, "<query>", getStaffFlagValue("Developer"), true, true),
			//commandData("dbinfo", getDatabaseInfoCommand, "", getStaffFlagValue("Developer"), true, true),
		],
		developer: [
			commandData("scode", executeServerCodeCommand, "<code>", getStaffFlagValue("Developer"), true, true),
			commandData("ccode", executeClientCodeCommand, "<code>", getStaffFlagValue("Developer"), true, true),
			commandData("gmx", restartGameModeCommand, "", getStaffFlagValue("Developer"), true, true),
			commandData("saveall", saveAllServerDataCommand, "", getStaffFlagValue("Developer"), true, true),
			commandData("docmd", simulateCommandForPlayerCommand, "<player name/id> <command> [params]", getStaffFlagValue("Developer"), true, true),
			commandData("docmdall", simulateCommandForAllPlayersCommand, "<command> [params]", getStaffFlagValue("Developer"), true, true),
			commandData("addloglvl", addLogLevelCommand, "<log level name>", getStaffFlagValue("Developer"), true, true),
			commandData("delloglvl", removeLogLevelCommand, "<log level name>", getStaffFlagValue("Developer"), true, true),
			commandData("loglvl", getLogLevelCommand, "<log level name>", getStaffFlagValue("Developer"), true, true),

			commandData("nosave", togglePauseSavingToDatabaseCommand, "", getStaffFlagValue("Developer"), true, true),
			commandData("streamurlall", streamAudioURLToAllPlayersCommand, "<url> <volume>", getStaffFlagValue("Developer"), true, true),
			commandData("streamnameall", streamAudioNameToAllPlayersCommand, "<name> <volume>", getStaffFlagValue("Developer"), true, true),

			commandData("forceresetpass", forceAccountPasswordResetCommand, "<account name>", getStaffFlagValue("Developer"), true, true),
			commandData("fixblips", fixAllServerBlipsCommand, "", getStaffFlagValue("Developer"), true, true),
			commandData("fixpickups", fixAllServerPickupsCommand, "", getStaffFlagValue("Developer"), true, true),
			commandData("resetambience", resetAllServerAmbienceElementsCommand, "", getStaffFlagValue("ManageWorld"), true, true),
		],
		discord: [],
		economy: [
			commandData("tax", taxInfoCommand, "", getStaffFlagValue("None"), true, true),
			commandData("wealth", wealthInfoCommand, "", getStaffFlagValue("None"), true, true),
			commandData("forcepayday", forcePlayerPayDayCommand, "<player name/id>", getStaffFlagValue("ManageServer"), true, true, "Gives a player an instant payday."),
		],
		email: [
			commandData("testemail", testEmailCommand, "<email address>", getStaffFlagValue("Developer"), true, true),
		],
		help: [
			commandData("help", helpCommand, "", getStaffFlagValue("None"), false, false),
			commandData("commands", helpCommand, "", getStaffFlagValue("None"), false, false),
			commandData("cmds", helpCommand, "", getStaffFlagValue("None"), false, false),
			commandData("info", helpCommand, "", getStaffFlagValue("None"), false, false),
			commandData("veh", helpGetCarCommand, "", getStaffFlagValue("None"), false, false),
			commandData("v", helpGetCarCommand, "", getStaffFlagValue("None"), false, false),
			commandData("car", helpGetCarCommand, "", getStaffFlagValue("None"), false, false),
			commandData("cars", helpGetCarCommand, "", getStaffFlagValue("None"), false, false),
			commandData("spawncar", helpGetCarCommand, "", getStaffFlagValue("None"), false, false),
			commandData("spawnveh", helpGetCarCommand, "", getStaffFlagValue("None"), false, false),
			commandData("skin", helpGetSkinCommand, "", getStaffFlagValue("None"), false, false),
			commandData("skins", helpGetSkinCommand, "", getStaffFlagValue("None"), false, false),
			commandData("clothes", helpGetSkinCommand, "", getStaffFlagValue("None"), false, false),
			//commandData("setskin", helpGetSkinCommand, "", getStaffFlagValue("None"), false, false),
			commandData("changeskin", helpGetSkinCommand, "", getStaffFlagValue("None"), false, false),
		],
		house: [
			commandData("addhouse", createHouseCommand, "<description>", getStaffFlagValue("ManageHouses"), true, false),
			commandData("delhouse", deleteHouseCommand, "", getStaffFlagValue("ManageHouses"), true, false),
			commandData("housereloadall", reloadAllHousesCommand, "", getStaffFlagValue("ManageHouses"), true, false),

			commandData("houseinfo", getHouseInfoCommand, "", getStaffFlagValue("None"), true, false),
			commandData("housebuy", buyHouseCommand, "", getStaffFlagValue("None"), true, false),
			commandData("houseclan", setHouseClanCommand, "", getStaffFlagValue("None"), true, false),
			commandData("housedesc", setHouseDescriptionCommand, "", getStaffFlagValue("ManageHouses"), true, false),
			commandData("houselock", lockUnlockHouseCommand, "", getStaffFlagValue("None"), true, false),
			commandData("houselights", toggleHouseInteriorLightsCommand, "", getStaffFlagValue("None"), true, false),
			commandData("houseowner", setHouseOwnerCommand, "", getStaffFlagValue("None"), true, false),
			commandData("housebuyprice", setHouseBuyPriceCommand, "", getStaffFlagValue("None"), true, false),
			commandData("houserentprice", setHouseRentPriceCommand, "", getStaffFlagValue("None"), true, false),
			commandData("houseblip", setHouseBlipCommand, "<type name/model id>", getStaffFlagValue("ManageHouses"), true, true),
			commandData("housepickup", setHousePickupCommand, "<type name/model id>", getStaffFlagValue("ManageHouses"), true, true),
			commandData("houseentrance", moveHouseEntranceCommand, "", getStaffFlagValue("ManageHouses"), true, true),
			commandData("houseexit", moveHouseExitCommand, "", getStaffFlagValue("ManageHouses"), true, true),
			commandData("houseinttype", setHouseInteriorTypeCommand, "<interior template name/business id>", getStaffFlagValue("ManageHouses"), true, true),
		],
		item: [
			commandData("i", playerSwitchHotBarSlotCommand, "<slot id>", getStaffFlagValue("None"), true, false, "Switches to the item in the specified slot of your inventory."),
			commandData("item", playerSwitchHotBarSlotCommand, "<slot id>", getStaffFlagValue("None"), true, false, "Switches to the item in the specified slot of your inventory."),
			commandData("addgrounditem", createGroundItemCommand, "<item name/id>", getStaffFlagValue("ManageItems"), true, false, "Spawns a new item on the ground at your position."),
			commandData("additem", createItemCommand, "<item name/id>", getStaffFlagValue("ManageItems"), true, false, "Spawns a new item in your hotbar inventory."),
			commandData("delgrounditem", deleteGroundItemCommand, "", getStaffFlagValue("ManageItems"), true, false, "Destroys the nearest item on the ground."),
			commandData("pickup", pickupItemCommand, "", getStaffFlagValue("None"), true, false, "Picks up the nearest item."),
			commandData("drop", dropItemCommand, "[slot]", getStaffFlagValue("None"), true, false, "Drops your currently equipped item or the item in the specified slot"),
			commandData("put", putItemCommand, "[slot]", getStaffFlagValue("None"), true, false, "Puts an item from your inventory into the nearest item place (vehicle trunk/dash, house, business, etc)"),
			commandData("take", takeItemCommand, "[slot]", getStaffFlagValue("None"), true, false, "Takes an item from the nearest item place (vehicle trunk, dash, house, business, etc)"),
			commandData("use", useItemCommand, "", getStaffFlagValue("None"), true, false, "Uses the currently equipped item"),
			commandData("inv", listPlayerInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items in your inventory"),
			commandData("inventory", listPlayerInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items in your inventory"),

			commandData("items", listItemInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items in your inventory"),
			commandData("houseitems", listHouseInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items in the house's storage"),
			commandData("bizstorage", listBusinessStorageInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items in the business's extra storage (not buyable)"),
			commandData("bizfloor", listBusinessFloorInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items that can be bought from the business"),
			commandData("buylist", listBusinessFloorInventoryCommand, "", getStaffFlagValue("None"), true, false, "Shows the items that can be bought from the business"),

			commandData("power", toggleItemEnabledCommand, "", getStaffFlagValue("None"), true, false),
			commandData("freq", setWalkieTalkieFrequencyCommand, "[frequncy number]", getStaffFlagValue("None"), true, false),
			//commandData("call", callWithPhoneCommand, "[number]", getStaffFlagValue("None"), true, false),
			//commandData("speakerphone", togglePhoneSpeakerCommand, "", getStaffFlagValue("None"), true, false),
			commandData("radio", walkieTalkieChatCommand, "", getStaffFlagValue("None"), true, false),
			commandData("r", walkieTalkieChatCommand, "", getStaffFlagValue("None"), true, false),

			commandData("additemtype", createItemTypeCommand, "<name>", getStaffFlagValue("ManageItems"), true, false),
			commandData("itemtypeusetype", setItemTypeUseTypeCommand, "<item type> <use type>", getStaffFlagValue("ManageItems"), true, false),
			commandData("itemtypeuseval", setItemTypeUseValueCommand, "<item type> <use value>", getStaffFlagValue("ManageItems"), true, false),
			commandData("itemtypeorderprice", setItemTypeOrderPriceCommand, "<item type> <price>", getStaffFlagValue("ManageItems"), true, false),
			commandData("itemtyperiskmult", setItemTypeRiskMultiplierCommand, "<item type> <risk multiplier>", getStaffFlagValue("ManageItems"), true, false),
			commandData("itemtypeenabled", toggleItemTypeEnabledCommand, "<item type>", getStaffFlagValue("ManageItems"), true, false),

			commandData("delplritem", deleteItemInPlayerInventoryCommand, "<player name/id> <item slot>", getStaffFlagValue("ManageItems"), true, false),
			commandData("delplritems", deleteAllItemsInPlayerInventoryCommand, "<player name/id>", getStaffFlagValue("ManageItems"), true, false),
		],
		job: [
			commandData("takejob", takeJobCommand, "", getStaffFlagValue("None"), true, false),
			commandData("startwork", startWorkingCommand, "", getStaffFlagValue("None"), true, false),
			commandData("stopwork", stopWorkingCommand, "", getStaffFlagValue("None"), true, false),
			commandData("startjob", startWorkingCommand, "", getStaffFlagValue("None"), true, false),
			commandData("stopjob", stopWorkingCommand, "", getStaffFlagValue("None"), true, false),
			commandData("quitjob", quitJobCommand, "", getStaffFlagValue("None"), true, false),
			commandData("uniform", jobUniformCommand, "[uniform]", getStaffFlagValue("None"), true, false),
			commandData("equip", jobEquipmentCommand, "[equipment]", getStaffFlagValue("None"), true, false),

			commandData("department", jobDepartmentRadioCommand, "", getStaffFlagValue("None"), true, false),
			commandData("d", jobDepartmentRadioCommand, "", getStaffFlagValue("None"), true, false),

			// Taxi
			commandData("fare", taxiSetFareCommand, "", getStaffFlagValue("None"), true, false),

			// Police
			commandData("detain", policeDetainCommand, "", getStaffFlagValue("None"), true, false),
			commandData("drag", policeDragCommand, "", getStaffFlagValue("None"), true, false),
			commandData("search", policeSearchCommand, "", getStaffFlagValue("None"), true, false),

			// Routes
			commandData("startroute", jobStartRouteCommand, "", getStaffFlagValue("None"), true, false),
			commandData("stoproute", jobStopRouteCommand, "", getStaffFlagValue("None"), true, false),

			// Admin Job Stuff
			commandData("addjob", createJobCommand, "<name>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("addjobloc", createJobLocationCommand, "<job name/id>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("deljobloc", deleteJobLocationCommand, "", getStaffFlagValue("ManageJobs"), true, false),
			commandData("addjobroute", createJobRouteCommand, "<name>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("addjobrouteloc", createJobRouteLocationCommand, "<name>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("deljobroute", deleteJobRouteCommand, "", getStaffFlagValue("ManageJobs"), true, false),
			commandData("deljobrouteloc", deleteJobRouteLocationCommand, "", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutename", setJobRouteNameCommand, "<name>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutepay", setJobRoutePayCommand, "<amount>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutestartmsg", setJobRouteStartMessageCommand, "<new message>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutefinishmsg", setJobRouteFinishMessageCommand, "<new message>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutelocarrivemsg", setJobRouteLocationArriveMessageCommand, "<new message>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutelocnextmsg", setJobRouteLocationNextMessageCommand, "<new message>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobrouteenabled", toggleJobRouteEnabledCommand, "", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutevehcolours", setJobRouteVehicleColoursCommand, "<colour 1> <colour 2>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobroutedelays", setJobRouteAllLocationDelaysCommand, "<time in milliseconds>", getStaffFlagValue("ManageJobs"), true, false),

			commandData("jobcolour", setJobColourCommand, "<job id/name> <red> <green> <blue>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobblip", setJobBlipCommand, "<job id/name> <blip id/name>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobpickup", setJobPickupCommand, "<job id/name> <pickup id/name>", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobwl", toggleJobWhiteListCommand, "[job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobwhitelist", toggleJobWhiteListCommand, "[job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobblacklist", toggleJobBlackListCommand, "[job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobbl", toggleJobBlackListCommand, "[job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobtoggle", toggleJobEnabledCommand, "[job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobaddplayerwl", addPlayerToJobWhiteListCommand, "<player name/id> [job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobaddplayerbl", addPlayerToJobBlackListCommand, "<player name/id> [job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobdelplayerbl", removePlayerFromJobBlackListCommand, "<player name/id> [job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobdelplayerbl", removePlayerFromJobWhiteListCommand, "<player name/id> [job id]", getStaffFlagValue("ManageJobs"), true, false),
			commandData("jobreloadall", reloadAllJobsCommand, "", getStaffFlagValue("ManageJobs"), true, false),

			commandData("jobinfo", getJobInfoCommand, "", getStaffFlagValue("None"), true, true, "Get info for nearest or specified job"),
			commandData("joblocinfo", getJobLocationInfoCommand, "", getStaffFlagValue("None"), true, true, "Get info for nearest or specified job location"),
		],
		keybind: [
			commandData("bindkey", addKeyBindCommand, "<key id/name> <command> [params]", getStaffFlagValue("None"), true, false, "Binds a key to a command and optional parameters"),
			commandData("unbindkey", removeKeyBindCommand, "<key id/name>", getStaffFlagValue("None"), true, false, "Removes an existing keybind from your account"),
			commandData("keybinds", showKeyBindListCommand, "", getStaffFlagValue("None"), true, false, "Shows a list of all your current keybinds"),
		],
		locale: [
			commandData("lang", setLocaleCommand, "<language name>", getStaffFlagValue("None"), true, false, "Sets your language"),
			commandData("language", setLocaleCommand, "<language name>", getStaffFlagValue("None"), true, false, "Sets your language"),
			commandData("locale", setLocaleCommand, "<language name>", getStaffFlagValue("None"), true, false, "Sets your language"),
			commandData("setlang", setLocaleCommand, "<language name>", getStaffFlagValue("None"), true, false, "Sets your language"),
		],
		messaging: [],
		misc: [
			commandData("pos", getPositionCommand, "", getStaffFlagValue("BasicModeration"), true, false, "Shows your current coordinates"),
			commandData("idea", submitIdeaCommand, "<message>", getStaffFlagValue("None"), true, true, "Sends an suggestion/idea to the developers"),
			commandData("bug", submitBugReportCommand, "<message>", getStaffFlagValue("None"), true, true, "Submits a bug report"),
			commandData("enter", enterExitPropertyCommand, "", getStaffFlagValue("None"), true, true, "Enters or exists a house/business"),
			commandData("cursor", toggleMouseCursorCommand, "", getStaffFlagValue("None"), true, false, "Toggles cursor visibility"),
			commandData("mousecam", toggleMouseCameraCommand, "", getStaffFlagValue("None"), true, false, "Toggles vehicle mouse camera for games that don't have it"),
			commandData("yes", playerPromptAnswerYesCommand, "", getStaffFlagValue("None"), true, false, "Answers a prompt with YES"),
			commandData("no", playerPromptAnswerNoCommand, "", getStaffFlagValue("None"), true, false, "Answers a prompt with NO"),
			commandData("admins", listOnlineAdminsCommand, "", getStaffFlagValue("None"), true, false, "Shows a list of online admins"),
			commandData("stuck", stuckPlayerCommand, "", getStaffFlagValue("None"), true, false, "Fixes your position and virtual world if bugged"),
			commandData("gps", gpsCommand, "[item or place name]", getStaffFlagValue("None"), true, false, "Shows you locations for special places or where to buy items"),
		],
		radio: [
			commandData("radiostation", playStreamingRadioCommand, "<radio station id>", getStaffFlagValue("None"), true, false, "Plays a radio station in your vehicle, house, or business (depending on which one you're in)"),
			commandData("radiostations", showRadioStationListCommand, "", getStaffFlagValue("None"), true, false, "Shows a list of all available radio stations"),
			commandData("radiovolume", setStreamingRadioVolumeCommand, "<volume level>", getStaffFlagValue("None"), true, false, "Sets the radio streaming volume (for your game only)."),
			commandData("radioreloadall", reloadAllRadioStationsCommand, "", getStaffFlagValue("ManageServer"), true, false, "Reloads all radio stations from database (use after making changes)"),
		],
		security: [],
		staff: [
			commandData("kick", kickClientCommand, "<player name/id> [reason]", getStaffFlagValue("BasicModeration"), true, true, "Kicks a player from the server"),
			commandData("mute", muteClientCommand, "<player name/id> [reason]", getStaffFlagValue("BasicModeration"), true, true, "Mutes a player, preventing them from using any chat."),
			commandData("freeze", freezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("BasicModeration"), true, true, "Freeze a player, preventing them from moving."),
			commandData("unmute", unMuteClientCommand, "<player name/id> [reason]", getStaffFlagValue("BasicModeration"), true, true, "Unmutes a player, allowing them to chat again."),
			commandData("unfreeze", unFreezeClientCommand, "<player name/id> [reason]", getStaffFlagValue("BasicModeration"), true, true, "Unfreezes a player, allowing them to move again."),
			commandData("goto", gotoPlayerCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to a player."),
			commandData("gethere", getPlayerCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Teleports a player to you."),
			commandData("getveh", getVehicleCommand, "<vehicle id>", getStaffFlagValue("BasicModeration"), true, true, "Teleports a vehicle to you."),
			commandData("warpinveh", warpIntoVehicleCommand, "[vehicle id]", getStaffFlagValue("ManageVehicles"), true, false),
			commandData("returnplr", returnPlayerCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Returns a player to their previous position."),
			commandData("gotopos", gotoPositionCommand, "<x> <y> <z> [int] [vw]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to specific coordinates with optional interior and dimension."),
			commandData("gotoveh", gotoVehicleCommand, "<vehicle id>", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to a vehicle by ID."),
			commandData("gotobiz", gotoBusinessCommand, "<business id/name>", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to a business by ID or name."),
			commandData("gotohouse", gotoHouseCommand, "<house id/name>", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to a house by ID or description."),
			commandData("gotojob", gotoJobLocationCommand, "<job id/name> <location id>", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to a job location by name and location ID."),
			commandData("gotoloc", gotoGameLocationCommand, "<location name>", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to a game location by name."),
			commandData("gotospawn", gotoNewPlayerSpawnCommand, "", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to the new player spawn location"),
			commandData("fr", teleportForwardCommand, "[distance in meters]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you forward a certain distance in meters."),
			commandData("ba", teleportBackwardCommand, "[distance in meters]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you backward a certain distance in meters."),
			commandData("lt", teleportLeftCommand, "[distance in meters]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to the left a certain distance in meters."),
			commandData("rt", teleportRightCommand, "[distance in meters]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you to the right a certain distance in meters."),
			commandData("up", teleportUpCommand, "[distance in meters]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you upward a certain distance in meters."),
			commandData("dn", teleportDownCommand, "[distance in meters]", getStaffFlagValue("BasicModeration"), true, true, "Teleports you downward a certain distance in meters."),
			commandData("int", playerInteriorCommand, "<player name/id> [interior id]", getStaffFlagValue("BasicModeration"), true, true, "Gets or sets a player's game interior."),
			commandData("vw", playerVirtualWorldCommand, "<player name/id> [virtual world id]", getStaffFlagValue("BasicModeration"), true, true, "Gets or sets a player's virtual world/dimension."),
			commandData("addstaffflag", addStaffFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("ManageAdmins"), true, true, "Gives a player a staff flag by name (this server only)."),
			commandData("delstaffflag", takeStaffFlagCommand, "<player name/id> <flag name>", getStaffFlagValue("ManageAdmins"), true, true, "Takes a player's staff flag by name (this server only)."),
			commandData("getstaffflags", getStaffFlagsCommand, "<player name/id>", getStaffFlagValue("ManageAdmins"), true, true, "Shows a list of all staff flags a player has (this server only)."),
			commandData("clearstaffflags", clearStaffFlagsCommand, "<player name/id>", getStaffFlagValue("ManageAdmins"), true, true, "Removes all staff flags for a player (this server only)."),
			commandData("staffflags", allStaffFlagsCommand, "", getStaffFlagValue("ManageAdmins"), true, true, "Shows a list of all valid staff flag names."),
			commandData("givemoney", givePlayerMoneyCommand, "<player name/id> <amount>", getStaffFlagValue("serverManager"), true, true),
			commandData("nonrpname", forceCharacterNameChangeCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Forces a player to change their current character's name."),
			commandData("setname", forceCharacterNameCommand, "<player name/id> <first name> <last name>", getStaffFlagValue("BasicModeration"), true, true, "Changes a character's name directly."),
			commandData("setskin", forcePlayerSkinCommand, "<player name/id> <skin id/name>", getStaffFlagValue("BasicModeration"), true, true, "Changes a character's skin."),
			commandData("setaccent", forcePlayerAccentCommand, "<player name/id> <accent name>", getStaffFlagValue("BasicModeration"), true, true, "Changes a character's accent."),
			commandData("setfightstyle", forceFightStyleCommand, "<player name/id> <fight style name>", getStaffFlagValue("BasicModeration"), true, true, "Changes a character's fight style."),
			commandData("setstars", forcePlayerWantedLevelCommand, "<player name/id> <wanted level>", getStaffFlagValue("BasicModeration"), true, true, "Forces a player to have a wanted level"),
			commandData("plrinfo", getPlayerInfoCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Shows basic info about the specified player"),
			commandData("getplrhouse", getAllHousesOwnedByPlayerCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Shows a list of all houses owned by the player"),
			commandData("getplrbiz", getAllBusinessesOwnedByPlayerCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Shows a list of all businesses owned by the player"),
			commandData("getplrveh", getAllVehiclesOwnedByPlayerCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Shows a list of all vehicles owned by the player"),
			commandData("geoip", getPlayerGeoIPInformationCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Retrieves GeoIP information on a player (country & city)"),
			commandData("ip", getPlayerIPInformationCommand, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Retrieves IP information on a player"),
			commandData("plrsync", toggleSyncForElementsSpawnedByPlayer, "<player name/id>", getStaffFlagValue("BasicModeration"), true, true, "Sets whether elements spawned by a player are synced (traffic, peds, etc)"),
			commandData("health", setPlayerHealthCommand, "<player name/id> <health", getStaffFlagValue("BasicModeration"), true, true, "Sets a player's health"),
			commandData("armour", setPlayerArmourCommand, "<player name/id> <armour>", getStaffFlagValue("BasicModeration"), true, true, "Sets a player's armour"),
			commandData("infiniterun", setPlayerInfiniteRunCommand, "<player name/id> <state>", getStaffFlagValue("BasicModeration"), true, true, "Toggles a player's infinite sprint"),
		],
		startup: [],
		subAccount: [
			commandData("switchchar", switchCharacterCommand, "", getStaffFlagValue("None"), true, false),
			commandData("newchar", newCharacterCommand, "<first name> <last name>", getStaffFlagValue("None"), true, false),
			commandData("usechar", useCharacterCommand, "<character id>", getStaffFlagValue("None"), true, false),
		],
		translate: [],
		trigger: [
			commandData("addtrig", createTriggerCommand, "<trigger name>", getStaffFlagValue("ManageServer"), true, false),
			commandData("deltrig", deleteTriggerCommand, "<trigger id>", getStaffFlagValue("ManageServer"), true, false),
			commandData("addtrigcond", addTriggerConditionCommand, "<trigger id> <condition name>", getStaffFlagValue("ManageServer"), true, false),
			commandData("deltrigcond", removeTriggerConditionCommand, "<trigger id> <condition id>", getStaffFlagValue("ManageServer"), true, false),
			commandData("addtrigresp", addTriggerResponseCommand, "<trigger id> <response name>", getStaffFlagValue("ManageServer"), true, false),
			commandData("deltrigresp", removeTriggerResponseCommand, "<trigger id> <response name>", getStaffFlagValue("ManageServer"), true, false),
			commandData("triggers", listTriggersCommand, "[search value]", getStaffFlagValue("ManageServer"), true, false),
			commandData("trigcond", listTriggerConditionsCommand, "<trigger id>", getStaffFlagValue("ManageServer"), true, false),
			commandData("trigresp", listTriggerResponsesCommand, "<trigger id>", getStaffFlagValue("ManageServer"), true, false),
			commandData("trigtoggle", toggleTriggerEnabledCommand, "<trigger id> [0/1 state]", getStaffFlagValue("ManageServer"), true, false),
		],
		utilities: [],
		vehicle: [
			commandData("addveh", createVehicleCommand, "<model id/name>", getStaffFlagValue("ManageVehicles"), true, false),
			commandData("tempveh", createTemporaryVehicleCommand, "<model id/name>", getStaffFlagValue("ManageVehicles"), true, false),
			commandData("delveh", deleteVehicleCommand, "", getStaffFlagValue("ManageVehicles"), true, false),
			commandData("nearveh", getNearbyVehiclesCommand, "", getStaffFlagValue("None"), true, false),

			commandData("oldveh", getLastVehicleInfoCommand, "", getStaffFlagValue("None"), true, false),
			commandData("lastveh", getLastVehicleInfoCommand, "", getStaffFlagValue("None"), true, false),
			commandData("oldcar", getLastVehicleInfoCommand, "", getStaffFlagValue("None"), true, false),
			commandData("lastcar", getLastVehicleInfoCommand, "", getStaffFlagValue("None"), true, false),

			commandData("lock", vehicleLockCommand, "", getStaffFlagValue("None"), true, false),
			commandData("unlock", vehicleLockCommand, "", getStaffFlagValue("None"), true, false),
			commandData("engine", vehicleEngineCommand, "", getStaffFlagValue("None"), true, false),
			commandData("siren", vehicleSirenCommand, "", getStaffFlagValue("None"), true, false),
			commandData("lights", vehicleLightsCommand, "", getStaffFlagValue("None"), true, false),

			commandData("vehowner", setVehicleOwnerCommand, "<player id/name>", getStaffFlagValue("ManageVehicles"), true, true),
			commandData("vehpublic", setVehiclePublicCommand, "", getStaffFlagValue("ManageVehicles"), true, true),
			commandData("vehclan", setVehicleClanCommand, "<clan id/name>", getStaffFlagValue(""), true, true),
			commandData("vehbiz", setVehicleToBusinessCommand, "", getStaffFlagValue(""), true, true),
			commandData("vehjob", setVehicleJobCommand, "[job id/name]", getStaffFlagValue("ManageVehicles"), true, true),
			commandData("vehdelowner", removeVehicleOwnerCommand, "", getStaffFlagValue("ManageVehicles"), true, true),
			commandData("vehrank", setVehicleRankCommand, "<rank id/name>", getStaffFlagValue("None"), true, true),
			commandData("vehinfo", getVehicleInfoCommand, "", getStaffFlagValue("None"), true, true),
			commandData("vehpark", toggleVehicleSpawnLockCommand, "", getStaffFlagValue("ManageVehicles"), true, true),

			commandData("vehrespawnall", respawnAllVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all vehicles (also respawns all traffic vehicles)"),
			commandData("vehrespawnempty", respawnEmptyVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all empty/unoccupied vehicles"),
			commandData("vehrespawnjob", respawnJobVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all job vehicles"),
			commandData("vehrespawnplr", respawnPlayerVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all player-owned vehicles"),
			commandData("vehrespawnclan", respawnClanVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all clan-owned vehicles"),
			commandData("vehrespawnpublic", respawnPublicVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all public vehicles"),
			commandData("vehrespawnbiz", respawnBusinessVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns all business-owned vehicles"),
			commandData("vehrespawn", respawnVehicleCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Respawns your current vehicle"),
			commandData("vehreloadall", reloadAllVehiclesCommand, "", getStaffFlagValue("ManageVehicles"), true, true, "Deletes and reloads all vehicles from database"),

			commandData("vehrent", rentVehicleCommand, "", getStaffFlagValue("None"), true, true, "Starts renting your current vehicle (if rentable)"),
			commandData("vehrentprice", setVehicleRentPriceCommand, "", getStaffFlagValue("None"), true, true, "Sets your vehicle's rent price"),
			commandData("vehbuyprice", setVehicleBuyPriceCommand, "", getStaffFlagValue("None"), true, true, "Sets your vehicle's rent price"),
			commandData("stoprent", stopRentingVehicleCommand, "", getStaffFlagValue("None"), true, true, "Stops renting your vehicle"),
			commandData("vehbuy", buyVehicleCommand, "", getStaffFlagValue("None"), true, true, "Purchases your vehicle"),
			commandData("vehcolour", vehicleAdminColourCommand, "<colour1> <colour2>", getStaffFlagValue("None"), true, true, "Sets a vehicle's colour"),
			commandData("vehlivery", vehicleAdminLiveryCommand, "<livery id>", getStaffFlagValue("None"), true, true, "Sets your vehicle's livery/paintjob"),
			commandData("vehrepair", vehicleAdminRepairCommand, "", getStaffFlagValue("None"), true, true, "Repairs your vehicle"),
			commandData("passenger", enterVehicleAsPassengerCommand, "", getStaffFlagValue("None"), true, true, "Enters a vehicle as passenger"),
		],
	};

	return tempCommands;
}

// ===========================================================================

function addAllCommandHandlers() {
	for(let i in serverCommands) {
		for(let j in serverCommands[i]) {
			addCommandHandler(serverCommands[i][j].command, processPlayerCommand);
		}
	}
}

// ===========================================================================

function getCommand(command) {
	let commandGroups = getCommands()
	for(let i in commandGroups) {
		let commandGroup = commandGroups[i];
		for(let j in commandGroup) {
			if(toLowerCase(commandGroup[j].command) == toLowerCase(command)) {
				return commandGroup[j];
			}
		}
	}

	return false;
}

// ===========================================================================

function getCommandData(command) {
	return getCommand(command);
}

// ===========================================================================

function getCommands() {
	return serverCommands;
}

// ===========================================================================

function commandData(command, handlerFunction, syntaxString = "", requiredStaffFlags = getStaffFlagValue("None"), requireLogin = true, allowOnDiscord = true, usageHelpMessage) {
	return new CommandData(command, handlerFunction, syntaxString, requiredStaffFlags, requireLogin, allowOnDiscord, usageHelpMessage);
}

// ===========================================================================

function doesCommandRequireLogin(command) {
	return getCommand(command).requireLogin;
}

// ===========================================================================

function getCommandRequiredPermissions(command) {
	return getCommand(command).requiredStaffFlags;
}

// ===========================================================================

function getCommandSyntaxText(command) {
	return `/${command} ${getCommand(command).syntaxString}`;
}

// ===========================================================================

function isCommandAllowedOnDiscord(command) {
	return getCommand(command).allowOnDiscord;
}

// ===========================================================================

function disableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	params = toLowerCase(params);

	if(!getCommand(params)) {
		messagePlayerError(client, `The command {ALTCOLOUR}/${params} {MAINCOLOUR} does not exist!`);
		return false;
	}

	getCommand(params).enabled = false;
	messagePlayerSuccess(client, `Command {ALTCOLOUR}/${params} {MAINCOLOUR}has been disabled!`);
	return true;
}

// ===========================================================================

function enableCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	params = toLowerCase(params);

	if(!getCommand(params)) {
		messagePlayerError(client, `The command {ALTCOLOUR}/${params} {MAINCOLOUR} does not exist!`);
		return false;
	}

	getCommand(params).enabled = true;
	messagePlayerSuccess(client, `Command {ALTCOLOUR}/${params} {MAINCOLOUR}has been enabled!`);
	return true;
}

// ===========================================================================

function disableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	params = toLowerCase(params);

	if(isNull(getServerData().commands[params])) {
		messagePlayerError(client, `Command type {ALTCOLOUR}${params} {MAINCOLOUR}does not exist!`);
		return false;
	}

	for(let i in getServerData().commands[params]) {
		getServerData().commands[params][i].enabled = false;
	}

	messagePlayerSuccess(client, `{clanOrange}All {ALTCOLOUR}${params} {MAINCOLOUR}commands have been disabled!`);
	return true;
}

// ===========================================================================

function enableAllCommandsByType(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	params = toLowerCase(params);

	if(isNull(getServerData().commands[params])) {
		messagePlayerError(client, `Command type {ALTCOLOUR}${params} {MAINCOLOUR}does not exist!`);
		return false;
	}

	for(let i in getServerData().commands[params]) {
		getServerData().commands[params][i].enabled = true;
	}

	messagePlayerSuccess(client, `{clanOrange}All {ALTCOLOUR}${params} {MAINCOLOUR}commands have been enabled!`);
	return true;
}

// ===========================================================================

function onPlayerCommand(event, client, command, params) {
	processPlayerCommand(command, params, client)
}

// ===========================================================================

function processPlayerCommand(command, params, client) {
	if(builtInCommands.indexOf(toLowerCase(command)) != -1) {
		return true;
	}

	let commandData = getCommand(toLowerCase(command));

	let paramsDisplay = params;
	if(areParamsEmpty(params)) {
		paramsDisplay = "";
	}

	if(!doesCommandExist(toLowerCase(command))) {
		console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (invalid command): /${command} ${paramsDisplay}`);

		let possibleCommand = getCommandFromParams(command);
		if(possibleCommand != false && doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(toLowerCase(possibleCommand.command)))) {
			messagePlayerError(client, `The command {ALTCOLOUR}/${command} {MAINCOLOUR}does not exist! Did you mean {ALTCOLOUR}/${possibleCommand.command} ?`);
		} else {
			messagePlayerError(client, `The command {ALTCOLOUR}/${command} {MAINCOLOUR}does not exist! Use /help for commands and information.`);
		}
		return false;
	}

	if(!commandData.enabled) {
		console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (command is disabled): /${command} ${paramsDisplay}`);
		messagePlayerError(client, `The command {ALTCOLOUR}/${command} {MAINCOLOUR}is disabled!`);
		return false;
	}

	if(doesCommandRequireLogin(toLowerCase(command))) {
		if(!isPlayerLoggedIn(client)) {
			console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (requires login first): /${command} ${paramsDisplay}`);
			messagePlayerError(client, `You must be logged in to use the {ALTCOLOUR}/${command} {MAINCOLOUR}command!`);
			return false;
		}
	}

	//if(isClientFromDiscord(client)) {
	//	if(!isCommandAllowedOnDiscord(command)) {
	//        console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command from discord, but failed (not available on discord): /${command} ${paramsDisplay}`);
	//		messagePlayerError(client, `The {ALTCOLOUR}/${command} {MAINCOLOUR} command isn't available on discord!`);
	//		return false;
	//	}
	//}

	if(!client.console) {
		if(!doesPlayerHaveStaffPermission(client, getCommandRequiredPermissions(toLowerCase(command)))) {
			console.warn(`[VRR.Command] ${getPlayerDisplayForConsole(client)} attempted to use command, but failed (no permission): /${command} ${paramsDisplay}`);
			messagePlayerError(client, `You do not have permission to use the {ALTCOLOUR}/${toLowerCase(command)} {MAINCOLOUR}command!`);
			return false;
		}
	}

	logToConsole(LOG_DEBUG, `[VRR.Command] ${getPlayerDisplayForConsole(client)} used command: /${command} ${paramsDisplay}`);
	commandData.handlerFunction(toLowerCase(command), params, client);
}

// ===========================================================================

addCommandHandler("cmd", function(command, params, client) {
	if(!isConsole(client)) {
		return false;
	}

	let splitParams = params.split(" ");
	let newCommand = getParam(params, " ", 1);
	let newParams = splitParams.slice(1).join(" ");

	getCommand(newCommand).handlerFunction(newCommand, newParams, client);
});

// ===========================================================================

function listAllCommands() {
	for(let i in serverCommands) {
		for(let j in serverCommands[i]) {
			logToConsole(LOG_DEBUG, serverCommands[i][j].command);
		}
	}
}

// ===========================================================================

function doesCommandExist(command) {
	if(getCommandData(command)) {
		return true;
	}

	return false;
}

// ===========================================================================

function cacheAllCommandsAliases() {
	for(let i in serverCommands) {
		for(let j in serverCommands[i]) {
			for(let k in serverCommands) {
				for(let m in serverCommands[k]) {
					if(serverCommands[i][j].handlerFunction == serverCommands[k][m].handlerFunction) {
						serverCommands[i][j].aliases.push(serverCommands[k][m]);
						serverCommands[k][m].aliases.push(serverCommands[i][j]);
					}
				}
			}
		}
	}
}

// ===========================================================================

function getCommandAliasesNames(command) {
	let commandAliases = [];
	for(let i in command.aliases) {
		commandAliases.push(command.aliases[i].name);
	}

	return commandAliases;
}

// ===========================================================================

function areParamsEmpty(params) {
	if(!params || params == "" || params.length == 0 || typeof params == "undefined") {
		return true;
	}

	return false;
}

// ===========================================================================

function getParamsCount(params, delimiter = " ") {
	return params.split(delimiter).length;
}

// ===========================================================================

function areThereEnoughParams(params, requiredAmount, delimiter = " ") {
	return (params.split(delimiter).length >= requiredAmount);
}

// ===========================================================================

function getParam(params, delimiter, index) {
	return params.split(delimiter)[index-1];
}

// ===========================================================================

function getCommandFromParams(params) {
	for(let i in serverCommands) {
		for(let j in serverCommands[i]) {
			if(toLowerCase(serverCommands[i][j].command).indexOf(toLowerCase(params)) != -1) {
				return serverCommands[i][j];
			}
		}
	}

	return false;
}

// ===========================================================================