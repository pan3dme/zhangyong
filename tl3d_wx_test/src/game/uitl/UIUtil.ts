
class UIUtil {

    /** 展示道具奖励弹窗通过服务端下发的commonData,
     *  根据服务端响应数据格式，如 commonData.addBagItems、commonData.addCoin...
     *  格式 {ID1:count,ID2:count,...}
     *  isPreview : 是否预览
     *  Zorder : 层级
     */
    static showRewardView(commonData: any, cb?: Function, isPreview: boolean = false, Zorder: number = UI_DEPATH.TOP): void {
        commonData = commonData || {};
        let list: Array<ItemVo> = [];
        if (Array.isArray(commonData)) {
            list = commonData;
        } else {
            if (commonData.hasOwnProperty('addResource')) {
                for (let id in commonData.addResource) {
                    list.push(new ItemVo(parseInt(id), commonData.addResource[id]));
                }
            }
            if (commonData.hasOwnProperty('addTreasures')) {
                for (let id in commonData.addTreasures) {
                    let vo: ITreasureSvo = commonData.addTreasures[id];
                    list.push(new ItemVo(vo.templateId, vo.num));
                }
            }
            if (commonData.hasOwnProperty('returnEquip')) {
                for (let equipVo in commonData.returnEquip) {
                    list.push(commonData.returnEquip[equipVo]);
                }
            }
            if (commonData.hasOwnProperty('addBagItems')) {
                for (let id in commonData.addBagItems) {
                    list.push(new ItemVo(parseInt(id), commonData.addBagItems[id]));
                }
            }
            if (commonData.hasOwnProperty('addEquips')) {
                let equips: Object = {};
                for (let key in commonData.addEquips) {
                    let id = commonData.addEquips[key].templateId;
                    equips[id] = !equips[id] ? 1 : equips[id] + 1;
                }
                for (let key in equips) {
                    list.push(new ItemVo(parseInt(key), equips[key]));
                }
            }
            if (commonData.hasOwnProperty('addTimeItems')) {
                for (let key in commonData.addTimeItems) {
                    let vo = commonData.addTimeItems[key];
                    list.push(new LimitItemVo(Number(key), vo.limitTime, vo.templateId, 1));
                }
            }

            if (commonData.hasOwnProperty('useGodItems')) {
                for (let key in commonData.useGodItems) {
                    list.push(new ItemVo(parseInt(key), commonData.useGodItems[key]));
                }
            }
            if (commonData.hasOwnProperty('addGemstones') || commonData.hasOwnProperty('clientAddGemsByModifyNum') || commonData.hasOwnProperty('clientAddGemsByModifyGems')) {
                let gemsList = game.GemstoneUtils.getGemRewardItemList(commonData);
                if (gemsList.length > 0) {
                    list = list.concat(...gemsList);
                }
            }
            if(commonData.hasOwnProperty("clientAddItemVoList")) {
                for (let itemvo of commonData['clientAddItemVoList']) {
                    list.push(itemvo);
                }
            }
        }
        if (list.length > 0) {
            let opt: common.IRewardOption = { itemList: list, isPreview, zorder: Zorder, callback: cb };
            UIMgr.showUI(UIConst.CommonRewardView, opt);

            let hasItem = list.some((vo) => {
                return vo && vo.id == common.GlobalData.XIANSHI_BX_700;
            });
            if (hasItem && !game.GuideManager.isExecuteGuide()) {
                Laya.timer.callLater(this, () => {
                    UIMgr.showUI(UIConst.XianshiBaoxiangView, Zorder);
                });
            }
        } else {
            if (cb) {
                cb(null);
            }
        }
    }

