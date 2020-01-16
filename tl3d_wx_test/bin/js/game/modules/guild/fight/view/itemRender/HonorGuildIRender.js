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
    var HonorGuildIRender = /** @class */ (function (_super) {
        __extends(HonorGuildIRender, _super);
        function HonorGuildIRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(HonorGuildIRender.prototype, "dataSource", {
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
        HonorGuildIRender.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.imgBg.skin = SkinUtil.getGuildQizhi(info.guildRank);
                this.imgEmpty.skin = SkinUtil.getGuildXuwei(info.guildRank);
                this.lbSvrName.fontSize = this.lbGuildName.fontSize = this.lbLeader.fontSize = this.lbForce.fontSize = info.guildRank == 1 ? 20 : 18;
                if (info.presidentName) {
                    this.headBox.dataSource = new GuildHeadVo(info.guildHead, info.guildLevel);
                    this.lbSvrName.text = "区服" + info.serverName;
                    this.lbGuildName.text = "公会：" + info.guildName;
                    this.lbLeader.text = "会长：" + info.presidentName;
                    this.lbForce.text = LanMgr.getLan('', 10117, info.totalForce);
                    this.imgEmpty.visible = false;
                    this.headBox.visible = this.lbSvrName.visible = this.lbGuildName.visible = this.lbLeader.visible = this.lbForce.visible = true;
                }
                else {
                    this.headBox.visible = this.lbSvrName.visible = this.lbGuildName.visible = this.lbLeader.visible = this.lbForce.visible = false;
                    this.imgEmpty.visible = true;
                    this.headBox.dataSource = null;
                }
            }
            else {
                this.headBox.dataSource = null;
            }
        };
        return HonorGuildIRender;
    }(ui.guild.fight.render.GuildRongyuRenderUI));
    game.HonorGuildIRender = HonorGuildIRender;
})(game || (game = {}));
