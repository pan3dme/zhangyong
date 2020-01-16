var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tl3d;
(function (tl3d) {
    var TextJumpType = /** @class */ (function () {
        function TextJumpType() {
        }
        TextJumpType.NORMALDAMAGE = 1; //普通伤害
        TextJumpType.CRIT = 2; //暴击
        TextJumpType.DODGE = 3; //闪避
        TextJumpType.TREATMENT = 4; //治疗
        TextJumpType.VERTIGO = 5; //眩晕
        TextJumpType.FREEZE = 6; //定身
        TextJumpType.ATTACKADD = 7; //攻击增加
        TextJumpType.ATTACKREDUCE = 8; //攻击减少
        TextJumpType.EXPERIENCE = 9; //经验
        TextJumpType.NORMALDAMAGEUP = 11; //普通伤害上
        TextJumpType.CRITUP = 12; //暴击上
        TextJumpType.MYNORMALDAMAGE = 13; //自己受伤普通伤害
        TextJumpType.MYNORMALDAMAGEUP = 14; //自己受伤普通伤害上
        TextJumpType.MISS = 15; //未命中，对敌方
        TextJumpType.N_NORMALDAMAGE = 16; //普通伤害16+60 76
        TextJumpType.N_CRIT = 17; //暴击 17+60 77
        TextJumpType.N_RESISTANCE = 18; //抵抗 
        TextJumpType.N_RESISTANCES = 181; //抵抗 
        TextJumpType.N_IMMUNE = 19; //免疫
        TextJumpType.N_ONCEATTACK = 20; //追加回合
        TextJumpType.N_PASSIVE = 21; //被动技能 21+60 81
        TextJumpType.N_RESURGENCE = 22; //复活
        TextJumpType.N_UPHP = 23; //回血 23+60 83
        TextJumpType.N_BEATBACK = 24; //反击 
        TextJumpType.N_DOWNHP = 25; //无法回血 
        TextJumpType.N_BOMB = 26; //炸弹 
        TextJumpType.N_DIZZY = 27; //晕眩 
        TextJumpType.N_INVINCIBLE = 28; //无敌 
        TextJumpType.N_TARGET = 29; //标记
        TextJumpType.N_SARCASM = 30; //嘲讽
        TextJumpType.N_SILENCE = 31; //沉默
        TextJumpType.N_SHIELD = 32; //护盾
        TextJumpType.N_BLEED = 33; //流血
        TextJumpType.N_SLEEP = 34; //沉睡
        TextJumpType.N_CRIT_RATE_UP = 35; //暴击率+ 
        TextJumpType.N_RESIST_RATE_UP = 36; //抵抗+ 
        TextJumpType.N_ATTACK_UP = 37; //攻击+
        TextJumpType.N_DEFENSE_UP = 38; //防御+
        TextJumpType.N_SPEED_UP = 39; //攻速+
        TextJumpType.N_HIT_UP = 40; //命中+
        TextJumpType.N_CRIT_RATE_DOWN = 41; //暴击率- 
        TextJumpType.N_RESIST_RATE_DOWN = 42; //抵抗- 
        TextJumpType.N_ATTACK_DOWN = 43; //攻击-
        TextJumpType.N_DEFENSE_DOWN = 44; //防御-
        TextJumpType.N_SPEED_DOWN = 45; //攻速-
        TextJumpType.N_HIT_DOWN = 46; //命中-
        TextJumpType.N_SHIHUA = 47; //石化
        TextJumpType.N_MEIHUO = 48; //魅惑
        TextJumpType.N_SHUFU = 49; //束缚
        TextJumpType.N_BINGFENG = 50; //冰封
        TextJumpType.N_ZHONGDU = 51; //中毒
        TextJumpType.N_LEIDIAN = 52; //雷电
        TextJumpType.N_ANGER_DOWN = 53; //减怒
        TextJumpType.N_WANGLING = 54; //亡灵
        TextJumpType.N_MABI = 55; //麻痹
        TextJumpType.N_FENNU = 56; //愤怒
        TextJumpType.N_FANTAN = 57; //反弹
        TextJumpType.N_SHARE = 58; //分摊
        TextJumpType.N_ZHUOSHAO = 59; //灼烧
        return TextJumpType;
    }());
    tl3d.TextJumpType = TextJumpType;
    var TextJumpUiVo = /** @class */ (function () {
        function TextJumpUiVo() {
        }
        return TextJumpUiVo;
    }());
    tl3d.TextJumpUiVo = TextJumpUiVo;
    var ExpTextJumpUiDrawAndRefreash = /** @class */ (function (_super) {
        __extends(ExpTextJumpUiDrawAndRefreash, _super);
        function ExpTextJumpUiDrawAndRefreash() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpTextJumpUiDrawAndRefreash.prototype.makeData = function () {
            if (this._data) {
                var vo = this._data;
                this.dtime = vo.endtime;
                // this.dtime = 60;
                this.pos = vo.pos;
                switch (vo.type) {
                    case TextJumpType.EXPERIENCE:
                        //文字 + 数字类（最多显示4位数字）
                        this._width = this.drawTxtBydigitalAndtext(vo);
                        break;
                    default:
                        break;
                }
            }
        };
        ExpTextJumpUiDrawAndRefreash.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor;
            if ($vo.type == TextJumpType.EXPERIENCE) {
                txtcolor = tl3d.ArtFont.num54;
            }
            var distion = tl3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            tl3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new tl3d.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), tl3d.UIData.publicUi);
            tl3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);
            tl3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        };
        ExpTextJumpUiDrawAndRefreash.prototype.update = function () {
            if (this._data) {
                this.time = tl3d.TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                var vo = this._data;
                //变化
                var $ary = this.changerules(this.time);
                this.ui.width = 256 * $ary[2]; //缩放
                this.ui.height = 50 * $ary[3]; //缩放
                this.ui.y = $ary[1] - this.ui.height; //起始点
                this.ui.x = $ary[0] - this.ui.width / 2 + 25; //起始点
                this.ui.alpha = $ary[4]; //alpha
            }
        };
        ExpTextJumpUiDrawAndRefreash.prototype.changerules = function (t) {
            var changevo = new Array();
            var vo = this._data;
            t = (t - vo.starttime) / 1000 * 60;
            // console.log("---t---",t);
            var posx = 0;
            var posy = 0;
            var scalex = 0;
            var scaley = 0;
            var alpha = 0;
            //当前处于哪一帧
            if (vo.type == tl3d.TextJumpType.EXPERIENCE) {
                var v2d = new tl3d.Vector2D;
                if (t < 0) {
                    v2d.x = -9999;
                }
                else {
                    v2d.x = 300 / tl3d.UIData.Scale;
                    v2d.y = tl3d.Scene_data.stageHeight / tl3d.UIData.Scale - 50;
                }
                //玩家名
                posy = v2d.y -= 15;
                posy = posy - (t * 0.5);
                if (t < 40) {
                    posx = v2d.x;
                    scalex = 1.8;
                    scaley = 1.8;
                    alpha = 1;
                }
                else if (t < 60) {
                    posx = v2d.x;
                    scalex = 1.8;
                    scaley = 1.8;
                    alpha = 1 - ((t - 39) / 20);
                }
            }
            changevo.push(posx);
            changevo.push(posy);
            changevo.push(scalex);
            changevo.push(scaley);
            changevo.push(alpha);
            changevo.push(v2d.x);
            changevo.push(v2d.y);
            //保存上一次变化
            this._lastchange = changevo;
            return changevo;
        };
        return ExpTextJumpUiDrawAndRefreash;
    }(tl3d.Disp2DBaseText));
    tl3d.ExpTextJumpUiDrawAndRefreash = ExpTextJumpUiDrawAndRefreash;
    var TextJumpUiDrawAndRefreash = /** @class */ (function (_super) {
        __extends(TextJumpUiDrawAndRefreash, _super);
        function TextJumpUiDrawAndRefreash() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextJumpUiDrawAndRefreash.prototype.makeData = function () {
            if (this._data) {
                var vo = this._data;
                this.dtime = vo.endtime;
                // this.dtime = 60;
                this.pos = vo.pos;
                switch (vo.type) {
                    case TextJumpType.NORMALDAMAGE:
                    case TextJumpType.TREATMENT:
                        //数字类
                        this._width = tl3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), "NUM" + (vo.type + 50), tl3d.TextAlign.RIGHT);
                        break;
                    case TextJumpType.MYNORMALDAMAGEUP:
                    case TextJumpType.MYNORMALDAMAGE:
                        this._width = tl3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), tl3d.ArtFont.num53, tl3d.TextAlign.RIGHT);
                        break;
                    case TextJumpType.NORMALDAMAGEUP:
                        this._width = tl3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), "NUM" + (vo.type + 40), tl3d.TextAlign.RIGHT);
                        break;
                    case TextJumpType.DODGE:
                    case TextJumpType.VERTIGO:
                    case TextJumpType.FREEZE:
                    case TextJumpType.MISS:
                        //文字类
                        this._width = this.drawTxtBytext(vo);
                        break;
                    case TextJumpType.ATTACKADD:
                    case TextJumpType.ATTACKREDUCE:
                    case TextJumpType.EXPERIENCE:
                    case TextJumpType.CRIT:
                    case TextJumpType.CRITUP:
                        //文字 + 数字类（最多显示4位数字）
                        this._width = this.drawTxtBydigitalAndtext(vo);
                        break;
                    case TextJumpType.N_IMMUNE:
                    case TextJumpType.N_ONCEATTACK:
                    case TextJumpType.N_RESURGENCE:
                    case TextJumpType.N_RESISTANCES:
                        //文字类
                        this._width = this.drawTxtBytext(vo, tl3d.UIData.publicsUi);
                        break;
                    case TextJumpType.N_NORMALDAMAGE:
                    case TextJumpType.N_UPHP:
                        //数字类
                        var color = vo.type == TextJumpType.N_NORMALDAMAGE ? "NUM81" : "NUM76";
                        this._width = tl3d.ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), color, tl3d.TextAlign.RIGHT, 0, 64 - 35);
                        break;
                    case TextJumpType.N_PASSIVE:
                        //文字 + 数字类（最多显示4位数字）
                        this._width = this.drawTxtBydigitalAndtext(vo);
                        break;
                    case TextJumpType.N_CRIT:
                    case TextJumpType.N_RESISTANCE:
                        this._width = this.drawCritTxt(vo);
                        break;
                    default:
                        break;
                }
                if (vo.type >= TextJumpType.N_BEATBACK && vo.type <= TextJumpType.N_ZHUOSHAO) {
                    this._width = this.drawTxtBytext(vo, tl3d.UIData.publicsUi);
                }
            }
        };
        TextJumpUiDrawAndRefreash.prototype.drawCritTxt = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor;
            if ($vo.type == TextJumpType.N_CRIT) {
                txtcolor = tl3d.ArtFont.num77;
                $width = 68;
                $height = 36;
            }
            if ($vo.type == TextJumpType.N_RESISTANCE) {
                txtcolor = tl3d.ArtFont.num81;
                $width = 68;
                $height = 36;
            }
            var distion = tl3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            var maxh = Math.max(distion, $width);
            var sx = rec.pixelWitdh - (maxh / 2) - ($width / 2);
            var sxtxt = rec.pixelWitdh - (maxh / 2) - (distion / 2);
            var sy = 0;
            tl3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new tl3d.Rectangle(sx, sy, $width, $height), tl3d.UIData.publicsUi);
            sy = rec.pixelHeight - 35;
            tl3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, sxtxt, sy);
            tl3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return maxh;
        };
        TextJumpUiDrawAndRefreash.prototype.drawTxtBytext = function ($vo, $key) {
            if ($key === void 0) { $key = tl3d.UIData.publicUi; }
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $length = 84;
            var sheight = 44;
            if ($vo.type == TextJumpType.N_ONCEATTACK || $vo.type == TextJumpType.N_DOWNHP) {
                $length = 167;
            }
            else if ($vo.type == TextJumpType.N_CRIT_RATE_UP || $vo.type == TextJumpType.N_CRIT_RATE_DOWN) {
                $length = 156;
            }
            else if ($vo.type == TextJumpType.N_RESIST_RATE_UP || $vo.type == TextJumpType.N_RESIST_RATE_DOWN
                || $vo.type == TextJumpType.N_ATTACK_UP || $vo.type == TextJumpType.N_ATTACK_DOWN
                || $vo.type == TextJumpType.N_SPEED_UP || $vo.type == TextJumpType.N_SPEED_DOWN
                || $vo.type == TextJumpType.N_HIT_UP || $vo.type == TextJumpType.N_HIT_UP
                || $vo.type == TextJumpType.N_DEFENSE_UP || $vo.type == TextJumpType.N_DEFENSE_DOWN) {
                $length = 115;
            }
            tl3d.UiDraw.cxtDrawImg(ctx, "TYPE" + $vo.type, new tl3d.Rectangle(rec.pixelWitdh - $length, rec.pixelHeight - sheight, $length, sheight), $key);
            tl3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return $length;
        };
        TextJumpUiDrawAndRefreash.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = tl3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor;
            if ($vo.type == TextJumpType.ATTACKREDUCE) {
                picid = TextJumpType.ATTACKADD;
                txtcolor = tl3d.ArtFont.num53;
            }
            else if ($vo.type == TextJumpType.ATTACKADD) {
                txtcolor = tl3d.ArtFont.num54;
            }
            else if ($vo.type == TextJumpType.EXPERIENCE) {
                txtcolor = tl3d.ArtFont.num54;
            }
            else if ($vo.type == TextJumpType.CRIT) {
                txtcolor = tl3d.ArtFont.num55;
                $width = 78;
                $height = 50;
            }
            else if ($vo.type == TextJumpType.CRITUP) {
                picid -= 10;
                $width = 78;
                $height = 50;
                txtcolor = tl3d.ArtFont.num55;
            }
            if ($vo.type == TextJumpType.N_PASSIVE) {
                txtcolor = tl3d.ArtFont.num76;
                $width = 84;
                $height = 44;
            }
            var distion = tl3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            var sx = rec.pixelWitdh - distion;
            // let sy: number = 0;
            var sy = rec.pixelHeight - $height;
            tl3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new tl3d.Rectangle(sx, sy, $width, $height), $vo.type >= TextJumpType.N_NORMALDAMAGE ? tl3d.UIData.publicsUi : tl3d.UIData.publicUi);
            tl3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, sx + $width + 2, sy + 6);
            tl3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            return distion;
        };
        TextJumpUiDrawAndRefreash.prototype.update = function () {
            if (this._data) {
                this.time = tl3d.TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
                // if (this.time > this.dtime) {
                //     this.ui.parent.removeChild(this.ui);
                //     this._data = null;
                //     return;
                // }
                // this.time++;
                var vo = this._data;
                // var $ty: number = MathClass.easeInOut(this.time / this.dtime, 0, 20, 1)
                //变化
                var $ary = this.changerules(this.time);
                this.ui.width = 256 * $ary[2];
                this.ui.height = 64 * $ary[3];
                this.ui.y = $ary[1] - this.ui.height;
                // let w1 = this.ui.width >> 1;
                // let posx: number = $ary[0]
                // if (posx < 0 && (vo.type == TextJumpType.N_UPHP || vo.type == TextJumpType.N_CRIT || vo.type == TextJumpType.N_PASSIVE)) {
                //     let x1 = w1 + posx;
                //     let x2 = this._width >> 1;
                //     if (x2 > x1) {
                //         posx += x2 - x1;
                //     }
                // }
                // let cx = $ary[0] + this.ui.width
                // let w1 = Math.max(cx,0);
                // w1 = w1 + (this._width * $ary[2]) - this.ui.width;
                // let maxh = Laya.stage.width - this.ui.width;
                // // let w1 = Math.max($ary[0],0);
                // // let maxh = Laya.stage.width - this._width;
                // w1 = Math.min(w1,maxh);
                this.ui.x = $ary[0];
                this.ui.alpha = $ary[4];
            }
        };
        TextJumpUiDrawAndRefreash.prototype.changerules = function (t) {
            var vo = this._data;
            //当前处于哪一帧
            // let totalt = (vo.endtime - vo.starttime)/ 1000 * 60;
            t = (t - vo.starttime) / 1000 * 60;
            var changevo = new Array();
            var v2d = this.Vector3DToVector2D(new tl3d.Vector3D(this.pos.x, this.pos.y, this.pos.z));
            // if (t < 0) {
            //     v2d.x = -9999
            // }
            if (vo.type == tl3d.TextJumpType.EXPERIENCE) {
                v2d.x = 300 / tl3d.UIData.Scale;
                v2d.y = tl3d.Scene_data.stageHeight / tl3d.UIData.Scale - 50;
            }
            var posx;
            var posy;
            var scalex;
            var scaley;
            var alpha;
            //选定初始化飘字位置 
            switch (vo.type) {
                case tl3d.TextJumpType.NORMALDAMAGE:
                case tl3d.TextJumpType.MYNORMALDAMAGE:
                    //头顶
                    posx = v2d.x;
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.3 + 0.2;
                        if (scalex > 1.5) {
                            scalex = 1.5;
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 6;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 6;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 20;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 72) {
                        if (t < 50) {
                            posy = this._lastchange[1] - 2;
                        }
                        else {
                            posy = this._lastchange[1] + 2;
                        }
                        posx = this._lastchange[0] - 1.5;
                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 100;
                        if (alpha < 0) {
                            alpha = 0;
                        }
                    }
                    break;
                case tl3d.TextJumpType.CRIT:
                    //暴击
                    posx = v2d.x;
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.3 + 0.2;
                        if (scalex > 1.5) {
                            scalex = 1.5;
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 6;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 4;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 20;
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1;
                        }
                    }
                    else if (t < 100) {
                        if (t < 50) {
                            posy = this._lastchange[1] - 2;
                        }
                        else {
                            posy = this._lastchange[1] + 2;
                        }
                        posx = this._lastchange[0] - 1.5;
                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 100;
                        if (alpha < 0) {
                            alpha = 0;
                        }
                    }
                    break;
                case tl3d.TextJumpType.NORMALDAMAGEUP:
                case tl3d.TextJumpType.CRITUP:
                case tl3d.TextJumpType.MYNORMALDAMAGEUP:
                    //头顶
                    posx = v2d.x;
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.5 + 0.2;
                        if (scalex > 1.7) {
                            scalex = 1.7;
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5;
                        }
                    }
                    else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 4;
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5;
                        }
                    }
                    else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 4;
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5;
                        }
                    }
                    else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 15;
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 80;
                        if (alpha < 0) {
                            alpha = 0;
                        }
                    }
                    break;
                case tl3d.TextJumpType.TREATMENT:
                    //头顶
                    posx = v2d.x;
                    posy = v2d.y - (t * 1.5);
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 0.8 + 0.2;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    }
                    else if (t < 60) {
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 11) / 48);
                    }
                    break;
                case tl3d.TextJumpType.EXPERIENCE:
                    //玩家名
                    posy = v2d.y -= 15;
                    posy = posy - (t * 0.5);
                    if (t < 40) {
                        // posx = v2d.x - (t * 0.9);
                        // scalex = (Math.ceil(t) / 40) * 0.3 + 0.5;
                        // scaley = scalex;
                        posx = v2d.x;
                        scalex = 1.3;
                        scaley = 1.3;
                        alpha = 1;
                    }
                    else if (t < 60) {
                        // posx = v2d.x - (40 * 0.9);
                        // scalex = this._lastchange[2];
                        // scaley = scalex;
                        posx = v2d.x;
                        scalex = 1.3;
                        scaley = 1.3;
                        alpha = 1 - ((t - 39) / 20);
                    }
                    break;
                case tl3d.TextJumpType.ATTACKADD:
                case tl3d.TextJumpType.ATTACKREDUCE:
                    //右边
                    posx = v2d.x += 110;
                    posy = v2d.y - (t * 1.8);
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 1.3 + 0.1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    }
                    else if (t < 24) {
                        scalex = 1.4 - ((t - 11) / 12) * 0.4;
                        scaley = scalex;
                        alpha = 1;
                    }
                    else if (t < 60) {
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 23) / 36);
                    }
                    break;
                case tl3d.TextJumpType.DODGE:
                case tl3d.TextJumpType.MISS:
                case tl3d.TextJumpType.VERTIGO:
                case tl3d.TextJumpType.FREEZE:
                    //左边
                    posx = v2d.x -= 50;
                    if (t < 12) {
                        posy = v2d.y - (t * 3);
                        scalex = 1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12);
                    }
                    else if (t < 36) {
                        posy = v2d.y - (33);
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1;
                    }
                    else if (t < 72) {
                        posy = v2d.y - 33 - ((t - 36) * 1.5);
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 35) / 36);
                    }
                    break;
                //新增
                case TextJumpType.N_NORMALDAMAGE:
                case TextJumpType.N_UPHP:
                case TextJumpType.N_CRIT:
                case TextJumpType.N_RESISTANCE:
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 1.1 + 0.1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    }
                    else if (t < 24) {
                        scalex = this._lastchange[2] - 0.008;
                        scaley = scalex;
                        alpha = 1;
                    }
                    else if (t < 60) {
                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = 1 - ((t - 23) / 36);
                    }
                    posy = v2d.y - (t * 1.5);
                    posx = v2d.x + 60 - (256 * scalex) / 2;
                    break;
                default:
                    break;
            }
            if (vo.type == TextJumpType.N_IMMUNE ||
                vo.type == TextJumpType.N_ONCEATTACK ||
                vo.type == TextJumpType.N_RESURGENCE ||
                vo.type == TextJumpType.N_RESISTANCES ||
                vo.type == TextJumpType.N_PASSIVE ||
                (vo.type >= TextJumpType.N_BEATBACK && vo.type <= TextJumpType.N_ZHUOSHAO)) {
                var down = vo.type >= TextJumpType.N_CRIT_RATE_DOWN && vo.type <= TextJumpType.N_HIT_DOWN;
                posx = v2d.x - 45;
                if (t < 12) {
                    posy = down ? v2d.y + (t * 3) : v2d.y - (t * 3);
                    scalex = 0.8;
                    scaley = scalex;
                    alpha = (Math.ceil(t) / 12);
                }
                else if (t < 36) {
                    posy = this._lastchange[1];
                    scalex = 0.8;
                    scaley = scalex;
                    alpha = 1;
                }
                else if (t < 72) {
                    posy = down ? this._lastchange[1] + 0.05 : this._lastchange[1] - 0.05;
                    scalex = 0.8;
                    scaley = scalex;
                    alpha = 1 - ((t - 35) / 36);
                }
            }
            changevo.push(posx);
            changevo.push(posy);
            changevo.push(scalex);
            changevo.push(scaley);
            changevo.push(alpha);
            changevo.push(v2d.x);
            changevo.push(v2d.y);
            //保存上一次变化
            this._lastchange = changevo;
            return changevo;
        };
        return TextJumpUiDrawAndRefreash;
    }(tl3d.Disp2DBaseText));
    tl3d.TextJumpUiDrawAndRefreash = TextJumpUiDrawAndRefreash;
    var CharNameUiVo = /** @class */ (function (_super) {
        __extends(CharNameUiVo, _super);
        function CharNameUiVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tempMatrix = new tl3d.Matrix3D;
            return _this;
        }
        CharNameUiVo.prototype.makeData = function () {
            if (this._data) {
                this.charNameMeshVo = this.data;
                if (this.lastKey != this.charNameMeshVo.name) {
                    this.ui.width = 256 * 0.7;
                    this.ui.height = 22 * 0.7;
                    this.lastKey = this.charNameMeshVo.name;
                    tl3d.LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, this.charNameMeshVo.name, this.charNameMeshVo.size, tl3d.TextAlign.CENTER, this.charNameMeshVo.color, this.charNameMeshVo.scolor);
                }
                this.charNameMeshVo.needDraw = false;
            }
        };
        CharNameUiVo.prototype.update = function () {
            if (this.charNameMeshVo) {
                if (this.charNameMeshVo.needDraw) {
                    this.makeData();
                }
                if (this.charNameMeshVo.pos) {
                    if (this.charNameMeshVo.visible) {
                        if (this.needUpData(this.charNameMeshVo.pos) || this.charNameMeshVo.visibleChange) {
                            var m = tl3d.Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(tl3d.Scene_data.viewMatrx3D);
                            var p = m.transformVector(this.charNameMeshVo.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (tl3d.Scene_data.stageWidth / 2) / tl3d.UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (tl3d.Scene_data.stageHeight / 2) / tl3d.UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this.charNameMeshVo.pos.x;
                            this.oldPos.y = this.charNameMeshVo.pos.y;
                            this.charNameMeshVo.visibleChange = false;
                        }
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this.charNameMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return CharNameUiVo;
    }(tl3d.Disp2DBaseText));
    tl3d.CharNameUiVo = CharNameUiVo;
    var CharTitleUiVo = /** @class */ (function (_super) {
        __extends(CharTitleUiVo, _super);
        function CharTitleUiVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tempMatrix = new tl3d.Matrix3D;
            return _this;
        }
        CharTitleUiVo.prototype.makeData = function () {
            var _this = this;
            if (this._data) {
                this._charTitleMeshVo = this.data;
                //LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, "ccav", 22, TextAlign.CENTER, "#ffffff");
                // this.parent.uiAtlas.upDataPicToTexture(getUItittleUrl(String(this._charTitleMeshVo.num)), this.textureStr)
                tl3d.LoadManager.getInstance().load(tl3d.Scene_data.fileRoot + getUItittleUrl(String(this._charTitleMeshVo.num)), tl3d.LoadManager.IMG_TYPE, function ($img) {
                    var $uiRec = _this.parent.uiAtlas.getRec(_this.textureStr);
                    _this.parent.uiAtlas.ctx = tl3d.UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                    var $minScale = Math.min($uiRec.pixelWitdh / $img.width, $uiRec.pixelHeight / $img.height);
                    $minScale = Math.min($minScale, 1);
                    var $tw = $img.width * $minScale;
                    var $th = $img.height * $minScale;
                    _this.parent.uiAtlas.ctx.drawImage($img, ($uiRec.pixelWitdh - $tw) / 2, ($uiRec.pixelHeight - $th) / 2, $tw, $th);
                    tl3d.TextureManager.getInstance().updateTexture(_this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, _this.parent.uiAtlas.ctx);
                });
            }
        };
        CharTitleUiVo.prototype.update = function () {
            if (this._charTitleMeshVo) {
                if (this._charTitleMeshVo.needDraw) {
                    this.makeData();
                    this._charTitleMeshVo.needDraw = false;
                }
                if (this._charTitleMeshVo.pos) {
                    if (this._charTitleMeshVo.visible) {
                        if (this.needUpData(this._charTitleMeshVo.pos)) {
                            var m = tl3d.Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(tl3d.Scene_data.viewMatrx3D);
                            var p = m.transformVector(this._charTitleMeshVo.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (tl3d.Scene_data.stageWidth / 2) / tl3d.UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (tl3d.Scene_data.stageHeight / 2) / tl3d.UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this._charTitleMeshVo.pos.x;
                            this.oldPos.y = this._charTitleMeshVo.pos.y;
                        }
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this._charTitleMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return CharTitleUiVo;
    }(tl3d.Disp2DBaseText));
    tl3d.CharTitleUiVo = CharTitleUiVo;
    var baseMeshVo = /** @class */ (function () {
        function baseMeshVo() {
            this._visible = true;
            this.visibleChange = false;
            this.clear = false;
        }
        Object.defineProperty(baseMeshVo.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                this.visibleChange = true;
            },
            enumerable: true,
            configurable: true
        });
        return baseMeshVo;
    }());
    tl3d.baseMeshVo = baseMeshVo;
})(tl3d || (tl3d = {}));
// module Pan3d {
// export class BloodUIShader extends Shader3D {
//     static BloodUIShader: string = "BloodUIShader";
//     constructor() {
//         super();
//     }
//     binLocation($context: WebGLRenderingContext): void {
//         $context.bindAttribLocation(this.program, 0, "v3Pos");
//         $context.bindAttribLocation(this.program, 1, "v2uv");
//     }
//     getVertexShaderString(): string {
//         var $str: string =
//             "attribute vec3 v3Pos;" +
//             "attribute vec3 v2uv;" +
//             "uniform vec4 ui[30];" +
//             "uniform vec4 lifenum[30];" +
//             "varying vec2 v_texCoord;\n" +
//             "varying vec4 v_lifenum;\n" +
//             "void main(void)" +
//             "{" +
//             " v_lifenum = lifenum[int(v2uv.z)];" +
//             " v_texCoord = vec2(v2uv.x , v2uv.y );" +
//             " vec4  data = ui[int(v2uv.z)];" +
//             "   vec3 pos = vec3(0.0,0.0,0.0);" +
//             "   pos.xy = v3Pos.xy *data.zw * 2.0;" +
//             "   pos.x += data.x * 2.0 - 1.0;" +
//             "   pos.y += -data.y * 2.0 + 1.0;" +
//             "   vec4 vt0= vec4(pos, 1.0);" +
//             "   gl_Position = vt0;" +
//             "}"
//         return $str
//     }
//     getFragmentShaderString(): string {
//         var $str: string =
//             "precision mediump float;\n" +
//             "uniform sampler2D s_texture;\n" +
//             "varying vec2 v_texCoord;\n" +
//             "varying vec4 v_lifenum;\n" +
//             "void main(void)\n" +
//             "{\n" +
//             "vec2  v_uv = v_texCoord;" +
//             "if(v_texCoord.x<v_lifenum.x){;\n" +
//             "v_uv.y = v_uv.y+10.0/3.0;" +
//             "}else{;\n" +
//             "if(v_texCoord.x<v_lifenum.x+v_lifenum.z){;\n" +
//             "v_uv.y = v_uv.y+10.0/3.0+10.0/3.0;" +
//             "};\n" +
//             "};\n" +
//             "vec4 infoUv = texture2D(s_texture, v_uv.xy);\n" +
//             "infoUv.xyz *= infoUv.w;\n" +
//             "gl_FragColor = infoUv;\n" +
//             "}"
//         return $str
//     }
// }
// export class BloodUICompenent extends UICompenent {
//     public constructor() {
//         super();
//     }
//     public pushVaData(objData: ObjData, i: number, beginIndex: number): number {
//         objData.vertices.push(
//             0, 0, 0,
//             1, 0, 0,
//             1, -1, 0,
//             0, -1, 0);
//         objData.uvs.push(
//             0, 0, i,
//             1, 0, i,
//             1, 3 / 10, i,
//             0, 3 / 10, i);
//         objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
//         return beginIndex + 4;
//     }
//     public lifeNum: number = 100;
//     public midNum: number = 0.3;
//     public colortype: number = 0;  //0,1,2;
// }
// export class BloodDisp2DBaseText extends Disp2DBaseText {
//     private bloodLineMeshVo: BloodLineMeshVo
//     public makeData(): void {
//         if (this._data) {
//             this.bloodLineMeshVo = <BloodLineMeshVo>this.data;
//         }
//     }
//     private tempMatrix: Matrix3D = new Matrix3D;
//     public update(): void {
//         if (this.bloodLineMeshVo) {
//             if (this.bloodLineMeshVo.pos) {
//                 if (this.bloodLineMeshVo.visible) {
//                     if (this.needUpData(this.bloodLineMeshVo.pos) || this.bloodLineMeshVo.visibleChange) {
//                         var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
//                         m.append(Scene_data.viewMatrx3D);
//                         var p: Vector3D = m.transformVector(new Vector3D(this.bloodLineMeshVo.pos.x, this.bloodLineMeshVo.pos.y, this.bloodLineMeshVo.pos.z))
//                         this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
//                         this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2 + this.bloodLineMeshVo.offsety;
//                         this.ui.x += this.bloodLineMeshVo.posx;
//                         this.bloodLineMeshVo.visibleChange = false
//                     }
//                     (<BloodUICompenent>this.ui).lifeNum = this.bloodLineMeshVo.num;
//                     (<BloodUICompenent>this.ui).midNum = this.bloodLineMeshVo.midNum;
//                     (<BloodUICompenent>this.ui).colortype = this.bloodLineMeshVo.colortype;
//                 } else {
//                     this.ui.x = 10000
//                 }
//             }
//             if (this.bloodLineMeshVo.clear) {
//                 this.ui.parent.removeChild(this.ui);
//                 this._data = null;
//             }
//         }
//     }
// }
// export class BloodUIRenderComponent extends UIRenderComponent {
//     public constructor() {
//         super();
//     }
//     protected initData(): void {
//         this._uiList = new Array;
//         this.objData = new ObjData();
//         ProgrmaManager.getInstance().registe(BloodUIShader.BloodUIShader, new BloodUIShader)
//         this.shader = ProgrmaManager.getInstance().getProgram(BloodUIShader.BloodUIShader);
//         this.program = this.shader.program;
//         this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
//         this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "lifenum")
//     }
//     private nextTime: number = 0
//     public update(): void {
//         if (!this.visible || this._uiList.length == 0) {
//             return;
//         }
//         // //console.log(this._uiList.length);
//         Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
//         Scene_data.context3D.setProgram(this.program);
//         if (this.nextTime < TimeUtil.getTimer() || this.renderData2.length != this._uiList.length * 4) {
//             if (this.renderData2.length != this._uiList.length * 4) {
//                 this.renderData2 = new Float32Array(this._uiList.length * 4);
//             }
//             for (var i: number = 0; i < this._uiList.length; i++) {
//                 var $bloodUICompenent: BloodUICompenent = <BloodUICompenent>this._uiList[i];
//                 var a: number = $bloodUICompenent.lifeNum / 100;
//                 var b: number = ($bloodUICompenent.colortype + 1) * 8 / 32;
//                 this.renderData2[i * 4 + 0] = a;
//                 this.renderData2[i * 4 + 1] = b;
//                 this.renderData2[i * 4 + 2] = $bloodUICompenent.midNum;
//                 this.renderData2[i * 4 + 3] = 0.8;
//             }
//             this.nextTime = TimeUtil.getTimer()
//         }
//         Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
//         Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);
//         Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
//         Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
//         if (this.uiAtlas) {
//             Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
//         }
//         Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
//         if (this.modelRenderList) {
//             for (var i: number = 0; i < this.modelRenderList.length; i++) {
//                 this.modelRenderList[i].update();
//             }
//         }
//     }
//     public creatBaseComponent($skinName: string): BloodUICompenent {
//         var ui: BloodUICompenent = new BloodUICompenent();
//         ui.tr.setRec(new UIRectangle(0, 0, 1, 1));
//         ui.width = 64;
//         ui.height = 10;
//         ui.uiRender = this;
//         ui.lifeNum = 100
//         return ui;
//     }
//     public makeRenderDataVc($vcId: number): void {
//         if (!this.renderData || (this.renderData && this.renderData.length != this._uiList.length * 4)) {
//             this.renderData = new Float32Array(this._uiList.length * 4);
//         }
//         if ($vcId == -1) {
//             for (var i: number = 0; this._uiList && i < this._uiList.length; i++) {
//                 this._uiList[i].vcId = i;
//                 this.renderData[i * 4 + 0] = this._uiList[i].renderData[0];
//                 this.renderData[i * 4 + 1] = this._uiList[i].renderData[1];
//                 this.renderData[i * 4 + 2] = this._uiList[i].renderData[2];
//                 this.renderData[i * 4 + 3] = this._uiList[i].renderData[3];
//             }
//         } else {
//             if ($vcId < this._uiList.length) {
//                 this.renderData[$vcId * 4 + 0] = this._uiList[$vcId].renderData[0];
//                 this.renderData[$vcId * 4 + 1] = this._uiList[$vcId].renderData[1];
//                 this.renderData[$vcId * 4 + 2] = this._uiList[$vcId].renderData[2];
//                 this.renderData[$vcId * 4 + 3] = this._uiList[$vcId].renderData[3];
//             }
//         }
//     }
// }
// export class BloodLineUIConatiner extends UIConatiner {
//     private _baseRender: BloodUIRenderComponent;
//     public constructor() {
//         super();
//         this.width = UIData.designWidth;
//         this.height = UIData.designHeight;
//         this._baseRender = new BloodUIRenderComponent();
//         this.addRender(this._baseRender);
//         this._baseRender.uiAtlas = new UIAtlas
//         this._baseRender.uiAtlas.configData = new Array;
//         this._uiItem = new Array();
//         this.loadBloodTexture()
//     }
//     private loadBloodTexture(): void {
//         TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/blood.png", ($textureRes: TextureRes) => {
//             this._baseRender.uiAtlas.textureRes = $textureRes
//         });
//     }
//     protected _uiItem: Array<BloodDisp2DBaseText>;
//     public update(t: number): void {
//         if (this._baseRender.uiAtlas.textureRes) {
//             for (var i: number = 0; i < this._uiItem.length; i++) {
//                 if (this._uiItem[i].data) {
//                     this._uiItem[i].update();
//                 }
//             }
//         }
//     }
//     public removeChild($ui: UICompenent): void {
//         for (var i: number = 0; i < this._uiItem.length; i++) {
//             if (this._uiItem[i].ui == $ui) {
//                 this._uiItem.splice(i, 1);
//                 break;
//             }
//         }
//         super.removeChild($ui);
//     }
//     public clearOneTemp(): void {
//         while (this._uiItem.length > 25) {
//             this.removeChild(this._uiItem[0].ui)
//         }
//     }
//     public showTemp($data: any): void {
//         if (this._uiItem.length >= 40) {
//             //console.log("超过50。暂时设置不可再添加");
//             return
//         }
//         var $BloodDisp2DBaseText: BloodDisp2DBaseText = new BloodDisp2DBaseText;
//         $BloodDisp2DBaseText.parent = this._baseRender;
//         $BloodDisp2DBaseText.ui = <UICompenent>this._baseRender.creatBaseComponent("test");
//         $BloodDisp2DBaseText.data = $data;
//         this.addChild($BloodDisp2DBaseText.ui);
//         this._uiItem.push($BloodDisp2DBaseText);
//     }
//     //清理单元内的内容并需要将对象移出显示队例
//     public clearTemp($data: any): void {
//         for (var i: number = 0; i < this._uiItem.length; i++) {
//             if (this._uiItem[i].data == $data) {
//                 this._uiItem[i].data = null
//                 this.removeChild(this._uiItem[i].ui);
//                 break
//             }
//         }
//     }
// }
// }
(function (tl3d) {
    var CharTitleMeshVo = /** @class */ (function (_super) {
        __extends(CharTitleMeshVo, _super);
        function CharTitleMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CharTitleMeshVo.prototype.destory = function () {
            this.pos = null;
            this._num = null;
            this.clear = true;
        };
        Object.defineProperty(CharTitleMeshVo.prototype, "num", {
            get: function () {
                return this._num;
            },
            set: function (value) {
                this._num = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        return CharTitleMeshVo;
    }(tl3d.baseMeshVo));
    tl3d.CharTitleMeshVo = CharTitleMeshVo;
    var CharNameMeshVo = /** @class */ (function (_super) {
        __extends(CharNameMeshVo, _super);
        function CharNameMeshVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.color = '#ffffff'; //字体颜色
            _this.scolor = ''; //描边颜色
            _this.size = 20; //字号大小
            return _this;
        }
        Object.defineProperty(CharNameMeshVo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        CharNameMeshVo.prototype.destory = function () {
            this.pos = null;
            this._name = null;
            this.needDraw = null;
            this.clear = true;
        };
        return CharNameMeshVo;
    }(tl3d.baseMeshVo));
    tl3d.CharNameMeshVo = CharNameMeshVo;
    var BloodLineMeshVo = /** @class */ (function (_super) {
        __extends(BloodLineMeshVo, _super);
        function BloodLineMeshVo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.posx = -5;
            _this.offsety = 0;
            return _this;
        }
        BloodLineMeshVo.prototype.destory = function () {
            this.pos = null;
            this.num = null;
            this.colortype = null;
            this.offsety = 0;
            // this.clear = true
        };
        return BloodLineMeshVo;
    }(tl3d.baseMeshVo));
    tl3d.BloodLineMeshVo = BloodLineMeshVo;
    var JumpTextMeshVo = /** @class */ (function (_super) {
        __extends(JumpTextMeshVo, _super);
        function JumpTextMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JumpTextMeshVo.prototype.destory = function () {
            this.pos = null;
            this.clear = true;
        };
        return JumpTextMeshVo;
    }(tl3d.baseMeshVo));
    tl3d.JumpTextMeshVo = JumpTextMeshVo;
    var JumpTxtContianerPanel = /** @class */ (function (_super) {
        __extends(JumpTxtContianerPanel, _super);
        function JumpTxtContianerPanel($classVo, $rect, $num) {
            return _super.call(this, $classVo, $rect, $num) || this;
        }
        return JumpTxtContianerPanel;
    }(tl3d.Dis2DUIContianerPanel));
    tl3d.JumpTxtContianerPanel = JumpTxtContianerPanel;
    var BloodManager = /** @class */ (function () {
        function BloodManager() {
            this.uiContianerItem = new Array();
            // this._charTitleContianerPanel = new Dis2DUIContianerPanel(Pan3d.CharTitleUiVo, new Rectangle(0, 0, 131, 69), 10);
            this._charNameContianerPanel = new tl3d.Dis2DUIContianerPanel(tl3d.CharNameUiVo, new tl3d.Rectangle(0, 0, 256, 22), 10);
            this._jumpTxtContianerPanel = new tl3d.AlphaUiContianer(tl3d.TextJumpUiDrawAndRefreash, new tl3d.Rectangle(0, 0, 256, 64), 16);
            // this._expjumpTxtContianerPanel = new AlphaUiContianer(Pan3d.ExpTextJumpUiDrawAndRefreash, new Rectangle(0, 0, 512, 100), 5);
            // this._bloodLineUIConatiner = new Pan3d.BloodLineUIConatiner();
            // this.uiContianerItem.push(this._charTitleContianerPanel)
            // this.uiContianerItem.push(this._bloodLineUIConatiner);
            this.uiContianerItem.push(this._charNameContianerPanel);
            this.uiContianerItem.push(this._jumpTxtContianerPanel);
            // this.uiContianerItem.push(this._expjumpTxtContianerPanel);
            this.resize();
        }
        BloodManager.prototype.clearOneTemp = function () {
            for (var i = 0; i < this.uiContianerItem.length; i++) {
                this.uiContianerItem[i].clearOneTemp();
            }
        };
        // public getCharTitleMeshVo(value: number = 0): CharTitleMeshVo {
        //     var $vo: CharTitleMeshVo = new CharTitleMeshVo;
        //     $vo.num = value;
        //     $vo.pos = new Vector3D(0, 50, 0);
        //     this._charTitleContianerPanel.showTemp($vo);
        //     return $vo;
        // }
        BloodManager.prototype.getCharNameMeshVo = function (value) {
            if (value === void 0) { value = "测试名"; }
            var $vo = new CharNameMeshVo;
            $vo.name = value;
            $vo.pos = new tl3d.Vector3D(0, 50, 0);
            this._charNameContianerPanel.showTemp($vo);
            return $vo;
        };
        // public getBloodLineMeshVo(): BloodLineMeshVo {
        //     var $vo: BloodLineMeshVo = new BloodLineMeshVo;
        //     $vo.num = 100;
        //     $vo.midNum = 0;
        //     $vo.colortype = 0
        //     $vo.pos = new Vector3D(0, 50, 0);
        //     // this._bloodLineUIConatiner.showTemp($vo);
        //     return $vo;
        // }
        // public clearBloodLineMeshVo($vo: BloodLineMeshVo) {
        //     // this._bloodLineUIConatiner.clearTemp($vo);
        // }
        BloodManager.prototype.setJumpNum = function ($textJumpUiVo) {
            // if (!$color) {
            //     $color = $num > 0 ? ArtFont.Green : ArtFont.Red
            // }
            // var $str: string = String($num)
            // if ($num > 0) {
            //     $str = "+" + $str
            // }
            // //console.log("---111");
            this._jumpTxtContianerPanel.showTemp($textJumpUiVo);
        };
        // public setExpJumpNum($textJumpUiVo: Pan3d.TextJumpUiVo): void {
        //     this._expjumpTxtContianerPanel.showTemp($textJumpUiVo);
        // }
        BloodManager.prototype.update = function () {
            for (var i = 0; i < this.uiContianerItem.length; i++) {
                this.uiContianerItem[i].update(0);
                for (var j = 0; j < this.uiContianerItem[i].renderList.length; j++) {
                    this.uiContianerItem[i].renderList[j].update();
                }
            }
        };
        BloodManager.prototype.resize = function () {
            this._jumpTxtContianerPanel.resize();
            for (var j = 0; j < this.uiContianerItem.length; j++) {
                this.uiContianerItem[j].resize();
            }
            tl3d.Scene_data.cam3D.needChange = true;
            //this.update();
        };
        return BloodManager;
    }());
    tl3d.BloodManager = BloodManager;
})(tl3d || (tl3d = {}));
