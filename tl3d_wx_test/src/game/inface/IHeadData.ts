/**
* name 
*/
module inface{
	export interface IHeadData extends IIcon{
		//名称
		getName():string;
		//等级
		getLevel():number;
		getLevelStr ?: Function;
		//星级
		getStar():number;
		//外框品质
		getFrameUrl():string;
		//觉醒状态
		isAwaken():boolean;
		/**类型 */
		getDataType():number;
		//属性
		getProperty(): Array<Array<number>>
		//技能
		jisuanjineng(): Array<any>
		//星星状态
		isMoreThanSix(): boolean;
		//阵营
		getRaceType(): any;
		getAttrType(): number;
	}
}