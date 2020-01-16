var tl3d;
(function (tl3d) {
    var Engine = /** @class */ (function () {
        function Engine() {
        }
        Engine.init = function ($caves) {
            tl3d.Scene_data.vpMatrix = new tl3d.Matrix3D;
            tl3d.Scene_data.canvas3D = $caves;
            tl3d.Scene_data.context3D = new tl3d.Context3D();
            tl3d.Scene_data.context3D.init($caves);
            tl3d.UIManager.getInstance().init();
            tl3d.Scene_data.cam3D = new tl3d.Camera3D;
            tl3d.Scene_data.focus3D = new tl3d.Object3D;
            tl3d.Scene_data.focus3D.x = 0;
            tl3d.Scene_data.focus3D.y = 0;
            tl3d.Scene_data.focus3D.z = 0;
            tl3d.Scene_data.focus3D.rotationY = 135;
            tl3d.Scene_data.focus3D.rotationX = -45;
            tl3d.Scene_data.light = new tl3d.LightVo();
            Engine.testBlob();
            Engine.resetSize();
            Engine.initShadow();
            tl3d.TimeUtil.init();
            tl3d.PathManager.init();
        };
        Engine.resReady = function () {
            Engine.initPbr();
        };
        Engine.testBlob = function () {
            //Scene_data.supportBlob = false;
            //return;
            //todo packageapp
            // try {
            //     var blob = new Blob();
            // } catch (e) {
            //     Scene_data.supportBlob = false;
            //     return;
            // }
            // Scene_data.supportBlob = true;
        };
        Engine.initPbr = function () {
            if (!tl3d.Scene_data.pubLut) {
                tl3d.TextureManager.getInstance().getTexture(tl3d.Scene_data.fileRoot + "base/brdf_ltu.jpg", function ($texture) {
                    tl3d.Scene_data.pubLut = $texture.texture;
                }, 1);
            }
            // if (!Scene_data.skyCubeMap) {
            //     TextureManager.getInstance().loadCubeTexture(Scene_data.fileRoot + "base/cube/e", ($ary: any) => {
            //         Scene_data.skyCubeMap = $ary;
            //     })
            // }
        };
        Engine.initShadow = function () {
            tl3d.TextureManager.getInstance().getTexture(tl3d.Scene_data.fileRoot + "base/shadow.png", function ($texture) {
                tl3d.Display3dShadow.texture = $texture.texture;
            });
        };
        Engine.resetSize = function (a, b) {
            if (a === void 0) { a = 0; }
            if (b === void 0) { b = 0; }
            if (Engine.needInputTxt) {
                return;
            }
            //Scene_data.stageWidth = document.documentElement.clientWidth;
            //Scene_data.stageHeight = document.documentElement.clientHeight;
            //var flag: boolean = false;
            if (document.body.clientWidth > document.body.clientHeight) {
                tl3d.Scene_data.stageWidth = document.body.clientWidth;
                tl3d.Scene_data.stageHeight = document.body.clientHeight;
                tl3d.Scene_data.verticalScene = false;
            }
            else {
                tl3d.Scene_data.stageWidth = document.body.clientHeight;
                tl3d.Scene_data.stageHeight = document.body.clientWidth;
                tl3d.Scene_data.verticalScene = true;
            }
            // Scene_data.stageWidth = document.body.clientWidth;
            // Scene_data.stageHeight = document.body.clientHeight;
            // Scene_data.verticalScene = false;
            if (!this.needVertical) {
                tl3d.Scene_data.stageWidth = document.body.clientWidth;
                tl3d.Scene_data.stageHeight = document.body.clientHeight;
                tl3d.Scene_data.verticalScene = false;
            }
            tl3d.Scene_data.canvas3D.width = tl3d.Scene_data.stageWidth;
            tl3d.Scene_data.canvas3D.height = tl3d.Scene_data.stageHeight;
            tl3d.Scene_data.context3D.resetSize(tl3d.Scene_data.stageWidth, tl3d.Scene_data.stageHeight);
            tl3d.UIManager.getInstance().resize();
            this.resetViewMatrx3D();
            tl3d.Scene_data.canvas3D.style.position = "absolute";
            tl3d.Scene_data.canvas3D.style.left = "0px";
            tl3d.Scene_data.canvas3D.style.top = "0px";
            if (tl3d.Scene_data.verticalScene) {
                tl3d.Scene_data.canvas3D.style.transform = "matrix(0,1,-1,0," + tl3d.Scene_data.stageHeight + ",0)";
                //Scene_data.canvas3D.style.webkitTransform = "matrix(0,1,-1,0," + Scene_data.stageHeight + ",0)";
            }
            else {
                tl3d.Scene_data.canvas3D.style.transform = "matrix(1,0,0,1,0,0)";
                //Scene_data.canvas3D.style.webkitTransform = "matrix(0,1,-1,0," + Scene_data.stageHeight + ",0)";
            }
            tl3d.Scene_data.canvas3D.style.transformOrigin = "0px 0px 0px";
            tl3d.Scene_data.canvas3D.style.top = "0px";
        };
        Engine.resetViewMatrx3D = function () {
            if (tl3d.Scene_data.viewMatrx3D) {
                tl3d.Scene_data.viewMatrx3D.identity();
            }
            else {
                tl3d.Scene_data.viewMatrx3D = new tl3d.Matrix3D;
            }
            var fovw = tl3d.Scene_data.stageWidth;
            var fovh = tl3d.Scene_data.stageHeight;
            tl3d.Scene_data.sceneViewHW = Math.max(fovw, fovh);
            tl3d.Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.sceneCamScale, 1, 50, tl3d.Scene_data.camFar);
            tl3d.Scene_data.viewMatrx3D.appendScale(1 * (tl3d.Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (tl3d.Scene_data.sceneViewHW / fovw * 2), 1);
        };
        Engine.update = function () {
            tl3d.TimeUtil.update();
            tl3d.FpsMc.update();
        };
        Engine.unload = function () {
            //NetManager.getInstance().close();
        };
        Engine.needVertical = true;
        Engine.needInputTxt = false; //在输入文本时，将不再可调整大小
        Engine.sceneCamScale = 1.76;
        return Engine;
    }());
    tl3d.Engine = Engine;
})(tl3d || (tl3d = {}));
