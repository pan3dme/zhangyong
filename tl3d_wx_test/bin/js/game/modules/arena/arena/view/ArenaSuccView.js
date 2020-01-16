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
    var ArenaSuccView = /** @class */ (function (_super) {
        __extends(ArenaSuccView, _super);
        function ArenaSuccView() {
            var _this = _super.call(this) || this;
            _this._cards = [];
            _this.itemList.array = [[], [], []];
            _this.itemList.zOrder = _this._childs.length - 1;
            _this.uiScene = new Base2dSceneLayer();
            _this.uiScene.setPosition(137, 803);
            _this.box_content.addChild(_this.uiScene);
            return _this;
        }
        ArenaSuccView.prototype.popup = function () {
            this.initView();
            _super.prototype.popup.call(this, false, false);
        };
        ArenaSuccView.prototype.initView = function () {
            var _this = this;
            AudioMgr.playSound("sound/victory.mp3");
            this.itemList.selectHandler = new Handler(this, this.onSelect);
            var data = this.dataSource.eventdata;
            this.rewardList.array = data.getRewards();
            if (isEmptyObject(data.addResource)) {
                this.itemList.visible = this.lbbox.visible = this.box_chou.visible = this.box_reward.visible = false;
                this.setModelClose(true);
                this.uiScene.onExit();
                this.setLayout(false);
            }
            else {
                this.itemList.visible = this.lbbox.visible = this.box_chou.visible = this.box_reward.visible = true;
                this.setModelClose(false);
                this.addChildModel();
                this.setLayout(true);
            }
            this.bgPanel.showTitle(true, data.type != game.ArenaBattleType.SWEEP ? "zhandoubiaoxian/shengli.png" : "comp/title/saodangchenggong.png", true, true, true, new Handler(this, function () {
                _this.setModelClose(false);
            }), this);
            this.lab_rank_title.visible = this.lbrank.visible = data.type != game.ArenaBattleType.SWEEP;
            this.lbup.text = "(" + data.chgRank;
            this.lbrank.text = "" + data.rank;
            this.lbrank.event(Laya.Event.RESIZE);
            this.lbup.event(Laya.Event.RESIZE);
            this.hbox.event(Laya.Event.RESIZE);
            this.lbup.visible = this.imgchg.visible = this.lbright.visible = data.chgRank != 0;
        };
        ArenaSuccView.prototype.onSelect = function (index) {
            this.lbbox.visible = false;
            this.itemList.selectHandler = null;
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.TURN_OVER_CAED), index + 1);
        };
        /**设置奖品数据 */
        ArenaSuccView.prototype.setItemListCells = function (infos) {
            var _this = this;
            var cells = this.itemList.cells;
            cells.forEach(function (cell, index) {
                var key = index + 1;
                // cell.setChildData(infos[key],key);
                cell.setVis(false);
            });
            this._cards.forEach(function (card, index) {
                var itemKey = index + 1;
                _this.charPlaySkill(card, function () {
                    card.play(tl3d.CharAction.WALK, 1, false);
                });
                _this.timer.once(500, _this, function () {
                    cells[index].setChildData(infos[itemKey], itemKey);
                });
            });
            Laya.timer.frameOnce(31, this, function () { _this.setModelClose(true); });
        };
        /**设置某个奖品数据 */
        ArenaSuccView.prototype.setItemListCellById = function (index) {
            var cells = this.itemList.cells;
            var cell = cells.find(function (itemIr) {
                return itemIr.getIndex() == index;
            });
            if (cell) {
                cell.setBuyNodeVisible(false);
            }
        };
        /**设置空白区域关闭 */
        ArenaSuccView.prototype.setModelClose = function (bool) {
            this.isModelClose = this.lbclose.visible = bool;
        };
        ArenaSuccView.prototype.addChildModel = function () {
            var _this = this;
            this.uiScene.onExit();
            this.itemList.array.forEach(function (data, index) {
                var cell = _this.itemList.getCell(index);
                cell.box.visible = false;
                _this.addModelChar("100002", cell.x, 0);
            });
        };
        /** 添加ui角色 */
        ArenaSuccView.prototype.addModelChar = function (mid, postionx, postiony, rotate, scale) {
            if (rotate === void 0) { rotate = 180; }
            if (scale === void 0) { scale = 1.1; }
            var sceneChar = new GameUIChar();
            this.uiScene.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl(mid));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.set2dPos(postionx, postiony);
            sceneChar.scale = scale;
            this._cards.push(sceneChar);
        };
        ArenaSuccView.prototype.charPlaySkill = function ($char, $cb) {
            var _this = this;
            if ($cb === void 0) { $cb = null; }
            this._guajiskill = this.uiScene.scene.skillMgr.getSkill(getSkillUrl("100002"), "skill_01", function () {
                _this.charPlaySkill($char, $cb);
            });
            if (!this._guajiskill.keyAry) {
                return;
            }
            if (this._guajiskill) {
                this._guajiskill.reset();
                this._guajiskill.isDeath = false;
            }
            if (!$char || !$char.onStage) {
                return;
            }
            this._guajiskill.configFixEffect($char, $cb);
            this._guajiskill.needShock = false;
            this.uiScene.scene.skillMgr.playSkill(this._guajiskill);
        };
        ArenaSuccView.prototype.setLayout = function (hasReward) {
            if (hasReward) {
                this.lab_rank_title.y = this.hbox.y = 76;
                this.bgPanel.height = 610;
            }
            else {
                this.bgPanel.height = 200;
                this.lab_rank_title.y = this.hbox.y = 100;
            }
            this.height = this.bgPanel.height;
        };
        ArenaSuccView.prototype.close = function () {
            if (!this.isModelClose) {
                showToast(LanMgr.getLan("", 10237));
                return;
            }
            _super.prototype.close.call(this);
            this.bgPanel.closeTitle();
            this._cards = [];
            this.uiScene.onExit();
            this.lbbox.visible = true;
            this.itemList.selectedIndex = -1;
            this.itemList.cells.forEach(function (cell, index) {
                cell.box.visible = false;
            });
            dispatchEvt(new game.FightsEvent(game.FightsEvent.EXIT_FIGHT_EVENT), this.dataSource);
        };
        return ArenaSuccView;
    }(ui.arena.arena.ArenaSuccUI));
    game.ArenaSuccView = ArenaSuccView;
})(game || (game = {}));
