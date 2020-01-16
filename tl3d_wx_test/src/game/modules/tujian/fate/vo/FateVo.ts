
module game {

    export class FateVo {
        public id: number;
        //英雄羁绊表
        public tbGodFate: tb.TB_god_fate;
        //英雄vo数组
        public listItem: Array<GodItemVo> = [];
        constructor($id: number) {
            this.id = $id;
            this.tbGodFate = tb.TB_god_fate.get_TB_god_fateById($id);
            this.initGodList();
        }
        
        /** 初始化英雄数组 */
        public initGodList(): void {
            for(let obj of this.tbGodFate.need_god) {
                let vo = new GodItemVo(tb.TB_god.get_TB_godById(obj));
                vo.dataType = 1;
                this.listItem.push(vo);
            }
        }

        /** 该羁绊是否已满足激活条件 */
        public isActivite(): boolean {	
            for(let obj of this.tbGodFate.need_god) {
                if(!this.isOwned(obj)) return false;
            }
            return true;
        }

        /** 该羁绊是否已激活成功 */
        public isActiviteComplete(): boolean {	
            return App.hero.godFateIds.indexOf(this.tbGodFate.ID) != -1;
        }

        /** 该英雄是否曾经拥有 */
        public isOwned(godId: number): boolean {
            return App.hero.godAlbum.findIndex((vo)=>{return vo == godId}) != -1;
        }
        
        /** 通过属性id获取该羁绊的属性 */
        public getAttr(id: number): number {
            for(let obj of this.tbGodFate.attr) {
                if(obj[0] == id) return obj[2] < 1 ? Math.floor(obj[2] * 10000 / 100) : Number(obj[2]);
            }
            return 0;
        }

        /** 通过index(tbFate.attr的index)返回string[属性名(中文)，属性数值(string)] */
        public getAttrByIndex(index: number): Array<string> {
            let attr = this.tbGodFate.attr[index][2] < 1 ? (Math.floor(this.tbGodFate.attr[index][2] * 10000 / 100) + '%') : this.tbGodFate.attr[index][2];
            return [FateModel.getInstance().getNameById(Number(this.tbGodFate.attr[index][0])),  String(attr)];
        }

        /** 通过属性id获取该羁绊属性(用于计算神力) */
        public getAttr2Power(id: number): number {
            for(let obj of this.tbGodFate.attr) {
                if(obj[0] == id) return Number(obj[2]);
            }
            return 0;
        }
    }
}