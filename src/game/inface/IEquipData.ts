/**
* name 
*/
module inface {
	export interface IEquipData extends IIcon {
		//星级
		getStar(): number;
		//首通
		firstFlag(): boolean;
		//显示详细
		getShow(): boolean;
		//精练等级
		getRefineLevel(): number;
		//强化等级
		getStrengthLv(): number;
		//播放动画
		isStartAction():boolean;
	}
}