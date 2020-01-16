/**
* name 
*/
module inface{
	export interface IItemData extends IIcon{
		//数量
		getNum():number;
		//显示详情
		getShow():boolean;
		//消耗数量
		getConstNum():number;
		//播放动画
		isStartAction():boolean;
		//是否碎片
		isChip(): boolean;
		getChipSkin ?: ()=>string;
		isMoreThanSix(): boolean;
		//显示阵营
		showRace(): number;
		//显示星星
		getStar(): number;
		getLvStr?:Function;

		getExtParm();
	}
}