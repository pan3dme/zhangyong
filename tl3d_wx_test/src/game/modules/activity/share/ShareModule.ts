module game{
/*
* ShareModule
*/
export class ShareModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "ShareModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new ShareProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {

    }
}

    export class ShareEvent extends tl3d.BaseEvent {
        public static SEND_RECIVE_REWARD: string = "SEND_RECIVE_REWARD";
        public static RED_POINT_CHANGE: string = "RED_POINT_CHANGE";
        public data: any;
    }
}