/**
* name 
*/
module game {
	export interface IArenaRecord {
		playerId : string;
		isWin:boolean;
		name :string;
        level :number;
        headFrame :number;
		head:any;
		battleTime : number;
		battleType : number;
		beforeTime():string;
		isChallenge():boolean;
		getChgValue():number;
		getChgValuePrev():string;
		isNotChange():boolean;
		getChangeTypeSkin():string;
		getEvent():tl3d.BaseEvent;

		/**是否是机器人 */
		isNpc(): boolean;
	}

	export class ArenaRecordVo implements IArenaRecord,IArenaReportVo{
		tbData: tb.TB_arena_new_npc;
		playerId: string = null;
		targetRank: number = 0;
		battleTime: number = 0;
		battleType: number = 0;
		isWin: boolean = false;
		head:any;
		headFrame:any;
		chgRank: number = 0;
		level: number = 0;
		name: string = ``;
		id: number = 0;
		force: number = 0;//玩家战力
		targetForce: number = 0;//目标战力
		constructor(data: any) {
			for (let key in data) {
				this[key] = data[key];
			}
			this.initData();
		}

		/**解析战斗记录数据 */
		static parseRecord(data: any[]): ArenaRecordVo[] {
			let datas = [];
			for (let id = data.length - 1; id >= 0; id--) {
				let info = new ArenaRecordVo(data[id])
				info.id = ~~id;
				datas.push(info);
			}
			return datas;
		}

		/** 初始化数据 */
		private initData(): void {
			if (this.isNpc()) {
				let data = this.tbData = tb.TB_arena_new_npc.getTB_arena_newById(this.targetRank);
				this.level = data.level;
				this.name = data.name;
				this.head = data.head;
				this.headFrame = 0;
			}
		}

		/**变化标识 */
		getChangeTypeSkin(): string {
			return SkinUtil.getUpOrDownSkinUrl(this.getRankChangeType());
		}

		/**是否是挑战 ..防守 */
		isChallenge(): boolean {
			return this.battleType == 1;
		}
		/** 获取变化的值 */
		getChgValue():number {
			return this.chgRank;
		}
		getChgValuePrev():string {
			return LanMgr.getLan("",12549);
		}

		/**排名上升/下降/不变 */
		getRankChangeType(): number {
			return this.chgRank > 0 ? RankChangeType.Up : this.chgRank == 0 ? RankChangeType.None : RankChangeType.Down;
		}

		/**是否排名不变 */
		isNotChange(): boolean {
			return this.getRankChangeType() == RankChangeType.None;
		}

		/**多久前挑战 */
		beforeTime(): string {
			return logindifference(this.battleTime, App.serverTimeSecond);
		}


		getEvent():tl3d.BaseEvent {
			return new ArenaEvent(ArenaEvent.GET_ARENA_BAGTTLE);
		}

		isRecord():boolean {
			return true;
		}

		getForce():number{
			return this.force;
		}

		/**是否是机器人 */
		isNpc(): boolean {
			return !this.playerId ? true : false;
		}

		getTagForce(){
			return this.targetForce;
		}
	}

	/**排名变化类型 */
	enum RankChangeType {
		Up = 1,
		None = 0,
		Down = -1
	}
}