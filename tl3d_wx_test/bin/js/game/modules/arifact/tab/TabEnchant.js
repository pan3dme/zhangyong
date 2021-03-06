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
    var TabEnchant = /** @class */ (function (_super) {
        __extends(TabEnchant, _super);
        function TabEnchant() {
            var _this = _super.call(this) || this;
            /**自动升星 */
            _this._clickAutoTime = 0;
            return _this;
        }
        TabEnchant.prototype.show = function (temp) {
            if (!temp)
                return;
            this._tbSet = tb.TB_artifact_set.get_TB_artifact_setById();
            this._curArtifactT = temp;
            this._curStarLv = App.hero.artifactStarLv;
            this._curStarExp = App.hero.artifactStarExp;
            this._curArtifactEnchant = tb.TB_artifact_enchant.get_TB_artifact_enchantById(this._curStarLv);
            this.btn_auto.on(Laya.Event.CLICK, this, this.onAuto);
            this.btn_fumo.on(Laya.Event.CLICK, this, this.enchant);
            this.btn_lookup.on(Laya.Event.CLICK, this, this.lookup);
            this.list_teshu.renderHandler = Handler.create(this, this.teshuRender, null, false);
            tl3d.ModuleEventManager.addEvent(game.ArtifactEvent.ARTIFACT_STAR_CHANGE, this.onStarChange, this);
            tl3d.ModuleEventManager.addEvent(game.ResEvent.PROP_CHANGE, this.updateCost, this);
            this.setAutoBtnLabel(false);
            this.fumoRP.setRedPointName("artifact_enchant_" + this._curArtifactT.ID);
            this.updateView();
        };
        //属性变化
        TabEnchant.prototype.onStarChange = function () {
            var refresh = false;
            var newExp = App.hero.artifactStarExp;
            if (newExp != this._curStarExp) {
                var changeExp = newExp - this._curStarExp;
                if (changeExp < 0)
                    changeExp += this._curArtifactEnchant.plan;
                this._curStarExp = newExp;
                refresh = true;
                if (changeExp > 0) {
                    //飘字
                    this.addEffectText(changeExp);
                }
            }
            var newLv = App.hero.artifactStarLv;
            if (newLv != this._curStarLv) {
                this._curStarLv = newLv;
                this._curArtifactEnchant = tb.TB_artifact_enchant.get_TB_artifact_enchantById(this._curStarLv);
                refresh = true;
            }
            if (refresh) {
                this.updateView();
                if (this._auto) {
                    Laya.timer.once(200, this, this.enchant);
                }
            }
            else {
                this.setAutoBtnLabel(false);
            }
        };
        TabEnchant.prototype.updateView = function () {
            var exp = App.hero.artifactStarExp;
            var starNum = exp / this._tbSet.enchant_plan;
            var basics = game.ArtifactModel.getInstance().getEnchantAtttri(this._curArtifactEnchant, starNum, true);
            for (var i = 1; i < 4; i++) {
                this["lab_value" + i].text = "+" + basics[0][i - 1];
                this["img_jichu" + i].skin = SkinUtil.getAttrSkin(i);
                this["hbox_" + i].event(Laya.Event.RESIZE);
            }
            //特殊属性
            this.list_teshu.dataSource = this._curArtifactEnchant.enchant_special;
            this.list_teshu.visible = this._curArtifactEnchant.enchant_special.length >= 0;
            this.lab_info.visible = !this.list_teshu.visible;
            if (this._curArtifactEnchant.enchant_special.length == 1)
                this.list_teshu.x = 275;
            else if (this._curArtifactEnchant.enchant_special.length == 2)
                this.list_teshu.x = 165;
            else
                this.list_teshu.x = 80;
            //设置进度条、特殊属性list数据
            this.lab_exp.text = this._curArtifactEnchant.plan == 0 ? "Max" : exp + "/" + this._curArtifactEnchant.plan;
            this.exp_progressBar.value = this._curArtifactEnchant.plan == 0 ? 1 : exp / this._curArtifactEnchant.plan;
            this.lab_chance.text = this._curArtifactEnchant.getOddStrByOdds(exp);
            this.btn_fumo.label = this._curArtifactEnchant.plan != 0 ? LanMgr.getLan("", 12346) : LanMgr.getLan("", 12533);
            this.updateCost();
        };
        //消耗
        TabEnchant.prototype.updateCost = function () {
            var costItemId = this._curArtifactEnchant.cost[0];
            var costNum = this._curArtifactEnchant.cost[1];
            var hasNum = App.hero.getBagItemNum(costItemId);
            if (this._curArtifactEnchant.plan == 0) {
                //满级
                this.box_cost.visible = false;
                this.img_cost_bg.visible = false;
            }
            else {
                this.box_cost.visible = true;
                this.img_cost_bg.visible = true;
                this._isEnchant = hasNum >= costNum;
                this.lab_has.color = this._isEnchant ? ColorConst.normalFont : "#f62e08";
                this.lab_need.text = "/" + costNum;
                this.lab_has.stroke = this._isEnchant ? 0 : 2;
                this.lab_has.text = "" + hasNum;
                this.lab_has.event(Laya.Event.RESIZE);
                this.box_cost.event(Laya.Event.RESIZE);
            }
        };
        /**设置自动升星按钮 */
        TabEnchant.prototype.setAutoBtnLabel = function (auto) {
            this._auto = auto;
            this.btn_auto.label = this._auto ? LanMgr.getLan("", 12535) : LanMgr.getLan("", 12534);
            this.btn_auto.skin = this._auto ? SkinUtil.buttonRed : SkinUtil.buttonNormal;
            this.btn_auto.labelStrokeColor = this._auto ? ColorConst.RED_FILTER : ColorConst.ORANGE_FILTER;
            if (this._auto) { //0.2s升星一次，并且设置遮罩
                game.GuideMask.show(this.btn_auto, game.DirectionType.none, null, true, null, 0, false);
                this.enchant();
            }
            else { //清除定时器和遮罩
                game.GuideMask.hide();
            }
        };
        TabEnchant.prototype.teshuRender = function (cell, index) {
            var lab_teshu = cell.getChildByName('lab_teshu');
            var lab_value = cell.getChildByName('lab_value');
            var data = cell.dataSource;
            if (data) {
                lab_value.text = data[0] > 4 ? "+" + Math.floor(data[2] * 100) + "%" : "+" + data[2];
                lab_teshu.text = "" + LanMgr.attrName[data[0]];
                lab_teshu.event(Laya.Event.RESIZE);
                cell.event(Laya.Event.RESIZE);
            }
            else {
                lab_teshu.text = "";
                lab_value.text = "";
            }
        };
        TabEnchant.prototype.lookup = function () {
            UIMgr.showUI(UIConst.Artifact_EnchantTip);
        };
        TabEnchant.prototype.onAuto = function () {
            if (Laya.timer.currTimer < this._clickAutoTime)
                return;
            this._clickAutoTime = Laya.timer.currTimer + 500;
            this.setAutoBtnLabel(!this._auto);
        };
        /**升星请求 */
        TabEnchant.prototype.enchant = function () {
            /**如升星条件不足，自动升星需关闭 */
            if (!this.isCanEnchant()) {
                if (this._auto) {
                    this.setAutoBtnLabel(false);
                }
                return;
            }
            dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [this._curArtifactT.ID, Artifact.ENCHANT]);
        };
        /**是否可以升星 */
        TabEnchant.prototype.isCanEnchant = function () {
            if (this._curStarLv >= 5) {
                showToast(LanMgr.getLan("", 10242));
                return false;
            }
            else if (!this._isEnchant) { //材料不足
                showToast(LanMgr.getLan("", Lans.cost, this._curArtifactEnchant.cost[0]));
                return false;
            }
            return true;
        };
        /**生成飘字 */
        TabEnchant.prototype.addEffectText = function (exp) {
            var _this = this;
            var effectText = Laya.Pool.getItemByClass("EffectText", EffectText);
            effectText.pos(this.exp_progressBar.x + (this.exp_progressBar.width / 2) + 10, this.exp_progressBar.y);
            effectText.text = "+" + exp;
            effectText.setProprety();
            this.addChild(effectText);
            Laya.Tween.to(effectText, { y: effectText.y - 100, alpha: 0 }, 700, null, new Handler(effectText, function () {
                Laya.Pool.recover("EffectText", effectText);
                _this.removeChild(effectText);
            }));
        };
        Object.defineProperty(TabEnchant.prototype, "startPos", {
            /**星星动画开始坐标 */
            get: function () {
                return this.exp_progressBar.localToGlobal(new Laya.Point(this.exp_progressBar.width, 0));
            },
            enumerable: true,
            configurable: true
        });
        TabEnchant.prototype.close = function () {
            this.btn_auto.off(Laya.Event.CLICK, this, this.onAuto);
            this.btn_fumo.off(Laya.Event.CLICK, this, this.enchant);
            this.btn_lookup.off(Laya.Event.CLICK, this, this.lookup);
            tl3d.ModuleEventManager.removeEvent(game.ArtifactEvent.ARTIFACT_STAR_CHANGE, this.onStarChange, this);
            tl3d.ModuleEventManager.removeEvent(game.ResEvent.PROP_CHANGE, this.updateCost, this);
            if (this.list_teshu.renderHandler) {
                this.list_teshu.renderHandler.recover();
                this.list_teshu.renderHandler = null;
            }
            this.list_teshu.array = null;
            this.setAutoBtnLabel(false);
            this.fumoRP.onDispose();
            this._tbSet = null;
            this._curArtifactT = null;
            this._curStarLv = 0;
            this._curStarExp = 0;
            this._curArtifactEnchant = null;
            this.list_teshu.array = null;
            Laya.timer.clearAll(this);
        };
        return TabEnchant;
    }(ui.artifact.tab.ArtifactEnchantUI));
    game.TabEnchant = TabEnchant;
    var EffectText = /** @class */ (function (_super) {
        __extends(EffectText, _super);
        function EffectText() {
            var _this = _super.call(this) || this;
            _this.anchorY = 0.5;
            _this.fontSize = 25;
            _this.color = "#058623";
            return _this;
        }
        EffectText.prototype.setProprety = function (data) {
            this.alpha = 1;
        };
        return EffectText;
    }(Laya.Label));
})(game || (game = {}));
