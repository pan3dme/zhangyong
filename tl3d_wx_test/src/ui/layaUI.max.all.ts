
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import DialogExt=common.DialogExt;

module ui.activity.bindPhone {
    export class BindPhoneUI extends DialogExt {
		public bgPanel:common.CommonTitleView;
		public btn_recive:Laya.Button;
		public list_reward:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitleView",common.CommonTitleView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("activity/bindPhone/BindPhone");

        }

    }
}

module ui.activity.chongzhi {
    export class BuySuccUI extends DialogExt {
		public lab_score:Laya.Label;
		public list_item:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/chongzhi/BuySucc");

        }

    }
}

module ui.activity.chongzhi {
    export class ChongzhiUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_bg:Laya.Image;
		public probar_exp:Laya.ProgressBar;
		public explabui:Laya.Label;
		public btn_tequan:Laya.Button;
		public btn_chongzhi:Laya.Button;
		public img_vip:Laya.Image;
		public lbl_vip:Laya.Label;
		public box_nextlv:Laya.Box;
		public lab_more:Laya.Label;
		public lab_nextlv:Laya.Label;
		public view_tequan:game.TabTequan;
		public box_cz:Laya.Box;
		public list_item:Laya.List;
		public btnClose:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.TabTequan",game.TabTequan);
			View.regComponent("game.ChongzhiIR",game.ChongzhiIR);

            super.createChildren();
            this.loadUI("activity/chongzhi/Chongzhi");

        }

    }
}

module ui.activity.chongzhi {
    export class ChongzhiIRUI extends View {
		public img_bg:Laya.Image;
		public img_type:Laya.Image;
		public img_info:Laya.Image;
		public lab_money:Laya.Label;
		public lab_extra:Laya.Label;
		public lab_extra_1:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/chongzhi/ChongzhiIR");

        }

    }
}

module ui.activity.chongzhi {
    export class RechargeGiftSuccUI extends DialogExt {
		public eff_guang:Laya.Animation;
		public btnComfirnm:Laya.Button;
		public list:Laya.List;
		public lab_score:Laya.Label;
		public lab_tq:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/chongzhi/RechargeGiftSucc");

        }

    }
}

module ui.activity.chongzhi {
    export class RechargeSuccUI extends DialogExt {
		public box_light_eff:Laya.Box;
		public eff_guang:Laya.Animation;
		public imgLeft:Laya.Image;
		public imgRight:Laya.Image;
		public list:Laya.List;
		public box_zhonshen:Laya.Box;
		public box_yueka:Laya.Box;
		public lab_yueka:Laya.Label;
		public box_extra:Laya.Box;
		public lab_extra:Laya.Label;
		public lab_score:Laya.Label;
		public lab_diamonds:Laya.Label;
		public lab_gift_title:Laya.Label;
		public btnComfirnm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/chongzhi/RechargeSucc");

        }

    }
}

module ui.activity.chongzhi {
    export class TabTequanUI extends View {
		public img_vip:Laya.Label;
		public btn_left:common.scaleButton;
		public img_rpleft:Laya.Image;
		public btn_right:common.scaleButton;
		public img_rpright:Laya.Image;
		public list_tequaninfo:Laya.List;
		public lab_vip:Laya.Label;
		public list_icon:Laya.List;
		public lab_yuanjia:Laya.Label;
		public lab_xianjia:Laya.Label;
		public img_hasbuy:Laya.Image;
		public btn_buy:Laya.Button;
		public img_rpbuy:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.TeQuanItemIR",game.TeQuanItemIR);

            super.createChildren();
            this.loadUI("activity/chongzhi/TabTequan");

        }

    }
}

module ui.activity.chongzhi {
    export class teQuanItemIRUI extends DialogExt {
		public eff:Laya.Animation;
		public ui_item:common.ItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/chongzhi/teQuanItemIR");

        }

    }
}

module ui.activity.download {
    export class WeiDuanXiaZaiViewUI extends DialogExt {
		public itemlists:Laya.List;
		public lab_price:Laya.Label;
		public btn_download:Laya.Button;
		public btnClose:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/download/WeiDuanXiaZaiView");

        }

    }
}

module ui.activity.huodong.luckyturn {
    export class luckyRecordUI extends DialogExt {
		public bgPanel:common.CommonTitle2View;
		public img_bg:Laya.Image;
		public recordList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle2View",common.CommonTitle2View);

            super.createChildren();
            this.loadUI("activity/huodong/luckyturn/luckyRecord");

        }

    }
}

module ui.activity.huodong.luckyturn {
    export class luckyturnUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tab:Laya.List;
		public selectBox0:Laya.Animation;
		public selectBox1:Laya.Animation;
		public selectBox2:Laya.Animation;
		public img_bg:Laya.Image;
		public box_turn:Laya.Box;
		public ui_item_0:common.ItemBox3;
		public ui_item_1:common.ItemBox3;
		public ui_item_2:common.ItemBox3;
		public ui_item_3:common.ItemBox3;
		public ui_item_4:common.ItemBox3;
		public ui_item_5:common.ItemBox3;
		public ui_item_6:common.ItemBox3;
		public ui_item_7:common.ItemBox3;
		public ani_point:Laya.Animation;
		public img_record:Laya.Image;
		public img_ten:Laya.Image;
		public img_one:Laya.Image;
		public img_cost_one:Laya.Image;
		public img_cost_ten:Laya.Image;
		public ui_red:game.RedPointProp;
		public chk_jump:Laya.CheckBox;
		public pro_luck:Laya.ProgressBar;
		public lab_cost_ten:Laya.Label;
		public lab_cost_one:Laya.Label;
		public lab_luck_val:Laya.Label;
		public lab_luck_title:Laya.Label;
		public lab_time:Laya.Label;
		public lab_title1:Laya.Label;
		public lab_title:Laya.Label;
		public lab_god:Laya.Label;
		public box_sw:Laya.Box;
		public ani_sw_eff:Laya.Animation;
		public img_sw_box:Laya.Image;
		public box_equip:Laya.Box;
		public img_equip_light_0:Laya.Image;
		public img_equip_light_1:Laya.Image;
		public img_equip_light_2:Laya.Image;
		public img_equip_light_3:Laya.Image;
		public ui_equip_item_0:common.ItemBox2;
		public ui_equip_item_1:common.ItemBox2;
		public ui_equip_item_2:common.ItemBox2;
		public ui_equip_item_3:common.ItemBox2;
		public img_equip_receive_0:Laya.Image;
		public img_equip_receive_1:Laya.Image;
		public img_equip_receive_2:Laya.Image;
		public img_equip_receive_3:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.ItemBox3",common.ItemBox3);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("activity/huodong/luckyturn/luckyturn");

        }

    }
}

module ui.activity.huodong.luckyturn.Tip {
    export class TurnRewardUI extends DialogExt {
		public bgPanel:common.CommonTitle9View;
		public itemList:Laya.List;
		public btnBuy:Laya.Button;
		public btn_close:Laya.Button;
		public box_cost:Laya.Box;
		public lbCost:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle9View",common.CommonTitle9View);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/luckyturn/Tip/TurnReward");

        }

    }
}

module ui.activity.huodong.welfare {
    export class payActivityUI extends DialogExt {
		public img_bg:Laya.Image;
		public imgTitle:Laya.Image;
		public boxTop:Laya.Box;
		public boxRes:Laya.HBox;
		public btn_addgold:Laya.Image;
		public lab_money:Laya.Label;
		public btn_add_zuanshi:Laya.Image;
		public lab_zuanshi:Laya.Label;
		public list_btn:Laya.List;
		public btnClose:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.PayActivityTabIR",game.PayActivityTabIR);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/payActivity");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class DengjilibaoRenderUI extends View {
		public lab_level:Laya.Label;
		public list_item:Laya.List;
		public btn_lingqu:Laya.Button;
		public img_already:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/DengjilibaoRender");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class EquipExtIRUI extends View {
		public imgBg:Laya.Image;
		public item:common.ItemBox;
		public imgReward:Laya.Image;
		public lbLucky:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/EquipExtIR");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class LibaoIRUI extends View {
		public listItem:Laya.List;
		public btnBuy:Laya.Button;
		public imgDiscount:Laya.Image;
		public imgYigoumai:Laya.Image;
		public lbNum:Laya.Label;
		public lbDiscount:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/LibaoIR");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class QiandaoRenderUI extends View {
		public box_item:common.ItemBox;
		public img_already:Laya.Image;
		public img_repair:Laya.Image;
		public lbday:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/QiandaoRender");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class RatingfundRenderUI extends View {
		public lab_level:Laya.Label;
		public btn_lingqu:Laya.Button;
		public img_already:Laya.Image;
		public list_item:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/RatingfundRender");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class toSignIRUI extends View {
		public lbLv:Laya.Label;
		public itemList:Laya.List;
		public btnSure:Laya.Button;
		public img_receive:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/toSignIR");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class TotalsignRenderUI extends View {
		public imgBg:Laya.Image;
		public itemBox:common.ItemBox;
		public img_already:Laya.Image;
		public lab_days:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/TotalsignRender");

        }

    }
}

module ui.activity.huodong.welfare.render {
    export class YueKaItemIRUI extends DialogExt {
		public ui_item:common.ItemBox;
		public img_receivebg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/render/YueKaItemIR");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class DengjiUI extends DialogExt {
		public list_jiangli:Laya.List;
		public img_side2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.LvGiftIR",game.LvGiftIR);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/Dengji");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class DuihuanUI extends DialogExt {
		public input_duihuanma:Laya.TextInput;
		public btn_duihuan:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/Duihuan");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class JijinUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public list_itemJijin:Laya.List;
		public lab_vip:Laya.Label;
		public btn_recharge:Laya.Button;
		public redpoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.FundIR",game.FundIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/Jijin");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class SignUI extends DialogExt {
		public imgcost:Laya.Image;
		public progress:Laya.ProgressBar;
		public list_item:Laya.List;
		public list_totalsign:Laya.List;
		public btn_sign:Laya.Button;
		public lbcost:Laya.Label;
		public lab_totalSign:Laya.Label;
		public lab_resetDays:Laya.Label;
		public lab_buqian:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.SignInIR",game.SignInIR);
			View.regComponent("game.TotalsignIR",game.TotalsignIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/Sign");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class toSignUI extends DialogExt {
		public itemList:Laya.List;
		public lab_totalday:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TosignIR",game.TosignIR);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/toSign");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class XianGouLibaoUI extends DialogExt {
		public listLibao:Laya.List;
		public img_time:Laya.Image;
		public lbTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.XiangouLibaoIR",game.XiangouLibaoIR);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/XianGouLibao");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class XuyuanUI extends DialogExt {
		public label_freetime:Laya.Label;
		public label_vowcount:Laya.Label;
		public btn_tip:common.scaleButton;
		public itemBoxs:Laya.Box;
		public item0:common.ItemBox3;
		public item1:common.ItemBox3;
		public item2:common.ItemBox3;
		public item3:common.ItemBox3;
		public item4:common.ItemBox3;
		public item5:common.ItemBox3;
		public item6:common.ItemBox3;
		public item7:common.ItemBox3;
		public box_center:Laya.Box;
		public img_ten:common.scaleButton;
		public img_cost_ten:Laya.Image;
		public lab_cost_ten:Laya.Label;
		public lab_morenum:Laya.Label;
		public img_one:common.scaleButton;
		public img_cost_one:Laya.Image;
		public lab_cost_one:Laya.Label;
		public chk_jump:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.ItemBox3",common.ItemBox3);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/Xuyuan");

        }

    }
}

module ui.activity.huodong.welfare.tab {
    export class YuekaUI extends DialogExt {
		public box_card1:Laya.Box;
		public btn_getyueka:Laya.Button;
		public yuekaRP:game.RedPointProp;
		public list_yueka:Laya.List;
		public lab_time:Laya.Label;
		public img_yk_receive:Laya.Image;
		public box_card2:Laya.Box;
		public btn_zhongsheng:Laya.Button;
		public lifeRP:game.RedPointProp;
		public list_zhonghsenka:Laya.List;
		public img_zs_receive:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.YueKaItemIR",game.YueKaItemIR);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/tab/Yueka");

        }

    }
}

module ui.activity.huodong.welfare {
    export class welfareUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_btn:Laya.List;
		public btn_right:Laya.Button;
		public btn_left:Laya.Button;
		public btnClose:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.WelfareIR",game.WelfareIR);

            super.createChildren();
            this.loadUI("activity/huodong/welfare/welfare");

        }

    }
}

module ui.activity.limitebuy {
    export class JiangLiUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_jiangli:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.JiangliIR",game.JiangliIR);

            super.createChildren();
            this.loadUI("activity/limitebuy/JiangLi");

        }

    }
}

module ui.activity.limitebuy {
    export class LimiteBuyUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_tab:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.LbTabIR",game.LbTabIR);

            super.createChildren();
            this.loadUI("activity/limitebuy/LimiteBuy");

        }

    }
}

module ui.activity.limitebuy.render {
    export class ItemSelectBoxUI extends View {
		public ui_item:common.ItemBox;
		public anim_select:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/limitebuy/render/ItemSelectBox");

        }

    }
}

module ui.activity.limitebuy.render {
    export class JiangliIRUI extends View {
		public img_first:Laya.Image;
		public lb_rank:Laya.Label;
		public lb_score:Laya.Label;
		public list_items:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/limitebuy/render/JiangliIR");

        }

    }
}

module ui.activity.limitebuy.render {
    export class RankIRUI extends View {
		public lb_rank:Laya.Label;
		public lb_name:Laya.Label;
		public lb_score:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/limitebuy/render/RankIR");

        }

    }
}

module ui.activity.limitebuy.render {
    export class ScoreIRUI extends View {
		public img_guang:Laya.Image;
		public img_baoxiang:Laya.Image;
		public img_redpoint:Laya.Image;
		public lb_costscore:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/limitebuy/render/ScoreIR");

        }

    }
}

module ui.activity.limitebuy.render {
    export class ZheKouIRUI extends View {
		public lb_zhe:Laya.Label;
		public lb_num:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/limitebuy/render/ZheKouIR");

        }

    }
}

module ui.activity.limitebuy.tab {
    export class TabGroupUI extends View {
		public pg_zhekou:Laya.ProgressBar;
		public list_item:Laya.List;
		public list_zhekou:Laya.List;
		public btn_left:Laya.Button;
		public btn_right:Laya.Button;
		public btn_buy:Laya.Button;
		public lb_time:Laya.Label;
		public lb_allbuy:Laya.Label;
		public lb_buy:Laya.Label;
		public lb_cost:Laya.Label;
		public view_item:common.ItemBox;
		public box_model:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ItemSelectBox",game.ItemSelectBox);
			View.regComponent("game.ZheKouIR",game.ZheKouIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/limitebuy/tab/TabGroup");

        }

    }
}

module ui.activity.limitebuy.tab {
    export class TabSummonUI extends View {
		public img_di:Laya.Image;
		public img_moredi:Laya.Image;
		public img_progress:Laya.Image;
		public lb_time:Laya.Label;
		public lb_more:Laya.Label;
		public lb_cishu:Laya.Label;
		public lb_name:Laya.Label;
		public lb_mymess:Laya.Label;
		public lb_costone:Laya.Label;
		public lb_costten:Laya.Label;
		public list_rank:Laya.List;
		public list_starts:Laya.List;
		public btn_shuaxin:common.scaleButton;
		public btn_buyten:Laya.Button;
		public btn_buyone:Laya.Button;
		public btn_jiangli:Laya.Button;
		public img_more:Laya.Image;
		public img_cost:Laya.Image;
		public img_redpoint:Laya.Image;
		public box_btn_more:Laya.Box;
		public box_model:Laya.Box;
		public item1:game.ScoreIR;
		public item2:game.ScoreIR;
		public item3:game.ScoreIR;
		public item4:game.ScoreIR;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.LbRankIR",game.LbRankIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.ScoreIR",game.ScoreIR);

            super.createChildren();
            this.loadUI("activity/limitebuy/tab/TabSummon");

        }

    }
}

module ui.activity.logingift {
    export class logingiftUI extends DialogExt {
		public img_title:Laya.Image;
		public ui_day_0:ui.activity.logingift.logingiftIRUI;
		public ui_day_1:ui.activity.logingift.logingiftIRUI;
		public ui_day_2:ui.activity.logingift.logingiftIRUI;
		public ui_day_3:ui.activity.logingift.logingiftIRUI;
		public ui_day_4:ui.activity.logingift.logingiftIRUI;
		public ui_day_5:ui.activity.logingift.logingiftIRUI;
		public ui_day_6:ui.activity.logingift.logingiftIRUI;
		public ui_item_0:common.ItemBox;
		public ui_item_1:common.ItemBox;
		public ui_item_2:common.ItemBox;
		public ui_item_3:common.ItemBox;
		public btn_receive:Laya.Button;
		public lab_day:Laya.Label;
		public img_red:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.activity.logingift.logingiftIRUI",ui.activity.logingift.logingiftIRUI);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/logingift/logingift");

        }

    }
}

module ui.activity.logingift {
    export class logingiftIRUI extends View {
		public img_select:Laya.Image;
		public img_icon:Laya.Image;
		public img_gou:Laya.Image;
		public lab_day:Laya.Label;
		public img_red:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/logingift/logingiftIR");

        }

    }
}

module ui.activity.notice {
    export class GameNoticeUI extends DialogExt {
		public panel_list:Laya.Panel;
		public btnClose:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/notice/GameNotice");

        }

    }
}

module ui.activity.notice {
    export class NoticeIRUI extends View {
		public img_show:Laya.Image;
		public lab_content:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/notice/NoticeIR");

        }

    }
}

module ui.activity.online {
    export class itemIRUI extends DialogExt {
		public img_guang:Laya.Image;
		public ui_item:common.ItemBox;
		public anim_select:Laya.Animation;
		public img_receivebg:Laya.Image;
		public lab_time:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/online/itemIR");

        }

    }
}

module ui.activity.online {
    export class mainPageUI extends DialogExt {
		public list_item:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ItemIR",game.ItemIR);

            super.createChildren();
            this.loadUI("activity/online/mainPage");

        }

    }
}

module ui.activity.openserver {
    export class mainPageUI extends DialogExt {
		public lab_time:Laya.Label;
		public list_tab:Laya.List;
		public ui_tab:game.TabPage;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TabIR",game.TabIR);
			View.regComponent("game.TabPage",game.TabPage);

            super.createChildren();
            this.loadUI("activity/openserver/mainPage");

        }

    }
}

module ui.activity.openserver {
    export class openServerGiftUI extends DialogExt {
		public lab_time:Laya.Label;
		public listitem:Laya.List;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.OpenServerGiftIR",game.OpenServerGiftIR);

            super.createChildren();
            this.loadUI("activity/openserver/openServerGift");

        }

    }
}

module ui.activity.openserver {
    export class openServerGiftIRUI extends View {
		public lab_title:Laya.Label;
		public lab_num:Laya.Label;
		public itemList:Laya.List;
		public btnSure:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/openserver/openServerGiftIR");

        }

    }
}

module ui.activity.openserver {
    export class tabPageUI extends DialogExt {
		public list_reward:Laya.List;
		public btn_buy:Laya.Button;
		public redpoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/openserver/tabPage");

        }

    }
}

module ui.activity.powerrank {
    export class itemIRUI extends DialogExt {
		public imgRank:Laya.Image;
		public list_reward:Laya.List;
		public lbRank:Laya.Label;
		public lab_condition:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("activity/powerrank/itemIR");

        }

    }
}

module ui.activity.powerrank {
    export class mainPageUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_tab:Laya.List;
		public mainview:game.MainTabPage;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.TabIR1",common.TabIR1);
			View.regComponent("game.MainTabPage",game.MainTabPage);

            super.createChildren();
            this.loadUI("activity/powerrank/mainPage");

        }

    }
}

module ui.activity.powerrank {
    export class mainTabPageUI extends DialogExt {
		public imgThirdTY:Laya.Image;
		public imgSecondTY:Laya.Image;
		public imgFirstTY:Laya.Image;
		public imgFirstEmpty:Laya.Image;
		public imgSecondEmpty:Laya.Image;
		public imgThirdEmpty:Laya.Image;
		public boxRole:Laya.Box;
		public boxFirst:Laya.Box;
		public boxThird:Laya.Box;
		public boxSecond:Laya.Box;
		public lab_mypower:Laya.Label;
		public lab_myrank:Laya.Label;
		public lab_time:Laya.Label;
		public lbFisrtDesc:Laya.Label;
		public lbFirstName:Laya.Label;
		public lbFirstEmpty:Laya.Label;
		public lbSecondDesc:Laya.Label;
		public lbSecondName:Laya.Label;
		public lbSecondEmpty:Laya.Label;
		public lbThirdDesc:Laya.Label;
		public lbThirdName:Laya.Label;
		public lbThirdEmpty:Laya.Label;
		public listRank:Laya.List;
		public btnRank:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.PowerAwardIR",game.PowerAwardIR);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("activity/powerrank/mainTabPage");

        }

    }
}

module ui.activity.powerrank {
    export class powerRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_rank:Laya.List;
		public lab_title:Laya.Label;
		public lb_myrank:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.PrRankIR",game.PrRankIR);

            super.createChildren();
            this.loadUI("activity/powerrank/powerRank");

        }

    }
}

module ui.activity.powerrank {
    export class rankIRUI extends View {
		public img_rank:Laya.Image;
		public lb_rank:Laya.Label;
		public lb_name:Laya.Label;
		public lb_guild:Laya.Label;
		public lab_god:Laya.Label;
		public lb_power:Laya.Label;
		public lab_type:Laya.Label;
		public starlist:Laya.List;
		public ui_head:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("activity/powerrank/rankIR");

        }

    }
}

module ui.activity.realName {
    export class realNameUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public itemList:Laya.List;
		public btnSure:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/realName/realName");

        }

    }
}

module ui.activity.sevendays.render {
    export class SevendaysRenderUI extends View {
		public img_labbg:Laya.Image;
		public lab_level:Laya.Label;
		public list_item:Laya.List;
		public btn_lingqu:Laya.Button;
		public img_already:Laya.Image;
		public box_yuanjia:Laya.Box;
		public lab_zuanshi:Laya.Label;
		public btn_buy:Laya.Button;
		public img_zuanshi:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/sevendays/render/SevendaysRender");

        }

    }
}

module ui.activity.sevendays.render {
    export class tabItemRenderUI extends View {
		public btn_tab:Laya.Button;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/sevendays/render/tabItemRender");

        }

    }
}

module ui.activity.sevendays {
    export class sevendaysUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public bgPanel:common.CommonTitle4View;
		public img_title:Laya.Image;
		public list_days:Laya.List;
		public list_today:Laya.List;
		public img_bg:Laya.Image;
		public list_item:Laya.List;
		public lab_endTime:Laya.Label;
		public lab_finish:Laya.Label;
		public boxLiveness:Laya.Box;
		public progressBar:Laya.ProgressBar;
		public btn_sevenDay:common.scaleButton;
		public img_ani:Laya.Image;
		public redPoint_seven:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.tabIR",game.tabIR);
			View.regComponent("common.TabIR1",common.TabIR1);
			View.regComponent("game.SevendaysIR",game.SevendaysIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/sevendays/sevendays");

        }

    }
}

module ui.activity.share {
    export class firstPageUI extends DialogExt {
		public list_reward:Laya.List;
		public btn_recive:Laya.Button;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/share/firstPage");

        }

    }
}

module ui.activity.share {
    export class mainIRUI extends DialogExt {
		public list_reward:Laya.List;
		public btn_recive:Laya.Button;
		public redpoint:game.RedPointProp;
		public lab_title:Laya.Label;
		public lbProgress:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/share/mainIR");

        }

    }
}

module ui.activity.share {
    export class mainPageUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public btn_invite:Laya.Button;
		public list_item:Laya.List;
		public lab_cd:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.ShareMainIR",game.ShareMainIR);

            super.createChildren();
            this.loadUI("activity/share/mainPage");

        }

    }
}

module ui.activity.shouchong {
    export class RewardIRUI extends View {
		public imgAlready:Laya.Image;
		public lbday:Laya.Label;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/shouchong/RewardIR");

        }

    }
}

module ui.activity.shouchong {
    export class ShouchongUI extends DialogExt {
		public viewStack:Laya.ViewStack;
		public listitem_0:ui.activity.shouchong.ShouchongTabOneUI;
		public listitem_1:ui.activity.shouchong.ShouchongTabTwoUI;
		public listitem_2:ui.activity.shouchong.ShouchongTabThreeUI;
		public tabBar:Laya.Tab;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.activity.shouchong.ShouchongTabOneUI",ui.activity.shouchong.ShouchongTabOneUI);
			View.regComponent("ui.activity.shouchong.ShouchongTabTwoUI",ui.activity.shouchong.ShouchongTabTwoUI);
			View.regComponent("ui.activity.shouchong.ShouchongTabThreeUI",ui.activity.shouchong.ShouchongTabThreeUI);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("activity/shouchong/Shouchong");

        }

    }
}

module ui.activity.shouchong {
    export class ShouchongTabOneUI extends DialogExt {
		public img_guang:Laya.Image;
		public btnsure:Laya.Button;
		public list_item:Laya.List;
		public lab_chong:Laya.Label;
		public img_gou0:Laya.Image;
		public img_gou1:Laya.Image;
		public img_gou2:Laya.Image;
		public imgRp:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/shouchong/ShouchongTabOne");

        }

    }
}

module ui.activity.shouchong {
    export class ShouchongTabThreeUI extends DialogExt {
		public btnsure:Laya.Button;
		public list_item:Laya.List;
		public img_gou2:Laya.Image;
		public img_gou1:Laya.Image;
		public img_gou0:Laya.Image;
		public lab_chong:Laya.Label;
		public imgRp:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/shouchong/ShouchongTabThree");

        }

    }
}

module ui.activity.shouchong {
    export class ShouchongTabTwoUI extends DialogExt {
		public btnsure:Laya.Button;
		public list_item:Laya.List;
		public img_gou2:Laya.Image;
		public img_gou1:Laya.Image;
		public img_gou0:Laya.Image;
		public imgRp:Laya.Image;
		public lab_chong:Laya.Label;
		public equip0:Laya.Box;
		public equip1:Laya.Box;
		public equip2:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/shouchong/ShouchongTabTwo");

        }

    }
}

module ui.activity.shouchong {
    export class ShouchongtishiUI extends DialogExt {
		public img_bg:Laya.Image;
		public lab_name:Laya.Label;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("activity/shouchong/Shouchongtishi");

        }

    }
}

module ui.activity.supervip {
    export class SuperVipUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public imgReward:Laya.Image;
		public lbQQ:Laya.Label;
		public lbTitle1:Laya.Label;
		public lbValue1:Laya.Label;
		public lbTitle2:Laya.Label;
		public lbValue2:Laya.Label;
		public btnReward:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/supervip/SuperVip");

        }

    }
}

module ui.activity.testrebate {
    export class TestRebateUI extends DialogExt {
		public lbRecharge:Laya.Label;
		public lbRebate:Laya.Label;
		public btnLingqu:Laya.Button;
		public btnClose:Laya.Button;
		public imgYilingqu:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/testrebate/TestRebate");

        }

    }
}

module ui.activity.timelimitactivity {
    export class ExchangeItemUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public img_bg:Laya.Image;
		public img_type2:Laya.Image;
		public btn_buy:Laya.Button;
		public btn_add:Laya.Button;
		public btn_red:Laya.Button;
		public btn_addTen:Laya.Button;
		public btn_redTen:Laya.Button;
		public itembox:common.ItemBox;
		public are_putin:Laya.TextInput;
		public lab_sum:Laya.Label;
		public lab_rouyu:Laya.Label;
		public lab_name:Laya.Label;
		public lab_overplus:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/timelimitactivity/ExchangeItem");

        }

    }
}

module ui.activity.timelimitactivity {
    export class HuodongRenderUI extends DialogExt {
		public list_reward:Laya.List;
		public btn_receive:Laya.Button;
		public img_bg1:Laya.Image;
		public imgYilingqu:Laya.Image;
		public ui_duihuan:common.ItemBox;
		public lab_times:Laya.Label;
		public lab_title:Laya.Label;
		public img_bg2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/timelimitactivity/HuodongRender");

        }

    }
}

