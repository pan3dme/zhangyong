

module game {

    export class WorldBossView extends ui.boss.WorldBossUI {

        private uiScene: Base2dSceneLayer;
        private _curBossVo: BossInfoVo;
        constructor() {
            super();
            this.group = UIConst.hud_group;
        }

        createChildren(): void {
            super.createChildren();
            this.uiScene = new Base2dSceneLayer();
            this.boxRole.addChild(this.uiScene);
            this.uiScene.setModelBox(this, this.lbName, this.roleBottom);
            this.bossList.array = null;
            this.itemList.array = null;
            this.bossList.selectedIndex = -1;
            this.bossList.selectHandler = new Handler(this, this.onSelect);
            this.bossList.renderHandler = new Handler(this, this.onBossRender);
            this.lbCount.autoSize = true;
            this.btnChallege.on(Laya.Event.CLICK, this, this.onChallenge);
            this.btnAdd.on(Laya.Event.CLICK, this, this.onAdd);
            this.lbPeople.on(Laya.Event.CLICK, this, this.onRank);
            this.btnPrev.on(Laya.Event.CLICK, this, this.onPrev);
            this.btnNext.on(Laya.Event.CLICK, this, this.onNext);
            this.btn_rotateleft.on(Laya.Event.CLICK, this, this.rotateModel, [1]);
            this.btn_rotateright.on(Laya.Event.CLICK, this, this.rotateModel, [2]);
            this.imgBg.skin = SkinUtil.getSysMapSkin(ModuleConst.WORLD_BOSS);
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
            super.show(closeOther, showEffect);
            this.initView();
        }

        public popup(closeOther?: boolean, showEffect?: boolean): void {
            super.popup();
            this.initView();
        }
        public close(type?: string, showEffect?: boolean, sound = true): void {
            super.close(type, showEffect, sound);
        }
        public onClosed(): void {
            super.onClosed();
            this.uiScene.onExit();
            this._curBossVo = null;
            this.bossList.array = null;
            this.bossList.selectedIndex = -1;
            this.itemList.array = null;
            Laya.timer.clearAll(this);
            BossModel.getInstance().stopInterval();
            Laya.timer.clear(this, this.updateCount);
            tl3d.ModuleEventManager.removeEvent(BossEvent.UPDATE_BOSS_INFO, this.refreshView, this);
            UIMgr.hideUIByName(UIConst.SysTopView);
        }
        /** 初始化界面 */
        private initView(): void {
            let funList: BtnFuncVo[] = [
                { btnSkin: SkinUtil.btn_rule, callback: this.onRule.bind(this) },
                { btnSkin: SkinUtil.btn_jiangli, callback: this.onJiangli.bind(this) },
            ];
            let resAry = [iface.tb_prop.resTypeKey.gold, iface.tb_prop.resTypeKey.diamond];
            UIUtil.showSysTopView({ viewName: this.dialogInfo.uiname, resAry, funList, closeCallback: this.onFanhui.bind(this) });

            this.uiScene.onShow();
            tl3d.ModuleEventManager.addEvent(BossEvent.UPDATE_BOSS_INFO, this.refreshView, this);
            Laya.timer.loop(1000, this, this.updateCount);
            this.updateCount();
            let model = BossModel.getInstance();
            model.startInterval();
            let bossList = model.getBossList();
            this.bossList.array = bossList;
            let bossId = this.dataSource;
            let index = -1;
            // 是否有传入bossID, 且开启未死亡的
            if (bossId && !isNaN(bossId)) {
                index = bossList.findIndex((vo) => {
                    return vo.tbBoss.ID == bossId && vo.isOpen() && !vo.isDead();
                });
            }
            if(index == -1){
                for(let i = bossList.length - 1; i >= 0 ; i--){
                    let boosVo = bossList[i];
                    if(boosVo.isOpen() && !boosVo.isDead()){
                        index = i;
                        break;
                    }
                }
            }
            index = index != -1 ? index : 0;
            this.bossList.selectedIndex = index;
            Laya.timer.callLater(this, () => {
                let toIndex = index >= 2 ? index - 2 : 0;
                this.bossList.scrollTo(toIndex);
            });
        }

