/**
* name 
*/
module game {

    export class BuzhenView extends ui.god.BuzhenUI {
        private itemRenderAry: Array<godBuzhenIR>;
        private _buzhenRoles: common.HeadNameBox[];
        private _uipos: Laya.Point[] = [];
        //临时布阵列表
        private _tempTeamObj: Object; //{godid:pos}
        //更改之前的布阵列表
        private _oldTeamObj: Object;
        private _lastPoint: Laya.Point;
        private _type: number;

        private _buzhenGods: BuzhenListItemVo[];
        constructor() {
            super();
            this.guanghuanUI.on(Laya.Event.CLICK, this, this.showPanel);
            this._buzhenRoles = [this.ui_buzhenrole0, this.ui_buzhenrole1,
            this.ui_buzhenrole2, this.ui_buzhenrole3, this.ui_buzhenrole4, this.ui_buzhenrole5];
            this._buzhenRoles.forEach((vo, index) => {
                vo.name = `ui_buzhenrole${index}`
                this._uipos.push(new Laya.Point(vo.x, vo.y));
            });
        }

        createChildren(): void {
            super.createChildren();
            this.isModelClose = false;
            this.closeByBlank.visible = this.isModelClose;
            this.itemRenderAry = [];
            for (var i = 0; i < 6; i++) {
                let uiitem: godBuzhenIR = this["ui_buzhenItem" + i];
                uiitem.dataSource = new BuzhenItemVo();
                this.itemRenderAry.push(uiitem);
            }
            this.list_buzhenrole.mouseHandler = new Handler(this, this.onSelect);
            this.list_buzhenrole.renderHandler = new Handler(this, this.onRender);
            this.btn_return.on(Laya.Event.CLICK, this, this.onCommit);
            this.raceList.selectHandler = new Handler(this, this.onRaceSelect);
            this.raceList.selectedIndex = -1;
            this.imgBgSQ.on(Laya.Event.CLICK, this, this.showShenqi);
        }

        close(): void {
            this._type = this.dataSource;
            if (this._type == iface.tb_prop.lineupTypeKey.attack && App.hero.getLineUpTeam(this._type).length <= 0) {
                showToast(LanMgr.getLan("", 10477));
                return;
            }
            super.close();
        }

        public onClosed(): void {
            super.onClosed();
            delete this._tempTeamObj;
            this.list_buzhenrole.array = null;
            this.raceList.selectedIndex = -1;
            this._buzhenRoles.forEach(vo => { vo.offAll() });
            this.guanghuanUI.onExit();
        }

        public popup() {
            super.popup(false, false);
            // 原因： 打远征成功之后的胜利界面点击下一关会弹出布阵界面，因为EffectList的层级问题，这边要比EffectList的层级高
            this.zOrder = UI_DEPATH_VALUE.TOP + 2;
            this.initView();
        }
        private initView(): void {
            this._buzhenGods = [];
            this._tempTeamObj = {};
            this._oldTeamObj = {};
            //布阵类型:1 攻击布阵 2 防守布阵 3 神秘宝藏 4远征
            this._type = this.dataSource;
            this.lab_shiluo.visible = this._type == iface.tb_prop.lineupTypeKey.expedition;
            //初始化布阵item数据
            let tabgameset = tb.TB_game_set.get_TB_game_setById(1);
            for (var j = 0; j < this.itemRenderAry.length; j++) {
                var itemvo: BuzhenItemVo = this.itemRenderAry[j].dataSource;
                //  是否有已上阵英雄 或者是否解锁
                itemvo.openflag = tabgameset.lineup[j] <= App.hero.level;
                itemvo.msg = tabgameset.lineup[j] > App.hero.level ? LanMgr.getLan("",10035,tabgameset.lineup[j]) : "";
                itemvo.data = null;
                itemvo.posDes = j < 2 ? LanMgr.getLan("",10558) : LanMgr.getLan("",10559);
                this.itemRenderAry[j].refreshData(true);
            }
            this.list_buzhenrole.spaceY = this._type == iface.tb_prop.lineupTypeKey.expedition ? 3 : -25;
            let arylist: Array<GodItemVo> = App.hero.getGodAry(-1, this._type);
            if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                arylist = arylist.filter((vo) => {
                    return vo.level >= YuanzhengModel.SHANGZHEN_LEVEL;
                });
            }
            for (var i = 0; i < arylist.length; i++) {
                var element = arylist[i];
                let key = -1;
                if (this._type == iface.tb_prop.lineupTypeKey.attack) {
                    if (!element.isAttackFight) {
                        break;
                    }
                    key = element.local[0];
                } else if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                    if (!element.isYuanzhengFight) {
                        break;
                    }
                    if (YuanzhengModel.getInstance().getGodHp(element.uuid) > 0) {
                        key = element.local[2];
                    }
                }
                if (key != -1) {
                    this._tempTeamObj[element.uuid] = key;
                    this.itemRenderAry[key].dataSource.data = element;
                    this.itemRenderAry[key].refreshData();
                }
            }
            //没有数组，浅拷贝一下
            for (let key in this._tempTeamObj) {
                this._oldTeamObj[key] = this._tempTeamObj[key];
            }
            this.setBoxData();