module ui.activity.timelimitactivity {
    export class JiJinIRUI extends View {
		public lbday:Laya.Label;
		public itemList:Laya.List;
		public btn_receive:Laya.Button;
		public img_hasreceive:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/timelimitactivity/JiJinIR");

        }

    }
}

module ui.activity.timelimitactivity {
    export class TimeLimitActivityUI extends DialogExt {
		public img_bg:Laya.Image;
		public boxTop:Laya.Box;
		public boxRes:Laya.HBox;
		public btn_addgold:Laya.Image;
		public lab_money:Laya.Label;
		public btn_add_zuanshi:Laya.Image;
		public lab_zuanshi:Laya.Label;
		public box_cost:Laya.Box;
		public imgCost:Laya.Image;
		public lbNum:Laya.Label;
		public list_tab:Laya.List;
		public box_chongzhi:Laya.Box;
		public img_title:Laya.Image;
		public list_item:Laya.List;
		public imgShalou:Laya.Image;
		public lab_time:Laya.Label;
		public lab_has2:Laya.Label;
		public lab_info:Laya.Label;
		public btnClose:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.TlTabIR",game.TlTabIR);
			View.regComponent("game.TlInfoIR",game.TlInfoIR);

            super.createChildren();
            this.loadUI("activity/timelimitactivity/TimeLimitActivity");

        }

    }
}

module ui.activity.timelimitactivity {
    export class WeekFundUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public btnList:Laya.List;
		public img_type:Laya.Image;
		public lab_activity_title:Laya.Label;
		public lab_sw_open:Laya.Label;
		public box_time:Laya.Box;
		public lab_time:Laya.Label;
		public btn_wenhao:common.scaleButton;
		public list_reward:Laya.List;
		public btn_use:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.FundTabIR",game.FundTabIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.FundRewardIR",game.FundRewardIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("activity/timelimitactivity/WeekFund");

        }

    }
}

module ui.activity.timelimitactivity {
    export class xianshiViewUI extends DialogExt {
		public item_xianshi:common.ItemBox;
		public lab_xianshi:Laya.Label;
		public lab_time1:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("activity/timelimitactivity/xianshiView");

        }

    }
}

module ui.arena.arena {
    export class ArenaUI extends DialogExt {
		public imgBg:Laya.Image;
		public rankList:Laya.List;
		public panel:Laya.Panel;
		public lbhasnum:Laya.Label;
		public lbrankmax:Laya.Label;
		public lbmyrank:Laya.Label;
		public btnbuynum:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ArenaIR",game.ArenaIR);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("arena/arena/Arena");

        }

    }
}

module ui.arena.arena {
    export class ArenaFailUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public channel:common.ChannelBox;
		public hbox:Laya.HBox;
		public lbrank:Laya.Label;
		public lbdoem:Laya.Label;
		public imgchg:Laya.Image;
		public lbright:Laya.Label;
		public rewardList:Laya.List;
		public lbglod:Laya.Label;
		public box_force:Laya.Box;
		public lab_empty:Laya.Label;
		public box_reward:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.ChannelBox",common.ChannelBox);
			View.regComponent("game.ClgRewardIR",game.ClgRewardIR);

            super.createChildren();
            this.loadUI("arena/arena/ArenaFail");

        }

    }
}

module ui.arena.arena {
    export class ArenaRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lbtime:Laya.Label;
		public tab:Laya.Tab;
		public viewstack:Laya.ViewStack;
		public rankList:Laya.List;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.RankIR",common.RankIR);
			View.regComponent("common.AwardRankIR",common.AwardRankIR);

            super.createChildren();
            this.loadUI("arena/arena/ArenaRank");

        }

    }
}

module ui.arena.arena {
    export class ArenaRecordUI extends DialogExt {
		public bgPanel:common.CommonTitle2View;
		public img_bg:Laya.Image;
		public recordList:Laya.List;
		public lab_norecord:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle2View",common.CommonTitle2View);
			View.regComponent("game.ArenaRecordIR",game.ArenaRecordIR);

            super.createChildren();
            this.loadUI("arena/arena/ArenaRecord");

        }

    }
}

module ui.arena.arena {
    export class ArenaSuccUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public lab_rank_title:Laya.Label;
		public lbclose:Laya.Label;
		public lbbox:Laya.Box;
		public hbox:Laya.HBox;
		public lbrank:Laya.Label;
		public lbup:Laya.Label;
		public imgchg:Laya.Image;
		public lbright:Laya.Label;
		public itemList:Laya.List;
		public rewardList:Laya.List;
		public box_reward:Laya.Box;
		public box_chou:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("game.ArenaBrandIR",game.ArenaBrandIR);
			View.regComponent("game.ClgRewardIR",game.ClgRewardIR);

            super.createChildren();
            this.loadUI("arena/arena/ArenaSucc");

        }

    }
}

module ui.arena.arena {
    export class ArenaTopRankUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public lbmax:Laya.Label;
		public lbreward:Laya.Label;
		public hbox:Laya.HBox;
		public lbrank:Laya.Label;
		public lbup:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("arena/arena/ArenaTopRank");

        }

    }
}

module ui.arena.arena.render {
    export class ArenaBrandIRUI extends View {
		public box:Laya.Box;
		public itemBox:common.ItemBox;
		public imgdiscount:Laya.Image;
		public imgcost:Laya.Image;
		public lbcost:Laya.Label;
		public lbdiscount:Laya.Label;
		public btnbuy:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("arena/arena/render/ArenaBrandIR");

        }

    }
}

module ui.arena.arena.render {
    export class ArenaIRUI extends View {
		public imgRank:Laya.Image;
		public imgmyself:Laya.Image;
		public lbrank:Laya.Label;
		public lbshenli:Laya.Label;
		public lbguild:Laya.Label;
		public lbname:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("arena/arena/render/ArenaIR");

        }

    }
}

module ui.arena.arena.render {
    export class ArenaRecordIRUI extends View {
		public btnplay:Laya.Image;
		public lbname:Laya.Label;
		public lbtime:Laya.Label;
		public lbtype:Laya.Label;
		public hbox:Laya.HBox;
		public lbValPre:Laya.Label;
		public lbVal:Laya.Label;
		public imgrank:Laya.Image;
		public lbNone:Laya.Label;
		public headbox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("arena/arena/render/ArenaRecordIR");

        }

    }
}

module ui.arena.match {
    export class MatchMainUI extends DialogExt {
		public imgBg:Laya.Image;
		public imgRole:Laya.Image;
		public lbName:Laya.Label;
		public lbScore:Laya.Label;
		public lbGrade:Laya.Label;
		public lbSYCount:Laya.Label;
		public lbTime:Laya.Label;
		public lbCount:Laya.Label;
		public matchList:Laya.List;
		public box:Laya.Box;
		public imgPb:Laya.ProgressBar;
		public btnRefresh:Laya.Button;
		public btnAdd:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.MatchIR",game.MatchIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("arena/match/MatchMain");

        }

    }
}

module ui.arena.match {
    export class MatchRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabBar:Laya.Tab;
		public lbScoreDesc:Laya.Label;
		public lbScore:Laya.Label;
		public lbRankDesc:Laya.Label;
		public lbRank:Laya.Label;
		public lbGradeDesc:Laya.Label;
		public lbGrade:Laya.Label;
		public rankList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.RankIR",common.RankIR);

            super.createChildren();
            this.loadUI("arena/match/MatchRank");

        }

    }
}

module ui.arena.match {
    export class MatchResultUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public channel:common.ChannelBox;
		public lbBlank:Laya.Label;
		public rewardList:Laya.List;
		public selfHeadBox:common.UserHeadBox1;
		public tarHeadBox:common.UserHeadBox1;
		public lbSelfName:Laya.Label;
		public lbTarName:Laya.Label;
		public lbSelfScore:Laya.Label;
		public lbSelfChg:Laya.Label;
		public lbTarScore:Laya.Label;
		public lbTarChg:Laya.Label;
		public imgForce:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.ChannelBox",common.ChannelBox);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("arena/match/MatchResult");

        }

    }
}

module ui.arena.match {
    export class MatchRewardUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabBar:Laya.Tab;
		public lbDesc:Laya.Label;
		public lbScoreDesc:Laya.Label;
		public lbScore:Laya.Label;
		public lbRankDesc:Laya.Label;
		public lbRank:Laya.Label;
		public lbGradeDesc:Laya.Label;
		public lbGrade:Laya.Label;
		public viewStack:Laya.ViewStack;
		public benfuList:Laya.List;
		public kuafuList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.AwardRankIR",common.AwardRankIR);
			View.regComponent("game.KuafuRewardIR",game.KuafuRewardIR);

            super.createChildren();
            this.loadUI("arena/match/MatchReward");

        }

    }
}

module ui.arena.match.render {
    export class KuafuRewardIRUI extends View {
		public lbName:Laya.Label;
		public lbRank:Laya.Label;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("arena/match/render/KuafuRewardIR");

        }

    }
}

module ui.arena.match.render {
    export class MatchIRUI extends View {
		public lbName:Laya.Label;
		public lbForce:Laya.Label;
		public lbScore:Laya.Label;
		public btnChallenge:Laya.Button;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("arena/match/render/MatchIR");

        }

    }
}

module ui.artifact {
    export class ArtifactUI extends DialogExt {
		public imgBg:Laya.Image;
		public img_weijiesuo:Laya.Box;
		public btnObatin:common.scaleButton;
		public lab_unlock:Laya.Label;
		public lab_share:Laya.Label;
		public boxTop:Laya.Box;
		public list_shenqi:Laya.List;
		public boxBottom:Laya.Box;
		public img_bg:Laya.Image;
		public viewStack:Laya.ViewStack;
		public tab:Laya.List;
		public jichu:Laya.Box;
		public list_sj_attr:Laya.List;
		public btn_strength:Laya.Button;
		public strengthRP:game.RedPointProp;
		public jineng:Laya.Box;
		public ui_skillBox:common.SkillBox;
		public lab_skilldesc:Laya.Label;
		public lab_skillLevel:Laya.Label;
		public lab_skillName:Laya.Label;
		public btn_skillUp:Laya.Button;
		public skillUpRP:game.RedPointProp;
		public tab_baptize:game.TabBaptize;
		public tab_enchant:game.TabEnchant;
		public img_maxLv:Laya.Image;
		public lab_maxLv:Laya.Label;
		public box_cost_all:Laya.Box;
		public box_cost:Laya.HBox;
		public img_cost:Laya.Image;
		public lab_has:Laya.Label;
		public lab_need:Laya.Label;
		public lab_unlock_guanqia:Laya.Label;
		public lab_unlock_unlock:Laya.Label;
		public box_jiesuo:Laya.Box;
		public attrList:Laya.List;
		public ui_maxskill:common.SkillBox;
		public ui_item_cost:common.ItemBox;
		public lab_cost_has:Laya.Label;
		public lab_cost_need:Laya.Label;
		public btn_unlock:Laya.Button;
		public btn_unlock_red:game.RedPointProp;
		public lab_jiesuoname:Laya.Label;
		public lbskill:Laya.Label;
		public lbskilldesc:Laya.Label;
		public lab_artifaceinfo:Laya.Label;
		public btn_artifact:common.scaleButton;
		public btn_lookup:common.scaleButton;
		public box_name:Laya.HBox;
		public lab_name:Laya.Label;
		public lab_skillLv:Laya.Label;
		public lab_Lv:Laya.Label;
		public box_star:Laya.Box;
		public list_star:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("ui.artifact.itemRender.ArtifactItemRenderUI",ui.artifact.itemRender.ArtifactItemRenderUI);
			View.regComponent("game.godTabIR",game.godTabIR);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SkillBox",common.SkillBox);
			View.regComponent("game.TabBaptize",game.TabBaptize);
			View.regComponent("game.TabEnchant",game.TabEnchant);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("artifact/Artifact");

        }

    }
}

module ui.artifact {
    export class ArtifactListUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public listShenqi:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.ArtifactListIR",game.ArtifactListIR);

            super.createChildren();
            this.loadUI("artifact/ArtifactList");

        }

    }
}

module ui.artifact {
    export class ArtifactUnLockUI extends DialogExt {
		public img_zhezhao:Laya.Image;
		public lab_close:Laya.Label;
		public lab_text:Laya.Label;
		public img_bg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("artifact/ArtifactUnLock");

        }

    }
}

module ui.artifact.itemRender {
    export class ArtifactItemRenderUI extends View {
		public img_icon:Laya.Image;
		public img_quality:Laya.Image;
		public anim_select:Laya.Animation;
		public img_shangzhen:Laya.Image;
		public redPoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("artifact/itemRender/ArtifactItemRender");

        }

    }
}

module ui.artifact.itemRender {
    export class ArtifactListIRUI extends View {
		public imgShenqi:Laya.Image;
		public imgSuo:Laya.Image;
		public btnOperate:Laya.Button;
		public lbName:Laya.Label;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("artifact/itemRender/ArtifactListIR");

        }

    }
}

module ui.artifact.itemRender {
    export class BaptizeAttriRenderUI extends View {
		public img_true:Laya.Image;
		public img_false:Laya.Image;
		public lab_curAttri:Laya.Label;
		public lab_curValue:Laya.Label;
		public lab_nextAttri:Laya.Label;
		public lab_nextValue:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("artifact/itemRender/BaptizeAttriRender");

        }

    }
}

module ui.artifact.tab {
    export class ArtifactBaptizeUI extends View {
		public img_cost_bg:Laya.Image;
		public lab_Lv:Laya.Label;
		public lab_suo:Laya.Label;
		public lab_isNull:Laya.Label;
		public lab_force:Laya.Label;
		public lab_nextforce:Laya.Label;
		public lab_arrow:Laya.Label;
		public list_attri:Laya.List;
		public box_gCost:Laya.HBox;
		public lab_gHas:Laya.Label;
		public lab_gNeed:Laya.Label;
		public box_pCost:Laya.HBox;
		public lab_pHas:Laya.Label;
		public lab_pNeed:Laya.Label;
		public btn_lookup:common.scaleButton;
		public btn_change:Laya.Button;
		public ghRP:game.RedPointProp;
		public btn_pBaptize:Laya.Button;
		public pxilianRP:game.RedPointProp;
		public btn_gBaptize:Laya.Button;
		public gxilianRP:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.artifact.itemRender.BaptizeAttriRenderUI",ui.artifact.itemRender.BaptizeAttriRenderUI);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("artifact/tab/ArtifactBaptize");

        }

    }
}

module ui.artifact.tab {
    export class ArtifactEnchantUI extends View {
		public img_cost_bg:Laya.Image;
		public hbox_1:Laya.HBox;
		public img_jichu1:Laya.Image;
		public lab_value1:Laya.Label;
		public hbox_2:Laya.HBox;
		public img_jichu2:Laya.Image;
		public lab_value2:Laya.Label;
		public hbox_3:Laya.HBox;
		public img_jichu3:Laya.Image;
		public lab_value3:Laya.Label;
		public lab_info:Laya.Label;
		public list_teshu:Laya.List;
		public lab_chance:Laya.Label;
		public exp_progressBar:Laya.ProgressBar;
		public lab_exp:Laya.Label;
		public btn_fumo:Laya.Button;
		public fumoRP:game.RedPointProp;
		public btn_auto:Laya.Button;
		public autoRP:game.RedPointProp;
		public btn_lookup:common.scaleButton;
		public box_cost:Laya.HBox;
		public lab_has:Laya.Label;
		public lab_need:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("artifact/tab/ArtifactEnchant");

        }

    }
}

module ui.artifact.tip {
    export class ArtDetailsUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_lv:Laya.Label;
		public lab_tips:Laya.Label;
		public lab_details:Laya.Label;
		public lab_explain:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("artifact/tip/ArtDetails");

        }

    }
}

module ui.artifact.tip {
    export class BaptizeDetailsUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_Lv:Laya.Label;
		public lab_Exp:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("artifact/tip/BaptizeDetails");

        }

    }
}

module ui.artifact.tip {
    export class BaptizeTipUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_Lv:Laya.Label;
		public lab_Exp:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("artifact/tip/BaptizeTip");

        }

    }
}

module ui.artifact.tip {
    export class EnchantTipUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_lv:Laya.Label;
		public lab_tips:Laya.Label;
		public lab_details:Laya.Label;
		public lab_details_no:Laya.Label;
		public lab_explain:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("artifact/tip/EnchantTip");

        }

    }
}

module ui.artifact.tip {
    export class ObtainTipUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_details:Laya.Label;
		public lbhas:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("artifact/tip/ObtainTip");

        }

    }
}

module ui.bag {
    export class BagUI extends DialogExt {
		public imgBg:Laya.Image;
		public boxContent:Laya.Box;
		public img_racebg:Laya.Image;
		public list_buttons:Laya.List;
		public godList:Laya.List;
		public raceList:Laya.List;
		public lbGodCount:Laya.Label;
		public lab_empty:Laya.Label;
		public treasureList:Laya.List;
		public btnFenjie:common.scaleButton;
		public btn_decomposition:common.scaleButton;
		public btnTreasureTujian:common.scaleButton;
		public btnTreasureRebirth:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.bag.TabUI",ui.bag.TabUI);
			View.regComponent("common.HeadBox2",common.HeadBox2);
			View.regComponent("common.RaceBox",common.RaceBox);
			View.regComponent("game.ChooseTreasureIR",game.ChooseTreasureIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("bag/Bag");

        }

    }
}

module ui.bag {
    export class BagdetailsUI extends DialogExt {
		public img_di:Laya.Image;
		public box_item:Laya.Box;
		public btn_shiyong:Laya.Button;
		public btn_quanbushiyong:Laya.Button;
		public lab_itemname:Laya.Label;
		public lab_info:Laya.Label;
		public lab_get:Laya.Label;
		public btn_hecheng:Laya.Button;
		public btn_quanbuhecheng:Laya.Button;
		public btn_qianwangshiyong:Laya.Button;
		public box_equip:Laya.Box;
		public box_name:Laya.HBox;
		public lab_symbol:Laya.Label;
		public lab_equipName:Laya.Label;
		public lab_strengthLv:Laya.Label;
		public lab_refineLv:Laya.Label;
		public lab_godName:Laya.Label;
		public list_proprety:Laya.List;
		public btn_equipStrength:Laya.Button;
		public btn_equipRefine:Laya.Button;
		public btn_equipWear:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.PropretyIR",game.PropretyIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("bag/Bagdetails");

        }

    }
}

module ui.bag {
    export class BaseBoxUI extends DialogExt {
		public img_icon:Laya.Image;
		public img_qulity:Laya.Image;
		public label_number:Laya.Label;
		public lab_equiprefine:Laya.Label;
		public lbLevel:Laya.Label;
		public anim_select:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("bag/BaseBox");

        }

    }
}

module ui.bag {
    export class DetailsUI extends DialogExt {
		public img_di:Laya.Image;
		public box_item:Laya.Box;
		public btn_shiyong:Laya.Button;
		public btn_quanbushiyong:Laya.Button;
		public lab_itemname:Laya.Label;
		public lab_info:Laya.Label;
		public lab_get:Laya.Label;
		public lab_time:Laya.Label;
		public btn_hecheng:Laya.Button;
		public btn_quanbuhecheng:Laya.Button;
		public btn_qianwangshiyong:Laya.Button;
		public box_equip:Laya.Box;
		public box_name:Laya.HBox;
		public lab_symbol:Laya.Label;
		public lab_equipName:Laya.Label;
		public lab_strengthLv:Laya.Label;
		public lab_refineLv:Laya.Label;
		public lab_godName:Laya.Label;
		public list_proprety:Laya.List;
		public btn_equipStrength:Laya.Button;
		public btn_equipRefine:Laya.Button;
		public btn_equipWear:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.PropretyIR",game.PropretyIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("bag/Details");

        }

    }
}

module ui.bag {
    export class ItemBoxUI extends View {
		public ui_base:game.BaseBox;
		public list_star:Laya.List;
		public img_star:Laya.Image;
		public img_race:Laya.Image;
		public img_suipian:Laya.Image;
		public img_zhizhen:Laya.Image;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.BaseBox",game.BaseBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("bag/ItemBox");

        }

    }
}

module ui.bag {
    export class ItemRenderUI extends View {
		public ui_detail:game.DetailIR;
		public list_lineitem:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.DetailIR",game.DetailIR);
			View.regComponent("game.BoxIR",game.BoxIR);

            super.createChildren();
            this.loadUI("bag/ItemRender");

        }

    }
}

module ui.bag {
    export class RecycBoxUI extends DialogExt {
		public ui_base:game.BaseBox;
		public boxGouxuan:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.BaseBox",game.BaseBox);

            super.createChildren();
            this.loadUI("bag/RecycBox");

        }

    }
}

module ui.bag {
    export class RecycleUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_equips:Laya.List;
		public scroll:Laya.VScrollBar;
		public btn_recycle:Laya.Button;
		public btn_white:Laya.Button;
		public btn_green:Laya.Button;
		public btn_blue:Laya.Button;
		public btn_purple:Laya.Button;
		public img_1:Laya.Image;
		public img_2:Laya.Image;
		public img_3:Laya.Image;
		public img_4:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.RecycIR",game.RecycIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("bag/Recycle");

        }

    }
}

module ui.bag {
    export class RewardSelectUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public lab_name:Laya.Label;
		public list_reward:Laya.List;
		public lab_num:Laya.Label;
		public btn_del:Laya.Button;
		public btn_del_ten:Laya.Button;
		public btn_add:Laya.Button;
		public btn_add_ten:Laya.Button;
		public btn_queding:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("ui.bag.RewardSelectIRUI",ui.bag.RewardSelectIRUI);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("bag/RewardSelect");

        }

    }
}

module ui.bag {
    export class RewardSelectIRUI extends View {
		public ui_item:common.ItemBox;
		public lab_name:Laya.Label;
		public img_chk:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("bag/RewardSelectIR");

        }

    }
}

module ui.bag {
    export class TabUI extends DialogExt {
		public btn_zhuobu:Laya.Button;
		public btn_type:common.scaleButton;
		public redPoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("bag/Tab");

        }

    }
}

module ui.bag {
    export class UseUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_icon:Laya.Image;
		public img_quality:Laya.Image;
		public lab_name:Laya.Label;
		public lab_count:Laya.Label;
		public lab_info:Laya.Label;
		public lab_num:Laya.TextInput;
		public btn_add:Laya.Button;
		public btn_del:Laya.Button;
		public btn_addTen:Laya.Button;
		public btn_delTen:Laya.Button;
		public btn_queding:Laya.Button;
		public btn_quxiao:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("bag/Use");

        }

    }
}

module ui.boss {
    export class BossIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public headBox:Laya.Box;
		public imgHead:Laya.Image;
		public imgQuality:Laya.Image;
		public ani_select:Laya.Animation;
		public imgDi:Laya.Image;
		public imgSuo:Laya.Image;
		public lbTime:Laya.Label;
		public lbLevel:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("boss/BossIR");

        }

    }
}

module ui.boss {
    export class BossRewardIRUI extends DialogExt {
		public ui_item:common.ItemBox;
		public img_infobg:Laya.Image;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("boss/BossRewardIR");

        }

    }
}

module ui.boss {
    export class FightRankUI extends DialogExt {
		public lbTitle:Laya.Label;
		public rankList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.BossFightRankIR",game.BossFightRankIR);

            super.createChildren();
            this.loadUI("boss/FightRank");

        }

    }
}

module ui.boss {
    export class FightRankIRUI extends View {
		public icon:Laya.Image;
		public imgRank:Laya.Image;
		public lbName:Laya.Label;
		public lbDamage:Laya.FontClip;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("boss/FightRankIR");

        }

    }
}

module ui.boss {
    export class RankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public listRank:Laya.List;
		public lbDamage:Laya.Label;
		public empty:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.BossRankIR",game.BossRankIR);

            super.createChildren();
            this.loadUI("boss/Rank");

        }

    }
}

module ui.boss {
    export class RankIRUI extends View {
		public ui_view:common.CommonRankIR;
		public lbName:Laya.Label;
		public lbDamage:Laya.Label;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonRankIR",common.CommonRankIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("boss/RankIR");

        }

    }
}

module ui.boss {
    export class RewardUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.AwardRankIR",common.AwardRankIR);

            super.createChildren();
            this.loadUI("boss/Reward");

        }

    }
}

module ui.boss {
    export class WorldBossUI extends DialogExt {
		public imgBg:Laya.Image;
		public boxContent:Laya.Box;
		public boxRole:Laya.Box;
		public pbBlood:Laya.ProgressBar;
		public itemList:Laya.List;
		public bossList:Laya.List;
		public btnAdd:common.scaleButton;
		public btnChallege:Laya.Button;
		public btnPrev:Laya.Button;
		public btnNext:Laya.Button;
		public btn_rotateleft:Laya.Button;
		public btn_rotateright:Laya.Button;
		public lbCount:Laya.Label;
		public lbPeople:Laya.Label;
		public lbBlood:Laya.Label;
		public lbName:Laya.Label;
		public roleBottom:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.BossRewardIR",game.BossRewardIR);
			View.regComponent("game.BossIR",game.BossIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("boss/WorldBoss");

        }

    }
}

module ui.box {
    export class AwardRankIRUI extends View {
		public imgRank:Laya.Image;
		public lbRank:Laya.Label;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("box/AwardRankIR");

        }

    }
}

module ui.box {
    export class BaoxiangBoxUI extends View {
		public imgGuang:Laya.Image;
		public imgBox:Laya.Image;
		public lbCount:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/BaoxiangBox");

        }

    }
}

module ui.box {
    export class BuzhenBoxUI extends View {
		public imgLock:Laya.Image;
		public lbLock:Laya.Label;
		public lbEmpty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/BuzhenBox");

        }

    }
}

module ui.box {
    export class BuzhenItemBoxUI extends View {
		public ui_head:common.HeadBox;
		public bloodProg:Laya.ProgressBar;
		public lbBlood:Laya.Label;
		public chk_select:Laya.Box;
		public redPoint:game.RedPointProp;
		public img_yuanzhu:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("box/BuzhenItemBox");

        }

    }
}

module ui.box {
    export class CommonRuleIRUI extends View {
		public lbTitle:Laya.Label;
		public htmlText:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("box/CommonRuleIR");

        }

    }
}

module ui.box {
    export class CostIRUI extends View {
		public hbox:Laya.HBox;
		public imgCost:Laya.Image;
		public lbHas:Laya.Label;
		public lbNeed:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/CostIR");

        }

    }
}

module ui.box {
    export class effItemBoxUI extends DialogExt {
		public ui_item:common.ItemBox2;
		public eff:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("box/effItemBox");

        }

    }
}

module ui.box {
    export class EquipItemBoxUI extends View {
		public itemBox:common.ItemBox;
		public lab_isopen:Laya.Label;
		public btn_add:common.scaleButton;
		public ani_succ:Laya.Animation;
		public img_suo:Laya.Image;
		public ani_select:Laya.Animation;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("box/EquipItemBox");

        }

    }
}

module ui.box {
    export class GodRaceAddUI extends View {
		public lab_title:Laya.Label;
		public lab_content:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/GodRaceAdd");

        }

    }
}

module ui.box {
    export class HeadBoxUI extends View {
		public img_icon:Laya.Image;
		public img_qulity:Laya.Image;
		public list_awake:Laya.List;
		public list_star:Laya.List;
		public img_race:Laya.Image;
		public txt_lv:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/HeadBox");

        }

    }
}

module ui.box {
    export class HeadBox2UI extends View {
		public imgDi:Laya.Image;
		public hadBox:common.HeadBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);

            super.createChildren();
            this.loadUI("box/HeadBox2");

        }

    }
}

module ui.box {
    export class HeadNameBoxUI extends View {
		public ui_head:common.HeadBox;
		public lab_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);

            super.createChildren();
            this.loadUI("box/HeadNameBox");

        }

    }
}