    /** 获取奖励物品列表 */
    static getRewardItemVoList(ary: Array<inface.IItemData>, sdate, firstFlag: boolean = false, startAction: boolean = true): void {
        if (!sdate) return;
        if (sdate.addResource) {
            for (var key in sdate.addResource) {
                let data = new ItemVo(parseInt(key), sdate.addResource[key], 0, 0, null, firstFlag);
                data.startAction = startAction;
                ary.push(data);
            }
        }
        if (sdate.hasOwnProperty('addTreasures')) {
            for (let id in sdate.addTreasures) {
                let vo: ITreasureSvo = sdate.addTreasures[id];
                let data = new ItemVo(vo.templateId, vo.num);
                data.startAction = startAction;
                ary.push(data);
            }
        }
        if (sdate.addBagItems) {
            for (let id in sdate.addBagItems) {
                let data = new ItemVo(parseInt(id), sdate.addBagItems[id], 0, 0, null, firstFlag);
                data.startAction = startAction;
                ary.push(data);
            }
        }
        if (sdate.addEquips) {
            for (let id in sdate.addEquips) {
                let data: EquipItemVo = new EquipItemVo(sdate.addEquips[id]);
                data.uuid = id;
                data.startAction = startAction;
                data.isFirst = firstFlag;
                ary.push(data);
            }
        }
        if (sdate.hasOwnProperty('addGemstones') || sdate.hasOwnProperty('clientAddGemsByModifyNum') || sdate.hasOwnProperty('clientAddGemsByModifyGems')) {
            let gemsList = game.GemstoneUtils.getGemRewardItemList(sdate);
            for (let vo of gemsList) {
                vo.startAction = startAction;
                vo.isFirst = firstFlag;
                ary.push(vo);
            }
        }
    }

    /** 技能信息框 */
    static isShowInfoBox(data: common.listData, isShow: boolean, posx = null, posy = null): void {
        let ui: common.SkillTip = UIMgr.getUIByName(UIConst.SkillTip);
        if (!isShow) {
            if (ui) ui.timerOnce();
        }
        if (UIMgr.hasStage(UIConst.SkillTip)) {
            if (ui) {
                ui.dataSource = [data, posx, posy];
                ui.onOpened();
                return;
            }
        }
        UIMgr.showUI(UIConst.SkillTip, [data, posx, posy]);
    }

    /**  */
    static showTip(dataSource: any, argObj: any = null): void {
        let itemData: tb.TB_item;
        if (dataSource instanceof tb.TB_item) {
            itemData = dataSource;
        } else if (dataSource instanceof tb.TB_god) {
            let realDegree = argObj && argObj['degree'] ? argObj['degree'] : 1;
            let starLevel = argObj && argObj['starLevel'] ? argObj['starLevel'] : 1;
            UIUtil.showGodTip(dataSource.ID, { degree: realDegree, starLevel: starLevel });
            return;
        } else if (dataSource instanceof EquipItemVo) {
            UIMgr.showUI(UIConst.EquipTip, dataSource);
        } else if (dataSource instanceof TreasureItemVo) {
            game.TreasureTipsView.popupTip(dataSource, null, false);
            return;
        } else {
            let data: ItemVo = dataSource as ItemVo;
            itemData = tb.TB_item.get_TB_itemById(data.id);
        }
        if (!itemData) return;
        if (itemData.type == iface.tb_prop.itemTypeKey.god) {
            let realDegree = argObj && argObj['degree'] ? argObj['degree'] : (Number(itemData.icon[3] <= 6 ? Number(itemData.icon[3]) : 6));
            let starLevel = argObj && argObj['starLevel'] ? argObj['starLevel'] : Number(itemData.icon[3])
            UIUtil.showGodTip(itemData.defined[0], { degree: realDegree, starLevel: starLevel });
        } else if (itemData.type == iface.tb_prop.itemTypeKey.equip) {
            let equipVo = new EquipItemVo(itemData);
            UIMgr.showUI(UIConst.EquipTip, equipVo);
        } else {
            UIUtil.showItemTip(dataSource);
        }
    }
    static showGodTip(godid: any, argObj): void {
        let tbData = tb.TB_god.get_TB_godById(godid);
        let realDegree = argObj && argObj['degree'] ? argObj['degree'] : 0;
        let starLevel = argObj && argObj['starLevel'] ? argObj['starLevel'] : 0;
        // let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(starLevel);
        // let needLevel = evotab ? evotab.level : 1;
        let needLevel = 1;
        if (argObj.hasOwnProperty("level")) {
            needLevel = argObj['level'];
        }
        let obj = { templateId: tbData.ID, starLevel, level: needLevel, skill: tbData.skill, degree: realDegree };
        let godData: GodItemVo = new GodItemVo(obj);
        godData.tab_god = tbData;
        dispatchEvt(new game.TujianEvent(game.TujianEvent.SHOW_GUAIWUXINXI_PANEL), godData);
    }
    /** 物品信息框 */
    static showItemTip(data: ItemVo): void {
        UIMgr.showUI(UIConst.ItemTip, data);
    }

