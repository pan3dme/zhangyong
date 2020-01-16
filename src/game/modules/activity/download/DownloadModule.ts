module game{
/*
* OnlineModule
*/
export class DownloadModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "DownloadModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new DownloadProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {
    }
}

    export class DownloadeEvent extends tl3d.BaseEvent {
        public static SEND_RECEIVE_EVENT: string = "SEND_RECEIVE_EVENT";
        public static RED_CHANGE_EVENT: string = "RED_CHANGE_EVENT";
        public static SHOW_WDXZ_VIEW: string = "SHOW_WDXZ_VIEW";
        public static DOWNLOAD_WEIDUAN:string = "DOWNLOAD_WEIDUAN";
        public data: any;
    }
}