module ui.box {
    export class ItemBoxUI extends View {
		public img_icon:Laya.Image;
		public img_qulity:Laya.Image;
		public list_awake:Laya.List;
		public list_star:Laya.List;
		public img_race:Laya.Image;
		public img_suipian:Laya.Image;
		public label_number:Laya.Label;
		public lbLevel:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/ItemBox");

        }

    }
}

module ui.box {
    export class ItemBox2UI extends View {
		public imgDi:Laya.Image;
		public itemBox:common.ItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("box/ItemBox2");

        }

    }
}

module ui.box {
    export class ItemBox21UI extends View {
		public ui_item:common.ItemBox2;
		public img_receive:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("box/ItemBox21");

        }

    }
}

module ui.box {
    export class ItemBox3UI extends View {
		public imgDi:Laya.Image;
		public ani_light:Laya.Animation;
		public itemBox:common.ItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("box/ItemBox3");

        }

    }
}

module ui.box {
    export class RaceBoxUI extends View {
		public img_race:Laya.Image;
		public img_selected:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/RaceBox");

        }

    }
}

module ui.box {
    export class RankIRUI extends View {
		public ui_view:common.CommonRankIR;
		public lbName:Laya.Label;
		public lbValueDesc:Laya.Label;
		public lbValue:Laya.Label;
		public boxMid:Laya.HBox;
		public lbMidDesc:Laya.Label;
		public lbMid:Laya.Label;
		public boxBottom:Laya.HBox;
		public lbBottomDesc:Laya.Label;
		public lbBottom:Laya.Label;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonRankIR",common.CommonRankIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("box/RankIR");

        }

    }
}

module ui.box {
    export class ResBoxUI extends View {
		public imgRes:Laya.Image;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/ResBox");

        }

    }
}

module ui.box {
    export class SimpleItemBoxUI extends View {
		public imgIcon:Laya.Image;
		public lbCount:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/SimpleItemBox");

        }

    }
}

module ui.box {
    export class SkillBoxUI extends View {
		public img_icon:Laya.Image;
		public img_qulity:Laya.Image;
		public lab_dengji:Laya.Label;
		public selectBox:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/SkillBox");

        }

    }
}

module ui.box {
    export class TabIR1UI extends DialogExt {
		public btn_tab:Laya.Button;
		public img_lock:Laya.Image;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("box/TabIR1");

        }

    }
}

module ui.box {
    export class TabIR2UI extends View {
		public selectBox:Laya.Button;
		public btn_tab:Laya.Image;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("box/TabIR2");

        }

    }
}

module ui.box {
    export class TabIR3UI extends View {
		public img_bg:Laya.Image;
		public lab_tab:Laya.Label;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("box/TabIR3");

        }

    }
}

module ui.box {
    export class TabIR4UI extends View {
		public eff_select:Laya.Animation;
		public btn_tab:Laya.Image;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("box/TabIR4");

        }

    }
}

module ui.box {
    export class UserHeadBox1UI extends View {
		public imgDi:Laya.Image;
		public img_icon:Laya.Image;
		public img_frame:Laya.Image;
		public box_lev:Laya.Box;
		public imgLv:Laya.Image;
		public txt_lv:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("box/UserHeadBox1");

        }

    }
}

module ui.chat {
    export class ChatUI extends DialogExt {
		public bg:Laya.Image;
		public chatBox:Laya.Box;
		public bgInput:Laya.Image;
		public textInput:Laya.TextInput;
		public btnClose:Laya.Button;
		public btnSend:common.scaleButton;
		public btnFace:common.scaleButton;
		public btnQuick:common.scaleButton;
		public imgQuick:Laya.Image;
		public imgFace:Laya.Image;
		public imgScroll:Laya.Image;
		public faceUI:game.FaceView;
		public quickUI:game.ChatQuickView;
		public tabList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.FaceView",game.FaceView);
			View.regComponent("game.ChatQuickView",game.ChatQuickView);
			View.regComponent("game.ChatTabIR",game.ChatTabIR);

            super.createChildren();
            this.loadUI("chat/Chat");

        }

    }
}

module ui.chat {
    export class ChatIRUI extends View {
		public imgBg:Laya.Image;
		public headBox:common.UserHeadBox1;
		public lbName:Laya.Label;
		public lbChannel:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("chat/ChatIR");

        }

    }
}

module ui.chat {
    export class ChatQuickUI extends View {
		public lanList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("chat/ChatQuick");

        }

    }
}

module ui.chat {
    export class ChatTabIRUI extends View {
		public btnChannel:Laya.Button;
		public imgNum:Laya.Image;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("chat/ChatTabIR");

        }

    }
}

module ui.chat {
    export class FaceUI extends View {
		public faceList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("chat/Face");

        }

    }
}

module ui.chat {
    export class PrivateChatUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public chatBox:Laya.Box;
		public friendList:Laya.List;
		public textInput:Laya.TextInput;
		public btnFace:common.scaleButton;
		public btnSend:Laya.Button;
		public faceUI:game.FaceView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.PrivateChatIR",game.PrivateChatIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.FaceView",game.FaceView);

            super.createChildren();
            this.loadUI("chat/PrivateChat");

        }

    }
}

module ui.chat {
    export class PrivateChatIRUI extends View {
		public btn_select:Laya.Button;
		public headBox:common.UserHeadBox1;
		public btnDel:Laya.Button;
		public lab_name:Laya.Label;
		public redpoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("chat/PrivateChatIR");

        }

    }
}

module ui.component {
    export class AlertBoxUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public btnYes:Laya.Button;
		public btnNot:Laya.Button;
		public img_editbg:Laya.Image;
		public edit:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/AlertBox");

        }

    }
}

module ui.component {
    export class BuyBattleCountUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public lab_content0:Laya.Label;
		public lab_content1:Laya.Label;
		public img_gem:Laya.Image;
		public are_putin:Laya.TextInput;
		public btn_add:Laya.Button;
		public btn_red:Laya.Button;
		public btn_addTen:Laya.Button;
		public btn_redTen:Laya.Button;
		public btnYes:Laya.Button;
		public btnNot:Laya.Button;
		public lab_consume:Laya.Label;
		public lab_remain:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/BuyBattleCount");

        }

    }
}

module ui.component {
    export class CamraUI extends Dialog {
		public btn_vis:Laya.Button;
		public btn_fre:Laya.Button;
		public box_item:Laya.Box;
		public bar_1:Laya.HSlider;
		public lbl_1:Laya.Label;
		public bar_2:Laya.HSlider;
		public lbl_2:Laya.Label;
		public bar_3:Laya.HSlider;
		public lbl_3:Laya.Label;
		public bar_4:Laya.HSlider;
		public lbl_4:Laya.Label;
		public bar_5:Laya.HSlider;
		public lbl_5:Laya.Label;
		public bar_6:Laya.HSlider;
		public lbl_6:Laya.Label;
		public bar_7:Laya.HSlider;
		public lbl_7:Laya.Label;
		public bar_8:Laya.HSlider;
		public lbl_8:Laya.Label;
		public bar_9:Laya.HSlider;
		public lbl_9:Laya.Label;
		public bar_10:Laya.HSlider;
		public lbl_10:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/Camra");

        }

    }
}

module ui.component {
    export class ChannelBoxUI extends DialogExt {
		public btn_god:common.scaleButton;
		public btn_buzhen:common.scaleButton;
		public btn_equip:common.scaleButton;
		public btn_artifact:common.scaleButton;
		public btn_firstrecharge:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/ChannelBox");

        }

    }
}

module ui.component {
    export class ChushouUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public btn_queding:Laya.Button;
		public btn_quxiao:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("component/Chushou");

        }

    }
}

module ui.component {
    export class ComboboxUI extends View {
		public imgBg:Laya.Image;
		public btnShow:Laya.Button;
		public lbValue:Laya.Label;
		public boxContent:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/Combobox");

        }

    }
}

module ui.component {
    export class CommonFightTitleUI extends DialogExt {
		public ani_cb_hd:Laya.FrameAnimation;
		public ani_hg_fd:Laya.FrameAnimation;
		public ani_hg_dx:Laya.FrameAnimation;
		public ani_xx_xz:Laya.FrameAnimation;
		public ani_dao:Laya.FrameAnimation;
		public ani_cb_zk:Laya.FrameAnimation;
		public ani_cb_dx:Laya.FrameAnimation;
		public ani_bg_sf:Laya.FrameAnimation;
		public box_light_eff:Laya.Box;
		public eff_guang:Laya.Animation;
		public img_hg_bg:Laya.Image;
		public img_hg:Laya.Image;
		public img_dao_r:Laya.Image;
		public img_dao_l:Laya.Image;
		public bg:Laya.Image;
		public box_cb:Laya.Box;
		public img_cb0:Laya.Image;
		public img_cb1:Laya.Image;
		public img_hf:Laya.Image;
		public img_title:Laya.Image;
		public img_zs:Laya.Image;
		public box_star:Laya.Box;
		public ani_star:common.DialogOpenEff;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.DialogOpenEff",common.DialogOpenEff);

            super.createChildren();
            this.loadUI("component/CommonFightTitle");

        }

    }
}

module ui.component {
    export class CommonLevelUpTitleUI extends DialogExt {
		public ani_cb_hd:Laya.FrameAnimation;
		public ani_xx_xz:Laya.FrameAnimation;
		public ani_cb_zk:Laya.FrameAnimation;
		public ani_bg_sf:Laya.FrameAnimation;
		public ani_bg_pd:Laya.FrameAnimation;
		public box_light_eff:Laya.Box;
		public eff_guang:Laya.Animation;
		public box_cb:Laya.Box;
		public img_hg_bg:Laya.Image;
		public bg:Laya.Image;
		public ani_star:common.DialogOpenEff;
		public img_hf:Laya.Image;
		public img_title:Laya.Image;
		public img_zs:Laya.Image;
		public box_star:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.DialogOpenEff",common.DialogOpenEff);

            super.createChildren();
            this.loadUI("component/CommonLevelUpTitle");

        }

    }
}

module ui.component {
    export class CommonRankItemUI extends View {
		public imgRank:Laya.Image;
		public lbRank:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/CommonRankItem");

        }

    }
}

module ui.component {
    export class CommonRankItemRendeerUI extends View {
		public lbName:Laya.Label;
		public lbRank:Laya.Label;
		public lbValue:Laya.Label;
		public lbDesc:Laya.Label;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("component/CommonRankItemRendeer");

        }

    }
}

module ui.component {
    export class CommonRewardBoxUI extends DialogExt {
		public imgBg:Laya.Image;
		public list:Laya.List;
		public closeByBlank:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("component/CommonRewardBox");

        }

    }
}

module ui.component {
    export class CommonRuleUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public ctPanel:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("component/CommonRule");

        }

    }
}

module ui.component {
    export class CommonTitleUI extends DialogExt {
		public eff_guang:Laya.Animation;
		public img_title:Laya.Image;
		public closeByBlank:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/CommonTitle");

        }

    }
}

module ui.component {
    export class CommonTitle2UI extends View {
		public bgTitle:Laya.Image;
		public btnClose:Laya.Button;
		public closeByBlank:Laya.Label;
		public lbTitle:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/CommonTitle2");

        }

    }
}

module ui.component {
    export class CommonTitle4UI extends DialogExt {
		public bg:Laya.Image;
		public bgContent:Laya.Image;
		public bgTitle:Laya.Image;
		public btnClose:Laya.Button;
		public closeByBlank:Laya.Label;
		public lbTitle:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/CommonTitle4");

        }

    }
}

module ui.component {
    export class CommonTitle5UI extends DialogExt {
		public bg:Laya.Image;
		public bgContent:Laya.Image;
		public bgTitle:Laya.Image;
		public box_Content:Laya.Box;
		public lbTitle:Laya.Label;
		public btnClose:Laya.Button;
		public closeByBlank:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/CommonTitle5");

        }

    }
}

module ui.component {
    export class CommonTitle6UI extends DialogExt {
		public bg:Laya.Image;
		public bgContent:Laya.Image;
		public bgTitle:Laya.Image;
		public btnClose:Laya.Button;
		public closeByBlank:Laya.Label;
		public lbTitle:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/CommonTitle6");

        }

    }
}

module ui.component {
    export class CommonTitle7UI extends DialogExt {
		public bg:Laya.Image;
		public bgContent:Laya.Image;
		public bgTitle:Laya.Image;
		public btnClose:Laya.Button;
		public closeByBlank:Laya.Label;
		public lbTitle:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/CommonTitle7");

        }

    }
}

module ui.component {
    export class CommonTitle9UI extends DialogExt {
		public box_light_eff:Laya.Box;
		public eff_guang:Laya.Animation;
		public bg:Laya.Image;
		public img_hf:Laya.Image;
		public img_title:Laya.Image;
		public img_zs:Laya.Image;
		public box_star:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/CommonTitle9");

        }

    }
}

module ui.component {
    export class ConsumeAlertUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public btnYes:Laya.Button;
		public btnNot:Laya.Button;
		public hbox:Laya.HBox;
		public lab_content0:Laya.Label;
		public img_gem:Laya.Image;
		public lab_content1:Laya.Label;
		public lab_content2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/ConsumeAlert");

        }

    }
}

module ui.component {
    export class GodStarInfoUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/GodStarInfo");

        }

    }
}

module ui.component {
    export class ItemTipUI extends DialogExt {
		public lab_name:Laya.Label;
		public lab_num:Laya.Label;
		public lab_desc:Laya.Label;
		public lab_way:Laya.Label;
		public ui_Itembox:common.ItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("component/ItemTip");

        }

    }
}

module ui.component {
    export class LevelUpUI extends DialogExt {
		public bgPanel:common.CommonLevelUpTitleView;
		public box_content:Laya.Box;
		public box_reward:Laya.Box;
		public clipLv:Laya.FontClip;
		public list_reward:Laya.List;
		public lbOldLv:Laya.Label;
		public lbNewLv:Laya.Label;
		public lbNotice:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonLevelUpTitleView",common.CommonLevelUpTitleView);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("component/LevelUp");

        }

    }
}

module ui.component {
    export class ManyItemsTipUI extends DialogExt {
		public list_item:Laya.List;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("component/ManyItemsTip");

        }

    }
}

module ui.component {
    export class PlayerInfoUI extends DialogExt {
		public btn_lh:Laya.Button;
		public btn_qxlh:Laya.Button;
		public btnChat:Laya.Button;
		public btnAdd:Laya.Button;
		public btn_del:Laya.Button;
		public btnClose:Laya.Button;
		public headBox:common.UserHeadBox1;
		public lineupUI:common.CommonLineupView;
		public lbGuild:Laya.Label;
		public lbName:Laya.Label;
		public lab_title:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.CommonLineupView",common.CommonLineupView);

            super.createChildren();
            this.loadUI("component/PlayerInfo");

        }

    }
}

module ui.component {
    export class PlayerLinuepInfoUI extends DialogExt {
		public img_bg:Laya.Image;
		public headBox:common.UserHeadBox1;
		public lineupUI:common.CommonLineupView;
		public lbGuild:Laya.Label;
		public lbName:Laya.Label;
		public lab_title:Laya.Label;
		public btnLinueUp:Laya.Button;
		public btnChallenge:Laya.Button;
		public btnClose:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.CommonLineupView",common.CommonLineupView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/PlayerLinuepInfo");

        }

    }
}

module ui.component {
    export class RedPointUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/RedPoint");

        }

    }
}

module ui.component {
    export class RedPointCopyUI extends View {
		public ani1:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/RedPointCopy");

        }

    }
}

module ui.component {
    export class SkillTipUI extends DialogExt {
		public img_bg:Laya.Image;
		public lab_miaoshusize:Laya.Label;
		public lab_skillname:Laya.Label;
		public lab_type:Laya.Label;
		public box_vbox:Laya.VBox;
		public lab_skillinfo:Laya.Label;
		public lab_cd:Laya.Label;
		public list_miaoshu:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/SkillTip");

        }

    }
}

module ui.component {
    export class SoundEffectUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/SoundEffect");

        }

    }
}

module ui.component {
    export class StarListUI extends DialogExt {
		public img_0:Laya.Image;
		public img_1:Laya.Image;
		public img_2:Laya.Image;
		public img_3:Laya.Image;
		public img_4:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/StarList");

        }

    }
}

module ui.component {
    export class TishiUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public chk_auto:Laya.CheckBox;
		public btn_Yes:Laya.Button;
		public btn_No:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("component/Tishi");

        }

    }
}

module ui.component {
    export class ToastViewUI extends DialogExt {
		public lab_text:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/ToastView");

        }

    }
}

module ui.component {
    export class XianshiBaoxiangUI extends DialogExt {
		public btnConfirm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("component/XianshiBaoxiang");

        }

    }
}

module ui.dafuweng {
    export class biYanLiIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public img_game:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/biYanLiIR");

        }

    }
}

module ui.dafuweng {
    export class biYanLiViewUI extends DialogExt {
		public ui_tong3:game.bowieIR;
		public ui_tong1:game.bowieIR;
		public ui_tong2:game.bowieIR;
		public btn_start:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.bowieIR",game.bowieIR);

            super.createChildren();
            this.loadUI("dafuweng/biYanLiView");

        }

    }
}

module ui.dafuweng {
    export class boxIRUI extends View {
		public img_box:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/boxIR");

        }

    }
}

module ui.dafuweng {
    export class caiDaXiaoViewUI extends DialogExt {
		public img_icon1:Laya.Image;
		public img_icon0:Laya.Image;
		public imgSaizi:Laya.Image;
		public list_reward:Laya.List;
		public btn_big:Laya.Button;
		public btn_small:Laya.Button;
		public lab_cost1:Laya.Label;
		public lab_cost0:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("dafuweng/caiDaXiaoView");

        }

    }
}

module ui.dafuweng {
    export class caiQuanViewUI extends DialogExt {
		public img_vs:Laya.Image;
		public list_reward:Laya.List;
		public btn_2:common.scaleButton;
		public btn_1:common.scaleButton;
		public btn_3:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("dafuweng/caiQuanView");

        }

    }
}

module ui.dafuweng {
    export class dafuwengViewUI extends DialogExt {
		public img_viewport:Laya.Image;
		public img_bg:Laya.Image;
		public box_itemspr:Laya.Box;
		public img_index:Laya.Image;
		public box_top:Laya.Box;
		public resList:Laya.List;
		public imgSys:Laya.Image;
		public btnQiyu:game.QiyuBtnView;
		public box_reward:Laya.Box;
		public ui_special_reward:common.ItemBox2;
		public box_bottom:Laya.Box;
		public btn_play:common.scaleButton;
		public boxNum:Laya.HBox;
		public lbNum:Laya.Label;
		public lbCostNum:Laya.Label;
		public checkBox:Laya.CheckBox;
		public btn_close:common.scaleButton;
		public btn_rule:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.SysTopResIR",game.SysTopResIR);
			View.regComponent("game.QiyuBtnView",game.QiyuBtnView);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("dafuweng/dafuwengView");

        }

    }
}

module ui.dafuweng {
    export class diamondIRUI extends View {
		public img:Laya.Image;
		public lab_num:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/diamondIR");

        }

    }
}

module ui.dafuweng {
    export class goAndOutIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public img:Laya.Image;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/goAndOutIR");

        }

    }
}

module ui.dafuweng {
    export class propIRUI extends View {
		public ui_item:common.ItemBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("dafuweng/propIR");

        }

    }
}

module ui.dafuweng {
    export class QiyuAnimUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/QiyuAnim");

        }

    }
}

module ui.dafuweng {
    export class QiyuBtnUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public bombAnim:Laya.Animation;
		public redPoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("dafuweng/QiyuBtn");

        }

    }
}

module ui.dafuweng {
    export class QiyuResultUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lbTitle:Laya.Label;
		public listItem:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("dafuweng/QiyuResult");

        }

    }
}

module ui.dafuweng {
    export class QiyuTabIRUI extends View {
		public animSelect:Laya.Animation;
		public img:Laya.Image;
		public lbTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/QiyuTabIR");

        }

    }
}

module ui.dafuweng {
    export class QiyuViewUI extends DialogExt {
		public imgBg:Laya.Image;
		public boxContent:Laya.Box;
		public listTab:Laya.List;
		public btnLeft:common.scaleButton;
		public btnRight:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.QiyuTabIR",game.QiyuTabIR);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("dafuweng/QiyuView");

        }

    }
}

module ui.dafuweng {
    export class questionIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public img_question:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/questionIR");

        }

    }
}

module ui.dafuweng {
    export class questionPanelUI extends DialogExt {
		public btn_result1:Laya.Button;
		public btn_result2:Laya.Button;
		public lab_question:Laya.Label;
		public img_right:Laya.Image;
		public img_wrong:Laya.Image;
		public list_reward:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("dafuweng/questionPanel");

        }

    }
}

module ui.dafuweng {
    export class startIRUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("dafuweng/startIR");

        }

    }
}

module ui.dafuweng {
    export class yanliBoxIRUI extends View {
		public ui_prop:common.ItemBox;
		public img_barrel:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("dafuweng/yanliBoxIR");

        }

    }
}

module ui.dailycopy {
    export class DailyCopyUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_bg:Laya.Image;
		public list:Laya.List;
		public btnBuy:Laya.Button;
		public lbCount:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.DailyCopyIR",game.DailyCopyIR);

            super.createChildren();
            this.loadUI("dailycopy/DailyCopy");

        }

    }
}

module ui.dailycopy {
    export class DailyCopyBuyUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public btnBuy:Laya.Button;
		public btnCancel:Laya.Button;
		public lbCost:Laya.Label;
		public lbCount:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("dailycopy/DailyCopyBuy");

        }

    }
}

module ui.dailycopy {
    export class DailyCopyIRUI extends View {
		public lb_difficulty:Laya.Label;
		public lb_limit:Laya.Label;
		public btn_fight:Laya.Button;
		public list_items:Laya.List;
		public box_cost:Laya.Box;
		public lab_cost:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("dailycopy/DailyCopyIR");

        }

    }
}

module ui.dailycopy {
    export class DailyCopyMainUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public itemPanel:Laya.Panel;
		public imgBg:Laya.Image;
		public boxCopy0:Laya.Box;
		public img_box_0:Laya.Image;
		public lbCopy0:Laya.Label;
		public ui_red_0:game.RedPointProp;
		public boxCopy1:Laya.Box;
		public img_box_1:Laya.Image;
		public lbCopy1:Laya.Label;
		public ui_red_1:game.RedPointProp;
		public boxCopy2:Laya.Box;
		public img_box_2:Laya.Image;
		public ui_red_2:game.RedPointProp;
		public lbCopy2:Laya.Label;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("dailycopy/DailyCopyMain");

        }

    }
}

module ui.equip {
    export class EquipChangeUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("equip/EquipChange");

        }

    }
}

module ui.equip {
    export class EquipLvupUI extends DialogExt {
		public imgBg:Laya.Image;
		public clip_ten:Laya.Clip;
		public clip_one:Laya.Clip;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("equip/EquipLvup");

        }

    }
}

module ui.equip {
    export class EquipMasterUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_bg:Laya.Image;
		public lab_masterName:Laya.Label;
		public list_levelInfo:Laya.List;
		public imgArrow:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.MasterItemRender",game.MasterItemRender);

            super.createChildren();
            this.loadUI("equip/EquipMaster");

        }

    }
}

module ui.equip {
    export class EquipRecycleUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public list_item:Laya.List;
		public btn_recycle:Laya.Button;
		public btn_close:Laya.Button;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("equip/EquipRecycle");

        }

    }
}

module ui.equip {
    export class EquipRefineUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_right:Laya.Image;
		public lab_xiajie:Laya.Label;
		public lab_name:Laya.Label;
		public lab_nowLevel:Laya.Label;
		public lab_nextLevel:Laya.Label;
		public lab_maxLv:Laya.Label;
		public list_nowAtrri:Laya.List;
		public lab_nowAttri:game.PropretyIR;
		public list_nextAtrri:Laya.List;
		public lab_nextAttri:game.PropretyIR;
		public ui_itemBox:common.ItemBox;
		public costList:Laya.List;
		public input_level:Laya.TextInput;
		public btn_add:Laya.Button;
		public btn_red:Laya.Button;
		public btn_add10:Laya.Button;
		public btn_red10:Laya.Button;
		public btn_last:Laya.Button;
		public btn_next:Laya.Button;
		public btn_refine:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.PropretyIR",game.PropretyIR);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.CostIR",common.CostIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("equip/EquipRefine");

        }

    }
}

module ui.equip {
    export class EquipStrengthenUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public imgArrow:Laya.Image;
		public ui_itemBox:common.ItemBox;
		public ani_succ:Laya.Animation;
		public list_proprety:Laya.List;
		public box_box:game.strengthAttriRender;
		public lab_attriName:Laya.Label;
		public lab_nowAttriPro:Laya.Label;
		public lab_nextAttriPro:Laya.Label;
		public lab_name:Laya.Label;
		public lab_nextLevel:Laya.Label;
		public lab_nowLevel:Laya.Label;
		public btn_five:Laya.Button;
		public btn_once:Laya.Button;
		public btn_last:Laya.Button;
		public btn_next:Laya.Button;
		public oneList:Laya.List;
		public fiveList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.strengthAttriRender",game.strengthAttriRender);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.CostIR",common.CostIR);

            super.createChildren();
            this.loadUI("equip/EquipStrengthen");

        }

    }
}

module ui.equip {
    export class EquipSuitUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_bg:Laya.Image;
		public lbName:Laya.Label;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("equip/EquipSuit");

        }

    }
}

module ui.equip {
    export class EquipSuitLvupUI extends DialogExt {
		public imgBg:Laya.Image;
		public clip_num:Laya.Clip;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("equip/EquipSuitLvup");

        }

    }
}

module ui.equip {
    export class EquipTipsUI extends DialogExt {
		public img_bg:Laya.Image;
		public img_bg_quality:Laya.Image;
		public ui_item_icon:common.ItemBox;
		public lab_name:Laya.Label;
		public lab_quality:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("equip/EquipTips");

        }

    }
}

module ui.equip {
    export class EquipViewUI extends DialogExt {
		public imgBg:Laya.Image;
		public view_list:Laya.ViewStack;
		public viewEquip:game.TabEquip;
		public viewBaoshi:game.TabBaoshiNew;
		public btnFenjie:common.scaleButton;
		public boxTop:Laya.Box;
		public list_roles:Laya.List;
		public boxTab:Laya.Box;
		public list_tab:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TabEquip",game.TabEquip);
			View.regComponent("game.TabBaoshiNew",game.TabBaoshiNew);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.EquipGodIR",game.EquipGodIR);
			View.regComponent("game.godTabIR",game.godTabIR);

            super.createChildren();
            this.loadUI("equip/EquipView");

        }

    }
}

module ui.equip.gemstone {
    export class BaoShiIRUI extends View {
		public imgBg:Laya.Image;
		public btnAdd:common.scaleButton;
		public imgAttr:Laya.Image;
		public itemBox:common.ItemBox;
		public redpoint:game.RedPointProp;
		public ani_succ:Laya.Animation;
		public lbAttr:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("equip/gemstone/BaoShiIR");

        }

    }
}

module ui.equip.gemstone {
    export class EquipBaoshiIRUI extends View {
		public equipBox:game.EquipItemIR;
		public imgDi2:Laya.Image;
		public imgDi1:Laya.Image;
		public imgDi3:Laya.Image;
		public imgGem1:Laya.Image;
		public imgGem2:Laya.Image;
		public imgGem3:Laya.Image;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.EquipItemIR",game.EquipItemIR);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("equip/gemstone/EquipBaoshiIR");

        }

    }
}

module ui.equip.gemstone {
    export class GemstoneCompoundUI extends DialogExt {
		public boxEmptyGems:Laya.Box;
		public boxEmptyHC:Laya.Box;
		public listGems:Laya.List;
		public listYulan:Laya.List;
		public btnComp:Laya.Button;
		public lvCombo:common.Combobox;
		public typeCombo:common.Combobox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.Combobox",common.Combobox);

            super.createChildren();
            this.loadUI("equip/gemstone/GemstoneCompound");

        }

    }
}

