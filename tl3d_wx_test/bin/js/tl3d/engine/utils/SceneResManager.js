var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tl3d;
(function (tl3d) {
    var SceneResManager = /** @class */ (function (_super) {
        __extends(SceneResManager, _super);
        function SceneResManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneResManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneResManager();
            }
            return this._instance;
        };
        //加载场景
        SceneResManager.prototype.loadSceneRes = function ($url, $completeFun, $progressFun, $readDataFun) {
            var sceneRes;
            if (this._dic[$url]) {
                sceneRes = this._dic[$url];
            }
            else {
                sceneRes = new tl3d.SceneRes();
                this._dic[$url] = sceneRes;
            }
            sceneRes.load($url, $completeFun, $progressFun, $readDataFun);
            this.clearSceneUse(sceneRes);
            return sceneRes;
        };
        //通过id清理引用
        SceneResManager.prototype.clearSceneUseById = function (id) {
            var sceneRes = this._dic[id];
            if (sceneRes) {
                sceneRes.clearUseNum();
            }
        };
        //清理场景使用
        SceneResManager.prototype.clearSceneUse = function (curRes) {
            for (var key in this._dic) {
                var rc = this._dic[key];
                if (rc.useNum > 0 && rc != curRes) {
                    rc.useNum = 0;
                }
            }
            curRes.useNum = 1;
        };
        return SceneResManager;
    }(tl3d.ResGC));
    tl3d.SceneResManager = SceneResManager;
})(tl3d || (tl3d = {}));
