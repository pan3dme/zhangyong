

module game {

    export class FateModel {
        constructor() { }
        private static _instance: FateModel;
        public static getInstance(): FateModel {
            if (!this._instance) {
                this._instance = new FateModel();
            }
            return this._instance;
        }

        /** 羁绊对象数组 */
        public arrFateVo: Array<FateVo>;
        /** 初始化羁绊vo数组 */
        initFateList() {
            if (!this.arrFateVo) {
                this.arrFateVo = [];
                let arrTbGodFate = tb.TB_god_fate.get_TB_god_fate();
                for (let obj of arrTbGodFate) {
                    this.arrFateVo.push(new FateVo(obj.ID));
                }
            }
            this.sort();
        }

        /** 给羁绊排序(表里配的) */
        sort(): void {
            this.arrFateVo.sort((a, b) => {
                let activitecA = a.isActiviteComplete();
                let activitecB = b.isActiviteComplete();
                if (activitecA == activitecB) {
                    if (activitecA) {
                        return a.tbGodFate.rank - b.tbGodFate.rank;
                    } else {
                        let activiteA = a.isActivite();
                        let activiteB = b.isActivite();
                        if (activiteA == activiteB) {
                            return a.tbGodFate.rank - b.tbGodFate.rank;
                        } else {
                            return activiteA ? -1 : 1;
                        }
                    }
                } else {
                    return activitecA ? 1 : -1;
                }
            });
        }

        /** 羁绊[已完成/总数] */
        getFateArrNum(): Array<number> {
            let num = 0;
            let MaxNum = 0;
            this.arrFateVo.forEach((vo) => {
                if (vo.isActiviteComplete()) num++;
                MaxNum++;
            });
            return [num, MaxNum];
        }

        /** 通过id获取到属性名字 */
        getNameById(id: number) {
            return LanMgr.attrName[id];
        }

        /** 通过属性id获取到当前激活羁绊的总属性(显示到界面的) */
        getCurFateAttrById(id: number): number {
            let num: number = 0;
            for (let obj of this.arrFateVo) {
                if (obj.isActiviteComplete()) num += obj.getAttr(id);
            }
            return num;
        }

        /** 通过属性id获取当前总属性(计算神力) */
        getCurFateAttrById2Power(id: number): number {
            let num: number = 0;
            for (let obj of this.arrFateVo) {
                if (obj.isActiviteComplete()) num += obj.getAttr2Power(id);
            }
            return num;
        }

        /** 返回神力 */
        getCurFateAttr(): Array<Array<number>> {
            this.initFateList();
            let attr: Array<Array<number>> = [];
            for (let i = 1; i <= 8; i++) {
                attr.push([i, this.getCurFateAttrById2Power(i)]);
            }
            return attr;
        }

    }
}