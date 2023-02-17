import { ActivityType, Client, EmbedData, GatewayIntentBits, Guild, InteractionReplyOptions, RepliableInteraction } from "discord.js"
import { CommandHandler } from "./handlers/commandHandler"
import { ContextHandler } from "./handlers/contexHandler"
import { EventHandler } from "./handlers/eventHandler"

import { Info } from "./UI/embeds"


export class ExtendedClient extends Client {
    eventManager: EventHandler = new EventHandler(this)
    contextManager: ContextHandler = new ContextHandler()
    commandManager: CommandHandler = new CommandHandler()
    constructor() {
        super({
            failIfNotExists: false,
            presence: {
                status: "online",
                afk: false,
                activities: [{
                    name: "Exploding", 
                    type: ActivityType.Playing
                }],
            },
            intents: [
                GatewayIntentBits.Guilds
            ]
        })
        this.login(process.env.DISCORD_TOKEN).then();
    }
    info(ctx:RepliableInteraction,data:EmbedData, other?:InteractionReplyOptions){
        ctx.reply({
            embeds:[
                new Info(data)
            ], 
            ...other
        })
    }
    edit(ctx:RepliableInteraction,data:EmbedData, other?:InteractionReplyOptions){
        ctx.editReply({
            embeds:[
                new Info(data)
            ], 
            ...other
        })
    }
}