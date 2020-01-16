var common;
(function (common) {
    var GlobalData = /** @class */ (function () {
        function GlobalData() {
        }
        /** 获取合成碎片ID -- 背包中寻找物品*/
        GlobalData.getHechengChipId = function () {
            var tbCopy = tb.TB_copy_info.get_TB_copy_infoById(GlobalData.GUAJI_COPY_1_1);
            for (var _i = 0, _a = tbCopy.reward; _i < _a.length; _i++) {
                var ary = _a[_i];
                var tbItem = tb.TB_item.get_TB_itemById(ary[0]);
                if (tbItem && tbItem.type == iface.tb_prop.itemTypeKey.chip) {
                    return tbItem.ID;
                }
            }
            return 0;
        };
        /** dialog弹窗特效时间 */
        GlobalData.DIALOG_EFFECT_TIME = 500;
        /** 需要引导手势的等级限制 */
        GlobalData.GUIDE_USER_LEVEL = 5;
        /** 首冲开启等级 */
        GlobalData.SHOUCHONG_OPEN_LV = 11;
        /** 挂机副本id */
        GlobalData.GUAJI_COPY_1_1 = 10001; // 挂机副本1-1
        GlobalData.GUAJI_COPY_1_2 = 10002; // 挂机副本1-2
        GlobalData.GUAJI_COPY_1_3 = 10003; // 挂机副本1-3
        GlobalData.GUAJI_COPY_1_4 = 10004; // 挂机副本1-4
        GlobalData.GUAJI_COPY_1_5 = 10005; // 挂机副本1-5 
        GlobalData.GUAJI_COPY_1_6 = 10006; // 挂机副本1-6
        GlobalData.GUAJI_COPY_1_7 = 10007; // 挂机副本1-7
        GlobalData.GUAJI_COPY_2_10 = 10110; // 挂机副本2-10 红点在2-10未通过之前隐藏
        /** 合成 */
        GlobalData.HOUYI_GOD_ID = 3003; // 后羿
        GlobalData.XIANSHI_BX_700 = 700; // 限时宝箱700
        GlobalData.DEFAULT_HEAD = 2010; // 默认头像ID
        GlobalData.DEFAULT_SHOW_GODID = 2010; // 默认显示模型
        GlobalData.DEFAULT_SHOW_SKINID = 0; // 默认皮肤
        return GlobalData;
    }());
    common.GlobalData = GlobalData;
})(common || (common = {}));
