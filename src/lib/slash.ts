import { z } from "npm:zod@3.23.8";
import { info } from "jsr:@dunno/ono/loggers";
import bot from "./bot.ts";
import env from "./env.ts";

export enum OptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE,
    MENTIONABLE,
    NUMBER,
    ATTACHMENT,
}

export const CommandOption = z.object({
    type: z.nativeEnum(OptionType).default(OptionType.STRING),
    name: z.string().min(1).max(32),
    description: z.string().min(1).max(100),
    required: z.boolean().default(false)
})

export const Command = z.object({
    name: z.string().min(1).max(32),
    description: z.string().min(1).max(100),
    options: z.array(CommandOption).default([])
})

export type Command = z.infer<typeof Command>
export type CommandOption = z.infer<typeof CommandOption>

export const slash = Command.parse

export async function refreshCommands(commands: Command[]) {
    info("refreshing slash commands...");

    const allCommands = Object.values(commands) as unknown as Record<string, unknown>;
    await bot.requestHandler.request("PUT", `/applications/${env.CLIENT_ID}/commands`, true, allCommands);
}
