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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var DialogExt = common.DialogExt;
var ui;
(function (ui) {
    var activity;
    (function (activity) {
        var bindPhone;
        (function (bindPhone) {
            var BindPhoneUI = /** @class */ (function (_super) {
                __extends(BindPhoneUI, _super);
                function BindPhoneUI() {
                    return _super.call(this) || this;
                }
                BindPhoneUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitleView", common.CommonTitleView);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/bindPhone/BindPhone");
                };
                return BindPhoneUI;
            }(DialogExt));
            bindPhone.BindPhoneUI = BindPhoneUI;
        })(bindPhone = activity.bindPhone || (activity.bindPhone = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var BuySuccUI = /** @class */ (function (_super) {
                __extends(BuySuccUI, _super);
                function BuySuccUI() {
                    return _super.call(this) || this;
                }
                BuySuccUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/BuySucc");
                };
                return BuySuccUI;
            }(DialogExt));
            chongzhi.BuySuccUI = BuySuccUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var ChongzhiUI = /** @class */ (function (_super) {
                __extends(ChongzhiUI, _super);
                function ChongzhiUI() {
                    return _super.call(this) || this;
                }
                ChongzhiUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("game.TabTequan", game.TabTequan);
                    View.regComponent("game.ChongzhiIR", game.ChongzhiIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/Chongzhi");
                };
                return ChongzhiUI;
            }(DialogExt));
            chongzhi.ChongzhiUI = ChongzhiUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var ChongzhiIRUI = /** @class */ (function (_super) {
                __extends(ChongzhiIRUI, _super);
                function ChongzhiIRUI() {
                    return _super.call(this) || this;
                }
                ChongzhiIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/ChongzhiIR");
                };
                return ChongzhiIRUI;
            }(View));
            chongzhi.ChongzhiIRUI = ChongzhiIRUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var RechargeGiftSuccUI = /** @class */ (function (_super) {
                __extends(RechargeGiftSuccUI, _super);
                function RechargeGiftSuccUI() {
                    return _super.call(this) || this;
                }
                RechargeGiftSuccUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/RechargeGiftSucc");
                };
                return RechargeGiftSuccUI;
            }(DialogExt));
            chongzhi.RechargeGiftSuccUI = RechargeGiftSuccUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var RechargeSuccUI = /** @class */ (function (_super) {
                __extends(RechargeSuccUI, _super);
                function RechargeSuccUI() {
                    return _super.call(this) || this;
                }
                RechargeSuccUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/RechargeSucc");
                };
                return RechargeSuccUI;
            }(DialogExt));
            chongzhi.RechargeSuccUI = RechargeSuccUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var TabTequanUI = /** @class */ (function (_super) {
                __extends(TabTequanUI, _super);
                function TabTequanUI() {
                    return _super.call(this) || this;
                }
                TabTequanUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.TeQuanItemIR", game.TeQuanItemIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/TabTequan");
                };
                return TabTequanUI;
            }(View));
            chongzhi.TabTequanUI = TabTequanUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var chongzhi;
        (function (chongzhi) {
            var teQuanItemIRUI = /** @class */ (function (_super) {
                __extends(teQuanItemIRUI, _super);
                function teQuanItemIRUI() {
                    return _super.call(this) || this;
                }
                teQuanItemIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/chongzhi/teQuanItemIR");
                };
                return teQuanItemIRUI;
            }(DialogExt));
            chongzhi.teQuanItemIRUI = teQuanItemIRUI;
        })(chongzhi = activity.chongzhi || (activity.chongzhi = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var download;
        (function (download) {
            var WeiDuanXiaZaiViewUI = /** @class */ (function (_super) {
                __extends(WeiDuanXiaZaiViewUI, _super);
                function WeiDuanXiaZaiViewUI() {
                    return _super.call(this) || this;
                }
                WeiDuanXiaZaiViewUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/download/WeiDuanXiaZaiView");
                };
                return WeiDuanXiaZaiViewUI;
            }(DialogExt));
            download.WeiDuanXiaZaiViewUI = WeiDuanXiaZaiViewUI;
        })(download = activity.download || (activity.download = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var luckyturn;
            (function (luckyturn) {
                var luckyRecordUI = /** @class */ (function (_super) {
                    __extends(luckyRecordUI, _super);
                    function luckyRecordUI() {
                        return _super.call(this) || this;
                    }
                    luckyRecordUI.prototype.createChildren = function () {
                        View.regComponent("common.CommonTitle2View", common.CommonTitle2View);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/huodong/luckyturn/luckyRecord");
                    };
                    return luckyRecordUI;
                }(DialogExt));
                luckyturn.luckyRecordUI = luckyRecordUI;
            })(luckyturn = huodong.luckyturn || (huodong.luckyturn = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var luckyturn;
            (function (luckyturn) {
                var luckyturnUI = /** @class */ (function (_super) {
                    __extends(luckyturnUI, _super);
                    function luckyturnUI() {
                        return _super.call(this) || this;
                    }
                    luckyturnUI.prototype.createChildren = function () {
                        View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                        View.regComponent("game.RedPointProp", game.RedPointProp);
                        View.regComponent("common.ItemBox3", common.ItemBox3);
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/huodong/luckyturn/luckyturn");
                    };
                    return luckyturnUI;
                }(DialogExt));
                luckyturn.luckyturnUI = luckyturnUI;
            })(luckyturn = huodong.luckyturn || (huodong.luckyturn = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var luckyturn;
            (function (luckyturn) {
                var Tip;
                (function (Tip) {
                    var TurnRewardUI = /** @class */ (function (_super) {
                        __extends(TurnRewardUI, _super);
                        function TurnRewardUI() {
                            return _super.call(this) || this;
                        }
                        TurnRewardUI.prototype.createChildren = function () {
                            View.regComponent("common.CommonTitle9View", common.CommonTitle9View);
                            View.regComponent("common.ItemBox2", common.ItemBox2);
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/luckyturn/Tip/TurnReward");
                        };
                        return TurnRewardUI;
                    }(DialogExt));
                    Tip.TurnRewardUI = TurnRewardUI;
                })(Tip = luckyturn.Tip || (luckyturn.Tip = {}));
            })(luckyturn = huodong.luckyturn || (huodong.luckyturn = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var payActivityUI = /** @class */ (function (_super) {
                    __extends(payActivityUI, _super);
                    function payActivityUI() {
                        return _super.call(this) || this;
                    }
                    payActivityUI.prototype.createChildren = function () {
                        View.regComponent("common.scaleButton", common.scaleButton);
                        View.regComponent("game.RedPointProp", game.RedPointProp);
                        View.regComponent("game.PayActivityTabIR", game.PayActivityTabIR);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/huodong/welfare/payActivity");
                    };
                    return payActivityUI;
                }(DialogExt));
                welfare.payActivityUI = payActivityUI;
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var DengjilibaoRenderUI = /** @class */ (function (_super) {
                        __extends(DengjilibaoRenderUI, _super);
                        function DengjilibaoRenderUI() {
                            return _super.call(this) || this;
                        }
                        DengjilibaoRenderUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox", common.ItemBox);
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/DengjilibaoRender");
                        };
                        return DengjilibaoRenderUI;
                    }(View));
                    render.DengjilibaoRenderUI = DengjilibaoRenderUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var EquipExtIRUI = /** @class */ (function (_super) {
                        __extends(EquipExtIRUI, _super);
                        function EquipExtIRUI() {
                            return _super.call(this) || this;
                        }
                        EquipExtIRUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox", common.ItemBox);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/EquipExtIR");
                        };
                        return EquipExtIRUI;
                    }(View));
                    render.EquipExtIRUI = EquipExtIRUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var LibaoIRUI = /** @class */ (function (_super) {
                        __extends(LibaoIRUI, _super);
                        function LibaoIRUI() {
                            return _super.call(this) || this;
                        }
                        LibaoIRUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox2", common.ItemBox2);
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/LibaoIR");
                        };
                        return LibaoIRUI;
                    }(View));
                    render.LibaoIRUI = LibaoIRUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var QiandaoRenderUI = /** @class */ (function (_super) {
                        __extends(QiandaoRenderUI, _super);
                        function QiandaoRenderUI() {
                            return _super.call(this) || this;
                        }
                        QiandaoRenderUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox", common.ItemBox);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/QiandaoRender");
                        };
                        return QiandaoRenderUI;
                    }(View));
                    render.QiandaoRenderUI = QiandaoRenderUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var RatingfundRenderUI = /** @class */ (function (_super) {
                        __extends(RatingfundRenderUI, _super);
                        function RatingfundRenderUI() {
                            return _super.call(this) || this;
                        }
                        RatingfundRenderUI.prototype.createChildren = function () {
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            View.regComponent("common.ItemBox", common.ItemBox);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/RatingfundRender");
                        };
                        return RatingfundRenderUI;
                    }(View));
                    render.RatingfundRenderUI = RatingfundRenderUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var toSignIRUI = /** @class */ (function (_super) {
                        __extends(toSignIRUI, _super);
                        function toSignIRUI() {
                            return _super.call(this) || this;
                        }
                        toSignIRUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox", common.ItemBox);
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/toSignIR");
                        };
                        return toSignIRUI;
                    }(View));
                    render.toSignIRUI = toSignIRUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var TotalsignRenderUI = /** @class */ (function (_super) {
                        __extends(TotalsignRenderUI, _super);
                        function TotalsignRenderUI() {
                            return _super.call(this) || this;
                        }
                        TotalsignRenderUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox", common.ItemBox);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/TotalsignRender");
                        };
                        return TotalsignRenderUI;
                    }(View));
                    render.TotalsignRenderUI = TotalsignRenderUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var render;
                (function (render) {
                    var YueKaItemIRUI = /** @class */ (function (_super) {
                        __extends(YueKaItemIRUI, _super);
                        function YueKaItemIRUI() {
                            return _super.call(this) || this;
                        }
                        YueKaItemIRUI.prototype.createChildren = function () {
                            View.regComponent("common.ItemBox", common.ItemBox);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/render/YueKaItemIR");
                        };
                        return YueKaItemIRUI;
                    }(DialogExt));
                    render.YueKaItemIRUI = YueKaItemIRUI;
                })(render = welfare.render || (welfare.render = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var DengjiUI = /** @class */ (function (_super) {
                        __extends(DengjiUI, _super);
                        function DengjiUI() {
                            return _super.call(this) || this;
                        }
                        DengjiUI.prototype.createChildren = function () {
                            View.regComponent("game.LvGiftIR", game.LvGiftIR);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/Dengji");
                        };
                        return DengjiUI;
                    }(DialogExt));
                    tab.DengjiUI = DengjiUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var DuihuanUI = /** @class */ (function (_super) {
                        __extends(DuihuanUI, _super);
                        function DuihuanUI() {
                            return _super.call(this) || this;
                        }
                        DuihuanUI.prototype.createChildren = function () {
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/Duihuan");
                        };
                        return DuihuanUI;
                    }(DialogExt));
                    tab.DuihuanUI = DuihuanUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var JijinUI = /** @class */ (function (_super) {
                        __extends(JijinUI, _super);
                        function JijinUI() {
                            return _super.call(this) || this;
                        }
                        JijinUI.prototype.createChildren = function () {
                            View.regComponent("game.FundIR", game.FundIR);
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/Jijin");
                        };
                        return JijinUI;
                    }(DialogExt));
                    tab.JijinUI = JijinUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var SignUI = /** @class */ (function (_super) {
                        __extends(SignUI, _super);
                        function SignUI() {
                            return _super.call(this) || this;
                        }
                        SignUI.prototype.createChildren = function () {
                            View.regComponent("game.SignInIR", game.SignInIR);
                            View.regComponent("game.TotalsignIR", game.TotalsignIR);
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/Sign");
                        };
                        return SignUI;
                    }(DialogExt));
                    tab.SignUI = SignUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var toSignUI = /** @class */ (function (_super) {
                        __extends(toSignUI, _super);
                        function toSignUI() {
                            return _super.call(this) || this;
                        }
                        toSignUI.prototype.createChildren = function () {
                            View.regComponent("game.TosignIR", game.TosignIR);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/toSign");
                        };
                        return toSignUI;
                    }(DialogExt));
                    tab.toSignUI = toSignUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var XianGouLibaoUI = /** @class */ (function (_super) {
                        __extends(XianGouLibaoUI, _super);
                        function XianGouLibaoUI() {
                            return _super.call(this) || this;
                        }
                        XianGouLibaoUI.prototype.createChildren = function () {
                            View.regComponent("game.XiangouLibaoIR", game.XiangouLibaoIR);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/XianGouLibao");
                        };
                        return XianGouLibaoUI;
                    }(DialogExt));
                    tab.XianGouLibaoUI = XianGouLibaoUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var XuyuanUI = /** @class */ (function (_super) {
                        __extends(XuyuanUI, _super);
                        function XuyuanUI() {
                            return _super.call(this) || this;
                        }
                        XuyuanUI.prototype.createChildren = function () {
                            View.regComponent("common.scaleButton", common.scaleButton);
                            View.regComponent("common.ItemBox3", common.ItemBox3);
                            View.regComponent("game.RedPointProp", game.RedPointProp);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/Xuyuan");
                        };
                        return XuyuanUI;
                    }(DialogExt));
                    tab.XuyuanUI = XuyuanUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var tab;
                (function (tab) {
                    var YuekaUI = /** @class */ (function (_super) {
                        __extends(YuekaUI, _super);
                        function YuekaUI() {
                            return _super.call(this) || this;
                        }
                        YuekaUI.prototype.createChildren = function () {
                            View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                            View.regComponent("game.RedPointProp", game.RedPointProp);
                            View.regComponent("game.YueKaItemIR", game.YueKaItemIR);
                            _super.prototype.createChildren.call(this);
                            this.loadUI("activity/huodong/welfare/tab/Yueka");
                        };
                        return YuekaUI;
                    }(DialogExt));
                    tab.YuekaUI = YuekaUI;
                })(tab = welfare.tab || (welfare.tab = {}));
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var huodong;
        (function (huodong) {
            var welfare;
            (function (welfare) {
                var welfareUI = /** @class */ (function (_super) {
                    __extends(welfareUI, _super);
                    function welfareUI() {
                        return _super.call(this) || this;
                    }
                    welfareUI.prototype.createChildren = function () {
                        View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                        View.regComponent("game.WelfareIR", game.WelfareIR);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/huodong/welfare/welfare");
                    };
                    return welfareUI;
                }(DialogExt));
                welfare.welfareUI = welfareUI;
            })(welfare = huodong.welfare || (huodong.welfare = {}));
        })(huodong = activity.huodong || (activity.huodong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var JiangLiUI = /** @class */ (function (_super) {
                __extends(JiangLiUI, _super);
                function JiangLiUI() {
                    return _super.call(this) || this;
                }
                JiangLiUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.JiangliIR", game.JiangliIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/limitebuy/JiangLi");
                };
                return JiangLiUI;
            }(DialogExt));
            limitebuy.JiangLiUI = JiangLiUI;
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var LimiteBuyUI = /** @class */ (function (_super) {
                __extends(LimiteBuyUI, _super);
                function LimiteBuyUI() {
                    return _super.call(this) || this;
                }
                LimiteBuyUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.LbTabIR", game.LbTabIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/limitebuy/LimiteBuy");
                };
                return LimiteBuyUI;
            }(DialogExt));
            limitebuy.LimiteBuyUI = LimiteBuyUI;
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var render;
            (function (render) {
                var ItemSelectBoxUI = /** @class */ (function (_super) {
                    __extends(ItemSelectBoxUI, _super);
                    function ItemSelectBoxUI() {
                        return _super.call(this) || this;
                    }
                    ItemSelectBoxUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox", common.ItemBox);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/render/ItemSelectBox");
                    };
                    return ItemSelectBoxUI;
                }(View));
                render.ItemSelectBoxUI = ItemSelectBoxUI;
            })(render = limitebuy.render || (limitebuy.render = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var render;
            (function (render) {
                var JiangliIRUI = /** @class */ (function (_super) {
                    __extends(JiangliIRUI, _super);
                    function JiangliIRUI() {
                        return _super.call(this) || this;
                    }
                    JiangliIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox", common.ItemBox);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/render/JiangliIR");
                    };
                    return JiangliIRUI;
                }(View));
                render.JiangliIRUI = JiangliIRUI;
            })(render = limitebuy.render || (limitebuy.render = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var render;
            (function (render) {
                var RankIRUI = /** @class */ (function (_super) {
                    __extends(RankIRUI, _super);
                    function RankIRUI() {
                        return _super.call(this) || this;
                    }
                    RankIRUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/render/RankIR");
                    };
                    return RankIRUI;
                }(View));
                render.RankIRUI = RankIRUI;
            })(render = limitebuy.render || (limitebuy.render = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var render;
            (function (render) {
                var ScoreIRUI = /** @class */ (function (_super) {
                    __extends(ScoreIRUI, _super);
                    function ScoreIRUI() {
                        return _super.call(this) || this;
                    }
                    ScoreIRUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/render/ScoreIR");
                    };
                    return ScoreIRUI;
                }(View));
                render.ScoreIRUI = ScoreIRUI;
            })(render = limitebuy.render || (limitebuy.render = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var render;
            (function (render) {
                var ZheKouIRUI = /** @class */ (function (_super) {
                    __extends(ZheKouIRUI, _super);
                    function ZheKouIRUI() {
                        return _super.call(this) || this;
                    }
                    ZheKouIRUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/render/ZheKouIR");
                    };
                    return ZheKouIRUI;
                }(View));
                render.ZheKouIRUI = ZheKouIRUI;
            })(render = limitebuy.render || (limitebuy.render = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var tab;
            (function (tab) {
                var TabGroupUI = /** @class */ (function (_super) {
                    __extends(TabGroupUI, _super);
                    function TabGroupUI() {
                        return _super.call(this) || this;
                    }
                    TabGroupUI.prototype.createChildren = function () {
                        View.regComponent("game.ItemSelectBox", game.ItemSelectBox);
                        View.regComponent("game.ZheKouIR", game.ZheKouIR);
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        View.regComponent("common.ItemBox", common.ItemBox);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/tab/TabGroup");
                    };
                    return TabGroupUI;
                }(View));
                tab.TabGroupUI = TabGroupUI;
            })(tab = limitebuy.tab || (limitebuy.tab = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var limitebuy;
        (function (limitebuy) {
            var tab;
            (function (tab) {
                var TabSummonUI = /** @class */ (function (_super) {
                    __extends(TabSummonUI, _super);
                    function TabSummonUI() {
                        return _super.call(this) || this;
                    }
                    TabSummonUI.prototype.createChildren = function () {
                        View.regComponent("game.LbRankIR", game.LbRankIR);
                        View.regComponent("common.scaleButton", common.scaleButton);
                        View.regComponent("game.ScoreIR", game.ScoreIR);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/limitebuy/tab/TabSummon");
                    };
                    return TabSummonUI;
                }(View));
                tab.TabSummonUI = TabSummonUI;
            })(tab = limitebuy.tab || (limitebuy.tab = {}));
        })(limitebuy = activity.limitebuy || (activity.limitebuy = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var logingift;
        (function (logingift) {
            var logingiftUI = /** @class */ (function (_super) {
                __extends(logingiftUI, _super);
                function logingiftUI() {
                    return _super.call(this) || this;
                }
                logingiftUI.prototype.createChildren = function () {
                    View.regComponent("ui.activity.logingift.logingiftIRUI", ui.activity.logingift.logingiftIRUI);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/logingift/logingift");
                };
                return logingiftUI;
            }(DialogExt));
            logingift.logingiftUI = logingiftUI;
        })(logingift = activity.logingift || (activity.logingift = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var logingift;
        (function (logingift) {
            var logingiftIRUI = /** @class */ (function (_super) {
                __extends(logingiftIRUI, _super);
                function logingiftIRUI() {
                    return _super.call(this) || this;
                }
                logingiftIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/logingift/logingiftIR");
                };
                return logingiftIRUI;
            }(View));
            logingift.logingiftIRUI = logingiftIRUI;
        })(logingift = activity.logingift || (activity.logingift = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var notice;
        (function (notice) {
            var GameNoticeUI = /** @class */ (function (_super) {
                __extends(GameNoticeUI, _super);
                function GameNoticeUI() {
                    return _super.call(this) || this;
                }
                GameNoticeUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/notice/GameNotice");
                };
                return GameNoticeUI;
            }(DialogExt));
            notice.GameNoticeUI = GameNoticeUI;
        })(notice = activity.notice || (activity.notice = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var notice;
        (function (notice) {
            var NoticeIRUI = /** @class */ (function (_super) {
                __extends(NoticeIRUI, _super);
                function NoticeIRUI() {
                    return _super.call(this) || this;
                }
                NoticeIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/notice/NoticeIR");
                };
                return NoticeIRUI;
            }(View));
            notice.NoticeIRUI = NoticeIRUI;
        })(notice = activity.notice || (activity.notice = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var online;
        (function (online) {
            var itemIRUI = /** @class */ (function (_super) {
                __extends(itemIRUI, _super);
                function itemIRUI() {
                    return _super.call(this) || this;
                }
                itemIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/online/itemIR");
                };
                return itemIRUI;
            }(DialogExt));
            online.itemIRUI = itemIRUI;
        })(online = activity.online || (activity.online = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var online;
        (function (online) {
            var mainPageUI = /** @class */ (function (_super) {
                __extends(mainPageUI, _super);
                function mainPageUI() {
                    return _super.call(this) || this;
                }
                mainPageUI.prototype.createChildren = function () {
                    View.regComponent("game.ItemIR", game.ItemIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/online/mainPage");
                };
                return mainPageUI;
            }(DialogExt));
            online.mainPageUI = mainPageUI;
        })(online = activity.online || (activity.online = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var openserver;
        (function (openserver) {
            var mainPageUI = /** @class */ (function (_super) {
                __extends(mainPageUI, _super);
                function mainPageUI() {
                    return _super.call(this) || this;
                }
                mainPageUI.prototype.createChildren = function () {
                    View.regComponent("game.TabIR", game.TabIR);
                    View.regComponent("game.TabPage", game.TabPage);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/openserver/mainPage");
                };
                return mainPageUI;
            }(DialogExt));
            openserver.mainPageUI = mainPageUI;
        })(openserver = activity.openserver || (activity.openserver = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var openserver;
        (function (openserver) {
            var openServerGiftUI = /** @class */ (function (_super) {
                __extends(openServerGiftUI, _super);
                function openServerGiftUI() {
                    return _super.call(this) || this;
                }
                openServerGiftUI.prototype.createChildren = function () {
                    View.regComponent("game.OpenServerGiftIR", game.OpenServerGiftIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/openserver/openServerGift");
                };
                return openServerGiftUI;
            }(DialogExt));
            openserver.openServerGiftUI = openServerGiftUI;
        })(openserver = activity.openserver || (activity.openserver = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var openserver;
        (function (openserver) {
            var openServerGiftIRUI = /** @class */ (function (_super) {
                __extends(openServerGiftIRUI, _super);
                function openServerGiftIRUI() {
                    return _super.call(this) || this;
                }
                openServerGiftIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/openserver/openServerGiftIR");
                };
                return openServerGiftIRUI;
            }(View));
            openserver.openServerGiftIRUI = openServerGiftIRUI;
        })(openserver = activity.openserver || (activity.openserver = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var openserver;
        (function (openserver) {
            var tabPageUI = /** @class */ (function (_super) {
                __extends(tabPageUI, _super);
                function tabPageUI() {
                    return _super.call(this) || this;
                }
                tabPageUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/openserver/tabPage");
                };
                return tabPageUI;
            }(DialogExt));
            openserver.tabPageUI = tabPageUI;
        })(openserver = activity.openserver || (activity.openserver = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var powerrank;
        (function (powerrank) {
            var itemIRUI = /** @class */ (function (_super) {
                __extends(itemIRUI, _super);
                function itemIRUI() {
                    return _super.call(this) || this;
                }
                itemIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/powerrank/itemIR");
                };
                return itemIRUI;
            }(DialogExt));
            powerrank.itemIRUI = itemIRUI;
        })(powerrank = activity.powerrank || (activity.powerrank = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var powerrank;
        (function (powerrank) {
            var mainPageUI = /** @class */ (function (_super) {
                __extends(mainPageUI, _super);
                function mainPageUI() {
                    return _super.call(this) || this;
                }
                mainPageUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.TabIR1", common.TabIR1);
                    View.regComponent("game.MainTabPage", game.MainTabPage);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/powerrank/mainPage");
                };
                return mainPageUI;
            }(DialogExt));
            powerrank.mainPageUI = mainPageUI;
        })(powerrank = activity.powerrank || (activity.powerrank = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var powerrank;
        (function (powerrank) {
            var mainTabPageUI = /** @class */ (function (_super) {
                __extends(mainTabPageUI, _super);
                function mainTabPageUI() {
                    return _super.call(this) || this;
                }
                mainTabPageUI.prototype.createChildren = function () {
                    View.regComponent("game.PowerAwardIR", game.PowerAwardIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/powerrank/mainTabPage");
                };
                return mainTabPageUI;
            }(DialogExt));
            powerrank.mainTabPageUI = mainTabPageUI;
        })(powerrank = activity.powerrank || (activity.powerrank = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var powerrank;
        (function (powerrank) {
            var powerRankUI = /** @class */ (function (_super) {
                __extends(powerRankUI, _super);
                function powerRankUI() {
                    return _super.call(this) || this;
                }
                powerRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.PrRankIR", game.PrRankIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/powerrank/powerRank");
                };
                return powerRankUI;
            }(DialogExt));
            powerrank.powerRankUI = powerRankUI;
        })(powerrank = activity.powerrank || (activity.powerrank = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var powerrank;
        (function (powerrank) {
            var rankIRUI = /** @class */ (function (_super) {
                __extends(rankIRUI, _super);
                function rankIRUI() {
                    return _super.call(this) || this;
                }
                rankIRUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/powerrank/rankIR");
                };
                return rankIRUI;
            }(View));
            powerrank.rankIRUI = rankIRUI;
        })(powerrank = activity.powerrank || (activity.powerrank = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var realName;
        (function (realName) {
            var realNameUI = /** @class */ (function (_super) {
                __extends(realNameUI, _super);
                function realNameUI() {
                    return _super.call(this) || this;
                }
                realNameUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/realName/realName");
                };
                return realNameUI;
            }(DialogExt));
            realName.realNameUI = realNameUI;
        })(realName = activity.realName || (activity.realName = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var sevendays;
        (function (sevendays) {
            var render;
            (function (render) {
                var SevendaysRenderUI = /** @class */ (function (_super) {
                    __extends(SevendaysRenderUI, _super);
                    function SevendaysRenderUI() {
                        return _super.call(this) || this;
                    }
                    SevendaysRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox", common.ItemBox);
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/sevendays/render/SevendaysRender");
                    };
                    return SevendaysRenderUI;
                }(View));
                render.SevendaysRenderUI = SevendaysRenderUI;
            })(render = sevendays.render || (sevendays.render = {}));
        })(sevendays = activity.sevendays || (activity.sevendays = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var sevendays;
        (function (sevendays) {
            var render;
            (function (render) {
                var tabItemRenderUI = /** @class */ (function (_super) {
                    __extends(tabItemRenderUI, _super);
                    function tabItemRenderUI() {
                        return _super.call(this) || this;
                    }
                    tabItemRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        View.regComponent("game.RedPointProp", game.RedPointProp);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("activity/sevendays/render/tabItemRender");
                    };
                    return tabItemRenderUI;
                }(View));
                render.tabItemRenderUI = tabItemRenderUI;
            })(render = sevendays.render || (sevendays.render = {}));
        })(sevendays = activity.sevendays || (activity.sevendays = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var sevendays;
        (function (sevendays) {
            var sevendaysUI = /** @class */ (function (_super) {
                __extends(sevendaysUI, _super);
                function sevendaysUI() {
                    return _super.call(this) || this;
                }
                sevendaysUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("game.tabIR", game.tabIR);
                    View.regComponent("common.TabIR1", common.TabIR1);
                    View.regComponent("game.SevendaysIR", game.SevendaysIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/sevendays/sevendays");
                };
                return sevendaysUI;
            }(DialogExt));
            sevendays.sevendaysUI = sevendaysUI;
        })(sevendays = activity.sevendays || (activity.sevendays = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var share;
        (function (share) {
            var firstPageUI = /** @class */ (function (_super) {
                __extends(firstPageUI, _super);
                function firstPageUI() {
                    return _super.call(this) || this;
                }
                firstPageUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/share/firstPage");
                };
                return firstPageUI;
            }(DialogExt));
            share.firstPageUI = firstPageUI;
        })(share = activity.share || (activity.share = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var share;
        (function (share) {
            var mainIRUI = /** @class */ (function (_super) {
                __extends(mainIRUI, _super);
                function mainIRUI() {
                    return _super.call(this) || this;
                }
                mainIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/share/mainIR");
                };
                return mainIRUI;
            }(DialogExt));
            share.mainIRUI = mainIRUI;
        })(share = activity.share || (activity.share = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var share;
        (function (share) {
            var mainPageUI = /** @class */ (function (_super) {
                __extends(mainPageUI, _super);
                function mainPageUI() {
                    return _super.call(this) || this;
                }
                mainPageUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.ShareMainIR", game.ShareMainIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/share/mainPage");
                };
                return mainPageUI;
            }(DialogExt));
            share.mainPageUI = mainPageUI;
        })(share = activity.share || (activity.share = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var shouchong;
        (function (shouchong) {
            var RewardIRUI = /** @class */ (function (_super) {
                __extends(RewardIRUI, _super);
                function RewardIRUI() {
                    return _super.call(this) || this;
                }
                RewardIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/shouchong/RewardIR");
                };
                return RewardIRUI;
            }(View));
            shouchong.RewardIRUI = RewardIRUI;
        })(shouchong = activity.shouchong || (activity.shouchong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var shouchong;
        (function (shouchong) {
            var ShouchongUI = /** @class */ (function (_super) {
                __extends(ShouchongUI, _super);
                function ShouchongUI() {
                    return _super.call(this) || this;
                }
                ShouchongUI.prototype.createChildren = function () {
                    View.regComponent("ui.activity.shouchong.ShouchongTabOneUI", ui.activity.shouchong.ShouchongTabOneUI);
                    View.regComponent("ui.activity.shouchong.ShouchongTabTwoUI", ui.activity.shouchong.ShouchongTabTwoUI);
                    View.regComponent("ui.activity.shouchong.ShouchongTabThreeUI", ui.activity.shouchong.ShouchongTabThreeUI);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/shouchong/Shouchong");
                };
                return ShouchongUI;
            }(DialogExt));
            shouchong.ShouchongUI = ShouchongUI;
        })(shouchong = activity.shouchong || (activity.shouchong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var shouchong;
        (function (shouchong) {
            var ShouchongTabOneUI = /** @class */ (function (_super) {
                __extends(ShouchongTabOneUI, _super);
                function ShouchongTabOneUI() {
                    return _super.call(this) || this;
                }
                ShouchongTabOneUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/shouchong/ShouchongTabOne");
                };
                return ShouchongTabOneUI;
            }(DialogExt));
            shouchong.ShouchongTabOneUI = ShouchongTabOneUI;
        })(shouchong = activity.shouchong || (activity.shouchong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var shouchong;
        (function (shouchong) {
            var ShouchongTabThreeUI = /** @class */ (function (_super) {
                __extends(ShouchongTabThreeUI, _super);
                function ShouchongTabThreeUI() {
                    return _super.call(this) || this;
                }
                ShouchongTabThreeUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/shouchong/ShouchongTabThree");
                };
                return ShouchongTabThreeUI;
            }(DialogExt));
            shouchong.ShouchongTabThreeUI = ShouchongTabThreeUI;
        })(shouchong = activity.shouchong || (activity.shouchong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var shouchong;
        (function (shouchong) {
            var ShouchongTabTwoUI = /** @class */ (function (_super) {
                __extends(ShouchongTabTwoUI, _super);
                function ShouchongTabTwoUI() {
                    return _super.call(this) || this;
                }
                ShouchongTabTwoUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/shouchong/ShouchongTabTwo");
                };
                return ShouchongTabTwoUI;
            }(DialogExt));
            shouchong.ShouchongTabTwoUI = ShouchongTabTwoUI;
        })(shouchong = activity.shouchong || (activity.shouchong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var shouchong;
        (function (shouchong) {
            var ShouchongtishiUI = /** @class */ (function (_super) {
                __extends(ShouchongtishiUI, _super);
                function ShouchongtishiUI() {
                    return _super.call(this) || this;
                }
                ShouchongtishiUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/shouchong/Shouchongtishi");
                };
                return ShouchongtishiUI;
            }(DialogExt));
            shouchong.ShouchongtishiUI = ShouchongtishiUI;
        })(shouchong = activity.shouchong || (activity.shouchong = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var supervip;
        (function (supervip) {
            var SuperVipUI = /** @class */ (function (_super) {
                __extends(SuperVipUI, _super);
                function SuperVipUI() {
                    return _super.call(this) || this;
                }
                SuperVipUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/supervip/SuperVip");
                };
                return SuperVipUI;
            }(DialogExt));
            supervip.SuperVipUI = SuperVipUI;
        })(supervip = activity.supervip || (activity.supervip = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var testrebate;
        (function (testrebate) {
            var TestRebateUI = /** @class */ (function (_super) {
                __extends(TestRebateUI, _super);
                function TestRebateUI() {
                    return _super.call(this) || this;
                }
                TestRebateUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/testrebate/TestRebate");
                };
                return TestRebateUI;
            }(DialogExt));
            testrebate.TestRebateUI = TestRebateUI;
        })(testrebate = activity.testrebate || (activity.testrebate = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var timelimitactivity;
        (function (timelimitactivity) {
            var ExchangeItemUI = /** @class */ (function (_super) {
                __extends(ExchangeItemUI, _super);
                function ExchangeItemUI() {
                    return _super.call(this) || this;
                }
                ExchangeItemUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/timelimitactivity/ExchangeItem");
                };
                return ExchangeItemUI;
            }(DialogExt));
            timelimitactivity.ExchangeItemUI = ExchangeItemUI;
        })(timelimitactivity = activity.timelimitactivity || (activity.timelimitactivity = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var timelimitactivity;
        (function (timelimitactivity) {
            var HuodongRenderUI = /** @class */ (function (_super) {
                __extends(HuodongRenderUI, _super);
                function HuodongRenderUI() {
                    return _super.call(this) || this;
                }
                HuodongRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/timelimitactivity/HuodongRender");
                };
                return HuodongRenderUI;
            }(DialogExt));
            timelimitactivity.HuodongRenderUI = HuodongRenderUI;
        })(timelimitactivity = activity.timelimitactivity || (activity.timelimitactivity = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var timelimitactivity;
        (function (timelimitactivity) {
            var JiJinIRUI = /** @class */ (function (_super) {
                __extends(JiJinIRUI, _super);
                function JiJinIRUI() {
                    return _super.call(this) || this;
                }
                JiJinIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/timelimitactivity/JiJinIR");
                };
                return JiJinIRUI;
            }(View));
            timelimitactivity.JiJinIRUI = JiJinIRUI;
        })(timelimitactivity = activity.timelimitactivity || (activity.timelimitactivity = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var timelimitactivity;
        (function (timelimitactivity) {
            var TimeLimitActivityUI = /** @class */ (function (_super) {
                __extends(TimeLimitActivityUI, _super);
                function TimeLimitActivityUI() {
                    return _super.call(this) || this;
                }
                TimeLimitActivityUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("game.TlTabIR", game.TlTabIR);
                    View.regComponent("game.TlInfoIR", game.TlInfoIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/timelimitactivity/TimeLimitActivity");
                };
                return TimeLimitActivityUI;
            }(DialogExt));
            timelimitactivity.TimeLimitActivityUI = TimeLimitActivityUI;
        })(timelimitactivity = activity.timelimitactivity || (activity.timelimitactivity = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var timelimitactivity;
        (function (timelimitactivity) {
            var WeekFundUI = /** @class */ (function (_super) {
                __extends(WeekFundUI, _super);
                function WeekFundUI() {
                    return _super.call(this) || this;
                }
                WeekFundUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.FundTabIR", game.FundTabIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("game.FundRewardIR", game.FundRewardIR);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/timelimitactivity/WeekFund");
                };
                return WeekFundUI;
            }(DialogExt));
            timelimitactivity.WeekFundUI = WeekFundUI;
        })(timelimitactivity = activity.timelimitactivity || (activity.timelimitactivity = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var activity;
    (function (activity) {
        var timelimitactivity;
        (function (timelimitactivity) {
            var xianshiViewUI = /** @class */ (function (_super) {
                __extends(xianshiViewUI, _super);
                function xianshiViewUI() {
                    return _super.call(this) || this;
                }
                xianshiViewUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("activity/timelimitactivity/xianshiView");
                };
                return xianshiViewUI;
            }(DialogExt));
            timelimitactivity.xianshiViewUI = xianshiViewUI;
        })(timelimitactivity = activity.timelimitactivity || (activity.timelimitactivity = {}));
    })(activity = ui.activity || (ui.activity = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_1) {
        var arena;
        (function (arena) {
            var ArenaUI = /** @class */ (function (_super) {
                __extends(ArenaUI, _super);
                function ArenaUI() {
                    return _super.call(this) || this;
                }
                ArenaUI.prototype.createChildren = function () {
                    View.regComponent("game.ArenaIR", game.ArenaIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/arena/Arena");
                };
                return ArenaUI;
            }(DialogExt));
            arena.ArenaUI = ArenaUI;
        })(arena = arena_1.arena || (arena_1.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_2) {
        var arena;
        (function (arena) {
            var ArenaFailUI = /** @class */ (function (_super) {
                __extends(ArenaFailUI, _super);
                function ArenaFailUI() {
                    return _super.call(this) || this;
                }
                ArenaFailUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                    View.regComponent("common.ChannelBox", common.ChannelBox);
                    View.regComponent("game.ClgRewardIR", game.ClgRewardIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/arena/ArenaFail");
                };
                return ArenaFailUI;
            }(DialogExt));
            arena.ArenaFailUI = ArenaFailUI;
        })(arena = arena_2.arena || (arena_2.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_3) {
        var arena;
        (function (arena) {
            var ArenaRankUI = /** @class */ (function (_super) {
                __extends(ArenaRankUI, _super);
                function ArenaRankUI() {
                    return _super.call(this) || this;
                }
                ArenaRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.RankIR", common.RankIR);
                    View.regComponent("common.AwardRankIR", common.AwardRankIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/arena/ArenaRank");
                };
                return ArenaRankUI;
            }(DialogExt));
            arena.ArenaRankUI = ArenaRankUI;
        })(arena = arena_3.arena || (arena_3.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_4) {
        var arena;
        (function (arena) {
            var ArenaRecordUI = /** @class */ (function (_super) {
                __extends(ArenaRecordUI, _super);
                function ArenaRecordUI() {
                    return _super.call(this) || this;
                }
                ArenaRecordUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle2View", common.CommonTitle2View);
                    View.regComponent("game.ArenaRecordIR", game.ArenaRecordIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/arena/ArenaRecord");
                };
                return ArenaRecordUI;
            }(DialogExt));
            arena.ArenaRecordUI = ArenaRecordUI;
        })(arena = arena_4.arena || (arena_4.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_5) {
        var arena;
        (function (arena) {
            var ArenaSuccUI = /** @class */ (function (_super) {
                __extends(ArenaSuccUI, _super);
                function ArenaSuccUI() {
                    return _super.call(this) || this;
                }
                ArenaSuccUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                    View.regComponent("game.ArenaBrandIR", game.ArenaBrandIR);
                    View.regComponent("game.ClgRewardIR", game.ClgRewardIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/arena/ArenaSucc");
                };
                return ArenaSuccUI;
            }(DialogExt));
            arena.ArenaSuccUI = ArenaSuccUI;
        })(arena = arena_5.arena || (arena_5.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_6) {
        var arena;
        (function (arena) {
            var ArenaTopRankUI = /** @class */ (function (_super) {
                __extends(ArenaTopRankUI, _super);
                function ArenaTopRankUI() {
                    return _super.call(this) || this;
                }
                ArenaTopRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/arena/ArenaTopRank");
                };
                return ArenaTopRankUI;
            }(DialogExt));
            arena.ArenaTopRankUI = ArenaTopRankUI;
        })(arena = arena_6.arena || (arena_6.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_7) {
        var arena;
        (function (arena) {
            var render;
            (function (render) {
                var ArenaBrandIRUI = /** @class */ (function (_super) {
                    __extends(ArenaBrandIRUI, _super);
                    function ArenaBrandIRUI() {
                        return _super.call(this) || this;
                    }
                    ArenaBrandIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox", common.ItemBox);
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("arena/arena/render/ArenaBrandIR");
                    };
                    return ArenaBrandIRUI;
                }(View));
                render.ArenaBrandIRUI = ArenaBrandIRUI;
            })(render = arena.render || (arena.render = {}));
        })(arena = arena_7.arena || (arena_7.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_8) {
        var arena;
        (function (arena) {
            var render;
            (function (render) {
                var ArenaIRUI = /** @class */ (function (_super) {
                    __extends(ArenaIRUI, _super);
                    function ArenaIRUI() {
                        return _super.call(this) || this;
                    }
                    ArenaIRUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadUI("arena/arena/render/ArenaIR");
                    };
                    return ArenaIRUI;
                }(View));
                render.ArenaIRUI = ArenaIRUI;
            })(render = arena.render || (arena.render = {}));
        })(arena = arena_8.arena || (arena_8.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena_9) {
        var arena;
        (function (arena) {
            var render;
            (function (render) {
                var ArenaRecordIRUI = /** @class */ (function (_super) {
                    __extends(ArenaRecordIRUI, _super);
                    function ArenaRecordIRUI() {
                        return _super.call(this) || this;
                    }
                    ArenaRecordIRUI.prototype.createChildren = function () {
                        View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("arena/arena/render/ArenaRecordIR");
                    };
                    return ArenaRecordIRUI;
                }(View));
                render.ArenaRecordIRUI = ArenaRecordIRUI;
            })(render = arena.render || (arena.render = {}));
        })(arena = arena_9.arena || (arena_9.arena = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena) {
        var match;
        (function (match) {
            var MatchMainUI = /** @class */ (function (_super) {
                __extends(MatchMainUI, _super);
                function MatchMainUI() {
                    return _super.call(this) || this;
                }
                MatchMainUI.prototype.createChildren = function () {
                    View.regComponent("game.MatchIR", game.MatchIR);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/match/MatchMain");
                };
                return MatchMainUI;
            }(DialogExt));
            match.MatchMainUI = MatchMainUI;
        })(match = arena.match || (arena.match = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena) {
        var match;
        (function (match) {
            var MatchRankUI = /** @class */ (function (_super) {
                __extends(MatchRankUI, _super);
                function MatchRankUI() {
                    return _super.call(this) || this;
                }
                MatchRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.RankIR", common.RankIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/match/MatchRank");
                };
                return MatchRankUI;
            }(DialogExt));
            match.MatchRankUI = MatchRankUI;
        })(match = arena.match || (arena.match = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena) {
        var match;
        (function (match) {
            var MatchResultUI = /** @class */ (function (_super) {
                __extends(MatchResultUI, _super);
                function MatchResultUI() {
                    return _super.call(this) || this;
                }
                MatchResultUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                    View.regComponent("common.ChannelBox", common.ChannelBox);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/match/MatchResult");
                };
                return MatchResultUI;
            }(DialogExt));
            match.MatchResultUI = MatchResultUI;
        })(match = arena.match || (arena.match = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena) {
        var match;
        (function (match) {
            var MatchRewardUI = /** @class */ (function (_super) {
                __extends(MatchRewardUI, _super);
                function MatchRewardUI() {
                    return _super.call(this) || this;
                }
                MatchRewardUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.AwardRankIR", common.AwardRankIR);
                    View.regComponent("game.KuafuRewardIR", game.KuafuRewardIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("arena/match/MatchReward");
                };
                return MatchRewardUI;
            }(DialogExt));
            match.MatchRewardUI = MatchRewardUI;
        })(match = arena.match || (arena.match = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena) {
        var match;
        (function (match) {
            var render;
            (function (render) {
                var KuafuRewardIRUI = /** @class */ (function (_super) {
                    __extends(KuafuRewardIRUI, _super);
                    function KuafuRewardIRUI() {
                        return _super.call(this) || this;
                    }
                    KuafuRewardIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("arena/match/render/KuafuRewardIR");
                    };
                    return KuafuRewardIRUI;
                }(View));
                render.KuafuRewardIRUI = KuafuRewardIRUI;
            })(render = match.render || (match.render = {}));
        })(match = arena.match || (arena.match = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var arena;
    (function (arena) {
        var match;
        (function (match) {
            var render;
            (function (render) {
                var MatchIRUI = /** @class */ (function (_super) {
                    __extends(MatchIRUI, _super);
                    function MatchIRUI() {
                        return _super.call(this) || this;
                    }
                    MatchIRUI.prototype.createChildren = function () {
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("arena/match/render/MatchIR");
                    };
                    return MatchIRUI;
                }(View));
                render.MatchIRUI = MatchIRUI;
            })(render = match.render || (match.render = {}));
        })(match = arena.match || (arena.match = {}));
    })(arena = ui.arena || (ui.arena = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var ArtifactUI = /** @class */ (function (_super) {
            __extends(ArtifactUI, _super);
            function ArtifactUI() {
                return _super.call(this) || this;
            }
            ArtifactUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("ui.artifact.itemRender.ArtifactItemRenderUI", ui.artifact.itemRender.ArtifactItemRenderUI);
                View.regComponent("game.godTabIR", game.godTabIR);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                View.regComponent("common.SkillBox", common.SkillBox);
                View.regComponent("game.TabBaptize", game.TabBaptize);
                View.regComponent("game.TabEnchant", game.TabEnchant);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("artifact/Artifact");
            };
            return ArtifactUI;
        }(DialogExt));
        artifact.ArtifactUI = ArtifactUI;
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var ArtifactListUI = /** @class */ (function (_super) {
            __extends(ArtifactListUI, _super);
            function ArtifactListUI() {
                return _super.call(this) || this;
            }
            ArtifactListUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.ArtifactListIR", game.ArtifactListIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("artifact/ArtifactList");
            };
            return ArtifactListUI;
        }(DialogExt));
        artifact.ArtifactListUI = ArtifactListUI;
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var ArtifactUnLockUI = /** @class */ (function (_super) {
            __extends(ArtifactUnLockUI, _super);
            function ArtifactUnLockUI() {
                return _super.call(this) || this;
            }
            ArtifactUnLockUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("artifact/ArtifactUnLock");
            };
            return ArtifactUnLockUI;
        }(DialogExt));
        artifact.ArtifactUnLockUI = ArtifactUnLockUI;
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var itemRender;
        (function (itemRender) {
            var ArtifactItemRenderUI = /** @class */ (function (_super) {
                __extends(ArtifactItemRenderUI, _super);
                function ArtifactItemRenderUI() {
                    return _super.call(this) || this;
                }
                ArtifactItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/itemRender/ArtifactItemRender");
                };
                return ArtifactItemRenderUI;
            }(View));
            itemRender.ArtifactItemRenderUI = ArtifactItemRenderUI;
        })(itemRender = artifact.itemRender || (artifact.itemRender = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var itemRender;
        (function (itemRender) {
            var ArtifactListIRUI = /** @class */ (function (_super) {
                __extends(ArtifactListIRUI, _super);
                function ArtifactListIRUI() {
                    return _super.call(this) || this;
                }
                ArtifactListIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/itemRender/ArtifactListIR");
                };
                return ArtifactListIRUI;
            }(View));
            itemRender.ArtifactListIRUI = ArtifactListIRUI;
        })(itemRender = artifact.itemRender || (artifact.itemRender = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var itemRender;
        (function (itemRender) {
            var BaptizeAttriRenderUI = /** @class */ (function (_super) {
                __extends(BaptizeAttriRenderUI, _super);
                function BaptizeAttriRenderUI() {
                    return _super.call(this) || this;
                }
                BaptizeAttriRenderUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/itemRender/BaptizeAttriRender");
                };
                return BaptizeAttriRenderUI;
            }(View));
            itemRender.BaptizeAttriRenderUI = BaptizeAttriRenderUI;
        })(itemRender = artifact.itemRender || (artifact.itemRender = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tab;
        (function (tab) {
            var ArtifactBaptizeUI = /** @class */ (function (_super) {
                __extends(ArtifactBaptizeUI, _super);
                function ArtifactBaptizeUI() {
                    return _super.call(this) || this;
                }
                ArtifactBaptizeUI.prototype.createChildren = function () {
                    View.regComponent("ui.artifact.itemRender.BaptizeAttriRenderUI", ui.artifact.itemRender.BaptizeAttriRenderUI);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tab/ArtifactBaptize");
                };
                return ArtifactBaptizeUI;
            }(View));
            tab.ArtifactBaptizeUI = ArtifactBaptizeUI;
        })(tab = artifact.tab || (artifact.tab = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tab;
        (function (tab) {
            var ArtifactEnchantUI = /** @class */ (function (_super) {
                __extends(ArtifactEnchantUI, _super);
                function ArtifactEnchantUI() {
                    return _super.call(this) || this;
                }
                ArtifactEnchantUI.prototype.createChildren = function () {
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tab/ArtifactEnchant");
                };
                return ArtifactEnchantUI;
            }(View));
            tab.ArtifactEnchantUI = ArtifactEnchantUI;
        })(tab = artifact.tab || (artifact.tab = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tip;
        (function (tip) {
            var ArtDetailsUI = /** @class */ (function (_super) {
                __extends(ArtDetailsUI, _super);
                function ArtDetailsUI() {
                    return _super.call(this) || this;
                }
                ArtDetailsUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tip/ArtDetails");
                };
                return ArtDetailsUI;
            }(DialogExt));
            tip.ArtDetailsUI = ArtDetailsUI;
        })(tip = artifact.tip || (artifact.tip = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tip;
        (function (tip) {
            var BaptizeDetailsUI = /** @class */ (function (_super) {
                __extends(BaptizeDetailsUI, _super);
                function BaptizeDetailsUI() {
                    return _super.call(this) || this;
                }
                BaptizeDetailsUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tip/BaptizeDetails");
                };
                return BaptizeDetailsUI;
            }(DialogExt));
            tip.BaptizeDetailsUI = BaptizeDetailsUI;
        })(tip = artifact.tip || (artifact.tip = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tip;
        (function (tip) {
            var BaptizeTipUI = /** @class */ (function (_super) {
                __extends(BaptizeTipUI, _super);
                function BaptizeTipUI() {
                    return _super.call(this) || this;
                }
                BaptizeTipUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tip/BaptizeTip");
                };
                return BaptizeTipUI;
            }(DialogExt));
            tip.BaptizeTipUI = BaptizeTipUI;
        })(tip = artifact.tip || (artifact.tip = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tip;
        (function (tip) {
            var EnchantTipUI = /** @class */ (function (_super) {
                __extends(EnchantTipUI, _super);
                function EnchantTipUI() {
                    return _super.call(this) || this;
                }
                EnchantTipUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tip/EnchantTip");
                };
                return EnchantTipUI;
            }(DialogExt));
            tip.EnchantTipUI = EnchantTipUI;
        })(tip = artifact.tip || (artifact.tip = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var artifact;
    (function (artifact) {
        var tip;
        (function (tip) {
            var ObtainTipUI = /** @class */ (function (_super) {
                __extends(ObtainTipUI, _super);
                function ObtainTipUI() {
                    return _super.call(this) || this;
                }
                ObtainTipUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("artifact/tip/ObtainTip");
                };
                return ObtainTipUI;
            }(DialogExt));
            tip.ObtainTipUI = ObtainTipUI;
        })(tip = artifact.tip || (artifact.tip = {}));
    })(artifact = ui.artifact || (ui.artifact = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BagUI = /** @class */ (function (_super) {
            __extends(BagUI, _super);
            function BagUI() {
                return _super.call(this) || this;
            }
            BagUI.prototype.createChildren = function () {
                View.regComponent("ui.bag.TabUI", ui.bag.TabUI);
                View.regComponent("common.HeadBox2", common.HeadBox2);
                View.regComponent("common.RaceBox", common.RaceBox);
                View.regComponent("game.ChooseTreasureIR", game.ChooseTreasureIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/Bag");
            };
            return BagUI;
        }(DialogExt));
        bag.BagUI = BagUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BagdetailsUI = /** @class */ (function (_super) {
            __extends(BagdetailsUI, _super);
            function BagdetailsUI() {
                return _super.call(this) || this;
            }
            BagdetailsUI.prototype.createChildren = function () {
                View.regComponent("game.PropretyIR", game.PropretyIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/Bagdetails");
            };
            return BagdetailsUI;
        }(DialogExt));
        bag.BagdetailsUI = BagdetailsUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BaseBoxUI = /** @class */ (function (_super) {
            __extends(BaseBoxUI, _super);
            function BaseBoxUI() {
                return _super.call(this) || this;
            }
            BaseBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/BaseBox");
            };
            return BaseBoxUI;
        }(DialogExt));
        bag.BaseBoxUI = BaseBoxUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var DetailsUI = /** @class */ (function (_super) {
            __extends(DetailsUI, _super);
            function DetailsUI() {
                return _super.call(this) || this;
            }
            DetailsUI.prototype.createChildren = function () {
                View.regComponent("game.PropretyIR", game.PropretyIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/Details");
            };
            return DetailsUI;
        }(DialogExt));
        bag.DetailsUI = DetailsUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var ItemBoxUI = /** @class */ (function (_super) {
            __extends(ItemBoxUI, _super);
            function ItemBoxUI() {
                return _super.call(this) || this;
            }
            ItemBoxUI.prototype.createChildren = function () {
                View.regComponent("game.BaseBox", game.BaseBox);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/ItemBox");
            };
            return ItemBoxUI;
        }(View));
        bag.ItemBoxUI = ItemBoxUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var ItemRenderUI = /** @class */ (function (_super) {
            __extends(ItemRenderUI, _super);
            function ItemRenderUI() {
                return _super.call(this) || this;
            }
            ItemRenderUI.prototype.createChildren = function () {
                View.regComponent("game.DetailIR", game.DetailIR);
                View.regComponent("game.BoxIR", game.BoxIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/ItemRender");
            };
            return ItemRenderUI;
        }(View));
        bag.ItemRenderUI = ItemRenderUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var RecycBoxUI = /** @class */ (function (_super) {
            __extends(RecycBoxUI, _super);
            function RecycBoxUI() {
                return _super.call(this) || this;
            }
            RecycBoxUI.prototype.createChildren = function () {
                View.regComponent("game.BaseBox", game.BaseBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/RecycBox");
            };
            return RecycBoxUI;
        }(DialogExt));
        bag.RecycBoxUI = RecycBoxUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var RecycleUI = /** @class */ (function (_super) {
            __extends(RecycleUI, _super);
            function RecycleUI() {
                return _super.call(this) || this;
            }
            RecycleUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.RecycIR", game.RecycIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/Recycle");
            };
            return RecycleUI;
        }(DialogExt));
        bag.RecycleUI = RecycleUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var RewardSelectUI = /** @class */ (function (_super) {
            __extends(RewardSelectUI, _super);
            function RewardSelectUI() {
                return _super.call(this) || this;
            }
            RewardSelectUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("ui.bag.RewardSelectIRUI", ui.bag.RewardSelectIRUI);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/RewardSelect");
            };
            return RewardSelectUI;
        }(DialogExt));
        bag.RewardSelectUI = RewardSelectUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var RewardSelectIRUI = /** @class */ (function (_super) {
            __extends(RewardSelectIRUI, _super);
            function RewardSelectIRUI() {
                return _super.call(this) || this;
            }
            RewardSelectIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/RewardSelectIR");
            };
            return RewardSelectIRUI;
        }(View));
        bag.RewardSelectIRUI = RewardSelectIRUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var TabUI = /** @class */ (function (_super) {
            __extends(TabUI, _super);
            function TabUI() {
                return _super.call(this) || this;
            }
            TabUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/Tab");
            };
            return TabUI;
        }(DialogExt));
        bag.TabUI = TabUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var UseUI = /** @class */ (function (_super) {
            __extends(UseUI, _super);
            function UseUI() {
                return _super.call(this) || this;
            }
            UseUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("bag/Use");
            };
            return UseUI;
        }(DialogExt));
        bag.UseUI = UseUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var BossIRUI = /** @class */ (function (_super) {
            __extends(BossIRUI, _super);
            function BossIRUI() {
                return _super.call(this) || this;
            }
            BossIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/BossIR");
            };
            return BossIRUI;
        }(View));
        boss.BossIRUI = BossIRUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var BossRewardIRUI = /** @class */ (function (_super) {
            __extends(BossRewardIRUI, _super);
            function BossRewardIRUI() {
                return _super.call(this) || this;
            }
            BossRewardIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/BossRewardIR");
            };
            return BossRewardIRUI;
        }(DialogExt));
        boss.BossRewardIRUI = BossRewardIRUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var FightRankUI = /** @class */ (function (_super) {
            __extends(FightRankUI, _super);
            function FightRankUI() {
                return _super.call(this) || this;
            }
            FightRankUI.prototype.createChildren = function () {
                View.regComponent("game.BossFightRankIR", game.BossFightRankIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/FightRank");
            };
            return FightRankUI;
        }(DialogExt));
        boss.FightRankUI = FightRankUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var FightRankIRUI = /** @class */ (function (_super) {
            __extends(FightRankIRUI, _super);
            function FightRankIRUI() {
                return _super.call(this) || this;
            }
            FightRankIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/FightRankIR");
            };
            return FightRankIRUI;
        }(View));
        boss.FightRankIRUI = FightRankIRUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var RankUI = /** @class */ (function (_super) {
            __extends(RankUI, _super);
            function RankUI() {
                return _super.call(this) || this;
            }
            RankUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.BossRankIR", game.BossRankIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/Rank");
            };
            return RankUI;
        }(DialogExt));
        boss.RankUI = RankUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var RankIRUI = /** @class */ (function (_super) {
            __extends(RankIRUI, _super);
            function RankIRUI() {
                return _super.call(this) || this;
            }
            RankIRUI.prototype.createChildren = function () {
                View.regComponent("common.CommonRankIR", common.CommonRankIR);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/RankIR");
            };
            return RankIRUI;
        }(View));
        boss.RankIRUI = RankIRUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var RewardUI = /** @class */ (function (_super) {
            __extends(RewardUI, _super);
            function RewardUI() {
                return _super.call(this) || this;
            }
            RewardUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("common.AwardRankIR", common.AwardRankIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/Reward");
            };
            return RewardUI;
        }(DialogExt));
        boss.RewardUI = RewardUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var boss;
    (function (boss) {
        var WorldBossUI = /** @class */ (function (_super) {
            __extends(WorldBossUI, _super);
            function WorldBossUI() {
                return _super.call(this) || this;
            }
            WorldBossUI.prototype.createChildren = function () {
                View.regComponent("game.BossRewardIR", game.BossRewardIR);
                View.regComponent("game.BossIR", game.BossIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("boss/WorldBoss");
            };
            return WorldBossUI;
        }(DialogExt));
        boss.WorldBossUI = WorldBossUI;
    })(boss = ui.boss || (ui.boss = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var AwardRankIRUI = /** @class */ (function (_super) {
            __extends(AwardRankIRUI, _super);
            function AwardRankIRUI() {
                return _super.call(this) || this;
            }
            AwardRankIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/AwardRankIR");
            };
            return AwardRankIRUI;
        }(View));
        box.AwardRankIRUI = AwardRankIRUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var BaoxiangBoxUI = /** @class */ (function (_super) {
            __extends(BaoxiangBoxUI, _super);
            function BaoxiangBoxUI() {
                return _super.call(this) || this;
            }
            BaoxiangBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/BaoxiangBox");
            };
            return BaoxiangBoxUI;
        }(View));
        box.BaoxiangBoxUI = BaoxiangBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var BuzhenBoxUI = /** @class */ (function (_super) {
            __extends(BuzhenBoxUI, _super);
            function BuzhenBoxUI() {
                return _super.call(this) || this;
            }
            BuzhenBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/BuzhenBox");
            };
            return BuzhenBoxUI;
        }(View));
        box.BuzhenBoxUI = BuzhenBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var BuzhenItemBoxUI = /** @class */ (function (_super) {
            __extends(BuzhenItemBoxUI, _super);
            function BuzhenItemBoxUI() {
                return _super.call(this) || this;
            }
            BuzhenItemBoxUI.prototype.createChildren = function () {
                View.regComponent("common.HeadBox", common.HeadBox);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/BuzhenItemBox");
            };
            return BuzhenItemBoxUI;
        }(View));
        box.BuzhenItemBoxUI = BuzhenItemBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var CommonRuleIRUI = /** @class */ (function (_super) {
            __extends(CommonRuleIRUI, _super);
            function CommonRuleIRUI() {
                return _super.call(this) || this;
            }
            CommonRuleIRUI.prototype.createChildren = function () {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/CommonRuleIR");
            };
            return CommonRuleIRUI;
        }(View));
        box.CommonRuleIRUI = CommonRuleIRUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var CostIRUI = /** @class */ (function (_super) {
            __extends(CostIRUI, _super);
            function CostIRUI() {
                return _super.call(this) || this;
            }
            CostIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/CostIR");
            };
            return CostIRUI;
        }(View));
        box.CostIRUI = CostIRUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var effItemBoxUI = /** @class */ (function (_super) {
            __extends(effItemBoxUI, _super);
            function effItemBoxUI() {
                return _super.call(this) || this;
            }
            effItemBoxUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/effItemBox");
            };
            return effItemBoxUI;
        }(DialogExt));
        box.effItemBoxUI = effItemBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var EquipItemBoxUI = /** @class */ (function (_super) {
            __extends(EquipItemBoxUI, _super);
            function EquipItemBoxUI() {
                return _super.call(this) || this;
            }
            EquipItemBoxUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/EquipItemBox");
            };
            return EquipItemBoxUI;
        }(View));
        box.EquipItemBoxUI = EquipItemBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var GodRaceAddUI = /** @class */ (function (_super) {
            __extends(GodRaceAddUI, _super);
            function GodRaceAddUI() {
                return _super.call(this) || this;
            }
            GodRaceAddUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/GodRaceAdd");
            };
            return GodRaceAddUI;
        }(View));
        box.GodRaceAddUI = GodRaceAddUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var HeadBoxUI = /** @class */ (function (_super) {
            __extends(HeadBoxUI, _super);
            function HeadBoxUI() {
                return _super.call(this) || this;
            }
            HeadBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/HeadBox");
            };
            return HeadBoxUI;
        }(View));
        box.HeadBoxUI = HeadBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var HeadBox2UI = /** @class */ (function (_super) {
            __extends(HeadBox2UI, _super);
            function HeadBox2UI() {
                return _super.call(this) || this;
            }
            HeadBox2UI.prototype.createChildren = function () {
                View.regComponent("common.HeadBox", common.HeadBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/HeadBox2");
            };
            return HeadBox2UI;
        }(View));
        box.HeadBox2UI = HeadBox2UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var HeadNameBoxUI = /** @class */ (function (_super) {
            __extends(HeadNameBoxUI, _super);
            function HeadNameBoxUI() {
                return _super.call(this) || this;
            }
            HeadNameBoxUI.prototype.createChildren = function () {
                View.regComponent("common.HeadBox", common.HeadBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/HeadNameBox");
            };
            return HeadNameBoxUI;
        }(View));
        box.HeadNameBoxUI = HeadNameBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var ItemBoxUI = /** @class */ (function (_super) {
            __extends(ItemBoxUI, _super);
            function ItemBoxUI() {
                return _super.call(this) || this;
            }
            ItemBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/ItemBox");
            };
            return ItemBoxUI;
        }(View));
        box.ItemBoxUI = ItemBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var ItemBox2UI = /** @class */ (function (_super) {
            __extends(ItemBox2UI, _super);
            function ItemBox2UI() {
                return _super.call(this) || this;
            }
            ItemBox2UI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/ItemBox2");
            };
            return ItemBox2UI;
        }(View));
        box.ItemBox2UI = ItemBox2UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var ItemBox21UI = /** @class */ (function (_super) {
            __extends(ItemBox21UI, _super);
            function ItemBox21UI() {
                return _super.call(this) || this;
            }
            ItemBox21UI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/ItemBox21");
            };
            return ItemBox21UI;
        }(View));
        box.ItemBox21UI = ItemBox21UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var ItemBox3UI = /** @class */ (function (_super) {
            __extends(ItemBox3UI, _super);
            function ItemBox3UI() {
                return _super.call(this) || this;
            }
            ItemBox3UI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/ItemBox3");
            };
            return ItemBox3UI;
        }(View));
        box.ItemBox3UI = ItemBox3UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var RaceBoxUI = /** @class */ (function (_super) {
            __extends(RaceBoxUI, _super);
            function RaceBoxUI() {
                return _super.call(this) || this;
            }
            RaceBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/RaceBox");
            };
            return RaceBoxUI;
        }(View));
        box.RaceBoxUI = RaceBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var RankIRUI = /** @class */ (function (_super) {
            __extends(RankIRUI, _super);
            function RankIRUI() {
                return _super.call(this) || this;
            }
            RankIRUI.prototype.createChildren = function () {
                View.regComponent("common.CommonRankIR", common.CommonRankIR);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/RankIR");
            };
            return RankIRUI;
        }(View));
        box.RankIRUI = RankIRUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var ResBoxUI = /** @class */ (function (_super) {
            __extends(ResBoxUI, _super);
            function ResBoxUI() {
                return _super.call(this) || this;
            }
            ResBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/ResBox");
            };
            return ResBoxUI;
        }(View));
        box.ResBoxUI = ResBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var SimpleItemBoxUI = /** @class */ (function (_super) {
            __extends(SimpleItemBoxUI, _super);
            function SimpleItemBoxUI() {
                return _super.call(this) || this;
            }
            SimpleItemBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/SimpleItemBox");
            };
            return SimpleItemBoxUI;
        }(View));
        box.SimpleItemBoxUI = SimpleItemBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var SkillBoxUI = /** @class */ (function (_super) {
            __extends(SkillBoxUI, _super);
            function SkillBoxUI() {
                return _super.call(this) || this;
            }
            SkillBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/SkillBox");
            };
            return SkillBoxUI;
        }(View));
        box.SkillBoxUI = SkillBoxUI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var TabIR1UI = /** @class */ (function (_super) {
            __extends(TabIR1UI, _super);
            function TabIR1UI() {
                return _super.call(this) || this;
            }
            TabIR1UI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/TabIR1");
            };
            return TabIR1UI;
        }(DialogExt));
        box.TabIR1UI = TabIR1UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var TabIR2UI = /** @class */ (function (_super) {
            __extends(TabIR2UI, _super);
            function TabIR2UI() {
                return _super.call(this) || this;
            }
            TabIR2UI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/TabIR2");
            };
            return TabIR2UI;
        }(View));
        box.TabIR2UI = TabIR2UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var TabIR3UI = /** @class */ (function (_super) {
            __extends(TabIR3UI, _super);
            function TabIR3UI() {
                return _super.call(this) || this;
            }
            TabIR3UI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/TabIR3");
            };
            return TabIR3UI;
        }(View));
        box.TabIR3UI = TabIR3UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var TabIR4UI = /** @class */ (function (_super) {
            __extends(TabIR4UI, _super);
            function TabIR4UI() {
                return _super.call(this) || this;
            }
            TabIR4UI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("box/TabIR4");
            };
            return TabIR4UI;
        }(View));
        box.TabIR4UI = TabIR4UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var box;
    (function (box) {
        var UserHeadBox1UI = /** @class */ (function (_super) {
            __extends(UserHeadBox1UI, _super);
            function UserHeadBox1UI() {
                return _super.call(this) || this;
            }
            UserHeadBox1UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("box/UserHeadBox1");
            };
            return UserHeadBox1UI;
        }(View));
        box.UserHeadBox1UI = UserHeadBox1UI;
    })(box = ui.box || (ui.box = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var ChatUI = /** @class */ (function (_super) {
            __extends(ChatUI, _super);
            function ChatUI() {
                return _super.call(this) || this;
            }
            ChatUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.FaceView", game.FaceView);
                View.regComponent("game.ChatQuickView", game.ChatQuickView);
                View.regComponent("game.ChatTabIR", game.ChatTabIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/Chat");
            };
            return ChatUI;
        }(DialogExt));
        chat.ChatUI = ChatUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var ChatIRUI = /** @class */ (function (_super) {
            __extends(ChatIRUI, _super);
            function ChatIRUI() {
                return _super.call(this) || this;
            }
            ChatIRUI.prototype.createChildren = function () {
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/ChatIR");
            };
            return ChatIRUI;
        }(View));
        chat.ChatIRUI = ChatIRUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var ChatQuickUI = /** @class */ (function (_super) {
            __extends(ChatQuickUI, _super);
            function ChatQuickUI() {
                return _super.call(this) || this;
            }
            ChatQuickUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/ChatQuick");
            };
            return ChatQuickUI;
        }(View));
        chat.ChatQuickUI = ChatQuickUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var ChatTabIRUI = /** @class */ (function (_super) {
            __extends(ChatTabIRUI, _super);
            function ChatTabIRUI() {
                return _super.call(this) || this;
            }
            ChatTabIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/ChatTabIR");
            };
            return ChatTabIRUI;
        }(View));
        chat.ChatTabIRUI = ChatTabIRUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var FaceUI = /** @class */ (function (_super) {
            __extends(FaceUI, _super);
            function FaceUI() {
                return _super.call(this) || this;
            }
            FaceUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/Face");
            };
            return FaceUI;
        }(View));
        chat.FaceUI = FaceUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var PrivateChatUI = /** @class */ (function (_super) {
            __extends(PrivateChatUI, _super);
            function PrivateChatUI() {
                return _super.call(this) || this;
            }
            PrivateChatUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.PrivateChatIR", game.PrivateChatIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.FaceView", game.FaceView);
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/PrivateChat");
            };
            return PrivateChatUI;
        }(DialogExt));
        chat.PrivateChatUI = PrivateChatUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var chat;
    (function (chat) {
        var PrivateChatIRUI = /** @class */ (function (_super) {
            __extends(PrivateChatIRUI, _super);
            function PrivateChatIRUI() {
                return _super.call(this) || this;
            }
            PrivateChatIRUI.prototype.createChildren = function () {
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("chat/PrivateChatIR");
            };
            return PrivateChatIRUI;
        }(View));
        chat.PrivateChatIRUI = PrivateChatIRUI;
    })(chat = ui.chat || (ui.chat = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var AlertBoxUI = /** @class */ (function (_super) {
            __extends(AlertBoxUI, _super);
            function AlertBoxUI() {
                return _super.call(this) || this;
            }
            AlertBoxUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/AlertBox");
            };
            return AlertBoxUI;
        }(DialogExt));
        component.AlertBoxUI = AlertBoxUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var BuyBattleCountUI = /** @class */ (function (_super) {
            __extends(BuyBattleCountUI, _super);
            function BuyBattleCountUI() {
                return _super.call(this) || this;
            }
            BuyBattleCountUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/BuyBattleCount");
            };
            return BuyBattleCountUI;
        }(DialogExt));
        component.BuyBattleCountUI = BuyBattleCountUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CamraUI = /** @class */ (function (_super) {
            __extends(CamraUI, _super);
            function CamraUI() {
                return _super.call(this) || this;
            }
            CamraUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/Camra");
            };
            return CamraUI;
        }(Dialog));
        component.CamraUI = CamraUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ChannelBoxUI = /** @class */ (function (_super) {
            __extends(ChannelBoxUI, _super);
            function ChannelBoxUI() {
                return _super.call(this) || this;
            }
            ChannelBoxUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/ChannelBox");
            };
            return ChannelBoxUI;
        }(DialogExt));
        component.ChannelBoxUI = ChannelBoxUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ChushouUI = /** @class */ (function (_super) {
            __extends(ChushouUI, _super);
            function ChushouUI() {
                return _super.call(this) || this;
            }
            ChushouUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/Chushou");
            };
            return ChushouUI;
        }(DialogExt));
        component.ChushouUI = ChushouUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ComboboxUI = /** @class */ (function (_super) {
            __extends(ComboboxUI, _super);
            function ComboboxUI() {
                return _super.call(this) || this;
            }
            ComboboxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/Combobox");
            };
            return ComboboxUI;
        }(View));
        component.ComboboxUI = ComboboxUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonFightTitleUI = /** @class */ (function (_super) {
            __extends(CommonFightTitleUI, _super);
            function CommonFightTitleUI() {
                return _super.call(this) || this;
            }
            CommonFightTitleUI.prototype.createChildren = function () {
                View.regComponent("common.DialogOpenEff", common.DialogOpenEff);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonFightTitle");
            };
            return CommonFightTitleUI;
        }(DialogExt));
        component.CommonFightTitleUI = CommonFightTitleUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonLevelUpTitleUI = /** @class */ (function (_super) {
            __extends(CommonLevelUpTitleUI, _super);
            function CommonLevelUpTitleUI() {
                return _super.call(this) || this;
            }
            CommonLevelUpTitleUI.prototype.createChildren = function () {
                View.regComponent("common.DialogOpenEff", common.DialogOpenEff);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonLevelUpTitle");
            };
            return CommonLevelUpTitleUI;
        }(DialogExt));
        component.CommonLevelUpTitleUI = CommonLevelUpTitleUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonRankItemUI = /** @class */ (function (_super) {
            __extends(CommonRankItemUI, _super);
            function CommonRankItemUI() {
                return _super.call(this) || this;
            }
            CommonRankItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonRankItem");
            };
            return CommonRankItemUI;
        }(View));
        component.CommonRankItemUI = CommonRankItemUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonRankItemRendeerUI = /** @class */ (function (_super) {
            __extends(CommonRankItemRendeerUI, _super);
            function CommonRankItemRendeerUI() {
                return _super.call(this) || this;
            }
            CommonRankItemRendeerUI.prototype.createChildren = function () {
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonRankItemRendeer");
            };
            return CommonRankItemRendeerUI;
        }(View));
        component.CommonRankItemRendeerUI = CommonRankItemRendeerUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonRewardBoxUI = /** @class */ (function (_super) {
            __extends(CommonRewardBoxUI, _super);
            function CommonRewardBoxUI() {
                return _super.call(this) || this;
            }
            CommonRewardBoxUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonRewardBox");
            };
            return CommonRewardBoxUI;
        }(DialogExt));
        component.CommonRewardBoxUI = CommonRewardBoxUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonRuleUI = /** @class */ (function (_super) {
            __extends(CommonRuleUI, _super);
            function CommonRuleUI() {
                return _super.call(this) || this;
            }
            CommonRuleUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonRule");
            };
            return CommonRuleUI;
        }(DialogExt));
        component.CommonRuleUI = CommonRuleUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitleUI = /** @class */ (function (_super) {
            __extends(CommonTitleUI, _super);
            function CommonTitleUI() {
                return _super.call(this) || this;
            }
            CommonTitleUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle");
            };
            return CommonTitleUI;
        }(DialogExt));
        component.CommonTitleUI = CommonTitleUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitle2UI = /** @class */ (function (_super) {
            __extends(CommonTitle2UI, _super);
            function CommonTitle2UI() {
                return _super.call(this) || this;
            }
            CommonTitle2UI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle2");
            };
            return CommonTitle2UI;
        }(View));
        component.CommonTitle2UI = CommonTitle2UI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitle4UI = /** @class */ (function (_super) {
            __extends(CommonTitle4UI, _super);
            function CommonTitle4UI() {
                return _super.call(this) || this;
            }
            CommonTitle4UI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle4");
            };
            return CommonTitle4UI;
        }(DialogExt));
        component.CommonTitle4UI = CommonTitle4UI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitle5UI = /** @class */ (function (_super) {
            __extends(CommonTitle5UI, _super);
            function CommonTitle5UI() {
                return _super.call(this) || this;
            }
            CommonTitle5UI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle5");
            };
            return CommonTitle5UI;
        }(DialogExt));
        component.CommonTitle5UI = CommonTitle5UI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitle6UI = /** @class */ (function (_super) {
            __extends(CommonTitle6UI, _super);
            function CommonTitle6UI() {
                return _super.call(this) || this;
            }
            CommonTitle6UI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle6");
            };
            return CommonTitle6UI;
        }(DialogExt));
        component.CommonTitle6UI = CommonTitle6UI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitle7UI = /** @class */ (function (_super) {
            __extends(CommonTitle7UI, _super);
            function CommonTitle7UI() {
                return _super.call(this) || this;
            }
            CommonTitle7UI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle7");
            };
            return CommonTitle7UI;
        }(DialogExt));
        component.CommonTitle7UI = CommonTitle7UI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var CommonTitle9UI = /** @class */ (function (_super) {
            __extends(CommonTitle9UI, _super);
            function CommonTitle9UI() {
                return _super.call(this) || this;
            }
            CommonTitle9UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/CommonTitle9");
            };
            return CommonTitle9UI;
        }(DialogExt));
        component.CommonTitle9UI = CommonTitle9UI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ConsumeAlertUI = /** @class */ (function (_super) {
            __extends(ConsumeAlertUI, _super);
            function ConsumeAlertUI() {
                return _super.call(this) || this;
            }
            ConsumeAlertUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/ConsumeAlert");
            };
            return ConsumeAlertUI;
        }(DialogExt));
        component.ConsumeAlertUI = ConsumeAlertUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var GodStarInfoUI = /** @class */ (function (_super) {
            __extends(GodStarInfoUI, _super);
            function GodStarInfoUI() {
                return _super.call(this) || this;
            }
            GodStarInfoUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/GodStarInfo");
            };
            return GodStarInfoUI;
        }(View));
        component.GodStarInfoUI = GodStarInfoUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ItemTipUI = /** @class */ (function (_super) {
            __extends(ItemTipUI, _super);
            function ItemTipUI() {
                return _super.call(this) || this;
            }
            ItemTipUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/ItemTip");
            };
            return ItemTipUI;
        }(DialogExt));
        component.ItemTipUI = ItemTipUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var LevelUpUI = /** @class */ (function (_super) {
            __extends(LevelUpUI, _super);
            function LevelUpUI() {
                return _super.call(this) || this;
            }
            LevelUpUI.prototype.createChildren = function () {
                View.regComponent("common.CommonLevelUpTitleView", common.CommonLevelUpTitleView);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/LevelUp");
            };
            return LevelUpUI;
        }(DialogExt));
        component.LevelUpUI = LevelUpUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ManyItemsTipUI = /** @class */ (function (_super) {
            __extends(ManyItemsTipUI, _super);
            function ManyItemsTipUI() {
                return _super.call(this) || this;
            }
            ManyItemsTipUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/ManyItemsTip");
            };
            return ManyItemsTipUI;
        }(DialogExt));
        component.ManyItemsTipUI = ManyItemsTipUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var PlayerInfoUI = /** @class */ (function (_super) {
            __extends(PlayerInfoUI, _super);
            function PlayerInfoUI() {
                return _super.call(this) || this;
            }
            PlayerInfoUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                View.regComponent("common.CommonLineupView", common.CommonLineupView);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/PlayerInfo");
            };
            return PlayerInfoUI;
        }(DialogExt));
        component.PlayerInfoUI = PlayerInfoUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var PlayerLinuepInfoUI = /** @class */ (function (_super) {
            __extends(PlayerLinuepInfoUI, _super);
            function PlayerLinuepInfoUI() {
                return _super.call(this) || this;
            }
            PlayerLinuepInfoUI.prototype.createChildren = function () {
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                View.regComponent("common.CommonLineupView", common.CommonLineupView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/PlayerLinuepInfo");
            };
            return PlayerLinuepInfoUI;
        }(DialogExt));
        component.PlayerLinuepInfoUI = PlayerLinuepInfoUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var RedPointUI = /** @class */ (function (_super) {
            __extends(RedPointUI, _super);
            function RedPointUI() {
                return _super.call(this) || this;
            }
            RedPointUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/RedPoint");
            };
            return RedPointUI;
        }(View));
        component.RedPointUI = RedPointUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var RedPointCopyUI = /** @class */ (function (_super) {
            __extends(RedPointCopyUI, _super);
            function RedPointCopyUI() {
                return _super.call(this) || this;
            }
            RedPointCopyUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/RedPointCopy");
            };
            return RedPointCopyUI;
        }(View));
        component.RedPointCopyUI = RedPointCopyUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var SkillTipUI = /** @class */ (function (_super) {
            __extends(SkillTipUI, _super);
            function SkillTipUI() {
                return _super.call(this) || this;
            }
            SkillTipUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/SkillTip");
            };
            return SkillTipUI;
        }(DialogExt));
        component.SkillTipUI = SkillTipUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var SoundEffectUI = /** @class */ (function (_super) {
            __extends(SoundEffectUI, _super);
            function SoundEffectUI() {
                return _super.call(this) || this;
            }
            SoundEffectUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/SoundEffect");
            };
            return SoundEffectUI;
        }(View));
        component.SoundEffectUI = SoundEffectUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var StarListUI = /** @class */ (function (_super) {
            __extends(StarListUI, _super);
            function StarListUI() {
                return _super.call(this) || this;
            }
            StarListUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/StarList");
            };
            return StarListUI;
        }(DialogExt));
        component.StarListUI = StarListUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var TishiUI = /** @class */ (function (_super) {
            __extends(TishiUI, _super);
            function TishiUI() {
                return _super.call(this) || this;
            }
            TishiUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("component/Tishi");
            };
            return TishiUI;
        }(DialogExt));
        component.TishiUI = TishiUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var ToastViewUI = /** @class */ (function (_super) {
            __extends(ToastViewUI, _super);
            function ToastViewUI() {
                return _super.call(this) || this;
            }
            ToastViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/ToastView");
            };
            return ToastViewUI;
        }(DialogExt));
        component.ToastViewUI = ToastViewUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var component;
    (function (component) {
        var XianshiBaoxiangUI = /** @class */ (function (_super) {
            __extends(XianshiBaoxiangUI, _super);
            function XianshiBaoxiangUI() {
                return _super.call(this) || this;
            }
            XianshiBaoxiangUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("component/XianshiBaoxiang");
            };
            return XianshiBaoxiangUI;
        }(DialogExt));
        component.XianshiBaoxiangUI = XianshiBaoxiangUI;
    })(component = ui.component || (ui.component = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var biYanLiIRUI = /** @class */ (function (_super) {
            __extends(biYanLiIRUI, _super);
            function biYanLiIRUI() {
                return _super.call(this) || this;
            }
            biYanLiIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/biYanLiIR");
            };
            return biYanLiIRUI;
        }(View));
        dafuweng.biYanLiIRUI = biYanLiIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var biYanLiViewUI = /** @class */ (function (_super) {
            __extends(biYanLiViewUI, _super);
            function biYanLiViewUI() {
                return _super.call(this) || this;
            }
            biYanLiViewUI.prototype.createChildren = function () {
                View.regComponent("game.bowieIR", game.bowieIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/biYanLiView");
            };
            return biYanLiViewUI;
        }(DialogExt));
        dafuweng.biYanLiViewUI = biYanLiViewUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var boxIRUI = /** @class */ (function (_super) {
            __extends(boxIRUI, _super);
            function boxIRUI() {
                return _super.call(this) || this;
            }
            boxIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/boxIR");
            };
            return boxIRUI;
        }(View));
        dafuweng.boxIRUI = boxIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var caiDaXiaoViewUI = /** @class */ (function (_super) {
            __extends(caiDaXiaoViewUI, _super);
            function caiDaXiaoViewUI() {
                return _super.call(this) || this;
            }
            caiDaXiaoViewUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/caiDaXiaoView");
            };
            return caiDaXiaoViewUI;
        }(DialogExt));
        dafuweng.caiDaXiaoViewUI = caiDaXiaoViewUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var caiQuanViewUI = /** @class */ (function (_super) {
            __extends(caiQuanViewUI, _super);
            function caiQuanViewUI() {
                return _super.call(this) || this;
            }
            caiQuanViewUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/caiQuanView");
            };
            return caiQuanViewUI;
        }(DialogExt));
        dafuweng.caiQuanViewUI = caiQuanViewUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var dafuwengViewUI = /** @class */ (function (_super) {
            __extends(dafuwengViewUI, _super);
            function dafuwengViewUI() {
                return _super.call(this) || this;
            }
            dafuwengViewUI.prototype.createChildren = function () {
                View.regComponent("game.SysTopResIR", game.SysTopResIR);
                View.regComponent("game.QiyuBtnView", game.QiyuBtnView);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/dafuwengView");
            };
            return dafuwengViewUI;
        }(DialogExt));
        dafuweng.dafuwengViewUI = dafuwengViewUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var diamondIRUI = /** @class */ (function (_super) {
            __extends(diamondIRUI, _super);
            function diamondIRUI() {
                return _super.call(this) || this;
            }
            diamondIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/diamondIR");
            };
            return diamondIRUI;
        }(View));
        dafuweng.diamondIRUI = diamondIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var goAndOutIRUI = /** @class */ (function (_super) {
            __extends(goAndOutIRUI, _super);
            function goAndOutIRUI() {
                return _super.call(this) || this;
            }
            goAndOutIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/goAndOutIR");
            };
            return goAndOutIRUI;
        }(View));
        dafuweng.goAndOutIRUI = goAndOutIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var propIRUI = /** @class */ (function (_super) {
            __extends(propIRUI, _super);
            function propIRUI() {
                return _super.call(this) || this;
            }
            propIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/propIR");
            };
            return propIRUI;
        }(View));
        dafuweng.propIRUI = propIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var QiyuAnimUI = /** @class */ (function (_super) {
            __extends(QiyuAnimUI, _super);
            function QiyuAnimUI() {
                return _super.call(this) || this;
            }
            QiyuAnimUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/QiyuAnim");
            };
            return QiyuAnimUI;
        }(View));
        dafuweng.QiyuAnimUI = QiyuAnimUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var QiyuBtnUI = /** @class */ (function (_super) {
            __extends(QiyuBtnUI, _super);
            function QiyuBtnUI() {
                return _super.call(this) || this;
            }
            QiyuBtnUI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/QiyuBtn");
            };
            return QiyuBtnUI;
        }(View));
        dafuweng.QiyuBtnUI = QiyuBtnUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var QiyuResultUI = /** @class */ (function (_super) {
            __extends(QiyuResultUI, _super);
            function QiyuResultUI() {
                return _super.call(this) || this;
            }
            QiyuResultUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/QiyuResult");
            };
            return QiyuResultUI;
        }(DialogExt));
        dafuweng.QiyuResultUI = QiyuResultUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var QiyuTabIRUI = /** @class */ (function (_super) {
            __extends(QiyuTabIRUI, _super);
            function QiyuTabIRUI() {
                return _super.call(this) || this;
            }
            QiyuTabIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/QiyuTabIR");
            };
            return QiyuTabIRUI;
        }(View));
        dafuweng.QiyuTabIRUI = QiyuTabIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var QiyuViewUI = /** @class */ (function (_super) {
            __extends(QiyuViewUI, _super);
            function QiyuViewUI() {
                return _super.call(this) || this;
            }
            QiyuViewUI.prototype.createChildren = function () {
                View.regComponent("game.QiyuTabIR", game.QiyuTabIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/QiyuView");
            };
            return QiyuViewUI;
        }(DialogExt));
        dafuweng.QiyuViewUI = QiyuViewUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var questionIRUI = /** @class */ (function (_super) {
            __extends(questionIRUI, _super);
            function questionIRUI() {
                return _super.call(this) || this;
            }
            questionIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/questionIR");
            };
            return questionIRUI;
        }(View));
        dafuweng.questionIRUI = questionIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var questionPanelUI = /** @class */ (function (_super) {
            __extends(questionPanelUI, _super);
            function questionPanelUI() {
                return _super.call(this) || this;
            }
            questionPanelUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/questionPanel");
            };
            return questionPanelUI;
        }(DialogExt));
        dafuweng.questionPanelUI = questionPanelUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var startIRUI = /** @class */ (function (_super) {
            __extends(startIRUI, _super);
            function startIRUI() {
                return _super.call(this) || this;
            }
            startIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/startIR");
            };
            return startIRUI;
        }(View));
        dafuweng.startIRUI = startIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dafuweng;
    (function (dafuweng) {
        var yanliBoxIRUI = /** @class */ (function (_super) {
            __extends(yanliBoxIRUI, _super);
            function yanliBoxIRUI() {
                return _super.call(this) || this;
            }
            yanliBoxIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("dafuweng/yanliBoxIR");
            };
            return yanliBoxIRUI;
        }(View));
        dafuweng.yanliBoxIRUI = yanliBoxIRUI;
    })(dafuweng = ui.dafuweng || (ui.dafuweng = {}));
})(ui || (ui = {}));
(function (ui) {
    var dailycopy;
    (function (dailycopy) {
        var DailyCopyUI = /** @class */ (function (_super) {
            __extends(DailyCopyUI, _super);
            function DailyCopyUI() {
                return _super.call(this) || this;
            }
            DailyCopyUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.DailyCopyIR", game.DailyCopyIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("dailycopy/DailyCopy");
            };
            return DailyCopyUI;
        }(DialogExt));
        dailycopy.DailyCopyUI = DailyCopyUI;
    })(dailycopy = ui.dailycopy || (ui.dailycopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var dailycopy;
    (function (dailycopy) {
        var DailyCopyBuyUI = /** @class */ (function (_super) {
            __extends(DailyCopyBuyUI, _super);
            function DailyCopyBuyUI() {
                return _super.call(this) || this;
            }
            DailyCopyBuyUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("dailycopy/DailyCopyBuy");
            };
            return DailyCopyBuyUI;
        }(DialogExt));
        dailycopy.DailyCopyBuyUI = DailyCopyBuyUI;
    })(dailycopy = ui.dailycopy || (ui.dailycopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var dailycopy;
    (function (dailycopy) {
        var DailyCopyIRUI = /** @class */ (function (_super) {
            __extends(DailyCopyIRUI, _super);
            function DailyCopyIRUI() {
                return _super.call(this) || this;
            }
            DailyCopyIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("dailycopy/DailyCopyIR");
            };
            return DailyCopyIRUI;
        }(View));
        dailycopy.DailyCopyIRUI = DailyCopyIRUI;
    })(dailycopy = ui.dailycopy || (ui.dailycopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var dailycopy;
    (function (dailycopy) {
        var DailyCopyMainUI = /** @class */ (function (_super) {
            __extends(DailyCopyMainUI, _super);
            function DailyCopyMainUI() {
                return _super.call(this) || this;
            }
            DailyCopyMainUI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("dailycopy/DailyCopyMain");
            };
            return DailyCopyMainUI;
        }(DialogExt));
        dailycopy.DailyCopyMainUI = DailyCopyMainUI;
    })(dailycopy = ui.dailycopy || (ui.dailycopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipChangeUI = /** @class */ (function (_super) {
            __extends(EquipChangeUI, _super);
            function EquipChangeUI() {
                return _super.call(this) || this;
            }
            EquipChangeUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipChange");
            };
            return EquipChangeUI;
        }(DialogExt));
        equip.EquipChangeUI = EquipChangeUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipLvupUI = /** @class */ (function (_super) {
            __extends(EquipLvupUI, _super);
            function EquipLvupUI() {
                return _super.call(this) || this;
            }
            EquipLvupUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipLvup");
            };
            return EquipLvupUI;
        }(DialogExt));
        equip.EquipLvupUI = EquipLvupUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipMasterUI = /** @class */ (function (_super) {
            __extends(EquipMasterUI, _super);
            function EquipMasterUI() {
                return _super.call(this) || this;
            }
            EquipMasterUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.MasterItemRender", game.MasterItemRender);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipMaster");
            };
            return EquipMasterUI;
        }(DialogExt));
        equip.EquipMasterUI = EquipMasterUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipRecycleUI = /** @class */ (function (_super) {
            __extends(EquipRecycleUI, _super);
            function EquipRecycleUI() {
                return _super.call(this) || this;
            }
            EquipRecycleUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipRecycle");
            };
            return EquipRecycleUI;
        }(DialogExt));
        equip.EquipRecycleUI = EquipRecycleUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipRefineUI = /** @class */ (function (_super) {
            __extends(EquipRefineUI, _super);
            function EquipRefineUI() {
                return _super.call(this) || this;
            }
            EquipRefineUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.PropretyIR", game.PropretyIR);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.CostIR", common.CostIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipRefine");
            };
            return EquipRefineUI;
        }(DialogExt));
        equip.EquipRefineUI = EquipRefineUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipStrengthenUI = /** @class */ (function (_super) {
            __extends(EquipStrengthenUI, _super);
            function EquipStrengthenUI() {
                return _super.call(this) || this;
            }
            EquipStrengthenUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("game.strengthAttriRender", game.strengthAttriRender);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.CostIR", common.CostIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipStrengthen");
            };
            return EquipStrengthenUI;
        }(DialogExt));
        equip.EquipStrengthenUI = EquipStrengthenUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipSuitUI = /** @class */ (function (_super) {
            __extends(EquipSuitUI, _super);
            function EquipSuitUI() {
                return _super.call(this) || this;
            }
            EquipSuitUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipSuit");
            };
            return EquipSuitUI;
        }(DialogExt));
        equip.EquipSuitUI = EquipSuitUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipSuitLvupUI = /** @class */ (function (_super) {
            __extends(EquipSuitLvupUI, _super);
            function EquipSuitLvupUI() {
                return _super.call(this) || this;
            }
            EquipSuitLvupUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipSuitLvup");
            };
            return EquipSuitLvupUI;
        }(DialogExt));
        equip.EquipSuitLvupUI = EquipSuitLvupUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipTipsUI = /** @class */ (function (_super) {
            __extends(EquipTipsUI, _super);
            function EquipTipsUI() {
                return _super.call(this) || this;
            }
            EquipTipsUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipTips");
            };
            return EquipTipsUI;
        }(DialogExt));
        equip.EquipTipsUI = EquipTipsUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var EquipViewUI = /** @class */ (function (_super) {
            __extends(EquipViewUI, _super);
            function EquipViewUI() {
                return _super.call(this) || this;
            }
            EquipViewUI.prototype.createChildren = function () {
                View.regComponent("game.TabEquip", game.TabEquip);
                View.regComponent("game.TabBaoshiNew", game.TabBaoshiNew);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.EquipGodIR", game.EquipGodIR);
                View.regComponent("game.godTabIR", game.godTabIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/EquipView");
            };
            return EquipViewUI;
        }(DialogExt));
        equip.EquipViewUI = EquipViewUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var BaoShiIRUI = /** @class */ (function (_super) {
                __extends(BaoShiIRUI, _super);
                function BaoShiIRUI() {
                    return _super.call(this) || this;
                }
                BaoShiIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/BaoShiIR");
                };
                return BaoShiIRUI;
            }(View));
            gemstone.BaoShiIRUI = BaoShiIRUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var EquipBaoshiIRUI = /** @class */ (function (_super) {
                __extends(EquipBaoshiIRUI, _super);
                function EquipBaoshiIRUI() {
                    return _super.call(this) || this;
                }
                EquipBaoshiIRUI.prototype.createChildren = function () {
                    View.regComponent("game.EquipItemIR", game.EquipItemIR);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/EquipBaoshiIR");
                };
                return EquipBaoshiIRUI;
            }(View));
            gemstone.EquipBaoshiIRUI = EquipBaoshiIRUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var GemstoneCompoundUI = /** @class */ (function (_super) {
                __extends(GemstoneCompoundUI, _super);
                function GemstoneCompoundUI() {
                    return _super.call(this) || this;
                }
                GemstoneCompoundUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.Combobox", common.Combobox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/GemstoneCompound");
                };
                return GemstoneCompoundUI;
            }(DialogExt));
            gemstone.GemstoneCompoundUI = GemstoneCompoundUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var GemstoneReplaceUI = /** @class */ (function (_super) {
                __extends(GemstoneReplaceUI, _super);
                function GemstoneReplaceUI() {
                    return _super.call(this) || this;
                }
                GemstoneReplaceUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/GemstoneReplace");
                };
                return GemstoneReplaceUI;
            }(DialogExt));
            gemstone.GemstoneReplaceUI = GemstoneReplaceUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var GemstoneTipsUI = /** @class */ (function (_super) {
                __extends(GemstoneTipsUI, _super);
                function GemstoneTipsUI() {
                    return _super.call(this) || this;
                }
                GemstoneTipsUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/GemstoneTips");
                };
                return GemstoneTipsUI;
            }(DialogExt));
            gemstone.GemstoneTipsUI = GemstoneTipsUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var SingleCompoundUI = /** @class */ (function (_super) {
                __extends(SingleCompoundUI, _super);
                function SingleCompoundUI() {
                    return _super.call(this) || this;
                }
                SingleCompoundUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/SingleCompound");
                };
                return SingleCompoundUI;
            }(DialogExt));
            gemstone.SingleCompoundUI = SingleCompoundUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var gemstone;
        (function (gemstone) {
            var TabBaoshiNewUI = /** @class */ (function (_super) {
                __extends(TabBaoshiNewUI, _super);
                function TabBaoshiNewUI() {
                    return _super.call(this) || this;
                }
                TabBaoshiNewUI.prototype.createChildren = function () {
                    View.regComponent("game.EquipBaoshiIR", game.EquipBaoshiIR);
                    View.regComponent("game.BaoshiIR", game.BaoshiIR);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/gemstone/TabBaoshiNew");
                };
                return TabBaoshiNewUI;
            }(View));
            gemstone.TabBaoshiNewUI = TabBaoshiNewUI;
        })(gemstone = equip.gemstone || (equip.gemstone = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var JumpViewUI = /** @class */ (function (_super) {
            __extends(JumpViewUI, _super);
            function JumpViewUI() {
                return _super.call(this) || this;
            }
            JumpViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.GetItemRender", game.GetItemRender);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/JumpView");
            };
            return JumpViewUI;
        }(DialogExt));
        equip.JumpViewUI = JumpViewUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var MasterRenderUI = /** @class */ (function (_super) {
            __extends(MasterRenderUI, _super);
            function MasterRenderUI() {
                return _super.call(this) || this;
            }
            MasterRenderUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("equip/MasterRender");
            };
            return MasterRenderUI;
        }(View));
        equip.MasterRenderUI = MasterRenderUI;
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var render;
        (function (render) {
            var EquipGodIRUI = /** @class */ (function (_super) {
                __extends(EquipGodIRUI, _super);
                function EquipGodIRUI() {
                    return _super.call(this) || this;
                }
                EquipGodIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.HeadBox", common.HeadBox);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/render/EquipGodIR");
                };
                return EquipGodIRUI;
            }(View));
            render.EquipGodIRUI = EquipGodIRUI;
        })(render = equip.render || (equip.render = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var equip;
    (function (equip) {
        var tab;
        (function (tab) {
            var TabEquipUI = /** @class */ (function (_super) {
                __extends(TabEquipUI, _super);
                function TabEquipUI() {
                    return _super.call(this) || this;
                }
                TabEquipUI.prototype.createChildren = function () {
                    View.regComponent("game.EquipItemIR", game.EquipItemIR);
                    View.regComponent("ui.god.render.AttrBoxUI", ui.god.render.AttrBoxUI);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.CostIR", common.CostIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("equip/tab/TabEquip");
                };
                return TabEquipUI;
            }(View));
            tab.TabEquipUI = TabEquipUI;
        })(tab = equip.tab || (equip.tab = {}));
    })(equip = ui.equip || (ui.equip = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var CaravanInfoUI = /** @class */ (function (_super) {
            __extends(CaravanInfoUI, _super);
            function CaravanInfoUI() {
                return _super.call(this) || this;
            }
            CaravanInfoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.HeadBox2", common.HeadBox2);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("escort/CaravanInfo");
            };
            return CaravanInfoUI;
        }(DialogExt));
        escort.CaravanInfoUI = CaravanInfoUI;
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var EscortUI = /** @class */ (function (_super) {
            __extends(EscortUI, _super);
            function EscortUI() {
                return _super.call(this) || this;
            }
            EscortUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.EscortIR", game.EscortIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("escort/Escort");
            };
            return EscortUI;
        }(DialogExt));
        escort.EscortUI = EscortUI;
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var EscortMainUI = /** @class */ (function (_super) {
            __extends(EscortMainUI, _super);
            function EscortMainUI() {
                return _super.call(this) || this;
            }
            EscortMainUI.prototype.createChildren = function () {
                View.regComponent("game.EscortCircleIR", game.EscortCircleIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("escort/EscortMain");
            };
            return EscortMainUI;
        }(DialogExt));
        escort.EscortMainUI = EscortMainUI;
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var EscortRewardUI = /** @class */ (function (_super) {
            __extends(EscortRewardUI, _super);
            function EscortRewardUI() {
                return _super.call(this) || this;
            }
            EscortRewardUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle7View", common.CommonTitle7View);
                View.regComponent("game.EscortCircleIR", game.EscortCircleIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("escort/EscortReward");
            };
            return EscortRewardUI;
        }(DialogExt));
        escort.EscortRewardUI = EscortRewardUI;
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var itemRender;
        (function (itemRender) {
            var CaravanIRenderUI = /** @class */ (function (_super) {
                __extends(CaravanIRenderUI, _super);
                function CaravanIRenderUI() {
                    return _super.call(this) || this;
                }
                CaravanIRenderUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("escort/itemRender/CaravanIRender");
                };
                return CaravanIRenderUI;
            }(View));
            itemRender.CaravanIRenderUI = CaravanIRenderUI;
        })(itemRender = escort.itemRender || (escort.itemRender = {}));
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var itemRender;
        (function (itemRender) {
            var EscortCircleIRUI = /** @class */ (function (_super) {
                __extends(EscortCircleIRUI, _super);
                function EscortCircleIRUI() {
                    return _super.call(this) || this;
                }
                EscortCircleIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("escort/itemRender/EscortCircleIR");
                };
                return EscortCircleIRUI;
            }(View));
            itemRender.EscortCircleIRUI = EscortCircleIRUI;
        })(itemRender = escort.itemRender || (escort.itemRender = {}));
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var itemRender;
        (function (itemRender) {
            var EscortIRenderUI = /** @class */ (function (_super) {
                __extends(EscortIRenderUI, _super);
                function EscortIRenderUI() {
                    return _super.call(this) || this;
                }
                EscortIRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("escort/itemRender/EscortIRender");
                };
                return EscortIRenderUI;
            }(View));
            itemRender.EscortIRenderUI = EscortIRenderUI;
        })(itemRender = escort.itemRender || (escort.itemRender = {}));
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var itemRender;
        (function (itemRender) {
            var RobRecordIRenderUI = /** @class */ (function (_super) {
                __extends(RobRecordIRenderUI, _super);
                function RobRecordIRenderUI() {
                    return _super.call(this) || this;
                }
                RobRecordIRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("escort/itemRender/RobRecordIRender");
                };
                return RobRecordIRenderUI;
            }(View));
            itemRender.RobRecordIRenderUI = RobRecordIRenderUI;
        })(itemRender = escort.itemRender || (escort.itemRender = {}));
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var escort;
    (function (escort) {
        var RobbedRecordUI = /** @class */ (function (_super) {
            __extends(RobbedRecordUI, _super);
            function RobbedRecordUI() {
                return _super.call(this) || this;
            }
            RobbedRecordUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle2View", common.CommonTitle2View);
                _super.prototype.createChildren.call(this);
                this.loadUI("escort/RobbedRecord");
            };
            return RobbedRecordUI;
        }(DialogExt));
        escort.RobbedRecordUI = RobbedRecordUI;
    })(escort = ui.escort || (ui.escort = {}));
})(ui || (ui = {}));
(function (ui) {
    var fenjie;
    (function (fenjie) {
        var FenjieUI = /** @class */ (function (_super) {
            __extends(FenjieUI, _super);
            function FenjieUI() {
                return _super.call(this) || this;
            }
            FenjieUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("ui.god.render.ChooseBoxUI", ui.god.render.ChooseBoxUI);
                View.regComponent("common.RaceBox", common.RaceBox);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("fenjie/Fenjie");
            };
            return FenjieUI;
        }(DialogExt));
        fenjie.FenjieUI = FenjieUI;
    })(fenjie = ui.fenjie || (ui.fenjie = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var box;
        (function (box) {
            var ArtifactRenderUI = /** @class */ (function (_super) {
                __extends(ArtifactRenderUI, _super);
                function ArtifactRenderUI() {
                    return _super.call(this) || this;
                }
                ArtifactRenderUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("fight/box/ArtifactRender");
                };
                return ArtifactRenderUI;
            }(View));
            box.ArtifactRenderUI = ArtifactRenderUI;
        })(box = fight.box || (fight.box = {}));
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var box;
        (function (box) {
            var BossBuffBoxUI = /** @class */ (function (_super) {
                __extends(BossBuffBoxUI, _super);
                function BossBuffBoxUI() {
                    return _super.call(this) || this;
                }
                BossBuffBoxUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("fight/box/BossBuffBox");
                };
                return BossBuffBoxUI;
            }(View));
            box.BossBuffBoxUI = BossBuffBoxUI;
        })(box = fight.box || (fight.box = {}));
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var box;
        (function (box) {
            var FightItemBoxUI = /** @class */ (function (_super) {
                __extends(FightItemBoxUI, _super);
                function FightItemBoxUI() {
                    return _super.call(this) || this;
                }
                FightItemBoxUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("fight/box/FightItemBox");
                };
                return FightItemBoxUI;
            }(View));
            box.FightItemBoxUI = FightItemBoxUI;
        })(box = fight.box || (fight.box = {}));
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var box;
        (function (box) {
            var playSkillBoxUI = /** @class */ (function (_super) {
                __extends(playSkillBoxUI, _super);
                function playSkillBoxUI() {
                    return _super.call(this) || this;
                }
                playSkillBoxUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("fight/box/playSkillBox");
                };
                return playSkillBoxUI;
            }(View));
            box.playSkillBoxUI = playSkillBoxUI;
        })(box = fight.box || (fight.box = {}));
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var FightGuildCopyResultUI = /** @class */ (function (_super) {
            __extends(FightGuildCopyResultUI, _super);
            function FightGuildCopyResultUI() {
                return _super.call(this) || this;
            }
            FightGuildCopyResultUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.AutoLayoutList", common.AutoLayoutList);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/FightGuildCopyResult");
            };
            return FightGuildCopyResultUI;
        }(DialogExt));
        fight.FightGuildCopyResultUI = FightGuildCopyResultUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var fightHeadUI = /** @class */ (function (_super) {
            __extends(fightHeadUI, _super);
            function fightHeadUI() {
                return _super.call(this) || this;
            }
            fightHeadUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/fightHead");
            };
            return fightHeadUI;
        }(View));
        fight.fightHeadUI = fightHeadUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var fightsUI = /** @class */ (function (_super) {
            __extends(fightsUI, _super);
            function fightsUI() {
                return _super.call(this) || this;
            }
            fightsUI.prototype.createChildren = function () {
                View.regComponent("game.fightBossBuffIR", game.fightBossBuffIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/fights");
            };
            return fightsUI;
        }(DialogExt));
        fight.fightsUI = fightsUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var FightTishiUI = /** @class */ (function (_super) {
            __extends(FightTishiUI, _super);
            function FightTishiUI() {
                return _super.call(this) || this;
            }
            FightTishiUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/FightTishi");
            };
            return FightTishiUI;
        }(DialogExt));
        fight.FightTishiUI = FightTishiUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var GloryFightResultUI = /** @class */ (function (_super) {
            __extends(GloryFightResultUI, _super);
            function GloryFightResultUI() {
                return _super.call(this) || this;
            }
            GloryFightResultUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/GloryFightResult");
            };
            return GloryFightResultUI;
        }(DialogExt));
        fight.GloryFightResultUI = GloryFightResultUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var shengliUI = /** @class */ (function (_super) {
            __extends(shengliUI, _super);
            function shengliUI() {
                return _super.call(this) || this;
            }
            shengliUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.AutoLayoutList", common.AutoLayoutList);
                View.regComponent("game.FightItemBox", game.FightItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/shengli");
            };
            return shengliUI;
        }(DialogExt));
        fight.shengliUI = shengliUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var shengliQieCuoUI = /** @class */ (function (_super) {
            __extends(shengliQieCuoUI, _super);
            function shengliQieCuoUI() {
                return _super.call(this) || this;
            }
            shengliQieCuoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/shengliQieCuo");
            };
            return shengliQieCuoUI;
        }(DialogExt));
        fight.shengliQieCuoUI = shengliQieCuoUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var shibaiUI = /** @class */ (function (_super) {
            __extends(shibaiUI, _super);
            function shibaiUI() {
                return _super.call(this) || this;
            }
            shibaiUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ChannelBox", common.ChannelBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("fight/shibai");
            };
            return shibaiUI;
        }(DialogExt));
        fight.shibaiUI = shibaiUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var firstguide;
    (function (firstguide) {
        var FirstGuideUI = /** @class */ (function (_super) {
            __extends(FirstGuideUI, _super);
            function FirstGuideUI() {
                return _super.call(this) || this;
            }
            FirstGuideUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("firstguide/FirstGuide");
            };
            return FirstGuideUI;
        }(DialogExt));
        firstguide.FirstGuideUI = FirstGuideUI;
    })(firstguide = ui.firstguide || (ui.firstguide = {}));
})(ui || (ui = {}));
(function (ui) {
    var fogforest;
    (function (fogforest) {
        var AwardUI = /** @class */ (function (_super) {
            __extends(AwardUI, _super);
            function AwardUI() {
                return _super.call(this) || this;
            }
            AwardUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("fogforest/Award");
            };
            return AwardUI;
        }(View));
        fogforest.AwardUI = AwardUI;
    })(fogforest = ui.fogforest || (ui.fogforest = {}));
})(ui || (ui = {}));
(function (ui) {
    var fogforest;
    (function (fogforest) {
        var FogForestUI = /** @class */ (function (_super) {
            __extends(FogForestUI, _super);
            function FogForestUI() {
                return _super.call(this) || this;
            }
            FogForestUI.prototype.createChildren = function () {
                View.regComponent("game.ForestGuanqiaBox", game.ForestGuanqiaBox);
                View.regComponent("game.forestAwardView", game.forestAwardView);
                View.regComponent("game.forestRankIR", game.forestRankIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("fogforest/FogForest");
            };
            return FogForestUI;
        }(DialogExt));
        fogforest.FogForestUI = FogForestUI;
    })(fogforest = ui.fogforest || (ui.fogforest = {}));
})(ui || (ui = {}));
(function (ui) {
    var fogforest;
    (function (fogforest) {
        var GuanqiaBoxUI = /** @class */ (function (_super) {
            __extends(GuanqiaBoxUI, _super);
            function GuanqiaBoxUI() {
                return _super.call(this) || this;
            }
            GuanqiaBoxUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("fogforest/GuanqiaBox");
            };
            return GuanqiaBoxUI;
        }(View));
        fogforest.GuanqiaBoxUI = GuanqiaBoxUI;
    })(fogforest = ui.fogforest || (ui.fogforest = {}));
})(ui || (ui = {}));
(function (ui) {
    var fogforest;
    (function (fogforest) {
        var RankIRUI = /** @class */ (function (_super) {
            __extends(RankIRUI, _super);
            function RankIRUI() {
                return _super.call(this) || this;
            }
            RankIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("fogforest/RankIR");
            };
            return RankIRUI;
        }(View));
        fogforest.RankIRUI = RankIRUI;
    })(fogforest = ui.fogforest || (ui.fogforest = {}));
})(ui || (ui = {}));
(function (ui) {
    var fogforest;
    (function (fogforest) {
        var RewardIRUI = /** @class */ (function (_super) {
            __extends(RewardIRUI, _super);
            function RewardIRUI() {
                return _super.call(this) || this;
            }
            RewardIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("fogforest/RewardIR");
            };
            return RewardIRUI;
        }(View));
        fogforest.RewardIRUI = RewardIRUI;
    })(fogforest = ui.fogforest || (ui.fogforest = {}));
})(ui || (ui = {}));
(function (ui) {
    var fogforest;
    (function (fogforest) {
        var RewardViewUI = /** @class */ (function (_super) {
            __extends(RewardViewUI, _super);
            function RewardViewUI() {
                return _super.call(this) || this;
            }
            RewardViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.ForestRewardIR", game.ForestRewardIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("fogforest/RewardView");
            };
            return RewardViewUI;
        }(DialogExt));
        fogforest.RewardViewUI = RewardViewUI;
    })(fogforest = ui.fogforest || (ui.fogforest = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var AddFriendUI = /** @class */ (function (_super) {
            __extends(AddFriendUI, _super);
            function AddFriendUI() {
                return _super.call(this) || this;
            }
            AddFriendUI.prototype.createChildren = function () {
                View.regComponent("game.AddFriendIR", game.AddFriendIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/AddFriend");
            };
            return AddFriendUI;
        }(View));
        friend.AddFriendUI = AddFriendUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var AddFriendIRUI = /** @class */ (function (_super) {
            __extends(AddFriendIRUI, _super);
            function AddFriendIRUI() {
                return _super.call(this) || this;
            }
            AddFriendIRUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/AddFriendIR");
            };
            return AddFriendIRUI;
        }(View));
        friend.AddFriendIRUI = AddFriendIRUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var ApplyfriendUI = /** @class */ (function (_super) {
            __extends(ApplyfriendUI, _super);
            function ApplyfriendUI() {
                return _super.call(this) || this;
            }
            ApplyfriendUI.prototype.createChildren = function () {
                View.regComponent("game.ApplyFriendIR", game.ApplyFriendIR);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/Applyfriend");
            };
            return ApplyfriendUI;
        }(View));
        friend.ApplyfriendUI = ApplyfriendUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var ApplyfriendIRUI = /** @class */ (function (_super) {
            __extends(ApplyfriendIRUI, _super);
            function ApplyfriendIRUI() {
                return _super.call(this) || this;
            }
            ApplyfriendIRUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/ApplyfriendIR");
            };
            return ApplyfriendIRUI;
        }(View));
        friend.ApplyfriendIRUI = ApplyfriendIRUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var FriendIRUI = /** @class */ (function (_super) {
            __extends(FriendIRUI, _super);
            function FriendIRUI() {
                return _super.call(this) || this;
            }
            FriendIRUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/FriendIR");
            };
            return FriendIRUI;
        }(View));
        friend.FriendIRUI = FriendIRUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var FriendListUI = /** @class */ (function (_super) {
            __extends(FriendListUI, _super);
            function FriendListUI() {
                return _super.call(this) || this;
            }
            FriendListUI.prototype.createChildren = function () {
                View.regComponent("game.FriendIR", game.FriendIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/FriendList");
            };
            return FriendListUI;
        }(View));
        friend.FriendListUI = FriendListUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var friend;
    (function (friend) {
        var FriendMainUI = /** @class */ (function (_super) {
            __extends(FriendMainUI, _super);
            function FriendMainUI() {
                return _super.call(this) || this;
            }
            FriendMainUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.FriendsView", game.FriendsView);
                View.regComponent("game.AddView", game.AddView);
                View.regComponent("game.ApplyView", game.ApplyView);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("friend/FriendMain");
            };
            return FriendMainUI;
        }(DialogExt));
        friend.FriendMainUI = FriendMainUI;
    })(friend = ui.friend || (ui.friend = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var FightListUI = /** @class */ (function (_super) {
            __extends(FightListUI, _super);
            function FightListUI() {
                return _super.call(this) || this;
            }
            FightListUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.gloryFightPlayerIR", game.gloryFightPlayerIR);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/FightList");
            };
            return FightListUI;
        }(View));
        glory.FightListUI = FightListUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var GloryAwardUI = /** @class */ (function (_super) {
            __extends(GloryAwardUI, _super);
            function GloryAwardUI() {
                return _super.call(this) || this;
            }
            GloryAwardUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.gloryAwardIR", game.gloryAwardIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/GloryAward");
            };
            return GloryAwardUI;
        }(DialogExt));
        glory.GloryAwardUI = GloryAwardUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var GloryFightUI = /** @class */ (function (_super) {
            __extends(GloryFightUI, _super);
            function GloryFightUI() {
                return _super.call(this) || this;
            }
            GloryFightUI.prototype.createChildren = function () {
                View.regComponent("game.gloryFightListView", game.gloryFightListView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/GloryFight");
            };
            return GloryFightUI;
        }(DialogExt));
        glory.GloryFightUI = GloryFightUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var GloryGroupUI = /** @class */ (function (_super) {
            __extends(GloryGroupUI, _super);
            function GloryGroupUI() {
                return _super.call(this) || this;
            }
            GloryGroupUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle2View", common.CommonTitle2View);
                View.regComponent("game.gloryMatchPlayerIR", game.gloryMatchPlayerIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/GloryGroup");
            };
            return GloryGroupUI;
        }(DialogExt));
        glory.GloryGroupUI = GloryGroupUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var GloryWaitUI = /** @class */ (function (_super) {
            __extends(GloryWaitUI, _super);
            function GloryWaitUI() {
                return _super.call(this) || this;
            }
            GloryWaitUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/GloryWait");
            };
            return GloryWaitUI;
        }(DialogExt));
        glory.GloryWaitUI = GloryWaitUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var iRender;
        (function (iRender) {
            var AwardIRUI = /** @class */ (function (_super) {
                __extends(AwardIRUI, _super);
                function AwardIRUI() {
                    return _super.call(this) || this;
                }
                AwardIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("glory/iRender/AwardIR");
                };
                return AwardIRUI;
            }(View));
            iRender.AwardIRUI = AwardIRUI;
        })(iRender = glory.iRender || (glory.iRender = {}));
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var iRender;
        (function (iRender) {
            var FightPlayerIRUI = /** @class */ (function (_super) {
                __extends(FightPlayerIRUI, _super);
                function FightPlayerIRUI() {
                    return _super.call(this) || this;
                }
                FightPlayerIRUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("glory/iRender/FightPlayerIR");
                };
                return FightPlayerIRUI;
            }(View));
            iRender.FightPlayerIRUI = FightPlayerIRUI;
        })(iRender = glory.iRender || (glory.iRender = {}));
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var iRender;
        (function (iRender) {
            var MatchPlayerIRUI = /** @class */ (function (_super) {
                __extends(MatchPlayerIRUI, _super);
                function MatchPlayerIRUI() {
                    return _super.call(this) || this;
                }
                MatchPlayerIRUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("glory/iRender/MatchPlayerIR");
                };
                return MatchPlayerIRUI;
            }(View));
            iRender.MatchPlayerIRUI = MatchPlayerIRUI;
        })(iRender = glory.iRender || (glory.iRender = {}));
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var LastReviewUI = /** @class */ (function (_super) {
            __extends(LastReviewUI, _super);
            function LastReviewUI() {
                return _super.call(this) || this;
            }
            LastReviewUI.prototype.createChildren = function () {
                View.regComponent("game.gloryFightListView", game.gloryFightListView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/LastReview");
            };
            return LastReviewUI;
        }(DialogExt));
        glory.LastReviewUI = LastReviewUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var glory;
    (function (glory) {
        var RecordUI = /** @class */ (function (_super) {
            __extends(RecordUI, _super);
            function RecordUI() {
                return _super.call(this) || this;
            }
            RecordUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle2View", common.CommonTitle2View);
                View.regComponent("game.gloryMatchPlayerIR", game.gloryMatchPlayerIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("glory/Record");
            };
            return RecordUI;
        }(DialogExt));
        glory.RecordUI = RecordUI;
    })(glory = ui.glory || (ui.glory = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var BuzhenUI = /** @class */ (function (_super) {
            __extends(BuzhenUI, _super);
            function BuzhenUI() {
                return _super.call(this) || this;
            }
            BuzhenUI.prototype.createChildren = function () {
                View.regComponent("game.godBuzhenIR", game.godBuzhenIR);
                View.regComponent("common.HeadNameBox", common.HeadNameBox);
                View.regComponent("game.BuzhenGodIR", game.BuzhenGodIR);
                View.regComponent("common.RaceBox", common.RaceBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.GuanghuanView", game.GuanghuanView);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/Buzhen");
            };
            return BuzhenUI;
        }(DialogExt));
        god.BuzhenUI = BuzhenUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var ChooseGodUI = /** @class */ (function (_super) {
            __extends(ChooseGodUI, _super);
            function ChooseGodUI() {
                return _super.call(this) || this;
            }
            ChooseGodUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.ChooseGodIR", game.ChooseGodIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/ChooseGod");
            };
            return ChooseGodUI;
        }(DialogExt));
        god.ChooseGodUI = ChooseGodUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var CommonLineupViewUI = /** @class */ (function (_super) {
            __extends(CommonLineupViewUI, _super);
            function CommonLineupViewUI() {
                return _super.call(this) || this;
            }
            CommonLineupViewUI.prototype.createChildren = function () {
                View.regComponent("common.HeadNameBox", common.HeadNameBox);
                View.regComponent("game.GuanghuanView", game.GuanghuanView);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/CommonLineupView");
            };
            return CommonLineupViewUI;
        }(View));
        god.CommonLineupViewUI = CommonLineupViewUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GodAttrUI = /** @class */ (function (_super) {
            __extends(GodAttrUI, _super);
            function GodAttrUI() {
                return _super.call(this) || this;
            }
            GodAttrUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/GodAttr");
            };
            return GodAttrUI;
        }(DialogExt));
        god.GodAttrUI = GodAttrUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GodCultureUI = /** @class */ (function (_super) {
            __extends(GodCultureUI, _super);
            function GodCultureUI() {
                return _super.call(this) || this;
            }
            GodCultureUI.prototype.createChildren = function () {
                View.regComponent("game.GodIntroduceView", game.GodIntroduceView);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/GodCulture");
            };
            return GodCultureUI;
        }(DialogExt));
        god.GodCultureUI = GodCultureUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GodIntroduceUI = /** @class */ (function (_super) {
            __extends(GodIntroduceUI, _super);
            function GodIntroduceUI() {
                return _super.call(this) || this;
            }
            GodIntroduceUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.GodTreasureView", game.GodTreasureView);
                View.regComponent("ui.god.render.AttrIRUI", ui.god.render.AttrIRUI);
                View.regComponent("common.ListBase", common.ListBase);
                View.regComponent("ui.god.render.TabItemRenderUI", ui.god.render.TabItemRenderUI);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/GodIntroduce");
            };
            return GodIntroduceUI;
        }(View));
        god.GodIntroduceUI = GodIntroduceUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GodLiHuiUI = /** @class */ (function (_super) {
            __extends(GodLiHuiUI, _super);
            function GodLiHuiUI() {
                return _super.call(this) || this;
            }
            GodLiHuiUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/GodLiHui");
            };
            return GodLiHuiUI;
        }(DialogExt));
        god.GodLiHuiUI = GodLiHuiUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GodSkinUI = /** @class */ (function (_super) {
            __extends(GodSkinUI, _super);
            function GodSkinUI() {
                return _super.call(this) || this;
            }
            GodSkinUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.GodSkinIR", game.GodSkinIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/GodSkin");
            };
            return GodSkinUI;
        }(DialogExt));
        god.GodSkinUI = GodSkinUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GuaiwuxinxiUI = /** @class */ (function (_super) {
            __extends(GuaiwuxinxiUI, _super);
            function GuaiwuxinxiUI() {
                return _super.call(this) || this;
            }
            GuaiwuxinxiUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.HeadBox", common.HeadBox);
                View.regComponent("common.SkillBox", common.SkillBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/Guaiwuxinxi");
            };
            return GuaiwuxinxiUI;
        }(DialogExt));
        god.GuaiwuxinxiUI = GuaiwuxinxiUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var GuanghuanUI = /** @class */ (function (_super) {
            __extends(GuanghuanUI, _super);
            function GuanghuanUI() {
                return _super.call(this) || this;
            }
            GuanghuanUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("god/Guanghuan");
            };
            return GuanghuanUI;
        }(View));
        god.GuanghuanUI = GuanghuanUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var NewGodMainUI = /** @class */ (function (_super) {
            __extends(NewGodMainUI, _super);
            function NewGodMainUI() {
                return _super.call(this) || this;
            }
            NewGodMainUI.prototype.createChildren = function () {
                View.regComponent("game.GodIntroduceView", game.GodIntroduceView);
                View.regComponent("game.LineupGodIR", game.LineupGodIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/NewGodMain");
            };
            return NewGodMainUI;
        }(DialogExt));
        god.NewGodMainUI = NewGodMainUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var AttrBoxUI = /** @class */ (function (_super) {
                __extends(AttrBoxUI, _super);
                function AttrBoxUI() {
                    return _super.call(this) || this;
                }
                AttrBoxUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/AttrBox");
                };
                return AttrBoxUI;
            }(View));
            render.AttrBoxUI = AttrBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var AttrIRUI = /** @class */ (function (_super) {
                __extends(AttrIRUI, _super);
                function AttrIRUI() {
                    return _super.call(this) || this;
                }
                AttrIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/AttrIR");
                };
                return AttrIRUI;
            }(View));
            render.AttrIRUI = AttrIRUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var ChooseBoxUI = /** @class */ (function (_super) {
                __extends(ChooseBoxUI, _super);
                function ChooseBoxUI() {
                    return _super.call(this) || this;
                }
                ChooseBoxUI.prototype.createChildren = function () {
                    View.regComponent("common.HeadBox", common.HeadBox);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/ChooseBox");
                };
                return ChooseBoxUI;
            }(View));
            render.ChooseBoxUI = ChooseBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var GetItemBoxUI = /** @class */ (function (_super) {
                __extends(GetItemBoxUI, _super);
                function GetItemBoxUI() {
                    return _super.call(this) || this;
                }
                GetItemBoxUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/GetItemBox");
                };
                return GetItemBoxUI;
            }(View));
            render.GetItemBoxUI = GetItemBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var GodMaterialIRUI = /** @class */ (function (_super) {
                __extends(GodMaterialIRUI, _super);
                function GodMaterialIRUI() {
                    return _super.call(this) || this;
                }
                GodMaterialIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/GodMaterialIR");
                };
                return GodMaterialIRUI;
            }(View));
            render.GodMaterialIRUI = GodMaterialIRUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var GodSkinIRUI = /** @class */ (function (_super) {
                __extends(GodSkinIRUI, _super);
                function GodSkinIRUI() {
                    return _super.call(this) || this;
                }
                GodSkinIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/GodSkinIR");
                };
                return GodSkinIRUI;
            }(View));
            render.GodSkinIRUI = GodSkinIRUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var HaveItemBoxUI = /** @class */ (function (_super) {
                __extends(HaveItemBoxUI, _super);
                function HaveItemBoxUI() {
                    return _super.call(this) || this;
                }
                HaveItemBoxUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/HaveItemBox");
                };
                return HaveItemBoxUI;
            }(View));
            render.HaveItemBoxUI = HaveItemBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var KeZhiForceBoxUI = /** @class */ (function (_super) {
                __extends(KeZhiForceBoxUI, _super);
                function KeZhiForceBoxUI() {
                    return _super.call(this) || this;
                }
                KeZhiForceBoxUI.prototype.createChildren = function () {
                    View.regComponent("common.GodRaceAddIR", common.GodRaceAddIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/KeZhiForceBox");
                };
                return KeZhiForceBoxUI;
            }(View));
            render.KeZhiForceBoxUI = KeZhiForceBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var LineupGodIRUI = /** @class */ (function (_super) {
                __extends(LineupGodIRUI, _super);
                function LineupGodIRUI() {
                    return _super.call(this) || this;
                }
                LineupGodIRUI.prototype.createChildren = function () {
                    View.regComponent("common.HeadBox", common.HeadBox);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/LineupGodIR");
                };
                return LineupGodIRUI;
            }(View));
            render.LineupGodIRUI = LineupGodIRUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var ReplaceIRUI = /** @class */ (function (_super) {
                __extends(ReplaceIRUI, _super);
                function ReplaceIRUI() {
                    return _super.call(this) || this;
                }
                ReplaceIRUI.prototype.createChildren = function () {
                    View.regComponent("common.HeadBox", common.HeadBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/ReplaceIR");
                };
                return ReplaceIRUI;
            }(View));
            render.ReplaceIRUI = ReplaceIRUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var RonghunBoxUI = /** @class */ (function (_super) {
                __extends(RonghunBoxUI, _super);
                function RonghunBoxUI() {
                    return _super.call(this) || this;
                }
                RonghunBoxUI.prototype.createChildren = function () {
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/RonghunBox");
                };
                return RonghunBoxUI;
            }(View));
            render.RonghunBoxUI = RonghunBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var SkillInfoBoxUI = /** @class */ (function (_super) {
                __extends(SkillInfoBoxUI, _super);
                function SkillInfoBoxUI() {
                    return _super.call(this) || this;
                }
                SkillInfoBoxUI.prototype.createChildren = function () {
                    View.regComponent("game.GodSkillItemIR", game.GodSkillItemIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/SkillInfoBox");
                };
                return SkillInfoBoxUI;
            }(View));
            render.SkillInfoBoxUI = SkillInfoBoxUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var SkillItemIRUI = /** @class */ (function (_super) {
                __extends(SkillItemIRUI, _super);
                function SkillItemIRUI() {
                    return _super.call(this) || this;
                }
                SkillItemIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/SkillItemIR");
                };
                return SkillItemIRUI;
            }(View));
            render.SkillItemIRUI = SkillItemIRUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var render;
        (function (render) {
            var TabItemRenderUI = /** @class */ (function (_super) {
                __extends(TabItemRenderUI, _super);
                function TabItemRenderUI() {
                    return _super.call(this) || this;
                }
                TabItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/render/TabItemRender");
                };
                return TabItemRenderUI;
            }(View));
            render.TabItemRenderUI = TabItemRenderUI;
        })(render = god.render || (god.render = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var ReplaceGodUI = /** @class */ (function (_super) {
            __extends(ReplaceGodUI, _super);
            function ReplaceGodUI() {
                return _super.call(this) || this;
            }
            ReplaceGodUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle2View", common.CommonTitle2View);
                View.regComponent("game.godReplaceIR", game.godReplaceIR);
                View.regComponent("common.RaceBox", common.RaceBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/ReplaceGod");
            };
            return ReplaceGodUI;
        }(DialogExt));
        god.ReplaceGodUI = ReplaceGodUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var RonghunLvInfoUI = /** @class */ (function (_super) {
            __extends(RonghunLvInfoUI, _super);
            function RonghunLvInfoUI() {
                return _super.call(this) || this;
            }
            RonghunLvInfoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/RonghunLvInfo");
            };
            return RonghunLvInfoUI;
        }(DialogExt));
        god.RonghunLvInfoUI = RonghunLvInfoUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var ShengjieUI = /** @class */ (function (_super) {
            __extends(ShengjieUI, _super);
            function ShengjieUI() {
                return _super.call(this) || this;
            }
            ShengjieUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/Shengjie");
            };
            return ShengjieUI;
        }(DialogExt));
        god.ShengjieUI = ShengjieUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var tab;
        (function (tab) {
            var TabInfoUI = /** @class */ (function (_super) {
                __extends(TabInfoUI, _super);
                function TabInfoUI() {
                    return _super.call(this) || this;
                }
                TabInfoUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("game.GodSkillItemIR", game.GodSkillItemIR);
                    View.regComponent("game.SkillInfoBox", game.SkillInfoBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/tab/TabInfo");
                };
                return TabInfoUI;
            }(View));
            tab.TabInfoUI = TabInfoUI;
        })(tab = god.tab || (god.tab = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var tab;
        (function (tab) {
            var TabJuexingUI = /** @class */ (function (_super) {
                __extends(TabJuexingUI, _super);
                function TabJuexingUI() {
                    return _super.call(this) || this;
                }
                TabJuexingUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("game.GodMaterialIR", game.GodMaterialIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/tab/TabJuexing");
                };
                return TabJuexingUI;
            }(View));
            tab.TabJuexingUI = TabJuexingUI;
        })(tab = god.tab || (god.tab = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var tab;
        (function (tab) {
            var TabRonghunUI = /** @class */ (function (_super) {
                __extends(TabRonghunUI, _super);
                function TabRonghunUI() {
                    return _super.call(this) || this;
                }
                TabRonghunUI.prototype.createChildren = function () {
                    View.regComponent("game.godFuseUseIR", game.godFuseUseIR);
                    View.regComponent("game.godFuseIR", game.godFuseIR);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/tab/TabRonghun");
                };
                return TabRonghunUI;
            }(View));
            tab.TabRonghunUI = TabRonghunUI;
        })(tab = god.tab || (god.tab = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var tab;
        (function (tab) {
            var TabStarupUI = /** @class */ (function (_super) {
                __extends(TabStarupUI, _super);
                function TabStarupUI() {
                    return _super.call(this) || this;
                }
                TabStarupUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("game.GodMaterialIR", game.GodMaterialIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/tab/TabStarup");
                };
                return TabStarupUI;
            }(View));
            tab.TabStarupUI = TabStarupUI;
        })(tab = god.tab || (god.tab = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var ChooseMaterialUI = /** @class */ (function (_super) {
                __extends(ChooseMaterialUI, _super);
                function ChooseMaterialUI() {
                    return _super.call(this) || this;
                }
                ChooseMaterialUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("game.ChooseTreasureIR", game.ChooseTreasureIR);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/ChooseMaterial");
                };
                return ChooseMaterialUI;
            }(DialogExt));
            treasure.ChooseMaterialUI = ChooseMaterialUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var ChooseTreasureUI = /** @class */ (function (_super) {
                __extends(ChooseTreasureUI, _super);
                function ChooseTreasureUI() {
                    return _super.call(this) || this;
                }
                ChooseTreasureUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("game.ChooseTreasureIR", game.ChooseTreasureIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/ChooseTreasure");
                };
                return ChooseTreasureUI;
            }(DialogExt));
            treasure.ChooseTreasureUI = ChooseTreasureUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var GodTreasureUI = /** @class */ (function (_super) {
                __extends(GodTreasureUI, _super);
                function GodTreasureUI() {
                    return _super.call(this) || this;
                }
                GodTreasureUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/GodTreasure");
                };
                return GodTreasureUI;
            }(View));
            treasure.GodTreasureUI = GodTreasureUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var ChooseTreasureIRUI = /** @class */ (function (_super) {
                    __extends(ChooseTreasureIRUI, _super);
                    function ChooseTreasureIRUI() {
                        return _super.call(this) || this;
                    }
                    ChooseTreasureIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/ChooseTreasureIR");
                    };
                    return ChooseTreasureIRUI;
                }(View));
                render.ChooseTreasureIRUI = ChooseTreasureIRUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var SingleSelectTreasureIRUI = /** @class */ (function (_super) {
                    __extends(SingleSelectTreasureIRUI, _super);
                    function SingleSelectTreasureIRUI() {
                        return _super.call(this) || this;
                    }
                    SingleSelectTreasureIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/SingleSelectTreasureIR");
                    };
                    return SingleSelectTreasureIRUI;
                }(View));
                render.SingleSelectTreasureIRUI = SingleSelectTreasureIRUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var StarAttrPreviewIRUI = /** @class */ (function (_super) {
                    __extends(StarAttrPreviewIRUI, _super);
                    function StarAttrPreviewIRUI() {
                        return _super.call(this) || this;
                    }
                    StarAttrPreviewIRUI.prototype.createChildren = function () {
                        View.regComponent("game.StrengthAttrIR", game.StrengthAttrIR);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/StarAttrPreviewIR");
                    };
                    return StarAttrPreviewIRUI;
                }(View));
                render.StarAttrPreviewIRUI = StarAttrPreviewIRUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var StarupAttrIrUI = /** @class */ (function (_super) {
                    __extends(StarupAttrIrUI, _super);
                    function StarupAttrIrUI() {
                        return _super.call(this) || this;
                    }
                    StarupAttrIrUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/StarupAttrIr");
                    };
                    return StarupAttrIrUI;
                }(View));
                render.StarupAttrIrUI = StarupAttrIrUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var StrengthAttrIRUI = /** @class */ (function (_super) {
                    __extends(StrengthAttrIRUI, _super);
                    function StrengthAttrIRUI() {
                        return _super.call(this) || this;
                    }
                    StrengthAttrIRUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/StrengthAttrIR");
                    };
                    return StrengthAttrIRUI;
                }(View));
                render.StrengthAttrIRUI = StrengthAttrIRUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var TreasureMaterialIRUI = /** @class */ (function (_super) {
                    __extends(TreasureMaterialIRUI, _super);
                    function TreasureMaterialIRUI() {
                        return _super.call(this) || this;
                    }
                    TreasureMaterialIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        View.regComponent("common.scaleButton", common.scaleButton);
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/TreasureMaterialIR");
                    };
                    return TreasureMaterialIRUI;
                }(View));
                render.TreasureMaterialIRUI = TreasureMaterialIRUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var render;
            (function (render) {
                var TujianIRUI = /** @class */ (function (_super) {
                    __extends(TujianIRUI, _super);
                    function TujianIRUI() {
                        return _super.call(this) || this;
                    }
                    TujianIRUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("god/treasure/render/TujianIR");
                    };
                    return TujianIRUI;
                }(DialogExt));
                render.TujianIRUI = TujianIRUI;
            })(render = treasure.render || (treasure.render = {}));
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var StarAttrPreviewUI = /** @class */ (function (_super) {
                __extends(StarAttrPreviewUI, _super);
                function StarAttrPreviewUI() {
                    return _super.call(this) || this;
                }
                StarAttrPreviewUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/StarAttrPreview");
                };
                return StarAttrPreviewUI;
            }(DialogExt));
            treasure.StarAttrPreviewUI = StarAttrPreviewUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var TreasureRebirthUI = /** @class */ (function (_super) {
                __extends(TreasureRebirthUI, _super);
                function TreasureRebirthUI() {
                    return _super.call(this) || this;
                }
                TreasureRebirthUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("game.SingleSelectTreasureIR", game.SingleSelectTreasureIR);
                    View.regComponent("common.CostIR", common.CostIR);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/TreasureRebirth");
                };
                return TreasureRebirthUI;
            }(DialogExt));
            treasure.TreasureRebirthUI = TreasureRebirthUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var TreasureStarupUI = /** @class */ (function (_super) {
                __extends(TreasureStarupUI, _super);
                function TreasureStarupUI() {
                    return _super.call(this) || this;
                }
                TreasureStarupUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("game.TreasureMaterialIR", game.TreasureMaterialIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("game.StarupAttrIR", game.StarupAttrIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/TreasureStarup");
                };
                return TreasureStarupUI;
            }(DialogExt));
            treasure.TreasureStarupUI = TreasureStarupUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var TreasureStrengthUI = /** @class */ (function (_super) {
                __extends(TreasureStrengthUI, _super);
                function TreasureStrengthUI() {
                    return _super.call(this) || this;
                }
                TreasureStrengthUI.prototype.createChildren = function () {
                    View.regComponent("game.StrengthAttrIR", game.StrengthAttrIR);
                    View.regComponent("game.ChooseTreasureIR", game.ChooseTreasureIR);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/TreasureStrength");
                };
                return TreasureStrengthUI;
            }(DialogExt));
            treasure.TreasureStrengthUI = TreasureStrengthUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var treasure;
        (function (treasure) {
            var TreasureTujianUI = /** @class */ (function (_super) {
                __extends(TreasureTujianUI, _super);
                function TreasureTujianUI() {
                    return _super.call(this) || this;
                }
                TreasureTujianUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("game.TreasueTujianIR", game.TreasueTujianIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("god/treasure/TreasureTujian");
                };
                return TreasureTujianUI;
            }(DialogExt));
            treasure.TreasureTujianUI = TreasureTujianUI;
        })(treasure = god.treasure || (god.treasure = {}));
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var TupoUI = /** @class */ (function (_super) {
            __extends(TupoUI, _super);
            function TupoUI() {
                return _super.call(this) || this;
            }
            TupoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitleView", common.CommonTitleView);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/Tupo");
            };
            return TupoUI;
        }(DialogExt));
        god.TupoUI = TupoUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var UplevelsuccUI = /** @class */ (function (_super) {
            __extends(UplevelsuccUI, _super);
            function UplevelsuccUI() {
                return _super.call(this) || this;
            }
            UplevelsuccUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitleView", common.CommonTitleView);
                View.regComponent("game.GodSkillItemIR", game.GodSkillItemIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/Uplevelsucc");
            };
            return UplevelsuccUI;
        }(DialogExt));
        god.UplevelsuccUI = UplevelsuccUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var god;
    (function (god) {
        var ZhenYingKeZhiUI = /** @class */ (function (_super) {
            __extends(ZhenYingKeZhiUI, _super);
            function ZhenYingKeZhiUI() {
                return _super.call(this) || this;
            }
            ZhenYingKeZhiUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                _super.prototype.createChildren.call(this);
                this.loadUI("god/ZhenYingKeZhi");
            };
            return ZhenYingKeZhiUI;
        }(DialogExt));
        god.ZhenYingKeZhiUI = ZhenYingKeZhiUI;
    })(god = ui.god || (ui.god = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var AutoMatchUI = /** @class */ (function (_super) {
            __extends(AutoMatchUI, _super);
            function AutoMatchUI() {
                return _super.call(this) || this;
            }
            AutoMatchUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/AutoMatch");
            };
            return AutoMatchUI;
        }(DialogExt));
        goddomain.AutoMatchUI = AutoMatchUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var BattleResultUI = /** @class */ (function (_super) {
            __extends(BattleResultUI, _super);
            function BattleResultUI() {
                return _super.call(this) || this;
            }
            BattleResultUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/BattleResult");
            };
            return BattleResultUI;
        }(DialogExt));
        goddomain.BattleResultUI = BattleResultUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var BattleSettlementUI = /** @class */ (function (_super) {
            __extends(BattleSettlementUI, _super);
            function BattleSettlementUI() {
                return _super.call(this) || this;
            }
            BattleSettlementUI.prototype.createChildren = function () {
                View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                View.regComponent("common.ChannelBox", common.ChannelBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/BattleSettlement");
            };
            return BattleSettlementUI;
        }(DialogExt));
        goddomain.BattleSettlementUI = BattleSettlementUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var fightStartUI = /** @class */ (function (_super) {
            __extends(fightStartUI, _super);
            function fightStartUI() {
                return _super.call(this) || this;
            }
            fightStartUI.prototype.createChildren = function () {
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                View.regComponent("game.GodDmDuizhanIR", game.GodDmDuizhanIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/fightStart");
            };
            return fightStartUI;
        }(DialogExt));
        goddomain.fightStartUI = fightStartUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var GodDomainUI = /** @class */ (function (_super) {
            __extends(GodDomainUI, _super);
            function GodDomainUI() {
                return _super.call(this) || this;
            }
            GodDomainUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/GodDomain");
            };
            return GodDomainUI;
        }(DialogExt));
        goddomain.GodDomainUI = GodDomainUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var InviteJoinUI = /** @class */ (function (_super) {
            __extends(InviteJoinUI, _super);
            function InviteJoinUI() {
                return _super.call(this) || this;
            }
            InviteJoinUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/InviteJoin");
            };
            return InviteJoinUI;
        }(DialogExt));
        goddomain.InviteJoinUI = InviteJoinUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var InviteListUI = /** @class */ (function (_super) {
            __extends(InviteListUI, _super);
            function InviteListUI() {
                return _super.call(this) || this;
            }
            InviteListUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.GodDmInviteIR", game.GodDmInviteIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/InviteList");
            };
            return InviteListUI;
        }(DialogExt));
        goddomain.InviteListUI = InviteListUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var MemberMenuUI = /** @class */ (function (_super) {
            __extends(MemberMenuUI, _super);
            function MemberMenuUI() {
                return _super.call(this) || this;
            }
            MemberMenuUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/MemberMenu");
            };
            return MemberMenuUI;
        }(View));
        goddomain.MemberMenuUI = MemberMenuUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var RankViewUI = /** @class */ (function (_super) {
            __extends(RankViewUI, _super);
            function RankViewUI() {
                return _super.call(this) || this;
            }
            RankViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("common.RankIR", common.RankIR);
                View.regComponent("common.AwardRankIR", common.AwardRankIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/RankView");
            };
            return RankViewUI;
        }(DialogExt));
        goddomain.RankViewUI = RankViewUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var render;
        (function (render) {
            var DuizhanIRUI = /** @class */ (function (_super) {
                __extends(DuizhanIRUI, _super);
                function DuizhanIRUI() {
                    return _super.call(this) || this;
                }
                DuizhanIRUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddomain/render/DuizhanIR");
                };
                return DuizhanIRUI;
            }(DialogExt));
            render.DuizhanIRUI = DuizhanIRUI;
        })(render = goddomain.render || (goddomain.render = {}));
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var render;
        (function (render) {
            var InviteIRUI = /** @class */ (function (_super) {
                __extends(InviteIRUI, _super);
                function InviteIRUI() {
                    return _super.call(this) || this;
                }
                InviteIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddomain/render/InviteIR");
                };
                return InviteIRUI;
            }(View));
            render.InviteIRUI = InviteIRUI;
        })(render = goddomain.render || (goddomain.render = {}));
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var render;
        (function (render) {
            var MemberIRUI = /** @class */ (function (_super) {
                __extends(MemberIRUI, _super);
                function MemberIRUI() {
                    return _super.call(this) || this;
                }
                MemberIRUI.prototype.createChildren = function () {
                    View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddomain/render/MemberIR");
                };
                return MemberIRUI;
            }(View));
            render.MemberIRUI = MemberIRUI;
        })(render = goddomain.render || (goddomain.render = {}));
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var render;
        (function (render) {
            var TeamIRUI = /** @class */ (function (_super) {
                __extends(TeamIRUI, _super);
                function TeamIRUI() {
                    return _super.call(this) || this;
                }
                TeamIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddomain/render/TeamIR");
                };
                return TeamIRUI;
            }(View));
            render.TeamIRUI = TeamIRUI;
        })(render = goddomain.render || (goddomain.render = {}));
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var TeamUI = /** @class */ (function (_super) {
            __extends(TeamUI, _super);
            function TeamUI() {
                return _super.call(this) || this;
            }
            TeamUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.MemberMenuView", game.MemberMenuView);
                View.regComponent("game.GodDmMemberIR", game.GodDmMemberIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/Team");
            };
            return TeamUI;
        }(DialogExt));
        goddomain.TeamUI = TeamUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var TeamListUI = /** @class */ (function (_super) {
            __extends(TeamListUI, _super);
            function TeamListUI() {
                return _super.call(this) || this;
            }
            TeamListUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.GodDmTeamIR", game.GodDmTeamIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/TeamList");
            };
            return TeamListUI;
        }(DialogExt));
        goddomain.TeamListUI = TeamListUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddomain;
    (function (goddomain) {
        var TeamMatchUI = /** @class */ (function (_super) {
            __extends(TeamMatchUI, _super);
            function TeamMatchUI() {
                return _super.call(this) || this;
            }
            TeamMatchUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddomain/TeamMatch");
            };
            return TeamMatchUI;
        }(DialogExt));
        goddomain.TeamMatchUI = TeamMatchUI;
    })(goddomain = ui.goddomain || (ui.goddomain = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddoor;
    (function (goddoor) {
        var CurMainUI = /** @class */ (function (_super) {
            __extends(CurMainUI, _super);
            function CurMainUI() {
                return _super.call(this) || this;
            }
            CurMainUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.GodDoorTabDoor", game.GodDoorTabDoor);
                View.regComponent("game.GodDoorTabTurn", game.GodDoorTabTurn);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.TabIR3", common.TabIR3);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddoor/CurMain");
            };
            return CurMainUI;
        }(DialogExt));
        goddoor.CurMainUI = CurMainUI;
    })(goddoor = ui.goddoor || (ui.goddoor = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddoor;
    (function (goddoor) {
        var JiangliUI = /** @class */ (function (_super) {
            __extends(JiangliUI, _super);
            function JiangliUI() {
                return _super.call(this) || this;
            }
            JiangliUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("goddoor/Jiangli");
            };
            return JiangliUI;
        }(DialogExt));
        goddoor.JiangliUI = JiangliUI;
    })(goddoor = ui.goddoor || (ui.goddoor = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddoor;
    (function (goddoor) {
        var render;
        (function (render) {
            var JiangliIRUI = /** @class */ (function (_super) {
                __extends(JiangliIRUI, _super);
                function JiangliIRUI() {
                    return _super.call(this) || this;
                }
                JiangliIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddoor/render/JiangliIR");
                };
                return JiangliIRUI;
            }(View));
            render.JiangliIRUI = JiangliIRUI;
        })(render = goddoor.render || (goddoor.render = {}));
    })(goddoor = ui.goddoor || (ui.goddoor = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddoor;
    (function (goddoor) {
        var render;
        (function (render) {
            var TabDoorUI = /** @class */ (function (_super) {
                __extends(TabDoorUI, _super);
                function TabDoorUI() {
                    return _super.call(this) || this;
                }
                TabDoorUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddoor/render/TabDoor");
                };
                return TabDoorUI;
            }(View));
            render.TabDoorUI = TabDoorUI;
        })(render = goddoor.render || (goddoor.render = {}));
    })(goddoor = ui.goddoor || (ui.goddoor = {}));
})(ui || (ui = {}));
(function (ui) {
    var goddoor;
    (function (goddoor) {
        var render;
        (function (render) {
            var TabTurnUI = /** @class */ (function (_super) {
                __extends(TabTurnUI, _super);
                function TabTurnUI() {
                    return _super.call(this) || this;
                }
                TabTurnUI.prototype.createChildren = function () {
                    View.regComponent("common.StarList", common.StarList);
                    View.regComponent("game.godChooseIR", game.godChooseIR);
                    View.regComponent("common.RaceBox", common.RaceBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("goddoor/render/TabTurn");
                };
                return TabTurnUI;
            }(View));
            render.TabTurnUI = TabTurnUI;
        })(render = goddoor.render || (goddoor.render = {}));
    })(goddoor = ui.goddoor || (ui.goddoor = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var FastFightUI = /** @class */ (function (_super) {
            __extends(FastFightUI, _super);
            function FastFightUI() {
                return _super.call(this) || this;
            }
            FastFightUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/FastFight");
            };
            return FastFightUI;
        }(DialogExt));
        guaji.FastFightUI = FastFightUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var GuajiUI = /** @class */ (function (_super) {
            __extends(GuajiUI, _super);
            function GuajiUI() {
                return _super.call(this) || this;
            }
            GuajiUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                View.regComponent("game.RedPointPropCopy", game.RedPointPropCopy);
                View.regComponent("game.UpRoadEntrance", game.UpRoadEntrance);
                View.regComponent("game.GuajiBottomView", game.GuajiBottomView);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/Guaji");
            };
            return GuajiUI;
        }(DialogExt));
        guaji.GuajiUI = GuajiUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var GuajiBottomUI = /** @class */ (function (_super) {
            __extends(GuajiBottomUI, _super);
            function GuajiBottomUI() {
                return _super.call(this) || this;
            }
            GuajiBottomUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/GuajiBottom");
            };
            return GuajiBottomUI;
        }(View));
        guaji.GuajiBottomUI = GuajiBottomUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var GuaJiRewardUI = /** @class */ (function (_super) {
            __extends(GuaJiRewardUI, _super);
            function GuaJiRewardUI() {
                return _super.call(this) || this;
            }
            GuaJiRewardUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("common.EffItemBox", common.EffItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/GuaJiReward");
            };
            return GuaJiRewardUI;
        }(DialogExt));
        guaji.GuaJiRewardUI = GuaJiRewardUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var GuanQiaInfoUI = /** @class */ (function (_super) {
            __extends(GuanQiaInfoUI, _super);
            function GuanQiaInfoUI() {
                return _super.call(this) || this;
            }
            GuanQiaInfoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.HeadBox", common.HeadBox);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/GuanQiaInfo");
            };
            return GuanQiaInfoUI;
        }(DialogExt));
        guaji.GuanQiaInfoUI = GuanQiaInfoUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var GuanQiaNewUI = /** @class */ (function (_super) {
            __extends(GuanQiaNewUI, _super);
            function GuanQiaNewUI() {
                return _super.call(this) || this;
            }
            GuanQiaNewUI.prototype.createChildren = function () {
                View.regComponent("game.GuanQiaNewIR", game.GuanQiaNewIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/GuanQiaNew");
            };
            return GuanQiaNewUI;
        }(DialogExt));
        guaji.GuanQiaNewUI = GuanQiaNewUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var GuanQiaNewIRUI = /** @class */ (function (_super) {
            __extends(GuanQiaNewIRUI, _super);
            function GuanQiaNewIRUI() {
                return _super.call(this) || this;
            }
            GuanQiaNewIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/GuanQiaNewIR");
            };
            return GuanQiaNewIRUI;
        }(View));
        guaji.GuanQiaNewIRUI = GuanQiaNewIRUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var OpenChapterViewUI = /** @class */ (function (_super) {
            __extends(OpenChapterViewUI, _super);
            function OpenChapterViewUI() {
                return _super.call(this) || this;
            }
            OpenChapterViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/OpenChapterView");
            };
            return OpenChapterViewUI;
        }(DialogExt));
        guaji.OpenChapterViewUI = OpenChapterViewUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var ShouyiUI = /** @class */ (function (_super) {
            __extends(ShouyiUI, _super);
            function ShouyiUI() {
                return _super.call(this) || this;
            }
            ShouyiUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitleView", common.CommonTitleView);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.DialogOpenEff", common.DialogOpenEff);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/Shouyi");
            };
            return ShouyiUI;
        }(DialogExt));
        guaji.ShouyiUI = ShouyiUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var ShouyiUpUI = /** @class */ (function (_super) {
            __extends(ShouyiUpUI, _super);
            function ShouyiUpUI() {
                return _super.call(this) || this;
            }
            ShouyiUpUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/ShouyiUp");
            };
            return ShouyiUpUI;
        }(DialogExt));
        guaji.ShouyiUpUI = ShouyiUpUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var ShouYiXiangQingUI = /** @class */ (function (_super) {
            __extends(ShouYiXiangQingUI, _super);
            function ShouYiXiangQingUI() {
                return _super.call(this) || this;
            }
            ShouYiXiangQingUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/ShouYiXiangQing");
            };
            return ShouYiXiangQingUI;
        }(DialogExt));
        guaji.ShouYiXiangQingUI = ShouYiXiangQingUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var SysOpenUI = /** @class */ (function (_super) {
            __extends(SysOpenUI, _super);
            function SysOpenUI() {
                return _super.call(this) || this;
            }
            SysOpenUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/SysOpen");
            };
            return SysOpenUI;
        }(View));
        guaji.SysOpenUI = SysOpenUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guaji;
    (function (guaji) {
        var WorldMapUI = /** @class */ (function (_super) {
            __extends(WorldMapUI, _super);
            function WorldMapUI() {
                return _super.call(this) || this;
            }
            WorldMapUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("guaji/WorldMap");
            };
            return WorldMapUI;
        }(DialogExt));
        guaji.WorldMapUI = WorldMapUI;
    })(guaji = ui.guaji || (ui.guaji = {}));
})(ui || (ui = {}));
(function (ui) {
    var guide;
    (function (guide) {
        var GuideMaskUI = /** @class */ (function (_super) {
            __extends(GuideMaskUI, _super);
            function GuideMaskUI() {
                return _super.call(this) || this;
            }
            GuideMaskUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("guide/GuideMask");
            };
            return GuideMaskUI;
        }(DialogExt));
        guide.GuideMaskUI = GuideMaskUI;
    })(guide = ui.guide || (ui.guide = {}));
})(ui || (ui = {}));
(function (ui) {
    var guide;
    (function (guide) {
        var GuideTalkUI = /** @class */ (function (_super) {
            __extends(GuideTalkUI, _super);
            function GuideTalkUI() {
                return _super.call(this) || this;
            }
            GuideTalkUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("guide/GuideTalk");
            };
            return GuideTalkUI;
        }(DialogExt));
        guide.GuideTalkUI = GuideTalkUI;
    })(guide = ui.guide || (ui.guide = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var atkEndRankUI = /** @class */ (function (_super) {
                __extends(atkEndRankUI, _super);
                function atkEndRankUI() {
                    return _super.call(this) || this;
                }
                atkEndRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildRankItemRender", game.GuildRankItemRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/atkEndRank");
                };
                return atkEndRankUI;
            }(DialogExt));
            copy.atkEndRankUI = atkEndRankUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var DamageRankUI = /** @class */ (function (_super) {
                __extends(DamageRankUI, _super);
                function DamageRankUI() {
                    return _super.call(this) || this;
                }
                DamageRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildRankItemRender", game.GuildRankItemRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/DamageRank");
                };
                return DamageRankUI;
            }(DialogExt));
            copy.DamageRankUI = DamageRankUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var GuildCopyUI = /** @class */ (function (_super) {
                __extends(GuildCopyUI, _super);
                function GuildCopyUI() {
                    return _super.call(this) || this;
                }
                GuildCopyUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildGuanqiaItemRender", game.GuildGuanqiaItemRender);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/GuildCopy");
                };
                return GuildCopyUI;
            }(DialogExt));
            copy.GuildCopyUI = GuildCopyUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var GuildCopySweepResultUI = /** @class */ (function (_super) {
                __extends(GuildCopySweepResultUI, _super);
                function GuildCopySweepResultUI() {
                    return _super.call(this) || this;
                }
                GuildCopySweepResultUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonFightTitleView", common.CommonFightTitleView);
                    View.regComponent("common.AutoLayoutList", common.AutoLayoutList);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/GuildCopySweepResult");
                };
                return GuildCopySweepResultUI;
            }(DialogExt));
            copy.GuildCopySweepResultUI = GuildCopySweepResultUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var GuildGuanqiaUI = /** @class */ (function (_super) {
                __extends(GuildGuanqiaUI, _super);
                function GuildGuanqiaUI() {
                    return _super.call(this) || this;
                }
                GuildGuanqiaUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/GuildGuanqia");
                };
                return GuildGuanqiaUI;
            }(View));
            copy.GuildGuanqiaUI = GuildGuanqiaUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var GuildRankItemRenderUI = /** @class */ (function (_super) {
                __extends(GuildRankItemRenderUI, _super);
                function GuildRankItemRenderUI() {
                    return _super.call(this) || this;
                }
                GuildRankItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/GuildRankItemRender");
                };
                return GuildRankItemRenderUI;
            }(View));
            copy.GuildRankItemRenderUI = GuildRankItemRenderUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var JishaJiangliUI = /** @class */ (function (_super) {
                __extends(JishaJiangliUI, _super);
                function JishaJiangliUI() {
                    return _super.call(this) || this;
                }
                JishaJiangliUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("game.JishaJiangliItemRender", game.JishaJiangliItemRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/JishaJiangli");
                };
                return JishaJiangliUI;
            }(View));
            copy.JishaJiangliUI = JishaJiangliUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var JishaJiangliItemRenderUI = /** @class */ (function (_super) {
                __extends(JishaJiangliItemRenderUI, _super);
                function JishaJiangliItemRenderUI() {
                    return _super.call(this) || this;
                }
                JishaJiangliItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/JishaJiangliItemRender");
                };
                return JishaJiangliItemRenderUI;
            }(View));
            copy.JishaJiangliItemRenderUI = JishaJiangliItemRenderUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var TongguanJiangliUI = /** @class */ (function (_super) {
                __extends(TongguanJiangliUI, _super);
                function TongguanJiangliUI() {
                    return _super.call(this) || this;
                }
                TongguanJiangliUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.TongguanJiangliItemRender", game.TongguanJiangliItemRender);
                    View.regComponent("game.JishaJiangliView", game.JishaJiangliView);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/TongguanJiangli");
                };
                return TongguanJiangliUI;
            }(DialogExt));
            copy.TongguanJiangliUI = TongguanJiangliUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var copy;
        (function (copy) {
            var TongguanJiangliItemRenderUI = /** @class */ (function (_super) {
                __extends(TongguanJiangliItemRenderUI, _super);
                function TongguanJiangliItemRenderUI() {
                    return _super.call(this) || this;
                }
                TongguanJiangliItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox", common.ItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/copy/TongguanJiangliItemRender");
                };
                return TongguanJiangliItemRenderUI;
            }(View));
            copy.TongguanJiangliItemRenderUI = TongguanJiangliItemRenderUI;
        })(copy = guild.copy || (guild.copy = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var donation;
        (function (donation) {
            var GuildDonationUI = /** @class */ (function (_super) {
                __extends(GuildDonationUI, _super);
                function GuildDonationUI() {
                    return _super.call(this) || this;
                }
                GuildDonationUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("ui.guild.donation.GuildDonationItemRenderUI", ui.guild.donation.GuildDonationItemRenderUI);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/donation/GuildDonation");
                };
                return GuildDonationUI;
            }(DialogExt));
            donation.GuildDonationUI = GuildDonationUI;
        })(donation = guild.donation || (guild.donation = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var donation;
        (function (donation) {
            var GuildDonationItemRenderUI = /** @class */ (function (_super) {
                __extends(GuildDonationItemRenderUI, _super);
                function GuildDonationItemRenderUI() {
                    return _super.call(this) || this;
                }
                GuildDonationItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/donation/GuildDonationItemRender");
                };
                return GuildDonationItemRenderUI;
            }(View));
            donation.GuildDonationItemRenderUI = GuildDonationItemRenderUI;
        })(donation = guild.donation || (guild.donation = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var GradeChestUI = /** @class */ (function (_super) {
                __extends(GradeChestUI, _super);
                function GradeChestUI() {
                    return _super.call(this) || this;
                }
                GradeChestUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.ChestItemRender", game.ChestItemRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/GradeChest");
                };
                return GradeChestUI;
            }(DialogExt));
            fight.GradeChestUI = GradeChestUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var GroupRankUI = /** @class */ (function (_super) {
                __extends(GroupRankUI, _super);
                function GroupRankUI() {
                    return _super.call(this) || this;
                }
                GroupRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildRankIRender", game.GuildRankIRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/GroupRank");
                };
                return GroupRankUI;
            }(DialogExt));
            fight.GroupRankUI = GroupRankUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var GuildFightUI = /** @class */ (function (_super) {
                __extends(GuildFightUI, _super);
                function GuildFightUI() {
                    return _super.call(this) || this;
                }
                GuildFightUI.prototype.createChildren = function () {
                    View.regComponent("game.MemberItemRender", game.MemberItemRender);
                    View.regComponent("game.FightMenuPanel", game.FightMenuPanel);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/GuildFight");
                };
                return GuildFightUI;
            }(DialogExt));
            fight.GuildFightUI = GuildFightUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var GuildFightMenuUI = /** @class */ (function (_super) {
                __extends(GuildFightMenuUI, _super);
                function GuildFightMenuUI() {
                    return _super.call(this) || this;
                }
                GuildFightMenuUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/GuildFightMenu");
                };
                return GuildFightMenuUI;
            }(View));
            fight.GuildFightMenuUI = GuildFightMenuUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var GuildFightWaitUI = /** @class */ (function (_super) {
                __extends(GuildFightWaitUI, _super);
                function GuildFightWaitUI() {
                    return _super.call(this) || this;
                }
                GuildFightWaitUI.prototype.createChildren = function () {
                    View.regComponent("game.FightMenuPanel", game.FightMenuPanel);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/GuildFightWait");
                };
                return GuildFightWaitUI;
            }(DialogExt));
            fight.GuildFightWaitUI = GuildFightWaitUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var HonorHallUI = /** @class */ (function (_super) {
                __extends(HonorHallUI, _super);
                function HonorHallUI() {
                    return _super.call(this) || this;
                }
                HonorHallUI.prototype.createChildren = function () {
                    View.regComponent("game.HonorGuildIRender", game.HonorGuildIRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/HonorHall");
                };
                return HonorHallUI;
            }(DialogExt));
            fight.HonorHallUI = HonorHallUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var PersonRankUI = /** @class */ (function (_super) {
                __extends(PersonRankUI, _super);
                function PersonRankUI() {
                    return _super.call(this) || this;
                }
                PersonRankUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.AwardRankIR", common.AwardRankIR);
                    View.regComponent("game.PersonRankIRender", game.PersonRankIRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/PersonRank");
                };
                return PersonRankUI;
            }(DialogExt));
            fight.PersonRankUI = PersonRankUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var render;
            (function (render) {
                var ChestItemRenderUI = /** @class */ (function (_super) {
                    __extends(ChestItemRenderUI, _super);
                    function ChestItemRenderUI() {
                        return _super.call(this) || this;
                    }
                    ChestItemRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox", common.ItemBox);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("guild/fight/render/ChestItemRender");
                    };
                    return ChestItemRenderUI;
                }(View));
                render.ChestItemRenderUI = ChestItemRenderUI;
            })(render = fight.render || (fight.render = {}));
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var render;
            (function (render) {
                var GuildFightRenderUI = /** @class */ (function (_super) {
                    __extends(GuildFightRenderUI, _super);
                    function GuildFightRenderUI() {
                        return _super.call(this) || this;
                    }
                    GuildFightRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                        View.regComponent("common.HeadBox", common.HeadBox);
                        View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("guild/fight/render/GuildFightRender");
                    };
                    return GuildFightRenderUI;
                }(View));
                render.GuildFightRenderUI = GuildFightRenderUI;
            })(render = fight.render || (fight.render = {}));
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var render;
            (function (render) {
                var GuildRongyuRenderUI = /** @class */ (function (_super) {
                    __extends(GuildRongyuRenderUI, _super);
                    function GuildRongyuRenderUI() {
                        return _super.call(this) || this;
                    }
                    GuildRongyuRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("guild/fight/render/GuildRongyuRender");
                    };
                    return GuildRongyuRenderUI;
                }(View));
                render.GuildRongyuRenderUI = GuildRongyuRenderUI;
            })(render = fight.render || (fight.render = {}));
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var render;
            (function (render) {
                var GuildSaiQuRenderUI = /** @class */ (function (_super) {
                    __extends(GuildSaiQuRenderUI, _super);
                    function GuildSaiQuRenderUI() {
                        return _super.call(this) || this;
                    }
                    GuildSaiQuRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.CommonRankIR", common.CommonRankIR);
                        View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("guild/fight/render/GuildSaiQuRender");
                    };
                    return GuildSaiQuRenderUI;
                }(View));
                render.GuildSaiQuRenderUI = GuildSaiQuRenderUI;
            })(render = fight.render || (fight.render = {}));
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var render;
            (function (render) {
                var SeasonAwardIRenderUI = /** @class */ (function (_super) {
                    __extends(SeasonAwardIRenderUI, _super);
                    function SeasonAwardIRenderUI() {
                        return _super.call(this) || this;
                    }
                    SeasonAwardIRenderUI.prototype.createChildren = function () {
                        View.regComponent("common.ItemBox2", common.ItemBox2);
                        _super.prototype.createChildren.call(this);
                        this.loadUI("guild/fight/render/SeasonAwardIRender");
                    };
                    return SeasonAwardIRenderUI;
                }(View));
                render.SeasonAwardIRenderUI = SeasonAwardIRenderUI;
            })(render = fight.render || (fight.render = {}));
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var fight;
        (function (fight) {
            var SeasonAwardUI = /** @class */ (function (_super) {
                __extends(SeasonAwardUI, _super);
                function SeasonAwardUI() {
                    return _super.call(this) || this;
                }
                SeasonAwardUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.AwardIRender", game.AwardIRender);
                    View.regComponent("game.GuildRankIRender", game.GuildRankIRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/fight/SeasonAward");
                };
                return SeasonAwardUI;
            }(DialogExt));
            fight.SeasonAwardUI = SeasonAwardUI;
        })(fight = guild.fight || (guild.fight = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var GuildMainUI = /** @class */ (function (_super) {
            __extends(GuildMainUI, _super);
            function GuildMainUI() {
                return _super.call(this) || this;
            }
            GuildMainUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("guild/GuildMain");
            };
            return GuildMainUI;
        }(DialogExt));
        guild.GuildMainUI = GuildMainUI;
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var GuildApplyListUI = /** @class */ (function (_super) {
                __extends(GuildApplyListUI, _super);
                function GuildApplyListUI() {
                    return _super.call(this) || this;
                }
                GuildApplyListUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildApplyRender", game.GuildApplyRender);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/GuildApplyList");
                };
                return GuildApplyListUI;
            }(DialogExt));
            hall.GuildApplyListUI = GuildApplyListUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var GuildApplyRenderUI = /** @class */ (function (_super) {
                __extends(GuildApplyRenderUI, _super);
                function GuildApplyRenderUI() {
                    return _super.call(this) || this;
                }
                GuildApplyRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/GuildApplyRender");
                };
                return GuildApplyRenderUI;
            }(View));
            hall.GuildApplyRenderUI = GuildApplyRenderUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var GuildInfoUI = /** @class */ (function (_super) {
                __extends(GuildInfoUI, _super);
                function GuildInfoUI() {
                    return _super.call(this) || this;
                }
                GuildInfoUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.MemberInfoRender", game.MemberInfoRender);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/GuildInfo");
                };
                return GuildInfoUI;
            }(DialogExt));
            hall.GuildInfoUI = GuildInfoUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var GuildNoticeUI = /** @class */ (function (_super) {
                __extends(GuildNoticeUI, _super);
                function GuildNoticeUI() {
                    return _super.call(this) || this;
                }
                GuildNoticeUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/GuildNotice");
                };
                return GuildNoticeUI;
            }(DialogExt));
            hall.GuildNoticeUI = GuildNoticeUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var GuildPopUpUI = /** @class */ (function (_super) {
                __extends(GuildPopUpUI, _super);
                function GuildPopUpUI() {
                    return _super.call(this) || this;
                }
                GuildPopUpUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/GuildPopUp");
                };
                return GuildPopUpUI;
            }(DialogExt));
            hall.GuildPopUpUI = GuildPopUpUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var GuildSetUpUI = /** @class */ (function (_super) {
                __extends(GuildSetUpUI, _super);
                function GuildSetUpUI() {
                    return _super.call(this) || this;
                }
                GuildSetUpUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/GuildSetUp");
                };
                return GuildSetUpUI;
            }(DialogExt));
            hall.GuildSetUpUI = GuildSetUpUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var MemberInfoRenderUI = /** @class */ (function (_super) {
                __extends(MemberInfoRenderUI, _super);
                function MemberInfoRenderUI() {
                    return _super.call(this) || this;
                }
                MemberInfoRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/MemberInfoRender");
                };
                return MemberInfoRenderUI;
            }(View));
            hall.MemberInfoRenderUI = MemberInfoRenderUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var MemberSetupUI = /** @class */ (function (_super) {
                __extends(MemberSetupUI, _super);
                function MemberSetupUI() {
                    return _super.call(this) || this;
                }
                MemberSetupUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/MemberSetup");
                };
                return MemberSetupUI;
            }(DialogExt));
            hall.MemberSetupUI = MemberSetupUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var hall;
        (function (hall) {
            var MemberzhenrouUI = /** @class */ (function (_super) {
                __extends(MemberzhenrouUI, _super);
                function MemberzhenrouUI() {
                    return _super.call(this) || this;
                }
                MemberzhenrouUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    View.regComponent("common.CommonLineupView", common.CommonLineupView);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/hall/Memberzhenrou");
                };
                return MemberzhenrouUI;
            }(DialogExt));
            hall.MemberzhenrouUI = MemberzhenrouUI;
        })(hall = guild.hall || (guild.hall = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var help;
        (function (help) {
            var AskHelpViewUI = /** @class */ (function (_super) {
                __extends(AskHelpViewUI, _super);
                function AskHelpViewUI() {
                    return _super.call(this) || this;
                }
                AskHelpViewUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("common.ListBase", common.ListBase);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/help/AskHelpView");
                };
                return AskHelpViewUI;
            }(DialogExt));
            help.AskHelpViewUI = AskHelpViewUI;
        })(help = guild.help || (guild.help = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var help;
        (function (help) {
            var HelpMainViewUI = /** @class */ (function (_super) {
                __extends(HelpMainViewUI, _super);
                function HelpMainViewUI() {
                    return _super.call(this) || this;
                }
                HelpMainViewUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("ui.guild.help.MyHelpViewUI", ui.guild.help.MyHelpViewUI);
                    View.regComponent("ui.guild.help.OhtersHelpViewUI", ui.guild.help.OhtersHelpViewUI);
                    View.regComponent("common.TabBase", common.TabBase);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/help/HelpMainView");
                };
                return HelpMainViewUI;
            }(DialogExt));
            help.HelpMainViewUI = HelpMainViewUI;
        })(help = guild.help || (guild.help = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var help;
        (function (help) {
            var MyHelpIRUI = /** @class */ (function (_super) {
                __extends(MyHelpIRUI, _super);
                function MyHelpIRUI() {
                    return _super.call(this) || this;
                }
                MyHelpIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox", common.ItemBox);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/help/MyHelpIR");
                };
                return MyHelpIRUI;
            }(View));
            help.MyHelpIRUI = MyHelpIRUI;
        })(help = guild.help || (guild.help = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var help;
        (function (help) {
            var MyHelpViewUI = /** @class */ (function (_super) {
                __extends(MyHelpViewUI, _super);
                function MyHelpViewUI() {
                    return _super.call(this) || this;
                }
                MyHelpViewUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.GuildMyHelpIR", game.GuildMyHelpIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/help/MyHelpView");
                };
                return MyHelpViewUI;
            }(DialogExt));
            help.MyHelpViewUI = MyHelpViewUI;
        })(help = guild.help || (guild.help = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var help;
        (function (help) {
            var OhtersHelpViewUI = /** @class */ (function (_super) {
                __extends(OhtersHelpViewUI, _super);
                function OhtersHelpViewUI() {
                    return _super.call(this) || this;
                }
                OhtersHelpViewUI.prototype.createChildren = function () {
                    View.regComponent("game.GuildOthersHelpIR", game.GuildOthersHelpIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/help/OhtersHelpView");
                };
                return OhtersHelpViewUI;
            }(DialogExt));
            help.OhtersHelpViewUI = OhtersHelpViewUI;
        })(help = guild.help || (guild.help = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var help;
        (function (help) {
            var OthersHelpIRUI = /** @class */ (function (_super) {
                __extends(OthersHelpIRUI, _super);
                function OthersHelpIRUI() {
                    return _super.call(this) || this;
                }
                OthersHelpIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/help/OthersHelpIR");
                };
                return OthersHelpIRUI;
            }(View));
            help.OthersHelpIRUI = OthersHelpIRUI;
        })(help = guild.help || (guild.help = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var init;
        (function (init) {
            var CreateGuildUI = /** @class */ (function (_super) {
                __extends(CreateGuildUI, _super);
                function CreateGuildUI() {
                    return _super.call(this) || this;
                }
                CreateGuildUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/init/CreateGuild");
                };
                return CreateGuildUI;
            }(DialogExt));
            init.CreateGuildUI = CreateGuildUI;
        })(init = guild.init || (guild.init = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var init;
        (function (init) {
            var GuildinitUI = /** @class */ (function (_super) {
                __extends(GuildinitUI, _super);
                function GuildinitUI() {
                    return _super.call(this) || this;
                }
                GuildinitUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildinitRender", game.GuildinitRender);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/init/Guildinit");
                };
                return GuildinitUI;
            }(DialogExt));
            init.GuildinitUI = GuildinitUI;
        })(init = guild.init || (guild.init = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var init;
        (function (init) {
            var GuildinitRenderUI = /** @class */ (function (_super) {
                __extends(GuildinitRenderUI, _super);
                function GuildinitRenderUI() {
                    return _super.call(this) || this;
                }
                GuildinitRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/init/GuildinitRender");
                };
                return GuildinitRenderUI;
            }(View));
            init.GuildinitRenderUI = GuildinitRenderUI;
        })(init = guild.init || (guild.init = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var init;
        (function (init) {
            var IconChangeUI = /** @class */ (function (_super) {
                __extends(IconChangeUI, _super);
                function IconChangeUI() {
                    return _super.call(this) || this;
                }
                IconChangeUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.IconRender", game.IconRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/init/IconChange");
                };
                return IconChangeUI;
            }(DialogExt));
            init.IconChangeUI = IconChangeUI;
        })(init = guild.init || (guild.init = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var init;
        (function (init) {
            var IconRenderUI = /** @class */ (function (_super) {
                __extends(IconRenderUI, _super);
                function IconRenderUI() {
                    return _super.call(this) || this;
                }
                IconRenderUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/init/IconRender");
                };
                return IconRenderUI;
            }(View));
            init.IconRenderUI = IconRenderUI;
        })(init = guild.init || (guild.init = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var skill;
        (function (skill) {
            var GuildSkillUI = /** @class */ (function (_super) {
                __extends(GuildSkillUI, _super);
                function GuildSkillUI() {
                    return _super.call(this) || this;
                }
                GuildSkillUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.GuildSkillRender", game.GuildSkillRender);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/skill/GuildSkill");
                };
                return GuildSkillUI;
            }(DialogExt));
            skill.GuildSkillUI = GuildSkillUI;
        })(skill = guild.skill || (guild.skill = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var guild;
    (function (guild) {
        var skill;
        (function (skill) {
            var GuildSkillRenderUI = /** @class */ (function (_super) {
                __extends(GuildSkillRenderUI, _super);
                function GuildSkillRenderUI() {
                    return _super.call(this) || this;
                }
                GuildSkillRenderUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("guild/skill/GuildSkillRender");
                };
                return GuildSkillRenderUI;
            }(View));
            skill.GuildSkillRenderUI = GuildSkillRenderUI;
        })(skill = guild.skill || (guild.skill = {}));
    })(guild = ui.guild || (ui.guild = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var entrance;
        (function (entrance) {
            var EntranceListUI = /** @class */ (function (_super) {
                __extends(EntranceListUI, _super);
                function EntranceListUI() {
                    return _super.call(this) || this;
                }
                EntranceListUI.prototype.createChildren = function () {
                    View.regComponent("game.EntranceIR", game.EntranceIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/entrance/EntranceList");
                };
                return EntranceListUI;
            }(DialogExt));
            entrance.EntranceListUI = EntranceListUI;
        })(entrance = hud.entrance || (hud.entrance = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var entrance;
        (function (entrance) {
            var EntranceListIRUI = /** @class */ (function (_super) {
                __extends(EntranceListIRUI, _super);
                function EntranceListIRUI() {
                    return _super.call(this) || this;
                }
                EntranceListIRUI.prototype.createChildren = function () {
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/entrance/EntranceListIR");
                };
                return EntranceListIRUI;
            }(View));
            entrance.EntranceListIRUI = EntranceListIRUI;
        })(entrance = hud.entrance || (hud.entrance = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var HudBoxUI = /** @class */ (function (_super) {
            __extends(HudBoxUI, _super);
            function HudBoxUI() {
                return _super.call(this) || this;
            }
            HudBoxUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("hud/HudBox");
            };
            return HudBoxUI;
        }(DialogExt));
        hud.HudBoxUI = HudBoxUI;
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var MainViewUI = /** @class */ (function (_super) {
            __extends(MainViewUI, _super);
            function MainViewUI() {
                return _super.call(this) || this;
            }
            MainViewUI.prototype.createChildren = function () {
                View.regComponent("ui.hud.ShousuoBtnUI", ui.hud.ShousuoBtnUI);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                View.regComponent("game.RedPointPropCopy", game.RedPointPropCopy);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("hud/MainView");
            };
            return MainViewUI;
        }(DialogExt));
        hud.MainViewUI = MainViewUI;
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var ChangeNameUI = /** @class */ (function (_super) {
                __extends(ChangeNameUI, _super);
                function ChangeNameUI() {
                    return _super.call(this) || this;
                }
                ChangeNameUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/ChangeName");
                };
                return ChangeNameUI;
            }(DialogExt));
            player.ChangeNameUI = ChangeNameUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var HeroicModelMainUI = /** @class */ (function (_super) {
                __extends(HeroicModelMainUI, _super);
                function HeroicModelMainUI() {
                    return _super.call(this) || this;
                }
                HeroicModelMainUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/HeroicModelMain");
                };
                return HeroicModelMainUI;
            }(DialogExt));
            player.HeroicModelMainUI = HeroicModelMainUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var PlayerDetailsUI = /** @class */ (function (_super) {
                __extends(PlayerDetailsUI, _super);
                function PlayerDetailsUI() {
                    return _super.call(this) || this;
                }
                PlayerDetailsUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/PlayerDetails");
                };
                return PlayerDetailsUI;
            }(DialogExt));
            player.PlayerDetailsUI = PlayerDetailsUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var TabChangeHeadUI = /** @class */ (function (_super) {
                __extends(TabChangeHeadUI, _super);
                function TabChangeHeadUI() {
                    return _super.call(this) || this;
                }
                TabChangeHeadUI.prototype.createChildren = function () {
                    View.regComponent("ui.guild.init.IconRenderUI", ui.guild.init.IconRenderUI);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/TabChangeHead");
                };
                return TabChangeHeadUI;
            }(DialogExt));
            player.TabChangeHeadUI = TabChangeHeadUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var TabChangeHeadBoxUI = /** @class */ (function (_super) {
                __extends(TabChangeHeadBoxUI, _super);
                function TabChangeHeadBoxUI() {
                    return _super.call(this) || this;
                }
                TabChangeHeadBoxUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/TabChangeHeadBox");
                };
                return TabChangeHeadBoxUI;
            }(DialogExt));
            player.TabChangeHeadBoxUI = TabChangeHeadBoxUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var TabChangeHeroicModelUI = /** @class */ (function (_super) {
                __extends(TabChangeHeroicModelUI, _super);
                function TabChangeHeroicModelUI() {
                    return _super.call(this) || this;
                }
                TabChangeHeroicModelUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/TabChangeHeroicModel");
                };
                return TabChangeHeroicModelUI;
            }(DialogExt));
            player.TabChangeHeroicModelUI = TabChangeHeroicModelUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var TabCustomerServiceUI = /** @class */ (function (_super) {
                __extends(TabCustomerServiceUI, _super);
                function TabCustomerServiceUI() {
                    return _super.call(this) || this;
                }
                TabCustomerServiceUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/TabCustomerService");
                };
                return TabCustomerServiceUI;
            }(DialogExt));
            player.TabCustomerServiceUI = TabCustomerServiceUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var TabPlayerInfoUI = /** @class */ (function (_super) {
                __extends(TabPlayerInfoUI, _super);
                function TabPlayerInfoUI() {
                    return _super.call(this) || this;
                }
                TabPlayerInfoUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/TabPlayerInfo");
                };
                return TabPlayerInfoUI;
            }(DialogExt));
            player.TabPlayerInfoUI = TabPlayerInfoUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var player;
        (function (player) {
            var TabSysSettingUI = /** @class */ (function (_super) {
                __extends(TabSysSettingUI, _super);
                function TabSysSettingUI() {
                    return _super.call(this) || this;
                }
                TabSysSettingUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/player/TabSysSetting");
                };
                return TabSysSettingUI;
            }(DialogExt));
            player.TabSysSettingUI = TabSysSettingUI;
        })(player = hud.player || (hud.player = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var render;
        (function (render) {
            var ActivityBtnIRUI = /** @class */ (function (_super) {
                __extends(ActivityBtnIRUI, _super);
                function ActivityBtnIRUI() {
                    return _super.call(this) || this;
                }
                ActivityBtnIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/render/ActivityBtnIR");
                };
                return ActivityBtnIRUI;
            }(View));
            render.ActivityBtnIRUI = ActivityBtnIRUI;
        })(render = hud.render || (hud.render = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var render;
        (function (render) {
            var LoginNoticeIRUI = /** @class */ (function (_super) {
                __extends(LoginNoticeIRUI, _super);
                function LoginNoticeIRUI() {
                    return _super.call(this) || this;
                }
                LoginNoticeIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/render/LoginNoticeIR");
                };
                return LoginNoticeIRUI;
            }(View));
            render.LoginNoticeIRUI = LoginNoticeIRUI;
        })(render = hud.render || (hud.render = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var render;
        (function (render) {
            var SysTopBtnIRUI = /** @class */ (function (_super) {
                __extends(SysTopBtnIRUI, _super);
                function SysTopBtnIRUI() {
                    return _super.call(this) || this;
                }
                SysTopBtnIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/render/SysTopBtnIR");
                };
                return SysTopBtnIRUI;
            }(View));
            render.SysTopBtnIRUI = SysTopBtnIRUI;
        })(render = hud.render || (hud.render = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var render;
        (function (render) {
            var SysTopResIRUI = /** @class */ (function (_super) {
                __extends(SysTopResIRUI, _super);
                function SysTopResIRUI() {
                    return _super.call(this) || this;
                }
                SysTopResIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/render/SysTopResIR");
                };
                return SysTopResIRUI;
            }(View));
            render.SysTopResIRUI = SysTopResIRUI;
        })(render = hud.render || (hud.render = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var ShousuoBtnUI = /** @class */ (function (_super) {
            __extends(ShousuoBtnUI, _super);
            function ShousuoBtnUI() {
                return _super.call(this) || this;
            }
            ShousuoBtnUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("hud/ShousuoBtn");
            };
            return ShousuoBtnUI;
        }(View));
        hud.ShousuoBtnUI = ShousuoBtnUI;
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var view;
        (function (view) {
            var CheatUI = /** @class */ (function (_super) {
                __extends(CheatUI, _super);
                function CheatUI() {
                    return _super.call(this) || this;
                }
                CheatUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/view/Cheat");
                };
                return CheatUI;
            }(DialogExt));
            view.CheatUI = CheatUI;
        })(view = hud.view || (hud.view = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var view;
        (function (view) {
            var ExchangeGoldUI = /** @class */ (function (_super) {
                __extends(ExchangeGoldUI, _super);
                function ExchangeGoldUI() {
                    return _super.call(this) || this;
                }
                ExchangeGoldUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/view/ExchangeGold");
                };
                return ExchangeGoldUI;
            }(DialogExt));
            view.ExchangeGoldUI = ExchangeGoldUI;
        })(view = hud.view || (hud.view = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var view;
        (function (view) {
            var LoginNoticeUI = /** @class */ (function (_super) {
                __extends(LoginNoticeUI, _super);
                function LoginNoticeUI() {
                    return _super.call(this) || this;
                }
                LoginNoticeUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/view/LoginNotice");
                };
                return LoginNoticeUI;
            }(DialogExt));
            view.LoginNoticeUI = LoginNoticeUI;
        })(view = hud.view || (hud.view = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var view;
        (function (view) {
            var SysTopUI = /** @class */ (function (_super) {
                __extends(SysTopUI, _super);
                function SysTopUI() {
                    return _super.call(this) || this;
                }
                SysTopUI.prototype.createChildren = function () {
                    View.regComponent("game.SysTopBtnIR", game.SysTopBtnIR);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/view/SysTop");
                };
                return SysTopUI;
            }(DialogExt));
            view.SysTopUI = SysTopUI;
        })(view = hud.view || (hud.view = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var hud;
    (function (hud) {
        var view;
        (function (view) {
            var VipLvUpUI = /** @class */ (function (_super) {
                __extends(VipLvUpUI, _super);
                function VipLvUpUI() {
                    return _super.call(this) || this;
                }
                VipLvUpUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("hud/view/VipLvUp");
                };
                return VipLvUpUI;
            }(DialogExt));
            view.VipLvUpUI = VipLvUpUI;
        })(view = hud.view || (hud.view = {}));
    })(hud = ui.hud || (ui.hud = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var EmptyOreUI = /** @class */ (function (_super) {
            __extends(EmptyOreUI, _super);
            function EmptyOreUI() {
                return _super.call(this) || this;
            }
            EmptyOreUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/EmptyOre");
            };
            return EmptyOreUI;
        }(DialogExt));
        island.EmptyOreUI = EmptyOreUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var IslandMainUI = /** @class */ (function (_super) {
            __extends(IslandMainUI, _super);
            function IslandMainUI() {
                return _super.call(this) || this;
            }
            IslandMainUI.prototype.createChildren = function () {
                View.regComponent("ui.island.itemrender.OccupyFlagIRUI", ui.island.itemrender.OccupyFlagIRUI);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/IslandMain");
            };
            return IslandMainUI;
        }(DialogExt));
        island.IslandMainUI = IslandMainUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var itemrender;
        (function (itemrender) {
            var OccupyFlagIRUI = /** @class */ (function (_super) {
                __extends(OccupyFlagIRUI, _super);
                function OccupyFlagIRUI() {
                    return _super.call(this) || this;
                }
                OccupyFlagIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("island/itemrender/OccupyFlagIR");
                };
                return OccupyFlagIRUI;
            }(View));
            itemrender.OccupyFlagIRUI = OccupyFlagIRUI;
        })(itemrender = island.itemrender || (island.itemrender = {}));
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var itemrender;
        (function (itemrender) {
            var OreSpotItemRenderUI = /** @class */ (function (_super) {
                __extends(OreSpotItemRenderUI, _super);
                function OreSpotItemRenderUI() {
                    return _super.call(this) || this;
                }
                OreSpotItemRenderUI.prototype.createChildren = function () {
                    View.regComponent("ui.island.itemrender.OccupyFlagIRUI", ui.island.itemrender.OccupyFlagIRUI);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("island/itemrender/OreSpotItemRender");
                };
                return OreSpotItemRenderUI;
            }(View));
            itemrender.OreSpotItemRenderUI = OreSpotItemRenderUI;
        })(itemrender = island.itemrender || (island.itemrender = {}));
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var OreExplainUI = /** @class */ (function (_super) {
            __extends(OreExplainUI, _super);
            function OreExplainUI() {
                return _super.call(this) || this;
            }
            OreExplainUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/OreExplain");
            };
            return OreExplainUI;
        }(DialogExt));
        island.OreExplainUI = OreExplainUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var OreMapUI = /** @class */ (function (_super) {
            __extends(OreMapUI, _super);
            function OreMapUI() {
                return _super.call(this) || this;
            }
            OreMapUI.prototype.createChildren = function () {
                View.regComponent("game.OreSpotIR", game.OreSpotIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/OreMap");
            };
            return OreMapUI;
        }(DialogExt));
        island.OreMapUI = OreMapUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var OreSettlementUI = /** @class */ (function (_super) {
            __extends(OreSettlementUI, _super);
            function OreSettlementUI() {
                return _super.call(this) || this;
            }
            OreSettlementUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/OreSettlement");
            };
            return OreSettlementUI;
        }(DialogExt));
        island.OreSettlementUI = OreSettlementUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var PlayerOreUI = /** @class */ (function (_super) {
            __extends(PlayerOreUI, _super);
            function PlayerOreUI() {
                return _super.call(this) || this;
            }
            PlayerOreUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("common.CommonLineupView", common.CommonLineupView);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/PlayerOre");
            };
            return PlayerOreUI;
        }(DialogExt));
        island.PlayerOreUI = PlayerOreUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var island;
    (function (island) {
        var SelfOreUI = /** @class */ (function (_super) {
            __extends(SelfOreUI, _super);
            function SelfOreUI() {
                return _super.call(this) || this;
            }
            SelfOreUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("island/SelfOre");
            };
            return SelfOreUI;
        }(DialogExt));
        island.SelfOreUI = SelfOreUI;
    })(island = ui.island || (ui.island = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        var CreateRoleUI = /** @class */ (function (_super) {
            __extends(CreateRoleUI, _super);
            function CreateRoleUI() {
                return _super.call(this) || this;
            }
            CreateRoleUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("login/CreateRole");
            };
            return CreateRoleUI;
        }(DialogExt));
        login.CreateRoleUI = CreateRoleUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        var LoginUI = /** @class */ (function (_super) {
            __extends(LoginUI, _super);
            function LoginUI() {
                return _super.call(this) || this;
            }
            LoginUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("login/Login");
            };
            return LoginUI;
        }(DialogExt));
        login.LoginUI = LoginUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        var SelectServerUI = /** @class */ (function (_super) {
            __extends(SelectServerUI, _super);
            function SelectServerUI() {
                return _super.call(this) || this;
            }
            SelectServerUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("login/SelectServer");
            };
            return SelectServerUI;
        }(DialogExt));
        login.SelectServerUI = SelectServerUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        var UserNoticeUI = /** @class */ (function (_super) {
            __extends(UserNoticeUI, _super);
            function UserNoticeUI() {
                return _super.call(this) || this;
            }
            UserNoticeUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                _super.prototype.createChildren.call(this);
                this.loadUI("login/UserNotice");
            };
            return UserNoticeUI;
        }(DialogExt));
        login.UserNoticeUI = UserNoticeUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        var WaitUI = /** @class */ (function (_super) {
            __extends(WaitUI, _super);
            function WaitUI() {
                return _super.call(this) || this;
            }
            WaitUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("login/Wait");
            };
            return WaitUI;
        }(DialogExt));
        login.WaitUI = WaitUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var mail;
    (function (mail) {
        var MailIRUI = /** @class */ (function (_super) {
            __extends(MailIRUI, _super);
            function MailIRUI() {
                return _super.call(this) || this;
            }
            MailIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("mail/MailIR");
            };
            return MailIRUI;
        }(View));
        mail.MailIRUI = MailIRUI;
    })(mail = ui.mail || (ui.mail = {}));
})(ui || (ui = {}));
(function (ui) {
    var mail;
    (function (mail) {
        var MailReadUI = /** @class */ (function (_super) {
            __extends(MailReadUI, _super);
            function MailReadUI() {
                return _super.call(this) || this;
            }
            MailReadUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("mail/MailRead");
            };
            return MailReadUI;
        }(DialogExt));
        mail.MailReadUI = MailReadUI;
    })(mail = ui.mail || (ui.mail = {}));
})(ui || (ui = {}));
(function (ui) {
    var mail;
    (function (mail) {
        var MailViewUI = /** @class */ (function (_super) {
            __extends(MailViewUI, _super);
            function MailViewUI() {
                return _super.call(this) || this;
            }
            MailViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.MailIR", game.MailIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("mail/MailView");
            };
            return MailViewUI;
        }(DialogExt));
        mail.MailViewUI = MailViewUI;
    })(mail = ui.mail || (ui.mail = {}));
})(ui || (ui = {}));
(function (ui) {
    var prompt;
    (function (prompt) {
        var RoleEffUI = /** @class */ (function (_super) {
            __extends(RoleEffUI, _super);
            function RoleEffUI() {
                return _super.call(this) || this;
            }
            RoleEffUI.prototype.createChildren = function () {
                View.regComponent("ui.prompt.StarUpRenderUI", ui.prompt.StarUpRenderUI);
                View.regComponent("common.SkillBox", common.SkillBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("prompt/RoleEff");
            };
            return RoleEffUI;
        }(DialogExt));
        prompt.RoleEffUI = RoleEffUI;
    })(prompt = ui.prompt || (ui.prompt = {}));
})(ui || (ui = {}));
(function (ui) {
    var prompt;
    (function (prompt) {
        var StarUpRenderUI = /** @class */ (function (_super) {
            __extends(StarUpRenderUI, _super);
            function StarUpRenderUI() {
                return _super.call(this) || this;
            }
            StarUpRenderUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("prompt/StarUpRender");
            };
            return StarUpRenderUI;
        }(View));
        prompt.StarUpRenderUI = StarUpRenderUI;
    })(prompt = ui.prompt || (ui.prompt = {}));
})(ui || (ui = {}));
(function (ui) {
    var prompt;
    (function (prompt) {
        var upPowerUI = /** @class */ (function (_super) {
            __extends(upPowerUI, _super);
            function upPowerUI() {
                return _super.call(this) || this;
            }
            upPowerUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("prompt/upPower");
            };
            return upPowerUI;
        }(DialogExt));
        prompt.upPowerUI = upPowerUI;
    })(prompt = ui.prompt || (ui.prompt = {}));
})(ui || (ui = {}));
(function (ui) {
    var rank;
    (function (rank) {
        var RankTabViewUI = /** @class */ (function (_super) {
            __extends(RankTabViewUI, _super);
            function RankTabViewUI() {
                return _super.call(this) || this;
            }
            RankTabViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.RankTabIR", game.RankTabIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("rank/RankTabView");
            };
            return RankTabViewUI;
        }(DialogExt));
        rank.RankTabViewUI = RankTabViewUI;
    })(rank = ui.rank || (ui.rank = {}));
})(ui || (ui = {}));
(function (ui) {
    var rank;
    (function (rank) {
        var RankViewUI = /** @class */ (function (_super) {
            __extends(RankViewUI, _super);
            function RankViewUI() {
                return _super.call(this) || this;
            }
            RankViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.RankModuleIR", game.RankModuleIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("rank/RankView");
            };
            return RankViewUI;
        }(DialogExt));
        rank.RankViewUI = RankViewUI;
    })(rank = ui.rank || (ui.rank = {}));
})(ui || (ui = {}));
(function (ui) {
    var rank;
    (function (rank) {
        var render;
        (function (render) {
            var RankIRUI = /** @class */ (function (_super) {
                __extends(RankIRUI, _super);
                function RankIRUI() {
                    return _super.call(this) || this;
                }
                RankIRUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonRankIR", common.CommonRankIR);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("rank/render/RankIR");
                };
                return RankIRUI;
            }(View));
            render.RankIRUI = RankIRUI;
        })(render = rank.render || (rank.render = {}));
    })(rank = ui.rank || (ui.rank = {}));
})(ui || (ui = {}));
(function (ui) {
    var rank;
    (function (rank) {
        var render;
        (function (render) {
            var RankTabIRUI = /** @class */ (function (_super) {
                __extends(RankTabIRUI, _super);
                function RankTabIRUI() {
                    return _super.call(this) || this;
                }
                RankTabIRUI.prototype.createChildren = function () {
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("rank/render/RankTabIR");
                };
                return RankTabIRUI;
            }(View));
            render.RankTabIRUI = RankTabIRUI;
        })(render = rank.render || (rank.render = {}));
    })(rank = ui.rank || (ui.rank = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var BuyUI = /** @class */ (function (_super) {
            __extends(BuyUI, _super);
            function BuyUI() {
                return _super.call(this) || this;
            }
            BuyUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("shop/Buy");
            };
            return BuyUI;
        }(DialogExt));
        shop.BuyUI = BuyUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopUI = /** @class */ (function (_super) {
            __extends(ShopUI, _super);
            function ShopUI() {
                return _super.call(this) || this;
            }
            ShopUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                View.regComponent("game.ShopTabIR", game.ShopTabIR);
                View.regComponent("game.ShopThreeIR", game.ShopThreeIR);
                View.regComponent("common.RaceBox", common.RaceBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("shop/Shop");
            };
            return ShopUI;
        }(DialogExt));
        shop.ShopUI = ShopUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopIRUI = /** @class */ (function (_super) {
            __extends(ShopIRUI, _super);
            function ShopIRUI() {
                return _super.call(this) || this;
            }
            ShopIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("shop/ShopIR");
            };
            return ShopIRUI;
        }(View));
        shop.ShopIRUI = ShopIRUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopRefreshUI = /** @class */ (function (_super) {
            __extends(ShopRefreshUI, _super);
            function ShopRefreshUI() {
                return _super.call(this) || this;
            }
            ShopRefreshUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("shop/ShopRefresh");
            };
            return ShopRefreshUI;
        }(DialogExt));
        shop.ShopRefreshUI = ShopRefreshUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopTabIRUI = /** @class */ (function (_super) {
            __extends(ShopTabIRUI, _super);
            function ShopTabIRUI() {
                return _super.call(this) || this;
            }
            ShopTabIRUI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("shop/ShopTabIR");
            };
            return ShopTabIRUI;
        }(DialogExt));
        shop.ShopTabIRUI = ShopTabIRUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var shop;
    (function (shop) {
        var ShopThreeIRUI = /** @class */ (function (_super) {
            __extends(ShopThreeIRUI, _super);
            function ShopThreeIRUI() {
                return _super.call(this) || this;
            }
            ShopThreeIRUI.prototype.createChildren = function () {
                View.regComponent("game.ShopIR", game.ShopIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("shop/ShopThreeIR");
            };
            return ShopThreeIRUI;
        }(View));
        shop.ShopThreeIRUI = ShopThreeIRUI;
    })(shop = ui.shop || (ui.shop = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var bianqiang;
        (function (bianqiang) {
            var BianQiangUI = /** @class */ (function (_super) {
                __extends(BianQiangUI, _super);
                function BianQiangUI() {
                    return _super.call(this) || this;
                }
                BianQiangUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    View.regComponent("game.BianQiangIR", game.BianQiangIR);
                    View.regComponent("game.ChallengeTitleIR", game.ChallengeTitleIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/bianqiang/BianQiang");
                };
                return BianQiangUI;
            }(DialogExt));
            bianqiang.BianQiangUI = BianQiangUI;
        })(bianqiang = task.bianqiang || (task.bianqiang = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var bianqiang;
        (function (bianqiang) {
            var BianQiangIRUI = /** @class */ (function (_super) {
                __extends(BianQiangIRUI, _super);
                function BianQiangIRUI() {
                    return _super.call(this) || this;
                }
                BianQiangIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/bianqiang/BianQiangIR");
                };
                return BianQiangIRUI;
            }(View));
            bianqiang.BianQiangIRUI = BianQiangIRUI;
        })(bianqiang = task.bianqiang || (task.bianqiang = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var bianqiang;
        (function (bianqiang) {
            var ChallengeDetailUI = /** @class */ (function (_super) {
                __extends(ChallengeDetailUI, _super);
                function ChallengeDetailUI() {
                    return _super.call(this) || this;
                }
                ChallengeDetailUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                    View.regComponent("game.TaskIR", game.TaskIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/bianqiang/ChallengeDetail");
                };
                return ChallengeDetailUI;
            }(DialogExt));
            bianqiang.ChallengeDetailUI = ChallengeDetailUI;
        })(bianqiang = task.bianqiang || (task.bianqiang = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var bianqiang;
        (function (bianqiang) {
            var ChallengeTitleIRUI = /** @class */ (function (_super) {
                __extends(ChallengeTitleIRUI, _super);
                function ChallengeTitleIRUI() {
                    return _super.call(this) || this;
                }
                ChallengeTitleIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SimpleItemBox", common.SimpleItemBox);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/bianqiang/ChallengeTitleIR");
                };
                return ChallengeTitleIRUI;
            }(View));
            bianqiang.ChallengeTitleIRUI = ChallengeTitleIRUI;
        })(bianqiang = task.bianqiang || (task.bianqiang = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var itemrender;
        (function (itemrender) {
            var TaskBaoxiangIRUI = /** @class */ (function (_super) {
                __extends(TaskBaoxiangIRUI, _super);
                function TaskBaoxiangIRUI() {
                    return _super.call(this) || this;
                }
                TaskBaoxiangIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/itemrender/TaskBaoxiangIR");
                };
                return TaskBaoxiangIRUI;
            }(View));
            itemrender.TaskBaoxiangIRUI = TaskBaoxiangIRUI;
        })(itemrender = task.itemrender || (task.itemrender = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var itemrender;
        (function (itemrender) {
            var TaskIRUI = /** @class */ (function (_super) {
                __extends(TaskIRUI, _super);
                function TaskIRUI() {
                    return _super.call(this) || this;
                }
                TaskIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.SimpleItemBox", common.SimpleItemBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/itemrender/TaskIR");
                };
                return TaskIRUI;
            }(View));
            itemrender.TaskIRUI = TaskIRUI;
        })(itemrender = task.itemrender || (task.itemrender = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var itemrender;
        (function (itemrender) {
            var TrialIRUI = /** @class */ (function (_super) {
                __extends(TrialIRUI, _super);
                function TrialIRUI() {
                    return _super.call(this) || this;
                }
                TrialIRUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/itemrender/TrialIR");
                };
                return TrialIRUI;
            }(View));
            itemrender.TrialIRUI = TrialIRUI;
        })(itemrender = task.itemrender || (task.itemrender = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var itemrender;
        (function (itemrender) {
            var WarriorIRUI = /** @class */ (function (_super) {
                __extends(WarriorIRUI, _super);
                function WarriorIRUI() {
                    return _super.call(this) || this;
                }
                WarriorIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/itemrender/WarriorIR");
                };
                return WarriorIRUI;
            }(View));
            itemrender.WarriorIRUI = WarriorIRUI;
        })(itemrender = task.itemrender || (task.itemrender = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var TabAchievementUI = /** @class */ (function (_super) {
            __extends(TabAchievementUI, _super);
            function TabAchievementUI() {
                return _super.call(this) || this;
            }
            TabAchievementUI.prototype.createChildren = function () {
                View.regComponent("game.TaskIR", game.TaskIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("task/TabAchievement");
            };
            return TabAchievementUI;
        }(DialogExt));
        task.TabAchievementUI = TabAchievementUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var TabDailyUI = /** @class */ (function (_super) {
            __extends(TabDailyUI, _super);
            function TabDailyUI() {
                return _super.call(this) || this;
            }
            TabDailyUI.prototype.createChildren = function () {
                View.regComponent("game.TaskIR", game.TaskIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("task/TabDaily");
            };
            return TabDailyUI;
        }(View));
        task.TabDailyUI = TabDailyUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var TabTrialUI = /** @class */ (function (_super) {
            __extends(TabTrialUI, _super);
            function TabTrialUI() {
                return _super.call(this) || this;
            }
            TabTrialUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.TrialTaskIR", game.TrialTaskIR);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("task/TabTrial");
            };
            return TabTrialUI;
        }(DialogExt));
        task.TabTrialUI = TabTrialUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var TabWarriorUI = /** @class */ (function (_super) {
            __extends(TabWarriorUI, _super);
            function TabWarriorUI() {
                return _super.call(this) || this;
            }
            TabWarriorUI.prototype.createChildren = function () {
                View.regComponent("game.WarriorIR", game.WarriorIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("task/TabWarrior");
            };
            return TabWarriorUI;
        }(DialogExt));
        task.TabWarriorUI = TabWarriorUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var TaskUI = /** @class */ (function (_super) {
            __extends(TaskUI, _super);
            function TaskUI() {
                return _super.call(this) || this;
            }
            TaskUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("common.ListBase", common.ListBase);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("task/Task");
            };
            return TaskUI;
        }(DialogExt));
        task.TaskUI = TaskUI;
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var warrior;
        (function (warrior) {
            var WarriorBuyLevelUI = /** @class */ (function (_super) {
                __extends(WarriorBuyLevelUI, _super);
                function WarriorBuyLevelUI() {
                    return _super.call(this) || this;
                }
                WarriorBuyLevelUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/warrior/WarriorBuyLevel");
                };
                return WarriorBuyLevelUI;
            }(DialogExt));
            warrior.WarriorBuyLevelUI = WarriorBuyLevelUI;
        })(warrior = task.warrior || (task.warrior = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var task;
    (function (task) {
        var warrior;
        (function (warrior) {
            var WarriorJinjieUI = /** @class */ (function (_super) {
                __extends(WarriorJinjieUI, _super);
                function WarriorJinjieUI() {
                    return _super.call(this) || this;
                }
                WarriorJinjieUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonTitleView", common.CommonTitleView);
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("task/warrior/WarriorJinjie");
                };
                return WarriorJinjieUI;
            }(DialogExt));
            warrior.WarriorJinjieUI = WarriorJinjieUI;
        })(warrior = task.warrior || (task.warrior = {}));
    })(task = ui.task || (ui.task = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var BattleInfoUI = /** @class */ (function (_super) {
            __extends(BattleInfoUI, _super);
            function BattleInfoUI() {
                return _super.call(this) || this;
            }
            BattleInfoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("common.CommonLineupView", common.CommonLineupView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.ItemBox21", common.ItemBox21);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/BattleInfo");
            };
            return BattleInfoUI;
        }(DialogExt));
        teamcopy.BattleInfoUI = BattleInfoUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var RewardIRUI = /** @class */ (function (_super) {
                __extends(RewardIRUI, _super);
                function RewardIRUI() {
                    return _super.call(this) || this;
                }
                RewardIRUI.prototype.createChildren = function () {
                    View.regComponent("common.ItemBox2", common.ItemBox2);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/RewardIR");
                };
                return RewardIRUI;
            }(View));
            render.RewardIRUI = RewardIRUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var TeamApplyRenderUI = /** @class */ (function (_super) {
                __extends(TeamApplyRenderUI, _super);
                function TeamApplyRenderUI() {
                    return _super.call(this) || this;
                }
                TeamApplyRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.HeadBox2", common.HeadBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/TeamApplyRender");
                };
                return TeamApplyRenderUI;
            }(View));
            render.TeamApplyRenderUI = TeamApplyRenderUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var TeamBuildRenderUI = /** @class */ (function (_super) {
                __extends(TeamBuildRenderUI, _super);
                function TeamBuildRenderUI() {
                    return _super.call(this) || this;
                }
                TeamBuildRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/TeamBuildRender");
                };
                return TeamBuildRenderUI;
            }(View));
            render.TeamBuildRenderUI = TeamBuildRenderUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var TeamInfoRenderUI = /** @class */ (function (_super) {
                __extends(TeamInfoRenderUI, _super);
                function TeamInfoRenderUI() {
                    return _super.call(this) || this;
                }
                TeamInfoRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.HeadBox2", common.HeadBox2);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/TeamInfoRender");
                };
                return TeamInfoRenderUI;
            }(View));
            render.TeamInfoRenderUI = TeamInfoRenderUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var TeamInvitationRenderUI = /** @class */ (function (_super) {
                __extends(TeamInvitationRenderUI, _super);
                function TeamInvitationRenderUI() {
                    return _super.call(this) || this;
                }
                TeamInvitationRenderUI.prototype.createChildren = function () {
                    View.regComponent("game.TeamInviteChiRender", game.TeamInviteChiRender);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/TeamInvitationRender");
                };
                return TeamInvitationRenderUI;
            }(View));
            render.TeamInvitationRenderUI = TeamInvitationRenderUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var TeamRankRenderUI = /** @class */ (function (_super) {
                __extends(TeamRankRenderUI, _super);
                function TeamRankRenderUI() {
                    return _super.call(this) || this;
                }
                TeamRankRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.CommonRankIR", common.CommonRankIR);
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/TeamRankRender");
                };
                return TeamRankRenderUI;
            }(View));
            render.TeamRankRenderUI = TeamRankRenderUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var render;
        (function (render) {
            var TeamTransferRenderUI = /** @class */ (function (_super) {
                __extends(TeamTransferRenderUI, _super);
                function TeamTransferRenderUI() {
                    return _super.call(this) || this;
                }
                TeamTransferRenderUI.prototype.createChildren = function () {
                    View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("teamcopy/render/TeamTransferRender");
                };
                return TeamTransferRenderUI;
            }(View));
            render.TeamTransferRenderUI = TeamTransferRenderUI;
        })(render = teamcopy.render || (teamcopy.render = {}));
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamBuildUI = /** @class */ (function (_super) {
            __extends(TeamBuildUI, _super);
            function TeamBuildUI() {
                return _super.call(this) || this;
            }
            TeamBuildUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.TeamBuildRender", game.TeamBuildRender);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamBuild");
            };
            return TeamBuildUI;
        }(DialogExt));
        teamcopy.TeamBuildUI = TeamBuildUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamCopyApplyUI = /** @class */ (function (_super) {
            __extends(TeamCopyApplyUI, _super);
            function TeamCopyApplyUI() {
                return _super.call(this) || this;
            }
            TeamCopyApplyUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.TeamApplyRender", game.TeamApplyRender);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamCopyApply");
            };
            return TeamCopyApplyUI;
        }(DialogExt));
        teamcopy.TeamCopyApplyUI = TeamCopyApplyUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamCopyInvitationUI = /** @class */ (function (_super) {
            __extends(TeamCopyInvitationUI, _super);
            function TeamCopyInvitationUI() {
                return _super.call(this) || this;
            }
            TeamCopyInvitationUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.TeamInviteRender", game.TeamInviteRender);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamCopyInvitation");
            };
            return TeamCopyInvitationUI;
        }(DialogExt));
        teamcopy.TeamCopyInvitationUI = TeamCopyInvitationUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamCopyMainUI = /** @class */ (function (_super) {
            __extends(TeamCopyMainUI, _super);
            function TeamCopyMainUI() {
                return _super.call(this) || this;
            }
            TeamCopyMainUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamCopyMain");
            };
            return TeamCopyMainUI;
        }(DialogExt));
        teamcopy.TeamCopyMainUI = TeamCopyMainUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamCopyRankUI = /** @class */ (function (_super) {
            __extends(TeamCopyRankUI, _super);
            function TeamCopyRankUI() {
                return _super.call(this) || this;
            }
            TeamCopyRankUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.CopyTeamRankRender", game.CopyTeamRankRender);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamCopyRank");
            };
            return TeamCopyRankUI;
        }(DialogExt));
        teamcopy.TeamCopyRankUI = TeamCopyRankUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamCopyRewardUI = /** @class */ (function (_super) {
            __extends(TeamCopyRewardUI, _super);
            function TeamCopyRewardUI() {
                return _super.call(this) || this;
            }
            TeamCopyRewardUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.CopyTeamRewardIR", game.CopyTeamRewardIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamCopyReward");
            };
            return TeamCopyRewardUI;
        }(DialogExt));
        teamcopy.TeamCopyRewardUI = TeamCopyRewardUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var teamCopyStartUI = /** @class */ (function (_super) {
            __extends(teamCopyStartUI, _super);
            function teamCopyStartUI() {
                return _super.call(this) || this;
            }
            teamCopyStartUI.prototype.createChildren = function () {
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/teamCopyStart");
            };
            return teamCopyStartUI;
        }(DialogExt));
        teamcopy.teamCopyStartUI = teamCopyStartUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var TeamInfoUI = /** @class */ (function (_super) {
            __extends(TeamInfoUI, _super);
            function TeamInfoUI() {
                return _super.call(this) || this;
            }
            TeamInfoUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.TeamInfoItemRender", game.TeamInfoItemRender);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/TeamInfo");
            };
            return TeamInfoUI;
        }(DialogExt));
        teamcopy.TeamInfoUI = TeamInfoUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var teamcopy;
    (function (teamcopy) {
        var transferLeaderUI = /** @class */ (function (_super) {
            __extends(transferLeaderUI, _super);
            function transferLeaderUI() {
                return _super.call(this) || this;
            }
            transferLeaderUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.TeamTransferRender", game.TeamTransferRender);
                _super.prototype.createChildren.call(this);
                this.loadUI("teamcopy/transferLeader");
            };
            return transferLeaderUI;
        }(DialogExt));
        teamcopy.transferLeaderUI = transferLeaderUI;
    })(teamcopy = ui.teamcopy || (ui.teamcopy = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var GuanqiaIRUI = /** @class */ (function (_super) {
            __extends(GuanqiaIRUI, _super);
            function GuanqiaIRUI() {
                return _super.call(this) || this;
            }
            GuanqiaIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/GuanqiaIR");
            };
            return GuanqiaIRUI;
        }(View));
        tower.GuanqiaIRUI = GuanqiaIRUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var GuanqiaViewUI = /** @class */ (function (_super) {
            __extends(GuanqiaViewUI, _super);
            function GuanqiaViewUI() {
                return _super.call(this) || this;
            }
            GuanqiaViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.CommonLineupView", common.CommonLineupView);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/GuanqiaView");
            };
            return GuanqiaViewUI;
        }(DialogExt));
        tower.GuanqiaViewUI = GuanqiaViewUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var JiangliIRUI = /** @class */ (function (_super) {
            __extends(JiangliIRUI, _super);
            function JiangliIRUI() {
                return _super.call(this) || this;
            }
            JiangliIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/JiangliIR");
            };
            return JiangliIRUI;
        }(View));
        tower.JiangliIRUI = JiangliIRUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var JiangliViewUI = /** @class */ (function (_super) {
            __extends(JiangliViewUI, _super);
            function JiangliViewUI() {
                return _super.call(this) || this;
            }
            JiangliViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.TowerJiangliIR", game.TowerJiangliIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/JiangliView");
            };
            return JiangliViewUI;
        }(DialogExt));
        tower.JiangliViewUI = JiangliViewUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var RankUI = /** @class */ (function (_super) {
            __extends(RankUI, _super);
            function RankUI() {
                return _super.call(this) || this;
            }
            RankUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.TowerRankIR", game.TowerRankIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/Rank");
            };
            return RankUI;
        }(DialogExt));
        tower.RankUI = RankUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var RankIRUI = /** @class */ (function (_super) {
            __extends(RankIRUI, _super);
            function RankIRUI() {
                return _super.call(this) || this;
            }
            RankIRUI.prototype.createChildren = function () {
                View.regComponent("common.CommonRankIR", common.CommonRankIR);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/RankIR");
            };
            return RankIRUI;
        }(View));
        tower.RankIRUI = RankIRUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tower;
    (function (tower) {
        var shiliantaViewUI = /** @class */ (function (_super) {
            __extends(shiliantaViewUI, _super);
            function shiliantaViewUI() {
                return _super.call(this) || this;
            }
            shiliantaViewUI.prototype.createChildren = function () {
                View.regComponent("game.TowerGuanqiaIR", game.TowerGuanqiaIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("tower/shiliantaView");
            };
            return shiliantaViewUI;
        }(DialogExt));
        tower.shiliantaViewUI = shiliantaViewUI;
    })(tower = ui.tower || (ui.tower = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var AttrViewUI = /** @class */ (function (_super) {
            __extends(AttrViewUI, _super);
            function AttrViewUI() {
                return _super.call(this) || this;
            }
            AttrViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/AttrView");
            };
            return AttrViewUI;
        }(DialogExt));
        tujian.AttrViewUI = AttrViewUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var FateViewUI = /** @class */ (function (_super) {
            __extends(FateViewUI, _super);
            function FateViewUI() {
                return _super.call(this) || this;
            }
            FateViewUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.FateIR", game.FateIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/FateView");
            };
            return FateViewUI;
        }(View));
        tujian.FateViewUI = FateViewUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var PingjiaUI = /** @class */ (function (_super) {
            __extends(PingjiaUI, _super);
            function PingjiaUI() {
                return _super.call(this) || this;
            }
            PingjiaUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/Pingjia");
            };
            return PingjiaUI;
        }(DialogExt));
        tujian.PingjiaUI = PingjiaUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var PingjiaShuruUI = /** @class */ (function (_super) {
            __extends(PingjiaShuruUI, _super);
            function PingjiaShuruUI() {
                return _super.call(this) || this;
            }
            PingjiaShuruUI.prototype.createChildren = function () {
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/PingjiaShuru");
            };
            return PingjiaShuruUI;
        }(DialogExt));
        tujian.PingjiaShuruUI = PingjiaShuruUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var render;
        (function (render) {
            var FateIRUI = /** @class */ (function (_super) {
                __extends(FateIRUI, _super);
                function FateIRUI() {
                    return _super.call(this) || this;
                }
                FateIRUI.prototype.createChildren = function () {
                    View.regComponent("common.HeadBox2", common.HeadBox2);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("tujian/render/FateIR");
                };
                return FateIRUI;
            }(View));
            render.FateIRUI = FateIRUI;
        })(render = tujian.render || (tujian.render = {}));
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var render;
        (function (render) {
            var pingjiaIRUI = /** @class */ (function (_super) {
                __extends(pingjiaIRUI, _super);
                function pingjiaIRUI() {
                    return _super.call(this) || this;
                }
                pingjiaIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("tujian/render/pingjiaIR");
                };
                return pingjiaIRUI;
            }(View));
            render.pingjiaIRUI = pingjiaIRUI;
        })(render = tujian.render || (tujian.render = {}));
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var render;
        (function (render) {
            var TuijianIRUI = /** @class */ (function (_super) {
                __extends(TuijianIRUI, _super);
                function TuijianIRUI() {
                    return _super.call(this) || this;
                }
                TuijianIRUI.prototype.createChildren = function () {
                    View.regComponent("common.HeadBox", common.HeadBox);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("tujian/render/TuijianIR");
                };
                return TuijianIRUI;
            }(View));
            render.TuijianIRUI = TuijianIRUI;
        })(render = tujian.render || (tujian.render = {}));
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var render;
        (function (render) {
            var TujianIRUI = /** @class */ (function (_super) {
                __extends(TujianIRUI, _super);
                function TujianIRUI() {
                    return _super.call(this) || this;
                }
                TujianIRUI.prototype.createChildren = function () {
                    View.regComponent("common.GodStarInfo", common.GodStarInfo);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("tujian/render/TujianIR");
                };
                return TujianIRUI;
            }(View));
            render.TujianIRUI = TujianIRUI;
        })(render = tujian.render || (tujian.render = {}));
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var render;
        (function (render) {
            var YeqianIRUI = /** @class */ (function (_super) {
                __extends(YeqianIRUI, _super);
                function YeqianIRUI() {
                    return _super.call(this) || this;
                }
                YeqianIRUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadUI("tujian/render/YeqianIR");
                };
                return YeqianIRUI;
            }(View));
            render.YeqianIRUI = YeqianIRUI;
        })(render = tujian.render || (tujian.render = {}));
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var TabFateUI = /** @class */ (function (_super) {
            __extends(TabFateUI, _super);
            function TabFateUI() {
                return _super.call(this) || this;
            }
            TabFateUI.prototype.createChildren = function () {
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("game.FateIR", game.FateIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/TabFate");
            };
            return TabFateUI;
        }(View));
        tujian.TabFateUI = TabFateUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var TabTuijianUI = /** @class */ (function (_super) {
            __extends(TabTuijianUI, _super);
            function TabTuijianUI() {
                return _super.call(this) || this;
            }
            TabTuijianUI.prototype.createChildren = function () {
                View.regComponent("game.TujianHeadIR", game.TujianHeadIR);
                View.regComponent("game.YeqianIR", game.YeqianIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/TabTuijian");
            };
            return TabTuijianUI;
        }(View));
        tujian.TabTuijianUI = TabTuijianUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var TabTujianUI = /** @class */ (function (_super) {
            __extends(TabTujianUI, _super);
            function TabTujianUI() {
                return _super.call(this) || this;
            }
            TabTujianUI.prototype.createChildren = function () {
                View.regComponent("game.TujianIR", game.TujianIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.RaceBox", common.RaceBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/TabTujian");
            };
            return TabTujianUI;
        }(DialogExt));
        tujian.TabTujianUI = TabTujianUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var TuijianViewUI = /** @class */ (function (_super) {
            __extends(TuijianViewUI, _super);
            function TuijianViewUI() {
                return _super.call(this) || this;
            }
            TuijianViewUI.prototype.createChildren = function () {
                View.regComponent("game.TujianHeadIR", game.TujianHeadIR);
                View.regComponent("game.YeqianIR", game.YeqianIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/TuijianView");
            };
            return TuijianViewUI;
        }(View));
        tujian.TuijianViewUI = TuijianViewUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var TujianHeroUI = /** @class */ (function (_super) {
            __extends(TujianHeroUI, _super);
            function TujianHeroUI() {
                return _super.call(this) || this;
            }
            TujianHeroUI.prototype.createChildren = function () {
                View.regComponent("game.GodSkillItemIR", game.GodSkillItemIR);
                View.regComponent("common.GodStarInfo", common.GodStarInfo);
                View.regComponent("game.SkillInfoBox", game.SkillInfoBox);
                View.regComponent("common.scaleButton", common.scaleButton);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/TujianHero");
            };
            return TujianHeroUI;
        }(DialogExt));
        tujian.TujianHeroUI = TujianHeroUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var tujian;
    (function (tujian) {
        var TujianViewUI = /** @class */ (function (_super) {
            __extends(TujianViewUI, _super);
            function TujianViewUI() {
                return _super.call(this) || this;
            }
            TujianViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle5View", common.CommonTitle5View);
                View.regComponent("game.TujianIR", game.TujianIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("common.RaceBox", common.RaceBox);
                View.regComponent("game.TuijianView", game.TuijianView);
                View.regComponent("game.FateView", game.FateView);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("tujian/TujianView");
            };
            return TujianViewUI;
        }(DialogExt));
        tujian.TujianViewUI = TujianViewUI;
    })(tujian = ui.tujian || (ui.tujian = {}));
})(ui || (ui = {}));
(function (ui) {
    var uproad;
    (function (uproad) {
        var UpRoadEntranceUI = /** @class */ (function (_super) {
            __extends(UpRoadEntranceUI, _super);
            function UpRoadEntranceUI() {
                return _super.call(this) || this;
            }
            UpRoadEntranceUI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("uproad/UpRoadEntrance");
            };
            return UpRoadEntranceUI;
        }(View));
        uproad.UpRoadEntranceUI = UpRoadEntranceUI;
    })(uproad = ui.uproad || (ui.uproad = {}));
})(ui || (ui = {}));
(function (ui) {
    var uproad;
    (function (uproad) {
        var UpRoadSuccesssViewUI = /** @class */ (function (_super) {
            __extends(UpRoadSuccesssViewUI, _super);
            function UpRoadSuccesssViewUI() {
                return _super.call(this) || this;
            }
            UpRoadSuccesssViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitleView", common.CommonTitleView);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("uproad/UpRoadSuccesssView");
            };
            return UpRoadSuccesssViewUI;
        }(DialogExt));
        uproad.UpRoadSuccesssViewUI = UpRoadSuccesssViewUI;
    })(uproad = ui.uproad || (ui.uproad = {}));
})(ui || (ui = {}));
(function (ui) {
    var uproad;
    (function (uproad) {
        var UpRoadTabIRUI = /** @class */ (function (_super) {
            __extends(UpRoadTabIRUI, _super);
            function UpRoadTabIRUI() {
                return _super.call(this) || this;
            }
            UpRoadTabIRUI.prototype.createChildren = function () {
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("uproad/UpRoadTabIR");
            };
            return UpRoadTabIRUI;
        }(View));
        uproad.UpRoadTabIRUI = UpRoadTabIRUI;
    })(uproad = ui.uproad || (ui.uproad = {}));
})(ui || (ui = {}));
(function (ui) {
    var uproad;
    (function (uproad) {
        var UpRoadTaskIRUI = /** @class */ (function (_super) {
            __extends(UpRoadTaskIRUI, _super);
            function UpRoadTaskIRUI() {
                return _super.call(this) || this;
            }
            UpRoadTaskIRUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.loadUI("uproad/UpRoadTaskIR");
            };
            return UpRoadTaskIRUI;
        }(View));
        uproad.UpRoadTaskIRUI = UpRoadTaskIRUI;
    })(uproad = ui.uproad || (ui.uproad = {}));
})(ui || (ui = {}));
(function (ui) {
    var uproad;
    (function (uproad) {
        var UpRoadViewUI = /** @class */ (function (_super) {
            __extends(UpRoadViewUI, _super);
            function UpRoadViewUI() {
                return _super.call(this) || this;
            }
            UpRoadViewUI.prototype.createChildren = function () {
                View.regComponent("common.ItemBox", common.ItemBox);
                View.regComponent("game.UpRoadTabIR", game.UpRoadTabIR);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("game.UpRoadTaskIR", game.UpRoadTaskIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("uproad/UpRoadView");
            };
            return UpRoadViewUI;
        }(DialogExt));
        uproad.UpRoadViewUI = UpRoadViewUI;
    })(uproad = ui.uproad || (ui.uproad = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var BaoxiangIRUI = /** @class */ (function (_super) {
            __extends(BaoxiangIRUI, _super);
            function BaoxiangIRUI() {
                return _super.call(this) || this;
            }
            BaoxiangIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/BaoxiangIR");
            };
            return BaoxiangIRUI;
        }(View));
        yuanzheng.BaoxiangIRUI = BaoxiangIRUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var ChallengeInfoViewUI = /** @class */ (function (_super) {
            __extends(ChallengeInfoViewUI, _super);
            function ChallengeInfoViewUI() {
                return _super.call(this) || this;
            }
            ChallengeInfoViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle4View", common.CommonTitle4View);
                View.regComponent("game.BuzhenGodIR", game.BuzhenGodIR);
                View.regComponent("common.UserHeadBox1", common.UserHeadBox1);
                View.regComponent("common.ItemBox2", common.ItemBox2);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                View.regComponent("game.GuanghuanView", game.GuanghuanView);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/ChallengeInfoView");
            };
            return ChallengeInfoViewUI;
        }(DialogExt));
        yuanzheng.ChallengeInfoViewUI = ChallengeInfoViewUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var GuanqiaIRUI = /** @class */ (function (_super) {
            __extends(GuanqiaIRUI, _super);
            function GuanqiaIRUI() {
                return _super.call(this) || this;
            }
            GuanqiaIRUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/GuanqiaIR");
            };
            return GuanqiaIRUI;
        }(View));
        yuanzheng.GuanqiaIRUI = GuanqiaIRUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var HelpFriendIRUI = /** @class */ (function (_super) {
            __extends(HelpFriendIRUI, _super);
            function HelpFriendIRUI() {
                return _super.call(this) || this;
            }
            HelpFriendIRUI.prototype.createChildren = function () {
                View.regComponent("common.HeadBox2", common.HeadBox2);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/HelpFriendIR");
            };
            return HelpFriendIRUI;
        }(View));
        yuanzheng.HelpFriendIRUI = HelpFriendIRUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var HelpMeIRUI = /** @class */ (function (_super) {
            __extends(HelpMeIRUI, _super);
            function HelpMeIRUI() {
                return _super.call(this) || this;
            }
            HelpMeIRUI.prototype.createChildren = function () {
                View.regComponent("common.HeadBox2", common.HeadBox2);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/HelpMeIR");
            };
            return HelpMeIRUI;
        }(View));
        yuanzheng.HelpMeIRUI = HelpMeIRUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var HelpViewUI = /** @class */ (function (_super) {
            __extends(HelpViewUI, _super);
            function HelpViewUI() {
                return _super.call(this) || this;
            }
            HelpViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.YZHelpFriendIR", game.YZHelpFriendIR);
                View.regComponent("game.YZHelpMeIR", game.YZHelpMeIR);
                View.regComponent("game.RedPointProp", game.RedPointProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/HelpView");
            };
            return HelpViewUI;
        }(DialogExt));
        yuanzheng.HelpViewUI = HelpViewUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var HuifuViewUI = /** @class */ (function (_super) {
            __extends(HuifuViewUI, _super);
            function HuifuViewUI() {
                return _super.call(this) || this;
            }
            HuifuViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("game.BuzhenGodIR", game.BuzhenGodIR);
                View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/HuifuView");
            };
            return HuifuViewUI;
        }(DialogExt));
        yuanzheng.HuifuViewUI = HuifuViewUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var JiangliViewUI = /** @class */ (function (_super) {
            __extends(JiangliViewUI, _super);
            function JiangliViewUI() {
                return _super.call(this) || this;
            }
            JiangliViewUI.prototype.createChildren = function () {
                View.regComponent("common.CommonTitle6View", common.CommonTitle6View);
                View.regComponent("common.ItemBox", common.ItemBox);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/JiangliView");
            };
            return JiangliViewUI;
        }(DialogExt));
        yuanzheng.JiangliViewUI = JiangliViewUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var yuanzheng;
    (function (yuanzheng) {
        var YuanzhengViewUI = /** @class */ (function (_super) {
            __extends(YuanzhengViewUI, _super);
            function YuanzhengViewUI() {
                return _super.call(this) || this;
            }
            YuanzhengViewUI.prototype.createChildren = function () {
                View.regComponent("game.YZGuanqiaIR", game.YZGuanqiaIR);
                View.regComponent("game.YZBaoxiangIR", game.YZBaoxiangIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("yuanzheng/YuanzhengView");
            };
            return YuanzhengViewUI;
        }(DialogExt));
        yuanzheng.YuanzhengViewUI = YuanzhengViewUI;
    })(yuanzheng = ui.yuanzheng || (ui.yuanzheng = {}));
})(ui || (ui = {}));
(function (ui) {
    var zhaohuan;
    (function (zhaohuan) {
        var render;
        (function (render) {
            var ZhaohuanBoxUI = /** @class */ (function (_super) {
                __extends(ZhaohuanBoxUI, _super);
                function ZhaohuanBoxUI() {
                    return _super.call(this) || this;
                }
                ZhaohuanBoxUI.prototype.createChildren = function () {
                    View.regComponent("game.TujianIR", game.TujianIR);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("zhaohuan/render/ZhaohuanBox");
                };
                return ZhaohuanBoxUI;
            }(View));
            render.ZhaohuanBoxUI = ZhaohuanBoxUI;
        })(render = zhaohuan.render || (zhaohuan.render = {}));
    })(zhaohuan = ui.zhaohuan || (ui.zhaohuan = {}));
})(ui || (ui = {}));
(function (ui) {
    var zhaohuan;
    (function (zhaohuan) {
        var render;
        (function (render) {
            var ZhaohuanIRUI = /** @class */ (function (_super) {
                __extends(ZhaohuanIRUI, _super);
                function ZhaohuanIRUI() {
                    return _super.call(this) || this;
                }
                ZhaohuanIRUI.prototype.createChildren = function () {
                    View.regComponent("common.scaleButton", common.scaleButton);
                    View.regComponent("common.SoundEffectProp", common.SoundEffectProp);
                    View.regComponent("game.RedPointProp", game.RedPointProp);
                    _super.prototype.createChildren.call(this);
                    this.loadUI("zhaohuan/render/ZhaohuanIR");
                };
                return ZhaohuanIRUI;
            }(View));
            render.ZhaohuanIRUI = ZhaohuanIRUI;
        })(render = zhaohuan.render || (zhaohuan.render = {}));
    })(zhaohuan = ui.zhaohuan || (ui.zhaohuan = {}));
})(ui || (ui = {}));
(function (ui) {
    var zhaohuan;
    (function (zhaohuan) {
        var ResultUI = /** @class */ (function (_super) {
            __extends(ResultUI, _super);
            function ResultUI() {
                return _super.call(this) || this;
            }
            ResultUI.prototype.createChildren = function () {
                View.regComponent("game.ZhaohuanBoxIR", game.ZhaohuanBoxIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("zhaohuan/Result");
            };
            return ResultUI;
        }(DialogExt));
        zhaohuan.ResultUI = ResultUI;
    })(zhaohuan = ui.zhaohuan || (ui.zhaohuan = {}));
})(ui || (ui = {}));
(function (ui) {
    var zhaohuan;
    (function (zhaohuan) {
        var ZhaohuanUI = /** @class */ (function (_super) {
            __extends(ZhaohuanUI, _super);
            function ZhaohuanUI() {
                return _super.call(this) || this;
            }
            ZhaohuanUI.prototype.createChildren = function () {
                View.regComponent("game.ZhaohuanIR", game.ZhaohuanIR);
                _super.prototype.createChildren.call(this);
                this.loadUI("zhaohuan/Zhaohuan");
            };
            return ZhaohuanUI;
        }(DialogExt));
        zhaohuan.ZhaohuanUI = ZhaohuanUI;
    })(zhaohuan = ui.zhaohuan || (ui.zhaohuan = {}));
})(ui || (ui = {}));
