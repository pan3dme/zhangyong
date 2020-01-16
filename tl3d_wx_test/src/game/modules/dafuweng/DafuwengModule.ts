module game{
/*
* DafuwengModule
*/
export class DafuwengModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "DafuwengModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new DafuwengProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {
        DafuwengModel.getInstance();
    }
}

    export class DafuwengEvent extends tl3d.BaseEvent {
        /** 显示奇遇界面 */
        public static SHOW_QIYU_VIEW : string = "SHOW_QIYU_VIEW";
        /** 删除奇遇标签页 */
        public static DEL_QIYU_TAB : string = "DEL_QIYU_TAB";

        /** 更新化奇遇信息 */
        public static UPDATE_RISK_INFO : string = "UPDATE_RISK_INFO";
        /** 添加奇遇信息 */
        public static ADD_RISK_INFO : string = "ADD_RISK_INFO";
        /** 删除奇遇信息 */
        public static DEL_RISK_INFO : string = "DEL_RISK_INFO";

        public static CLICK_CAIDAXIAO: string = "CLICK_CAIDAXIAO";
        public static PLAY_SUCCESS : string = "PLAY_SUCCESS";
        public data: any;
    }
}