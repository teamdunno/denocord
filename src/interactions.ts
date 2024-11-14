import { CommandInteraction } from "npm:eris@0.18.0";

export async function ping(interaction: CommandInteraction) {
    await interaction.createMessage("Pong!");
}
