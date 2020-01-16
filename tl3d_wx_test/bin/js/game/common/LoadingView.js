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
/*
* name;
*/
var common;
(function (common) {
    var LoadingView = /** @class */ (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            var _this = _super.call(this) || this;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this.group = UIConst.login_group;
            var blackbg = new Laya.Image("preload/black.jpg");
            blackbg.width = _this.width;
            blackbg.height = _this.height;
            _this.addChild(blackbg);
            //背景
            _this.bg = new Laya.Image(SkinUtil.getSysMapSkin(ModuleConst.loading));
            _this.bg.centerX = 0;
            _this.bg.centerY = 0;
            //logo
            _this.logo = new Laya.Image("preload/logo_da.png");
            // this.logo.centerX = 0;
            // this.logo.y = 70 + Launch.offsetY;
            _this.logo.right = 10;
            _this.logo.top = 10;
            //tip
            _this.tip = new Laya.Label("首次加载时间较长，请耐心等待");
            _this.tip.anchorX = 0.5;
            _this.tip.x = _this.width >> 1;
            _this.tip.y = 1131 + Launch.offsetY;
            _this.tip.color = ColorConst.BLACK;
            _this.tip.fontSize = 23;
            //刷新
            _this.lbl_refreh = new Laya.Label("点击刷新");
            _this.lbl_refreh.x = 530 + Launch.offsetX;
            _this.lbl_refreh.y = 1131 + Launch.offsetY;
            _this.lbl_refreh.align = "center";
            _this.lbl_refreh.color = ColorConst.GREEN;
            _this.lbl_refreh.fontSize = 23;
            _this.lbl_refreh.underline = true;
            _this.lbl_refreh.once(Laya.Event.CLICK, _this, function () {
                BingoSDK.gameRefresh();
            });
            // 批准文号：新广出审[2017]3428号 ISBN：978-7-7979-6890-4  出版服务单位：北京科海电子出版社  著作权人：福州天米互动游戏有限公司  著作权登记号：2016SR017541
            //新广出审[2017]3428 号；
            _this.lbl_info = new Laya.Label("抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。");
            _this.lbl_info.centerX = 0;
            _this.lbl_info.y = 1200 + Launch.offsetY;
            _this.lbl_info.align = "center";
            _this.lbl_info.color = ColorConst.BLACK;
            _this.lbl_info.fontSize = 18;
            //网络游戏出版物号：ISBN 978-7-7979-6890-4 
            _this.lbl_info2 = new Laya.Label("适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。");
            _this.lbl_info2.centerX = 0;
            _this.lbl_info2.y = 1230 + Launch.offsetY;
            _this.lbl_info2.align = "center";
            _this.lbl_info2.color = ColorConst.BLACK;
            _this.lbl_info2.fontSize = 18;
            _this.bar_bg = new Laya.Image("preload/bar_bg.png");
            _this.bar_value = new Laya.Image("preload/bar.png");
            _this.bar_bg2 = new Laya.Image("preload/bar_bg.png");
            _this.bar_value2 = new Laya.Image("preload/bar.png");
            _this.lbl_progress = new Laya.Label("加载中......");
            //box
            _this.box_bar = new Laya.Box();
            _this.box_bar.x = 26 + Launch.offsetX;
            _this.box_bar.y = 1046 + Launch.offsetY;
            _this.box_bar.width = 668;
            _this.box_bar.height = 75;
            //
            _this.bar_value.x = 27;
            _this.bar_value.y = 5;
            _this.bar_value2.x = 27;
            _this.bar_value2.y = 50;
            _this.bar_bg2.y = 45;
            _this.bar_value2.scaleX = 0;
            //
            _this.lbl_progress.centerX = 0;
            _this.lbl_progress.y = 1;
            _this.lbl_progress.anchorX = 0.5;
            _this.lbl_progress.align = "center";
            _this.lbl_progress.color = ColorConst.ZONGSE;
            _this.lbl_progress.fontSize = 22;
            //
            _this.box_bar.addChildren(_this.bar_bg, _this.bar_value, _this.lbl_progress, _this.bar_bg2, _this.bar_value2);
            _this.addChild(_this.bg);
            _this.addChild(_this.logo);
            _this.addChild(_this.tip);
            _this.addChild(_this.lbl_refreh);
            _this.addChild(_this.lbl_info);
            _this.addChild(_this.lbl_info2);
            _this.addChild(_this.box_bar);
            return _this;
        }
        LoadingView.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.setProgres2();
            this.lbl_progress.text = this.dataSource ? this.dataSource : LanMgr.getLan("加载中...", -1);
            this.bar_value.scaleX = 0;
        };
        /**
         * 设置进度条
         * @param value
         */
        LoadingView.prototype.setProgress = function (value) {
            var sufix = this.dataSource ? this.dataSource : LanMgr.getLan("加载中...", -1);
            this.lbl_progress.text = sufix + Math.ceil(value * 100).toFixed(0) + "%";
            this.bar_value.scaleX = value;
        };
        LoadingView.prototype.setProgres2 = function () {
            var _this = this;
            this.bar_value2.scaleX = 0;
            if (!this.parent)
                return;
            Laya.Tween.to(this.bar_value2, { scaleX: 1 }, 2000, Laya.Ease.linearInOut, Laya.Handler.create(this, function () {
                Laya.timer.frameOnce(10, _this, function () {
                    _this.setProgres2();
                });
            }));
        };
        LoadingView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.Tween.clearAll(this.bar_value2);
            this.bar_value2.scaleX = 0;
        };
        return LoadingView;
    }(common.DialogExt));
    common.LoadingView = LoadingView;
})(common || (common = {}));
