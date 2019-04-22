import { EventEmitter } from '@angular/core';

export class EventEmitterService {

    private static emitters: {[eventName: string]: EventEmitter<any>} = {};

    public static getEvent(eventName: string): EventEmitter<any> {
        
        if(!this.emitters[eventName])
            this.emitters[eventName] = new EventEmitter<any>();

        return this.emitters[eventName];
    }
}