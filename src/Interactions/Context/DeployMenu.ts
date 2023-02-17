import { Attachment, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { InteractionInterface } from "../../Client/handlers/contexHandler";


export = <InteractionInterface<StringSelectMenuInteraction>>{
    name: "deploy_menu",
    async run(client, interaction) {
        const toDeploy = interaction.values.map(commandName => client.commandManager.commands.get(commandName)!.data)
        if (interaction.guild) {
            client.commandManager.deploy(interaction.guild, toDeploy)
            client.info(interaction, {
                description:`:small_blue_diamond: Sono stati aggiunti i comandi **${interaction.values.join(" , ")}** con successo.\n`,
            },{
                ephemeral:true
            })
        }
    },
}