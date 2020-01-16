

module game {
    export class GuildSkillProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "GuildSkillProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new GuildEvent(GuildEvent.GUILD_SKILL_LEVELUP),
                new GuildEvent(GuildEvent.GUILD_SKILL_RESET),
            ]
        }

        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof GuildEvent) {
                switch ($event.type) {
                    case GuildEvent.GUILD_SKILL_LEVELUP:
                        this.skillLevelUp($event.data);
                        break;
                    case GuildEvent.GUILD_SKILL_RESET:
                        this.skillReset();
                        break;
                }
            }
        }

        /** 公会技能升级 */
        private skillLevelUp($data: GuildSkillVo): void {
            //判断该技能是否满级
            if ($data.tbSkill.cost == 0) {
                showToast(LanMgr.getLan("", 10423));
                return;
            }
            //判断帮贡是否足够
            if (UIUtil.checkNotEnough(iface.tb_prop.resTypeKey.guildDonate, $data.tbSkill.cost)) {
                return;
            };
            let args = {};
            args[Protocol.game_guild_upgradeSkill.args.id] = `${$data.godType}${$data.attrType}`;
            // 技能升级请求
            PLC.request(Protocol.game_guild_upgradeSkill, args, ($data: any, msg: any) => {
                if (!$data) {
                    showToast(msg);
                    return;
                }
                for (let key in $data.modifyGuildSkillInfo) {
                    App.hero.guildSkillInfo[key] = $data.modifyGuildSkillInfo[key];
                }
                GuildSkillModel.getInstance().updateSkillData();
                // 更新界面
                if (UIMgr.getUIByName(UIConst.GuildSkillView)) {
                    let guildSkillView = UIMgr.getUIByName(UIConst.GuildSkillView) as GuildSkillView;
                    guildSkillView.updateView();
                }
            });
        }

        /** 公会技能重置 */
        private skillReset(): void {
            //判断钻石是否足够
            let costAry = tb.TB_guild_set.getSet().resetskill_cost;
            if (UIUtil.checkNotEnough(costAry[0][0], costAry[0][1])) {
                return;
            }
            let args = {};
            // 发送技能重置请求 
            PLC.request(Protocol.game_guild_resetSkill, args, ($data: any, msg: any) => {
                if (!$data) return;
                App.hero.guildSkillInfo = {};
                GuildSkillModel.getInstance().updateSkillData();
                if (UIMgr.getUIByName(UIConst.GuildSkillView)) {
                    let guildSkillView = UIMgr.getUIByName(UIConst.GuildSkillView) as GuildSkillView;
                    guildSkillView.updateView();
                }
            });
        }

    }
}