module ui.equip.gemstone {
    export class GemstoneReplaceUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public listGems:Laya.List;
		public imgEmpty:Laya.Image;
		public lbEmpty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("equip/gemstone/GemstoneReplace");

        }

    }
}

module ui.equip.gemstone {
    export class GemstoneTipsUI extends DialogExt {
		public itemBox:common.ItemBox;
		public btnWear:Laya.Button;
		public lbName:Laya.Label;
		public lbNum:Laya.Label;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("equip/gemstone/GemstoneTips");

        }

    }
}

module ui.equip.gemstone {
    export class SingleCompoundUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public btnComp:Laya.Button;
		public btnAddOne:Laya.Button;
		public btnRedOne:Laya.Button;
		public btnAddTen:Laya.Button;
		public btnRedTen:Laya.Button;
		public headBox1:common.ItemBox2;
		public headBox2:common.ItemBox2;
		public imgAttr1:Laya.Image;
		public imgAttr2:Laya.Image;
		public pbNum:Laya.ProgressBar;
		public lbNum:Laya.Label;
		public lbAttr1:Laya.Label;
		public lbName1:Laya.Label;
		public lbAttr2:Laya.Label;
		public lbName2:Laya.Label;
		public lbInput:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("equip/gemstone/SingleCompound");

        }

    }
}

module ui.equip.gemstone {
    export class TabBaoshiNewUI extends View {
		public list_equip:Laya.List;
		public boxBottom:Laya.Box;
		public gemItem1:game.BaoshiIR;
		public gemItem2:game.BaoshiIR;
		public gemItem3:game.BaoshiIR;
		public btnOnekeyWear:Laya.Button;
		public btnComp:Laya.Button;
		public btnOnekeyUnload:Laya.Button;
		public lbEquipName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.EquipBaoshiIR",game.EquipBaoshiIR);
			View.regComponent("game.BaoshiIR",game.BaoshiIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("equip/gemstone/TabBaoshiNew");

        }

    }
}

module ui.equip {
    export class JumpViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public bg:Laya.Image;
		public list_where:Laya.List;
		public icon:common.ItemBox;
		public lab_name:Laya.Label;
		public lab_num:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.GetItemRender",game.GetItemRender);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("equip/JumpView");

        }

    }
}

module ui.equip {
    export class MasterRenderUI extends View {
		public lab_masterLv:Laya.Label;
		public list_attr:Laya.List;
		public lab_attr:Laya.Label;
		public lab_need:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("equip/MasterRender");

        }

    }
}

module ui.equip.render {
    export class EquipGodIRUI extends View {
		public box_null:Laya.Box;
		public btn_add:common.scaleButton;
		public headBox:common.HeadBox;
		public anim_select:Laya.Animation;
		public redPoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("equip/render/EquipGodIR");

        }

    }
}

module ui.equip.tab {
    export class TabEquipUI extends View {
		public list_equips:Laya.List;
		public boxBottom:Laya.Box;
		public img_arrow:Laya.Image;
		public list_attr:Laya.List;
		public box_strength:Laya.Box;
		public btn_strength:Laya.Button;
		public strengthRP:game.RedPointProp;
		public strengCkbox:Laya.CheckBox;
		public btn_getStrengh:Laya.Label;
		public box_refine:Laya.Box;
		public btn_rootRefine:Laya.Button;
		public redpointRefine:game.RedPointProp;
		public refineCkbox:Laya.CheckBox;
		public btn_getRefine:Laya.Label;
		public btnSuit:common.scaleButton;
		public btn_strengthMaster:common.scaleButton;
		public box_cost:Laya.Box;
		public costList:Laya.List;
		public boxMaxLv:Laya.Box;
		public lab_suit:Laya.Label;
		public lab_dashi:Laya.Label;
		public btn_takeoff:Laya.Button;
		public btn_wear:Laya.Button;
		public equipRP:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.EquipItemIR",game.EquipItemIR);
			View.regComponent("ui.god.render.AttrBoxUI",ui.god.render.AttrBoxUI);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.CostIR",common.CostIR);

            super.createChildren();
            this.loadUI("equip/tab/TabEquip");

        }

    }
}

module ui.escort {
    export class CaravanInfoUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public linuepList:Laya.List;
		public rewardList:Laya.List;
		public btnRob:Laya.Button;
		public ui_head:common.UserHeadBox1;
		public lbName:Laya.Label;
		public lbGuild:Laya.Label;
		public lbShenli:Laya.Label;
		public lbRobCnt:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.HeadBox2",common.HeadBox2);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("escort/CaravanInfo");

        }

    }
}

module ui.escort {
    export class EscortUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_bg:Laya.Image;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.EscortIR",game.EscortIR);

            super.createChildren();
            this.loadUI("escort/Escort");

        }

    }
}

module ui.escort {
    export class EscortMainUI extends DialogExt {
		public itemPanel:Laya.Panel;
		public bgImg:Laya.Image;
		public box_husong:Laya.Box;
		public list_quality:Laya.List;
		public img_refresh_cost:Laya.Image;
		public img_orange_cost:Laya.Image;
		public btn_orange:Laya.Button;
		public btn_refresh:Laya.Button;
		public btnEscort:Laya.Button;
		public lab_refresh_cost:Laya.Label;
		public lab_orange_cost:Laya.Label;
		public box_husonging:Laya.Box;
		public pro_husong:Laya.ProgressBar;
		public lbTime:Laya.Label;
		public lbFinish:Laya.Label;
		public lbEscortCnt:Laya.Label;
		public lbRobCnt:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.EscortCircleIR",game.EscortCircleIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("escort/EscortMain");

        }

    }
}

module ui.escort {
    export class EscortRewardUI extends DialogExt {
		public bgPanel:common.CommonTitle7View;
		public ui_escort:game.EscortCircleIR;
		public btnReward:Laya.Button;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle7View",common.CommonTitle7View);
			View.regComponent("game.EscortCircleIR",game.EscortCircleIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("escort/EscortReward");

        }

    }
}

module ui.escort.itemRender {
    export class CaravanIRenderUI extends View {
		public lbShenli:Laya.Label;
		public lbTime:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("escort/itemRender/CaravanIRender");

        }

    }
}

module ui.escort.itemRender {
    export class EscortCircleIRUI extends View {
		public img_icon:Laya.Image;
		public img_select:Laya.Image;
		public imgQuality:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("escort/itemRender/EscortCircleIR");

        }

    }
}

module ui.escort.itemRender {
    export class EscortIRenderUI extends View {
		public imgQuality:Laya.Image;
		public img_icon:Laya.Image;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("escort/itemRender/EscortIRender");

        }

    }
}

module ui.escort.itemRender {
    export class RobRecordIRenderUI extends View {
		public bg:Laya.Image;
		public lbContent:Laya.Label;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("escort/itemRender/RobRecordIRender");

        }

    }
}

module ui.escort {
    export class RobbedRecordUI extends DialogExt {
		public bgPanel:common.CommonTitle2View;
		public itemBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle2View",common.CommonTitle2View);

            super.createChildren();
            this.loadUI("escort/RobbedRecord");

        }

    }
}

module ui.fenjie {
    export class FenjieUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_bg:Laya.Image;
		public list_gods:Laya.List;
		public scrollBar:Laya.VScrollBar;
		public list_race:Laya.List;
		public itemList:Laya.List;
		public lab_godnum:Laya.Label;
		public lbSelect:Laya.Label;
		public btn_fenjie:Laya.Button;
		public btn_fast:Laya.Button;
		public btnNext:common.scaleButton;
		public btnPrev:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("ui.god.render.ChooseBoxUI",ui.god.render.ChooseBoxUI);
			View.regComponent("common.RaceBox",common.RaceBox);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("fenjie/Fenjie");

        }

    }
}

module ui.fight.box {
    export class ArtifactRenderUI extends View {
		public ani1:Laya.FrameAnimation;
		public img_probarteam:Laya.Image;
		public img_angerAll2:Laya.Image;
		public img_shenqiiconteam:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("fight/box/ArtifactRender");

        }

    }
}

module ui.fight.box {
    export class BossBuffBoxUI extends View {
		public img_buff:Laya.Image;
		public lab_round:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("fight/box/BossBuffBox");

        }

    }
}

module ui.fight.box {
    export class FightItemBoxUI extends View {
		public itemBox:common.ItemBox;
		public lbl_first:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("fight/box/FightItemBox");

        }

    }
}

module ui.fight.box {
    export class playSkillBoxUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public img_bg1:Laya.Image;
		public img_bg2:Laya.Image;
		public lab_name:Laya.Label;
		public img_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("fight/box/playSkillBox");

        }

    }
}

module ui.fight {
    export class FightGuildCopyResultUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public rewardList:common.AutoLayoutList;
		public lbRank:Laya.Label;
		public lbDamage:Laya.Label;
		public lbTotalDamage:Laya.Label;
		public btn_close:Laya.Button;
		public btn_again:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.AutoLayoutList",common.AutoLayoutList);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("fight/FightGuildCopyResult");

        }

    }
}

module ui.fight {
    export class fightHeadUI extends View {
		public lab_title:Laya.Label;
		public lab_round:Laya.Label;
		public img_vs:Laya.Image;
		public box_head0:Laya.Box;
		public lab_name0:Laya.Label;
		public box_force0:Laya.HBox;
		public clip_force0:Laya.FontClip;
		public box_head1:Laya.Box;
		public lab_name1:Laya.Label;
		public box_force1:Laya.HBox;
		public clip_force1:Laya.FontClip;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("fight/fightHead");

        }

    }
}

module ui.fight {
    export class fightsUI extends DialogExt {
		public ani2:Laya.FrameAnimation;
		public ani3:Laya.FrameAnimation;
		public list_bossbuff:Laya.List;
		public ui_view:game.fightBossBuffIR;
		public box_blood:Laya.Box;
		public img_pross:Laya.Image;
		public img_blood:Laya.Image;
		public lab_bosslev:Laya.Label;
		public lab_bosshp:Laya.Label;
		public img_anger_pross:Laya.Image;
		public img_anger:Laya.Image;
		public box_jump:Laya.Box;
		public btn_jump:common.scaleButton;
		public box_speed:Laya.Box;
		public btn_speed:common.scaleButton;
		public lbl_speed:Laya.Label;
		public img_startbg:Laya.Image;
		public box_cam:Laya.Box;
		public btn_cam:common.scaleButton;
		public camMove:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.fightBossBuffIR",game.fightBossBuffIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("fight/fights");

        }

    }
}

module ui.fight {
    export class FightTishiUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("fight/FightTishi");

        }

    }
}

module ui.fight {
    export class GloryFightResultUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public bg1:Laya.Image;
		public bg2:Laya.Image;
		public lbResult1:Laya.Image;
		public lbResult2:Laya.Image;
		public btnReplay:Laya.Button;
		public btnClose:Laya.Button;
		public lbName1:Laya.Label;
		public lbName2:Laya.Label;
		public headBox1:common.UserHeadBox1;
		public headBox2:common.UserHeadBox1;
		public img_flag1:Laya.Image;
		public img_flag11:Laya.Image;
		public clip_force1:Laya.FontClip;
		public img_flag2:Laya.Image;
		public img_flag22:Laya.Image;
		public clip_force2:Laya.FontClip;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("fight/GloryFightResult");

        }

    }
}

module ui.fight {
    export class shengliUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public imgXian:Laya.Image;
		public list_item:common.AutoLayoutList;
		public btn_close:Laya.Button;
		public btn_again:Laya.Button;
		public chk_next:Laya.CheckBox;
		public box_title:Laya.Box;
		public lbDesc:Laya.Label;
		public lab_time:Laya.Label;
		public lab_txt:Laya.Label;
		public lab_empty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.AutoLayoutList",common.AutoLayoutList);
			View.regComponent("game.FightItemBox",game.FightItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("fight/shengli");

        }

    }
}

module ui.fight {
    export class shengliQieCuoUI extends DialogExt {
		public bg:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("fight/shengliQieCuo");

        }

    }
}

module ui.fight {
    export class shibaiUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public btn_close:Laya.Button;
		public btn_again:Laya.Button;
		public channel:common.ChannelBox;
		public lab_time:Laya.Label;
		public lab_txt:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ChannelBox",common.ChannelBox);

            super.createChildren();
            this.loadUI("fight/shibai");

        }

    }
}

module ui.firstguide {
    export class FirstGuideUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public box_blood:Laya.Box;
		public img_pross:Laya.Image;
		public img_blood:Laya.Image;
		public lab_name:Laya.Label;
		public img_bg:Laya.Image;
		public img_pic1:Laya.Image;
		public img_pic2:Laya.Image;
		public img_pic3:Laya.Image;
		public box_info1:Laya.Box;
		public box_info2:Laya.Box;
		public box_info3:Laya.Box;
		public box_info4:Laya.Box;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("firstguide/FirstGuide");

        }

    }
}

module ui.fogforest {
    export class AwardUI extends View {
		public itemBox:common.ItemBox2;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("fogforest/Award");

        }

    }
}

module ui.fogforest {
    export class FogForestUI extends DialogExt {
		public guanqia1:game.ForestGuanqiaBox;
		public guanqia2:game.ForestGuanqiaBox;
		public guanqia3:game.ForestGuanqiaBox;
		public awardUI:game.forestAwardView;
		public boxRank:Laya.Box;
		public rankList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ForestGuanqiaBox",game.ForestGuanqiaBox);
			View.regComponent("game.forestAwardView",game.forestAwardView);
			View.regComponent("game.forestRankIR",game.forestRankIR);

            super.createChildren();
            this.loadUI("fogforest/FogForest");

        }

    }
}

module ui.fogforest {
    export class GuanqiaBoxUI extends View {
		public imgDitu:Laya.Image;
		public imgDi:Laya.Image;
		public boxRole:Laya.Box;
		public imgMiwu:Laya.Image;
		public imgMask:Laya.Image;
		public lbTitle:Laya.Label;
		public lab_condition:Laya.Label;
		public ani_guanqia:Laya.Animation;
		public boxChallenge:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("fogforest/GuanqiaBox");

        }

    }
}

module ui.fogforest {
    export class RankIRUI extends View {
		public lbRank:Laya.Label;
		public lbName:Laya.Label;
		public lbGuanqia:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("fogforest/RankIR");

        }

    }
}

module ui.fogforest {
    export class RewardIRUI extends View {
		public imgTou:Laya.Image;
		public itemList:Laya.List;
		public lbName:Laya.Label;
		public btnLingqu:Laya.Button;
		public imgYilingqu:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("fogforest/RewardIR");

        }

    }
}

module ui.fogforest {
    export class RewardViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.ForestRewardIR",game.ForestRewardIR);

            super.createChildren();
            this.loadUI("fogforest/RewardView");

        }

    }
}

module ui.friend {
    export class AddFriendUI extends View {
		public img_side:Laya.Image;
		public list_friend:Laya.List;
		public are_putin:Laya.TextArea;
		public lab_notfriend:Laya.Label;
		public btn_update:common.scaleButton;
		public btn_lookup:Laya.Button;
		public btnOneKeyApply:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.AddFriendIR",game.AddFriendIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("friend/AddFriend");

        }

    }
}

module ui.friend {
    export class AddFriendIRUI extends View {
		public btn_add:Laya.Button;
		public lab_isapply:Laya.Label;
		public lab_name:Laya.Label;
		public lab_jifen:Laya.Label;
		public lab_type:Laya.Label;
		public headbox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("friend/AddFriendIR");

        }

    }
}

module ui.friend {
    export class ApplyfriendUI extends View {
		public img_side:Laya.Image;
		public list_friend:Laya.List;
		public lab_friendsNum:Laya.Label;
		public lab_notfriend:Laya.Label;
		public btn_update:common.scaleButton;
		public btnOneKeyAgree:Laya.Button;
		public btnOneKeyRefuse:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ApplyFriendIR",game.ApplyFriendIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("friend/Applyfriend");

        }

    }
}

module ui.friend {
    export class ApplyfriendIRUI extends View {
		public btn_refuse:Laya.Button;
		public btn_agree:Laya.Button;
		public lab_name:Laya.Label;
		public lab_online:Laya.Label;
		public lab_force:Laya.Label;
		public headbox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("friend/ApplyfriendIR");

        }

    }
}

module ui.friend {
    export class FriendIRUI extends View {
		public lab_name:Laya.Label;
		public lab_type:Laya.Label;
		public lab_shenli:Laya.Label;
		public btnFight:common.scaleButton;
		public btn_receive:Laya.Button;
		public btn_gift:Laya.Button;
		public btn_hasgift:Laya.Button;
		public headbox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("friend/FriendIR");

        }

    }
}

module ui.friend {
    export class FriendListUI extends View {
		public lab_friendship:Laya.Label;
		public lab_gain:Laya.Label;
		public lab_friendsNum:Laya.Label;
		public list_friend:Laya.List;
		public img_side:Laya.Image;
		public lab_notfriend:Laya.Label;
		public btn_allgift:Laya.Button;
		public btnPrivateChat:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.FriendIR",game.FriendIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("friend/FriendList");

        }

    }
}

module ui.friend {
    export class FriendMainUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public viewStack:Laya.ViewStack;
		public tab_friendlist:game.FriendsView;
		public tab_addfriend:game.AddView;
		public tab_applyfriend:game.ApplyView;
		public tab:Laya.Tab;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.FriendsView",game.FriendsView);
			View.regComponent("game.AddView",game.AddView);
			View.regComponent("game.ApplyView",game.ApplyView);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("friend/FriendMain");

        }

    }
}

module ui.glory {
    export class FightListUI extends View {
		public imgBg:Laya.Image;
		public user16:Laya.Image;
		public user3_1:Laya.Image;
		public user8:Laya.Image;
		public user9:Laya.Image;
		public user4:Laya.Image;
		public user13:Laya.Image;
		public user5:Laya.Image;
		public user12:Laya.Image;
		public user3_2:Laya.Image;
		public user3_3:Laya.Image;
		public user3_4:Laya.Image;
		public user4_1:Laya.Image;
		public user4_2:Laya.Image;
		public user5_1:Laya.Image;
		public user5_2:Laya.Image;
		public user2:Laya.Image;
		public user15:Laya.Image;
		public user7:Laya.Image;
		public user10:Laya.Image;
		public user3:Laya.Image;
		public user14:Laya.Image;
		public user6:Laya.Image;
		public user11:Laya.Image;
		public user3_5:Laya.Image;
		public user3_6:Laya.Image;
		public user3_7:Laya.Image;
		public user3_8:Laya.Image;
		public user4_3:Laya.Image;
		public user4_4:Laya.Image;
		public user1:Laya.Image;
		public imgWangguan:Laya.Image;
		public btn4_2:common.scaleButton;
		public btn3_4:common.scaleButton;
		public btn3_3:common.scaleButton;
		public btn2_8:common.scaleButton;
		public btn2_7:common.scaleButton;
		public btn2_6:common.scaleButton;
		public btn2_5:common.scaleButton;
		public btn5:common.scaleButton;
		public btn4_1:common.scaleButton;
		public btn3_2:common.scaleButton;
		public btn3_1:common.scaleButton;
		public btn2_4:common.scaleButton;
		public btn2_3:common.scaleButton;
		public btn2_2:common.scaleButton;
		public btn2_1:common.scaleButton;
		public userBox1:game.gloryFightPlayerIR;
		public userBox16:game.gloryFightPlayerIR;
		public userBox8:game.gloryFightPlayerIR;
		public userBox9:game.gloryFightPlayerIR;
		public userBox4:game.gloryFightPlayerIR;
		public userBox13:game.gloryFightPlayerIR;
		public userBox5:game.gloryFightPlayerIR;
		public userBox12:game.gloryFightPlayerIR;
		public userBox2:game.gloryFightPlayerIR;
		public userBox15:game.gloryFightPlayerIR;
		public userBox7:game.gloryFightPlayerIR;
		public userBox10:game.gloryFightPlayerIR;
		public userBox3:game.gloryFightPlayerIR;
		public userBox14:game.gloryFightPlayerIR;
		public userBox6:game.gloryFightPlayerIR;
		public userBox11:game.gloryFightPlayerIR;
		public boxGj:Laya.Box;
		public gjHead:common.UserHeadBox1;
		public gjName:Laya.Label;
		public gjShenli:Laya.Label;
		public lbDesc:Laya.Label;
		public rp2_1:Laya.Image;
		public rp2_2:Laya.Image;
		public rp2_3:Laya.Image;
		public rp2_4:Laya.Image;
		public rp2_5:Laya.Image;
		public rp2_6:Laya.Image;
		public rp2_7:Laya.Image;
		public rp2_8:Laya.Image;
		public rp3_1:Laya.Image;
		public rp3_2:Laya.Image;
		public rp3_3:Laya.Image;
		public rp3_4:Laya.Image;
		public rp4_1:Laya.Image;
		public rp4_2:Laya.Image;
		public rp5:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.gloryFightPlayerIR",game.gloryFightPlayerIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("glory/FightList");

        }

    }
}

module ui.glory {
    export class GloryAwardUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabbar:Laya.Tab;
		public img_bg:Laya.Image;
		public awardList:Laya.List;
		public lbCost:Laya.Label;
		public lbReward:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.gloryAwardIR",game.gloryAwardIR);

            super.createChildren();
            this.loadUI("glory/GloryAward");

        }

    }
}

module ui.glory {
    export class GloryFightUI extends DialogExt {
		public listView:game.gloryFightListView;
		public btnBenfu:Laya.Button;
		public btnKuafu:Laya.Button;
		public lbTime:Laya.Label;
		public lbNotice:Laya.Label;
		public btnLast:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.gloryFightListView",game.gloryFightListView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("glory/GloryFight");

        }

    }
}

module ui.glory {
    export class GloryGroupUI extends DialogExt {
		public bgPanel:common.CommonTitle2View;
		public fightui:game.gloryMatchPlayerIR;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle2View",common.CommonTitle2View);
			View.regComponent("game.gloryMatchPlayerIR",game.gloryMatchPlayerIR);

            super.createChildren();
            this.loadUI("glory/GloryGroup");

        }

    }
}

module ui.glory {
    export class GloryWaitUI extends DialogExt {
		public imgBg:Laya.Image;
		public boxRank1:Laya.Box;
		public boxRank2:Laya.Box;
		public boxRank3:Laya.Box;
		public btnJoin:Laya.Button;
		public btnLast:Laya.Button;
		public lbTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("glory/GloryWait");

        }

    }
}

module ui.glory.iRender {
    export class AwardIRUI extends View {
		public itemList:Laya.List;
		public rewardList:Laya.List;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("glory/iRender/AwardIR");

        }

    }
}

module ui.glory.iRender {
    export class FightPlayerIRUI extends View {
		public headBox:common.UserHeadBox1;
		public lbForce:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("glory/iRender/FightPlayerIR");

        }

    }
}

module ui.glory.iRender {
    export class MatchPlayerIRUI extends View {
		public imgResult1:Laya.Image;
		public imgResult2:Laya.Image;
		public headBox1:common.UserHeadBox1;
		public headBox2:common.UserHeadBox1;
		public btnYazhu1:Laya.Button;
		public btnYazhu2:Laya.Button;
		public btnPlayback:Laya.Button;
		public lbForce1:Laya.Label;
		public lbName1:Laya.Label;
		public lbForce2:Laya.Label;
		public lbName2:Laya.Label;
		public lbGroup:Laya.Label;
		public lbYazhu1:Laya.Label;
		public lbYazhu2:Laya.Label;
		public lbResult1:Laya.Label;
		public lbResult2:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("glory/iRender/MatchPlayerIR");

        }

    }
}

module ui.glory {
    export class LastReviewUI extends DialogExt {
		public listView:game.gloryFightListView;
		public btnBenfu:Laya.Button;
		public btnKuafu:Laya.Button;
		public btnBenjie:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.gloryFightListView",game.gloryFightListView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("glory/LastReview");

        }

    }
}

module ui.glory {
    export class RecordUI extends DialogExt {
		public bgPanel:common.CommonTitle2View;
		public img_bg:Laya.Image;
		public recordList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle2View",common.CommonTitle2View);
			View.regComponent("game.gloryMatchPlayerIR",game.gloryMatchPlayerIR);

            super.createChildren();
            this.loadUI("glory/Record");

        }

    }
}

module ui.god {
    export class BuzhenUI extends DialogExt {
		public imgBgSQ:Laya.Image;
		public imgAddSQ:Laya.Image;
		public ui_buzhenItem0:game.godBuzhenIR;
		public ui_buzhenItem1:game.godBuzhenIR;
		public ui_buzhenItem3:game.godBuzhenIR;
		public ui_buzhenItem2:game.godBuzhenIR;
		public ui_buzhenItem4:game.godBuzhenIR;
		public ui_buzhenItem5:game.godBuzhenIR;
		public ui_buzhenrole0:common.HeadNameBox;
		public ui_buzhenrole1:common.HeadNameBox;
		public ui_buzhenrole2:common.HeadNameBox;
		public ui_buzhenrole3:common.HeadNameBox;
		public ui_buzhenrole4:common.HeadNameBox;
		public ui_buzhenrole5:common.HeadNameBox;
		public list_buzhenrole:Laya.List;
		public raceList:Laya.List;
		public btn_return:Laya.Button;
		public guanghuanUI:game.GuanghuanView;
		public imgShenqi:Laya.Image;
		public lbShenli:Laya.Label;
		public closeByBlank:Laya.Label;
		public lab_shiluo:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.godBuzhenIR",game.godBuzhenIR);
			View.regComponent("common.HeadNameBox",common.HeadNameBox);
			View.regComponent("game.BuzhenGodIR",game.BuzhenGodIR);
			View.regComponent("common.RaceBox",common.RaceBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.GuanghuanView",game.GuanghuanView);

            super.createChildren();
            this.loadUI("god/Buzhen");

        }

    }
}

module ui.god {
    export class ChooseGodUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public list_gods:Laya.List;
		public btn_queding:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.ChooseGodIR",game.ChooseGodIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/ChooseGod");

        }

    }
}

module ui.god {
    export class CommonLineupViewUI extends View {
		public imgShenli:Laya.Image;
		public imgLock0:Laya.Image;
		public imgLock5:Laya.Image;
		public imgLock4:Laya.Image;
		public imgLock3:Laya.Image;
		public imgLock2:Laya.Image;
		public imgLock1:Laya.Image;
		public imgShenqi:Laya.Image;
		public godBox0:common.HeadNameBox;
		public godBox1:common.HeadNameBox;
		public godBox2:common.HeadNameBox;
		public godBox3:common.HeadNameBox;
		public godBox5:common.HeadNameBox;
		public godBox4:common.HeadNameBox;
		public guanghuanUI:game.GuanghuanView;
		public lbTitle:Laya.Label;
		public lbPos0:Laya.Label;
		public lbPos1:Laya.Label;
		public lbPos2:Laya.Label;
		public lbPos3:Laya.Label;
		public lbPos4:Laya.Label;
		public lbPos5:Laya.Label;
		public lbShenli:Laya.Label;
		public lbLock1:Laya.Label;
		public lbLock4:Laya.Label;
		public lbLock5:Laya.Label;
		public lbLock3:Laya.Label;
		public lbLock2:Laya.Label;
		public lbLock0:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadNameBox",common.HeadNameBox);
			View.regComponent("game.GuanghuanView",game.GuanghuanView);

            super.createChildren();
            this.loadUI("god/CommonLineupView");

        }

    }
}

module ui.god {
    export class GodAttrUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_bg:Laya.Image;
		public attrList:Laya.List;
		public greenList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("god/GodAttr");

        }

    }
}

module ui.god {
    export class GodCultureUI extends DialogExt {
		public imgBg:Laya.Image;
		public godView:game.GodIntroduceView;
		public btnClose:common.scaleButton;
		public btnLeft:Laya.Button;
		public btnRight:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.GodIntroduceView",game.GodIntroduceView);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/GodCulture");

        }

    }
}

