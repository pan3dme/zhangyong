
interface IDialogQueueVo {
    uiName : string;        // ui名称必须要，用于判断弹窗是否弹出
    dataSource ?: any;
    args ?: any;
}

/** 弹窗队列管理
 *  需考虑预加载的情况下，所以只能在未打开界面时就去设置了当前队列的ui名称this._curUiName,这样才能按照我们需要的顺序去弹框；
 *  当this._curUiName的弹窗并没有真正被添加到舞台时，需要去重置弹下一个弹框
 */
class DialogQueueMgr {

    private _queueList : IDialogQueueVo[] = [];
    private _curUiName : string;
    constructor(){
    }

    public static _instance: DialogQueueMgr;
    public static getInstance(): DialogQueueMgr {
        if (!this._instance) {
            this._instance = new DialogQueueMgr();
        }
        return this._instance;
    }

    /** 设置当前弹窗 */
    public setCurDialog(name:string):void {
        this._curUiName = name;
        // loghgy("设置当前弹窗：",name);
    }
    public getCudDialogName():string {
        return this._curUiName;
    }

    /** 推入队列：uiName */
    public push(uiName:string, dataSource?:any, args?:any):void {
        // loghgy("推入队列：",uiName);
        this._queueList.push({uiName,dataSource,args});
    }

    /** 打开失败 */
    public showFail(uiName:string):void {
        if(this._curUiName && this._curUiName === uiName) {
            this._curUiName = null;
            this.show();
        }
    }

    /** 显示弹框 */
    private show():void {
        if(this._queueList.length == 0 || this._curUiName) return;
        let vo = this._queueList.shift();
        // loghgy("显示弹窗：",vo.uiName);
        UIMgr.showUI(vo.uiName,vo.dataSource);
    }

    /** 当前是否有弹窗 */
    public hasDialog():boolean {
        return this._curUiName ? true : false;
    }

    /** 关闭弹窗，判断是否需要弹出下一个弹窗 */
    public pushNext(uiName:string):any {
        if(this._curUiName && this._curUiName === uiName) {
            // loghgy("关闭当前队列弹窗弹窗：",uiName);
            this._curUiName = null;
            this.show();
        }else{
            this.show();
        }
    }

    /** 移除弹窗 */
    public removeByName(...uiNames:string[]):void {
        for( let i = this._queueList.length - 1 ; i >= 0 ; i-- ) {
            let name = this._queueList[i].uiName;
            if( name && uiNames.indexOf(name) != -1 ) {
                this._queueList.splice(i,1);
            }
        }
    }

    /** 清除 */
    public clear():void {
        this._queueList.length = 0;
        this._curUiName = null;
    }

}