            if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                //援助阵容
                let myHireList = YuanzhengModel.getInstance().getMyHireList();
                // let myHireList = [arylist[0],arylist[1]];
                this._buzhenGods = myHireList.map((vo: GodItemVo) => {
                    // vo.isAid = true;
                    let buzhenVo = new BuzhenListItemVo(vo, this._type);
                    buzhenVo.showBlood = true;
                    buzhenVo.hp = YuanzhengModel.getInstance().getGodHp(vo.uuid);
                    buzhenVo.totalHp = Math.ceil(vo.getPropertyValue(1));
                    buzhenVo.canGray = true;
                    return buzhenVo;
                });
            }

            //我自己符合需求的阵容
            this._buzhenGods = this._buzhenGods.concat(
                arylist.map((vo: GodItemVo) => {
                    let buzhenVo = new BuzhenListItemVo(vo, this._type);
                    if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                        buzhenVo.showBlood = true;
                        buzhenVo.hp = YuanzhengModel.getInstance().getGodHp(vo.uuid);
                        buzhenVo.totalHp = Math.ceil(vo.getPropertyValue(1));
                        buzhenVo.canGray = true;
                    }
                    return buzhenVo;
                }));

            this.raceList.array = [0, 1, 2, 3, 4, 5];
            this.raceList.selectedIndex = 0;
            this.updateShenqi();
        }

        /** 种族选择 */
        private onRaceSelect(index: number): void {
            if (index == -1) return;
            let ary = index == 0 ? this._buzhenGods : this._buzhenGods.filter((vo) => {
                return vo && vo.godVo && vo.godVo.getRaceType() == index;
            });
            this.list_buzhenrole.array = ary;
        }

        private _curIdx: number;
        private onSelect(e: Laya.Event, index: number) {
            if (e.type == Laya.Event.CLICK) {
                logdebug("当前选择", index);
                this._curIdx = index;
                let data: BuzhenListItemVo = this.list_buzhenrole.array[index];
                if (!data || !data.godVo) return;
                let godVo = data.godVo;
                if (this._tempTeamObj.hasOwnProperty(godVo.uuid)) {
                    if (this._buzhenRoles[this._tempTeamObj[godVo.uuid]]) {
                        this._buzhenRoles[this._tempTeamObj[godVo.uuid]].dataSource = null;
                        this._buzhenRoles[this._tempTeamObj[godVo.uuid]].visible = false;
                    }
                    this.delRole(godVo);
                } else {
                    let validflag: boolean = this.validationRole(godVo);
                    if (!validflag) {
                        return;
                    }
                    if (this._type == iface.tb_prop.lineupTypeKey.expedition) {
                        if (godVo.level < YuanzhengModel.SHANGZHEN_LEVEL) {
                            showToast(LanMgr.getLan("", 10113));
                            return;
                        }
                        if (YuanzhengModel.getInstance().getGodHp(godVo.uuid) <= 0) {
                            showToast(LanMgr.getLan("", 10112));
                            return;
                        }
                    }
                    let flag: boolean = this.insertRole(godVo);
                    if (!flag) {
                        showToast(LanMgr.getLan("",10478));
                        return;
                    }
                }
                this.list_buzhenrole.refresh();
                this.changeGodData();
                dispatchEvt(new GodEvent(GodEvent.BUZHEN_SELECT_ROLE));
            }
        }

        private validationRole(data: GodItemVo): boolean {
            let newtempId: any = data.templateId;
            //判重先
            for (var k = 0; k < this.itemRenderAry.length; k++) {
                let kkvo: BuzhenItemVo = this.itemRenderAry[k].dataSource;
                if (!kkvo.openflag || !kkvo.data) {
                    continue;
                }
                let lasttempId: any = kkvo.data.templateId;
                let godtab: tb.TB_god = tb.TB_god.get_TB_godById(lasttempId);
                if (lasttempId == newtempId) {
                    showToast(LanMgr.getLan("", 10353));
                    return false;
                }

                if (kkvo.data.isAid && data.isAid) {
                    showToast(LanMgr.getLan("", 10479));
                    return false;
                }
            }
            return true;
        }

        private insertRole(data: GodItemVo): boolean {
            for (var i = 0; i < this.itemRenderAry.length; i++) {
                var vo: BuzhenItemVo = this.itemRenderAry[i].dataSource;
                if (vo.openflag && !vo.data) {
                    vo.data = data;
                    this._tempTeamObj[data.uuid] = String(i);
                    this._buzhenRoles[i].dataSource = data;
                    this.itemRenderAry[i].refreshData();
                    this._buzhenRoles[i].visible = true;

                    return true;
                }
            }
            return false;
        }

        private delRole(data: GodItemVo) {
            let idx: number = Number(this._tempTeamObj[data.uuid]);
            var vo: BuzhenItemVo = this.itemRenderAry[idx].dataSource;
            vo.data = null;
            delete this._tempTeamObj[data.uuid];
            this.itemRenderAry[idx].refreshData(true);
        }

        private _rolenum: number = 0;
        private getlist(): Array<string> {
            this._rolenum = 0;
            let ary: Array<string> = new Array
            for (var i = 0; i < this.itemRenderAry.length; i++) {
                var element: BuzhenItemVo = this.itemRenderAry[i].dataSource;
                if (element.openflag) {
                    let uuid: string = null;
                    if (element.data) {
                        uuid = element.data.uuid;
                        this._rolenum++;
                        if (element.data.isAid) {
                            //记录下援助的使用情况
                            YuanzhengModel.getInstance().setAidTag(element.data);
                        }
                    }
                    ary.push(uuid);

                }
            }
            return ary;
        }

        public onCommit(e) {
            let listary: Array<string> = this.getlist();
            if (this._rolenum <= 0) {
                showToast(LanMgr.getLan("", 10477));
                return;
            }
            var args = {};
            args[Protocol.game_common_ajustLineup.args.type] = this._type;
            args[Protocol.game_common_ajustLineup.args.godIds] = listary;
            PLC.request(Protocol.game_common_ajustLineup, args, ($data: any) => {
                if (!$data) {
                    showToast(LanMgr.getLan("", 10352));
                    return;
                }
                if (this._type != iface.tb_prop.lineupTypeKey.expedition) {
                    //判断阵容是否改变
                    let tempObj = this._tempTeamObj ? this._tempTeamObj : {};
                    let isChange = false;
                    let curLength = Object.getOwnPropertyNames(tempObj).length;
                    let oldLength = Object.getOwnPropertyNames(this._oldTeamObj).length;
                    for (let key in (curLength > oldLength ? tempObj : this._oldTeamObj)) {
                        if (tempObj[key] != this._oldTeamObj[key]) isChange = true;
                    }
                    if (isChange) {
                        showToast(LanMgr.getLan("",10480));
                    }
                } else {
                    // 远征
                    if (UIMgr.hasStage(UIConst.FightVictory)) {
                        let view = UIMgr.getUIByName(UIConst.FightVictory) as game.VictoryView;
                        view.again = true;
                        UIMgr.hideUIByName(UIConst.FightVictory);
                        // Laya.timer.frameOnce(5,this,()=>{
                        dispatchEvt(new YuanzhengEvent(YuanzhengEvent.GUANQIA_CHALLENGE));
                        // });
                    } else {
                        dispatchEvt(new YuanzhengEvent(YuanzhengEvent.GUANQIA_CHALLENGE));
                    }
                }
                dispatchEvt(new GodEvent(GodEvent.BUZHEN_COMPLETE), this._type);
                dispatchEvt(new GodEvent(GodEvent.BUZHEN_COMPLETE_ALL), this._type);
                this.close();
            });

        }

        public setBoxData(): void {
            this._buzhenRoles.forEach((headBox, index) => {
                let data = this.itemRenderAry[index].dataSource.data;
                headBox.visible = data ? true : false;
                let pos = this._uipos[index];
                headBox.dataSource = data;
                headBox.pos(pos.x, pos.y);
                if (!headBox.hasListener(Laya.Event.MOUSE_UP))
                    headBox.on(Laya.Event.MOUSE_UP, this, this.onItemClick);
                if (!headBox.hasListener(Laya.Event.MOUSE_DOWN))
                    headBox.on(Laya.Event.MOUSE_DOWN, this, this.onItemClick);
            });
            this.changeGodData();
        }

        private onRender(itemRender: BuzhenGodIR, index: number) {
            if (index > this.list_buzhenrole.array.length)
                return;
            let data: BuzhenListItemVo = this.list_buzhenrole.array[index];
            if (data && data.godVo) {
                let godVo = data.godVo;
                itemRender.redPoint.onDispose();
                itemRender.redPoint.setRedPointName(`god_buzhen_${godVo.uuid}`);
                itemRender.chk_select.visible = this._tempTeamObj.hasOwnProperty(godVo.uuid);
            } else {
                itemRender.redPoint.onDispose();
            }
        }

        private showPanel(): void {
            let obj = {};
            this._buzhenRoles.forEach((itemIR) => {
                let info = itemIR.getDataSource() as GodItemVo;
                if (info) {
                    let race = info.getRaceType();
                    obj[race] = obj[race] || 0;
                    obj[race] += 1;
                }
            });
            dispatchEvt(new GodEvent(GodEvent.SHOW_KEZHI_VIEW),obj);
        }


        private onItemClick(e: Laya.Event) {
            let headBox: common.HeadBox = <common.HeadBox>e.currentTarget;
            if (e.type == Laya.Event.MOUSE_DOWN) {
                this.setChildIndex(headBox, this._childs.length - 1);
                let pos = this.localToGlobal(new Laya.Point(0, 0));
                let width = Laya.stage.width - headBox.width * 0.5;
                let height = Laya.stage.height - headBox.height * 0.3;
                headBox.startDrag(new Laya.Rectangle(-pos.x, -pos.y, width, height));
            } else if (e.type == Laya.Event.MOUSE_UP) {
                e.currentTarget.stopDrag()
                let boxIndex = Number(headBox.name.replace(/[^0-9]/ig, ""));
                let startPos = this._uipos[boxIndex];
                let bx = headBox.x;
                let by = headBox.y;
                if (bx == startPos.x && by == startPos.y) {/**坐标没变，判断为点击事件 */
                    let render: godBuzhenIR = this.itemRenderAry[boxIndex];
                    let itemdata: BuzhenItemVo = render.dataSource;
                    if (!itemdata.openflag) {
                        showToast(itemdata.msg);
                    } else {
                        if (itemdata.data) {
                            this.delRole(itemdata.data);
                            this.list_buzhenrole.refresh();
                            this._buzhenRoles[boxIndex].dataSource = null;
                            this._buzhenRoles[boxIndex].visible = false;
                            this.changeGodData();
                        }
                    }
                    return;
                }

                let targetIndex = this.itemRenderAry.findIndex((itemIR) => {
                    for (let i = 0; i <= 30;) {
                        let theX = bx + i;
                        let theY = by + i;
                        if ((theX >= itemIR.x && theX <= itemIR.x + itemIR.width) && (theY >= itemIR.y && theY <= itemIR.y + itemIR.height)) {
                            return true;
                        }
                        i += 5;
                    }
                    return false;
                    // return (bx >= itemIR.x && bx <= itemIR.x + itemIR.width) && (by >= itemIR.y && by <= itemIR.y + itemIR.height);
                });
                if (targetIndex != -1 && targetIndex != boxIndex) {/**落在其他盒子里 */
                    let godVo = new GodItemVo(this.itemRenderAry[boxIndex].dataSource.data)
                    godVo = this.itemRenderAry[boxIndex].dataSource.data;
                    let targetItem = this.itemRenderAry[targetIndex].dataSource;
                    if (targetItem.data && targetItem.openflag) {/**存在英雄，互调位置 */
                        this.setItemData(boxIndex, this.itemRenderAry[targetIndex].dataSource.data);
                        this.setItemData(targetIndex, godVo);
                    } else {/**不存在英雄 */
                        if (!targetItem.openflag) {
                            showToast(targetItem.msg);
                        } else {
                            this.delRole(this.itemRenderAry[boxIndex].dataSource.data);
                            this.setItemData(targetIndex, godVo);
                        }
                    }
                }
                // 下阵
                if ((bx >= this.list_buzhenrole.x && bx <= this.list_buzhenrole.x + this.list_buzhenrole.width) && (by >= this.list_buzhenrole.y && by <= this.list_buzhenrole.y + this.list_buzhenrole.height)) {
                    this.delRole(this.itemRenderAry[boxIndex].dataSource.data);
                    this.list_buzhenrole.refresh();
                }
                this.setBoxData();
            }
        }

        /**改变英雄位置 */
        setItemData(index: number, data: GodItemVo): void {
            this.itemRenderAry[index].dataSource.data = data;
            this.itemRenderAry[index].refreshData();
            this._tempTeamObj[data.uuid] = index;
        }

        /** 是否已经布置上阵了 */
        public isExistLineupById(godId: number): boolean {
            let flag: boolean = false;
            for (let item of this.itemRenderAry) {
                if (item.dataSource && item.dataSource.data) {
                    let godVo: GodItemVo = item.dataSource.data;
                    if (godVo.templateId == godId) {
                        return true;
                    }
                }
            }
            return false;
        }
        /** 是否已经布置上阵了 */
        public isExistLineupByIdx(index: number): boolean {
            let item = this.itemRenderAry[index];
            return item.dataSource && item.dataSource.data;
        }

        /** 布阵变化 */
        private changeGodData(): void {
            let posAry = [];
            let shenli: number = 0;
            this._buzhenRoles.forEach((itemIR) => {
                let info = itemIR.getDataSource() as GodItemVo;
                if (info) {
                    shenli += info.isAid ? info.fightPower : info.getShenli();
                    posAry.push(info.tab_god.race_type);
                } else {
                    posAry.push(-1);
                }
            });
            this.guanghuanUI.initView(0, posAry);
            this.lbShenli.text = shenli + "";
        }
        /** 更新神器显示 */
        public updateShenqi(): void {
            let shenqiId = App.hero.getArtifactIDByLineType();
            this.imgShenqi.visible = shenqiId > 0;
            this.imgAddSQ.visible = shenqiId <= 0;
            if (shenqiId > 0) {
                let tbShenqi = tb.TB_artifact.get_TB_artifactById(shenqiId);
                this.imgShenqi.skin = SkinUtil.getArtifCircleIcon(tbShenqi.icon);
            }
        }

        private showShenqi(): void {
            dispatchEvt(new ArtifactEvent(ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL));
        }
    }

}