module ui.god {
    export class GodIntroduceUI extends View {
		public box_model:Laya.Box;
		public roleBox:Laya.Box;
		public btnBuzhen:common.scaleButton;
		public btn_gh:common.scaleButton;
		public btnSkin:common.scaleButton;
		public godSkinRP:game.RedPointProp;
		public btnChange:common.scaleButton;
		public btn_lihui:common.scaleButton;
		public btn_peiyin:common.scaleButton;
		public btnZiliao:common.scaleButton;
		public list_shuxingup:Laya.List;
		public lab_text:Laya.Label;
		public treasureUI:game.GodTreasureView;
		public starList:Laya.List;
		public hbox:Laya.HBox;
		public imgRace:Laya.Image;
		public lab_name:Laya.Label;
		public list_attr:Laya.List;
		public lbShenli:Laya.Label;
		public boxBottom:Laya.Box;
		public tabList:common.ListBase;
		public viewStack:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.GodTreasureView",game.GodTreasureView);
			View.regComponent("ui.god.render.AttrIRUI",ui.god.render.AttrIRUI);
			View.regComponent("common.ListBase",common.ListBase);
			View.regComponent("ui.god.render.TabItemRenderUI",ui.god.render.TabItemRenderUI);

            super.createChildren();
            this.loadUI("god/GodIntroduce");

        }

    }
}

module ui.god {
    export class GodLiHuiUI extends DialogExt {
		public img_bg:Laya.Image;
		public panel_main:Laya.Panel;
		public img_god:Laya.Image;
		public sl_scale:Laya.HSlider;
		public btn_close:common.scaleButton;
		public btn_reduce:Laya.Button;
		public btn_add:Laya.Button;
		public lab_title:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/GodLiHui");

        }

    }
}

module ui.god {
    export class GodSkinUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_bg:Laya.Image;
		public boxRole:Laya.Box;
		public skinList:Laya.List;
		public skinPanel:Laya.Panel;
		public btnWear:Laya.Button;
		public btn_rotateleft:Laya.Button;
		public btn_rotateright:Laya.Button;
		public costItem:common.ItemBox2;
		public lbHas:Laya.Label;
		public lbCost:Laya.Label;
		public lbName:Laya.Label;
		public lbDesc:Laya.Label;
		public lbAttr:Laya.Label;
		public canActivityRP:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GodSkinIR",game.GodSkinIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("god/GodSkin");

        }

    }
}

module ui.god {
    export class GuaiwuxinxiUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_bg:Laya.Image;
		public headBox:common.HeadBox;
		public list_skill:Laya.List;
		public box_shuxing:Laya.Box;
		public lab_hp:Laya.Label;
		public lab_ack:Laya.Label;
		public lab_def:Laya.Label;
		public lab_spd:Laya.Label;
		public lab_name:Laya.Label;
		public lab_skill:Laya.Label;
		public lab_skilldescription:Laya.Label;
		public lab_open:Laya.Label;
		public lab_skill_type:Laya.Label;
		public lab_type:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("common.SkillBox",common.SkillBox);

            super.createChildren();
            this.loadUI("god/Guaiwuxinxi");

        }

    }
}

module ui.god {
    export class GuanghuanUI extends View {
		public imgBg:Laya.Image;
		public img0:Laya.Image;
		public img3:Laya.Image;
		public img5:Laya.Image;
		public img4:Laya.Image;
		public img1:Laya.Image;
		public img2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/Guanghuan");

        }

    }
}

module ui.god {
    export class NewGodMainUI extends DialogExt {
		public imgBg:Laya.Image;
		public godView:game.GodIntroduceView;
		public boxList:Laya.Box;
		public roleList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.GodIntroduceView",game.GodIntroduceView);
			View.regComponent("game.LineupGodIR",game.LineupGodIR);

            super.createChildren();
            this.loadUI("god/NewGodMain");

        }

    }
}

module ui.god.render {
    export class AttrBoxUI extends View {
		public lab_attr:Laya.Label;
		public img_attrname:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/render/AttrBox");

        }

    }
}

module ui.god.render {
    export class AttrIRUI extends View {
		public lbvalue:Laya.Label;
		public imgAttr:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/render/AttrIR");

        }

    }
}

module ui.god.render {
    export class ChooseBoxUI extends View {
		public god_icon:common.HeadBox;
		public item_icon:common.ItemBox;
		public redpoint:game.RedPointProp;
		public img_gouxuan:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("god/render/ChooseBox");

        }

    }
}

module ui.god.render {
    export class GetItemBoxUI extends View {
		public img_di:Laya.Image;
		public lab_name:Laya.Label;
		public btn_goto:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("god/render/GetItemBox");

        }

    }
}

module ui.god.render {
    export class GodMaterialIRUI extends View {
		public view_icon:common.ItemBox2;
		public img_add:common.scaleButton;
		public lab_num:Laya.Label;
		public img_type:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/render/GodMaterialIR");

        }

    }
}

module ui.god.render {
    export class GodSkinIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public imgBg:Laya.Image;
		public icon:Laya.Image;
		public imgDi:Laya.Image;
		public boxRole:Laya.Box;
		public imgWear:Laya.Image;
		public canActivityRP:Laya.Image;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/render/GodSkinIR");

        }

    }
}

module ui.god.render {
    export class HaveItemBoxUI extends View {
		public img_icon:Laya.Image;
		public lab_have:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/render/HaveItemBox");

        }

    }
}

module ui.god.render {
    export class KeZhiForceBoxUI extends View {
		public img_bg:Laya.Image;
		public img_icon:Laya.Image;
		public lab_title:Laya.Label;
		public list_kezhi:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.GodRaceAddIR",common.GodRaceAddIR);

            super.createChildren();
            this.loadUI("god/render/KeZhiForceBox");

        }

    }
}

module ui.god.render {
    export class LineupGodIRUI extends View {
		public box_null:Laya.Box;
		public btn_add:Laya.Button;
		public imgLock:Laya.Image;
		public lbLock:Laya.Label;
		public headBox:common.HeadBox;
		public anim_select:Laya.Animation;
		public redPoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("god/render/LineupGodIR");

        }

    }
}

module ui.god.render {
    export class ReplaceIRUI extends View {
		public headbox:common.HeadBox;
		public lbName:Laya.Label;
		public btnShangzhen:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/render/ReplaceIR");

        }

    }
}

module ui.god.render {
    export class RonghunBoxUI extends View {
		public ani_select:Laya.Animation;
		public icon:Laya.Image;
		public img_jindu:Laya.Image;
		public lab_attr:Laya.Label;
		public lbMax:Laya.Label;
		public ballRP:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("god/render/RonghunBox");

        }

    }
}

module ui.god.render {
    export class SkillInfoBoxUI extends View {
		public ui_icon:game.GodSkillItemIR;
		public img_split:Laya.Image;
		public lab_info:Laya.Label;
		public lbName:Laya.Label;
		public lab_type:Laya.Label;
		public lab_condition:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.GodSkillItemIR",game.GodSkillItemIR);

            super.createChildren();
            this.loadUI("god/render/SkillInfoBox");

        }

    }
}

module ui.god.render {
    export class SkillItemIRUI extends View {
		public icon:Laya.Image;
		public lab_lv:Laya.Label;
		public imgSuo:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/render/SkillItemIR");

        }

    }
}

module ui.god.render {
    export class TabItemRenderUI extends View {
		public btn_name:Laya.Button;
		public tabRedPoint:game.RedPointProp;
		public img_suo:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("god/render/TabItemRender");

        }

    }
}

module ui.god {
    export class ReplaceGodUI extends DialogExt {
		public bgPanel:common.CommonTitle2View;
		public godList:Laya.List;
		public raceList:Laya.List;
		public boxEmpty:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle2View",common.CommonTitle2View);
			View.regComponent("game.godReplaceIR",game.godReplaceIR);
			View.regComponent("common.RaceBox",common.RaceBox);

            super.createChildren();
            this.loadUI("god/ReplaceGod");

        }

    }
}

module ui.god {
    export class RonghunLvInfoUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_nowlv:Laya.Label;
		public list_info:Laya.List;
		public lab_add:Laya.Label;
		public lab_tiaojian:Laya.Label;
		public lab_shangxian:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("god/RonghunLvInfo");

        }

    }
}

module ui.god {
    export class ShengjieUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public imgCost:Laya.Image;
		public list_nextdegree:Laya.List;
		public list_nowdegree:Laya.List;
		public lab_nowlv:Laya.Label;
		public lab_nextlv:Laya.Label;
		public lab_now1:Laya.Label;
		public lab_next1:Laya.Label;
		public lab_now2:Laya.Label;
		public lab_now3:Laya.Label;
		public lab_next2:Laya.Label;
		public lab_next3:Laya.Label;
		public lab_cost:Laya.Label;
		public lab_have:Laya.Label;
		public btn_shengjie:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/Shengjie");

        }

    }
}

module ui.god.tab {
    export class TabInfoUI extends View {
		public imgDi:Laya.Image;
		public box_canup:Laya.Box;
		public HBoxExp:Laya.HBox;
		public lab_allExp:Laya.Label;
		public lab_needExp:Laya.Label;
		public hboxGold:Laya.HBox;
		public lbAllGold:Laya.Label;
		public lab_getGold:Laya.Label;
		public list_pinjie:Laya.List;
		public lbMaxLv:Laya.Label;
		public lbType:Laya.Label;
		public lab_dengji:Laya.Label;
		public btnLookAttr:common.scaleButton;
		public btn_upGrade:Laya.Button;
		public lvupRedPoint:game.RedPointProp;
		public btn_shengjie:Laya.Button;
		public dgupRedPoint:game.RedPointProp;
		public checkBox:Laya.CheckBox;
		public skillList:Laya.List;
		public skillBox:game.SkillInfoBox;
		public bombAnim:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.GodSkillItemIR",game.GodSkillItemIR);
			View.regComponent("game.SkillInfoBox",game.SkillInfoBox);

            super.createChildren();
            this.loadUI("god/tab/TabInfo");

        }

    }
}

module ui.god.tab {
    export class TabJuexingUI extends View {
		public imgDi:Laya.Image;
		public lbUnlock:Laya.Label;
		public awakenHbox:Laya.HBox;
		public lbCurLv:Laya.Label;
		public lbMaxLv:Laya.Label;
		public btn_juexing:Laya.Button;
		public redpoint:game.RedPointProp;
		public itemList:Laya.List;
		public godList:Laya.List;
		public attrList:Laya.List;
		public maxLvNoticeBox:Laya.Box;
		public btnLook:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("game.GodMaterialIR",game.GodMaterialIR);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("god/tab/TabJuexing");

        }

    }
}

module ui.god.tab {
    export class TabRonghunUI extends View {
		public list_have:Laya.List;
		public jindubox1:game.godFuseIR;
		public jindubox2:game.godFuseIR;
		public jindubox3:game.godFuseIR;
		public boxMaxLv:Laya.Box;
		public box_ronghun:Laya.Box;
		public btn_one:Laya.Button;
		public ronghunRP:game.RedPointProp;
		public btn_ten:Laya.Button;
		public ronghunTenRP:game.RedPointProp;
		public img_oneIcon:Laya.Image;
		public lab_oneNeed:Laya.Label;
		public btn_look:common.scaleButton;
		public box_tupo:Laya.Box;
		public btn_tupo:Laya.Button;
		public lab_tiaojian:Laya.Label;
		public lab_level:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.godFuseUseIR",game.godFuseUseIR);
			View.regComponent("game.godFuseIR",game.godFuseIR);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("god/tab/TabRonghun");

        }

    }
}

module ui.god.tab {
    export class TabStarupUI extends View {
		public imgDi:Laya.Image;
		public box_manxing:Laya.Box;
		public list_maxstar:Laya.List;
		public lab_maxattr:Laya.Label;
		public lab_maxlevel:Laya.Label;
		public lbAwakenLimit:Laya.Label;
		public box_shengxing:Laya.Box;
		public list_nowstar:Laya.List;
		public list_nextstar:Laya.List;
		public btn_starup:Laya.Button;
		public starupRp:game.RedPointProp;
		public costContainer:Laya.Box;
		public imgCost:Laya.Image;
		public boxCost:Laya.HBox;
		public lbhas:Laya.Label;
		public lab_cost:Laya.Label;
		public box_shuxing:Laya.Box;
		public lab_nowattr:Laya.Label;
		public lab_nextattr:Laya.Label;
		public box_awaken:Laya.Box;
		public lbNowAwaken:Laya.Label;
		public lbNextAwaken:Laya.Label;
		public box_lvup:Laya.Box;
		public lab_nowmaxlv:Laya.Label;
		public lab_nextmaxlv:Laya.Label;
		public list_predegree:Laya.List;
		public list_afterdegree:Laya.List;
		public list_choose:Laya.List;
		public lab_nostar:Laya.Label;
		public btn_tip:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.GodMaterialIR",game.GodMaterialIR);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("god/tab/TabStarup");

        }

    }
}

module ui.god.treasure {
    export class ChooseMaterialUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public itemList:Laya.List;
		public btnComfirm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.ChooseTreasureIR",game.ChooseTreasureIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/treasure/ChooseMaterial");

        }

    }
}

module ui.god.treasure {
    export class ChooseTreasureUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public itemList:Laya.List;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.ChooseTreasureIR",game.ChooseTreasureIR);

            super.createChildren();
            this.loadUI("god/treasure/ChooseTreasure");

        }

    }
}

module ui.god.treasure {
    export class GodTreasureUI extends View {
		public itemBox:common.ItemBox;
		public btnAdd:common.scaleButton;
		public imgSuo:Laya.Image;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("god/treasure/GodTreasure");

        }

    }
}

module ui.god.treasure.render {
    export class ChooseTreasureIRUI extends View {
		public itemBox:common.ItemBox2;
		public imgGouxuan:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("god/treasure/render/ChooseTreasureIR");

        }

    }
}

module ui.god.treasure.render {
    export class SingleSelectTreasureIRUI extends View {
		public itemBox:common.ItemBox2;
		public animSelect:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("god/treasure/render/SingleSelectTreasureIR");

        }

    }
}

module ui.god.treasure.render {
    export class StarAttrPreviewIRUI extends View {
		public starList:Laya.List;
		public attrList:Laya.List;
		public lbActivity:Laya.Label;
		public lbName:Laya.Label;
		public imgLine:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.StrengthAttrIR",game.StrengthAttrIR);

            super.createChildren();
            this.loadUI("god/treasure/render/StarAttrPreviewIR");

        }

    }
}

module ui.god.treasure.render {
    export class StarupAttrIrUI extends View {
		public lbValue:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/treasure/render/StarupAttrIr");

        }

    }
}

module ui.god.treasure.render {
    export class StrengthAttrIRUI extends View {
		public lbValue:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("god/treasure/render/StrengthAttrIR");

        }

    }
}

module ui.god.treasure.render {
    export class TreasureMaterialIRUI extends View {
		public itemBox:common.ItemBox2;
		public btnAdd:common.scaleButton;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/treasure/render/TreasureMaterialIR");

        }

    }
}

module ui.god.treasure.render {
    export class TujianIRUI extends DialogExt {
		public itemBox:common.ItemBox2;
		public imgMask:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("god/treasure/render/TujianIR");

        }

    }
}

module ui.god.treasure {
    export class StarAttrPreviewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public contentBox:Laya.Box;
		public btnClose:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("god/treasure/StarAttrPreview");

        }

    }
}

module ui.god.treasure {
    export class TreasureRebirthUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public imgBg:Laya.Image;
		public btnAdd:common.scaleButton;
		public itemBox:common.ItemBox;
		public btnRule:common.scaleButton;
		public btnRebirth:Laya.Button;
		public listTreasure:Laya.List;
		public listCost:Laya.List;
		public listItem:Laya.List;
		public boxEmpty:Laya.Image;
		public lbTitle:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.SingleSelectTreasureIR",game.SingleSelectTreasureIR);
			View.regComponent("common.CostIR",common.CostIR);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("god/treasure/TreasureRebirth");

        }

    }
}

module ui.god.treasure {
    export class TreasureStarupUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public imgArrow:Laya.Image;
		public btnStarup:Laya.Button;
		public curBox:Laya.Box;
		public curItem:common.ItemBox2;
		public nextBox:Laya.Box;
		public nextItem:common.ItemBox2;
		public costBox:Laya.Box;
		public materialList:Laya.List;
		public attrBox:Laya.Box;
		public btnYulan:common.scaleButton;
		public attrList:Laya.List;
		public maxLvBox:Laya.Box;
		public ani_succ:Laya.Animation;
		public ani_succ_r:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("game.TreasureMaterialIR",game.TreasureMaterialIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.StarupAttrIR",game.StarupAttrIR);

            super.createChildren();
            this.loadUI("god/treasure/TreasureStarup");

        }

    }
}

module ui.god.treasure {
    export class TreasureStrengthUI extends DialogExt {
		public attrBox:Laya.Box;
		public imgAttrArrow:Laya.Image;
		public curAttrList:Laya.List;
		public nextAttrList:Laya.List;
		public imgTopArrow:Laya.Image;
		public imgEmpty:Laya.Image;
		public pgBar:Laya.ProgressBar;
		public lbValue:Laya.Label;
		public itemList:Laya.List;
		public btnRule:common.scaleButton;
		public btnQuick:Laya.Button;
		public btnStrength:Laya.Button;
		public closeByBlank:Laya.Label;
		public curBox:Laya.Box;
		public curItem:common.ItemBox2;
		public nextBox:Laya.Box;
		public nextItem:common.ItemBox2;
		public maxLvBox:Laya.Box;
		public ani_succ:Laya.Animation;
		public ani_succ_r:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.StrengthAttrIR",game.StrengthAttrIR);
			View.regComponent("game.ChooseTreasureIR",game.ChooseTreasureIR);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("god/treasure/TreasureStrength");

        }

    }
}

module ui.god.treasure {
    export class TreasureTujianUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.TreasueTujianIR",game.TreasueTujianIR);

            super.createChildren();
            this.loadUI("god/treasure/TreasureTujian");

        }

    }
}

module ui.god {
    export class TupoUI extends DialogExt {
		public bgPanel:common.CommonTitleView;
		public list_attr:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitleView",common.CommonTitleView);

            super.createChildren();
            this.loadUI("god/Tupo");

        }

    }
}

module ui.god {
    export class UplevelsuccUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public bgPanel:common.CommonTitleView;
		public list_old:Laya.List;
		public img_eff:Laya.Image;
		public list_new:Laya.List;
		public list_oldattr:Laya.List;
		public list_newattr:Laya.List;
		public lab_old:Laya.Label;
		public lab_new:Laya.Label;
		public skillBox:Laya.Box;
		public skillIR:game.GodSkillItemIR;
		public lbName:Laya.Label;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitleView",common.CommonTitleView);
			View.regComponent("game.GodSkillItemIR",game.GodSkillItemIR);

            super.createChildren();
            this.loadUI("god/Uplevelsucc");

        }

    }
}

module ui.god {
    export class ZhenYingKeZhiUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public panel_attr:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);

            super.createChildren();
            this.loadUI("god/ZhenYingKeZhi");

        }

    }
}

module ui.goddomain {
    export class AutoMatchUI extends DialogExt {
		public lbTime:Laya.Label;
		public btnCancel:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("goddomain/AutoMatch");

        }

    }
}

module ui.goddomain {
    export class BattleResultUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public imgResultBg2:Laya.Image;
		public imgResultBg1:Laya.Image;
		public myTeam:Laya.List;
		public closeByBlank:Laya.Label;
		public enemyTeam:Laya.List;
		public imgResult2:Laya.Image;
		public imgResult1:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("goddomain/BattleResult");

        }

    }
}

module ui.goddomain {
    export class BattleSettlementUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public rewardList:Laya.List;
		public lbMVP:Laya.Label;
		public lbScore:Laya.Label;
		public lbCount:Laya.Label;
		public closeByBlank:Laya.Label;
		public headBox:common.UserHeadBox1;
		public channel:common.ChannelBox;
		public imgForce:Laya.Box;
		public lbForce:Laya.FontClip;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.ChannelBox",common.ChannelBox);

            super.createChildren();
            this.loadUI("goddomain/BattleSettlement");

        }

    }
}

module ui.goddomain {
    export class fightStartUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public box_right:Laya.Box;
		public img_02:Laya.Image;
		public ui_head_right:common.UserHeadBox1;
		public lab_name_right:Laya.Label;
		public lab_power_right:Laya.Label;
		public box_left:Laya.Box;
		public img_01:Laya.Image;
		public ui_head_left:common.UserHeadBox1;
		public lab_name_left:Laya.Label;
		public lab_power_left:Laya.Label;
		public img_vs:Laya.Box;
		public list_left:Laya.List;
		public list_right:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("game.GodDmDuizhanIR",game.GodDmDuizhanIR);

            super.createChildren();
            this.loadUI("goddomain/fightStart");

        }

    }
}

module ui.goddomain {
    export class GodDomainUI extends DialogExt {
		public imgBg:Laya.Image;
		public lbScore:Laya.Label;
		public lbCoin:Laya.Label;
		public boxContent:Laya.Box;
		public roleBox:Laya.Box;
		public lbName:Laya.Label;
		public lbTime:Laya.Label;
		public lbCount:Laya.Label;
		public lbRewardDesc:Laya.Label;
		public btnCreate:Laya.Button;
		public btnMatch:Laya.Button;
		public btnAdd:Laya.Button;
		public rewardList:Laya.List;
		public lbForce:Laya.FontClip;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("goddomain/GodDomain");

        }

    }
}

module ui.goddomain {
    export class InviteJoinUI extends DialogExt {
		public lbTime:Laya.Label;
		public lab_title:Laya.Label;
		public lbContent:Laya.Label;
		public btnYes:Laya.Button;
		public btnNo:Laya.Button;
		public checkBox:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("goddomain/InviteJoin");

        }

    }
}

module ui.goddomain {
    export class InviteListUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public teamList:Laya.List;
		public btnRefresh:Laya.Button;
		public lbEmpty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GodDmInviteIR",game.GodDmInviteIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("goddomain/InviteList");

        }

    }
}

module ui.goddomain {
    export class MemberMenuUI extends View {
		public boxBtn:Laya.Box;
		public btnShow:Laya.Button;
		public btnChange:Laya.Button;
		public btnOut:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("goddomain/MemberMenu");

        }

    }
}

module ui.goddomain {
    export class RankViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabBar:Laya.Tab;
		public lbScore:Laya.Label;
		public lbRank:Laya.Label;
		public lab_empty:Laya.Label;
		public viewStack:Laya.ViewStack;
		public rankList:Laya.List;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.RankIR",common.RankIR);
			View.regComponent("common.AwardRankIR",common.AwardRankIR);

            super.createChildren();
            this.loadUI("goddomain/RankView");

        }

    }
}

module ui.goddomain.render {
    export class DuizhanIRUI extends DialogExt {
		public ui_head:common.UserHeadBox1;
		public img_bg:Laya.Image;
		public lab_info:Laya.Label;
		public lab_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("goddomain/render/DuizhanIR");

        }

    }
}

module ui.goddomain.render {
    export class InviteIRUI extends View {
		public lbName:Laya.Label;
		public lbGuild:Laya.Label;
		public lbForce:Laya.Label;
		public btnInvite:Laya.Button;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("goddomain/render/InviteIR");

        }

    }
}

module ui.goddomain.render {
    export class MemberIRUI extends View {
		public btnInvite:Laya.Image;
		public boxRole:Laya.Box;
		public imgDi:Laya.Image;
		public boxForce:Laya.HBox;
		public lbForce:Laya.Label;
		public lbGuild:Laya.Label;
		public lbName:Laya.Label;
		public lbPos:Laya.Label;
		public imgDesc:Laya.Image;
		public lbDesc:Laya.Label;
		public imgChat:Laya.Image;
		public htmlText:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("goddomain/render/MemberIR");

        }

    }
}

module ui.goddomain.render {
    export class TeamIRUI extends View {
		public lbForce:Laya.Label;
		public lbCount:Laya.Label;
		public lbGuild:Laya.Label;
		public lbTeam:Laya.Label;
		public btnJoin:Laya.Button;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("goddomain/render/TeamIR");

        }

    }
}

module ui.goddomain {
    export class TeamUI extends DialogExt {
		public imgBg:Laya.Image;
		public imgDi:Laya.Image;
		public lbBonus:Laya.Label;
		public lbCoin:Laya.Label;
		public lbScore:Laya.Label;
		public btnBonus:common.scaleButton;
		public btnLeave:common.scaleButton;
		public btnInvite:common.scaleButton;
		public checkBox:Laya.CheckBox;
		public btnAdd:common.scaleButton;
		public btnFight:Laya.Button;
		public btnChat:common.scaleButton;
		public lbPrompt:Laya.Label;
		public lbCount:Laya.Label;
		public menuUI:game.MemberMenuView;
		public item_0:game.GodDmMemberIR;
		public item_2:game.GodDmMemberIR;
		public item_1:game.GodDmMemberIR;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.MemberMenuView",game.MemberMenuView);
			View.regComponent("game.GodDmMemberIR",game.GodDmMemberIR);

            super.createChildren();
            this.loadUI("goddomain/Team");

        }

    }
}

module ui.goddomain {
    export class TeamListUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public teamList:Laya.List;
		public lbEmpty:Laya.Image;
		public btnCreate:Laya.Button;
		public btnRefresh:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GodDmTeamIR",game.GodDmTeamIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("goddomain/TeamList");

        }

    }
}

module ui.goddomain {
    export class TeamMatchUI extends DialogExt {
		public btnCancel:Laya.Button;
		public memberList:Laya.List;
		public lbTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("goddomain/TeamMatch");

        }

    }
}

module ui.goddoor {
    export class CurMainUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public viewStack:Laya.ViewStack;
		public vs_item0:game.GodDoorTabDoor;
		public vs_item1:game.GodDoorTabTurn;
		public btn_tishi:common.scaleButton;
		public lab_miyaonum:Laya.Label;
		public lab_jiejingnum:Laya.Label;
		public lab_xingchennum:Laya.Label;
		public list_tab:Laya.List;
		public box_mask:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GodDoorTabDoor",game.GodDoorTabDoor);
			View.regComponent("game.GodDoorTabTurn",game.GodDoorTabTurn);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.TabIR3",common.TabIR3);

            super.createChildren();
            this.loadUI("goddoor/CurMain");

        }

    }
}

module ui.goddoor {
    export class JiangliUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("goddoor/Jiangli");

        }

    }
}

module ui.goddoor.render {
    export class JiangliIRUI extends View {
		public img_di:Laya.Image;
		public lab_miaoshu:Laya.Label;
		public list_head:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("goddoor/render/JiangliIR");

        }

    }
}

module ui.goddoor.render {
    export class TabDoorUI extends View {
		public img_3:Laya.Image;
		public img_2:Laya.Image;
		public img_4:Laya.Image;
		public img_1:Laya.Image;
		public boxbtn_left:Laya.Box;
		public boxbtn_right:Laya.Box;
		public boxbtn_top:Laya.Box;
		public img_teamtag:Laya.Image;
		public lab_cost:Laya.Label;
		public lbXiangqing:Laya.Label;
		public btn_kaiqi:Laya.Button;
		public btn_shop:common.scaleButton;
		public boxLeft:Laya.Box;
		public btn_left:Laya.Button;
		public boxRight:Laya.Box;
		public btn_right:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("goddoor/render/TabDoor");

        }

    }
}

module ui.goddoor.render {
    export class TabTurnUI extends View {
		public ani1:Laya.FrameAnimation;
		public img_wh:Laya.Image;
		public box_old:Laya.Box;
		public img_old_flag:Laya.Image;
		public star_old:common.StarList;
		public lab_old_name:Laya.Label;
		public box_new:Laya.Box;
		public img_new_flag:Laya.Image;
		public star_new:common.StarList;
		public lab_new_name:Laya.Label;
		public list_god:Laya.List;
		public list_race:Laya.List;
		public img_cost_bg:Laya.Image;
		public img_cost1:Laya.Image;
		public lab_cost1:Laya.Label;
		public img_cost2:Laya.Image;
		public lab_cost2:Laya.Label;
		public btn_zhuanhuan:Laya.Button;
		public btn_save:Laya.Button;
		public btn_cancel:Laya.Button;
		public btn_xiangxi:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.StarList",common.StarList);
			View.regComponent("game.godChooseIR",game.godChooseIR);
			View.regComponent("common.RaceBox",common.RaceBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("goddoor/render/TabTurn");

        }

    }
}

