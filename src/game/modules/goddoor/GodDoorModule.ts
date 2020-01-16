module game{
/*
* ShenjiezhimenModule
*/
export class GodDoorModule extends tl3d.Module {
    constructor() {
        super();
    }
    public getModuleName(): string {
        return "ShenjiezhimenModule";
    }

    protected listProcessors(): Array<tl3d.Processor> {
        return [new GodDoorProcessor()];
    }

    /**
     * 模块入口
     */
    protected onRegister():void
    {

    }
}

    export class GodDoorEvent extends tl3d.BaseEvent {
        public static OPEN_SHEN_MEN_VIEW : string = "OPEN_SHEN_MEN_VIEW";
        public static OPEN_DOOR_EVENT: string = "OPEN_DOOR_EVENT";
        public static TURN_GOD_EVENT: string = "TURN_GOD_EVENT";
        public static TURN_GOD_OK: string = "TURN_GOD_OK";

        /** 旋转成功 */
        public static TURN_BUILD_OK : string = "TURN_BUILD_OK";
        public static KAIQI_SUCCESS : string = "KAIQI_SUCCESS";
        public data: any;
    }
}