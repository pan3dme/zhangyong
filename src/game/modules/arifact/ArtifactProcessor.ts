/**
* name 
*/
module game {
    export class ArtifactProcessor extends tl3d.Processor {
        constructor() {
            super();
        }

        public getName(): string {
            return "ArtifactProcessor";
        }

        protected listenModuleEvents(): Array<tl3d.BaseEvent> {
            return [
                new ArtifactEvent(ArtifactEvent.SHOW_ARTIFACT_PANEL),
                new ArtifactEvent(ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL),
                new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION),
            ];
        }

        //处理事件
        protected receivedModuleEvent($event: tl3d.BaseEvent): void {
            if ($event instanceof ArtifactEvent) {
                switch ($event.type) {
                    case ArtifactEvent.SHOW_ARTIFACT_PANEL:
                        this.showArtifactPanel($event.data);
                        break;
                    case ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL:
                        this.showArtifactListView();
                        break;
                    case ArtifactEvent.ARTIFACT_OPERATION:
                        this.artifactOpertion($event.data);
                        break;
                }
            }
        }

        private showArtifactPanel(param:number[]): void {
            let id:number = param && param.length > 1 ? param[1] : 0;
            let index:number = param && param.length > 0 ? param[0] : 0;
            if (!UIMgr.hasStage(UIConst.ArtifactView)) {
                UIMgr.showUI(UIConst.ArtifactView, {"id":id, "index": index});
            }else{
                if (id > 0) this.artifactView.selectShenQiById(id);
                this.artifactView.tab.selectedIndex = index ? index : 0;
            }
        }

        private showArtifactListView():void {
            UIMgr.showUI(UIConst.ArtifactListView);
        }

        private artifactOpertion(data): void {
            switch (data[1]) {
                case Artifact.RECYCLE:/**重铸 */
                    this.onProtocolRecycle(data[0]);
                    break;
                case Artifact.ENCHANT:/**附魔 */
                    this.onProtocolEnchant(data[0]);
                    break;
                case Artifact.PBAPTIZE:/**洗练 */
                    this.onProtocolBaptize(data[0]);
                    break;
                case Artifact.GBAPTIZE:/**洗练 */
                    this.onProtocolBaptize(data[0]);
                    break;
                case Artifact.STRENGTH:/**强化 */
                    this.onProtocolStrength(data[0]);
                    break;
                case Artifact.ACTIVATE:/**解锁 */
                    this.onProtocolActivate(data[0]);
                    break;
                case Artifact.CHANGE:/**洗练更换 */
                    this.onProtocolChange(data[0]);
                    break;
                case Artifact.SKILLUPGRADE:/**技能升级 */
                    this.onProtocolSkillUpGrade(data[0]);
                    break;
                case Artifact.WEAR_OR_TAKEOFF:/**穿戴/卸下 */
                    this.onProtocolWearOrTakeoff(data[0]);
                    break;
            }
        }

        /**神器解锁 */
        private onProtocolActivate(id: number): void {
            let args = {};
            args[Protocol.game_artifact_artifactActivate.args.id] = id;
            PLC.request(Protocol.game_artifact_artifactActivate, args, ($data: any, $msg: any) => {
                if (!$data) return;
                let obj = {"id": id};
                App.hero.artifactInfo[id] = obj;
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_ACTIVE), [id]);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS));
                
                let temp:tb.TB_artifact = tb.TB_artifact.get_TB_artifactById(id);
                UIMgr.showUI(UIConst.Artifact_UnLockView, temp);
            })
        }

        /**神器强化 */
        private onProtocolStrength(id: number): void {
            let args = {};
            args[Protocol.game_artifact_artifactStrength.args.id] = id;
            PLC.request(Protocol.game_artifact_artifactStrength, args, ($data: any, $msg: any) => {
                if (!$data) return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.STRENGTH);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_STRENGTH_SUCCESS));
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            })
        }

        /**神器附魔 */
        private onProtocolEnchant(id: number): void {
            let args = {};
            args[Protocol.game_artifact_artifactStrength.args.id] = id;
            PLC.request(Protocol.game_artifact_enchant, args, ($data: any, $msg: any) => {
                if (!$data) return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.ENCHANT);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            })
        }

        /**神器洗练 */
        private onProtocolBaptize(data: Object): void {
            let args = {};
            if (data.hasOwnProperty('hint'))
                ArtifactModel.getInstance().hint = data['hint'];
            args[Protocol.game_artifact_baptize.args.id] = data['id'];
            args[Protocol.game_artifact_baptize.args.type] = data['type'];
            args[Protocol.game_artifact_baptize.args.lockFlag] = data['lockFlag'];
            PLC.request(Protocol.game_artifact_baptize, args, ($data: any, $msg: any) => {
                if (!$data) return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.PBAPTIZE);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            })
        }

        /**洗练更换 */
        private onProtocolChange(id: number): void {
            let args = {};
            args[Protocol.game_artifact_baptizeSave.args.id] = id;
            PLC.request(Protocol.game_artifact_baptizeSave, args, ($data: any, $msg: any) => {
                if (!$data) return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.PBAPTIZE);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            })
        }

        /**技能升级 */
        private onProtocolSkillUpGrade(id: number): void {
            let args = {};
            args[Protocol.game_artifact_artifactSkillUpgrade.args.id] = id;
            PLC.request(Protocol.game_artifact_artifactSkillUpgrade, args, ($data: any, $msg: any) => {
                if (!$data) return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.SKILLUPGRADE);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            })
        }

        /**重铸 */
        private onProtocolRecycle(id: number): void {
            // let args = {};
            // args[Protocol.game_artifact_artifactRecycle.args.id] = id;
            // PLC.request(Protocol.game_artifact_artifactRecycle, args, ($data: any, $msg: any) => {
            //     if (!$data) return;
            //     UIUtil.showRewardView($data.commonData);
            //     if (this.artifactView) this.artifactView.updateView();
            //     dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            // })
        }

        /**穿戴/卸下 */
        private onProtocolWearOrTakeoff(data: any): void {
            let args = {};
            args[Protocol.game_artifact_ajustLineupArtifact.args.id] = data.id;
            args[Protocol.game_artifact_ajustLineupArtifact.args.type] = data.type;
            PLC.request(Protocol.game_artifact_ajustLineupArtifact, args, ($data: any, $msg: any) => {
                if (!$data) return;
                for (var key in $data.lineupArtifactInfo){
                    App.hero.lineupArtifactInfo[key] = $data.lineupArtifactInfo[key];
                }
                /**刷新一下神器List */
                // if (this.artifactView) this.artifactView.refreshList();
                if(UIMgr.hasStage(UIConst.BuzhenView)) {
                    let view = UIMgr.getUIByName(UIConst.BuzhenView) as BuzhenView;
                    view.updateShenqi();
                }
                UIMgr.hideUIByName(UIConst.ArtifactListView);
                dispatchEvt(new ArtifactEvent(ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS));
                dispatchEvt(new GodEvent(GodEvent.BUZHEN_COMPLETE));
            })
        }

        public get artifactView(): ArtifactView {
            return UIMgr.hasStage(UIConst.ArtifactView) ? UIMgr.getUIByName(UIConst.ArtifactView) : null;
        }

    }
}