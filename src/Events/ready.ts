import { ActionRowData, ButtonComponentData, ButtonStyle, ComponentType, GuildTextBasedChannel ,ChannelType, PermissionFlagsBits, OverwriteType} from "discord.js";
import { EventInterface } from "../Client/handlers/eventHandler";


export = <EventInterface<"ready">>{
    name:"ready",
    async run(client) {
        /* (await client.guilds.fetch("968497999565185064")).commands.set([
            client.commandManager.commands.get("deploy")!.data
        ]); */
        
        console.log("Bot is ready")
    },
}