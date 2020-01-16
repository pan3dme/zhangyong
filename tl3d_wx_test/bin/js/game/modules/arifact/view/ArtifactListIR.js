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
    var ArtifactListIR = /** @class */ (function (_super) {
        __extends(ArtifactListIR, _super);
        function ArtifactListIR() {
            var _this = _super.call(this) || this;
            _this._htmlText = new Laya.HTMLDivElement();
            _this.initHtmlText();
            return _this;
        }
        ArtifactListIR.prototype.initHtmlText = function () {
            this._htmlText.style.fontSize = this.lbDesc.fontSize;
            this._htmlText.style.leading = this.lbDesc.leading;
            this._htmlText.style.height = this.lbDesc.height;
            this._htmlText.style.width = this.lbDesc.width;
            this._htmlText.style.color = this.lbDesc.color;
            this._htmlText.style.font = this.lbDesc.font;
            this._htmlText.x = this.lbDesc.x;
            this._htmlText.y = this.lbDesc.y;
            this._htmlText.style.wordWrap = true;
            this.lbDesc.visible = false;
            this.addChild(this._htmlText);
        };
        Object.defineProperty(ArtifactListIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        ArtifactListIR.prototype.refreshView = function () {
            var info = this.dataSource;
            if (info) {
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(info.icon);
                this.lbName.text = info.name;
                var isUnlock = game.ArtifactModel.getInstance().isUnlock(info.ID);
                var isWear = App.hero.isWearArtifact(info.ID, iface.tb_prop.lineupTypeKey.attack);
                this.imgSuo.visible = this.imgShenqi.gray = this.btnOperate.gray = !isUnlock;
                this.imgSuo.visible = !isUnlock;
                this.btnOperate.label = isUnlock ? (isWear ? LanMgr.getLan("", 12522) : LanMgr.getLan("", 12366)) : LanMgr.getLan("", 10434);
                this.btnOperate.on(Laya.Event.CLICK, this, this.onOperate);
                var skillLv = App.hero.artifactSkillLv;
                var skillid = info.ID * 1000 + skillLv;
                var artifactSkillT = tb.TB_artifact_skill.get_TB_artifact_skillById(skillid);
                var skillT = tb.TB_skill.get_TB_skillById(artifactSkillT.skill);
                var desc = artifactSkillT.next ? FormatStr(skillT.info, artifactSkillT.next).replace(/[\\]/ig, "") : skillT.info;
                this._htmlText.innerHTML = desc;
            }
            else {
                this.btnOperate.off(Laya.Event.CLICK, this, this.onOperate);
            }
        };
        ArtifactListIR.prototype.onOperate = function () {
            if (this.btnOperate.gray) {
                showToast(LanMgr.getLan("", 10243));
                return;
            }
            var info = this.dataSource;
            if (info) {
                var wearid = App.hero.isWearArtifact(info.ID, iface.tb_prop.lineupTypeKey.attack) ? 0 : info.ID;
                var obj = { id: wearid, type: iface.tb_prop.lineupTypeKey.attack };
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION), [obj, Artifact.WEAR_OR_TAKEOFF]);
            }
        };
        return ArtifactListIR;
    }(ui.artifact.itemRender.ArtifactListIRUI));
    game.ArtifactListIR = ArtifactListIR;
})(game || (game = {}));
