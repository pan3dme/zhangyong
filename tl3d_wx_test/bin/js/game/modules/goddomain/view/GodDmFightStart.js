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
    var GodDmFightStart = /** @class */ (function (_super) {
        __extends(GodDmFightStart, _super);
        function GodDmFightStart() {
            var _this = _super.call(this) || this;
            _this.isModelClose = false;
            _this.uiScene = new Base2dSceneLayerExt();
            _this.addChild(_this.uiScene);
            return _this;
        }
        GodDmFightStart.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GodDmFightStart.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            this.drawData();
            this.refresh();
        };
        GodDmFightStart.prototype.drawData = function () {
            logfight("过场-----", this.dataSource);
            var data = this.dataSource.vo;
            if (data) {
                //左右方区分
                var atks = data.teams;
                if (atks) {
                    var isLeft = data.selfCamp == battle.BatteConsts.BATTLE_CAMPATK;
                    var atkLeft = isLeft ? atks[0] : atks[1];
                    var atkRight = isLeft ? atks[1] : atks[0];
                    var leftInfo = isLeft ? data.leftInfo : data.rightInfo;
                    var rightInfo = isLeft ? data.rightInfo : data.leftInfo;
                    this.img_01.skin = isLeft ? "jizhanshengyu/difang_bj.png" : "jizhanshengyu/wofang_bj1.png";
                    this.img_02.skin = isLeft ? "jizhanshengyu/wofang_bj.png" : "jizhanshengyu/difang_bj1.png";
                    this.cloneInfo(leftInfo, atkLeft);
                    this.cloneInfo(rightInfo, atkRight);
                    var leftvo = leftInfo[atkLeft];
                    var rightvo = rightInfo[atkRight];
                    this.ui_head_left.dataSource = new UserHeadVo(leftvo.head, leftvo.level, leftvo.headFrame);
                    this.lab_name_left.text = leftvo.name;
                    this.lab_power_left.text = leftvo.force + "";
                    this.ui_head_right.dataSource = new UserHeadVo(rightvo.head, rightvo.level, rightvo.headFrame);
                    this.lab_name_right.text = rightvo.name;
                    this.lab_power_right.text = rightvo.force + "";
                    this.leftModel = game.GodUtils.getShowGodModel(leftvo.godId, leftvo.skinId);
                    this.rightModel = game.GodUtils.getShowGodModel(rightvo.godId, rightvo.skinId);
                    this.list_left.dataSource = leftInfo;
                    this.list_right.dataSource = rightInfo;
                }
            }
        };
        //0：已阵亡 1：出战中 2：等待中
        GodDmFightStart.prototype.cloneInfo = function (infoList, team) {
            for (var i = 0; i < infoList.length; i++) {
                var element = infoList[i];
                element["state"] = i == team ? 1 : i < team ? 0 : 2;
            }
        };
        GodDmFightStart.prototype.close = function () {
            _super.prototype.close.call(this);
            this.uiScene.onExit();
        };
        GodDmFightStart.prototype.initView = function () {
            this.ani1.on(Laya.UIEvent.COMPLETE, this, this.onComplete1);
            this.ani2.on(Laya.UIEvent.COMPLETE, this, this.onComplete2);
        };
        GodDmFightStart.prototype.refresh = function () {
            if (this.dataSource.optType == startOptState.START) {
                this.img_vs.visible = false;
                this.ani2.play(0, false);
            }
            else if (this.dataSource.optType == startOptState.GUOCHANGCOMPLETE) {
                this.img_vs.visible = true;
                this.ani1.play(0, false);
            }
            else if (this.dataSource.optType == startOptState.GUOCHANG) {
                this.img_vs.visible = false;
                this.ani2.play(0, false);
            }
        };
        GodDmFightStart.prototype.onComplete1 = function () {
            this.ani1.off(Laya.UIEvent.COMPLETE, this, this.onComplete1);
            this.onExit();
        };
        GodDmFightStart.prototype.onComplete2 = function () {
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
        GodDmFightStart.prototype.onExit = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.dataSource && _this.dataSource.cb) {
                    _this.dataSource.cb();
                }
                _this.close();
            }, 1000);
        };
        return GodDmFightStart;
    }(ui.goddomain.fightStartUI));
    game.GodDmFightStart = GodDmFightStart;
})(game || (game = {}));
