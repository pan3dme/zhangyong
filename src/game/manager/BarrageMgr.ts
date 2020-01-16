/**
 * 暂时只支持文本的弹幕管理器
 */
class BarrageMgr {
    private _barrageList: BarrageVo[];
    private _rolling: boolean;
    //ui缓存池
    private _uiPool: Laya.Label[];
    private _uiUsePool: Laya.Label[];

    public static _instance: BarrageMgr;
    public static getInstance(): BarrageMgr {
        if (!this._instance) {
            this._instance = new BarrageMgr();
        }
        return this._instance;
    }

    constructor() {
        this._barrageList = [];
        this._uiPool = [];
        this._uiUsePool = [];
        this._rolling = false;
    }

    public addBarrages(barrages: BarrageVo[]) {
        this._barrageList = this._barrageList.concat(barrages);
        if (!this._rolling) {
            this.startTick();
        }
    }

    /**
     * 移除某个父容器中的所有弹幕
     */
    public removeBarrageByBox(box) {
        let flag = true;
        let tempId = -1;
        while (flag) {
            tempId = this.findItemByBox(box);
            flag = tempId != -1;
            if (flag) {
                this._barrageList.splice(tempId, 1);
            }
        }

        //移除正在播放的
        let flag1 = true;
        let tempId1 = -1;
        while (flag1) {
            tempId1 = this.findUiByBox(box);
            flag1 = tempId1 != -1;
            if (flag1) {
                let delui: Laya.Label[] = this._uiUsePool.splice(tempId1, 1);
                Laya.Tween.clearAll(delui[0]);
                this.uiGC(delui[0]);
                // logyhj("强制回收");
            }
        }

    }

    private findUiByBox(box): number {
        if (!this._uiUsePool || this._uiUsePool.length <= 0) {
            return -1;
        }
        this._uiUsePool.findIndex((vo) => {
            let ds = vo.dataSource;
            if (!ds) return false;
            return ds.parentBox == box;
        });
    }

    private findItemByBox(box): number {
        if (!this._barrageList || this._barrageList.length <= 0) {
            return -1;
        }
        return this._barrageList.findIndex(vo => vo.parentBox == box);
    }

    private startTick() {
        if (this._barrageList && this._barrageList.length > 0) {
            this._rolling = true;
            this.onRoll();
        } else {
            this.stopTick();
        }
    }

    private stopTick() {
        this._rolling = false;
    }

    private onRoll() {
        if (!this._barrageList || this._barrageList.length <= 0) {
            this.stopTick();
            return;
        }
        let vo = this._barrageList.shift();
        let box = vo.parentBox;
        if (!box) {
            box = Laya.stage;
        }
        if (box === Laya.stage || box.parent) {
            //添加
            let ui = this.getUI();
            ui.dataSource = vo;
            ui.text = vo.barrageText;
            ui.x = box.width;
            this._forNum = 0;
            ui.y = this.checkPosY();
            box.addChild(ui);
            this._uiUsePool.push(ui);
            // logyhj("滚动:", ui.x, -ui.width);
            Laya.Tween.to(ui, { x: -ui.width }, 8000, null, Handler.create(this, () => {
                // logyhj("缓动回收");
                this.uiGC(ui);
            }));
            Laya.timer.once(2000, this, this.onRoll);
        } else {
            //递归
            this.onRoll();
        }
    }

    private _forNum:number;
    private checkPosY():number {
        this._forNum++;
        let tempY: number = utils.random(200, 600);

        let flag: boolean = false;
        for (let i = 0; i < this._uiUsePool.length; i++) {
            let ui = this._uiUsePool[i];
            let minY = ui.y;
            let maxY = minY + ui.height;
            if (tempY >= minY && minY <= maxY) {
                flag = true;
                break;
            }
            
        }

        if (flag && this._forNum <= 3) {
            //最多递归3次
            return this.checkPosY();
        }
        return tempY;
    }

    private getUI(): Laya.Label {
        if (this._uiPool.length > 0) {
            return this._uiPool.pop();
        }
        let uilab = new Laya.Label();
        uilab.color = "#ffefd5";
        uilab.fontSize = 24;
        return uilab;
    }

    private uiGC(uilab: Laya.Label) {
        uilab.dataSource = null;
        uilab.removeSelf();
        if (!this._uiPool) {
            this._uiPool = [];
        }
        this._uiPool.push(uilab);
        let idx = this._uiUsePool.indexOf(uilab);
        if (idx != -1) {
            this._uiUsePool.splice(idx, 1);
        }
    }
}

class BarrageVo {
    public barrageText: string;
    public parentBox: any;//UI容器
}

