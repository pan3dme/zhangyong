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
    var UpRoadTaskIR = /** @class */ (function (_super) {
        __extends(UpRoadTaskIR, _super);
        function UpRoadTaskIR() {
            var _this = _super.call(this) || this;
            _this._curStatu = 0;
            _this.htmltext.style.fontSize = 20;
            _this.htmltext.style.color = "#7e5336";
            _this.htmltext.style.bold = true;
            _this.htmltext.style.wordWrap = false;
            return _this;
        }
        Object.defineProperty(UpRoadTaskIR.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function ($value) {
                this._dataSource = $value;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        UpRoadTaskIR.prototype.refresh = function () {
            var data = this.dataSource;
            if (data) {
                this.btn_receive.on(Laya.Event.CLICK, this, this.onClickReceive);
                var lv = tb.TB_advance_condition.getAdvanceLevel(data.ID);
                this._curURLv = App.hero.tasks.advanceLevel;
                if (lv > this._curURLv + 1) {
                    //未解锁
                    this.lab_title.text = "";
                    this.lab_has.text = "";
                    this.lab_need.text = "";
                    this.list_reward.dataSource = null;
                    this.btn_receive.visible = false;
                    this.img_hasreceive.visible = false;
                    this.list_reward.visible = false;
                    this.ui_red.visible = false;
                    return;
                }
                var hasnum = App.hero.tasks.advanceInfos[data.ID].count ? App.hero.tasks.advanceInfos[data.ID].count : 0;
                var neednum = data.num;
                var receive = App.hero.tasks.advanceInfos[data.ID].reward && App.hero.tasks.advanceInfos[data.ID].reward > 0;
                this.lab_title.text = data.name;
                this.list_reward.dataSource = ary2prop(data.reward);
                this.list_reward.visible = true;
                if (receive) {
                    //已领取
                    this._curStatu = 2;
                    this.img_hasreceive.visible = true;
                    this.btn_receive.visible = false;
                    this.ui_red.visible = false;
                    this.lab_has.text = LanMgr.getLan("", 11006);
                    this.lab_has.color = "#319c28";
                    this.lab_need.text = "(       )";
                }
                else if (hasnum >= neednum) {
                    //领取
                    this._curStatu = 1;
                    this.img_hasreceive.visible = false;
                    this.btn_receive.visible = true;
                    this.ui_red.visible = true;
                    this.btn_receive.label = LanMgr.getLan("", 10041);
                    this.btn_receive.skin = "comp/button/btn_qianwang.png";
                    this.btn_receive.labelStrokeColor = "#538901";
                    this.lab_has.text = LanMgr.getLan("", 11006);
                    this.lab_has.color = "#319c28";
                    this.lab_need.text = "(       )";
                }
                else {
                    //前往
                    this._curStatu = 0;
                    this.img_hasreceive.visible = false;
                    this.btn_receive.visible = true;
                    this.ui_red.visible = false;
                    this.btn_receive.label = LanMgr.getLan("", 10042);
                    this.btn_receive.skin = "comp/button/button.png";
                    this.btn_receive.labelStrokeColor = "#ca7005";
                    this.lab_has.color = "#ff0000";
                    if (neednum == 1) {
                        this.lab_has.text = LanMgr.getLan("", 10045);
                        this.lab_need.text = "(           )";
                    }
                    else {
                        this.lab_has.text = hasnum.toString();
                        var str = hasnum > 9 ? "(    /{0})" : "(  /{0})";
                        this.lab_need.text = LanMgr.getLan(str, -1, neednum);
                    }
                }
                this.lab_need.x = this.lab_title.x + this.lab_title.width + 3;
                this.lab_has.x = this.lab_need.x + 8;
            }
            else {
                this.list_reward.dataSource = null;
                this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
            }
        };
        UpRoadTaskIR.prototype.onClickReceive = function () {
            if (this._curStatu == 1) {
                //领取
                var self_1 = this;
                var args = {};
                args[Protocol.game_task_getAdvanceReward.args.id] = this.dataSource.ID;
                PLC.request(Protocol.game_task_getAdvanceReward, args, function ($data, $msg) {
                    if (!$data)
                        return;
                    if ($data.advanceLevel != null && $data.advanceLevel > self_1._curURLv) {
                        //有等级变化，说明升级,弹激活界面
                        UIMgr.showUI(UIConst.UpRoadSuccessView, [$data.advanceLevel, $data.commonData]);
                    }
                    else {
                        UIUtil.showRewardView($data.commonData);
                    }
                    dispatchEvt(new game.UpRoadEvent(game.UpRoadEvent.REWARD_SUCCESS));
                });
            }
            else if (this._curStatu == 2) {
                //已领取
            }
            else {
                //前往
                dispatchEvt(new game.HudEvent(game.HudEvent.SHOW_MODULE_VIEW, this.dataSource.link));
            }
        };
        UpRoadTaskIR.prototype.destroy = function (destroyChild) {
            if (destroyChild === void 0) { destroyChild = true; }
            this.btn_receive.off(Laya.Event.CLICK, this, this.onClickReceive);
            _super.prototype.destroy.call(this, destroyChild);
        };
        return UpRoadTaskIR;
    }(ui.uproad.UpRoadTaskIRUI));
    game.UpRoadTaskIR = UpRoadTaskIR;
})(game || (game = {}));
