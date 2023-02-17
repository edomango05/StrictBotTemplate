import { ActionRowData, ApplicationCommandAutocompleteStringOptionData, ApplicationCommandOptionType, ChatInputApplicationCommandData, ComponentType, SelectMenuComponentOptionData, StringSelectMenuComponentData} from "discord.js"
import { CommandInterface } from "../../Client/handlers/commandHandler"
import ExtendedSelectMenu from "../../Client/utils/ExtendedSelectMenu"

export = <CommandInterface<ChatInputApplicationCommandData>>{
    data: {
        name: "deploy",
        description: "aggiungi i comandi in un server"
    },
    async run(client, interaction) {
        const commandList = client.commandManager.commands.clone()
        commandList.delete("deploy")
        const selectMenu = new ExtendedSelectMenu(client, {
            type: ComponentType.StringSelect,
            customId: "deploy_menu",
            disabled: false,
            minValues: 1,
            maxValues: commandList.size - 1,
            placeholder: "Vedi lista comandi",
            options: commandList.map(command => {
                return {
                    description: ("description" in command.data) ?  command.data.description : undefined,
                    label: command.data.name,
                    value: command.data.name
                }
            })
        },)
        client.info(interaction, {
            description:":small_blue_diamond: **Scegli i comandi che vuoi abilitare nel server**",
        },{
            components: selectMenu.renderComponent(),
            ephemeral:true
        })
    },
}