
module common {

    export class GlobalData {
        /** dialog弹窗特效时间 */
        public static DIALOG_EFFECT_TIME : number = 500;
        /** 需要引导手势的等级限制 */
        public static GUIDE_USER_LEVEL : number = 5;
        /** 首冲开启等级 */
        public static SHOUCHONG_OPEN_LV : number = 11;
        /** 挂机副本id */
        public static GUAJI_COPY_1_1 : number = 10001;          // 挂机副本1-1
        public static GUAJI_COPY_1_2 : number = 10002;          // 挂机副本1-2
        public static GUAJI_COPY_1_3 : number = 10003;          // 挂机副本1-3
        public static GUAJI_COPY_1_4 : number = 10004;          // 挂机副本1-4
        public static GUAJI_COPY_1_5 : number = 10005;          // 挂机副本1-5 
        public static GUAJI_COPY_1_6 : number = 10006;          // 挂机副本1-6
        public static GUAJI_COPY_1_7 : number = 10007;          // 挂机副本1-7
        public static GUAJI_COPY_2_10 : number = 10110;         // 挂机副本2-10 红点在2-10未通过之前隐藏

        /** 合成 */
        public static HOUYI_GOD_ID : number = 3003;          // 后羿

        public static XIANSHI_BX_700 : number = 700;        // 限时宝箱700

        public static DEFAULT_HEAD : number = 2010;         // 默认头像ID
        public static DEFAULT_SHOW_GODID : number = 2010;   // 默认显示模型
        public static DEFAULT_SHOW_SKINID : number = 0;     // 默认皮肤
       
       /** 获取合成碎片ID -- 背包中寻找物品*/
       public static getHechengChipId():number {
           let tbCopy = tb.TB_copy_info.get_TB_copy_infoById(GlobalData.GUAJI_COPY_1_1);
           for(let ary of tbCopy.reward) {
               let tbItem = tb.TB_item.get_TB_itemById(ary[0]);
               if(tbItem && tbItem.type == iface.tb_prop.itemTypeKey.chip) {
                   return tbItem.ID;
               }
           }
           return 0;
       }

    //    public static getHechengGodId():number {
    //        let chipId = GlobalData.getHechengChipId();
    //        let tbItem = tb.TB_item.get_TB_itemById(chipId);
    //        let giftId = tbItem.using_effect[2];
    //        let tbGift = tb.TB_gift_time
    //        return tbItem && tbItem.using_effect
    //    }
    }

}