module ui.guaji {
    export class FastFightUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lbCount:Laya.Label;
		public lb_cost:Laya.Label;
		public btnFast:Laya.Button;
		public list_items:Laya.List;
		public img_zuanshi:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("guaji/FastFight");

        }

    }
}

module ui.guaji {
    export class GuajiUI extends DialogExt {
		public box_top:Laya.Box;
		public btn_lilian:common.scaleButton;
		public btn_maoxian:common.scaleButton;
		public btn_jingji:common.scaleButton;
		public btn_kf:common.scaleButton;
		public lbOpenLL:Laya.Label;
		public lbOpenMX:Laya.Label;
		public lbOpenJJ:Laya.Label;
		public lbOpenKF:Laya.Label;
		public box_right:Laya.Box;
		public btn_map:Laya.Button;
		public img_map:Laya.Image;
		public map_mask:Laya.Image;
		public lbl_title:Laya.Label;
		public lab_mapstatus:Laya.Label;
		public box_boss:Laya.Box;
		public ani_baoxiang:Laya.Animation;
		public img_baoxiang:Laya.Image;
		public aniArrow:Laya.Animation;
		public img_startbg:Laya.Image;
		public box_task:Laya.Box;
		public btn_task:common.scaleButton;
		public box_talk:Laya.Box;
		public lab_talk:Laya.Label;
		public box_reward:Laya.Box;
		public lab_exp:Laya.Label;
		public lab_gold:Laya.Label;
		public lab_hunshi:Laya.Label;
		public lab_sceneInfo:Laya.Label;
		public btn_uproad:game.UpRoadEntrance;
		public bottomUI:game.GuajiBottomView;
		public ani_bosstips:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.RedPointPropCopy",game.RedPointPropCopy);
			View.regComponent("game.UpRoadEntrance",game.UpRoadEntrance);
			View.regComponent("game.GuajiBottomView",game.GuajiBottomView);

            super.createChildren();
            this.loadUI("guaji/Guaji");

        }

    }
}

module ui.guaji {
    export class GuajiBottomUI extends View {
		public ani1:Laya.FrameAnimation;
		public btn_fast:common.scaleButton;
		public btn_adventure:common.scaleButton;
		public box_coineff:Laya.Box;
		public img_coinblock:Laya.Image;
		public boxCoinClick:Laya.Box;
		public box_bxeff:Laya.Box;
		public box_effGuang:Laya.Animation;
		public box_coineff1:Laya.Box;
		public coinEff:Laya.Animation;
		public pgTime:Laya.ProgressBar;
		public btn_onplay:common.scaleButton;
		public img_timeicon:Laya.Image;
		public lab_info:Laya.Label;
		public lbTime:Laya.Label;
		public anim_bomb:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("guaji/GuajiBottom");

        }

    }
}

module ui.guaji {
    export class GuaJiRewardUI extends DialogExt {
		public uiPanel:common.CommonTitle4View;
		public box_scene:Laya.Image;
		public img_mask:Laya.Image;
		public lab_title:Laya.Label;
		public list:Laya.List;
		public btn_receive:Laya.Button;
		public img_hasReceive:Laya.Image;
		public lab_boss_name:Laya.Label;
		public lab_boss_lv:Laya.Label;
		public lab_cha:Laya.Label;
		public lab_desc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.EffItemBox",common.EffItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guaji/GuaJiReward");

        }

    }
}

module ui.guaji {
    export class GuanQiaInfoUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public list_enemy:Laya.List;
		public list_reward:Laya.List;
		public btn_guaji:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guaji/GuanQiaInfo");

        }

    }
}

module ui.guaji {
    export class GuanQiaNewUI extends DialogExt {
		public img_viewport:Laya.Image;
		public img_bg:Laya.Image;
		public img_guanqia:Laya.Image;
		public ui_level_0:game.GuanQiaNewIR;
		public ui_level_1:game.GuanQiaNewIR;
		public ui_level_2:game.GuanQiaNewIR;
		public ui_level_3:game.GuanQiaNewIR;
		public ui_level_4:game.GuanQiaNewIR;
		public ui_level_5:game.GuanQiaNewIR;
		public ui_level_6:game.GuanQiaNewIR;
		public ui_level_7:game.GuanQiaNewIR;
		public ui_level_8:game.GuanQiaNewIR;
		public ui_level_9:game.GuanQiaNewIR;
		public ani_select:Laya.Animation;
		public img_title:Laya.Image;
		public img_worldmap:Laya.Image;
		public btn_close:Laya.Button;
		public lab_title:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.GuanQiaNewIR",game.GuanQiaNewIR);

            super.createChildren();
            this.loadUI("guaji/GuanQiaNew");

        }

    }
}

module ui.guaji {
    export class GuanQiaNewIRUI extends View {
		public img_icon:Laya.Image;
		public img_boss:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guaji/GuanQiaNewIR");

        }

    }
}

module ui.guaji {
    export class OpenChapterViewUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public ani_guang:Laya.Animation;
		public ani_show:Laya.Animation;
		public ani_hide:Laya.Animation;
		public lab_title:Laya.Label;
		public lab_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guaji/OpenChapterView");

        }

    }
}

module ui.guaji {
    export class ShouyiUI extends DialogExt {
		public bgPanel:common.CommonTitleView;
		public lab_time:Laya.Label;
		public lbExp:Laya.Label;
		public lbGold:Laya.Label;
		public lbHunshi:Laya.Label;
		public list_reward:Laya.List;
		public ani_coin:common.DialogOpenEff;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitleView",common.CommonTitleView);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.DialogOpenEff",common.DialogOpenEff);

            super.createChildren();
            this.loadUI("guaji/Shouyi");

        }

    }
}

module ui.guaji {
    export class ShouyiUpUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public listBg:Laya.Image;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("guaji/ShouyiUp");

        }

    }
}

module ui.guaji {
    export class ShouYiXiangQingUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lab_name:Laya.Label;
		public lab_exp:Laya.Label;
		public lab_gold:Laya.Label;
		public lab_hunshi:Laya.Label;
		public list_reward:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("guaji/ShouYiXiangQing");

        }

    }
}

module ui.guaji {
    export class SysOpenUI extends View {
		public imgIcon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guaji/SysOpen");

        }

    }
}

module ui.guaji {
    export class WorldMapUI extends DialogExt {
		public img_viewport:Laya.Image;
		public bg:Laya.Image;
		public img_chapter6:Laya.Image;
		public img_chapter0:Laya.Image;
		public img_chapter9:Laya.Image;
		public img_chapter8:Laya.Image;
		public img_chapter7:Laya.Image;
		public img_chapter5:Laya.Image;
		public img_chapter3:Laya.Image;
		public img_chapter4:Laya.Image;
		public img_chapter2:Laya.Image;
		public img_chapter1:Laya.Image;
		public box0:Laya.Box;
		public box_chapter0:Laya.Box;
		public lab_chapter0:Laya.Label;
		public lab_open0:Laya.Label;
		public box9:Laya.Box;
		public box_chapter9:Laya.Box;
		public lab_chapter9:Laya.Label;
		public lab_open9:Laya.Label;
		public box8:Laya.Box;
		public box_chapter8:Laya.Box;
		public lab_chapter8:Laya.Label;
		public lab_open8:Laya.Label;
		public box7:Laya.Box;
		public box_chapter7:Laya.Box;
		public lab_chapter7:Laya.Label;
		public lab_open7:Laya.Label;
		public box6:Laya.Box;
		public box_chapter6:Laya.Box;
		public lab_chapter6:Laya.Label;
		public lab_open6:Laya.Label;
		public box5:Laya.Box;
		public box_chapter5:Laya.Box;
		public lab_chapter5:Laya.Label;
		public lab_open5:Laya.Label;
		public box4:Laya.Box;
		public box_chapter4:Laya.Box;
		public lab_chapter4:Laya.Label;
		public lab_open4:Laya.Label;
		public box3:Laya.Box;
		public box_chapter3:Laya.Box;
		public lab_chapter3:Laya.Label;
		public lab_open3:Laya.Label;
		public box2:Laya.Box;
		public box_chapter2:Laya.Box;
		public lab_chapter2:Laya.Label;
		public lab_open2:Laya.Label;
		public box1:Laya.Box;
		public box_chapter1:Laya.Box;
		public lab_chapter1:Laya.Label;
		public lab_open1:Laya.Label;
		public ani_fight:Laya.Animation;
		public ani_suo:Laya.Animation;
		public btn_lev0:Laya.Image;
		public btn_lev1:Laya.Image;
		public btn_lev2:Laya.Image;
		public btn_select:Laya.Image;
		public aniArrow:Laya.Animation;
		public ani_move:Laya.Animation;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guaji/WorldMap");

        }

    }
}

module ui.guide {
    export class GuideMaskUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public bg:Laya.Image;
		public maskMid:Laya.Image;
		public maskBottom:Laya.Image;
		public maskLf:Laya.Image;
		public maskRg:Laya.Image;
		public maskTop:Laya.Image;
		public aniBox:Laya.Box;
		public lbBox:Laya.Box;
		public lbImg:Laya.Image;
		public lbContent:Laya.Label;
		public btnPass:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("guide/GuideMask");

        }

    }
}

module ui.guide {
    export class GuideTalkUI extends DialogExt {
		public box:Laya.Box;
		public bgName:Laya.Image;
		public lab_name:Laya.Label;
		public btnPass:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("guide/GuideTalk");

        }

    }
}

module ui.guild.copy {
    export class atkEndRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lbRank:Laya.Label;
		public rankList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildRankItemRender",game.GuildRankItemRender);

            super.createChildren();
            this.loadUI("guild/copy/atkEndRank");

        }

    }
}

module ui.guild.copy {
    export class DamageRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lbRank:Laya.Label;
		public tab:Laya.Tab;
		public viewstack:Laya.ViewStack;
		public rankList:Laya.List;
		public rewardList:Laya.List;
		public lab_empty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildRankItemRender",game.GuildRankItemRender);

            super.createChildren();
            this.loadUI("guild/copy/DamageRank");

        }

    }
}

module ui.guild.copy {
    export class GuildCopyUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_bg:Laya.Image;
		public item1:game.GuildGuanqiaItemRender;
		public item2:game.GuildGuanqiaItemRender;
		public item3:game.GuildGuanqiaItemRender;
		public pbBlood:Laya.ProgressBar;
		public topBox:Laya.Box;
		public btnReward:common.scaleButton;
		public btnRank:common.scaleButton;
		public btnChallenge:Laya.Button;
		public btn_red:game.RedPointProp;
		public btn_sweep:Laya.Button;
		public ui_red_sweep:game.RedPointProp;
		public btnBuy:common.scaleButton;
		public btnPrev:Laya.Button;
		public btnNext:Laya.Button;
		public lbNum:Laya.Label;
		public lab_name:Laya.Label;
		public lbBlood:Laya.Label;
		public btnRule:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildGuanqiaItemRender",game.GuildGuanqiaItemRender);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/copy/GuildCopy");

        }

    }
}

module ui.guild.copy {
    export class GuildCopySweepResultUI extends DialogExt {
		public bgPanel:common.CommonFightTitleView;
		public box_content:Laya.Box;
		public rewardList:common.AutoLayoutList;
		public lbRank:Laya.Label;
		public lbDamage:Laya.Label;
		public lbTotalDamage:Laya.Label;
		public lab_count:Laya.Label;
		public btn_close:Laya.Button;
		public btn_again:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonFightTitleView",common.CommonFightTitleView);
			View.regComponent("common.AutoLayoutList",common.AutoLayoutList);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/copy/GuildCopySweepResult");

        }

    }
}

module ui.guild.copy {
    export class GuildGuanqiaUI extends View {
		public ani1:Laya.FrameAnimation;
		public box_icon:Laya.Box;
		public img_icon:Laya.Image;
		public ani_select:Laya.Animation;
		public lab_title:Laya.Label;
		public imgSuo:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guild/copy/GuildGuanqia");

        }

    }
}

module ui.guild.copy {
    export class GuildRankItemRenderUI extends View {
		public lbHurt:Laya.Label;
		public lbRank:Laya.Label;
		public lbName:Laya.Label;
		public lbDesc:Laya.Label;
		public lbZhang:Laya.Label;
		public imgrank:Laya.Image;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("guild/copy/GuildRankItemRender");

        }

    }
}

module ui.guild.copy {
    export class JishaJiangliUI extends View {
		public rewardList:Laya.List;
		public rankList:Laya.List;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.JishaJiangliItemRender",game.JishaJiangliItemRender);

            super.createChildren();
            this.loadUI("guild/copy/JishaJiangli");

        }

    }
}

module ui.guild.copy {
    export class JishaJiangliItemRenderUI extends View {
		public imgRank:Laya.Image;
		public lbRank:Laya.Label;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("guild/copy/JishaJiangliItemRender");

        }

    }
}

module ui.guild.copy {
    export class TongguanJiangliUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabbar:Laya.Tab;
		public viewStack:Laya.ViewStack;
		public rewardList:Laya.List;
		public guanquaUI:game.JishaJiangliView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.TongguanJiangliItemRender",game.TongguanJiangliItemRender);
			View.regComponent("game.JishaJiangliView",game.JishaJiangliView);

            super.createChildren();
            this.loadUI("guild/copy/TongguanJiangli");

        }

    }
}

module ui.guild.copy {
    export class TongguanJiangliItemRenderUI extends View {
		public lbTitle:Laya.Label;
		public lbNum:Laya.Label;
		public btnReward:Laya.Button;
		public imgReward:Laya.Image;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("guild/copy/TongguanJiangliItemRender");

        }

    }
}

module ui.guild.donation {
    export class GuildDonationUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public expProg:Laya.ProgressBar;
		public lbTitle:Laya.Label;
		public lbExp:Laya.Label;
		public lbGongxian:Laya.Label;
		public list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("ui.guild.donation.GuildDonationItemRenderUI",ui.guild.donation.GuildDonationItemRenderUI);

            super.createChildren();
            this.loadUI("guild/donation/GuildDonation");

        }

    }
}

module ui.guild.donation {
    export class GuildDonationItemRenderUI extends View {
		public imgCost:Laya.Image;
		public lbCost:Laya.Label;
		public lbGet:Laya.Label;
		public lbName:Laya.Label;
		public btnDonation:Laya.Button;
		public imgBg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/donation/GuildDonationItemRender");

        }

    }
}

module ui.guild.fight {
    export class GradeChestUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabbar:Laya.Tab;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.ChestItemRender",game.ChestItemRender);

            super.createChildren();
            this.loadUI("guild/fight/GradeChest");

        }

    }
}

module ui.guild.fight {
    export class GroupRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public rankList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildRankIRender",game.GuildRankIRender);

            super.createChildren();
            this.loadUI("guild/fight/GroupRank");

        }

    }
}

module ui.guild.fight {
    export class GuildFightUI extends DialogExt {
		public imgArrow1:Laya.Button;
		public imgArrow2:Laya.Button;
		public btnRank:Laya.Button;
		public atkList:Laya.List;
		public lbJifen2:Laya.Label;
		public lbJifen1:Laya.Label;
		public lbName2:Laya.Label;
		public lbName1:Laya.Label;
		public lbForce2:Laya.Label;
		public lbForce1:Laya.Label;
		public lbGrade:Laya.Label;
		public lbTime:Laya.Label;
		public teamList:Laya.List;
		public menuView:game.FightMenuPanel;
		public myGuildBox:common.UserHeadBox1;
		public enemyGuildBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.MemberItemRender",game.MemberItemRender);
			View.regComponent("game.FightMenuPanel",game.FightMenuPanel);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("guild/fight/GuildFight");

        }

    }
}

module ui.guild.fight {
    export class GuildFightMenuUI extends View {
		public lbTitle:Laya.Label;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guild/fight/GuildFightMenu");

        }

    }
}

module ui.guild.fight {
    export class GuildFightWaitUI extends DialogExt {
		public imgBg:Laya.Image;
		public imgWangzhe:Laya.Image;
		public menuView:game.FightMenuPanel;
		public btnJoin:Laya.Button;
		public lbDesc:Laya.Label;
		public lbNote:Laya.Label;
		public lbWangzhe:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.FightMenuPanel",game.FightMenuPanel);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/fight/GuildFightWait");

        }

    }
}

module ui.guild.fight {
    export class HonorHallUI extends DialogExt {
		public imgBg:Laya.Image;
		public btnNext:Laya.Button;
		public btnPrev:Laya.Button;
		public item0:game.HonorGuildIRender;
		public item1:game.HonorGuildIRender;
		public item2:game.HonorGuildIRender;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.HonorGuildIRender",game.HonorGuildIRender);

            super.createChildren();
            this.loadUI("guild/fight/HonorHall");

        }

    }
}

module ui.guild.fight {
    export class PersonRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabBar:Laya.Tab;
		public viewStack:Laya.ViewStack;
		public awardList:Laya.List;
		public combo:Laya.ComboBox;
		public rankList:Laya.List;
		public empty:Laya.Image;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.AwardRankIR",common.AwardRankIR);
			View.regComponent("game.PersonRankIRender",game.PersonRankIRender);

            super.createChildren();
            this.loadUI("guild/fight/PersonRank");

        }

    }
}

module ui.guild.fight.render {
    export class ChestItemRenderUI extends View {
		public bg:Laya.Image;
		public icon:Laya.Image;
		public itemBox:common.ItemBox;
		public lbName:Laya.Label;
		public lbItemName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("guild/fight/render/ChestItemRender");

        }

    }
}

module ui.guild.fight.render {
    export class GuildFightRenderUI extends View {
		public lifeList:Laya.List;
		public atkList:Laya.List;
		public btnChallenge:Laya.Button;
		public pgBlood:Laya.ProgressBar;
		public lbName:Laya.Label;
		public lbForce:Laya.Label;
		public lbScore:Laya.Label;
		public lbBlood:Laya.Label;
		public godList:Laya.List;
		public boxUser:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.HeadBox",common.HeadBox);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("guild/fight/render/GuildFightRender");

        }

    }
}

module ui.guild.fight.render {
    export class GuildRongyuRenderUI extends View {
		public imgBg:Laya.Image;
		public imgEmpty:Laya.Image;
		public lbLeader:Laya.Label;
		public lbForce:Laya.Label;
		public lbSvrName:Laya.Label;
		public lbGuildName:Laya.Label;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("guild/fight/render/GuildRongyuRender");

        }

    }
}

module ui.guild.fight.render {
    export class GuildSaiQuRenderUI extends View {
		public ui_view:common.CommonRankIR;
		public imgtype:Laya.Image;
		public lbForce:Laya.Label;
		public lbJifen:Laya.Label;
		public lbName:Laya.Label;
		public lbScore:Laya.Label;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonRankIR",common.CommonRankIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("guild/fight/render/GuildSaiQuRender");

        }

    }
}

module ui.guild.fight.render {
    export class SeasonAwardIRenderUI extends View {
		public itemList:Laya.List;
		public imgRank:Laya.Image;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("guild/fight/render/SeasonAwardIRender");

        }

    }
}

module ui.guild.fight {
    export class SeasonAwardUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabbar:Laya.Tab;
		public viewStack:Laya.ViewStack;
		public awardList:Laya.List;
		public rankList:Laya.List;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.AwardIRender",game.AwardIRender);
			View.regComponent("game.GuildRankIRender",game.GuildRankIRender);

            super.createChildren();
            this.loadUI("guild/fight/SeasonAward");

        }

    }
}

module ui.guild {
    export class GuildMainUI extends DialogExt {
		public anil_help:Laya.FrameAnimation;
		public imgBg:Laya.Image;
		public boxContent:Laya.Box;
		public boxSkill:common.scaleButton;
		public btnSkill:Laya.Button;
		public boxShop:common.scaleButton;
		public btnShop:Laya.Button;
		public boxHall:common.scaleButton;
		public btnHall:Laya.Button;
		public boxDonate:common.scaleButton;
		public btnDonate:Laya.Button;
		public boxFight:common.scaleButton;
		public btnBattle:Laya.Button;
		public boxCopy:common.scaleButton;
		public btnCopy:Laya.Button;
		public boxHelp:common.scaleButton;
		public btnHelp:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("guild/GuildMain");

        }

    }
}

module ui.guild.hall {
    export class GuildApplyListUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_apply:Laya.List;
		public img_side:Laya.Image;
		public btn_allno:Laya.Button;
		public btn_allyes:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildApplyRender",game.GuildApplyRender);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/hall/GuildApplyList");

        }

    }
}

module ui.guild.hall {
    export class GuildApplyRenderUI extends View {
		public lab_name:Laya.Label;
		public lab_level:Laya.Label;
		public btn_yes:common.scaleButton;
		public btn_no:common.scaleButton;
		public lab_power:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/hall/GuildApplyRender");

        }

    }
}

module ui.guild.hall {
    export class GuildInfoUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_icon:Laya.Image;
		public are_putin:Laya.TextArea;
		public lab_people:Laya.Label;
		public lab_level:Laya.Label;
		public lab_auto:Laya.Label;
		public lab_exp:Laya.Label;
		public lbName:Laya.Label;
		public lbGuildName:Laya.Label;
		public list_Member:Laya.List;
		public btn_input:common.scaleButton;
		public btn_applyList:Laya.Button;
		public btn_setup:Laya.Button;
		public btn_seticon:Laya.Button;
		public btn_exitGuild:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.MemberInfoRender",game.MemberInfoRender);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("guild/hall/GuildInfo");

        }

    }
}

module ui.guild.hall {
    export class GuildNoticeUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public btn_cancel:Laya.Button;
		public btn_sure:Laya.Button;
		public are_putin:Laya.TextArea;
		public label_residuetext:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/hall/GuildNotice");

        }

    }
}

module ui.guild.hall {
    export class GuildPopUpUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public btn_Sure:Laya.Button;
		public btn_Back:Laya.Button;
		public lab_zhu:Laya.Label;
		public lab_wei:Laya.Label;
		public lab_bin:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/hall/GuildPopUp");

        }

    }
}

module ui.guild.hall {
    export class GuildSetUpUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public btnAddOne:Laya.Button;
		public btnRedOne:Laya.Button;
		public btnAddTen:Laya.Button;
		public btnRedTen:Laya.Button;
		public btn_zhaomu:Laya.Button;
		public btn_sure:Laya.Button;
		public btnRight:Laya.Button;
		public btnLeft:Laya.Button;
		public lbYanzheng:Laya.Label;
		public inputLv:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/hall/GuildSetUp");

        }

    }
}

module ui.guild.hall {
    export class MemberInfoRenderUI extends View {
		public imgBg:Laya.Image;
		public lbName:Laya.Label;
		public lbTime:Laya.Label;
		public lbJob:Laya.Label;
		public lbForce:Laya.Label;
		public headBox:common.UserHeadBox1;
		public btnSetup:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("guild/hall/MemberInfoRender");

        }

    }
}

module ui.guild.hall {
    export class MemberSetupUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public lbContent:Laya.Label;
		public btnOpt1:Laya.Button;
		public btnOpt2:Laya.Button;
		public btnOpt3:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/hall/MemberSetup");

        }

    }
}

module ui.guild.hall {
    export class MemberzhenrouUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public btn_kick:Laya.Button;
		public btn_give:Laya.Button;
		public btn_addfriend:Laya.Button;
		public btn_chat:Laya.Button;
		public userheadbox:common.UserHeadBox1;
		public lineupUI:common.CommonLineupView;
		public lab_guildname:Laya.Label;
		public lab_name:Laya.Label;
		public lab_job:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.CommonLineupView",common.CommonLineupView);

            super.createChildren();
            this.loadUI("guild/hall/Memberzhenrou");

        }

    }
}

module ui.guild.help {
    export class AskHelpViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public listItem:common.ListBase;
		public checkBox:Laya.CheckBox;
		public btnSure:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ListBase",common.ListBase);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/help/AskHelpView");

        }

    }
}

module ui.guild.help {
    export class HelpMainViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public viewStack:Laya.ViewStack;
		public myHelpUI:ui.guild.help.MyHelpViewUI;
		public othersHelpUI:ui.guild.help.OhtersHelpViewUI;
		public tabbar:common.TabBase;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("ui.guild.help.MyHelpViewUI",ui.guild.help.MyHelpViewUI);
			View.regComponent("ui.guild.help.OhtersHelpViewUI",ui.guild.help.OhtersHelpViewUI);
			View.regComponent("common.TabBase",common.TabBase);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("guild/help/HelpMainView");

        }

    }
}

module ui.guild.help {
    export class MyHelpIRUI extends View {
		public btnAdd:Laya.Button;
		public itemBox:common.ItemBox;
		public pb:Laya.ProgressBar;
		public lbTitle:Laya.Label;
		public lbDesc:Laya.Label;
		public lbNum:Laya.Label;
		public lbState:Laya.Label;
		public lbPbNum:Laya.Label;
		public lbQiuyuan:Laya.Label;
		public btnLingqu:Laya.Button;
		public imgFinish:Laya.Image;
		public imgRedpoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/help/MyHelpIR");

        }

    }
}

module ui.guild.help {
    export class MyHelpViewUI extends DialogExt {
		public animBX:Laya.FrameAnimation;
		public animGuang:Laya.Animation;
		public imgBaoxiang:Laya.Image;
		public btnAskHelp:common.scaleButton;
		public listHelp:Laya.List;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.GuildMyHelpIR",game.GuildMyHelpIR);

            super.createChildren();
            this.loadUI("guild/help/MyHelpView");

        }

    }
}

module ui.guild.help {
    export class OhtersHelpViewUI extends DialogExt {
		public listHelp:Laya.List;
		public boxEmpty:Laya.Image;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.GuildOthersHelpIR",game.GuildOthersHelpIR);

            super.createChildren();
            this.loadUI("guild/help/OhtersHelpView");

        }

    }
}

module ui.guild.help {
    export class OthersHelpIRUI extends View {
		public pbNum:Laya.ProgressBar;
		public btnHelp:Laya.Button;
		public itemBox:common.ItemBox2;
		public imgCost:Laya.Image;
		public lbCost:Laya.Label;
		public lbNum:Laya.Label;
		public lbTitle:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("guild/help/OthersHelpIR");

        }

    }
}

module ui.guild.init {
    export class CreateGuildUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public img_icon:Laya.Image;
		public chk_auto:Laya.CheckBox;
		public btn_red:common.scaleButton;
		public btn_add:common.scaleButton;
		public btn_create:Laya.Button;
		public btn_seticon:common.scaleButton;
		public lab_diamonds:Laya.Label;
		public lbVip:Laya.Label;
		public lab_level:Laya.TextInput;
		public are_putin:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/init/CreateGuild");

        }

    }
}

module ui.guild.init {
    export class GuildinitUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_guild:Laya.List;
		public btn_lookup:common.scaleButton;
		public btn_update:common.scaleButton;
		public btn_create:Laya.Button;
		public img_side:Laya.Image;
		public are_putin:Laya.TextArea;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildinitRender",game.GuildinitRender);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/init/Guildinit");

        }

    }
}

module ui.guild.init {
    export class GuildinitRenderUI extends View {
		public btn_cancel:Laya.Button;
		public btn_apply:Laya.Button;
		public lab_name:Laya.Label;
		public lab_level:Laya.Label;
		public lab_people:Laya.Label;
		public lab_limit:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("guild/init/GuildinitRender");

        }

    }
}

module ui.guild.init {
    export class IconChangeUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_icon:Laya.List;
		public btn_sure:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.IconRender",game.IconRender);

            super.createChildren();
            this.loadUI("guild/init/IconChange");

        }

    }
}

module ui.guild.init {
    export class IconRenderUI extends View {
		public box_icon:Laya.Box;
		public img_icon:Laya.Image;
		public img_zz:Laya.Image;
		public img_gou:Laya.Image;
		public img_selected:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guild/init/IconRender");

        }

    }
}

