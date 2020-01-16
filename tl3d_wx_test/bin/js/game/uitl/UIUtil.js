var UIUtil = /** @class */ (function () {
    function UIUtil() {
    }
    /** 展示道具奖励弹窗通过服务端下发的commonData,
     *  根据服务端响应数据格式，如 commonData.addBagItems、commonData.addCoin...
     *  格式 {ID1:count,ID2:count,...}
     *  isPreview : 是否预览
     *  Zorder : 层级
     */
    UIUtil.showRewardView = function (commonData, cb, isPreview, Zorder) {
        if (isPreview === void 0) { isPreview = false; }
        if (Zorder === void 0) { Zorder = UI_DEPATH.TOP; }
        commonData = commonData || {};
        var list = [];
        if (Array.isArray(commonData)) {
            list = commonData;
        }
        else {
            if (commonData.hasOwnProperty('addResource')) {
                for (var id in commonData.addResource) {
                    list.push(new ItemVo(parseInt(id), commonData.addResource[id]));
                }
            }
            if (commonData.hasOwnProperty('addTreasures')) {
                for (var id in commonData.addTreasures) {
                    var vo = commonData.addTreasures[id];
                    list.push(new ItemVo(vo.templateId, vo.num));
                }
            }
            if (commonData.hasOwnProperty('returnEquip')) {
                for (var equipVo in commonData.returnEquip) {
                    list.push(commonData.returnEquip[equipVo]);
                }
            }
            if (commonData.hasOwnProperty('addBagItems')) {
                for (var id in commonData.addBagItems) {
                    list.push(new ItemVo(parseInt(id), commonData.addBagItems[id]));
                }
            }
            if (commonData.hasOwnProperty('addEquips')) {
                var equips = {};
                for (var key in commonData.addEquips) {
                    var id = commonData.addEquips[key].templateId;
                    equips[id] = !equips[id] ? 1 : equips[id] + 1;
                }
                for (var key in equips) {
                    list.push(new ItemVo(parseInt(key), equips[key]));
                }
            }
            if (commonData.hasOwnProperty('addTimeItems')) {
                for (var key in commonData.addTimeItems) {
                    var vo = commonData.addTimeItems[key];
                    list.push(new LimitItemVo(Number(key), vo.limitTime, vo.templateId, 1));
                }
            }
            if (commonData.hasOwnProperty('useGodItems')) {
                for (var key in commonData.useGodItems) {
                    list.push(new ItemVo(parseInt(key), commonData.useGodItems[key]));
                }
            }
            if (commonData.hasOwnProperty('addGemstones') || commonData.hasOwnProperty('clientAddGemsByModifyNum') || commonData.hasOwnProperty('clientAddGemsByModifyGems')) {
                var gemsList = game.GemstoneUtils.getGemRewardItemList(commonData);
                if (gemsList.length > 0) {
                    list = list.concat.apply(list, gemsList);
                }
            }
            if (commonData.hasOwnProperty("clientAddItemVoList")) {
                for (var _i = 0, _a = commonData['clientAddItemVoList']; _i < _a.length; _i++) {
                    var itemvo = _a[_i];
                    list.push(itemvo);
                }
            }
        }
        if (list.length > 0) {
            var opt = { itemList: list, isPreview: isPreview, zorder: Zorder, callback: cb };
            UIMgr.showUI(UIConst.CommonRewardView, opt);
            var hasItem = list.some(function (vo) {
                return vo && vo.id == common.GlobalData.XIANSHI_BX_700;
            });
            if (hasItem && !game.GuideManager.isExecuteGuide()) {
                Laya.timer.callLater(this, function () {
                    UIMgr.showUI(UIConst.XianshiBaoxiangView, Zorder);
                });
            }
        }
        else {
            if (cb) {
                cb(null);
            }
        }
    };
    /** 获取奖励物品列表 */
    UIUtil.getRewardItemVoList = function (ary, sdate, firstFlag, startAction) {
        if (firstFlag === void 0) { firstFlag = false; }
        if (startAction === void 0) { startAction = true; }
        if (!sdate)
            return;
        if (sdate.addResource) {
            for (var key in sdate.addResource) {
                var data = new ItemVo(parseInt(key), sdate.addResource[key], 0, 0, null, firstFlag);
                data.startAction = startAction;
                ary.push(data);
            }
        }
        if (sdate.hasOwnProperty('addTreasures')) {
            for (var id in sdate.addTreasures) {
                var vo = sdate.addTreasures[id];
                var data = new ItemVo(vo.templateId, vo.num);
                data.startAction = startAction;
                ary.push(data);
            }
        }
        if (sdate.addBagItems) {
            for (var id in sdate.addBagItems) {
                var data = new ItemVo(parseInt(id), sdate.addBagItems[id], 0, 0, null, firstFlag);
                data.startAction = startAction;
                ary.push(data);
            }
        }
        if (sdate.addEquips) {
            for (var id in sdate.addEquips) {
                var data = new EquipItemVo(sdate.addEquips[id]);
                data.uuid = id;
                data.startAction = startAction;
                data.isFirst = firstFlag;
                ary.push(data);
            }
        }
        if (sdate.hasOwnProperty('addGemstones') || sdate.hasOwnProperty('clientAddGemsByModifyNum') || sdate.hasOwnProperty('clientAddGemsByModifyGems')) {
            var gemsList = game.GemstoneUtils.getGemRewardItemList(sdate);
            for (var _i = 0, gemsList_1 = gemsList; _i < gemsList_1.length; _i++) {
                var vo = gemsList_1[_i];
                vo.startAction = startAction;
                vo.isFirst = firstFlag;
                ary.push(vo);
            }
        }
    };
    /** 技能信息框 */
    UIUtil.isShowInfoBox = function (data, isShow, posx, posy) {
        if (posx === void 0) { posx = null; }
        if (posy === void 0) { posy = null; }
        var ui = UIMgr.getUIByName(UIConst.SkillTip);
        if (!isShow) {
            if (ui)
                ui.timerOnce();
        }
        if (UIMgr.hasStage(UIConst.SkillTip)) {
            if (ui) {
                ui.dataSource = [data, posx, posy];
                ui.onOpened();
                return;
            }
        }
        UIMgr.showUI(UIConst.SkillTip, [data, posx, posy]);
    };
    /**  */
    UIUtil.showTip = function (dataSource, argObj) {
        if (argObj === void 0) { argObj = null; }
        var itemData;
        if (dataSource instanceof tb.TB_item) {
            itemData = dataSource;
        }
        else if (dataSource instanceof tb.TB_god) {
            var realDegree = argObj && argObj['degree'] ? argObj['degree'] : 1;
            var starLevel = argObj && argObj['starLevel'] ? argObj['starLevel'] : 1;
            UIUtil.showGodTip(dataSource.ID, { degree: realDegree, starLevel: starLevel });
            return;
        }
        else if (dataSource instanceof EquipItemVo) {
            UIMgr.showUI(UIConst.EquipTip, dataSource);
        }
        else if (dataSource instanceof TreasureItemVo) {
            game.TreasureTipsView.popupTip(dataSource, null, false);
            return;
        }
        else {
            var data = dataSource;
            itemData = tb.TB_item.get_TB_itemById(data.id);
        }
        if (!itemData)
            return;
        if (itemData.type == iface.tb_prop.itemTypeKey.god) {
            var realDegree = argObj && argObj['degree'] ? argObj['degree'] : (Number(itemData.icon[3] <= 6 ? Number(itemData.icon[3]) : 6));
            var starLevel = argObj && argObj['starLevel'] ? argObj['starLevel'] : Number(itemData.icon[3]);
            UIUtil.showGodTip(itemData.defined[0], { degree: realDegree, starLevel: starLevel });
        }
        else if (itemData.type == iface.tb_prop.itemTypeKey.equip) {
            var equipVo = new EquipItemVo(itemData);
            UIMgr.showUI(UIConst.EquipTip, equipVo);
        }
        else {
            UIUtil.showItemTip(dataSource);
        }
    };
    UIUtil.showGodTip = function (godid, argObj) {
        var tbData = tb.TB_god.get_TB_godById(godid);
        var realDegree = argObj && argObj['degree'] ? argObj['degree'] : 0;
        var starLevel = argObj && argObj['starLevel'] ? argObj['starLevel'] : 0;
        // let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(starLevel);
        // let needLevel = evotab ? evotab.level : 1;
        var needLevel = 1;
        if (argObj.hasOwnProperty("level")) {
            needLevel = argObj['level'];
        }
        var obj = { templateId: tbData.ID, starLevel: starLevel, level: needLevel, skill: tbData.skill, degree: realDegree };
        var godData = new GodItemVo(obj);
        godData.tab_god = tbData;
        dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
    };
    /** 物品信息框 */
    UIUtil.showItemTip = function (data) {
        UIMgr.showUI(UIConst.ItemTip, data);
    };
    /** 展示模型 */
    UIUtil.showRole = function ($god, $type, commonData) {
        UIMgr.showUI(UIConst.ShowRole, [$god, $type, commonData]);
    };
    /** 战力变化动画 */
    UIUtil.upPowerEff = function (startnum, endnum, py) {
        if (py === void 0) { py = 250; }
        var obj = { posy: py, start: startnum, end: endnum };
        if (UIMgr.hasStage(UIConst.UpPower)) {
            var ui_1 = UIMgr.getUIByName(UIConst.UpPower);
            ui_1.dataSource = obj;
            ui_1.updateEff();
        }
        else {
            UIMgr.showUI(UIConst.UpPower, obj);
        }
    };
    /** 循环 */
    UIUtil.loop = function (target, startX, startY, time, offset, type) {
        var _this = this;
        //是否垂直
        var isVer = type == TweenDirection.up || type == TweenDirection.down ? true : false;
        var endX, endY;
        if (type == TweenDirection.up) {
            endY = startY - offset;
        }
        else if (type == TweenDirection.down) {
            endY = startY + offset;
        }
        else if (type == TweenDirection.left) {
            endX = startX + offset;
        }
        else {
            endX = startX - offset;
        }
        Laya.Tween.to(target, { y: (isVer ? endY : startY), x: (isVer ? startX : endX) }, time, Laya.Ease.linearInOut, new Handler(this, function () {
            Laya.Tween.to(target, { y: (isVer ? (type == TweenDirection.up ? endY + offset : endY - offset) : startY), x: (isVer ? startX : (type == TweenDirection.right ? endX + offset : endX - offset)) }, time, Laya.Ease.linearInOut, new Handler(_this, function () {
                UIUtil.loop(target, startX, startY, time, offset, type);
            }));
        }));
    };
    /** 检测消耗是否不足 */
    UIUtil.checkNotEnough = function (type, cost) {
        if (App.isEnough(type, cost))
            return false;
        // 不足时弹提示
        if (type == iface.tb_prop.resTypeKey.gold) {
            showToast(LanMgr.getLan('', Lans.glod));
        }
        else if (type == iface.tb_prop.resTypeKey.diamond) {
            showToast(LanMgr.getLan('', 10073));
        }
        else if (type == iface.tb_prop.resTypeKey.guildDonate) {
            showToast(LanMgr.getLan('', 10074));
        }
        else if (type == CostTypeKey.treasure_rebirth) {
            showToast(LanMgr.getLan('', Lans.cost, [CostTypeKey.treasure_rebirth]));
        }
        else {
            showToast(LanMgr.getLan('', Lans.cost));
        }
        return true;
    };
    /** 检测是否有剩余次数 */
    UIUtil.checkLimitEnough = function (limitType, vipType) {
        var num = App.hero.getlimitValue(limitType);
        var total = App.hero.baseAddVipNum(vipType);
        if (num >= total) {
            var maxLv = App.getMaxVipLv();
            if (App.hero.vip >= maxLv) {
                showToast(LanMgr.getLan('', 10146));
            }
            else {
                showToast(LanMgr.getLan('', 10082));
            }
            return false;
        }
        return true;
    };
    /** 检测是否不能进入战斗 公共判断
     * 消耗次数的副本需要提前判断
    */
    UIUtil.checkUnableToEnterFight = function (lineupTypeKey) {
        if (lineupTypeKey === void 0) { lineupTypeKey = iface.tb_prop.lineupTypeKey.attack; }
        if (game.GodUtils.getGodsNum() <= 0) {
            dispatchEvt(new game.SummonEvent(game.SummonEvent.SHOW_ZHAOHUAN_PANEL));
            showToast(LanMgr.getLan("", 10017));
            return true;
        }
        if (!App.hero.hasLineUp(lineupTypeKey)) {
            dispatchEvt(new game.GodEvent(game.GodEvent.SHOW_BUZHEN_PANEL), lineupTypeKey);
            showToast(LanMgr.getLan("", 10204));
            return true;
        }
        return false;
    };
    /** 展示规则界面 */
    UIUtil.showCommonTipView = function (content) {
        var opt = { content: content, width: 620 };
        if (UIMgr.hasStage(UIConst.CommonRuleView)) {
            var view = UIMgr.getUIByName(UIConst.CommonRuleView);
            view.dataSource = opt;
            view.initView();
        }
        else {
            UIMgr.showUI(UIConst.CommonRuleView, opt);
        }
    };
    /**跳转获得途径界面 */
    UIUtil.showJumpPanle = function (id) {
        var item = tb.TB_item.get_TB_itemById(id);
        if (!item || item.way_link.length == 0)
            return;
        UIMgr.showUI(UIConst.Equip_JumpView, id);
    };
    /** 自定义跳转获得途径界面 */
    UIUtil.showJumpPanle2 = function (type) {
        var ary = [];
        // 英雄升星
        if (type == 1) {
            ary = [[ModuleConst.SUMMON], [ModuleConst.SHENMEN]];
        }
        else if (type == 2) {
            // 圣物升星
            // ary = [[ModuleConst.SUMMON],[ModuleConst.SHENMEN]];
        }
        if (ary.length > 0) {
            UIMgr.showUI(UIConst.Equip_JumpView, ary);
        }
    };
    /**创建头像遮罩 */
    UIUtil.createHeadMask = function (ui, radio) {
        if (!ui || radio < 0)
            return null;
        var mask = new Sprite;
        mask.width = radio * 2;
        mask.height = radio * 2;
        mask.graphics.drawCircle(radio, radio, radio, "#ff000001");
        mask.visible = false;
        ui.mask = mask;
        if (ui.parent)
            ui.parent.addChild(mask);
        return mask;
    };
    /** 显示装备强化大师精炼大师升级界面 */
    UIUtil.showEquipLvupView = function (type, level) {
        if (UIMgr.hasStage(UIConst.EquipLvupView)) {
            var view = UIMgr.getUIByName(UIConst.EquipLvupView);
            view.dataSource = [type, level];
            view.show();
        }
        else {
            UIMgr.showUI(UIConst.EquipLvupView, [type, level]);
        }
    };
    /** 检测装备套装是否升级
     *  数组 [品质,数量] 品质EquipQuality，数量大于0
     */
    UIUtil.checkEquipSuitLvup = function (lastSuit, curSuit) {
        // 当前没有套装，小于两件套
        if (!curSuit || curSuit.length < 2 || curSuit[1] < 2)
            return;
        lastSuit = lastSuit || [];
        var curType = curSuit[0];
        var curNum = curSuit[1];
        // 从无到有
        if (lastSuit.length <= 1) {
            UIMgr.showUI(UIConst.EquipSuitLvupView, curSuit);
            return;
        }
        var lastType = lastSuit[0];
        var lastNum = lastSuit[1];
        if (curNum - lastNum >= 1) {
            // 套装数量增加
            UIMgr.showUI(UIConst.EquipSuitLvupView, curSuit);
        }
        else if (curType > lastType && curNum >= lastNum) {
            // 品质提升
            UIMgr.showUI(UIConst.EquipSuitLvupView, curSuit);
        }
    };
    /** 显示系统头部界面 */
    UIUtil.showSysTopView = function (vo) {
        var inStage = UIMgr.hasStage(UIConst.SysTopView);
        if (inStage) {
            var view = UIMgr.getUIByName(UIConst.SysTopView);
            view.dataSource = vo;
            view.show();
        }
        else {
            UIMgr.showUI(UIConst.SysTopView, vo);
        }
    };
    /** 获取奖励物品列表 */
    UIUtil.getRewardItemList = function (commonData) {
        var list = [];
        if (Array.isArray(commonData)) {
            list = commonData;
        }
        else {
            if (commonData.hasOwnProperty('addResource')) {
                for (var id in commonData.addResource) {
                    list.push(new ItemVo(parseInt(id), commonData.addResource[id]));
                }
            }
            if (commonData.hasOwnProperty('addTreasures')) {
                for (var id in commonData.addTreasures) {
                    var vo = commonData.addTreasures[id];
                    list.push(new ItemVo(vo.templateId, vo.num));
                }
            }
            if (commonData.hasOwnProperty('returnEquip')) {
                for (var equipVo in commonData.returnEquip) {
                    list.push(commonData.returnEquip[equipVo]);
                }
            }
            if (commonData.hasOwnProperty('addBagItems')) {
                for (var id in commonData.addBagItems) {
                    list.push(new ItemVo(parseInt(id), commonData.addBagItems[id]));
                }
            }
            if (commonData.hasOwnProperty('addEquips')) {
                var equips = {};
                for (var key in commonData.addEquips) {
                    var id = commonData.addEquips[key].templateId;
                    equips[id] = !equips[id] ? 1 : equips[id] + 1;
                }
                for (var key in equips) {
                    list.push(new ItemVo(parseInt(key), equips[key]));
                }
            }
            if (commonData.hasOwnProperty('addAccs')) {
                var accs = {};
                for (var key in commonData.addAccs) {
                    var id = commonData.addAccs[key].templateId;
                    accs[id] = !accs[id] ? 1 : accs[id] + 1;
                }
                for (var key in accs) {
                    list.push(new ItemVo(parseInt(key), accs[key]));
                }
            }
            if (commonData.hasOwnProperty('addTimeItems')) {
                for (var key in commonData.addTimeItems) {
                    var vo = commonData.addTimeItems[key];
                    list.push(new LimitItemVo(Number(key), vo.limitTime, vo.templateId, 1));
                }
            }
            if (commonData.hasOwnProperty('useGodItems')) {
                for (var key in commonData.useGodItems) {
                    list.push(new ItemVo(parseInt(key), commonData.useGodItems[key]));
                }
            }
        }
        return list;
    };
    /** 列表缓动效果：适合一列的左右缓动 */
    UIUtil.listTween = function (list, callback) {
        var cells = list.cells;
        // 初始设置
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            var itemIR = cell;
            Laya.Tween.clearTween(itemIR);
            itemIR.x = -itemIR.width;
        }
        if (list.scrollBar) {
            list.scrollBar.touchScrollEnable = false;
        }
        // 速度
        var speed = 0.31; // 250/800 
        var bonusSpeed = 0.8;
        var allTime = 0;
        var _loop_1 = function (i, len) {
            var itemIR = cells[i];
            // 没有数据的虚拟项跳过
            if (!list.getItem(i))
                return "continue";
            itemIR.mouseEnabled = false;
            // 第一次缓动的x位置 多出1/7回弹效果
            var endX = Math.ceil(itemIR.width / 7);
            // 缓动时间
            var time = (itemIR.width + endX) * speed;
            // 延迟时间
            var delay = (time * 0.4) * i;
            // logyhj("id:"+i+"  x:"+ itemIR.x + "       endX:" + endX);
            Laya.Tween.to(itemIR, { x: endX }, time, Laya.Ease.linearIn, new Handler(this_1, function () {
                itemIR.mouseEnabled = true;
                // 回弹时间
                var bonusTime = bonusSpeed * endX;
                Laya.Tween.to(itemIR, { x: 0 }, bonusTime, Laya.Ease.linearIn);
            }), delay);
            allTime += time;
        };
        var this_1 = this;
        // 开始
        for (var i = 0, len = cells.length; i < len; i++) {
            _loop_1(i, len);
        }
        Laya.timer.once(allTime, this, function () {
            if (list.scrollBar) {
                list.scrollBar.touchScrollEnable = true;
            }
            if (callback) {
                callback();
            }
        });
    };
    /**
     * ui上下缓动
     * @param box 目标
     * @param startY 开始位置
     * @param targetY 最终位置
     * @param duration 总缓动时间
     * @param bonusRate 回弹高度比例
     * @param isUp 是否向上缓动
     */
    UIUtil.boxUpDownTween = function (box, startY, targetY, isUp, duration, bonusRate, cb) {
        var _this = this;
        if (isUp === void 0) { isUp = false; }
        if (duration === void 0) { duration = 310; }
        if (bonusRate === void 0) { bonusRate = 0.1; }
        // 初始设置
        box.y = startY;
        // 第一次缓动的x位置 多出回弹高度
        var endY = isUp ? targetY - Math.ceil(box.height * bonusRate) : targetY + Math.ceil(box.height * bonusRate);
        // 缓动时间
        var time = duration * 0.82;
        // 回弹时间
        var bonusTime = duration - time;
        Laya.Tween.to(box, { y: endY }, time, Laya.Ease.linearIn, new Handler(this, function () {
            Laya.Tween.to(box, { y: targetY }, bonusTime, Laya.Ease.linearIn, new Handler(_this, function () {
                if (cb) {
                    cb();
                }
            }));
        }));
    };
    /**
     * ui左右缓动
     * @param box 目标
     * @param startX 开始位置
     * @param targetX 最终位置
     * @param duration 总缓动时间
     * @param bonusRate 回弹高度比例
     * @param isLeft 是否向左边缓动
     */
    UIUtil.boxLeftRightTween = function (box, startX, targetX, isLeft, duration, bonusRate) {
        if (isLeft === void 0) { isLeft = false; }
        if (duration === void 0) { duration = 310; }
        if (bonusRate === void 0) { bonusRate = 0.1; }
        // 初始设置
        box.x = startX;
        // 第一次缓动的x位置 多出回弹高度
        var endX = isLeft ? targetX - Math.ceil(box.width * bonusRate) : targetX + Math.ceil(box.width * bonusRate);
        // 缓动时间
        var time = duration * 0.82;
        // 回弹时间
        var bonusTime = duration - time;
        Laya.Tween.to(box, { x: endX }, time, Laya.Ease.linearIn, new Handler(this, function () {
            Laya.Tween.to(box, { x: targetX }, bonusTime, Laya.Ease.linearIn);
        }));
    };
    /**
     * ui缩放缓动
     * @param box 目标
     * @param startScale 开始缩放
     * @param targetScale 最终缩放
     * @param duration 总缓动时间
     * @param bonusRate 回弹缩放比例
     */
    UIUtil.boxScaleTween = function (box, startScale, targetScale, duration, bonusRate) {
        if (duration === void 0) { duration = 310; }
        if (bonusRate === void 0) { bonusRate = 0.1; }
        // 初始设置
        box.scale(startScale, startScale);
        var endScale = targetScale + targetScale * bonusRate;
        // 缓动时间
        var time = duration * 0.82;
        // 回弹时间
        var bonusTime = duration - time;
        Laya.Tween.to(box, { scaleX: endScale, scaleY: endScale }, time, Laya.Ease.linearIn, new Handler(this, function () {
            Laya.Tween.to(box, { scaleX: targetScale, scaleY: targetScale }, bonusTime, Laya.Ease.linearIn);
        }));
    };
    /** 显示玩家阵容信息 */
    UIUtil.showPlayerLineupInfo = function (playerId, type) {
        if (!playerId || playerId == "")
            return;
        var arg = {};
        arg[Protocol.center_query_queryPlayer.args.playerId] = playerId;
        PLC.request(Protocol.center_query_queryPlayer, arg, function ($data, msg) {
            if (!$data)
                return;
            var playerInfo = {
                type: type,
                name: $data.name,
                guildName: $data.guildName,
                force: $data.force,
                head: $data.head,
                headFrame: $data.headFrame,
                sex: $data.sex,
                level: $data.level,
                getLineupGods: function () {
                    var godArr = [];
                    for (var _i = 0, _a = $data.lineupInfo[0]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        if (!obj) {
                            godArr.push(null);
                            continue;
                        }
                        var tbGod = tb.TB_god.get_TB_godById(obj[0]);
                        var godVo = new GodItemVo(tbGod);
                        // [templateId, starLv, level, attrs, degree, awakenLv, skinId]
                        godVo.starLevel = obj[1];
                        godVo.level = obj[2];
                        godVo.degree = obj[4];
                        godVo.dataType = 1;
                        if (obj[3]) {
                            godVo.iSeverAttri = map2ary(obj[3]);
                        }
                        godArr.push(godVo);
                    }
                    return godArr;
                },
                getShenqiAry: function () {
                    return $data.lineupInfo[1];
                }
            };
            UIMgr.showUI(UIConst.PlayerLineupInfoView, playerInfo);
        });
    };
    /** 显示匹配赛跨服玩家阵容信息 */
    UIUtil.showMatchLineupInfo = function (rankVo, type) {
        if (!rankVo || !rankVo.playerId)
            return;
        var arg = {};
        arg[Protocol.center_match_observePlayer.args.obPlayerId] = rankVo.playerId;
        PLC.request(Protocol.center_match_observePlayer, arg, function (sdata, msg) {
            if (!sdata)
                return;
            var playerInfo = {
                type: type,
                name: rankVo.name,
                guildName: rankVo.guildName,
                force: getLineupForce(sdata.defInfo),
                head: rankVo.head,
                headFrame: rankVo.headFrame,
                sex: rankVo.head,
                level: rankVo.level,
                getLineupGods: function () {
                    var godArr = [];
                    for (var _i = 0, _a = sdata.defInfo[0]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        if (!obj) {
                            godArr.push(null);
                            continue;
                        }
                        var tbGod = tb.TB_god.get_TB_godById(obj[0]);
                        var godVo = new GodItemVo(tbGod);
                        godVo.starLevel = obj[1];
                        godVo.level = obj[2];
                        godVo.dataType = 1;
                        if (obj[3]) {
                            godVo.iSeverAttri = map2ary(obj[3]);
                        }
                        godArr.push(godVo);
                    }
                    return godArr;
                },
                getShenqiAry: function () {
                    return sdata.defInfo[1];
                }
            };
            UIMgr.showUI(UIConst.PlayerLineupInfoView, playerInfo);
        });
    };
    /** 模拟充值:支付debug版 */
    UIUtil.payDebug = function (charge_id, alertData, callback) {
        if (alertData === void 0) { alertData = null; }
        if (callback === void 0) { callback = null; }
        alertData = alertData || { text: LanMgr.getLan("", 10537) };
        var args = {};
        args[Protocol.game_gm_command.args.content] = "@充值 " + charge_id;
        PLC.request(Protocol.game_gm_command, args, function ($data, $msg) {
            if (!$data)
                return;
            common.AlertBox.showAlertYes(alertData, true);
            if (callback) {
                callback();
            }
        });
    };
    /** 打开vip提升界面 */
    UIUtil.showVipupPanel = function (data) {
        if (data && Object.keys(data).length > 0) {
            var vipData = {};
            for (var key in data) {
                vipData[key] = data[key];
            }
            data = null;
            UIMgr.showUI(UIConst.VipLvUpView, vipData);
        }
    };
    UIUtil.saveVipupData = function (oldScore, newScore) {
        var oldVip = game.HudModel.getTbVipByScore(oldScore);
        var newVip = game.HudModel.getTbVipByScore(newScore);
        if (!newVip)
            return;
        var isUp = oldVip ? newVip.ID > oldVip.ID : true;
        if (isUp) {
            var clientData = {};
            clientData["oldVip"] = oldVip ? oldVip.ID : 0;
            clientData["newVip"] = newVip.ID;
            clientData["oldScore"] = oldScore;
            clientData["newScore"] = newScore;
            UIUtil.vipData = clientData;
        }
    };
    UIUtil.popEffectByLeft = function (target, fromX, endX, time) {
        if (time === void 0) { time = 200; }
        return new Handler(this, function () {
            target.x = fromX;
            target.alpha = 0.3;
            Laya.Tween.to(target, { x: endX, alpha: 1 }, time, Laya.Ease.linearIn);
        });
    };
    UIUtil.closeEffectByLeft = function (target, fromX, endX, time) {
        if (time === void 0) { time = 200; }
        return new Handler(this, function () {
            target.x = fromX;
            // target.alpha = 1;
            Laya.Tween.to(target, { x: endX, alpha: 0.3 }, time, Laya.Ease.linearIn);
        });
    };
    UIUtil.playListEff = function (list) {
        if (!list)
            return;
        this.clearListEff(list);
        for (var i = 0; i < list.length; i++) {
            var cell = list[i];
            var targetPosy = cell.y;
            cell.y = targetPosy + 900;
            // let targetPosy: number = cell.y + 900;
            var time = i * 50;
            Laya.timer.once(time, cell, this.onItemComplete, [cell, targetPosy]);
        }
    };
    UIUtil.onItemComplete = function (item, posy) {
        Laya.Tween.to(item, { y: posy }, 300);
        // Laya.Tween.from(item, { y: posy }, 300);
    };
    UIUtil.clearListEff = function (list) {
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var cell = list[i];
                Laya.timer.clear(cell, this.onItemComplete);
                Laya.Tween.clearAll(cell);
            }
        }
    };
    return UIUtil;
}());
