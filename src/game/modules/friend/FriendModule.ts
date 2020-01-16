/**
* name 
*/
module game{
	export class FriendModule extends tl3d.Module {
		constructor(){
			super();
		}
		public getModuleName(): string {
            return "FriendModule";
        }

        protected listProcessors(): Array<tl3d.Processor> {
            return [new FriendProcessor()];
        }

        /**
         * 初始化数据
         */
        protected onRegister(){
            FriendModel.getInstance().queryList(Protocol.friend_friend_list, () => {
				ChatModel.getInstance().initModel();
			});
        }
	}

	export class FriendEvent extends tl3d.BaseEvent {
        /**好友界面 */
        public static SHOW_FRIEND_PANEL: string = "SHOW_FRIEND_PANEL";
        /**申请好友 */
        public static FRIEND_PANAEL_ADDFRIEND:string = "FRIEND_PANAEL_ADDFRIEND";
        /**好友切磋 */
        public static FRIEND_QIECUO:string = "FRIEND_QIECUO";

        /** 更新好友申请列表 */
        public static UPDATE_FRIEND_APPLY : string = "UPDATE_FRIEND_APPLY";
        public data: any;
    }

    export class IFriendInfoVo {
        force:number;
        head: number;
        headFrame : number; // 玩家头像框
        level: number;
        name: string;
        playerId: string;
        pointNum: number;   // 可领取友情点数量（如果是0说明不能领取）
        giveTime: number;   // 赠送友情点时间
        logoutTime:number;  // 离线时间（如果是0说明在线）

        sortNum : number;
    }

    /** 好友推荐vo */
    export class IFriendRecommendSvo {
        playerId: string;
        name: string;
        head: number;
        level: number;
        force:number;
        headFrame:number;
    }

    /** 好友申请vo */
    export class IFriendApplySvo {
        force:number;
        head: number;
        level: number;
        name: string;
        playerId: string;
        online : number;
        outlineTime : number;
        headFrame:number;
    }
}