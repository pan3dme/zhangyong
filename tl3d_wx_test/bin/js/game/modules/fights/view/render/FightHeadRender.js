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
    var FightHeadRender = /** @class */ (function (_super) {
        __extends(FightHeadRender, _super);
        function FightHeadRender() {
            var _this = _super.call(this) || this;
            _this._enemyItemLoacl = [
                [215, 47], [216, 75], [241, 31], [268, 47], [268, 75], [241, 89]
            ];
            _this._ownItemLoacl = [
                [87, 46], [87, 75], [59, 31], [33, 47], [34, 75], [59, 89]
            ];
            _this.width = Laya.stage.width;
            _this.box_head0.on(Laya.Event.CLICK, _this, _this.onShowKezhi, [true]);
            _this.box_head1.on(Laya.Event.CLICK, _this, _this.onShowKezhi, [false]);
            return _this;
        }
        FightHeadRender.prototype.showEff = function () {
            var _this = this;
            this.setVis(true);
            UIUtil.boxLeftRightTween(this.box_head0, -136, 163, false, 310, 0.05);
            UIUtil.boxLeftRightTween(this.box_head1, Laya.stage.width + 136, Laya.stage.width - 163, true, 310, 0.05);
            setTimeout(function () {
                _this.setVsVis(true);
            }, 310);
        };
        FightHeadRender.prototype.setVsVis = function (val) {
            this.lab_title.visible = this.lab_round.visible = this.img_vs.visible = val;
        };
        FightHeadRender.prototype.setScale = function (val) {
            this.box_head0.scale(val, val);
            this.box_head1.scale(val, val);
        };
        FightHeadRender.prototype.setVis = function (vis) {
            this.box_head0.visible = this.box_head1.visible = vis;
        };
        FightHeadRender.prototype.hide = function () {
            if (this._complete) {
                this.hideItem(this._defItemAry);
                this.hideItem(this._atkItemAry);
                this.setVis(false);
                this._complete = false;
            }
        };
        FightHeadRender.prototype.setData = function () {
            this._complete = true;
            this.lab_title.text = this.dataSource.title;
            this.lab_name0.text = this.dataSource.ownName;
            this.lab_name1.text = this.dataSource.enemyName;
            this.box_force0.visible = this.dataSource.ownForce != 0;
            this.box_force1.visible = this.dataSource.enemyForce != 0;
            this.clip_force0.value = String(this.dataSource.ownForce);
            this.clip_force1.value = String(this.dataSource.enemyForce);
            var teamVo = this.dataSource.enemyTeam || {};
            var teamLineUp = teamVo.lineup || {};
            for (var i = 0; i < 6; i++) {
                this.setItem(battle.BatteConsts.BATTLE_CAMPDEF, i, teamLineUp);
            }
            teamVo = this.dataSource.ownTeam || {};
            teamLineUp = teamVo.lineup || {};
            for (var j = 0; j < 6; j++) {
                this.setItem(battle.BatteConsts.BATTLE_CAMPATK, j, teamLineUp);
            }
        };
        FightHeadRender.prototype.hideItem = function (itemAry) {
            for (var i = 0; itemAry && i < itemAry.length; i++) {
                itemAry[i].visible = false;
            }
        };
        FightHeadRender.prototype.setItem = function (battleTeam, local, source) {
            var tempary;
            var tempLoacl;
            if (battleTeam == battle.BatteConsts.BATTLE_CAMPDEF) {
                if (!this._defItemAry) {
                    this._defItemAry = [];
                }
                tempary = this._defItemAry;
            }
            else {
                if (!this._atkItemAry) {
                    this._atkItemAry = [];
                }
                tempary = this._atkItemAry;
            }
            if (!tempary[local]) {
                var img = new Laya.Image();
                // img.width = img.height = 24;
                img.scaleX = img.scaleY = 0.94;
                img.anchorY = img.anchorX = 0.5;
                if (battleTeam == battle.BatteConsts.BATTLE_CAMPDEF) {
                    this.box_head1.addChild(img);
                    tempLoacl = this._enemyItemLoacl[local];
                }
                else {
                    this.box_head0.addChild(img);
                    tempLoacl = this._ownItemLoacl[local];
                }
                img.x = tempLoacl[0];
                img.y = tempLoacl[1];
                tempary.push(img);
            }
            var tempItem = tempary[local];
            if (!source.hasOwnProperty(local)) {
                tempItem.visible = false;
                return;
            }
            tempItem.visible = true;
            tempItem.skin = SkinUtil.getGodRaceSkin(Number(source[local].race));
            tempItem.gray = !source[local].active;
        };
        FightHeadRender.prototype.setRound = function (str) {
            this.lab_round.text = str;
        };
        FightHeadRender.prototype.onShowKezhi = function (self) {
            var teamVo = this.dataSource.enemyTeam || {};
            if (self) {
                teamVo = this.dataSource.ownTeam || {};
            }
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_KEZHI_VIEW), teamVo.teamInfo);
        };
        return FightHeadRender;
    }(ui.fight.fightHeadUI));
    game.FightHeadRender = FightHeadRender;
})(game || (game = {}));
