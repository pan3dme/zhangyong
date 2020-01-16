module game {
    export class MoiveGodVo {
        public godid: string;
        public isplayer: boolean;
        public movesucc: boolean = false;
        public char: FightChar;
        public pos: tl3d.Vector3D;
        public rotation: number;
        public locad: number;
        public skillMap: Object;
        public lev: number;
        private _hpr: number;
        private hp: number = 0;
        public maxhp: number;
        public tab: any;
        public lastAction: number;
        public buffAry: Array<GodBuffVo>
        public onDead: Function;

        public getShowBuff(): Array<GodBuffVo> {
            let bufflist: Array<GodBuffVo> = new Array
            for (let i = 0; i < this.buffAry.length; i++) {
                var element = this.buffAry[i];
                if (this.buffAry[i].tb_buff.is_show) {
                    bufflist.push(JSON.parse(JSON.stringify(this.buffAry[i])));
                }
            }
            return bufflist;
        }

        public set hpr($value) {
            //需要在添加到舞台以后调用
            if ($value <= 0) {
                $value = 0;
                //死亡
                this.char.play(tl3d.CharAction.DEATH, 1, false);
                tl3d.TimeUtil.addTimeOut(1500, () => {
                    if (this.char && this.hpr <= 0 && this.char.onStage) {
                        this.char.removeChar();
                        if (this.onDead) {
                            this.onDead.call(null, [this.godid]);
                        }
                    }
                });
            }
            this._hpr = $value;
        }

        public get hpr(): number {
            return this._hpr;
        }

        public getHp() {
            return this.hp;
        }

        /**
         * 开场动画使用
         * @param value 
         * @param type 
         */
        public setHp($value: number, type: number) {
            if (type == 2)
                this.hp += $value;
            else
                this.hp -= $value;

            this.hpr = Math.floor((this.hp / this.maxhp) * 100);

            let temphp = 0
            if (this.hpr > 0)
                temphp = this.hpr < 5 ? 5 : this.hpr;
            if (this.tab instanceof tb.TB_monster && this.tab.type > 0)
                dispatchEvt(new FirstGuideEvent(FirstGuideEvent.CHANGE_BOSSBLOOD), { vo: temphp, type: -300 });
            else
                this.char.lifenumExt = temphp;
        }

        private _tickw: number;
        /**击打白色滤镜 */
        public beatWitheFilter(): void {
            this.char.changeColor = [100, 10, 10, 0.7];
            this._tickw = setTimeout(() => {
                this.char.changeColor = [1, 1, 1, this.char.alpha];
            }, 150);
        }

        private _tickr: number;
        /**击打红色滤镜 */
        public beatRedFilter(): void {
            this.char.changeColor = [100, 0, 0, 0.7];
            this._tickr = setTimeout(() => {
                this.char.changeColor = [1, 1, 1, this.char.alpha];
            }, 150);
        }

        public onDispose() {
            clearTimeout(this._tickw);
            clearTimeout(this._tickr);
            this.buffAry = [];
            this.char.destory();
            this.char = null;
        }
    }
}