/**
* name 
*/
module game {
	export class GuildModel {
		
		private static _instance: GuildModel;
		public static getInstance(): GuildModel {
			if (!GuildModel._instance) {
				GuildModel._instance = new GuildModel();
			}
			return GuildModel._instance;
		}
		constructor() {

		}

		/** 是否初始化 */
		private _isInited : boolean = false;
		initModel():void {
			if(!App.IsSysOpen(ModuleConst.GONGHUI)) return;
			this.checkGuildExist(true);
		}
		
		/** 初始化数据一次:有公会才初始化 */
		private initData():void {
			if(!this.isHasGuild() || this._isInited) return;
			this._isInited = true;
			this._donationList = [];
			let tbData = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_guild_donate)).data;
			for(let key in tbData) {
				this._donationList.push(new GuildDonationVo(tbData[key]));
			}
            GuildCopyModel.getInstance().initModel();
			GuildSkillModel.getInstance().initModel();
			GuildFightModel.getInstance().initModel();
			GuildHelpModel.getInstance().initModel();
		}

		/**  创建时初始化图标 */
		private _createInitIconID: number = 1;
		public set createInitIconID($value) {
            this._createInitIconID = $value;
        }
        public get createInitIconID(): number {
            return this._createInitIconID;
        }

		/**　图标列表 */
		private _iconList : IconVo[];
		/**　将图标数据从表中取出 */
		public getIconList():IconVo[]{
			if(!this._iconList){
				this._iconList = [] as IconVo[];
				let ary = tb.TB_guild_icon.get_TB_guild_icon();
				for(let i = 0; i < ary.length; i++){
					this._iconList.push(new IconVo(ary[i]));
				}
			}
			return this._iconList;
		}
		/** 通过headID获取Icon */
		public getIcon(id: number): IconVo {
			let ary = tb.TB_guild_icon.get_TB_guild_icon();
			for(let obj of ary) {
				if(obj.ID == id) {
					return new IconVo(obj);
				}
			}
			return new IconVo(ary[0]);
		}
		
		public guildInfo : IGuildInfo;
		/** 更新公会信息 */
		updateGuildInfo(info:IGuildInfo):void {
			this.guildInfo = info;
			App.hero.guildName = info ? info.name : "";
			App.hero.guildId = info ? info.guildId : "";
			App.hero.guildExp = info ? info.exp : 0;
			this.initData();
			dispatchEvt(new GuildEvent(GuildEvent.UPDATE_GUILD_INFO));
		}
		updateGuildExp(exp:number):void {
			if(this.guildInfo){
				this.guildInfo.exp = exp;
			}
		}

		/** 重新请求公会最新数据 */
		checkGuildExist(request:boolean):Promise<any>{
			return new Promise<any>((resolve)=>{
				if(request){
					PLC.request(Protocol.guild_guild_info, null, ($data: any, msg: any) => {
						GuildModel.getInstance().updateGuildInfo($data ? $data.guildInfo : null);
						resolve();
					});
				}else{
					resolve();
				}
			});
		}
		/** 是否有公会 */
		public isHasGuild():boolean {
			return App.hero.guildId && App.hero.guildId != "";
		}
		// --------------- 缓存成员列表 -------------------
		private _memberList : IGuildMemberData[];
		public setMemberList(list):void {
			this._memberList = list;
			let selfInfo = this._memberList.find((vo)=>{
				return vo.playerId == App.hero.playerId;
			});
			if(selfInfo){
				this.guildInfo.job = selfInfo.job;
			}
		}
		public getMemberList(sort:boolean=false):IGuildMemberData[]{
			let list = this._memberList || [];
			if(sort){
				// 优先按照在线不在线排序 在线按照职位，然后再按照神力 不在线按照离线时间排序
				list.sort((a,b)=>{
					if(a.online == 1 && b.online == 1){
						let aNum = a.job == iface.tb_prop.guildJobTypeKey.president ? 0 : (a.job == iface.tb_prop.guildJobTypeKey.vicePresident ? 1 : 2);
						let bNum = b.job == iface.tb_prop.guildJobTypeKey.president ? 0 : (b.job == iface.tb_prop.guildJobTypeKey.vicePresident ? 1 : 2);
						return aNum != bNum ? (aNum - bNum) : (b.force - a.force);
					}else if(a.online == 1){
						return -1;
					}else if(b.online == 1){
						return 1;
					}else{
						return b.logoutTime - a.logoutTime;
					}
				});
			}
			return list;
		}
		/** 获取公会职位的成员数量 */
		getMemberNum(jobType:number):number {
			if(jobType == 0) return this._memberList.length;
			let list = this._memberList.filter((vo)=>{
				return vo.job == jobType;
			});
			return list.length;
		}
		// --------------- 缓存申请列表 -------------------
		public hasNewApply : boolean = false;
		updateNewApply(flag):void {
            this.hasNewApply = flag;
            dispatchEvt(new GuildEvent(GuildEvent.UPDATE_APPLY_INFO));
        }
		private _applyList : IGuildApplyData[];
		public setApplyList(list):void {
			this.hasNewApply = false;
			this._applyList = list;
			dispatchEvt(new GuildEvent(GuildEvent.UPDATE_APPLY_INFO));
		}
		public getApplyList():IGuildApplyData[]{
			return this._applyList ? this._applyList : [];
		}
		isHasNewApply():boolean {
			return this.hasNewApply || this.getApplyList().length > 0;
		}
		// --------------- 缓存公会列表 -------------------
		requestGuildList():Promise<any> {
			return new Promise((resolve)=>{
				PLC.request(Protocol.guild_guild_list,null,($data)=>{
					if (!$data) {
						resolve();
						return;
					}
					this.setGuildList($data.guildList);
					resolve();
				});
			});
		}
		private _guildList : IGuildData[];
		public setGuildList(list):void {
			this._guildList = list;
		}
		public getGuildList():IGuildData[]{
			return this._guildList ? this._guildList : [];
		}
		// --------------- 捐献 -------------------
		/** 捐献列表 */
		private _donationList : GuildDonationVo[] = [];
		getDonationList():GuildDonationVo[] {
			return this._donationList;
		}
		/** 是否可捐献 */
		isCanDonate():boolean {
			return this.isHasGuild() && App.hero.getlimitValue(iface.tb_prop.limitTypeKey.guildDonate) == 0;
		}

		/** 是否管理者： 会长和副会长 */
		isController():boolean {
			return this.guildInfo ? [iface.tb_prop.guildJobTypeKey.president,iface.tb_prop.guildJobTypeKey.vicePresident].indexOf(this.guildInfo.job) != -1 : false;
		}
	}
}