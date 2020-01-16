var SkinUtil = /** @class */ (function () {
    function SkinUtil() {
    }
    //获取玩家头像
    SkinUtil.getHeroIcon = function (head) {
        if (!isNaN(Number(head))) {
            head = Number(head);
        }
        var defaultUrl = SkinUtil.getHeadIcon(common.GlobalData.DEFAULT_HEAD);
        // 表示神灵
        if (head > 0) {
            //神灵头像
            var godtab = tb.TB_god.get_TB_godById(head);
            if (!godtab) {
                godtab = tb.TB_monster.get_TB_monsterById(head);
                if (!godtab) {
                    return defaultUrl;
                }
                // return "comp/image/touxiang_nan.png";
            }
            return SkinUtil.getHeadIcon(godtab.icon);
        }
        // 外部头像
        if (typeof head === "string" && head != "") {
            return head;
        }
        // 性别
        // return head == -1 ? "comp/image/touxiang_nv.png" : "comp/image/touxiang_nan.png";
        return defaultUrl;
    };
    /** 获取头像框 */
    SkinUtil.getHeadFrame = function (icon) {
        return "hud/headFrame" + icon + ".png";
    };
    SkinUtil.getLvFrame = function (icon) {
        return "hud/headFrameLv" + icon + ".png";
    };
    /**获得属性图标 */
    SkinUtil.getAttrSkin = function (type) {
        return "comp/image/attr" + type + ".png";
    };
    /**获得属性图标 */
    SkinUtil.getTeamPos = function (id) {
        return "zudui/" + id + ".png";
    };
    /**激战神域出战图标 */
    SkinUtil.getChuzhanIcon = function (type) {
        if (type == 0) {
            return SkinUtil.izsy_di13;
        }
        else {
            return SkinUtil.izsy_di14;
        }
    };
    /** 兑换消耗图标 */
    SkinUtil.getExchangeConsume = function (id) {
        switch (id) {
            case 302:
                return "comp/image/molishuijing.png";
            case 303:
            case 309:
                return "comp/image/yijiesuzhi.png";
            case 304:
            case 310:
                return "comp/image/yuanguhupo.png";
            default:
                return "";
        }
    };
    /** 获取消耗图标 */
    SkinUtil.getCostSkin = function (type) {
        var resKey = iface.tb_prop.resTypeKey;
        if (type == resKey.diamond) {
            return "hud/zuanshi.png";
        }
        else if (type == resKey.arena) {
            return "comp/image/rongyu.png";
        }
        else if (type == resKey.gold) {
            return "hud/jingbi.png";
        }
        else if (type == resKey.friend) {
            return "comp/image/youqing.png";
        }
        else if (type == resKey.guildDonate) {
            return "comp/image/gongxian.png";
        }
        else if (type == resKey.soulStone) {
            return "comp/image/linghunshi.png";
        }
        else if (type == resKey.godCrystal) {
            return "comp/image/jiejing.png";
        }
        else if (type == resKey.darkEssence) {
            return "comp/image/heianjinghua.png";
        }
        else if (type == resKey.convertDust) {
            return "comp/image/xingchen.png";
        }
        else if (type == resKey.godExp) {
            return 'hud/hunshi.png';
        }
        else if (type == resKey.roleExp) {
            return 'hud/exp.png';
        }
        else if (type == resKey.arenaNum) {
            return 'comp/image/tiaozhan.png';
        }
        else if (type == resKey.honour) {
            return 'comp/image/rongyaobi.png';
        }
        else if (type == resKey.godDomain) {
            return 'comp/image/shenyubi.png';
        }
        else if (type == CostTypeKey.huifu_yaoshui) {
            return 'comp/image/xueping.png';
        }
        else if (type == CostTypeKey.fuhuo_yaoshui) {
            return 'comp/image/fuhuoyaoshui.png';
        }
        else if (type == CostTypeKey.qianghuashi) {
            return 'comp/image/qianghuashi.png';
        }
        else if (type == CostTypeKey.jinhuahuizhang) {
            return 'comp/image/jinhuahuizhang.png';
        }
        else if (type == CostTypeKey.weizhi_zhaohuanshu) {
            return 'comp/image/daojuquan.png';
        }
        else if (type == CostTypeKey.shenmi_zhaohuanshu) {
            return 'comp/image/danchou.png';
        }
        else if (type == iface.tb_prop.resTypeKey.legendChip) {
            return 'comp/image/chuanshuosuipian.png';
        }
        else if (type == CostTypeKey.escort_shuaxin) {
            return 'comp/image/icon_husongshuaxinka.png';
        }
        else if (type == CostTypeKey.escort_husong) {
            return 'comp/image/icon_gaojihusongka.png';
        }
        else if (type == CostTypeKey.risk_updatecard) {
            return 'comp/image/icon_tanxianshuaxinka.png';
        }
        else if (type == CostTypeKey.xingmangshi) {
            return 'comp/image/xincheng.png';
        }
        else if (type == CostTypeKey.longgang) {
            return 'comp/image/gang.png';
        }
        else if (type == CostTypeKey.shenjiemiyao) {
            return 'comp/image/yaoshi.png';
        }
        else if (type == CostTypeKey.jinglianshi) {
            return 'comp/image/jinglianshi_1.png';
        }
        else if (type == CostTypeKey.mofajinghua_u) {
            return 'comp/image/shangjimofajinghua.png';
        }
        else if (type == CostTypeKey.mofajinghua_m) {
            return 'comp/image/zhongjimofajinghua.png';
        }
        else if (type == CostTypeKey.mofajinghua_l) {
            return 'comp/image/xiajimofajinghua.png';
        }
        else if (type == CostTypeKey.shenlijinghua_u) {
            return 'comp/image/shangjishenlijinghua.png';
        }
        else if (type == CostTypeKey.shenlijinghua_m) {
            return 'comp/image/zhongjishenlijinghua.png';
        }
        else if (type == CostTypeKey.shenlijinghua_l) {
            return 'comp/image/xiajishenlijinghua.png';
        }
        else if (type == CostTypeKey.treasure_rebirth) {
            return 'comp/image/baowuchongshengshi.png';
        }
        else if (type == CostTypeKey.touzi) {
            return 'comp/image/touzi.png';
        }
        else if (type == CostTypeKey.warrior_prove) {
            return 'comp/image/warrior_coin.png';
        }
        return "";
    };
    /**挂机界面boss图标 */
    SkinUtil.getBossIcon = function (id) {
        return "guaji/guaji_boss0" + id + ".png";
    };
    SkinUtil.getTabBtnSkin = function (name) {
        return "fbutton/" + name + ".png";
    };
    SkinUtil.getSysOpenSkin = function (foundId) {
        return "icon/notice/" + foundId + ".png";
    };
    SkinUtil.getLiHuiIcon = function (lihui) {
        return "icon/lihui/" + lihui + ".png";
    };
    /**竞技场（新）排名背景 */
    SkinUtil.getArenaRankBg = function (id) {
        if (id < 1 || id > 5)
            id = 5;
        return "jingjichang/jjc_0" + id + ".png";
    };
    /**向上/向下图标 */
    SkinUtil.getUpOrDownSkinUrl = function (type) {
        switch (type) {
            case 1:
                return "comp/image/tishen_icon.png";
            case -1:
                return "comp/image/xiajiang_icon.png";
            default:
                return "";
        }
    };
    /**排名 序号：从0开始*/
    SkinUtil.getRankingSkin = function (index) {
        return index < 3 ? "comp/flag/rank" + (index + 1) + ".png" : "";
    };
    /**强化石材料 */
    SkinUtil.getStrengthSkin = function () {
        return "comp/image/qianghuashi.png";
    };
    /**精炼石材料 */
    SkinUtil.getRefineSkin = function () {
        return "comp/image/jinglianshi_1.png";
    };
    //获取英雄星级类型
    SkinUtil.getGodStarTypeSkin = function (lv) {
        return "comp/flag/chenwei_" + lv + ".png";
    };
    /** 获取道具品质图标 */
    SkinUtil.getBoxQulityIcon = function (id) {
        id = id || "1";
        return "comp/image/item_" + id + ".png";
    };
    /** 获取护送品质图标 */
    SkinUtil.getEscortQulityIcon = function (id) {
        return "husong/img_quality_" + id + ".png";
    };
    /**精炼石图标 */
    SkinUtil.getRefineIcon = function (id) {
        return "comp/image/jinglianshi_" + id + ".png";
    };
    // 获取英雄头像
    SkinUtil.getHeadIcon = function (id) {
        return "icon/head/" + id + ".jpg";
    };
    //获取buff图标
    SkinUtil.getBuffIcon = function (id) {
        return "icon/buff/" + id + ".jpg";
    };
    /**获取神器图片 */
    SkinUtil.getArtifactIcon = function (id) {
        return "chuandaishenqi/artifact_" + id + ".png";
    };
    /** 获取神器圆图 */
    SkinUtil.getArtifCircleIcon = function (id) {
        return "shenqi/" + id + ".png";
    };
    /**获取装备图标 */
    SkinUtil.getEquipIcon = function (id) {
        return "icon/item/" + id + ".jpg";
    };
    /**获取饰品图标 */
    SkinUtil.getAccsIcon = function (id) {
        return "icon/item/" + id + ".jpg";
    };
    /** 获取道具图标 */
    SkinUtil.getItemIcon = function (item) {
        var defaultUrl = "icon/item/" + item.icon[0] + ".jpg";
        switch (item.type) {
            case iface.tb_prop.itemTypeKey.god:
                return SkinUtil.getHeadIcon(item.icon[0]); //碎片或英雄
            case iface.tb_prop.itemTypeKey.chip:
                if (item.ID < 20000 && item.ID > 10000)
                    return SkinUtil.getHeadIcon(item.icon[0]);
                else
                    return "icon/item/" + item.icon[0] + ".jpg";
            case iface.tb_prop.itemTypeKey.materials:
                return item.icon[1] == 2 ? SkinUtil.getHeadIcon(item.icon[0]) : defaultUrl;
        }
        return defaultUrl;
    };
    //获取技能图标
    SkinUtil.getSkillIcon = function (id) {
        return "icon/skill/" + id + ".jpg";
    };
    //符文类型图标
    SkinUtil.getFuwenType = function (id) {
        return "bag/fuwenbeibao/" + id + ".png";
    };
    //获取符文背景图片
    SkinUtil.getFuwenBg = function (id) {
        return "fuwen/fuben_ditu_" + id + ".png";
    };
    //获取符文图片
    SkinUtil.getFuwenZhangjieIcon = function (id) {
        return "fuwen/" + id + ".png";
    };
    //获取符文等级图片
    SkinUtil.getFuwenLvIcon = function (id) {
        return "fuwen/lv" + id + ".png";
    };
    //获取挂机关卡按钮图片
    SkinUtil.getGuajiGuaqiaBtn = function (id) {
        if (id == 0) {
            return "guaji/guanji_10.png";
        }
        else if (id == 1) {
            return "comp/button/btn_guaji_2.png";
        }
        else if (id == 2) {
            return "comp/button/btn_guaji_3.png";
        }
    };
    //锁的状态
    SkinUtil.getLockStateSkin = function (flag) {
        if (!flag) {
            return "comp/image/suo_weikaiqi.png";
        }
        else {
            return "comp/image/suo_yikaiqi.png";
        }
    };
    //获取加减号
    SkinUtil.getAddOrDec = function (add) {
        if (add) {
            return "comp/shuzi/zhanli_jia.png";
        }
        else {
            return "comp/shuzi/zhanli_jian.png";
        }
    };
    //获取加减号
    SkinUtil.getclipNum = function (add) {
        if (add) {
            return "comp/shuzi/zhanli_lv_num.png";
        }
        else {
            return "comp/shuzi/zhanli_hong_num.png";
        }
    };
    /** 获取表情图标  */
    SkinUtil.getExpressionUrl = function (bqId) {
        if (bqId < game.ChatModel.ExpressionNum) {
            return "chat/face/img_chat_" + bqId + ".png";
        }
        return null;
    };
    /**获取首充送的首充名称 */
    SkinUtil.getFirstRechargeName = function (id) {
        if (id == 1 || id == 3) {
            return "shouchong/shouchonglibao0" + id + "_1.jpg.png";
        }
        return "";
    };
    /**获取试炼塔排名前三 */
    SkinUtil.getShiliantaRankUrl = function (id) {
        return "shilianta/paiming/" + id + ".png";
    };
    /**地下城副本按钮 */
    SkinUtil.getDixiachengUrl = function (id) {
        return "dixiachengfuben/btn_fuben_" + id + ".png";
    };
    /** 试炼塔页数状态 */
    SkinUtil.getPageStateUrl = function (state) {
        return "shilianta/tower_cengshu" + state + ".png";
    };
    /** 试炼塔关卡状态 */
    SkinUtil.getGuankaStateUrl = function (state) {
        return "shilianta/tower_btn_guanqia" + state + ".png";
    };
    /** 邮件阅读状态 */
    SkinUtil.getMailStateUrl = function (state) {
        return "mail/mail_xinfeng" + state + ".png";
    };
    /**三餐图片 */
    SkinUtil.getSancanUrl = function (index) {
        return "huoyuehuodong/acitivty1/taocan" + index + ".png";
    };
    /**充值钻石皮肤 */
    SkinUtil.getZuanshiUrl = function (num) {
        if (num == 328 || num == 648)
            return "gonghui/donation/zuanshi_" + num + ".png";
        return "chongzhitequan/zuanshi_" + num + ".png";
    };
    /**充值类型 */
    SkinUtil.getChongzhiUrl = function (str) {
        return "chongzhitequan/" + str + ".png";
    };
    /** 金银铜排名图标 */
    SkinUtil.getRankSkin = function (rank) {
        if (rank == 1) {
            return 'comp/flag/jin.png';
        }
        else if (rank == 2) {
            return 'comp/flag/yin.png';
        }
        return 'comp/flag/tong.png';
    };
    /** 获取伤害排名图标 */
    SkinUtil.getDamageRankUrl = function (rank) {
        if (rank > 3)
            return "";
        return "comp/flag/rank" + rank + ".png";
    };
    SkinUtil.getGodRaceSkin = function (racetype) {
        return LanMgr.getLan("comp/image/race_{0}.png", -1, racetype);
    };
    SkinUtil.getGodBigRaceSkin = function (racetype) {
        return LanMgr.getLan("comp/image/race_big_{0}.png", -1, racetype);
    };
    /** 获取怪物圆形头像 */
    SkinUtil.getMonsterCircleIcon = function (id) {
        return "icon/head/" + id + "_1.jpg";
    };
    SkinUtil.getAutoFight = function (state) {
        return state ? "comp/button/btn_zidongzhandou.png" : "comp/button/btn_shoudongzhandou.png";
    };
    /**获取融魂和宝石道具 */
    SkinUtil.getRonghunHave = function (id) {
        switch (id) {
            case CostTypeKey.hun_life:
                return "comp/image/shengming.png";
            case CostTypeKey.hun_attack:
                return "comp/image/gongji.png";
            case CostTypeKey.hun_defense:
                return "comp/image/fangyu.png";
        }
        return "";
    };
    /** 获得公会排名等级图标 */
    SkinUtil.getGuildRankIcon = function (id) {
        switch (id) {
            case 1:
                return "comp/image/di1.png";
            case 2:
                return "comp/image/di2.png";
            case 3:
                return "comp/image/di3.png";
        }
    };
    /** 获得公会图标 */
    SkinUtil.getGuildHeadIcon = function (icon) {
        return "icon/guildhead/" + icon;
    };
    /** 通过id找到公会图标 */
    SkinUtil.getGuildHeadIconById = function (id) {
        id = id >= 0 ? id : 0;
        return "icon/guildhead/guildhead" + id + ".png";
    };
    /** 获得公会技能图标  */
    SkinUtil.getGuildSkillIcon = function (id, race) {
        var racetype = { 1: "huaxia", 2: "beiou", 3: "xila", 4: "guangming", 5: "heian" };
        return "icon/guildskill/jineng" + id + "_" + racetype[race] + ".png";
    };
    /** 获得公会技能选中光效 */
    SkinUtil.getGuildSkillSelectedIcon = function (race) {
        var racetype = { 1: "xila", 2: "huaxia", 3: "beiou", 4: "guangming", 5: "heian" };
        return "gonghui/xuanzhongguangxiao_" + racetype[race] + ".png";
    };
    /** 矿点图标 */
    SkinUtil.getIslandOreUrl = function (id) {
        return "shenmidaoyu/daoyu_kuang" + id + ".png";
    };
    /** 公会战晋级类型图标 */
    SkinUtil.getGuildUpGradeUrl = function (type) {
        if (type == game.GuildUpGradeType.up) {
            return "gonghui/fight/jinjiqu.png";
        }
        else if (type == game.GuildUpGradeType.keep) {
            return "gonghui/fight/baojiqu.png";
        }
        else if (type == game.GuildUpGradeType.down) {
            return "gonghui/fight/jiangjiqu.png";
        }
        return "";
    };
    /** 公会段位背景 */
    SkinUtil.getGuildGradeBg = function (grade) {
        if (grade == game.GuildGrade.baiyin) {
            return "gonghui/fight/baiyindi.png";
        }
        else if (grade == game.GuildGrade.bojin) {
            return "comp/image/bojindi.png";
        }
        else if (grade == game.GuildGrade.wangzhe) {
            return "gonghui/fight/wangzhedi.png";
        }
        return "";
    };
    /** 公会战排名旗子 */
    SkinUtil.getGuildQizhi = function (rank) {
        return "gonghui/fight/pic_qizhi" + rank + ".png";
    };
    /** 公会战排名虚席以待 */
    SkinUtil.getGuildXuwei = function (rank) {
        return "gonghui/fight/pic_xuwei" + rank + ".png";
    };
    /** 获得公会排名等级图标 */
    SkinUtil.getZhaohuanIcon = function (type) {
        switch (type) {
            case game.ZHAOHUAN.GENERAL:
                return "zhaohuan/pt.png";
            case game.ZHAOHUAN.FRIENDSHIP:
                return "zhaohuan/yq.png";
            case game.ZHAOHUAN.DIAMOND:
                return "zhaohuan/sm.png";
            case game.ZHAOHUAN.LEGEND:
                return "zhaohuan/cs.png";
        }
        return "";
    };
    /** 获取服务器状态图标 */
    SkinUtil.getServerState = function (data) {
        var resurl = "comp/image/weihu.png";
        if (data.status == REALMFLAG.REALM_FLAG_RUNNING) {
            if (data.style_status == SrvState.NORNAL) //空闲
                resurl = "comp/image/kongxian.png";
            else if (data.style_status == SrvState.BETTER) //热闹
                resurl = "comp/image/renao.png";
            else
                resurl = "comp/image/baoman.png";
        }
        return resurl;
    };
    SkinUtil.getDonationImgUrl = function (id) {
        return id == 1 ? "gonghui/donation/jinbi_box.png" : (id == 2 ? "gonghui/donation/zuanshi_328.png" : "gonghui/donation/zuanshi_648.png");
    };
    /** 获得图鉴英雄大图标 */
    SkinUtil.getBigIconById = function (id) {
        return "icon/bighead/" + id + ".jpg";
    };
    /** 获得图鉴英雄外框 */
    SkinUtil.getTujianKuang = function (quality) {
        return "tujian/kapai_0" + quality + ".png";
    };
    /** 获得图鉴种族小图标 */
    SkinUtil.getTujianRace = function (race) {
        return "comp/image/race_" + race + ".png";
    };
    /** 任务挑战图片 */
    SkinUtil.getTaskIcon = function (id) {
        return "comp/flag/renwu_icon0" + id + ".png";
    };
    /**获取进度球颜色道具 */
    SkinUtil.getJinduBox = function (id) {
        return "shenling/jindu" + id + ".png";
    };
    /**获取觉醒图标 */
    SkinUtil.getAwakenIcon = function (type) {
        return type == iface.tb_prop.attrTypeKey.hpMax ? "shenling/shengming.png" : (type == iface.tb_prop.attrTypeKey.atk ? "shenling/gongji.png" : "shenling/fangyu.png");
    };
    SkinUtil.getGodRaceSkin2 = function (racetype) {
        var str = "";
        switch (racetype) {
            case 0:
                str = "shenjiezhimen/Szhushen.png";
                break;
            case 1:
                str = "shenjiezhimen/Sxila.png";
                break;
            case 2:
                str = "shenjiezhimen/Shuaxia.png";
                break;
            case 3:
                str = "shenjiezhimen/Sbeiou.png";
                break;
            case 4:
                str = "shenjiezhimen/Szhushen.png";
                break;
        }
        return str;
    };
    /** 获取系统标题 */
    SkinUtil.getSysTitle = function (uiName) {
        switch (uiName) {
            case UIConst.EntranceList:
                return "comp/title/lilian.png";
            case UIConst.EntranceList_lilian:
                return "comp/title/maoxian.png";
            case UIConst.EntranceList_jingji:
                return "comp/title/jingji.png";
            case UIConst.EntranceList_kaufu:
                return "comp/title/kuafuzhan.png";
            case UIConst.ArenaView:
                return "comp/title/jingjichang.png";
            case UIConst.IslandView:
            case UIConst.OreMapView:
                return "comp/title/shemidaoyu.png";
            case UIConst.GloryFightView:
            case UIConst.GloryWaitView:
            case UIConst.GloryLastReview:
                return "comp/title/rongyuzhizhan.png";
            case UIConst.ArenaMatchView:
                return "comp/title/pipeishai.png";
            case UIConst.GodDomainView:
            case UIConst.GodDm_TeamView:
                return "comp/title/jizhanshenyu.png";
            case UIConst.ShiliantaView:
                return "comp/title/shiliantan.png";
            case UIConst.YuanzhengView:
                return "comp/title/siluoyiji.png";
            case UIConst.GuildMainView:
                return "comp/title/gonghui.png";
            case UIConst.FightMainView:
            case UIConst.FightWaitView:
            case UIConst.HonorHallView:
                return "comp/title/gonghuizhan.png";
            case UIConst.ZH_MainView:
                return "comp/title/zhaohuan.png";
            case UIConst.FogForestView:
                return "comp/title/miwusenglin.png";
            case UIConst.WorldBoss_BossView:
                // comp/title/shijieboss.png 世界boss不要标题
                return "";
            case UIConst.Copy_DailyMainView:
                return "comp/title/meirirenwu.png";
            case UIConst.EscortMainView:
                return "comp/title/shanduihusong.png";
            case UIConst.Copy_TeamMainView:
                return "comp/title/tizhan.png";
        }
        return "";
    };
    SkinUtil.guajiBtn = function (id) {
        switch (id) {
            case game.GuajiBtnState.JINGYING:
                return "guaji/tiaozhanjingying.png";
            case game.GuajiBtnState.CANBOSS:
                return "guaji/playboss.png";
            case game.GuajiBtnState.FIGHTING:
                return "guaji/zhandouzhong.png";
            case game.GuajiBtnState.MAP:
                return "guaji/shijieditu.png";
            default:
                return "guaji/anniu.png";
        }
    };
    /** 圣物品质图图片 */
    SkinUtil.getTreasureQualitySkin = function (quality) {
        if (quality == QualityConst.ORANGE) {
            return "baowu/bapwuchengse.jpg";
        }
        else if (quality == QualityConst.RED) {
            return "baowu/bapwuhongse.jpg";
        }
        return "";
    };
    /** 获取任务宝箱 类型、是否打开 */
    SkinUtil.getTaskBaoxiang = function (type, isOpen) {
        if (type == 4) {
            return isOpen ? 'comp/flag/task_baoxiang444.png' : 'comp/flag/task_baoxiang4.png';
        }
        else if (type == 3) {
            return isOpen ? 'comp/flag/task_baoxiang33.png' : 'comp/flag/task_baoxiang3.png';
        }
        else if (type == 2) {
            return isOpen ? 'comp/flag/task_baoxiang22.png' : 'comp/flag/task_baoxiang2.png';
        }
        else {
            return isOpen ? 'comp/flag/task_baoxiang11.png' : 'comp/flag/task_baoxiang1.png';
        }
    };
    /** 世界boss品质 */
    SkinUtil.getWorldBossQuality = function (type) {
        if (type == 2) {
            return "comp/bg/kuang_zi.png";
        }
        else if (type == 3) {
            return "comp/bg/kuang_cheng.png";
        }
        return "comp/bg/kuang_lan.png";
    };
    /** 获取福利活动标题 */
    SkinUtil.getWelfareTitle = function (type) {
        if (type == game.WelfareType.dayLibao) {
            return "fuli/xianshi3.jpg";
        }
        else if (type == game.WelfareType.weekLibao) {
            return "fuli/xianshi2.jpg";
        }
        else if (type == game.WelfareType.monthLibao) {
            return "fuli/xianshi1.jpg";
        }
        return "";
    };
    /** 商店tabicon */
    SkinUtil.getShopTabSkin = function (type) {
        switch (type) {
            case ShopType.jishi: //-1 集市
                return "shop/js.png";
            case ShopType.shangcheng: //1 商城
                return "shop/sd.png";
            case ShopType.jingjichang: //2勋章商店
                return "shop/xz.png";
            case ShopType.guild: //3 公会商店
                return "shop/gh.png";
            case ShopType.yuanzheng: //4遗迹商城
                return "shop/yj.png";
            case ShopType.shenjie: //5 结晶
                return "shop/jj.png";
            case ShopType.rongyao: //7 荣耀
                return "shop/ry.png";
            case ShopType.godDm: //8 神域
                return "shop/sy.png";
        }
        return "";
    };
    SkinUtil.getQiyuSkin = function (type) {
        return "tanxian/qiyu" + type + ".png";
    };
    SkinUtil.getSysMapWH = function () {
        var stageW = Laya.stage.width;
        var stageH = Laya.stage.height;
        if (stageW > Launch.SCENE_WIDTH && stageH > Launch.SCENE_HEIGHT) {
            return [900, 1560];
        }
        else if (stageH > Launch.SCENE_HEIGHT) {
            return [720, 1560];
        }
        else if (stageW > Launch.SCENE_WIDTH) {
            return [900, 1280];
        }
        return [720, 1280];
    };
    /** 获取系统底图皮肤 */
    SkinUtil.getSysMapSkin = function (sysid, type, name) {
        if (type === void 0) { type = 0; }
        if (name === void 0) { name = ""; }
        var stageW = Laya.stage.width;
        var stageH = Laya.stage.height;
        var skin = "";
        var dir = "";
        // 判断高度大于1280时,由于底层四舍五入的取法，可能导致一像素之差
        if (stageW > (Launch.SCENE_WIDTH + 1) && stageH > (Launch.SCENE_HEIGHT + 1)) {
            //todo 微端下大长图已移除，使用小长图
            // dir = "mipmap/big1560";
            dir = "mipmap/small1560";
        }
        else if (stageH > (Launch.SCENE_HEIGHT + 1)) {
            dir = "mipmap/small1560";
        }
        else if (stageW > (Launch.SCENE_WIDTH + 1)) {
            //tood 微端下大图已移除，使用小图
            // dir = "mipmap/big1280";
            dir = "mipmap/small1280";
        }
        else {
            dir = "mipmap/small1280";
        }
        switch (sysid) {
            case ModuleConst.MAIN:
                skin = dir + "/hudditu.jpg";
                break;
            case ModuleConst.GONGHUI:
                skin = dir + "/gonghuiditu.jpg";
                break;
            case ModuleConst.GONGHUI_FIGHT:
                skin = dir + "/gonghuiditu2.jpg";
                break;
            case ModuleConst.SUMMON:
                skin = type == 0 ? dir + "/zhaohuanditu.jpg" : dir + "/zhaohuanbeijing.jpg";
                break;
            case ModuleConst.FIGHT:
                // 0表示挂机地图背景 1表示挂机跑动地图背景
                skin = type == 0 ? dir + "/guaji/" + name + ".jpg" : "guaji/" + name + ".png";
                break;
            case ModuleConst.SHILIANTA:
                skin = dir + "/shiliantaditu.jpg";
                break;
            case ModuleConst.EXPEDITION:
                skin = dir + "/shiluoyijiditu" + type + ".jpg";
                break;
            case ModuleConst.Island:
                skin = dir + "/shenmidaoyuditu" + type + ".jpg";
                break;
            case ModuleConst.SHENLING:
                // skin = `${dir}/yingxiongdi.jpg`;
                skin = "shenling/yingxiongdi" + type + ".jpg";
                break;
            case ModuleConst.BEIBAO:
                skin = dir + "/beibaoditu.jpg";
                break;
            case ModuleConst.EQUIPMENT:
                skin = dir + "/zhuangbeidi.jpg";
                break;
            case ModuleConst.ARTIFACT:
                skin = dir + "/shenqiditu.jpg";
                break;
            case ModuleConst.WANFA:
                skin = dir + "/" + name + ".jpg";
                break;
            case ModuleConst.DAILY_COPY:
                skin = dir + "/meirifubenditu.jpg";
                break;
            case ModuleConst.CARAVAN_ESCORT:
                skin = dir + "/husongditu.jpg";
                break;
            case ModuleConst.WORLD_BOSS:
                skin = dir + "/bossditu.jpg";
                break;
            case ModuleConst.JINGJI:
                skin = dir + "/jjc_bj.jpg";
                break;
            case ModuleConst.GLORY_FIGHT:
                skin = type == 0 ? dir + "/ryzz_bj01.jpg" : dir + "/ryzz_bj03.jpg";
                break;
            case ModuleConst.MATCH_FIGHT:
                skin = dir + "/pipeisai_bj02.jpg";
                break;
            case ModuleConst.GOD_DOMAIN:
                skin = dir + "/jzsy_bj02.jpg";
                break;
            case ModuleConst.login:
                skin = dir + "/login.jpg";
                break;
            case ModuleConst.loading:
                skin = dir + "/loading.jpg";
                break;
            case ModuleConst.ADVENTURE:
                skin = dir + "/dafuwenditu.jpg";
                break;
            case ModuleConst.GOD_LIHUI:
                skin = dir + "/lihuiditu.jpg";
                break;
        }
        // logyhj("big_pic : ",skin);
        return skin;
    };
    //普通召唤书
    SkinUtil.putong = "comp/image/daojuquan.png";
    //走马灯背景
    SkinUtil.chatnotice = 'comp/bg/tishidi.png';
    //单抽
    SkinUtil.danchou = "comp/image/danchou.png";
    //单抽
    SkinUtil.zhezhao2 = "comp/bg/zhezhao2.png";
    //十连
    SkinUtil.shilian = "comp/image/shilian.png";
    //传说
    SkinUtil.chuanshuo = "comp/image/chuanshuosuipian.png";
    //进行中
    SkinUtil.jinxingzhong = "comp/imag/jinxingzhong.png";
    //可领奖
    SkinUtil.kelingjiang = "comp/imag/kelingjiang.png";
    //红色星星（6-10星）
    SkinUtil.superXing = "comp/image/juexing_xingji.png";
    /**界面星星 */
    SkinUtil.xingxing = "comp/image/xinxi_xingji.png";
    /**格子星星 */
    SkinUtil.iconxing = "comp/image/buzhen_xingji.png";
    /**通用绿色按钮*/
    SkinUtil.buttonGreen = "comp/button/btn_qianwang.png";
    /** 通用橙色按钮 */
    SkinUtil.buttonNormal = "comp/button/button.png";
    /** 通用红色按钮 */
    SkinUtil.buttonRed = "comp/button/btn_quxiao.png";
    /** 钥匙 */
    SkinUtil.yaoshi = "comp/image/yaoshi.png";
    /**星辰 */
    SkinUtil.xingcheng = "comp/image/xincheng.png";
    /**神器技能强化石 */
    SkinUtil.gang = "comp/image/gang.png";
    /**神器未解锁 */
    SkinUtil.weiJieSuo = "shenqi/weijiesuo.png";
    /** 返回按钮 */
    SkinUtil.btn_fanhui = "comp/button/btn_fanhui.png";
    /**黑暗精华 */
    SkinUtil.heianjinghua = "comp/image/heianjinghua.png";
    //加载背景图
    SkinUtil.loadbg = "preload/loading2.jpg";
    /** 宝箱模型id */
    SkinUtil.baoxiangModelId = '100001';
    /** 聊天对话框 */
    SkinUtil.chatBg1 = "chat/duihuakuang.png";
    SkinUtil.chatBg2 = "chat/duihuakuang2.png";
    /**背包按钮 */
    SkinUtil.bagButtons = ["comp/button/btn_yingxiong.png", "bag/btn_suipian.png", "bag/btn_cailiao.png", "comp/button/btn_zhuangbei.png", "bag/btn_baowu.png"];
    /**出战 */
    SkinUtil.chuzhan = "comp/image/shangzhen.png";
    /*格子选中*/
    SkinUtil.box_xuanzhong = "comp/image/huodong_wupinxuanzhong.png";
    /**公会 */
    SkinUtil.jian_an = "gonghui/fight/icon_jiandiban.png";
    SkinUtil.jian_liang = "gonghui/fight/icon_xiaojian.png";
    SkinUtil.aixin_an = "gonghui/fight/icon_aixindiban.png";
    SkinUtil.aixin_liang = "gonghui/fight/icon_aixin.png";
    SkinUtil.dajian_an = "gonghui/fight/icon_jiandikuang.png";
    SkinUtil.dajian_liang = "gonghui/fight/icon_jian.png";
    /** 胜负底 */
    SkinUtil.shengfudi = "rongyaozhizhan/ryzz_shengfudi.png";
    /** 活动 */
    //限时召唤
    SkinUtil.lim_summon = "fbutton/xszh_xs_icon.png";
    //限时团购
    SkinUtil.lim_group = "fbutton/xstg_xs_icon.png";
    // 战斗的胜利失败
    SkinUtil.img_victory = "rongyaozhizhan/ryzz_shengli.png";
    SkinUtil.img_failure = "rongyaozhizhan/ryzz_shibai.png";
    SkinUtil.lb_victory = "zhandoubiaoxian/sheng.png";
    SkinUtil.lb_failure = "zhandoubiaoxian/bai.png";
    // 激战神域
    SkinUtil.izsy_di13 = "comp/bg/jzsy_bj13.png";
    SkinUtil.izsy_di14 = "comp/bg/jzsy_bj14.png";
    SkinUtil.izsy_bg_fail = "zhandoubiaoxian/lanse.png";
    SkinUtil.izsy_bg_succ = "zhandoubiaoxian/hongse.png";
    // 荣耀之战
    SkinUtil.btn_fangdajing = "comp/button/btn_fangdajing.png";
    SkinUtil.btn_bet = "rongyaozhizhan/btn_yazhu.png";
    SkinUtil.btn_vs = "rongyaozhizhan/btn_vs.png";
    SkinUtil.greenBg = "comp/flag/woyaobianqiang_butiao00.png";
    SkinUtil.blueBg = "comp/flag/woyaobianqiang_butiao01.png";
    SkinUtil.purpleBg = "comp/flag/woyaobianqiang_butiao02.png";
    SkinUtil.redBg = "comp/flag/woyaobianqiang_butiao03.png";
    //
    SkinUtil.equip_sth_lvup = "zhaungbei/qianghua1.png";
    SkinUtil.equip_ref_lvup = "zhaungbei/jinglian1.png";
    SkinUtil.equip_purple_suit = "zhaungbei/zizuang1.png";
    SkinUtil.equip_orange_suit = "zhaungbei/chengse1.png";
    SkinUtil.equip_red_suit = "zhaungbei/hongse1.png";
    SkinUtil.equip_purple_suit_num = "comp/shuzi/zizuang.png";
    SkinUtil.equip_orange_suit_num = "comp/shuzi/chengse.png";
    SkinUtil.equip_red_suit_num = "comp/shuzi/hongse.png";
    // 全屏系统顶部按钮
    SkinUtil.btn_shop = "comp/button/btn_shangdian.png";
    SkinUtil.btn_rank = "comp/button/btn_paiming.png";
    SkinUtil.btn_buzhen = "comp/button/btn_buzhen.png";
    SkinUtil.btn_rule = "comp/button/btn_guizhe.png";
    SkinUtil.btn_huiyuan = "comp/button/btn_huiyuan.png";
    SkinUtil.btn_jiangli = "comp/button/btn_jiangli.png";
    SkinUtil.btn_record = "comp/button/btn_jilu.png";
    SkinUtil.btn_glory_hall = "comp/button/btn_rongyushangdian.png";
    SkinUtil.btn_refresh = "comp/button/btn_shuaxin.png";
    SkinUtil.btn_team = "comp/button/btn_zhuduixinxi.png";
    SkinUtil.btn_saiji = "comp/button/btn_saijipaiming.png";
    SkinUtil.btn_fuhuo = "comp/button/btn_fuhuoyingxiong.png";
    SkinUtil.btn_huifu = "comp/button/btn_huifushengming.png";
    SkinUtil.btn_zhuzhan = "comp/button/btn_haoyouzhuzhan.png";
    // 关卡坐标：暗、亮
    SkinUtil.zuobiao_an = "comp/image/gq_zuobiao.png";
    SkinUtil.zuobiao_liang = "comp/image/gq_zuobiao2.png";
    // 胜利失败标题
    SkinUtil.title_shengli = "zhandoubiaoxian/shengli.png";
    SkinUtil.title_shibai = "zhandoubiaoxian/shibai.png";
    // 碎片
    SkinUtil.chip_normal = "comp/image/suipian.png";
    SkinUtil.chip_godSkin = "comp/image/shizhuangjiaobiao.png";
    // 公会求援宝箱
    SkinUtil.help_bx_noopen = "comp/image/dabaoxiang.png";
    SkinUtil.help_bx_open = "comp/image/dabaoxiang2.png";
    // 光环底
    SkinUtil.wofang_guanghuan = "comp/image/guanhuandi.png";
    SkinUtil.difang_guanghuan = "comp/image/guanhuandi2.png";
    // 分割线
    SkinUtil.fengexian = "comp/image/zhaungbeixingxi02.png";
    //敌方技能底
    SkinUtil.difangjinengdi = "comp/image/difangjinengdi.png";
    //我方技能底
    SkinUtil.wofangjinengdi = "comp/image/wofangjinengdi.png";
    //我方技能底光效
    SkinUtil.wofangjinengGX = "comp/image/wofangjinengdi2.png";
    //敌方技能底光效
    SkinUtil.difangjinengGX = "comp/image/difangjinengdi2.png";
    // 分页按钮状态
    SkinUtil.fenye_down = "comp/bg/fenye1.png";
    SkinUtil.fenye_up = "comp/bg/fenye2.png";
    /** 默认头像框 */
    SkinUtil.default_head_frame = "hud/zhuchengdi.png";
    /** 默认等级框 */
    SkinUtil.default_lv_frame = "hud/yubiaodi.png";
    //挂机当前关卡图片
    SkinUtil.guajiIndexImage = "comp/image/xunzhong.png";
    return SkinUtil;
}());
