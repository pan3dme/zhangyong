/**
* name 
*/
module inface {
	export interface IUserHeadData extends IIcon {
		//等级
		getLevel(): number;
		getStyle():number;
		/** 获取特殊头像框 */
		getFrame():string;
		/** 获取等级框 */
		getImgLv():string;
	}
}