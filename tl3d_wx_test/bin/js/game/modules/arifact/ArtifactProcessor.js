var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var ArtifactProcessor = /** @class */ (function (_super) {
        __extends(ArtifactProcessor, _super);
        function ArtifactProcessor() {
            return _super.call(this) || this;
        }
        ArtifactProcessor.prototype.getName = function () {
            return "ArtifactProcessor";
        };
        ArtifactProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.ArtifactEvent(game.ArtifactEvent.SHOW_ARTIFACT_PANEL),
                new game.ArtifactEvent(game.ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL),
                new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION),
            ];
        };
        //处理事件
        ArtifactProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.ArtifactEvent) {
                switch ($event.type) {
                    case game.ArtifactEvent.SHOW_ARTIFACT_PANEL:
                        this.showArtifactPanel($event.data);
                        break;
                    case game.ArtifactEvent.SHOW_ARTIFACT_LIST_PANEL:
                        this.showArtifactListView();
                        break;
                    case game.ArtifactEvent.ARTIFACT_OPERATION:
                        this.artifactOpertion($event.data);
                        break;
                }
            }
        };
        ArtifactProcessor.prototype.showArtifactPanel = function (param) {
            var id = param && param.length > 1 ? param[1] : 0;
            var index = param && param.length > 0 ? param[0] : 0;
            if (!UIMgr.hasStage(UIConst.ArtifactView)) {
                UIMgr.showUI(UIConst.ArtifactView, { "id": id, "index": index });
            }
            else {
                if (id > 0)
                    this.artifactView.selectShenQiById(id);
                this.artifactView.tab.selectedIndex = index ? index : 0;
            }
        };
        ArtifactProcessor.prototype.showArtifactListView = function () {
            UIMgr.showUI(UIConst.ArtifactListView);
        };
        ArtifactProcessor.prototype.artifactOpertion = function (data) {
            switch (data[1]) {
                case Artifact.RECYCLE: /**重铸 */
                    this.onProtocolRecycle(data[0]);
                    break;
                case Artifact.ENCHANT: /**附魔 */
                    this.onProtocolEnchant(data[0]);
                    break;
                case Artifact.PBAPTIZE: /**洗练 */
                    this.onProtocolBaptize(data[0]);
                    break;
                case Artifact.GBAPTIZE: /**洗练 */
                    this.onProtocolBaptize(data[0]);
                    break;
                case Artifact.STRENGTH: /**强化 */
                    this.onProtocolStrength(data[0]);
                    break;
                case Artifact.ACTIVATE: /**解锁 */
                    this.onProtocolActivate(data[0]);
                    break;
                case Artifact.CHANGE: /**洗练更换 */
                    this.onProtocolChange(data[0]);
                    break;
                case Artifact.SKILLUPGRADE: /**技能升级 */
                    this.onProtocolSkillUpGrade(data[0]);
                    break;
                case Artifact.WEAR_OR_TAKEOFF: /**穿戴/卸下 */
                    this.onProtocolWearOrTakeoff(data[0]);
                    break;
            }
        };
        /**神器解锁 */
        ArtifactProcessor.prototype.onProtocolActivate = function (id) {
            var args = {};
            args[Protocol.game_artifact_artifactActivate.args.id] = id;
            PLC.request(Protocol.game_artifact_artifactActivate, args, function ($data, $msg) {
                if (!$data)
                    return;
                var obj = { "id": id };
                App.hero.artifactInfo[id] = obj;
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_ACTIVE), [id]);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_UNLOCK_SUCCESS));
                var temp = tb.TB_artifact.get_TB_artifactById(id);
                UIMgr.showUI(UIConst.Artifact_UnLockView, temp);
            });
        };
        /**神器强化 */
        ArtifactProcessor.prototype.onProtocolStrength = function (id) {
            var args = {};
            args[Protocol.game_artifact_artifactStrength.args.id] = id;
            PLC.request(Protocol.game_artifact_artifactStrength, args, function ($data, $msg) {
                if (!$data)
                    return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.STRENGTH);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_STRENGTH_SUCCESS));
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            });
        };
        /**神器附魔 */
        ArtifactProcessor.prototype.onProtocolEnchant = function (id) {
            var args = {};
            args[Protocol.game_artifact_artifactStrength.args.id] = id;
            PLC.request(Protocol.game_artifact_enchant, args, function ($data, $msg) {
                if (!$data)
                    return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.ENCHANT);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            });
        };
        /**神器洗练 */
        ArtifactProcessor.prototype.onProtocolBaptize = function (data) {
            var args = {};
            if (data.hasOwnProperty('hint'))
                game.ArtifactModel.getInstance().hint = data['hint'];
            args[Protocol.game_artifact_baptize.args.id] = data['id'];
            args[Protocol.game_artifact_baptize.args.type] = data['type'];
            args[Protocol.game_artifact_baptize.args.lockFlag] = data['lockFlag'];
            PLC.request(Protocol.game_artifact_baptize, args, function ($data, $msg) {
                if (!$data)
                    return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.PBAPTIZE);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            });
        };
        /**洗练更换 */
        ArtifactProcessor.prototype.onProtocolChange = function (id) {
            var args = {};
            args[Protocol.game_artifact_baptizeSave.args.id] = id;
            PLC.request(Protocol.game_artifact_baptizeSave, args, function ($data, $msg) {
                if (!$data)
                    return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.PBAPTIZE);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            });
        };
        /**技能升级 */
        ArtifactProcessor.prototype.onProtocolSkillUpGrade = function (id) {
            var args = {};
            args[Protocol.game_artifact_artifactSkillUpgrade.args.id] = id;
            PLC.request(Protocol.game_artifact_artifactSkillUpgrade, args, function ($data, $msg) {
                if (!$data)
                    return;
                // if (this.artifactView) this.artifactView.updateView(Artifact.SKILLUPGRADE);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            });
        };
        /**重铸 */
        ArtifactProcessor.prototype.onProtocolRecycle = function (id) {
            // let args = {};
            // args[Protocol.game_artifact_artifactRecycle.args.id] = id;
            // PLC.request(Protocol.game_artifact_artifactRecycle, args, ($data: any, $msg: any) => {
            //     if (!$data) return;
            //     UIUtil.showRewardView($data.commonData);
            //     if (this.artifactView) this.artifactView.updateView();
            //     dispatchEvt(new ArtifactEvent(ArtifactEvent.ARTIFACT_OPERATION_SUCCESS));
            // })
        };
        /**穿戴/卸下 */
        ArtifactProcessor.prototype.onProtocolWearOrTakeoff = function (data) {
            var args = {};
            args[Protocol.game_artifact_ajustLineupArtifact.args.id] = data.id;
            args[Protocol.game_artifact_ajustLineupArtifact.args.type] = data.type;
            PLC.request(Protocol.game_artifact_ajustLineupArtifact, args, function ($data, $msg) {
                if (!$data)
                    return;
                for (var key in $data.lineupArtifactInfo) {
                    App.hero.lineupArtifactInfo[key] = $data.lineupArtifactInfo[key];
                }
                /**刷新一下神器List */
                // if (this.artifactView) this.artifactView.refreshList();
                if (UIMgr.hasStage(UIConst.BuzhenView)) {
                    var view = UIMgr.getUIByName(UIConst.BuzhenView);
                    view.updateShenqi();
                }
                UIMgr.hideUIByName(UIConst.ArtifactListView);
                dispatchEvt(new game.ArtifactEvent(game.ArtifactEvent.ADJUST_LINEUP_ARTIFACT_SUCCESS));
                dispatchEvt(new game.GodEvent(game.GodEvent.BUZHEN_COMPLETE));
            });
        };
        Object.defineProperty(ArtifactProcessor.prototype, "artifactView", {
            get: function () {
                return UIMgr.hasStage(UIConst.ArtifactView) ? UIMgr.getUIByName(UIConst.ArtifactView) : null;
            },
            enumerable: true,
            configurable: true
        });
        return ArtifactProcessor;
    }(tl3d.Processor));
    game.ArtifactProcessor = ArtifactProcessor;
})(game || (game = {}));
