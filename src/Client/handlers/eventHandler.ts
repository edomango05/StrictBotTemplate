import { ClientEvents } from "discord.js";
import { ExtendedClient } from "../Client";
import glob from "glob"
import { promisify } from "util";

type Runner<T extends keyof ClientEvents = "ready">  =  (client:ExtendedClient,...args:ClientEvents[T]) => Promise<void>

export interface EventInterface <T extends keyof ClientEvents = "ready"> {
    name:T,
    run:Runner<T>
}

export class EventHandler {
    constructor(client:ExtendedClient){
        this.initFiles(client)
    }
    private async initFiles(client:ExtendedClient){
        const globPromise = promisify(glob);
        const eventFiles: string[] = await globPromise(
            `${__dirname}/../../Events/**/*{.ts,.js}`
        );
        eventFiles.forEach(async (value: string) => {
            const file: EventInterface = await import(value);
            
            client.on(file.name, file.run.bind(null, client));
        });
    }
}