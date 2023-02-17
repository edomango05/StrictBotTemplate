import { ActionRowData, ButtonComponentData, ButtonStyle, ComponentType, MessageActionRowComponentBuilder, MessageActionRowComponentData, StringSelectMenuComponentData } from "discord.js";
import { ExtendedClient } from "../Client";

export default class ExtendedSelectMenu {
    private currPage = 1
    private maxPages:number
    constructor(client:ExtendedClient,private data:StringSelectMenuComponentData){
        this.maxPages =  Math.ceil(this.data.options!.length/10)
        client.contextManager.customInteractions.set(this.data.customId,this)
    }
    public nextTo(direction:-1 | 1){  
        this.currPage = this.clamp(this.currPage+direction,1,this.maxPages)
    }
    private clamp(n:number, min:number, max:number){
        return  Math.min(Math.max(n, min), max)
    }
    public renderComponent(){
        return [
            <ActionRowData<ButtonComponentData>>{
                type:ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style:ButtonStyle.Danger,
                        label:"<",
                        disabled:this.currPage == 1,
                        customId: `next:-1,${this.data.customId.split(/:(.*)/s)[0]}`
                    },
                    {
                        type: ComponentType.Button,
                        style:ButtonStyle.Success,
                        label:">",
                        disabled:this.currPage == this.maxPages,
                        customId: `next:1,${this.data.customId.split(/:(.*)/s)[0]}`
                    }
                ]
            },
            <ActionRowData<StringSelectMenuComponentData>>{
                type:ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.StringSelect,
                        customId: this.data.customId,
                        disabled: this.data.disabled,
                        minValues: this.data.minValues,
                        maxValues: this.data.maxValues,
                        placeholder: this.data.placeholder,
                        options:this.data.options!.slice((this.currPage - 1)* 10, this.clamp(this.currPage* 10 - 1,0,this.data.options!.length -1))
                    },
                ]
            },
        ]
    }
}