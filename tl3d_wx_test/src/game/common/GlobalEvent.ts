
module common {

    export class GlobalEvent extends tl3d.BaseEvent {

        /** dialog被创建 */
        public static DIALOG_CREATED : string = "DIALOG_CREATED";
        /** dialog被打开了(有弹窗效果时,等效果结束触发) */
        public static DIALOG_OPENED : string = "DIALOG_OPENED";
        /** dialog被关闭了 */
        public static DIALOG_CLOSED : string = "DIALOG_CLOSED";

        public data: any;

        constructor($type: string,$data:any=null){
            super($type);
            this.data = $data;
        }
    }
}