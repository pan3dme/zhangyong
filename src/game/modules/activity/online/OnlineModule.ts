module game{
/*
* OnlineModule
*/
export class OnlineModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "OnlineModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new OnlineProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {
    }
}

    export class OnlineEvent extends tl3d.BaseEvent {
        public static SEND_RECEIVE_EVENT: string = "SEND_RECEIVE_EVENT";
        public static RED_CHANGE_EVENT: string = "RED_CHANGE_EVENT";
        public data: any;
    }
}