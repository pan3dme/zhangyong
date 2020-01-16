


module game {
    export class BossProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "BossProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new BossEvent(BossEvent.SHOW_BOSS_VIEW),
                new BossEvent(BossEvent.SHOW_RANK_VIEW),
                new BossEvent(BossEvent.SHOW_REWARD_VIEW),
                new BossEvent(BossEvent.SHOW_RULE_VIEW),
                new BossEvent(BossEvent.SHOW_BUY_VIEW),
                new BossEvent(BossEvent.CHALLENGE_BOSS),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof BossEvent) {
                switch ($event.type) {
                    case BossEvent.SHOW_BOSS_VIEW:
                        this.showBossView($event.data);
                        break;
                    case BossEvent.SHOW_RANK_VIEW:
                        this.showRankView($event.data);
                        break;
                    case BossEvent.SHOW_REWARD_VIEW:
                        this.showRewardView($event.data);
                        break;
                    case BossEvent.SHOW_RULE_VIEW:
                        this.showRuleView();
                        break;
                    case BossEvent.SHOW_BUY_VIEW:
                        this.showBuyView();
                        break;
                    case BossEvent.CHALLENGE_BOSS:
                        this.challengeBoss($event.data);
                        break;
                }
            }

        }

        /** 打开界面 */
        private showBossView(bossId:number): void {
            PLC.request(Protocol.center_boss_getWorldBossInfo, null, ($data) => {
                BossModel.getInstance().updateBossInfo($data);
                UIMgr.showUI(UIConst.WorldBoss_BossView,bossId);
            });
        }

        /** 打开排行界面 */
        private showRankView(info: BossInfoVo): void {
            if (info.svo.bossRankNum <= 0) {
                showToast(LanMgr.getLan('', 10147));
                return;
            }
            UIMgr.showUI(UIConst.WorldBoss_RankView, info);
        }

        private showRewardView(info: BossInfoVo):void {
            if(info){
                UIMgr.showUI(UIConst.WorldBoss_RewardView,info);
            }
        }

        /** 打开规则界面 */
        private showRuleView(): void {
            UIUtil.showCommonTipView(LanMgr.getLanArr(20008));
        }
        /** 展示挑战次数购买界面 */
        private showBuyView(): void {
            if (!UIUtil.checkLimitEnough(iface.tb_prop.limitTypeKey.buyWorldBossNum, iface.tb_prop.vipPrivilegeTypeKey.worldBossNum)) {
                return;
            }
            UIMgr.showUI(UIConst.BuyBattleCount, {
                type: common.BuyBattleCountView.TYPE_BOSS, callback: (num: number) => {
                    let arg = {};
                    arg[Protocol.game_common_buyWorldBossBattleCnt.args.count] = num;
                    PLC.request(Protocol.game_common_buyWorldBossBattleCnt, arg, ($data) => {
                        if (!$data) return;
                        this.newBossView.updateCount();
                    });
                }
            });
        }

        /** 挑战boss */
        private challengeBoss(info: BossInfoVo): void {
            if (UIUtil.checkUnableToEnterFight()) {
                return;
            }
            if (!info.isOpen()) {
                showToast(LanMgr.getLan('', 10035, info.tbBoss.level));
                return;
            }
            let count = App.hero.getOverplusValue(iface.tb_prop.overplusTypeKey.worldBossNum);
            if (count <= 0) {
                let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyWorldBossNum);
                let total = App.hero.baseAddVipNum(iface.tb_prop.vipPrivilegeTypeKey.worldBossNum);
                if (num < total) {
                    this.showBuyView();
                }
                showToast(LanMgr.getLan('', 10084));
                return;
            }
            if (info.isDead()) {
                let delTime = info.svo.bossReviveTime - App.serverTimeSecond;
                showToast(LanMgr.getLan('', 10101, Math.ceil(delTime / 60)));
                return;
            }
            let args = {};
            args[Protocol.center_boss_worldBossBattleStart.args.id] = info.tbBoss.ID;
            PLC.request(Protocol.center_boss_worldBossBattleStart, args, ($data) => {
                if (!$data) return;
                BossModel.getInstance().updateBossInfo($data.WorldBossInfo);
                info.setRankList($data.damageRankInfo);
                if (this.newBossView) {
                    this.newBossView.updateCount();
                }
                this.doFight(info, $data.bossRecords);
            });
        }
        private doFight(vo: BossInfoVo, bossRecords: any[]): void {
            let copyvo = new FightVo();
            copyvo.copyType = CopyType.worldboss;
            copyvo.worldBossInfo = vo;

            var battleScene = new battle.BattleScenePve(copyvo.copyType);
            battleScene.init([copyvo.getOwnTeam()], copyvo.getEnemyTeam(), iface.tb_prop.battleObjTypeKey.monster, copyvo.getAllRound(), copyvo.getTeamHp());
            battleScene.start();
            var isWin = battleScene.winCamp === battle.BatteConsts.BATTLE_CAMPATK;
            logfight("战斗结果：", isWin, "战报：", battleScene.battleReport);
            let page = new ServerPage();
            page.result = isWin ? playState.VICTORY : playState.FAILURE;
            page.initPage(battleScene.battleReport);
            copyvo.fightPageControl = page;


            //弹幕设置
            if (bossRecords && bossRecords instanceof Array) {
                let tempAry: BarrageVo[] = [];
                for (let k = 0; k < bossRecords.length; k++) {
                    let vo = bossRecords[k];
                    let barragevo = new BarrageVo();
                    barragevo.barrageText = LanMgr.getLan("",12500,vo.name,vo.damage);
                    tempAry.push(barragevo);
                }
                copyvo.barrageList = tempAry;
            }


            let damage: number = 0;
            let objs = battleScene.getLossHpObj(battle.BatteConsts.BATTLE_CAMPDEF);
            for (var idx in objs) {
                damage += Number(objs[idx]);
            }
            vo.enemyLossHp = Math.floor(damage);
            loghgy('世界boss：', vo.tbBoss.ID, vo.tbMonster.ID, vo.getBossHp(), vo.getBossTotalHp(), isWin, "伤害：", vo.enemyLossHp);
            let arg = {};
            arg[Protocol.center_boss_worldBossBattleEnd.args.id] = vo.tbBoss.ID;
            arg[Protocol.center_boss_worldBossBattleEnd.args.damage] = vo.enemyLossHp;
            PLC.request(Protocol.center_boss_worldBossBattleEnd, arg, ($data: any) => {
                vo.battleEndData = $data ? $data : {};
                let bossInfo = $data.WorldBossBattleInfo;
                vo.battleEndData['rank'] = bossInfo ? bossInfo.myRank : 0;
                vo.battleEndData['totalDamage'] = bossInfo ? bossInfo.totalDamage : 0;
                let enterVo: EnterFightVo = { vo: copyvo, event: new BossEvent(BossEvent.SHOW_BOSS_VIEW),eventdata:vo.tbBoss.ID };
                dispatchEvt(new FightsEvent(FightsEvent.ENTER_FIGHT_EVENT), enterVo);
            });
        }

        get newBossView(): WorldBossView {
            return UIMgr.getUIByName(UIConst.WorldBoss_BossView);
        }
    }
}