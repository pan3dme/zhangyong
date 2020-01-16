/** 弹窗队列管理
 *  需考虑预加载的情况下，所以只能在未打开界面时就去设置了当前队列的ui名称this._curUiName,这样才能按照我们需要的顺序去弹框；
 *  当this._curUiName的弹窗并没有真正被添加到舞台时，需要去重置弹下一个弹框
 */
var DialogQueueMgr = /** @class */ (function () {
    function DialogQueueMgr() {
        this._queueList = [];
    }
    DialogQueueMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new DialogQueueMgr();
        }
        return this._instance;
    };
    /** 设置当前弹窗 */
    DialogQueueMgr.prototype.setCurDialog = function (name) {
        this._curUiName = name;
        // loghgy("设置当前弹窗：",name);
    };
    DialogQueueMgr.prototype.getCudDialogName = function () {
        return this._curUiName;
    };
    /** 推入队列：uiName */
    DialogQueueMgr.prototype.push = function (uiName, dataSource, args) {
        // loghgy("推入队列：",uiName);
        this._queueList.push({ uiName: uiName, dataSource: dataSource, args: args });
    };
    /** 打开失败 */
    DialogQueueMgr.prototype.showFail = function (uiName) {
        if (this._curUiName && this._curUiName === uiName) {
            this._curUiName = null;
            this.show();
        }
    };
    /** 显示弹框 */
    DialogQueueMgr.prototype.show = function () {
        if (this._queueList.length == 0 || this._curUiName)
            return;
        var vo = this._queueList.shift();
        // loghgy("显示弹窗：",vo.uiName);
        UIMgr.showUI(vo.uiName, vo.dataSource);
    };
    /** 当前是否有弹窗 */
    DialogQueueMgr.prototype.hasDialog = function () {
        return this._curUiName ? true : false;
    };
    /** 关闭弹窗，判断是否需要弹出下一个弹窗 */
    DialogQueueMgr.prototype.pushNext = function (uiName) {
        if (this._curUiName && this._curUiName === uiName) {
            // loghgy("关闭当前队列弹窗弹窗：",uiName);
            this._curUiName = null;
            this.show();
        }
        else {
            this.show();
        }
    };
    /** 移除弹窗 */
    DialogQueueMgr.prototype.removeByName = function () {
        var uiNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uiNames[_i] = arguments[_i];
        }
        for (var i = this._queueList.length - 1; i >= 0; i--) {
            var name_1 = this._queueList[i].uiName;
            if (name_1 && uiNames.indexOf(name_1) != -1) {
                this._queueList.splice(i, 1);
            }
        }
    };
    /** 清除 */
    DialogQueueMgr.prototype.clear = function () {
        this._queueList.length = 0;
        this._curUiName = null;
    };
    return DialogQueueMgr;
}());
