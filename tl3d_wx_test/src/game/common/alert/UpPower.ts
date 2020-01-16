module common {
    export class UpPower extends ui.prompt.upPowerUI {
        constructor() {
            super();
            this.mouseEnabled = false;
            this.mouseThrough = true;
            this.isIgnore = true;
        }

        public show() {
            super.show(false, false);
            this.updateEff();
        }

        public updateEff() {
            if (!this.dataSource) {
                this.close();
                return;
            }
            this.resetAll();
            this.box_changNum.visible = false;
            this._start = this.dataSource.start;
            this._end = this.dataSource.end;
            this._start = Math.round(this._start);
            this._end = Math.round(this._end);

            this.clip_power.value = String(this._start);

            let len:number = this.getLen();
            let nwidth = len + 68;
            this.img_bg.width = nwidth;
            this.box_changNum.x = 35 + len;

            let center = (Laya.stage.width >> 1) - (nwidth >> 1) - 32;
            this.x = center;
            this.y = (Laya.stage.height >> 1) - this.dataSource.posy;
            this.moveOk();
        }

        private getLen():number {
            let endlen: number = String(this._end).length;
            let startlen: number = String(this._start).length;
            let len = Math.max(endlen, startlen);
            if (len == 0) return;
            return (29 * len) + this.clip_power.spaceX * (len - 1);
        }

        private _num: number;
        private _end: number;
        private _start: number;
        private moveOk() {
            let cha: number = 0;
            if (this._end > this._start) {
                cha = this._end - this._start;
            } else {
                cha = this._start - this._end;
            }
            this._num = cha / 700 * 20;
            this._num = Math.max(1,this._num);
            this.clip_power.timerLoop(20, this, this.loopFun);
        }

        private loopFun() {
            let curval = Number(this.clip_power.value);
            if (this._end > this._start) {
                if (this._end <= curval) {
                    this.clip_power.clearTimer(this, this.loopFun);
                    this.clip_power.value = String(this._end);
                    this.onclose();
                } else {
                    let cur = Math.ceil(curval + this._num);
                    this.clip_power.value = String(cur);
                }
            } else {
                if (this._end >= curval) {
                    this.clip_power.clearTimer(this, this.loopFun);
                    this.clip_power.value = String(this._end);
                    this.onclose();
                } else {
                    let cur = Math.ceil(curval - this._num);
                    this.clip_power.value = String(cur);
                }
            }
        }

        private _ticknum: number;
        public onclose() {
            this.box_changNum.visible = true;
            this.box_changNum.y = 20;

            let isUp: boolean = this._end >= this._start;
            this.clip_changNum.skin = SkinUtil.getclipNum(isUp);
            this.img_changNum.skin = SkinUtil.getAddOrDec(isUp);
            let EndNum: number = isUp ? (this._end - this._start) : (this._start - this._end);
            EndNum = Math.round(EndNum);
            this.clip_changNum.value = String(EndNum);
            if (isUp) {
                Laya.Tween.to(this.box_changNum, { y: -14 }, 300);
                this._ticknum = setTimeout(() => {
                    this.close();
                }, 600);
            } else {
                Laya.Tween.to(this.box_changNum, { y: 75 }, 300);
                this._ticknum = setTimeout(() => {
                    this.close();
                }, 600);
            }
        }

        private resetAll() {
            // Laya.Tween.clearAll(this);
            this.clip_power.clearTimer(this, this.loopFun);
            clearTimeout(this._ticknum);
            Laya.Tween.clearAll(this.box_changNum);
        }

        public close() {
            super.close();
            this.resetAll();
        }
    }
}