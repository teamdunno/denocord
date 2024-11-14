import { Client, CommandInteraction } from "npm:eris@0.18.0";
import { info } from "jsr:@dunno/ono/loggers";
import env from "./env.ts";
import { refreshCommands } from "./slash.ts";
import { debug } from "jsr:@dunno/ono/loggers";

import * as commands from "../commands.ts";
import * as interactions from "../interactions.ts";

const bot: Client = new Client(env.TOKEN);

bot.on("ready", () => {
    refreshCommands(commands);

    info("bot is ready!");
    info(`logged in as ${bot.user.username}`);
})

bot.on("interactionCreate", async (interaction) => {
    if (interaction.type !== 2) {
	return;
    }
    interaction = interaction as CommandInteraction;
    const command = interaction.data.name;

    debug(`got command ${interaction.data.name}`);
    const functions = Object.fromEntries(Object.entries(interactions));

    functions[command](interaction);
    //await interaction.createMessage("This message is from deno!");
})

export default bot
