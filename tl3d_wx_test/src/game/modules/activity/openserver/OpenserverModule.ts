module game{
/*
* OpenserverModule
*/
export class OpenserverModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "OpenserverModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new OpenserverProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {
        OpenserverModel.getInstance().init();
    }
}

    export class OpenserverEvent extends tl3d.BaseEvent {
        public static CLICK_TAB: string = "CLICK_TAB";
        public static RED_CHANGE: string = "RED_CHANGE";
        public static VIEW_CHANGE: string = "VIEW_CHANGE";
        public static OS_GIFT_CHANGE: string = "OS_GIFT_CHANGE";
        public data: any;
    }
}