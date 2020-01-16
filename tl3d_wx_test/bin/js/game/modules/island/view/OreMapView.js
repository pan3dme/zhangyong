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
    var OreMapView = /** @class */ (function (_super) {
        __extends(OreMapView, _super);
        function OreMapView() {
            var _this = _super.call(this) || this;
            _this.group = UIConst.hud_group;
            return _this;
        }
        OreMapView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.itemList.cells.forEach(function (item, index) {
                var yu = Math.floor(index / 6);
                if (yu % 2 == 1) {
                    item.x += 86;
                }
            });
            this.itemPanel.hScrollBarSkin = "";
            this.itemPanel.hScrollBar.on(Laya.Event.CHANGE, this, this.onPanelScroll);
        };
        OreMapView.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this.itemPanel.width = w;
            this.itemPanel.height = h;
        };
        OreMapView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        OreMapView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        OreMapView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            Laya.timer.clearAll(this);
            this.itemList.array = null;
            game.IslandUtil.stopIslandLoop();
            UIMgr.hideUIByName(UIConst.SysTopView);
        };
        OreMapView.prototype.onPanelScroll = function () {
            var info = this.dataSource;
            if (info) {
                info.scrollX = this.itemPanel.hScrollBar.value;
            }
            // console.log("onPanelScroll",this.itemPanel.hScrollBar.value);
        };
        OreMapView.prototype.initView = function () {
            var funList = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_record, redpointName: "island_record", callback: this.onRecord.bind(this) },
            ];
            var resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry: resAry, funList: funList, closeCallback: this.onExit.bind(this) });
            this.updateView();
            Laya.timer.loop(1000, this, this.updateTime);
            this.updateTime();
            var info = this.dataSource;
            game.IslandUtil.loopRequestIsland(info.tbIsland.ID);
            this.callLater(this.scrollTo);
        };
        OreMapView.prototype.scrollTo = function () {
            var info = this.dataSource;
            if (!info)
                return;
            var scrollX = info.scrollX;
            if (scrollX == 0) {
                var self_1 = this.getSelfIsLandInfo();
                if (self_1) {
                    var cell = this.itemList.getCell(self_1.pos - 1);
                    if (cell) {
                        scrollX = this.itemList.x + cell.x + cell.width / 2 - 360;
                    }
                }
                else {
                    info.scrollX = 230;
                    scrollX = info.scrollX;
                }
            }
            this.itemPanel.scrollTo(scrollX);
        };
        //获取自己的
        OreMapView.prototype.getSelfIsLandInfo = function () {
            var info = this.dataSource;
            if (info) {
                var all = info.oreList;
                for (var i = 0; i < all.length; i++) {
                    var infovo = all[i];
                    if (infovo && infovo.isSelf()) {
                        return infovo;
                    }
                }
            }
            return null;
        };
        OreMapView.prototype.updateView = function () {
            var info = this.dataSource;
            this.itemList.array = info.oreList;
        };
        /** 更新时间 */
        OreMapView.prototype.updateTime = function () {
            var time = game.IslandModel.getInstance().getNextRefreshTime();
            this.lbRefreshTime.text = LanMgr.getLan('', 10190, GameUtil.toCountdown(time, "hh:mm:ss"));
        };
        /** 更新矿点信息 */
        OreMapView.prototype.updateOreData = function (mineIndex) {
            var itemRender = this.itemList.cells.find(function (item) {
                var info = item.dataSource;
                return info && info.isExist() && info.svo.mineIndex == mineIndex;
            });
            if (itemRender) {
                itemRender.refreshView();
            }
        };
        /** 规则 */
        OreMapView.prototype.onRule = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_RULE_VIEW));
        };
        /** 记录 */
        OreMapView.prototype.onRecord = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_RESCORD_VIEW));
        };
        OreMapView.prototype.onExit = function () {
            dispatchEvt(new game.IslandsEvent(game.IslandsEvent.SHOW_MAIN_VIEW));
        };
        return OreMapView;
    }(ui.island.OreMapUI));
    game.OreMapView = OreMapView;
})(game || (game = {}));