    /** 展示模型 */
    static showRole($god: GodItemVo, $type: number, commonData?: any) {
        UIMgr.showUI(UIConst.ShowRole, [$god, $type, commonData]);
    }

    /** 战力变化动画 */
    static upPowerEff(startnum: number, endnum: number, py: number = 250) {
        let obj = { posy: py, start: startnum, end: endnum };
        if (UIMgr.hasStage(UIConst.UpPower)) {
            let ui = UIMgr.getUIByName(UIConst.UpPower) as common.UpPower;
            ui.dataSource = obj;
            ui.updateEff();
        } else {
            UIMgr.showUI(UIConst.UpPower, obj);
        }
    }

    /** 循环 */
    static loop(target: Laya.Sprite, startX: number, startY: number, time: number, offset: number, type: number): void {
        //是否垂直
        let isVer = type == TweenDirection.up || type == TweenDirection.down ? true : false;
        let endX, endY;
        if (type == TweenDirection.up) {
            endY = startY - offset;
        } else if (type == TweenDirection.down) {
            endY = startY + offset;
        } else if (type == TweenDirection.left) {
            endX = startX + offset;
        } else {
            endX = startX - offset;
        }
        Laya.Tween.to(target, { y: (isVer ? endY : startY), x: (isVer ? startX : endX) }, time, Laya.Ease.linearInOut, new Handler(this, () => {
            Laya.Tween.to(target, { y: (isVer ? (type == TweenDirection.up ? endY + offset : endY - offset) : startY), x: (isVer ? startX : (type == TweenDirection.right ? endX + offset : endX - offset)) }
                , time, Laya.Ease.linearInOut, new Handler(this, () => {
                    UIUtil.loop(target, startX, startY, time, offset, type);
                }));
        }));
    }

    /** 检测消耗是否不足 */
    static checkNotEnough(type: number, cost: number): boolean {
        if (App.isEnough(type, cost)) return false;
        // 不足时弹提示
        if (type == iface.tb_prop.resTypeKey.gold) {
            showToast(LanMgr.getLan('', Lans.glod));
        } else if (type == iface.tb_prop.resTypeKey.diamond) {
            showToast(LanMgr.getLan('', 10073));
        } else if (type == iface.tb_prop.resTypeKey.guildDonate) {
            showToast(LanMgr.getLan('', 10074));
        } else if (type == CostTypeKey.treasure_rebirth) {
            showToast(LanMgr.getLan('', Lans.cost, [CostTypeKey.treasure_rebirth]));
        } else {
            showToast(LanMgr.getLan('', Lans.cost));
        }
        return true;
    }

    /** 检测是否有剩余次数 */
    static checkLimitEnough(limitType: number, vipType: number): boolean {
        let num = App.hero.getlimitValue(limitType);
        let total = App.hero.baseAddVipNum(vipType);
        if (num >= total) {
            let maxLv = App.getMaxVipLv();
            if (App.hero.vip >= maxLv) {
                showToast(LanMgr.getLan('', 10146));
            } else {
                showToast(LanMgr.getLan('', 10082));
            }
            return false;
        }
        return true;
    }

    /** 检测是否不能进入战斗 公共判断
     * 消耗次数的副本需要提前判断
    */
    static checkUnableToEnterFight(lineupTypeKey = iface.tb_prop.lineupTypeKey.attack): boolean {
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
    }

