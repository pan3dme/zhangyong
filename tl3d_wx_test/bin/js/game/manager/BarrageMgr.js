/**
 * 暂时只支持文本的弹幕管理器
 */
var BarrageMgr = /** @class */ (function () {
    function BarrageMgr() {
        this._barrageList = [];
        this._uiPool = [];
        this._uiUsePool = [];
        this._rolling = false;
    }
    BarrageMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new BarrageMgr();
        }
        return this._instance;
    };
    BarrageMgr.prototype.addBarrages = function (barrages) {
        this._barrageList = this._barrageList.concat(barrages);
        if (!this._rolling) {
            this.startTick();
        }
    };
    /**
     * 移除某个父容器中的所有弹幕
     */
    BarrageMgr.prototype.removeBarrageByBox = function (box) {
        var flag = true;
        var tempId = -1;
        while (flag) {
            tempId = this.findItemByBox(box);
            flag = tempId != -1;
            if (flag) {
                this._barrageList.splice(tempId, 1);
            }
        }
        //移除正在播放的
        var flag1 = true;
        var tempId1 = -1;
        while (flag1) {
            tempId1 = this.findUiByBox(box);
            flag1 = tempId1 != -1;
            if (flag1) {
                var delui = this._uiUsePool.splice(tempId1, 1);
                Laya.Tween.clearAll(delui[0]);
                this.uiGC(delui[0]);
                // logyhj("强制回收");
            }
        }
    };
    BarrageMgr.prototype.findUiByBox = function (box) {
        if (!this._uiUsePool || this._uiUsePool.length <= 0) {
            return -1;
        }
        this._uiUsePool.findIndex(function (vo) {
            var ds = vo.dataSource;
            if (!ds)
                return false;
            return ds.parentBox == box;
        });
    };
    BarrageMgr.prototype.findItemByBox = function (box) {
        if (!this._barrageList || this._barrageList.length <= 0) {
            return -1;
        }
        return this._barrageList.findIndex(function (vo) { return vo.parentBox == box; });
    };
    BarrageMgr.prototype.startTick = function () {
        if (this._barrageList && this._barrageList.length > 0) {
            this._rolling = true;
            this.onRoll();
        }
        else {
            this.stopTick();
        }
    };
    BarrageMgr.prototype.stopTick = function () {
        this._rolling = false;
    };
    BarrageMgr.prototype.onRoll = function () {
        var _this = this;
        if (!this._barrageList || this._barrageList.length <= 0) {
            this.stopTick();
            return;
        }
        var vo = this._barrageList.shift();
        var box = vo.parentBox;
        if (!box) {
            box = Laya.stage;
        }
        if (box === Laya.stage || box.parent) {
            //添加
            var ui_1 = this.getUI();
            ui_1.dataSource = vo;
            ui_1.text = vo.barrageText;
            ui_1.x = box.width;
            this._forNum = 0;
            ui_1.y = this.checkPosY();
            box.addChild(ui_1);
            this._uiUsePool.push(ui_1);
            // logyhj("滚动:", ui.x, -ui.width);
            Laya.Tween.to(ui_1, { x: -ui_1.width }, 8000, null, Handler.create(this, function () {
                // logyhj("缓动回收");
                _this.uiGC(ui_1);
            }));
            Laya.timer.once(2000, this, this.onRoll);
        }
        else {
            //递归
            this.onRoll();
        }
    };
    BarrageMgr.prototype.checkPosY = function () {
        this._forNum++;
        var tempY = utils.random(200, 600);
        var flag = false;
        for (var i = 0; i < this._uiUsePool.length; i++) {
            var ui_2 = this._uiUsePool[i];
            var minY = ui_2.y;
            var maxY = minY + ui_2.height;
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
    };
    BarrageMgr.prototype.getUI = function () {
        if (this._uiPool.length > 0) {
            return this._uiPool.pop();
        }
        var uilab = new Laya.Label();
        uilab.color = "#ffefd5";
        uilab.fontSize = 24;
        return uilab;
    };
    BarrageMgr.prototype.uiGC = function (uilab) {
        uilab.dataSource = null;
        uilab.removeSelf();
        if (!this._uiPool) {
            this._uiPool = [];
        }
        this._uiPool.push(uilab);
        var idx = this._uiUsePool.indexOf(uilab);
        if (idx != -1) {
            this._uiUsePool.splice(idx, 1);
        }
    };
    return BarrageMgr;
}());
var BarrageVo = /** @class */ (function () {
    function BarrageVo() {
    }
    return BarrageVo;
}());