module ui.guild.skill {
    export class GuildSkillUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public item6:game.GuildSkillRender;
		public item5:game.GuildSkillRender;
		public item3:game.GuildSkillRender;
		public item2:game.GuildSkillRender;
		public item1:game.GuildSkillRender;
		public lb_shuxing:Laya.Label;
		public box_xiaoguo:Laya.HBox;
		public lb_name:Laya.Label;
		public lb_xiaoguo:Laya.Label;
		public lb_max:Laya.Label;
		public box_xiaohao:Laya.HBox;
		public img_linghunshi:Laya.Image;
		public lb_xiaohao:Laya.Label;
		public lb_xiaohao2:Laya.Label;
		public btn_shengji:Laya.Button;
		public btn_reset:common.scaleButton;
		public tab_zhenying:Laya.Tab;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.GuildSkillRender",game.GuildSkillRender);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("guild/skill/GuildSkill");

        }

    }
}

module ui.guild.skill {
    export class GuildSkillRenderUI extends View {
		public ani_select:Laya.Animation;
		public img_shuxingqiu:Laya.Image;
		public lb_dengji:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("guild/skill/GuildSkillRender");

        }

    }
}

module ui.hud.entrance {
    export class EntranceListUI extends DialogExt {
		public img_bg:Laya.Image;
		public btnlist:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.EntranceIR",game.EntranceIR);

            super.createChildren();
            this.loadUI("hud/entrance/EntranceList");

        }

    }
}

module ui.hud.entrance {
    export class EntranceListIRUI extends View {
		public icon:Laya.Image;
		public redpoint:game.RedPointProp;
		public box_condition:Laya.Box;
		public lab_condition:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("hud/entrance/EntranceListIR");

        }

    }
}

module ui.hud {
    export class HudBoxUI extends DialogExt {
		public btn_chat:common.scaleButton;
		public btnPrivateChat:common.scaleButton;
		public img_bottom:Laya.Image;
		public vbox_funs:Laya.HBox;
		public img0:Laya.Image;
		public btn_main:common.scaleButton;
		public rpMain:game.RedPointProp;
		public img1:Laya.Image;
		public btn_god:common.scaleButton;
		public img2:Laya.Image;
		public btn_equip:common.scaleButton;
		public img3:Laya.Image;
		public btn_shenqi:common.scaleButton;
		public img4:Laya.Image;
		public btn_bag:common.scaleButton;
		public img5:Laya.Image;
		public btn_fight:common.scaleButton;
		public img_select:Laya.Image;
		public box_top:Laya.Box;
		public pro_exp:Laya.ProgressBar;
		public img_zhanli:Laya.Image;
		public clip_xp:Laya.FontClip;
		public img_icon:Laya.Image;
		public img_dikuang:Laya.Image;
		public imgHeadFrame:Laya.Image;
		public box_vip:Laya.Box;
		public lbl_vip:Laya.FontClip;
		public vbox:Laya.HBox;
		public btn_addgold:Laya.Image;
		public lab_money:Laya.Label;
		public btn_add_zuanshi:Laya.Image;
		public lab_zuanshi:Laya.Label;
		public lbl_name:Laya.Label;
		public lbl_level:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/HudBox");

        }

    }
}

module ui.hud {
    export class MainViewUI extends DialogExt {
		public btnbox:Laya.Box;
		public btn_show:ui.hud.ShousuoBtnUI;
		public boxBottom:Laya.Box;
		public btn_shop:common.scaleButton;
		public btn_friend:common.scaleButton;
		public btn_mail:common.scaleButton;
		public btn_rank:common.scaleButton;
		public btn_shenjiezhimen:common.scaleButton;
		public btn_tujian:common.scaleButton;
		public btnGonghui:common.scaleButton;
		public img_chat:Laya.Image;
		public chatList:Laya.List;
		public btn_task:common.scaleButton;
		public boxBottom2:Laya.Box;
		public btnZhaohuan:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.hud.ShousuoBtnUI",ui.hud.ShousuoBtnUI);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("game.RedPointPropCopy",game.RedPointPropCopy);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("hud/MainView");

        }

    }
}

module ui.hud.player {
    export class ChangeNameUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public textInput:Laya.TextInput;
		public lab_diamonds:Laya.Label;
		public btn_queding:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("hud/player/ChangeName");

        }

    }
}

module ui.hud.player {
    export class HeroicModelMainUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabBar:Laya.Tab;
		public boxContent:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);

            super.createChildren();
            this.loadUI("hud/player/HeroicModelMain");

        }

    }
}

module ui.hud.player {
    export class PlayerDetailsUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public boxContent:Laya.Box;
		public tabBar:Laya.Tab;
		public btnTest:Laya.Box;
		public btn_gm:Laya.Button;
		public btn_debug:Laya.Button;
		public btn_stats:Laya.Button;
		public btn_vconsole:Laya.Button;
		public btn_loglevel:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/player/PlayerDetails");

        }

    }
}

module ui.hud.player {
    export class TabChangeHeadUI extends DialogExt {
		public listIcon:Laya.List;
		public btnChange:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.guild.init.IconRenderUI",ui.guild.init.IconRenderUI);

            super.createChildren();
            this.loadUI("hud/player/TabChangeHead");

        }

    }
}

module ui.hud.player {
    export class TabChangeHeadBoxUI extends DialogExt {
		public listIcon:Laya.List;
		public btnChange:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("hud/player/TabChangeHeadBox");

        }

    }
}

module ui.hud.player {
    export class TabChangeHeroicModelUI extends DialogExt {
		public listGod:Laya.List;
		public listBtn:Laya.List;
		public boxRole:Laya.Box;
		public btnSure:Laya.Button;
		public lbUnlock:Laya.Label;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("hud/player/TabChangeHeroicModel");

        }

    }
}

module ui.hud.player {
    export class TabCustomerServiceUI extends DialogExt {
		public lbFankui:Laya.TextInput;
		public lbTitle:Laya.Label;
		public cbBug:Laya.CheckBox;
		public btn_sure:Laya.Button;
		public cbTips:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("hud/player/TabCustomerService");

        }

    }
}

module ui.hud.player {
    export class TabPlayerInfoUI extends DialogExt {
		public pbExp:Laya.ProgressBar;
		public lbForce:Laya.FontClip;
		public headBox:common.UserHeadBox1;
		public lbLv:Laya.Label;
		public labAccout:Laya.Label;
		public lbQufu:Laya.Label;
		public lbGuild:Laya.Label;
		public lbName:Laya.Label;
		public lbExp:Laya.Label;
		public btnChangeModel:Laya.Button;
		public btnNotice:Laya.Button;
		public btnChangeName:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("hud/player/TabPlayerInfo");

        }

    }
}

module ui.hud.player {
    export class TabSysSettingUI extends DialogExt {
		public img_yinyueoff:Laya.Image;
		public img_yinyueon:Laya.Image;
		public img_yinxiaooff:Laya.Image;
		public img_yinxiaoon:Laya.Image;
		public lab_clientVersion:Laya.Label;
		public lab_resVersion:Laya.Label;
		public slider_Sound:Laya.HSlider;
		public slider_Music:Laya.HSlider;
		public btnSwitchAcc:Laya.Button;
		public btnExitGame:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("hud/player/TabSysSetting");

        }

    }
}

module ui.hud.render {
    export class ActivityBtnIRUI extends View {
		public btn:common.scaleButton;
		public ani:Laya.Animation;
		public redPoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/render/ActivityBtnIR");

        }

    }
}

module ui.hud.render {
    export class LoginNoticeIRUI extends View {
		public boxContent:Laya.Box;
		public lab_content:Laya.Label;
		public img_bg:Laya.Image;
		public lab_title:Laya.Label;
		public btnArrow:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/render/LoginNoticeIR");

        }

    }
}

module ui.hud.render {
    export class SysTopBtnIRUI extends View {
		public btnFunc:common.scaleButton;
		public redpoint:game.RedPointProp;
		public lbText:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("hud/render/SysTopBtnIR");

        }

    }
}

module ui.hud.render {
    export class SysTopResIRUI extends View {
		public btnAdd:common.scaleButton;
		public imgRes:Laya.Image;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("hud/render/SysTopResIR");

        }

    }
}

module ui.hud {
    export class ShousuoBtnUI extends View {
		public aniShou:Laya.FrameAnimation;
		public aniFang:Laya.FrameAnimation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/ShousuoBtn");

        }

    }
}

module ui.hud.view {
    export class CheatUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lbLv:Laya.TextInput;
		public btnLv:Laya.Button;
		public lbAddID:Laya.TextInput;
		public btnAddItem:Laya.Button;
		public lbAddNum:Laya.TextInput;
		public lbDelId:Laya.TextInput;
		public btnDelItem:Laya.Button;
		public lbDelNum:Laya.TextInput;
		public lbMailID:Laya.TextInput;
		public btnAddMail:Laya.Button;
		public lbJishi:Laya.TextInput;
		public btnJishiRef:Laya.Button;
		public lbTowerId:Laya.TextInput;
		public btnPassTower:Laya.Button;
		public btn5:Laya.Button;
		public lbCmd:Laya.TextInput;
		public btnCmd:Laya.Button;
		public chk_cam:Laya.CheckBox;
		public btn2:Laya.Button;
		public btn1:Laya.Button;
		public btn3:Laya.Button;
		public btn4:Laya.Button;
		public lbGodID:Laya.TextInput;
		public btnAddGod:Laya.Button;
		public lbGodQua:Laya.TextInput;
		public lbGodLv:Laya.TextInput;
		public resetCombo:Laya.ComboBox;
		public btnReset:Laya.Button;
		public lbContent:Laya.Label;
		public itemCombo:Laya.ComboBox;
		public guideCombo:Laya.ComboBox;
		public btnGuide:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("hud/view/Cheat");

        }

    }
}

module ui.hud.view {
    export class ExchangeGoldUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public img_bx:Laya.Image;
		public lbGold:Laya.Label;
		public lbCiShu:Laya.Label;
		public btn_Duihuan:Laya.Button;
		public box_consume:Laya.Box;
		public lab_consume:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("hud/view/ExchangeGold");

        }

    }
}

module ui.hud.view {
    export class LoginNoticeUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public btnKnow:Laya.Button;
		public checkbox:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/view/LoginNotice");

        }

    }
}

module ui.hud.view {
    export class SysTopUI extends DialogExt {
		public boxTop:Laya.Box;
		public bgTitle:Laya.Image;
		public imgSys:Laya.Image;
		public boxBottom:Laya.Box;
		public btnList:Laya.List;
		public boxFogforest:Laya.Box;
		public btnOneKey:Laya.Button;
		public lbGuanqia:Laya.Label;
		public box_island:Laya.Box;
		public lab_island_rob:Laya.Label;
		public lab_island_occupy:Laya.Label;
		public lab_island_refresh:Laya.Label;
		public btn_island_add:common.scaleButton;
		public btnClose:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.SysTopBtnIR",game.SysTopBtnIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("hud/view/SysTop");

        }

    }
}

module ui.hud.view {
    export class VipLvUpUI extends DialogExt {
		public box_light_eff:Laya.Box;
		public eff_guang:Laya.Animation;
		public lbScore:Laya.Label;
		public btnComfirnm:Laya.Button;
		public newClip:Laya.FontClip;
		public oldClip:Laya.FontClip;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("hud/view/VipLvUp");

        }

    }
}

module ui.island {
    export class EmptyOreUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public imgGain:Laya.Image;
		public btnOccupy:Laya.Button;
		public itemList:Laya.List;
		public pgRes:Laya.ProgressBar;
		public lbMinu:Laya.Label;
		public lbGain:Laya.Label;
		public lbPercent:Laya.Label;
		public btnPrev:Laya.Image;
		public btnNext:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("island/EmptyOre");

        }

    }
}

module ui.island {
    export class IslandMainUI extends DialogExt {
		public itemPanel:Laya.Panel;
		public imgBg1:Laya.Image;
		public imgBg2:Laya.Image;
		public imgBg3:Laya.Image;
		public imgBg4:Laya.Image;
		public boxAll:Laya.Box;
		public item0:Laya.Box;
		public item1:Laya.Box;
		public item2:Laya.Box;
		public item3:Laya.Box;
		public item4:Laya.Box;
		public item5:Laya.Box;
		public item6:Laya.Box;
		public imgArrow:ui.island.itemrender.OccupyFlagIRUI;
		public lbRefreshTime:Laya.Label;
		public lbDesc:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.island.itemrender.OccupyFlagIRUI",ui.island.itemrender.OccupyFlagIRUI);

            super.createChildren();
            this.loadUI("island/IslandMain");

        }

    }
}

module ui.island.itemrender {
    export class OccupyFlagIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public img_di_0:Laya.Image;
		public img_di_1:Laya.Image;
		public img_flag:Laya.Image;
		public imgGuang:Laya.Image;
		public imgShifu:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("island/itemrender/OccupyFlagIR");

        }

    }
}

module ui.island.itemrender {
    export class OreSpotItemRenderUI extends View {
		public imgBg:Laya.Image;
		public icon:Laya.Image;
		public ui_flag:ui.island.itemrender.OccupyFlagIRUI;
		public ImgForeBg:Laya.Image;
		public lbName:Laya.Label;
		public lbTbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.island.itemrender.OccupyFlagIRUI",ui.island.itemrender.OccupyFlagIRUI);

            super.createChildren();
            this.loadUI("island/itemrender/OreSpotItemRender");

        }

    }
}

module ui.island {
    export class OreExplainUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public imgGain:Laya.Image;
		public lbMinu:Laya.Label;
		public lbGain:Laya.Label;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("island/OreExplain");

        }

    }
}

module ui.island {
    export class OreMapUI extends DialogExt {
		public itemPanel:Laya.Panel;
		public imgBg:Laya.Image;
		public itemList:Laya.List;
		public lbRefreshTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.OreSpotIR",game.OreSpotIR);

            super.createChildren();
            this.loadUI("island/OreMap");

        }

    }
}

module ui.island {
    export class OreSettlementUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public listBg:Laya.Image;
		public itemList:Laya.List;
		public lbContent:Laya.Label;
		public btnConfirm:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("island/OreSettlement");

        }

    }
}

module ui.island {
    export class PlayerOreUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public lineupUI:common.CommonLineupView;
		public pgRes:Laya.ProgressBar;
		public imgGain:Laya.Image;
		public lbName:Laya.Label;
		public lbGuild:Laya.Label;
		public lbGain:Laya.Label;
		public lbResPerc:Laya.Label;
		public btnExplain:common.scaleButton;
		public btnRob:Laya.Button;
		public btnOccupy:Laya.Button;
		public itemList:Laya.List;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.CommonLineupView",common.CommonLineupView);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("island/PlayerOre");

        }

    }
}

module ui.island {
    export class SelfOreUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public itemList:Laya.List;
		public imgGain:Laya.Image;
		public pgRes:Laya.ProgressBar;
		public lbGain:Laya.Label;
		public lbPercent:Laya.Label;
		public lbTime:Laya.Label;
		public lab_empty:Laya.Label;
		public btnExplain:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("island/SelfOre");

        }

    }
}

module ui.login {
    export class CreateRoleUI extends DialogExt {
		public edit_name:Laya.TextInput;
		public btn_ok:Laya.Button;
		public btn_random:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("login/CreateRole");

        }

    }
}

module ui.login {
    export class LoginUI extends DialogExt {
		public imgBg:Laya.Image;
		public ed_account:Laya.TextInput;
		public btn_login:Laya.Button;
		public btn_touristslogin:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("login/Login");

        }

    }
}

module ui.login {
    export class SelectServerUI extends DialogExt {
		public img_bg:Laya.Image;
		public btnNotice:Laya.Button;
		public btn_exit:Laya.Button;
		public box_entergame:Laya.Box;
		public btn_entergame:common.scaleButton;
		public btn_selectlist:Laya.Button;
		public lbl_cname:Laya.Label;
		public img_cstate:Laya.Image;
		public img_curnew:Laya.Image;
		public box_selectserver:Laya.Box;
		public list_group:Laya.List;
		public list_serverlist:Laya.List;
		public btn_ok:Laya.Button;
		public btn_cancel:Laya.Button;
		public lab_xieyi:Laya.Label;
		public lab_yinsi:Laya.Label;
		public chk_un:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("login/SelectServer");

        }

    }
}

module ui.login {
    export class UserNoticeUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public img_bg:Laya.Image;
		public panel_content:Laya.Panel;
		public btn_sure:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);

            super.createChildren();
            this.loadUI("login/UserNotice");

        }

    }
}

module ui.login {
    export class WaitUI extends DialogExt {
		public ani_load:Laya.FrameAnimation;
		public lbl_progress:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("login/Wait");

        }

    }
}

module ui.mail {
    export class MailIRUI extends View {
		public imgBox:Laya.Image;
		public imgIcon:Laya.Image;
		public lbTitle:Laya.Label;
		public lbTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("mail/MailIR");

        }

    }
}

module ui.mail {
    export class MailReadUI extends DialogExt {
		public boxItem:Laya.Box;
		public list:Laya.List;
		public lbContent:Laya.Label;
		public lbTime:Laya.Label;
		public btnOperate:Laya.Button;
		public lab_title:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("mail/MailRead");

        }

    }
}

module ui.mail {
    export class MailViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lab_mail_num:Laya.Label;
		public mailList:Laya.List;
		public btnDelAll:Laya.Button;
		public btnGetAll:Laya.Button;
		public box_empty:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.MailIR",game.MailIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("mail/MailView");

        }

    }
}

module ui.prompt {
    export class RoleEffUI extends DialogExt {
		public img_zhezhao:Laya.Image;
		public lab_info:Laya.Label;
		public img_level:Laya.Image;
		public imgBg:Laya.Image;
		public list_stars_0:Laya.List;
		public lab_name:Laya.Label;
		public img_bgs:Laya.Image;
		public starList:Laya.List;
		public box_skill:Laya.Box;
		public oldSkill:common.SkillBox;
		public newSkill:common.SkillBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.prompt.StarUpRenderUI",ui.prompt.StarUpRenderUI);
			View.regComponent("common.SkillBox",common.SkillBox);

            super.createChildren();
            this.loadUI("prompt/RoleEff");

        }

    }
}

module ui.prompt {
    export class StarUpRenderUI extends View {
		public glod:Laya.Animation;
		public red:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("prompt/StarUpRender");

        }

    }
}

module ui.prompt {
    export class upPowerUI extends DialogExt {
		public img_bg:Laya.Image;
		public clip_power:Laya.FontClip;
		public box_changNum:Laya.HBox;
		public clip_changNum:Laya.FontClip;
		public img_changNum:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("prompt/upPower");

        }

    }
}

module ui.rank {
    export class RankTabViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public list_tab:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.RankTabIR",game.RankTabIR);

            super.createChildren();
            this.loadUI("rank/RankTabView");

        }

    }
}

module ui.rank {
    export class RankViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public boxCommonRank:Laya.Box;
		public imgThirdEmpty:Laya.Image;
		public imgSecondEmpty:Laya.Image;
		public imgFirstEmpty:Laya.Image;
		public imgFirstTY:Laya.Image;
		public imgSecondTY:Laya.Image;
		public imgThirdTY:Laya.Image;
		public boxRole:Laya.Box;
		public boxThird:Laya.Box;
		public boxSecond:Laya.Box;
		public boxFirst:Laya.Box;
		public lbFisrtDesc:Laya.Label;
		public lbFirstName:Laya.Label;
		public lbFirstEmpty:Laya.Label;
		public lbSecondDesc:Laya.Label;
		public lbSecondName:Laya.Label;
		public lbSecondEmpty:Laya.Label;
		public lbThirdDesc:Laya.Label;
		public lbThirdName:Laya.Label;
		public lbThirdEmpty:Laya.Label;
		public list_rankList:Laya.List;
		public lab_myRank:Laya.Label;
		public lab_myValue:Laya.Label;
		public lab_valueName:Laya.Label;
		public lab_empty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.RankModuleIR",game.RankModuleIR);

            super.createChildren();
            this.loadUI("rank/RankView");

        }

    }
}

module ui.rank.render {
    export class RankIRUI extends View {
		public ui_view:common.CommonRankIR;
		public lab_empty:Laya.Label;
		public box_info:Laya.Box;
		public lab_name:Laya.Label;
		public lab_value1:Laya.Label;
		public lab_guildName:Laya.Label;
		public lab_value2:Laya.Label;
		public lab_value22:Laya.Label;
		public btn_wordShip:Laya.Button;
		public redPoint:game.RedPointProp;
		public ui_headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonRankIR",common.CommonRankIR);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("rank/render/RankIR");

        }

    }
}

module ui.rank.render {
    export class RankTabIRUI extends View {
		public img_bg:Laya.Image;
		public box_info:Laya.Box;
		public lab_name:Laya.Label;
		public lab_value1:Laya.Label;
		public btn_wordShip:Laya.Button;
		public redPoint:game.RedPointProp;
		public ui_headBox:common.UserHeadBox1;
		public lab_empty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("rank/render/RankTabIR");

        }

    }
}

module ui.shop {
    export class BuyUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public img_type1:Laya.Image;
		public img_type2:Laya.Image;
		public btn_buy:Laya.Button;
		public btn_add:Laya.Button;
		public btn_red:Laya.Button;
		public btn_addTen:Laya.Button;
		public btn_redTen:Laya.Button;
		public itembox:common.ItemBox;
		public are_putin:Laya.TextInput;
		public lab_sum:Laya.Label;
		public lab_rouyu:Laya.Label;
		public lab_name:Laya.Label;
		public lab_overplus:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("shop/Buy");

        }

    }
}

module ui.shop {
    export class ShopUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public ani3:Laya.FrameAnimation;
		public ani4:Laya.FrameAnimation;
		public imgBg0:Laya.Image;
		public img_gril:Laya.Image;
		public imgBg1:Laya.Image;
		public boxTop:Laya.Box;
		public boxRes:Laya.HBox;
		public btn_addgold:Laya.Image;
		public lab_money:Laya.Label;
		public btn_add_zuanshi:Laya.Image;
		public lab_zuanshi:Laya.Label;
		public box_cost:Laya.Box;
		public imgCost:Laya.Image;
		public lbNum:Laya.Label;
		public lab_speak:Laya.Label;
		public tabList:Laya.List;
		public shopList:Laya.List;
		public boxRefresh:Laya.Box;
		public img_marketGem:Laya.Image;
		public lab_gem_num:Laya.Label;
		public lab_free_num:Laya.Label;
		public lab_gem_count:Laya.Label;
		public lb_time:Laya.Label;
		public btn_refresh:common.scaleButton;
		public box_race:Laya.Box;
		public raceList:Laya.List;
		public btn_close:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.ShopTabIR",game.ShopTabIR);
			View.regComponent("game.ShopThreeIR",game.ShopThreeIR);
			View.regComponent("common.RaceBox",common.RaceBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("shop/Shop");

        }

    }
}

module ui.shop {
    export class ShopIRUI extends View {
		public itemBox:common.ItemBox;
		public btnBuy:Laya.Button;
		public imgCost:Laya.Image;
		public lbCost:Laya.Label;
		public imgLimit:Laya.Image;
		public lbLimit:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("shop/ShopIR");

        }

    }
}

module ui.shop {
    export class ShopRefreshUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lab_content:Laya.Label;
		public img_Gem:Laya.Image;
		public btn_cancel:Laya.Button;
		public btn_sure:Laya.Button;
		public chk_tips:Laya.CheckBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("shop/ShopRefresh");

        }

    }
}

module ui.shop {
    export class ShopTabIRUI extends DialogExt {
		public tab_zhuobu:Laya.Button;
		public img_tab:common.scaleButton;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("shop/ShopTabIR");

        }

    }
}

module ui.shop {
    export class ShopThreeIRUI extends View {
		public list_item:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ShopIR",game.ShopIR);

            super.createChildren();
            this.loadUI("shop/ShopThreeIR");

        }

    }
}

module ui.task.bianqiang {
    export class BianQiangUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public tabBar:Laya.Tab;
		public viewStack:Laya.ViewStack;
		public BianQiangList:Laya.List;
		public challengeList:Laya.List;
		public btnClose:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.RedPointProp",game.RedPointProp);
			View.regComponent("game.BianQiangIR",game.BianQiangIR);
			View.regComponent("game.ChallengeTitleIR",game.ChallengeTitleIR);

            super.createChildren();
            this.loadUI("task/bianqiang/BianQiang");

        }

    }
}

module ui.task.bianqiang {
    export class BianQiangIRUI extends View {
		public icon:Laya.Image;
		public lab_title:Laya.Label;
		public lab_desc:Laya.Label;
		public img_type:Laya.Image;
		public btnOperate:Laya.Button;
		public lab_type:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("task/bianqiang/BianQiangIR");

        }

    }
}

module ui.task.bianqiang {
    export class ChallengeDetailUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public taskList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.TaskIR",game.TaskIR);

            super.createChildren();
            this.loadUI("task/bianqiang/ChallengeDetail");

        }

    }
}

module ui.task.bianqiang {
    export class ChallengeTitleIRUI extends View {
		public pbBar:Laya.ProgressBar;
		public lbTitle:Laya.Label;
		public lbPercent:Laya.Label;
		public lbName:Laya.Label;
		public lbProgress:Laya.Label;
		public lbNotice:Laya.Label;
		public rewardList:Laya.List;
		public btnCheck:common.scaleButton;
		public btnOperate:Laya.Button;
		public redpoint:Laya.Image;
		public icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SimpleItemBox",common.SimpleItemBox);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("task/bianqiang/ChallengeTitleIR");

        }

    }
}

module ui.task.itemrender {
    export class TaskBaoxiangIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public imgGuang:Laya.Image;
		public imgBox:Laya.Image;
		public img_num:Laya.Image;
		public lab_num:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("task/itemrender/TaskBaoxiangIR");

        }

    }
}

module ui.task.itemrender {
    export class TaskIRUI extends View {
		public btnOperate:Laya.Button;
		public rewardList:Laya.List;
		public lbTitle:Laya.Label;
		public lbProgress:Laya.Label;
		public lbNotice:Laya.Label;
		public lbDailyLvs:Laya.Label;
		public imgFinish:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.SimpleItemBox",common.SimpleItemBox);

            super.createChildren();
            this.loadUI("task/itemrender/TaskIR");

        }

    }
}

module ui.task.itemrender {
    export class TrialIRUI extends View {
		public imgRes:Laya.Image;
		public pbNum:Laya.ProgressBar;
		public lbCount:Laya.Label;
		public lbTitle:Laya.Label;
		public lbContent:Laya.Label;
		public lbGetNum:Laya.Label;
		public btnLingqu:Laya.Button;
		public imgRedpoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("task/itemrender/TrialIR");

        }

    }
}

module ui.task.itemrender {
    export class WarriorIRUI extends View {
		public listReward:Laya.List;
		public listSpecail:Laya.List;
		public btnLingqu:Laya.Button;
		public imgRedpoint:Laya.Image;
		public lbLv:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("task/itemrender/WarriorIR");

        }

    }
}

module ui.task {
    export class TabAchievementUI extends DialogExt {
		public honorList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TaskIR",game.TaskIR);

            super.createChildren();
            this.loadUI("task/TabAchievement");

        }

    }
}

module ui.task {
    export class TabDailyUI extends View {
		public boxLiveness:Laya.Box;
		public progressBar:Laya.ProgressBar;
		public lbLiveness:Laya.Label;
		public taskList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TaskIR",game.TaskIR);

            super.createChildren();
            this.loadUI("task/TabDaily");

        }

    }
}

module ui.task {
    export class TabTrialUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public animGuang:Laya.Animation;
		public imgBaoxiang:Laya.Image;
		public btnJiangli:Laya.Button;
		public listTask:Laya.List;
		public listBtn:Laya.List;
		public lbLastTime:Laya.Label;
		public rpGift:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.TrialTaskIR",game.TrialTaskIR);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("task/TabTrial");

        }

    }
}