    /** 展示规则界面 */
    static showCommonTipView(content: any[]): void {
        let opt: common.IRuleOption = { content, width: 620};
        if (UIMgr.hasStage(UIConst.CommonRuleView)) {
            let view = UIMgr.getUIByName(UIConst.CommonRuleView) as common.CommonRuleView;
            view.dataSource = opt;
            view.initView();
        } else {
            UIMgr.showUI(UIConst.CommonRuleView, opt);
        }
    }

    /**跳转获得途径界面 */
    static showJumpPanle(id: number) {
        let item = tb.TB_item.get_TB_itemById(id);
        if (!item || item.way_link.length == 0) return;
        UIMgr.showUI(UIConst.Equip_JumpView, id);
    }
    /** 自定义跳转获得途径界面 */
    static showJumpPanle2(type: number): void {
        let ary = [];
        // 英雄升星
        if (type == 1) {
            ary = [[ModuleConst.SUMMON], [ModuleConst.SHENMEN]];
        } else if (type == 2) {
            // 圣物升星
            // ary = [[ModuleConst.SUMMON],[ModuleConst.SHENMEN]];
        }
        if (ary.length > 0) {
            UIMgr.showUI(UIConst.Equip_JumpView, ary);
        }
    }

    /**创建头像遮罩 */
    static createHeadMask(ui: Sprite, radio: number): Sprite {
        if (!ui || radio < 0) return null;

        let mask: Sprite = new Sprite;
        mask.width = radio * 2;
        mask.height = radio * 2;
        mask.graphics.drawCircle(radio, radio, radio, "#ff000001");
        mask.visible = false;

        ui.mask = mask;
        if (ui.parent) ui.parent.addChild(mask);

        return mask;
    }

    /** 显示装备强化大师精炼大师升级界面 */
    static showEquipLvupView(type: number, level: number): void {
        if (UIMgr.hasStage(UIConst.EquipLvupView)) {
            let view = UIMgr.getUIByName(UIConst.EquipLvupView) as game.EquipLvupView;
            view.dataSource = [type, level];
            view.show();
        } else {
            UIMgr.showUI(UIConst.EquipLvupView, [type, level]);
        }
    }

    /** 检测装备套装是否升级
     *  数组 [品质,数量] 品质EquipQuality，数量大于0
     */
    static checkEquipSuitLvup(lastSuit: number[], curSuit: number[]): void {
        // 当前没有套装，小于两件套
        if (!curSuit || curSuit.length < 2 || curSuit[1] < 2) return;
        lastSuit = lastSuit || [];
        let curType = curSuit[0];
        let curNum = curSuit[1];
        // 从无到有
        if (lastSuit.length <= 1) {
            UIMgr.showUI(UIConst.EquipSuitLvupView, curSuit);
            return;
        }
        let lastType = lastSuit[0];
        let lastNum = lastSuit[1];
        if (curNum - lastNum >= 1) {
            // 套装数量增加
            UIMgr.showUI(UIConst.EquipSuitLvupView, curSuit);
        } else if (curType > lastType && curNum >= lastNum) {
            // 品质提升
            UIMgr.showUI(UIConst.EquipSuitLvupView, curSuit);
        }
    }

    /** 显示系统头部界面 */
    public static showSysTopView(vo: game.SysTopVo): void {
        let inStage: boolean = UIMgr.hasStage(UIConst.SysTopView);
        if (inStage) {
            let view = UIMgr.getUIByName(UIConst.SysTopView) as game.SysTopView;
            view.dataSource = vo;
            view.show();
        } else {
            UIMgr.showUI(UIConst.SysTopView, vo);
        }
    }

