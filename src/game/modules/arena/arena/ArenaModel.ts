/**
* name 
*/
module game {

	export enum ArenaBattleType{
		SWEEP,BATTLE
	}

	export class ArenaModel {
		constructor() {
		}
		static _instance: ArenaModel;
		static getInstance(): ArenaModel {
			if (!ArenaModel._instance) {
				ArenaModel._instance = new ArenaModel();
			}
			return ArenaModel._instance;
		}

		/**挑战玩家列表排名字体大小 */
		static getClgRankLbSize(rank: number): number {
			if (rank > 0 && rank < 100) {
				return 45;
			} else if (rank >= 100 && rank < 1000) {
				return 35;
			} else {
				return 30;
			}
		}

		/**排行榜结算奖励排名字体大小 */
		static getRewardRankLbSize(len: number): number {
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
		}

		private _infolist: Array<ArenaInfoVo>;
		//已经添加到场景上的模型队列
		private _sceneRoleMap: Map<number, ArenaInfoVo>;
		private _curLoadVo: ArenaInfoVo;
		private _baseScene: Base2dSceneLayer;
		private _total: number = 0;
		private _curIdx: number = 0;
		/**
     	  * 加载多个角色
     	  * @param roleurls
     	  */
		public loads(baseScene: Base2dSceneLayer, roleurls: Array<ArenaInfoVo>): void {
			this._baseScene = baseScene;
			this._infolist = roleurls;
			this._total = roleurls ? roleurls.length : 0;
			this._curIdx = 0;
			this.queueOpt();
		}

		private queueOpt() {
			Laya.timer.frameOnce(2, this, this.Load.bind(this));
		}

		private Load() {
			if (this._curIdx > this._infolist.length - 1) {
				this._curIdx = 0;
				return; //加载完了
			}
			this.loadRole();
		}

		/**
     	  * 加载角色
     	  */
		private loadRole(): void {
			this._curLoadVo = this._infolist[this._curIdx];
			if (!this._curLoadVo || !this._curLoadVo.maxForceGodModel) {
				this.onRoleLoaded(null);
				return;
			}
			let url = getRoleUrl(this._curLoadVo.maxForceGodModel.toString());
			tl3d.MeshDataManager.getInstance().getMeshData(url, this.onRoleLoaded.bind(this));
		}

		/**
		 * 角色加载完毕 
		 * @param skinMesh
		 */
		private onRoleLoaded($skinMesh: tl3d.SkinMesh) {
			if ($skinMesh) {
				if (!this._sceneRoleMap) {
					this._sceneRoleMap = new Map;
				}
				if (this._sceneRoleMap.has(this._curIdx)) {
					let vo: ArenaInfoVo = this._sceneRoleMap.get(this._curIdx);
					// if (vo.maxForceGodModel != this._curLoadVo.maxForceGodModel) {
					// 	if (vo.char)
					// 		vo.char.removeSelf();
					// }
					if (vo.char) {
						vo.char.setRoleUrl(getRoleUrl(String(this._curLoadVo.maxForceGodModel)));
					} else {
						vo.char = this.CreateRoleView();
					}
				} else {
					this._curLoadVo.char = this.CreateRoleView();
					this._sceneRoleMap.set(this._curIdx, this._curLoadVo);
				}
			}
			this._curIdx++;
			this.queueOpt();
		}

		private CreateRoleView() {
			let x = !(this._curIdx % 2 != 0 && this._curIdx != 0) ? 150 : 550;
			return this.addModelChar(this._curLoadVo.maxForceGodModel.toString(), x, this._curIdx * 173 + Launch.offsetY);
		}

		/** 添加ui角色 */
		private addModelChar(mid: string, postionx: number, postiony: number, rotate: number = 180, scale: number = 1.4) {
			if (!this._baseScene) {
				return;
			}
			let sceneChar: GameUIChar = new GameUIChar();
			this._baseScene.scene.addMovieDisplay(sceneChar);
			sceneChar.setRoleUrl(getRoleUrl(mid));
			sceneChar.play(tl3d.CharAction.STANAD);
			sceneChar.forceRotationY = rotate;
			sceneChar.set2dPos(postionx, postiony);  //坐标
			sceneChar.scale = scale;
			return sceneChar;
		}

		public clearAllChar() {
			this._baseScene = null;
			this._infolist = [];
			if (!this._sceneRoleMap) return;
			this._sceneRoleMap.forEach((element, index, array) => {
				if (element.char) {
					element.char.removeSelf();
					element.char = null;
				}
			});
			this._sceneRoleMap.clear();
		}

		private _hasNewRecord: boolean = false;
		public setNewRecordFlag(newRecord: boolean): void {
			this._hasNewRecord = newRecord;
			dispatchEvt(new ArenaEvent(ArenaEvent.UPDATE_ZHANDOU_JILU_DATA));
		}
		public isHasNewRecord(): boolean {
			return this._hasNewRecord;
		}

	}
}