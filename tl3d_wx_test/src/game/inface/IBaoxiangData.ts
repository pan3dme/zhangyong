/**
* name 
*/
module inface{
    /** 宝箱数据 */
	export interface IBaoxiangData{
	     getCount():number;             // 宝箱达到的条件值
         isCanReward():boolean;         // 是否可领取
		 getSkin():string;              // 宝箱皮肤
		 getRewardSkin():string;        // 奖励宝箱皮肤
		 getRewardList():any[];         // 宝箱预览
         getEvent():tl3d.BaseEvent;    // 领取宝箱事件
		 isReward():boolean;			//是否领取
	}
}