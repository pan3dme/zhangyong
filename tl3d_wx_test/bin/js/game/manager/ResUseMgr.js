var ResUseMgr = /** @class */ (function () {
    function ResUseMgr() {
    }
    /** 开启定时 */
    ResUseMgr.startTick = function () {
        Laya.timer.clear(this, this.checkRes);
        Laya.timer.loop(ResUseMgr.TICK_TIME * 1000, this, this.checkRes);
    };
    /** 检测资源是否需要释放 */
    ResUseMgr.checkRes = function () {
        var curTime = (new Date().getTime()) / 1000;
        for (var url in this._resDic) {
            var info = this._resDic[url];
            if (!info) {
                delete this._resDic[url];
                continue;
            }
            if (info.num == 0 && info.lastTime > 0 && (curTime - info.lastTime) >= ResUseMgr.DESTROY_TIME) {
                this._resDic[url] = null;
                delete this._resDic[url];
                Laya.loader.clearTextureRes(url);
                loghgy("销毁资源", url);
            }
        }
    };
    /** 使用资源 */
    ResUseMgr.useRes = function (urls) {
        if (!urls)
            return;
        for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
            var url = urls_1[_i];
            if (!this._resDic[url]) {
                this._resDic[url] = { num: 0 };
            }
            var info = this._resDic[url];
            ++info.num;
            info.lastTime = 0;
            if (info.num <= 0) {
                logerror("ResUseManager.资源使用错误,次数<=0", url, info.num);
            }
            loghgy("使用资源", url, info.num);
        }
    };
    /** 释放资源 */
    ResUseMgr.releaseRes = function (urls) {
        if (!urls)
            return;
        for (var _i = 0, urls_2 = urls; _i < urls_2.length; _i++) {
            var url = urls_2[_i];
            var info = this._resDic[url];
            if (!info || info.num <= 0)
                continue;
            --info.num;
            info.lastTime = (new Date().getTime()) / 1000;
            loghgy("释放资源", url, info.num);
        }
    };
    /** 是否存在资源 */
    ResUseMgr.isExistRes = function (url) {
        var info = this._resDic[url];
        return info && info.num > 0;
    };
    /** 清除定时 */
    ResUseMgr.clearTick = function () {
        Laya.timer.clear(this, this.checkRes);
    };
    /** 加载图集 */
    ResUseMgr.loadRes = function (atlas, showWail) {
        if (showWail === void 0) { showWail = false; }
        return new Promise(function (resolve, reject) {
            var unloadList = atlas.filter(function (url) {
                return !Laya.loader.getRes(url);
            });
            if (unloadList.length == 0) {
                resolve();
                return;
            }
            var uiMgr = UIMgr.getInstance();
            showWail && uiMgr.showWaiting();
            Laya.loader.load(unloadList, Handler.create(null, function (result) {
                showWail && uiMgr.hideWaiting();
                if (result === false) {
                    logdebug("资源加载失败：", unloadList);
                    return;
                }
                resolve();
            }), Handler.create(null, function (value) {
                showWail && uiMgr.waitingProgress(value);
            }));
        });
    };
    /** 是否存在资源 */
    ResUseMgr.hasRes = function () {
        var urlAry = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            urlAry[_i] = arguments[_i];
        }
        return urlAry.every(function (url) {
            return Laya.loader.getRes(url);
        });
    };
    ResUseMgr._resDic = {}; // 资源使用字典
    ResUseMgr.TICK_TIME = 30; // 定时间隔检测时间
    ResUseMgr.DESTROY_TIME = 180; // 销毁时间，多久时间没使用，进行销毁
    return ResUseMgr;
}());
