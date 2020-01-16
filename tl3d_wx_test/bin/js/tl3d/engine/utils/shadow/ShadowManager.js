var tl3d;
(function (tl3d) {
    var ShadowManager = /** @class */ (function () {
        function ShadowManager() {
            this._displayList = new Array;
            tl3d.ProgrmaManager.getInstance().registe(tl3d.Display3DShadowShader.Display3DShadowShader, new tl3d.Display3DShadowShader());
        }
        ShadowManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ShadowManager();
            }
            return this._instance;
        };
        ShadowManager.prototype.addShadow = function () {
            var display = this.getIdleShadow();
            var sd = new tl3d.Shadow();
            display.addShadow(sd);
            return sd;
        };
        ShadowManager.prototype.removeShadow = function (sd) {
            sd.display.removeShadow(sd);
        };
        ShadowManager.prototype.update = function () {
            if (this._displayList.length) {
                tl3d.Scene_data.context3D.setWriteDepth(false);
                for (var i = 0; i < this._displayList.length; i++) {
                    this._displayList[i].update();
                }
                tl3d.Scene_data.context3D.setWriteDepth(true);
            }
        };
        ShadowManager.prototype.getIdleShadow = function () {
            for (var i = 0; i < this._displayList.length; i++) {
                if (this._displayList[i].hasIdle()) {
                    return this._displayList[i];
                }
            }
            var display = new tl3d.Display3dShadow();
            this._displayList.push(display);
            return display;
        };
        return ShadowManager;
    }());
    tl3d.ShadowManager = ShadowManager;
})(tl3d || (tl3d = {}));