    /** 获取奖励物品列表 */
    public static getRewardItemList(commonData: any): ItemVo[] {
        let list: Array<ItemVo> = [];
        if (Array.isArray(commonData)) {
            list = commonData;
        } else {
            if (commonData.hasOwnProperty('addResource')) {
                for (let id in commonData.addResource) {
                    list.push(new ItemVo(parseInt(id), commonData.addResource[id]));
                }
            }
            if (commonData.hasOwnProperty('addTreasures')) {
                for (let id in commonData.addTreasures) {
                    let vo: ITreasureSvo = commonData.addTreasures[id];
                    list.push(new ItemVo(vo.templateId, vo.num));
                }
            }
            if (commonData.hasOwnProperty('returnEquip')) {
                for (let equipVo in commonData.returnEquip) {
                    list.push(commonData.returnEquip[equipVo]);
                }
            }
            if (commonData.hasOwnProperty('addBagItems')) {
                for (let id in commonData.addBagItems) {
                    list.push(new ItemVo(parseInt(id), commonData.addBagItems[id]));
                }
            }
            if (commonData.hasOwnProperty('addEquips')) {
                let equips: Object = {};
                for (let key in commonData.addEquips) {
                    let id = commonData.addEquips[key].templateId;
                    equips[id] = !equips[id] ? 1 : equips[id] + 1;
                }
                for (let key in equips) {
                    list.push(new ItemVo(parseInt(key), equips[key]));
                }
            }
            if (commonData.hasOwnProperty('addAccs')) {
                let accs: Object = {};
                for (let key in commonData.addAccs) {
                    let id = commonData.addAccs[key].templateId;
                    accs[id] = !accs[id] ? 1 : accs[id] + 1;
                }
                for (let key in accs) {
                    list.push(new ItemVo(parseInt(key), accs[key]));
                }
            }
            if (commonData.hasOwnProperty('addTimeItems')) {
                for (let key in commonData.addTimeItems) {
                    let vo = commonData.addTimeItems[key];
                    list.push(new LimitItemVo(Number(key), vo.limitTime, vo.templateId, 1));
                }
            }

            if (commonData.hasOwnProperty('useGodItems')) {
                for (let key in commonData.useGodItems) {
                    list.push(new ItemVo(parseInt(key), commonData.useGodItems[key]));
                }
            }
        }
        return list;
    }

    /** 列表缓动效果：适合一列的左右缓动 */
    static listTween(list: Laya.List, callback?: Function): void {
        let cells = list.cells;
        // 初始设置
        for (let cell of cells) {
            let itemIR = cell as Laya.Component;
            Laya.Tween.clearTween(itemIR);
            itemIR.x = - itemIR.width;
        }
        if (list.scrollBar) {
            list.scrollBar.touchScrollEnable = false;
        }
        // 速度
        let speed = 0.31;   // 250/800 
        let bonusSpeed = 0.8;
        let allTime = 0;
        // 开始
        for (let i = 0, len = cells.length; i < len; i++) {
            let itemIR = cells[i] as Laya.Component;
            // 没有数据的虚拟项跳过
            if (!list.getItem(i)) continue;
            itemIR.mouseEnabled = false;
            // 第一次缓动的x位置 多出1/7回弹效果
            let endX = Math.ceil(itemIR.width / 7);
            // 缓动时间
            let time = (itemIR.width + endX) * speed;
            // 延迟时间
            let delay = (time * 0.4) * i;
            // logyhj("id:"+i+"  x:"+ itemIR.x + "       endX:" + endX);
            Laya.Tween.to(itemIR, { x: endX }, time, Laya.Ease.linearIn, new Handler(this, () => {
                itemIR.mouseEnabled = true;
                // 回弹时间
                let bonusTime = bonusSpeed * endX;
                Laya.Tween.to(itemIR, { x: 0 }, bonusTime, Laya.Ease.linearIn);
            }), delay);
            allTime += time;
        }
        Laya.timer.once(allTime, this, () => {
            if (list.scrollBar) {
                list.scrollBar.touchScrollEnable = true;
            }
            if (callback) {
                callback();
            }
        });
    }

