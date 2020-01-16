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
/**
* name
*/
var game;
(function (game) {
    var RankTabIR = /** @class */ (function (_super) {
        __extends(RankTabIR, _super);
        function RankTabIR() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RankTabIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshData();
            },
            enumerable: true,
            configurable: true
        });
        RankTabIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.on(Laya.Event.CLICK, this, this.onClickBg);
                this.btn_wordShip.on(Laya.Event.CLICK, this, this.onClickMB);
                tl3d.ModuleEventManager.addEvent(game.RankingListEvent.RANK_DATA_CHANGE, this.updateInfo, this);
                tl3d.ModuleEventManager.addEvent(game.RankingListEvent.RANK_MOBAI_CHANGE, this.updateBtn, this);
                var ary = info.typeList;
                this._redName = ary[1];
                this._rankType = ary[2];
                this._bgSkin = ary[5];
                this.img_bg.skin = LanMgr.getLan("paihangbang/{0}", -1, this._bgSkin);
                this.updateInfo();
            }
            else {
                this._rankType = 0;
                this._redName = "";
                this._bgSkin = "";
                this.img_bg.skin = "";
                this.redPoint.setRedPointName("");
                this._firstData = null;
                this.off(Laya.Event.CLICK, this, this.onClickBg);
                this.btn_wordShip.off(Laya.Event.CLICK, this, this.onClickMB);
                tl3d.ModuleEventManager.removeEvent(game.RankingListEvent.RANK_DATA_CHANGE, this.updateInfo, this);
                tl3d.ModuleEventManager.removeEvent(game.RankingListEvent.RANK_MOBAI_CHANGE, this.updateBtn, this);
            }
        };
        RankTabIR.prototype.updateInfo = function () {
            var info = this.dataSource;
            this._firstData = info ? info.svo : null;
            if (this._firstData) {
                //有数据
                this.box_info.visible = true;
                this.lab_empty.visible = false;
                var valueName = LanMgr.getLan(info.typeList[3], -1);
                if (this._rankType == RankListType.Guild) {
                    this.lab_name.text = this._firstData.name;
                    var valueStr = this._firstData.level + "";
                    this.lab_value1.text = valueName + "：" + valueStr;
                    this.ui_headBox.dataSource = new UserHeadVo(this._firstData.head, this._firstData.level, this._firstData.headFrame, true);
                }
                else {
                    var head = this._firstData[3];
                    var name_1 = this._firstData[2];
                    var value = this._firstData[1];
                    var level = this._firstData[4];
                    var playerId = this._firstData[0];
                    var guildName = this._firstData[5];
                    var headFrame = this._firstData[6];
                    this.lab_name.text = name_1;
                    var valueStr = value + "";
                    if (this._rankType == RankListType.Tower) {
                        valueStr = game.TowerModel.getInstance().getCopyRankDesc(value);
                    }
                    else if (this._rankType == RankListType.Copy) {
                        valueStr = game.GuajiModel.getInstance().getCopyRankDesc(value);
                    }
                    this.lab_value1.text = valueName + "：" + valueStr;
                    this.ui_headBox.dataSource = new UserHeadVo(head, level, headFrame, false);
                }
                this.redPoint.setRedPointName(this._redName);
                this.updateBtn();
            }
            else {
                this.box_info.visible = false;
                this.lab_empty.visible = true;
                this.redPoint.setRedPointName("");
            }
        };
        RankTabIR.prototype.updateBtn = function () {
            //是否可以膜拜
            var can = App.hero.worshipInfo[this._rankType] ? true : false;
            if (can) {
                this.btn_wordShip.gray = true;
                this.btn_wordShip.label = LanMgr.getLan("", 12188);
            }
            else {
                this.btn_wordShip.gray = false;
                this.btn_wordShip.label = LanMgr.getLan("", 12189);
            }
        };
        RankTabIR.prototype.onClickBg = function (e) {
            if (!this._firstData) {
                showToast(LanMgr.getLan('', 10447));
                return;
            }
            dispatchEvt(new game.RankingListEvent(game.RankingListEvent.SHOW_RANKINGLIST_PANEL), this._rankType);
        };
        //点击膜拜
        RankTabIR.prototype.onClickMB = function (e) {
            e.stopPropagation();
            if (this.btn_wordShip.gray)
                return;
            dispatchEvt(new game.RankingListEvent(game.RankingListEvent.RANKINGLIST_IS_WORKSHIP), this._rankType);
        };
        return RankTabIR;
    }(ui.rank.render.RankTabIRUI));
    game.RankTabIR = RankTabIR;
})(game || (game = {}));
