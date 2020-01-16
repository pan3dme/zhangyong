/*
* name;
*/
var BaseSceneMgr = /** @class */ (function () {
    function BaseSceneMgr() {
        this._particles = {};
        this._count = 0;
    }
    BaseSceneMgr.getInstance = function () {
        if (!BaseSceneMgr._instance) {
            BaseSceneMgr._instance = new BaseSceneMgr();
        }
        return BaseSceneMgr._instance;
    };
    BaseSceneMgr.prototype.getScene = function () {
        if (!this._uiScene) {
            this._uiScene = new Base2dSceneLayer();
        }
        return this._uiScene;
    };
    //显示特效
    BaseSceneMgr.prototype.showEffect = function (target, cindex, id, px, py, scale, rotation, autoRemove, cb) {
        var _this = this;
        if (autoRemove === void 0) { autoRemove = false; }
        if (cb === void 0) { cb = null; }
        if (!this._uiScene) {
            this._uiScene = new Base2dSceneLayer();
        }
        this._count++;
        (cindex != -1) ? target.addChildAt(this._uiScene, cindex) : target.addChild(this._uiScene);
        this._parent = target;
        this._uiScene.addEffect(null, id, new tl3d.Vector3D(px, 0, py), scale, rotation, function ($particle) {
            if (_this._particles.hasOwnProperty(id)) {
                _this._uiScene.removeEffect($particle);
                return;
            }
            if (target.parent) {
                _this._particles[id] = $particle;
            }
            else {
                logdebug("添加的目标已移除");
                _this._uiScene.removeEffect($particle);
            }
            $particle.onComplete = function (particle) {
                if (cb) {
                    cb(particle);
                }
                if (autoRemove) {
                    _this.removeEffect(id);
                }
            };
        }, 0, 0);
        this._uiScene.onShow();
    };
    //移除特效
    BaseSceneMgr.prototype.removeEffect = function (id) {
        if (!this._uiScene) {
            return;
        }
        var $particle = this._particles[id];
        if ($particle) {
            this._count--;
            this._uiScene.removeEffect($particle);
            delete this._particles[id];
        }
        if (this._count <= 0 && this._uiScene.parent) {
            this._uiScene.onExit();
            this._uiScene.removeSelf();
        }
    };
    BaseSceneMgr.prototype.clearScene = function () {
    };
    return BaseSceneMgr;
}());
