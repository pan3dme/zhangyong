class ToastMgr {
    constructor() {
    }

    private static _instance: ToastMgr;
    public static getInstance(): ToastMgr {
        if (!ToastMgr._instance) {
            ToastMgr._instance = new ToastMgr();
        }
        return ToastMgr._instance;
    }

    /**存要弹出提示的数组 */
    private _arrText: Array<toastData> = new Array();

    /**把需要弹出的提示压到数组 */
    public arrTextPushBack(data: toastData) {
        let bool: boolean = this._arrText.length == 0;
        this._arrText.push(data);
        if (bool) this.isArrText();
    }

    /**数组内是否还有文字 */
    public isArrText(): void {
        if (this._arrText.length == 0) return;
        let textData = this._arrText[0];
        this.createToastWithData(textData.$text, textData.color);
    }

    /**删除数组最后一个并且判断 */
    public arrTextPop(): void {
        this._arrText.shift();
        this.isArrText();
    }

    /**从对象池中实例化提示窗 */
    private createToastWithData(str: string, color: string) {
        let toast: ToastView = Laya.Pool.getItemByClass('toast', ToastView);
        toast.init(str, color);
        Laya.stage.addChild(toast);
        Laya.timer.once(300, this, this.arrTextPop);
        Laya.Tween.to(toast, { y: toast.y - 200 }, 1000, null, Handler.create(this, () => {
            Laya.Pool.recover('toast', toast);
            Laya.stage.removeChild(toast);
        }));
    }
}

class ToastView extends ui.component.ToastViewUI {
    constructor() {
        super();
        this.zOrder = 9999;
    }

    public init(str: string, color: string): void {
        if(!this.lab_text) return;
        this.alpha = 1;
        this.lab_text.text = str;
        this.lab_text.color = color;
        this.x = Laya.stage.width / 2;
        this.y = Laya.stage.height * (3/4);
    }
}

interface toastData {
    $text: string;
    color: string;
}