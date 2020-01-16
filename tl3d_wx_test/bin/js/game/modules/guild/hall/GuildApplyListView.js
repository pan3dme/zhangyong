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
    var GuildApplyListView = /** @class */ (function (_super) {
        __extends(GuildApplyListView, _super);
        function GuildApplyListView() {
            var _this = _super.call(this) || this;
            _this.isModelClose = true;
            _this._model = game.GuildModel.getInstance();
            return _this;
        }
        GuildApplyListView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.list_apply.array = null;
            this.bgPanel.dataSource = null;
            this.btn_allyes.off(Laya.Event.CLICK, this, this.oneKey);
            this.btn_allno.off(Laya.Event.CLICK, this, this.oneKey);
        };
        GuildApplyListView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildApplyListView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildApplyListView.prototype.initView = function () {
            this.list_apply.array = null;
            this.btn_allyes.on(Laya.Event.CLICK, this, this.oneKey, [0]);
            this.btn_allno.on(Laya.Event.CLICK, this, this.oneKey, [1]);
            this.updateApplyList();
            this.bgPanel.dataSource = { uiName: UIConst.GuildApplyListView, closeOnSide: this.isModelClose, title: "申请列表" };
        };
        GuildApplyListView.prototype.updateApplyList = function () {
            var ary = this._model.getApplyList();
            ary.sort(function (a, b) {
                return b.applyTime - a.applyTime;
            });
            this.list_apply.array = ary;
            this.img_side.visible = ary.length >= 6;
        };
        /**一键同意/拒绝 */
        GuildApplyListView.prototype.oneKey = function (type) {
            var model = this._model;
            if (model.getApplyList().length == 0) {
                return;
            }
            var arg = {};
            arg[Protocol.guild_guild_apply_opt.args.type] = type;
            arg[Protocol.guild_guild_apply_opt.args.playerId] = null;
            PLC.request(Protocol.guild_guild_apply_opt, arg, function ($data, msg) {
                if (!$data)
                    return;
                if ($data.delApplyList || type == 1) {
                    if (type == 1) {
                        model.setApplyList([]);
                    }
                    else {
                        var arr = model.getApplyList();
                        if ($data.addMemberList && $data.addMemberList.length > 0) {
                            for (var i = 0; i < $data.addMemberList.length; i++) {
                                guildMemberChatSend("欢迎" + $data.addMemberList[i].name + "加入了大家庭，一同求道！");
                            }
                            dispatchEvt(new game.GuildEvent(game.GuildEvent.UPDATE_MEMBER_LIST));
                        }
                        //先弹提示
                        var strTip = "";
                        var _loop_1 = function (i) {
                            var isAdd = $data.addMemberList && $data.addMemberList.some(function (item) { return item.playerId == $data.delApplyList[i]; });
                            if (!isAdd) {
                                var player = arr.find(function (item) { return item.playerId == $data.delApplyList[i]; });
                                if (player)
                                    strTip += player.name + ",";
                            }
                        };
                        for (var i = 0; i < $data.delApplyList.length; i++) {
                            _loop_1(i);
                        }
                        if (strTip != "") {
                            strTip = strTip.substr(0, strTip.length - 1);
                            showToast(strTip + LanMgr.getLan('', 10405));
                        }
                        var _loop_2 = function (i) {
                            arr = arr.filter(function (item) { item.playerId != $data.delApplyList[i]; });
                        };
                        //过滤掉删除的申请
                        for (var i = 0; i < $data.delApplyList.length; i++) {
                            _loop_2(i);
                        }
                        model.setApplyList(arr);
                    }
                    var guildApplyListView = UIMgr.getUIByName(UIConst.GuildApplyListView);
                    if (guildApplyListView) {
                        guildApplyListView.updateApplyList();
                    }
                }
            });
        };
        return GuildApplyListView;
    }(ui.guild.hall.GuildApplyListUI));
    game.GuildApplyListView = GuildApplyListView;
})(game || (game = {}));
