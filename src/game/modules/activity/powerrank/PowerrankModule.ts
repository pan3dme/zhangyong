module game{
/*
* PowerrankModule
*/
export class PowerrankModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "PowerrankModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new PowerrankProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {

    }
}

    export class PowerrankEvent extends tl3d.BaseEvent {
        public static SHOW_VIEW_EVENT: string = "SHOW_VIEW_EVENT";
        public static OPEN_DETAIL_PANEL: string = "OPEN_DETAIL_PANEL";
        public static SHOW_RANKVIEW_EVENT: string = "SHOW_RANKVIEW_EVENT";
        public static UPDATE_REDPOINT: string = "UPDATE_REDPOINT";
        public data: any;
        constructor($type: string, $data: any = null) {
            super($type);
            this.data = $data;
        }
    }
}