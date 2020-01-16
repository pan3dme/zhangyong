/**
* name 
*/
module inface {
	export interface IFuwenData extends IIcon {
		//星级
		getStar(): number;
		//首通
		firstFlag(): boolean;
		//显示详细
		getShow():boolean;
		//强化等级
		getLevel():number;
	}
}