module ui.task {
    export class TabWarriorUI extends DialogExt {
		public imgSuo:Laya.Image;
		public listTask:Laya.List;
		public btnBuy:Laya.Button;
		public btnUnlock:Laya.Button;
		public pgExp:Laya.ProgressBar;
		public lbExp:Laya.Label;
		public lbTime:Laya.Label;
		public lbDesc:Laya.Label;
		public lbLastTime:Laya.Label;
		public lbLevel:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.WarriorIR",game.WarriorIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("task/TabWarrior");

        }

    }
}

module ui.task {
    export class TaskUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public listBtns:common.ListBase;
		public boxContent:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.ListBase",common.ListBase);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("task/Task");

        }

    }
}

module ui.task.warrior {
    export class WarriorBuyLevelUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public imgCost:Laya.Image;
		public boxEmpty:Laya.Box;
		public lbDesc:Laya.Label;
		public lbCost:Laya.Label;
		public lbLv:Laya.Label;
		public lbBuyDesc:Laya.Label;
		public btnBuy:Laya.Button;
		public btnAddOne:Laya.Button;
		public btnDelTen:Laya.Button;
		public btnAddTen:Laya.Button;
		public btnDelOne:Laya.Button;
		public listReward:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox2",common.ItemBox2);

            super.createChildren();
            this.loadUI("task/warrior/WarriorBuyLevel");

        }

    }
}

module ui.task.warrior {
    export class WarriorJinjieUI extends DialogExt {
		public bgPanel:common.CommonTitleView;
		public listReward:Laya.List;
		public listExtral:Laya.List;
		public lbAddLv:Laya.Label;
		public btnBuy:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitleView",common.CommonTitleView);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("task/warrior/WarriorJinjie");

        }

    }
}

module ui.teamcopy {
    export class BattleInfoUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public lineupUI:common.CommonLineupView;
		public btn_addteam:Laya.Button;
		public btn_singlebattle:Laya.Button;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("common.CommonLineupView",common.CommonLineupView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.ItemBox21",common.ItemBox21);

            super.createChildren();
            this.loadUI("teamcopy/BattleInfo");

        }

    }
}

module ui.teamcopy.render {
    export class RewardIRUI extends View {
		public listReward:Laya.List;
		public btnLingqu:Laya.Button;
		public lbTitle:Laya.Label;
		public lbYilingqu:Laya.Label;
		public imgRedpoint:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("teamcopy/render/RewardIR");

        }

    }
}

module ui.teamcopy.render {
    export class TeamApplyRenderUI extends View {
		public btn_gread:Laya.Button;
		public list_god:Laya.List;
		public lab_force:Laya.Label;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.HeadBox2",common.HeadBox2);

            super.createChildren();
            this.loadUI("teamcopy/render/TeamApplyRender");

        }

    }
}

module ui.teamcopy.render {
    export class TeamBuildRenderUI extends View {
		public lbName:Laya.Label;
		public lbForce:Laya.Label;
		public lbInfo:Laya.Label;
		public btnApply:Laya.Button;
		public ui_pic1:common.UserHeadBox1;
		public ui_pic2:common.UserHeadBox1;
		public ui_pic3:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("teamcopy/render/TeamBuildRender");

        }

    }
}

module ui.teamcopy.render {
    export class TeamInfoRenderUI extends View {
		public btn_invitation:Laya.Button;
		public btn_kickout:common.scaleButton;
		public img_pos:Laya.Image;
		public img_leader:Laya.Image;
		public btn_transfer:Laya.Button;
		public list_god:Laya.List;
		public img_force:Laya.Image;
		public lab_force:Laya.Label;
		public lab_info:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.HeadBox2",common.HeadBox2);

            super.createChildren();
            this.loadUI("teamcopy/render/TeamInfoRender");

        }

    }
}

module ui.teamcopy.render {
    export class TeamInvitationRenderUI extends View {
		public ui_render:game.TeamInviteChiRender;
		public lab_online:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TeamInviteChiRender",game.TeamInviteChiRender);

            super.createChildren();
            this.loadUI("teamcopy/render/TeamInvitationRender");

        }

    }
}

module ui.teamcopy.render {
    export class TeamRankRenderUI extends View {
		public ui_bg:common.CommonRankIR;
		public boxInfo:Laya.Box;
		public lbName:Laya.Label;
		public lbValue:Laya.Label;
		public lbMid:Laya.Label;
		public headBox:common.UserHeadBox1;
		public labInfo:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonRankIR",common.CommonRankIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("teamcopy/render/TeamRankRender");

        }

    }
}

module ui.teamcopy.render {
    export class TeamTransferRenderUI extends View {
		public imgBg:Laya.Image;
		public ui_head:common.UserHeadBox1;
		public lab_name:Laya.Label;
		public lab_info:Laya.Label;
		public lab_force:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("teamcopy/render/TeamTransferRender");

        }

    }
}

module ui.teamcopy {
    export class TeamBuildUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public imgEmpty:Laya.Image;
		public lbEmpty:Laya.Label;
		public teamList:Laya.List;
		public btnRefresh:Laya.Button;
		public btnCreateTeam:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.TeamBuildRender",game.TeamBuildRender);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("teamcopy/TeamBuild");

        }

    }
}

module ui.teamcopy {
    export class TeamCopyApplyUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public imgEmpty:Laya.Image;
		public lbEmpty:Laya.Label;
		public teamList:Laya.List;
		public btnRefresh:Laya.Button;
		public btnRefuse:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.TeamApplyRender",game.TeamApplyRender);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("teamcopy/TeamCopyApply");

        }

    }
}

module ui.teamcopy {
    export class TeamCopyInvitationUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public imgEmpty:Laya.Image;
		public lbEmpty:Laya.Label;
		public teamList:Laya.List;
		public btnRefresh:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.TeamInviteRender",game.TeamInviteRender);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("teamcopy/TeamCopyInvitation");

        }

    }
}

module ui.teamcopy {
    export class TeamCopyMainUI extends DialogExt {
		public itemPanel:Laya.Panel;
		public imgBg:Laya.Image;
		public ani_roleselect:Laya.Animation;
		public boxCopy0:Laya.Box;
		public lbCopy0:Laya.Label;
		public boxCopy1:Laya.Box;
		public lbCopy1:Laya.Label;
		public boxCopy2:Laya.Box;
		public lbCopy2:Laya.Label;
		public ani_guanqia:Laya.Animation;
		public lbDesc:Laya.Label;
		public btn_left:common.scaleButton;
		public btn_right:common.scaleButton;
		public lab_campInfo:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);

            super.createChildren();
            this.loadUI("teamcopy/TeamCopyMain");

        }

    }
}

module ui.teamcopy {
    export class TeamCopyRankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lbRank:Laya.Label;
		public lbPass:Laya.Label;
		public listteam:Laya.List;
		public lab_empty:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.CopyTeamRankRender",game.CopyTeamRankRender);

            super.createChildren();
            this.loadUI("teamcopy/TeamCopyRank");

        }

    }
}

module ui.teamcopy {
    export class TeamCopyRewardUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public listReward:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.CopyTeamRewardIR",game.CopyTeamRewardIR);

            super.createChildren();
            this.loadUI("teamcopy/TeamCopyReward");

        }

    }
}

module ui.teamcopy {
    export class teamCopyStartUI extends DialogExt {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public box_right:Laya.Box;
		public img_02:Laya.Image;
		public ui_head_right:common.UserHeadBox1;
		public lab_name_right:Laya.Label;
		public lab_power_right:Laya.Label;
		public box_left:Laya.Box;
		public img_01:Laya.Image;
		public ui_head_left:common.UserHeadBox1;
		public lab_name_left:Laya.Label;
		public lab_power_left:Laya.Label;
		public img_vs:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("teamcopy/teamCopyStart");

        }

    }
}

module ui.teamcopy {
    export class TeamInfoUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public ui_item0:game.TeamInfoItemRender;
		public ui_item1:game.TeamInfoItemRender;
		public ui_item2:game.TeamInfoItemRender;
		public lab_force:Laya.Label;
		public btn_leave:Laya.Button;
		public btn_transfer:Laya.Button;
		public btn_apply:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.TeamInfoItemRender",game.TeamInfoItemRender);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("teamcopy/TeamInfo");

        }

    }
}

module ui.teamcopy {
    export class transferLeaderUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public itemlist:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.TeamTransferRender",game.TeamTransferRender);

            super.createChildren();
            this.loadUI("teamcopy/transferLeader");

        }

    }
}

module ui.tower {
    export class GuanqiaIRUI extends View {
		public btnRing:Laya.Button;
		public box:Laya.Box;
		public lbNum:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("tower/GuanqiaIR");

        }

    }
}

module ui.tower {
    export class GuanqiaViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public lineupUI:common.CommonLineupView;
		public listReward:Laya.List;
		public btnChallenge:Laya.Button;
		public lbTitle:Laya.Label;
		public lab_condition:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.CommonLineupView",common.CommonLineupView);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("tower/GuanqiaView");

        }

    }
}

module ui.tower {
    export class JiangliIRUI extends View {
		public lbName:Laya.Label;
		public lbDesc:Laya.Label;
		public rewardList:Laya.List;
		public imgLingqu:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("tower/JiangliIR");

        }

    }
}

module ui.tower {
    export class JiangliViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public liet_item:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.TowerJiangliIR",game.TowerJiangliIR);

            super.createChildren();
            this.loadUI("tower/JiangliView");

        }

    }
}

module ui.tower {
    export class RankUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public lb_myrank:Laya.Label;
		public list_rank:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.TowerRankIR",game.TowerRankIR);

            super.createChildren();
            this.loadUI("tower/Rank");

        }

    }
}

module ui.tower {
    export class RankIRUI extends View {
		public ui_view:common.CommonRankIR;
		public lbName:Laya.Label;
		public lbGuild:Laya.Label;
		public lbDesc:Laya.Label;
		public lbValue:Laya.Label;
		public headBox:common.UserHeadBox1;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonRankIR",common.CommonRankIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);

            super.createChildren();
            this.loadUI("tower/RankIR");

        }

    }
}

module ui.tower {
    export class shiliantaViewUI extends DialogExt {
		public imgBg:Laya.Image;
		public boxContent:Laya.Box;
		public gkitem_0:game.TowerGuanqiaIR;
		public gkitem_1:game.TowerGuanqiaIR;
		public gkitem_2:game.TowerGuanqiaIR;
		public gkitem_3:game.TowerGuanqiaIR;
		public gkitem_4:game.TowerGuanqiaIR;
		public gkitem_5:game.TowerGuanqiaIR;
		public gkitem_6:game.TowerGuanqiaIR;
		public gkitem_7:game.TowerGuanqiaIR;
		public gkitem_8:game.TowerGuanqiaIR;
		public gkitem_9:game.TowerGuanqiaIR;
		public boxBaoxiang:Laya.Box;
		public imgBoss:Laya.Image;
		public imgArrow:Laya.Image;
		public btn_lev1:Laya.Button;
		public btn_lev0:Laya.Button;
		public pageList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TowerGuanqiaIR",game.TowerGuanqiaIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("tower/shiliantaView");

        }

    }
}

module ui.tujian {
    export class AttrViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public img_bg:Laya.Image;
		public lb_ack:Laya.Label;
		public lb_def:Laya.Label;
		public lb_hp:Laya.Label;
		public lb_speed:Laya.Label;
		public lb_crit:Laya.Label;
		public lb_defcrit:Laya.Label;
		public lb_hit:Laya.Label;
		public lb_res:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);

            super.createChildren();
            this.loadUI("tujian/AttrView");

        }

    }
}

module ui.tujian {
    export class FateViewUI extends View {
		public lb_tujian:Laya.Label;
		public btn_look:common.scaleButton;
		public list_fate:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.FateIR",game.FateIR);

            super.createChildren();
            this.loadUI("tujian/FateView");

        }

    }
}

module ui.tujian {
    export class PingjiaUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public btn_Add:Laya.Button;
		public lab_desc:Laya.Label;
		public lbl_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("tujian/Pingjia");

        }

    }
}

module ui.tujian {
    export class PingjiaShuruUI extends DialogExt {
		public label_residuetext:Laya.Label;
		public btn_Calloff:Laya.Button;
		public btn_Sure:Laya.Button;
		public textarea_put:Laya.TextArea;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("tujian/PingjiaShuru");

        }

    }
}

module ui.tujian.render {
    export class FateIRUI extends View {
		public img_success:Laya.Image;
		public lb_desc:Laya.Label;
		public lb_success:Laya.Label;
		public list_god:Laya.List;
		public btn_lightup:Laya.Button;
		public redPoint:game.RedPointProp;
		public ani_item:Laya.Animation;
		public ani_item2:Laya.Animation;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox2",common.HeadBox2);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("tujian/render/FateIR");

        }

    }
}

module ui.tujian.render {
    export class pingjiaIRUI extends View {
		public imgBg:Laya.Image;
		public btn_giveup:common.scaleButton;
		public label_Numbers:Laya.Label;
		public label_godstext:Laya.Label;
		public label_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("tujian/render/pingjiaIR");

        }

    }
}

module ui.tujian.render {
    export class TuijianIRUI extends View {
		public headIcon:common.HeadBox;
		public lab_name:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox",common.HeadBox);

            super.createChildren();
            this.loadUI("tujian/render/TuijianIR");

        }

    }
}

module ui.tujian.render {
    export class TujianIRUI extends View {
		public img_icon:Laya.Image;
		public img_kuang:Laya.Image;
		public img_race:Laya.Image;
		public lbl_name:Laya.Label;
		public box_star:common.GodStarInfo;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.GodStarInfo",common.GodStarInfo);

            super.createChildren();
            this.loadUI("tujian/render/TujianIR");

        }

    }
}

module ui.tujian.render {
    export class YeqianIRUI extends View {
		public img_yellow:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("tujian/render/YeqianIR");

        }

    }
}

module ui.tujian {
    export class TabFateUI extends View {
		public lb_tujian:Laya.Label;
		public btn_look:common.scaleButton;
		public list_fate:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("game.FateIR",game.FateIR);

            super.createChildren();
            this.loadUI("tujian/TabFate");

        }

    }
}

module ui.tujian {
    export class TabTuijianUI extends View {
		public panel_info:Laya.Panel;
		public lab_location:Laya.Label;
		public lab_info:Laya.Label;
		public lbName:Laya.Label;
		public ui_Item0:game.TujianHeadIR;
		public ui_Item1:game.TujianHeadIR;
		public ui_Item2:game.TujianHeadIR;
		public ui_Item3:game.TujianHeadIR;
		public ui_Item4:game.TujianHeadIR;
		public ui_Item5:game.TujianHeadIR;
		public btn_left:Laya.Button;
		public btn_right:Laya.Button;
		public list_buttons:Laya.List;
		public list_yeqian:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TujianHeadIR",game.TujianHeadIR);
			View.regComponent("game.YeqianIR",game.YeqianIR);

            super.createChildren();
            this.loadUI("tujian/TabTuijian");

        }

    }
}

module ui.tujian {
    export class TabTujianUI extends DialogExt {
		public lbType:Laya.Label;
		public list_tujian:Laya.List;
		public btn_changeorder:Laya.Button;
		public list_race:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TujianIR",game.TujianIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.RaceBox",common.RaceBox);

            super.createChildren();
            this.loadUI("tujian/TabTujian");

        }

    }
}

module ui.tujian {
    export class TuijianViewUI extends View {
		public panel_info:Laya.Panel;
		public lab_location:Laya.Label;
		public lab_info:Laya.Label;
		public lbName:Laya.Label;
		public ui_Item0:game.TujianHeadIR;
		public ui_Item1:game.TujianHeadIR;
		public ui_Item2:game.TujianHeadIR;
		public ui_Item3:game.TujianHeadIR;
		public ui_Item4:game.TujianHeadIR;
		public ui_Item5:game.TujianHeadIR;
		public btn_left:Laya.Button;
		public btn_right:Laya.Button;
		public list_buttons:Laya.List;
		public list_yeqian:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TujianHeadIR",game.TujianHeadIR);
			View.regComponent("game.YeqianIR",game.YeqianIR);

            super.createChildren();
            this.loadUI("tujian/TuijianView");

        }

    }
}

module ui.tujian {
    export class TujianHeroUI extends DialogExt {
		public boxRole:Laya.Box;
		public skillList:Laya.List;
		public hbox:Laya.HBox;
		public imgRace:Laya.Image;
		public lab_name:Laya.Label;
		public ui_star:common.GodStarInfo;
		public lbDesc:Laya.Label;
		public lbType:Laya.Label;
		public closeByBlank:Laya.Label;
		public skillBox:game.SkillInfoBox;
		public btnSkin:common.scaleButton;
		public btnClose:Laya.Button;
		public btnPrev:Laya.Button;
		public btnNext:Laya.Button;
		public btn_peiyin:common.scaleButton;
		public btn_lihui:common.scaleButton;
		public btnZiliao:common.scaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.GodSkillItemIR",game.GodSkillItemIR);
			View.regComponent("common.GodStarInfo",common.GodStarInfo);
			View.regComponent("game.SkillInfoBox",game.SkillInfoBox);
			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("tujian/TujianHero");

        }

    }
}

module ui.tujian {
    export class TujianViewUI extends DialogExt {
		public bgPanel:common.CommonTitle5View;
		public imgBg:Laya.Image;
		public tab:Laya.Tab;
		public viewstack:Laya.ViewStack;
		public lbType:Laya.Label;
		public list_tujian:Laya.List;
		public btn_changeorder:Laya.Button;
		public list_race:Laya.List;
		public tuijianView:game.TuijianView;
		public ui_tujian:game.FateView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle5View",common.CommonTitle5View);
			View.regComponent("game.TujianIR",game.TujianIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("common.RaceBox",common.RaceBox);
			View.regComponent("game.TuijianView",game.TuijianView);
			View.regComponent("game.FateView",game.FateView);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("tujian/TujianView");

        }

    }
}

module ui.uproad {
    export class UpRoadEntranceUI extends View {
		public imgIcon:Laya.Image;
		public pro_value:Laya.ProgressBar;
		public ui_red:game.RedPointProp;
		public lab_pro:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("uproad/UpRoadEntrance");

        }

    }
}

module ui.uproad {
    export class UpRoadSuccesssViewUI extends DialogExt {
		public bgPanel:common.CommonTitleView;
		public img_bg:Laya.Image;
		public img_icon:Laya.Image;
		public lab_desc:Laya.Label;
		public btn_close:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitleView",common.CommonTitleView);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("uproad/UpRoadSuccesssView");

        }

    }
}

module ui.uproad {
    export class UpRoadTabIRUI extends View {
		public img_icon:Laya.Image;
		public ani_select:Laya.Animation;
		public redpoint:game.RedPointProp;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("uproad/UpRoadTabIR");

        }

    }
}

module ui.uproad {
    export class UpRoadTaskIRUI extends View {
		public list_reward:Laya.List;
		public btn_receive:Laya.Button;
		public img_hasreceive:Laya.Image;
		public ui_red:Laya.Image;
		public htmltext:laya.html.dom.HTMLDivElement;
		public lab_has:Laya.Label;
		public lab_need:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("uproad/UpRoadTaskIR");

        }

    }
}

module ui.uproad {
    export class UpRoadViewUI extends DialogExt {
		public box_showitem:Laya.Box;
		public ui_showitem:common.ItemBox;
		public list_UR:Laya.List;
		public list_URReward:Laya.List;
		public list_URTask:Laya.List;
		public box_lock:Laya.Box;
		public btn_close:Laya.Button;
		public lab_propname:Laya.Label;
		public lab_artifacename:Laya.Label;
		public lab_artifaceinfo:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.ItemBox",common.ItemBox);
			View.regComponent("game.UpRoadTabIR",game.UpRoadTabIR);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("game.UpRoadTaskIR",game.UpRoadTaskIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("uproad/UpRoadView");

        }

    }
}

module ui.yuanzheng {
    export class BaoxiangIRUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani_jiangli:Laya.Animation;
		public icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("yuanzheng/BaoxiangIR");

        }

    }
}

module ui.yuanzheng {
    export class ChallengeInfoViewUI extends DialogExt {
		public bgPanel:common.CommonTitle4View;
		public lbName:Laya.Label;
		public lbShenli:Laya.Label;
		public godBox0:game.BuzhenGodIR;
		public headBox:common.UserHeadBox1;
		public godBox1:game.BuzhenGodIR;
		public godBox2:game.BuzhenGodIR;
		public godBox3:game.BuzhenGodIR;
		public godBox4:game.BuzhenGodIR;
		public godBox5:game.BuzhenGodIR;
		public rewardList:Laya.List;
		public btnChallenge:Laya.Button;
		public imgShenqi:Laya.Image;
		public guanghuanUI:game.GuanghuanView;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle4View",common.CommonTitle4View);
			View.regComponent("game.BuzhenGodIR",game.BuzhenGodIR);
			View.regComponent("common.UserHeadBox1",common.UserHeadBox1);
			View.regComponent("common.ItemBox2",common.ItemBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.GuanghuanView",game.GuanghuanView);

            super.createChildren();
            this.loadUI("yuanzheng/ChallengeInfoView");

        }

    }
}

module ui.yuanzheng {
    export class GuanqiaIRUI extends View {
		public btnOpen:Laya.Button;
		public box:Laya.Box;
		public lbName:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("yuanzheng/GuanqiaIR");

        }

    }
}

module ui.yuanzheng {
    export class HelpFriendIRUI extends View {
		public headBox:common.HeadBox2;
		public btnSelect:Laya.Button;
		public lbForce:Laya.Label;
		public lbName:Laya.Label;
		public lbYipaiqian:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox2",common.HeadBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("yuanzheng/HelpFriendIR");

        }

    }
}

module ui.yuanzheng {
    export class HelpMeIRUI extends View {
		public headBox:common.HeadBox2;
		public btnGuyong:Laya.Button;
		public lbFried:Laya.Label;
		public lbForce:Laya.Label;
		public lbName:Laya.Label;
		public lbLimit:Laya.Label;
		public lbYiguyong:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.HeadBox2",common.HeadBox2);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("yuanzheng/HelpMeIR");

        }

    }
}

module ui.yuanzheng {
    export class HelpViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public tabbar:Laya.Tab;
		public lbHelpFriendDesc:Laya.Label;
		public lbHelpMeDesc:Laya.Label;
		public lbCount:Laya.Label;
		public listHelpFriend:Laya.List;
		public listHelpMe:Laya.List;
		public boxEmpty:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.YZHelpFriendIR",game.YZHelpFriendIR);
			View.regComponent("game.YZHelpMeIR",game.YZHelpMeIR);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("yuanzheng/HelpView");

        }

    }
}

module ui.yuanzheng {
    export class HuifuViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public godList:Laya.List;
		public lbDesc:Laya.Label;
		public lbCount:Laya.Label;
		public costIcon:Laya.Image;
		public btnUse:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("game.BuzhenGodIR",game.BuzhenGodIR);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);

            super.createChildren();
            this.loadUI("yuanzheng/HuifuView");

        }

    }
}

module ui.yuanzheng {
    export class JiangliViewUI extends DialogExt {
		public bgPanel:common.CommonTitle6View;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.CommonTitle6View",common.CommonTitle6View);
			View.regComponent("common.ItemBox",common.ItemBox);

            super.createChildren();
            this.loadUI("yuanzheng/JiangliView");

        }

    }
}

module ui.yuanzheng {
    export class YuanzhengViewUI extends DialogExt {
		public itemPanel:Laya.Panel;
		public imgBg1:Laya.Image;
		public imgBg2:Laya.Image;
		public imgBg3:Laya.Image;
		public imgBg4:Laya.Image;
		public boxAll:Laya.Box;
		public item1:game.YZGuanqiaIR;
		public item2:game.YZGuanqiaIR;
		public item3:game.YZGuanqiaIR;
		public item4:game.YZGuanqiaIR;
		public item5:game.YZGuanqiaIR;
		public item6:game.YZGuanqiaIR;
		public item7:game.YZGuanqiaIR;
		public item8:game.YZGuanqiaIR;
		public item9:game.YZGuanqiaIR;
		public item10:game.YZGuanqiaIR;
		public item11:game.YZGuanqiaIR;
		public item12:game.YZGuanqiaIR;
		public item13:game.YZGuanqiaIR;
		public item14:game.YZGuanqiaIR;
		public item15:game.YZGuanqiaIR;
		public box1:game.YZBaoxiangIR;
		public box2:game.YZBaoxiangIR;
		public box3:game.YZBaoxiangIR;
		public box4:game.YZBaoxiangIR;
		public box5:game.YZBaoxiangIR;
		public imgArrow:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.YZGuanqiaIR",game.YZGuanqiaIR);
			View.regComponent("game.YZBaoxiangIR",game.YZBaoxiangIR);

            super.createChildren();
            this.loadUI("yuanzheng/YuanzhengView");

        }

    }
}

module ui.zhaohuan.render {
    export class ZhaohuanBoxUI extends View {
		public ui_card:game.TujianIR;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.TujianIR",game.TujianIR);

            super.createChildren();
            this.loadUI("zhaohuan/render/ZhaohuanBox");

        }

    }
}

module ui.zhaohuan.render {
    export class ZhaohuanIRUI extends View {
		public imgBg:Laya.Image;
		public box_ten:Laya.Box;
		public btn_ten:common.scaleButton;
		public img_upten:Laya.Image;
		public lab_upten:Laya.Label;
		public lbten:Laya.Label;
		public red_ten:game.RedPointProp;
		public boxOne:Laya.Box;
		public btn_one:common.scaleButton;
		public img_upone:Laya.Image;
		public red_one:game.RedPointProp;
		public lab_upone:Laya.Label;
		public lbl_one:Laya.Label;
		public lab_time:Laya.Label;
		public boxTip:Laya.Box;
		public lab_talk0:Laya.Label;
		public lab_talk1:Laya.Label;
		public txt_num:Laya.Label;
		public lbChuansuo:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("common.scaleButton",common.scaleButton);
			View.regComponent("common.SoundEffectProp",common.SoundEffectProp);
			View.regComponent("game.RedPointProp",game.RedPointProp);

            super.createChildren();
            this.loadUI("zhaohuan/render/ZhaohuanIR");

        }

    }
}

module ui.zhaohuan {
    export class ResultUI extends DialogExt {
		public img_tipbg:Laya.Image;
		public box_box:Laya.Box;
		public img_starbg:Laya.Image;
		public list_stars:Laya.List;
		public btn_leftpage:Laya.Button;
		public btn_rightpage:Laya.Button;
		public lab_txt:Laya.Label;
		public lab_name:Laya.Label;
		public img_bgs:Laya.Image;
		public img_rewardbg:Laya.Image;
		public img_reward:Laya.Image;
		public lab_rewardnum:Laya.Label;
		public box_btn:Laya.Box;
		public btn_sure:Laya.Button;
		public btn_again:Laya.Button;
		public box_cost:Laya.Box;
		public img_skin:Laya.Image;
		public lab_has:Laya.Label;
		public lab_need:Laya.Label;
		public chk_jump:Laya.CheckBox;
		public box_eff:Laya.Box;
		public ui_god_0:game.ZhaohuanBoxIR;
		public ui_god_1:game.ZhaohuanBoxIR;
		public ui_god_2:game.ZhaohuanBoxIR;
		public ui_god_3:game.ZhaohuanBoxIR;
		public ui_god_4:game.ZhaohuanBoxIR;
		public ui_god_5:game.ZhaohuanBoxIR;
		public ui_god_6:game.ZhaohuanBoxIR;
		public ui_god_7:game.ZhaohuanBoxIR;
		public ui_god_8:game.ZhaohuanBoxIR;
		public ui_god_9:game.ZhaohuanBoxIR;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ZhaohuanBoxIR",game.ZhaohuanBoxIR);

            super.createChildren();
            this.loadUI("zhaohuan/Result");

        }

    }
}

module ui.zhaohuan {
    export class ZhaohuanUI extends DialogExt {
		public imgBg:Laya.Image;
		public list_zhaohuan:Laya.List;
		public img_tips:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ZhaohuanIR",game.ZhaohuanIR);

            super.createChildren();
            this.loadUI("zhaohuan/Zhaohuan");

        }

    }
}