    /**
     * ui上下缓动
     * @param box 目标
     * @param startY 开始位置
     * @param targetY 最终位置
     * @param duration 总缓动时间
     * @param bonusRate 回弹高度比例
     * @param isUp 是否向上缓动
     */
    static boxUpDownTween(box: Laya.Component, startY: number, targetY: number, isUp: boolean = false, duration: number = 310, bonusRate: number = 0.1, cb?: Function): void {
        // 初始设置
        box.y = startY;
        // 第一次缓动的x位置 多出回弹高度
        let endY = isUp ? targetY - Math.ceil(box.height * bonusRate) : targetY + Math.ceil(box.height * bonusRate);
        // 缓动时间
        let time = duration * 0.82;
        // 回弹时间
        let bonusTime = duration - time;
        Laya.Tween.to(box, { y: endY }, time, Laya.Ease.linearIn, new Handler(this, () => {
            Laya.Tween.to(box, { y: targetY }, bonusTime, Laya.Ease.linearIn, new Handler(this, () => {
                if (cb) {
                    cb();
                }
            }));
        }));
    }

    /**
     * ui左右缓动
     * @param box 目标
     * @param startX 开始位置
     * @param targetX 最终位置
     * @param duration 总缓动时间
     * @param bonusRate 回弹高度比例
     * @param isLeft 是否向左边缓动
     */
    static boxLeftRightTween(box: Laya.Component, startX: number, targetX: number, isLeft: boolean = false, duration: number = 310, bonusRate: number = 0.1): void {
        // 初始设置
        box.x = startX;
        // 第一次缓动的x位置 多出回弹高度
        let endX = isLeft ? targetX - Math.ceil(box.width * bonusRate) : targetX + Math.ceil(box.width * bonusRate);
        // 缓动时间
        let time = duration * 0.82;
        // 回弹时间
        let bonusTime = duration - time;
        Laya.Tween.to(box, { x: endX }, time, Laya.Ease.linearIn, new Handler(this, () => {
            Laya.Tween.to(box, { x: targetX }, bonusTime, Laya.Ease.linearIn);
        }));
    }

    /**
     * ui缩放缓动
     * @param box 目标
     * @param startScale 开始缩放
     * @param targetScale 最终缩放
     * @param duration 总缓动时间
     * @param bonusRate 回弹缩放比例
     */
    static boxScaleTween(box: Laya.Component, startScale: number, targetScale: number, duration: number = 310, bonusRate: number = 0.1): void {
        // 初始设置
        box.scale(startScale, startScale);
        let endScale = targetScale + targetScale * bonusRate;
        // 缓动时间
        let time = duration * 0.82;
        // 回弹时间
        let bonusTime = duration - time;
        Laya.Tween.to(box, { scaleX: endScale, scaleY: endScale }, time, Laya.Ease.linearIn, new Handler(this, () => {
            Laya.Tween.to(box, { scaleX: targetScale, scaleY: targetScale }, bonusTime, Laya.Ease.linearIn);
        }));
    }

