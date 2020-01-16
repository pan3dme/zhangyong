/**
* name
*/
var game;
(function (game) {
    var ArenaBattleType;
    (function (ArenaBattleType) {
        ArenaBattleType[ArenaBattleType["SWEEP"] = 0] = "SWEEP";
        ArenaBattleType[ArenaBattleType["BATTLE"] = 1] = "BATTLE";
    })(ArenaBattleType = game.ArenaBattleType || (game.ArenaBattleType = {}));
    var ArenaModel = /** @class */ (function () {
        function ArenaModel() {
            this._total = 0;
            this._curIdx = 0;
            this._hasNewRecord = false;
        }
        ArenaModel.getInstance = function () {
            if (!ArenaModel._instance) {
                ArenaModel._instance = new ArenaModel();
            }
            return ArenaModel._instance;
        };
        /**挑战玩家列表排名字体大小 */
        ArenaModel.getClgRankLbSize = function (rank) {
            if (rank > 0 && rank < 100) {
                return 45;
            }
            else if (rank >= 100 && rank < 1000) {
                return 35;
            }
            else {
                return 30;
            }
        };
        /**排行榜结算奖励排名字体大小 */
        ArenaModel.getRewardRankLbSize = function (len) {
            switch (len) {
                case 5:
                    return 45;
                case 6:
                    return 38;
                case 7:
                    return 32;
                case 8:
                    return 28;
                case 9:
                    return 25;
                default:
                    return 50;
            }
        };
        /**
          * 加载多个角色
          * @param roleurls
          */
        ArenaModel.prototype.loads = function (baseScene, roleurls) {
            this._baseScene = baseScene;
            this._infolist = roleurls;
            this._total = roleurls ? roleurls.length : 0;
            this._curIdx = 0;
            this.queueOpt();
        };
        ArenaModel.prototype.queueOpt = function () {
            Laya.timer.frameOnce(2, this, this.Load.bind(this));
        };
        ArenaModel.prototype.Load = function () {
            if (this._curIdx > this._infolist.length - 1) {
                this._curIdx = 0;
                return; //加载完了
            }
            this.loadRole();
        };
        /**
          * 加载角色
          */
        ArenaModel.prototype.loadRole = function () {
            this._curLoadVo = this._infolist[this._curIdx];
            if (!this._curLoadVo || !this._curLoadVo.maxForceGodModel) {
                this.onRoleLoaded(null);
                return;
            }
            var url = getRoleUrl(this._curLoadVo.maxForceGodModel.toString());
            tl3d.MeshDataManager.getInstance().getMeshData(url, this.onRoleLoaded.bind(this));
        };
        /**
         * 角色加载完毕
         * @param skinMesh
         */
        ArenaModel.prototype.onRoleLoaded = function ($skinMesh) {
            if ($skinMesh) {
                if (!this._sceneRoleMap) {
                    this._sceneRoleMap = new Map;
                }
                if (this._sceneRoleMap.has(this._curIdx)) {
                    var vo = this._sceneRoleMap.get(this._curIdx);
                    // if (vo.maxForceGodModel != this._curLoadVo.maxForceGodModel) {
                    // 	if (vo.char)
                    // 		vo.char.removeSelf();
                    // }
                    if (vo.char) {
                        vo.char.setRoleUrl(getRoleUrl(String(this._curLoadVo.maxForceGodModel)));
                    }
                    else {
                        vo.char = this.CreateRoleView();
                    }
                }
                else {
                    this._curLoadVo.char = this.CreateRoleView();
                    this._sceneRoleMap.set(this._curIdx, this._curLoadVo);
                }
            }
            this._curIdx++;
            this.queueOpt();
        };
        ArenaModel.prototype.CreateRoleView = function () {
            var x = !(this._curIdx % 2 != 0 && this._curIdx != 0) ? 150 : 550;
            return this.addModelChar(this._curLoadVo.maxForceGodModel.toString(), x, this._curIdx * 173 + Launch.offsetY);
        };
        /** 添加ui角色 */
        ArenaModel.prototype.addModelChar = function (mid, postionx, postiony, rotate, scale) {
            if (rotate === void 0) { rotate = 180; }
            if (scale === void 0) { scale = 1.4; }
            if (!this._baseScene) {
                return;
            }
            var sceneChar = new GameUIChar();
            this._baseScene.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl(mid));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.set2dPos(postionx, postiony); //坐标
            sceneChar.scale = scale;
            return sceneChar;
        };
        ArenaModel.prototype.clearAllChar = function () {
            this._baseScene = null;
            this._infolist = [];
            if (!this._sceneRoleMap)
                return;
            this._sceneRoleMap.forEach(function (element, index, array) {
                if (element.char) {
                    element.char.removeSelf();
                    element.char = null;
                }
            });
            this._sceneRoleMap.clear();
        };
        ArenaModel.prototype.setNewRecordFlag = function (newRecord) {
            this._hasNewRecord = newRecord;
            dispatchEvt(new game.ArenaEvent(game.ArenaEvent.UPDATE_ZHANDOU_JILU_DATA));
        };
        ArenaModel.prototype.isHasNewRecord = function () {
            return this._hasNewRecord;
        };
        return ArenaModel;
    }());
    game.ArenaModel = ArenaModel;
})(game || (game = {}));
