

module game {

    export class ArenaRankVo extends  common.RankVo{

        constructor(){
            super();
        }

        getValue():string {
            return this.force + "";
        }
        getValueDesc():string {
            return "神力";
        }

        isShowMid():boolean {
            return false;
        }

        isShowBottom():boolean {
            return true;
        }

        /** 初始化数据 */
		initNpcData(): void {
			if (this.isNpc()) {
				let data = tb.TB_arena_new_npc.getTB_arena_newById(this.rank);
				this.force = data.power;
				this.level = data.level;
				this.name = data.name;
				this.head = data.head == 1 ? -1 : -2;
			}
		}

        /**是否是机器人 */
		isNpc(): boolean {
			return !this.playerId ? true : false;
		}
    }
    
}