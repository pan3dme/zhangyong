/**
* name 
*/
module game {
	export class ArenaInfoVo implements common.IPlayerLinuepInfo{
		sex: number; 		/**性别 */
		head : any;
		headFrame : any;
		myRank: number;		/**我的排名 */
		rank: number;		/**排名 */
		name: string; 		/**名字 */
		level: number;		/**等级 */
		_force: number;		/**神力*/
		defInfo: any[][] = [];/**阵容 */
		playerId: string = null;/**ID */
		guildName: string;	/**公会 */
		godIcon: string = ``;/**神灵卡片 */
		maxForceGodId: number; /**神灵id */
		maxForceGodModel: number; /**神灵模型 */
		awakenLv:number;//觉醒等级
		canChallenge: boolean;/**是否能挑战 */
		tbData?: tb.TB_arena_new_npc;/**机器人data */
		char?: GameUIChar;
		type : number;
		skinId : number;
		constructor(data: any,myRank:number) {
			if (typeof data == `number`) {
				this.rank = data;
			} else {
				for (let key in data) {
					this[key] = data[key];
				}
			}
			this.initData();
			this.type = common.LinuepType.arena;
			this.myRank = myRank;
		}

		get force() {
			// if(this.isMySelf()) return modulegod.GodModel.getInstance().getForce(iface.tb_prop.lineupTypeKey.attack);
			return this._force;
		}

		set force(v) {
			this._force = v;
		}

		/** 初始化数据 */
		private initData(): void {
			if (this.isNpc()) {
				let data = this.tbData = tb.TB_arena_new_npc.getTB_arena_newById(this.rank);
				this.force = data.power;
				this.level = data.level;
				this.name = data.name;
				this.sex = data.head;
				this.head = data.head;
				this.headFrame = 0;
				this.maxForceGodId = data.getModelId();
				this.maxForceGodModel = GodUtils.getShowGodModel(this.maxForceGodId,0);
			}else{
				this.maxForceGodModel = GodUtils.getShowGodModel(this.maxForceGodId,this.skinId);
			}
			if (!this.guildName) this.guildName = LanMgr.getLan(``, 12561);
		}

		/**如果是两千名并且自己是两千名,数据改为自己的 */
		setDataAtAppHero(): void {
			this.defInfo[0] = [...App.hero.getLineUpTeam(iface.tb_prop.lineupTypeKey.attack)];
			if (this.defInfo[0].length == 0) {
				let god = new GodItemVo(tb.TB_god.get_TB_godById(3002));
				this.defInfo[0].push(god)
			}
			let shenqiId = App.hero.lineupArtifactInfo[iface.tb_prop.lineupTypeKey.attack] || 0;
			this.defInfo[1] = [shenqiId];
			let god = this.getDefLinueupFirst();
			this.maxForceGodId = god.tab_god.model;
			this.maxForceGodModel = god.getModel();
			this.guildName = App.hero.guildName;
			this.playerId = App.hero.playerId;
			this.level = App.hero.level;
			this.name = App.hero.name;
			this.head = App.hero.getHeadId();
			this.sex = App.hero.sex;
			this.headFrame = App.hero.headFrame;
			this.force = GodModel.getInstance().getForce(iface.tb_prop.lineupTypeKey.attack);
			this.tbData = null;
		}

		/**设置阵容 */
		setDefInfo(data: any[]): void {
			this.defInfo = [[]];
			for (let key in data[0]) {
				let info = data[0][key];
				if (!info) {
					this.defInfo[0].push(null);
					continue;
				}
				let god = tb.TB_god.get_TB_godById(info[0]);
				let godVo = new GodItemVo(god);
				if (godVo) {
					godVo.level = info[2];
					godVo.starLevel = info[1];
					godVo.templateId = info[0];
					godVo.degree = info[4];
					godVo.awakenLv = info[5];
					godVo.skinId = info[6];
					godVo.iSeverAttri = map2ary(info[3]);
					godVo.iSeverAttri.forEach((ary: number[]) => ary[0]--);
				}
				this.defInfo[0].push(godVo);
			}
			this.defInfo[1] = data[1];
		}

		getLineupGods():any[]{
			let list = this.getLinueUpAry();
			return list ? list : [this.getDefLinueupFirst()];
		}
		getShenqiAry():number[] {
			return this.defInfo[1];
		}

		/**获得防守阵容的第一个神灵 */
		getDefLinueupFirst(): GodItemVo {
			if (this.defInfo[0]) return this.defInfo[0].find(vo => !!vo);
			else {
				let god = new GodItemVo(tb.TB_god.get_TB_godById(3002));
				return god;
			}
		}

		/**玩家阵容信息 */
		getLinueUpAry(): any[] {
			return this.isNpc() ? this.tbData.getMonsters() : this.defInfo[0];
		}

		/**是否是自己 */
		isMySelf(): boolean {
			return this.playerId == App.hero.playerId;
		}

		/**是否是机器人 */
		isNpc(): boolean {
			return !this.playerId ? true : false;
		}

		/**是否是前三 */
		isBeforeThree(): boolean {
			return this.rank <= 3;
		}

	}
}