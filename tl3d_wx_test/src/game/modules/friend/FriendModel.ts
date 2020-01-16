/**
* name 
*/
module game{
	export class FriendModel{
		private static _instance:FriendModel;
		public static getInstance():FriendModel{
			if(!FriendModel._instance){
				FriendModel._instance=new FriendModel();
			}
			return FriendModel._instance;
		}
		public dateTime : number;

		private _friendList:Array<IFriendInfoVo>;
		public recommendList:Array<any>;

		constructor(){
			this._friendList=new Array<IFriendInfoVo>();
			this.recommendList=new Array<any>();
		}

		/** 登录时是否显示好友申请红点 */
		public loginApplyRp : boolean = false;
		/** 是否有好友申请 */
		public hasFriendApply : boolean = false;
		updateFriendApply(flag:boolean):void {
			this.hasFriendApply = flag;
			dispatchEvt(new FriendEvent(FriendEvent.UPDATE_FRIEND_APPLY));
		}
		/** 好友请求红点 */
		public friendApplyRp():boolean {
			return this.loginApplyRp || this.hasFriendApply;
		}

		/**
		 * 查询好友数据
		 * @param type 
		 * @param callBack 
		 */
		public queryList(type:any,callBack:Function=null):void
		{
			PLC.request(type, null, (sdata: any, msg: any) => {
					if (!sdata) return;
					switch(type.name){
						case Protocol.friend_friend_list.name:
							let flist = sdata.friendList || [];
							this.checkFriend(this._friendList,flist); 
							this._friendList = flist;
							if(callBack){
								callBack(flist);
							}
							break;
						case Protocol.friend_friend_apply_list.name:
							let applyList : IFriendApplySvo[] = sdata.requestList || [];
							this.loginApplyRp = false;
							this.updateFriendApply(applyList.length > 0);
							if(callBack){
								callBack(applyList);
							}
							break;
						case Protocol.friend_friend_recommend.name:
							this.recommendList=sdata.recommondList;
							if(callBack){
								callBack(sdata.recommondList);
							}
							break;
					}
			});
		}
		/** 获取好友列表 */
		getFriendList(sort:boolean=false):IFriendInfoVo[] {
			if(sort){
				this._friendList.sort((a,b)=>{
					if(a.logoutTime == 0 && b.logoutTime == 0){
						return b.force - a.force;
					}else if(a.logoutTime == 0){
						return 1;
					}else if(b.logoutTime == 0){
						return 1;
					}else{
						return b.logoutTime - a.logoutTime;
					}
				});
			}
			return this._friendList;
		}

		/** 检测出 删除自己的好友 及 添加自己的好友*/
		private checkFriend(curList:IFriendInfoVo[],changeList:IFriendInfoVo[]):void {
			let newAry = [];
			for(let info of changeList){
				newAry.push(info.playerId);
			}
			for(let info of curList){
				// 被删除了
				if(newAry.indexOf(info.playerId) == -1){
					ChatModel.getInstance().delPrivateChat(info.playerId);
				}
			}
		}

		/** 是否是好友 */
		isMyFriend(playerId:string):boolean{
			return this._friendList.some((vo)=>{
				return vo.playerId == playerId;
			});
		}
		/** 删除好友 */
		delFriend(playerId:string):void {
			let index = this._friendList.findIndex((vo)=>{
				return vo.playerId == playerId;
			});
			if(index != -1){
				this._friendList.splice(index,1);
			}
			PrivateChatStorage.getInstance().delStorage(playerId);
			ChatModel.getInstance().delPrivateChat(playerId);
		}
		/** 领取友情点之后置空 */
		delPoint(ids:string[]):void {
			ids = ids || [];
			let friends = this.getFriendList();
			friends.forEach((vo)=>{
				if(ids.indexOf(vo.playerId) != -1){
					vo.pointNum = 0;
				}
			});
		}
		/** 设置赠送时间 */
		setGiveTime(ids:string[],time:number):void {
			ids = ids || [];
			let friends = this.getFriendList();
			friends.forEach((vo)=>{
				if(ids.indexOf(vo.playerId) != -1){
					vo.giveTime = time;
				}
			});
		}


		/** 获取好友 */
		getFriendById(playerId:string):IFriendInfoVo{
			return this._friendList.find((vo)=>{
				return vo.playerId == playerId;
			});
		}
	}
}