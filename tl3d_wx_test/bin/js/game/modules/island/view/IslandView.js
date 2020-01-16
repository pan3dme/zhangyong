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
    var IslandView = /** @class */ (function (_super) {
        __extends(IslandView, _super);
        function IslandView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        IslandView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._model = game.IslandModel.getInstance();
            this.itemPanel.hScrollBarSkin = "";
            this._boxList = [];
            for (var i = 0; i < 7; i++) {
                var item = this['item' + i];
                this._boxList.push(item);
            }
            this.imgBg1.skin = SkinUtil.getSysMapSkin(ModuleConst.Island, 1);
            this.imgBg2.skin = SkinUtil.getSysMapSkin(ModuleConst.Island, 2);
            this.imgBg3.skin = SkinUtil.getSysMapSkin(ModuleConst.Island, 3);
            this.imgBg4.skin = SkinUtil.getSysMapSkin(ModuleConst.Island, 4);
        };
        IslandView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.lbDesc.y = GameUtil.isFullScreen() ? (137 + game.HudModel.TOP_ADD_HEIGHT) : 137;
            this.lbRefreshTime.y = GameUtil.isFullScreen() ? (168 + game.HudModel.TOP_ADD_HEIGHT) : 168;
        };
        IslandView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        IslandView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        IslandView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            for (var i = 0; i < this._boxList.length; i++) {
                this._boxList[i].on(Laya.Event.CLICK, this, this.onClickIsland);
                this._boxList[i].dataSource = null;
            }
            this.imgArrow.x = 0;
            this.imgArrow.visible = false;
            game.IslandUtil.stopRobLoop();
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        IslandView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_record, redpointName: "island_record", callback: this.onRecord.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onFanHui.bind(this) });
            for (var i = 0; i < this._boxList.length; i++) {
                this._boxList[i].on(Laya.Event.CLICK, this, this.onClickIsland);
            }
            var model = this._model;
            var list = model.getList();
            for (var i = 0; i < this._boxList.length; i++) {
                var box = this._boxList[i];
                box.dataSource = list[i];
            }
            this.updateView();
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            game.IslandUtil.loopRequestRobbed();
            model.updateEndTime(false);
            this.callLater(this.scrollTo);
        };
        IslandView.prototype.scrollTo = function () {
            var _this = this;
            if (this.imgArrow.visible) {
                this.itemPanel.scrollTo(this.imgArrow.x - 360);
            }
            else if (!this._init) {
                this.timer.frameOnce(5, this, function () {
                    _this._init = true;
                    if (_this.itemPanel) {
                        _this.itemPanel.scrollTo(364);
                    }
                });
            }
            // let pos:number = this.imgArrow.visible ? this.imgArrow.x-360 : 364;
            // this.itemPanel.scrollTo(pos);
        };
        IslandView.prototype.updateView = function () {
            var model = this._model;
            var curId = model.myOreInfo ? model.myOreInfo.islandId : 0;
            var itemRender = curId > 0 ? this._boxList.find(function (box) {
                var info = box.dataSource;
                return info && info.tbIsland.ID == curId;
            }) : null;
            this.setIndexImage(itemRender);
        };
        /**
         * 设置当前索引位置
         * @param guanqia
         */
        IslandView.prototype.setIndexImage = function (item) {
            if (item) {
                var targetX = item.x + item.width / 2;
                if (this.imgArrow.x != targetX) {
                    this.imgArrow.x = targetX;
                    this.imgArrow.y = item.y + item.height / 2;
                    this.imgArrow.visible = true;
                    this.imgArrow.ani1.play(0, true);
                    this.imgArrow.ani2.play(0, true);
                }
            }
            else {
                this.imgArrow.visible = false;
            }
        };
        /** 更新时间 */
        IslandView.prototype.updateTime = function () {
            var time = this._model.getNextRefreshTime();
            this.lbRefreshTime.text = LanMgr.getLan('', 10190, GameUtil.toCountdown(time, "hh:mm:ss"));
        };
        /** 进入岛屿 */
        IslandView.prototype.onClickIsland = function (event) {
            var box = event.target;
            if (box && box.dataSource) {
                dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_ORE_MAP, box.dataSource));
            }
        };
        /** 规则 */
        IslandView.prototype.onRule = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_RULE_VIEW));
        };
        /** 记录 */
        IslandView.prototype.onRecord = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_RESCORD_VIEW));
        };
        IslandView.prototype.onFanHui = function () {
            dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_JINGJI));
        };
        return IslandView;
    }(ui.island.IslandMainUI));
    game.IslandView = IslandView;
})(game || (game = {}));
