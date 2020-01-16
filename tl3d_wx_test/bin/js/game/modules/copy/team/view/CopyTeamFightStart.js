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
var game;
(function (game) {
    /** 战斗开始 */
    var CopyTeamFightStart = /** @class */ (function (_super) {
        __extends(CopyTeamFightStart, _super);
        function CopyTeamFightStart() {
            var _this = _super.call(this) || this;
            _this.leftModel = 2010;
            _this.rightModel = 2010;
            _this.isModelClose = false;
            _this.uiScene = new Base2dSceneLayerExt();
            _this.addChild(_this.uiScene);
            return _this;
        }
        CopyTeamFightStart.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        CopyTeamFightStart.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.drawData();
            this.refresh();
        };
        CopyTeamFightStart.prototype.drawData = function () {
            logfight("过场-----", this.dataSource);
            var data = this.dataSource.vo;
            if (data) {
                var leftvo = data.leftInfo;
                var rightvo = data.rightInfo;
                if (leftvo) {
                    this.ui_head_left.dataSource = new UserHeadVo(leftvo.head, leftvo.level, leftvo.headFrame);
                    this.lab_name_left.text = leftvo.name;
                    this.lab_power_left.text = leftvo.force + "";
                    this.leftModel = leftvo.modelId;
                }
                if (rightvo) {
                    this.ui_head_right.dataSource = new UserHeadVo(rightvo.head, rightvo.level, rightvo.headFrame);
                    this.lab_name_right.text = rightvo.name;
                    this.lab_power_right.text = rightvo.force + "";
                    this.rightModel = rightvo.modelId;
                }
            }
        };
        CopyTeamFightStart.prototype.close = function () {
            _super.prototype.close.call(this);
            this.uiScene.onExit();
        };
        CopyTeamFightStart.prototype.initView = function () {
            this.ani1.on(Laya.UIEvent.COMPLETE, this, this.onComplete1);
            this.ani2.on(Laya.UIEvent.COMPLETE, this, this.onComplete2);
        };
        CopyTeamFightStart.prototype.refresh = function () {
            if (this.dataSource.optType == startOptState.START
                || this.dataSource.optType == startOptState.GUOCHANG) {
                this.img_vs.visible = false;
                this.ani2.play(0, false);
            }
            else if (this.dataSource.optType == startOptState.GUOCHANGCOMPLETE) {
                this.img_vs.visible = true;
                this.ani1.play(0, false);
            }
        };
        CopyTeamFightStart.prototype.onComplete1 = function () {
            this.ani1.off(Laya.UIEvent.COMPLETE, this, this.onComplete1);
            this.onExit();
        };
        CopyTeamFightStart.prototype.onComplete2 = function () {
            var _this = this;
            this.ani2.off(Laya.UIEvent.COMPLETE, this, this.onComplete2);
            //添加模型
            this.uiScene.addModelChar(String(this.leftModel), 160, 950, 180, 2.2);
            this.uiScene.addModelChar(String(this.rightModel), 560, 550, 180, 2.2);
            Laya.timer.frameOnce(3, this, function () {
                if (_this.dataSource.optType == startOptState.START) {
                    _this.img_vs.visible = true;
                    _this.ani1.play(0, false);
                }
                else {
                    if (_this.dataSource && _this.dataSource.cb) {
                        _this.dataSource.cb();
                    }
                }
            });
        };
        CopyTeamFightStart.prototype.onExit = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.dataSource && _this.dataSource.cb) {
                    _this.dataSource.cb();
                }
                _this.close();
            }, 1000);
        };
        return CopyTeamFightStart;
    }(ui.teamcopy.teamCopyStartUI));
    game.CopyTeamFightStart = CopyTeamFightStart;
})(game || (game = {}));
