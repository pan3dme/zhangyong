/**
* name 
*/
module inface{
    /** 宝箱数据 */
	export interface IAwardRankData{
	     getRank():number;       				// 排名，可能有(100-1000这种排名情况)
		 getRankStr():string;	 				// 排名字符串
		 getRankSkin(rank:number):string;		// 排名图标皮肤
		 getRewardList():any[];         		// 奖励列表
         getContent ?:()=>string;
	}
}