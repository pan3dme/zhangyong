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
    var GodDmMemberIR = /** @class */ (function (_super) {
        __extends(GodDmMemberIR, _super);
        function GodDmMemberIR() {
            var _this = _super.call(this) || this;
            _this._modelId = 0;
            _this.uiScene = new Base2dSceneLayer();
            _this.boxRole.addChild(_this.uiScene);
            _this.htmlText.style.fontSize = 22;
            _this.htmlText.style.wordWrap = true;
            _this.htmlText.style.color = "#7e5336";
            return _this;
        }
        GodDmMemberIR.prototype.initData = function () {
            // 聊天层级最高，移到父级
            this.parent.addChild(this.imgChat);
            this.imgChat.visible = false;
        };
        Object.defineProperty(GodDmMemberIR.prototype, "dataSource", {
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
        GodDmMemberIR.prototype.refreshData = function () {
            var info = this.dataSource;
            if (info) {
                this.lbPos.text = info.pos + "";
                this.uiScene.onShow();
                if (info.isExist()) {
                    this.imgDi.visible = this.imgDesc.visible = this.boxForce.visible = this.lbGuild.visible = this.lbName.visible = true;
                    this.btnInvite.visible = false;
                    this.lbName.text = info.svo.name;
                    this.lbGuild.text = LanMgr.getLan("", 12560, info.svo.guildName ? info.svo.guildName : LanMgr.getLan("", 12084));
                    this.lbForce.text = info.svo.force + "";
                    this.lbForce.event(Laya.Event.RESIZE);
                    this.imgDesc.skin = info.isCaptain() ? SkinUtil.izsy_di13 : SkinUtil.izsy_di14;
                    this.imgDesc.width = info.isCaptain() ? 80 : (info.isReady() ? 120 : 100);
                    this.lbDesc.text = info.isCaptain() ? LanMgr.getLan("", 12329) : (info.isReady() ? LanMgr.getLan("", 12327) : LanMgr.getLan("", 12328));
                    if (this._modelId != info.getModel()) {
                        this._modelId = info.getModel();
                        Laya.timer.clear(this, this.delayShow);
                        Laya.timer.once(200, this, this.delayShow, [this._modelId]);
                    }
                }
                else {
                    this.imgDi.visible = this.imgDesc.visible = this.boxForce.visible = this.lbGuild.visible = this.lbName.visible = false;
                    this.btnInvite.visible = true;
                    Laya.timer.clearAll(this);
                    this.uiScene.onExit();
                    this._modelId = 0;
                    this.imgChat.visible = false;
                }
                this.btnInvite.on(Laya.Event.CLICK, this, this.onInvite);
            }
            else {
                Laya.timer.clearAll(this);
                this.uiScene.onExit();
                this._modelId = 0;
                this.imgChat.visible = false;
                this.btnInvite.off(Laya.Event.CLICK, this, this.onInvite);
            }
        };
        /** 对话 */
        GodDmMemberIR.prototype.addChat = function (info) {
            this.htmlText.innerHTML = info.getContent();
            this.imgChat.height = this.htmlText.y + this.htmlText.contextHeight + 50;
            this.imgChat.x = this.uiPos.x + (this.width >> 1) - 25;
            this.imgChat.y = this.uiPos.y - this.imgChat.height;
            // 聊天时候层级最上面
            this.parent.setChildIndex(this.imgChat, this.parent.numChildren - 1);
            this.imgChat.visible = true;
            Laya.timer.clear(this, this.clearChat);
            Laya.timer.once(10000, this, this.clearChat);
        };
        /** 清除对话 */
        GodDmMemberIR.prototype.clearChat = function () {
            Laya.timer.clear(this, this.clearChat);
            this.imgChat.visible = false;
            this.htmlText.innerHTML = "";
        };
        /** 开始移动 */
        GodDmMemberIR.prototype.startMove = function () {
            Laya.timer.clear(this, this.updatePosition);
            Laya.timer.frameLoop(2, this, this.updatePosition);
        };
        /** 更新位置 */
        GodDmMemberIR.prototype.updatePosition = function () {
            if (this.uiScene.sceneChar) {
                var point = this.lbName.localToGlobal(new Laya.Point(0, 0));
                this.uiScene.sceneChar.set2dPos(point.x + this.lbName.width / 2 - Launch.offsetX, point.y + 10 - Launch.offsetY);
            }
        };
        /** 停止移动 */
        GodDmMemberIR.prototype.stopMove = function () {
            Laya.timer.clear(this, this.updatePosition);
            this.pos(this.uiPos.x, this.uiPos.y);
            this.updatePosition();
        };
        /** 邀请 */
        GodDmMemberIR.prototype.onInvite = function () {
            var info = this.dataSource;
            if (info && !info.isExist()) {
                dispatchEvt(new game.GodDomainEvent(game.GodDomainEvent.SHOW_INVITE_VIEW), this.dataSource);
            }
        };
        /** 延迟展示模型（延迟主要为了定位） */
        GodDmMemberIR.prototype.delayShow = function (modeid) {
            var point = this.lbName.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(modeid, point.x + this.lbName.width / 2 - Launch.offsetX, point.y + 10 - Launch.offsetY, 180, 2);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        };
        /** 是否在初始范围内 */
        GodDmMemberIR.prototype.isInInitArea = function (cx, cy) {
            return (cx >= this.uiPos.x && cx <= this.uiPos.x + this.width) && (cy >= this.uiPos.y && cy <= this.uiPos.y + this.height);
        };
        return GodDmMemberIR;
    }(ui.goddomain.render.MemberIRUI));
    game.GodDmMemberIR = GodDmMemberIR;
})(game || (game = {}));
