/**
* name 
*/
module game{
	export class ReplaceGodView extends ui.god.ReplaceGodUI{

        private _godAry : GodItemVo[];
        private _pos : number;      // 替换的阵容位置
        private _godVo : GodItemVo; // 替换的英雄
		constructor(){
			super();
			this.isModelClose = true;
		}

        createChildren():void {
            super.createChildren();
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: LanMgr.getLan("",12338) };
            this.raceList.selectHandler = new Handler(this, this.onRaceSelect);
            this.raceList.selectedIndex = -1;
            this._godAry = [];
        }

		public popup() {
			super.popup();
			this.initView();
		}

        getPos():number {
            return this._pos;
        }

        getGodVo():GodItemVo {
            return this._godVo;
        }

        private initView():void {
            let dataAry : any[] = this.dataSource;
            this._godVo = dataAry[0];
            this._pos = dataAry[1];
            let gods = [...App.hero.getGodArr()];
            gods = gods.filter((vo)=>{
                return !vo.isInLinuep(iface.tb_prop.lineupTypeKey.attack);
            });
            gods.forEach((vo)=>{
                // 星级-》等级-》稀有度-》阵营
				vo.sortNum = - vo.starLevel * 100000 - vo.level * 100 - vo.tab_god.quality * 10 + vo.tab_god.race_type;
			});
            this._godAry = gods.sort((a,b)=>{
				return a.sortNum - b.sortNum;
			});
            this.raceList.array = [0, 1, 2, 3, 4,5];
            this.raceList.selectedIndex = 0;
        }
		
        /** 种族选择 */
        private onRaceSelect(index: number): void {
            if( index == -1 ) return;
            let ary = index == 0 ? this._godAry : this._godAry.filter((vo)=>{
                return vo.getRaceType() == index;
            });
            this.godList.array = ary;
            this.boxEmpty.visible = ary.length == 0;
        }

        public getIRByid(tbid:number):godReplaceIR {
            let cells = this.godList.cells;
            for(let i = 0 ; i < cells.length ; i++){
                let cell = cells[i] as godReplaceIR;
                if(cell.dataSource && cell.dataSource.templateId == tbid){
                    return cell;
                }
            }
            return cells[0];
        }

		public onClosed() {
			super.onClosed();
            this.godList.array = null;
            this.raceList.array = null;
            this.raceList.selectedIndex = -1;
            this._godAry.length = 0;
		}
	}
}