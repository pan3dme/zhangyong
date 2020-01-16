var game;
(function (game) {
    var MoiveGodVo = /** @class */ (function () {
        function MoiveGodVo() {
            this.movesucc = false;
            this.hp = 0;
        }
        MoiveGodVo.prototype.getShowBuff = function () {
            var bufflist = new Array;
            for (var i = 0; i < this.buffAry.length; i++) {
                var element = this.buffAry[i];
                if (this.buffAry[i].tb_buff.is_show) {
                    bufflist.push(JSON.parse(JSON.stringify(this.buffAry[i])));
                }
            }
            return bufflist;
        };
        Object.defineProperty(MoiveGodVo.prototype, "hpr", {
            get: function () {
                return this._hpr;
            },
            set: function ($value) {
                var _this = this;
                //需要在添加到舞台以后调用
                if ($value <= 0) {
                    $value = 0;
                    //死亡
                    this.char.play(tl3d.CharAction.DEATH, 1, false);
                    tl3d.TimeUtil.addTimeOut(1500, function () {
                        if (_this.char && _this.hpr <= 0 && _this.char.onStage) {
                            _this.char.removeChar();
                            if (_this.onDead) {
                                _this.onDead.call(null, [_this.godid]);
                            }
                        }
                    });
                }
                this._hpr = $value;
            },
            enumerable: true,
            configurable: true
        });
        MoiveGodVo.prototype.getHp = function () {
            return this.hp;
        };
        /**
         * 开场动画使用
         * @param value
         * @param type
         */
        MoiveGodVo.prototype.setHp = function ($value, type) {
            if (type == 2)
                this.hp += $value;
            else
                this.hp -= $value;
            this.hpr = Math.floor((this.hp / this.maxhp) * 100);
            var temphp = 0;
            if (this.hpr > 0)
                temphp = this.hpr < 5 ? 5 : this.hpr;
            if (this.tab instanceof tb.TB_monster && this.tab.type > 0)
                dispatchEvt(new game.FirstGuideEvent(game.FirstGuideEvent.CHANGE_BOSSBLOOD), { vo: temphp, type: -300 });
            else
                this.char.lifenumExt = temphp;
        };
        /**击打白色滤镜 */
        MoiveGodVo.prototype.beatWitheFilter = function () {
            var _this = this;
            this.char.changeColor = [100, 10, 10, 0.7];
            this._tickw = setTimeout(function () {
                _this.char.changeColor = [1, 1, 1, _this.char.alpha];
            }, 150);
        };
        /**击打红色滤镜 */
        MoiveGodVo.prototype.beatRedFilter = function () {
            var _this = this;
            this.char.changeColor = [100, 0, 0, 0.7];
            this._tickr = setTimeout(function () {
                _this.char.changeColor = [1, 1, 1, _this.char.alpha];
            }, 150);
        };
        MoiveGodVo.prototype.onDispose = function () {
            clearTimeout(this._tickw);
            clearTimeout(this._tickr);
            this.buffAry = [];
            this.char.destory();
            this.char = null;
        };
        return MoiveGodVo;
    }());
    game.MoiveGodVo = MoiveGodVo;
})(game || (game = {}));