        private onSelect(index: number): void {
            if (index == -1) return;
            this._curBossVo = this.bossList.selectedItem;
            if (!this._curBossVo) return;
            let info = this._curBossVo;
            this.lbName.text = info.tbMonster.name + LanMgr.getLan('', 10157, info.tbBoss.boss_level.toString());
            let list = info.tbBoss.getRewardList();
            this.itemList.array = list
            this.itemList.width = list.length * 100 + (list.length - 1) * this.itemList.spaceX;
            Laya.timer.once(300, this, this.delayShow, [info.tbMonster.model]);
            this.updateBossInfo();
        }

        private updateBossInfo(): void {
            if (!this._curBossVo) return;
            let info = this._curBossVo;
            this.lbBlood.text = Math.ceil(info.getBossHp() / info.getBossTotalHp() * 100) + "%";
            this.pbBlood.value = info.getBossHp() / info.getBossTotalHp();
            this.btnChallege.gray = !info.isOpen();
            this.btnChallege.label = info.isDead() ? LanMgr.getLan("",12502) : info.isOpen() ? LanMgr.getLan("",10021) : LanMgr.getLan('', 10157, info.tbBoss.level);
            this.lbPeople.text = LanMgr.getLan("",12503,info.svo.bossRankNum);
        }

        /** 更新界面 */
        private refreshView(): void {
            this.updateBossInfo();
            this.bossList.refresh();
            for (let box of this.bossList.cells) {
                (box as BossIR).updateBlood();
            }
        }

        /** 更新数量 */
        public updateCount(): void {
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            let maxCnt = tb.TB_boss_set.getSet().max_time;
            if (count >= maxCnt) {
                this.lbCount.text = LanMgr.getLan('', 10081, count);
            } else {
                let replyTime = tb.TB_boss_set.getSet().reply_time;
                let time = replyTime - (App.serverTimeSecond - App.hero.worldBossReplyTime);
                this.lbCount.text = LanMgr.getLan('', 10142, count) + LanMgr.getLan("",12504,GameUtil.toCountdown(time, "mm:ss"));
            }
            this.btnAdd.x = this.lbCount.x + this.lbCount.width + 30;
            for (let box of this.bossList.cells) {
                (box as BossIR).updateBtn();
            }
        }

        private onBossRender(itemir: BossIR, index: number): void {
            if (!itemir) return;
            if (index == this.bossList.selectedIndex) {
                itemir.ani1.play(0, true);
            } else {
                itemir.ani1.gotoAndStop(0);
            }
        }

        /** 挑战 */
        private onChallenge(): void {
            let item = this.bossList.selectedItem;
            if (item && item instanceof BossInfoVo) {
                dispatchEvt(new BossEvent(BossEvent.CHALLENGE_BOSS, item));
            }
        }

        private onRule(): void {
            dispatchEvt(new BossEvent(BossEvent.SHOW_RULE_VIEW));
        }

        private onAdd(): void {
            dispatchEvt(new BossEvent(BossEvent.SHOW_BUY_VIEW));
        }

        private onJiangli(): void {
            let item = this.bossList.selectedItem;
            if (item && item instanceof BossInfoVo) {
                dispatchEvt(new BossEvent(BossEvent.SHOW_REWARD_VIEW, item));
            }
        }

        private onRank(): void {
            let item = this.bossList.selectedItem;
            if (item && item instanceof BossInfoVo) {
                dispatchEvt(new BossEvent(BossEvent.SHOW_RANK_VIEW, item));
            }
        }

        private onNext(): void {
            this.bossList.scrollTo(this.bossList.selectedIndex + 3);
        }

        private onPrev(): void {
            this.bossList.scrollTo(this.bossList.selectedIndex - 3);
        }

        private onFanhui(): void {
            dispatchEvt(new HudEvent(HudEvent.SHOW_ENTRANCE_VIEW, tb.TB_function.TYPE_MAOXIAN));
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(modeid: any): void {
            let point = this.boxRole.localToGlobal(new Laya.Point(0, 0));
            this.uiScene.addModelChar(modeid, point.x + this.boxRole.width / 2 - Launch.offsetX, point.y - Launch.offsetY, 180, 0.8);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
        }

        //向右 2 向左 1
        private rotateModel(dir: number) {
            this.uiScene.sceneChar.rotationY = dir == 1 ? this.uiScene.sceneChar.rotationY - 15 : this.uiScene.sceneChar.rotationY + 15;
        }
    }
}