    /** 显示玩家阵容信息 */
    static showPlayerLineupInfo(playerId: string, type?: number): void {
        if (!playerId || playerId == "") return;
        let arg = {};
        arg[Protocol.center_query_queryPlayer.args.playerId] = playerId;
        PLC.request(Protocol.center_query_queryPlayer, arg, ($data: any, msg: any) => {
            if (!$data) return;
            let playerInfo: common.IPlayerLinuepInfo = {
                type: type,
                name: $data.name,
                guildName: $data.guildName,
                force: $data.force,
                head: $data.head,
                headFrame: $data.headFrame,
                sex: $data.sex,
                level: $data.level,
                getLineupGods: function () {
                    let godArr = [];
                    for (let obj of $data.lineupInfo[0]) {
                        if (!obj) {
                            godArr.push(null);
                            continue;
                        }
                        let tbGod = tb.TB_god.get_TB_godById(obj[0]);
                        let godVo = new GodItemVo(tbGod);
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
            }
            UIMgr.showUI(UIConst.PlayerLineupInfoView, playerInfo);
        })
    }

    /** 显示匹配赛跨服玩家阵容信息 */
    static showMatchLineupInfo(rankVo: common.RankVo, type?: number): void {
        if (!rankVo || !rankVo.playerId) return;
        let arg = {};
        arg[Protocol.center_match_observePlayer.args.obPlayerId] = rankVo.playerId;
        PLC.request(Protocol.center_match_observePlayer, arg, (sdata: any, msg: any) => {
            if (!sdata) return;
            let playerInfo: common.IPlayerLinuepInfo = {
                type: type,
                name: rankVo.name,
                guildName: rankVo.guildName,
                force: getLineupForce(sdata.defInfo),
                head: rankVo.head,
                headFrame: rankVo.headFrame,
                sex: rankVo.head,
                level: rankVo.level,
                getLineupGods: function () {
                    let godArr = [];
                    for (let obj of sdata.defInfo[0]) {
                        if (!obj) {
                            godArr.push(null);
                            continue;
                        }
                        let tbGod = tb.TB_god.get_TB_godById(obj[0]);
                        let godVo = new GodItemVo(tbGod);
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
            }
            UIMgr.showUI(UIConst.PlayerLineupInfoView, playerInfo);
        });
    }

    /** 模拟充值:支付debug版 */
    static payDebug(charge_id: number, alertData: common.IConfirmData = null, callback: Function = null): void {
        alertData = alertData || { text: LanMgr.getLan(``,10537) };
        var args = {};
        args[Protocol.game_gm_command.args.content] = "@充值 " + charge_id;
        PLC.request(Protocol.game_gm_command, args, ($data: any, $msg) => {
            if (!$data) return;
            common.AlertBox.showAlertYes(alertData, true);
            if (callback) {
                callback();
            }
        })
    }

    /** 打开vip提升界面 */
    static showVipupPanel(data: any): void {
        if (data && Object.keys(data).length > 0) {
            let vipData = {};
            for (let key in data) {
                vipData[key] = data[key];
            }
            data = null;
            UIMgr.showUI(UIConst.VipLvUpView, vipData);
        }
    }

    /** 存储vip升级数据 */
    static vipData: any;
    static saveVipupData(oldScore: number, newScore: number): void {
        let oldVip = game.HudModel.getTbVipByScore(oldScore);
        let newVip = game.HudModel.getTbVipByScore(newScore);
        if (!newVip) return;
        let isUp = oldVip ? newVip.ID > oldVip.ID : true;
        if (isUp) {
            let clientData = {};
            clientData["oldVip"] = oldVip ? oldVip.ID : 0;
            clientData["newVip"] = newVip.ID;
            clientData["oldScore"] = oldScore;
            clientData["newScore"] = newScore;
            UIUtil.vipData = clientData;
        }
    }


    static popEffectByLeft(target: Laya.Sprite, fromX: number, endX: number, time = 200): Laya.Handler {
        return new Handler(this, () => {
            target.x = fromX;
            target.alpha = 0.3;
            Laya.Tween.to(target, { x: endX, alpha: 1 }, time, Laya.Ease.linearIn);
        });
    }
    static closeEffectByLeft(target: Laya.Sprite, fromX: number, endX: number, time = 200): Laya.Handler {
        return new Handler(this, () => {
            target.x = fromX;
            // target.alpha = 1;
            Laya.Tween.to(target, { x: endX, alpha: 0.3 }, time, Laya.Ease.linearIn);
        });
    }



    static playListEff(list: Array<any>): void {
        if (!list) return;
        this.clearListEff(list);
        for (let i: number = 0; i < list.length; i++) {
            let cell = list[i];
            let targetPosy: number = cell.y;
            cell.y = targetPosy + 900;
            // let targetPosy: number = cell.y + 900;
            let time: number = i * 50;
            Laya.timer.once(time, cell, this.onItemComplete, [cell, targetPosy])
        }
    }

    static onItemComplete(item, posy): void {
        Laya.Tween.to(item, { y: posy }, 300);
        // Laya.Tween.from(item, { y: posy }, 300);
    }

    static clearListEff(list: Array<any>): void {
        if (list) {
            for (let i: number = 0; i < list.length; i++) {
                let cell = list[i];
                Laya.timer.clear(cell, this.onItemComplete);
                Laya.Tween.clearAll(cell);
            }
        }
    }


}
