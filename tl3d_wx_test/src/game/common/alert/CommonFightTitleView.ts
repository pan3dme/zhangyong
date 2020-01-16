/*
* name;
*/
module common {
    export class CommonFightTitleView extends ui.component.CommonFightTitleUI{
        constructor(){
            super();
            this.closeTitle();
        }

        /**
	    *显示战斗标题
	    *@param isWin 是否胜利
        *@param titleSkin 标题图片
        *@param showStar 显示星星
        *@param showHg 显示皇冠
        *@param showLight 显示底部光圈旋转特效
	    */
        private _isShow:boolean = false;
        private _isWin:boolean = false;
        private _isShowStar:boolean = false;
        private _isShowHg:boolean = false;
        private _isShowLight:boolean = false;
        private _callBack:Laya.Handler;
        private _titleparent:Sprite;
        private _isNoClose:boolean = false;
        public showTitle(isWin:boolean, titleSkin:string, showStar:boolean = true, showHg:boolean = true, showLight:boolean = true, callback:Laya.Handler =null, tparent:Sprite =null, noClose:boolean = true):void{
            this.closeTitle(false);
            this._isWin = isWin;
            this._isShowStar = showStar;
            this._isShowHg = showHg;
            this._isShowLight = showLight;
            this._callBack = callback;
            this._titleparent = tparent;
            this._isShow = true;
            this._isNoClose = noClose;

            if (tparent){
                this.bg.width = this._titleparent.width+40;
                this.bg.height = this._titleparent.height - this.bg.y;
                if (this._titleparent["box_content"]){
                    this._titleparent["box_content"].visible = false;
                }
            }
            if (noClose){
                let tp:DialogExt = (tparent || this.parent) as DialogExt;
                if (tp) tp.isModelClose = false;
            }
            this.img_title.skin = titleSkin;
            if (isWin){
                //胜利
                this.img_dao_l.skin = this.img_dao_r.skin = "zhandoubiaoxian/dao.png";
                this.img_hf.skin = "comp/image/caidai.png";
                this.img_zs.skin = "comp/image/zhuangshi.png";
                this.bg.skin = "zhandoubiaoxian/hongsedi.png";
                if (showHg){
                    this.img_hg_bg.skin = "zhandoubiaoxian/di.png";
                    this.img_hg.skin = "zhandoubiaoxian/huangguan.png";
                    this.img_hg.top = -94;
                    this.img_hg.rotation = 0;
                }
            }else{
                //失败
                this.img_dao_l.skin = this.img_dao_r.skin = "zhandoubiaoxian/dao2.png"; 
                this.img_hf.skin = "zhandoubiaoxian/caidai2.png";
                this.img_zs.skin = "zhandoubiaoxian/zhuangshi2.png";
                this.bg.skin = "zhandoubiaoxian/lansedi.png";
                if (showHg){
                    this.img_hg_bg.skin = "zhandoubiaoxian/di2.png";
                    this.img_hg.skin = "zhandoubiaoxian/huangguan2.png";
                    this.img_hg.top = -80;
                    this.img_hg.rotation = 18;
                }
                
            }

            this._step = 0;
            Laya.timer.loop(30, this, this.update);
        }

        private _step:number = 0;
        private _cdTime:number = 0;
        private update():void{
            if (this._isWin){

                this._cdTime -= 30;
                if (this._cdTime <= 0){
                    if (this._step == 0 && !this.box_cb.visible){
                        this._step = 1;
                        this.box_cb.visible = true;
                        this.ani_cb_zk.play(0, false);
                        this.img_dao_l.visible = true;
                        this.img_dao_r.visible = true;
                        this.ani_dao.play(0,false);
                        this.ani_bg_sf.play(0, false);
                        if (this._isShowStar){
                            this.ani_star.visible = true;
                            this.ani_star.play(0, false);
                        }
                        this._cdTime = 100;
                    }else if (this._step == 1 && !this.img_hg_bg.visible){
                        this._step = 2;
                        if (this._isShowHg){
                            this.img_hg_bg.visible = true;
                            this.img_hg.visible = true;
                            this.ani_hg_fd.play();
                        }
                        if (this._isShowLight){
                            this.box_light_eff.visible = true;
                            this.eff_guang.play();
                        }

                        if (this._isShowHg || this._isShowLight){
                            this._cdTime = 200;
                        }

                        if (this._titleparent && this._titleparent["box_content"]){
                            this._titleparent["box_content"].visible = true;
                        }
                    }else if (this._step >= 2){
                        //结束拉
                        this.endUpdate();
                    }
                }
                if (this._step > 0 && !this.ani_cb_zk.isPlaying){
                    this.ani_cb_hd.play();
                }
                if (this._isShowStar && this._step > 0 && !this.ani_star.isPlaying){
                    this.box_star.visible = true;
                    this.ani_star.visible = false;
                    this.ani_xx_xz.play();
                }
            }else{
                //失败
                this._cdTime -= 30;
                if (this._cdTime <= 0){
                    if (this._step == 0 && !this.box_cb.visible){
                        this._step = 1;
                        this.box_cb.visible = true;
                        this.ani_cb_dx.play(0, false);
                        this.img_dao_l.visible = true;
                        this.img_dao_r.visible = true;
                        this.ani_dao.play(0,false);
                        this.ani_bg_sf.play(0, false);
                        this._cdTime = 100;
                    }else if (this._step == 1 && !this.img_hg_bg.visible){
                        this._step = 2;
                        if (this._isShowHg){
                            this.img_hg_bg.visible = true;
                            this.img_hg.visible = true;
                            this.ani_hg_dx.play(0, false);
                            this._cdTime = 200;
                        }
                        if (this._titleparent && this._titleparent["box_content"]){
                            this._titleparent["box_content"].visible = true;
                        }
                    }else if (this._step >= 2){
                        //结束拉
                        this.endUpdate();
                    }
                }
            }
        }

        private endUpdate():void{
            if (this._isNoClose){
                let tp:DialogExt = (this._titleparent || this.parent) as DialogExt;
                if (tp) tp.isModelClose = true;
            }
            if (this._callBack){
                this._callBack.run();
                this._callBack = null;
            }
            Laya.timer.clear(this, this.update);
            
        }

        public closeTitle(force:boolean = true):void{
            if (!force && !this._isShow) return;
            this._isShow = false;
            //翅膀
            this.ani_cb_dx.stop();
            this.ani_cb_hd.stop();
            this.ani_cb_zk.stop();
            this.box_cb.visible = false;
            //星星
            this.ani_star.stop();
            this.ani_star.visible = false;
            this.ani_xx_xz.stop();
            this.box_star.visible = false;
            //刀
            this.ani_dao.stop();
            this.img_dao_l.visible = false;
            this.img_dao_r.visible = false;
            //皇冠
            this.ani_hg_dx.stop();
            this.ani_hg_fd.stop();
            this.img_hg_bg.visible = false;
            this.img_hg.visible = false;

            this.eff_guang.stop();
            this.box_light_eff.visible = false;
            
            this.ani_bg_sf.gotoAndStop(0);

            Laya.timer.clearAll(this);
            if (this._callBack){
                this._callBack.recover();
                this._callBack = null;
            }
            if (this._titleparent && this._titleparent["box_content"]){
                this._titleparent["box_content"].visible = true;
            }
            this._titleparent = null;
        }





    }

   
}