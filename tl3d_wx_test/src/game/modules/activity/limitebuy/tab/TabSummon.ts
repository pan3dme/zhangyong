
module game {
    export class TabSummon extends ui.activity.limitebuy.tab.TabSummonUI {
        constructor() {
            super();
            this.btn_shuaxin.on(Laya.Event.CLICK, this, this.refresh);
            this.btn_jiangli.on(Laya.Event.CLICK, this, this.jiangli);;
            this.btn_buyone.on(Laya.Event.CLICK, this, this.buy, [1]);
            this.btn_buyten.on(Laya.Event.CLICK, this, this.buy, [10]);
            this.box_btn_more.on(Laya.Event.CLICK, this, this.moreRank);
        }

        public uiScene: Base2dSceneLayer;
        private _probarmask: Laya.Sprite;
        private _baoxiangList: ScoreIR[];
        createChildren(): void {
            super.createChildren();
            this._baoxiangList = [];
            for (let i = 1; i <= 4; i++) {
                this._baoxiangList.push(this['item' + i]);
            }
            this.uiScene = new Base2dSceneLayer();
            this.addChild(this.uiScene);
        }

        public set dataSource($value: limiteSummonVo) {
            this._dataSource = $value;
            if (!this.dataSource) return;
            this.initData();
            Laya.timer.loop(10000, this, this.refresh);
        }

        public get dataSource(): limiteSummonVo {
            return this._dataSource;
        }

        private initData(): void {
            let info = this.dataSource;
            this.lb_time.text = info.getRemainTime();                           //剩余时间
            //获取展示模型
            //todo ios兼容排查
            //logdebug("获取展示模型",info,info.tbSummonTime,info.tbSummonTime.model_show);
            let god = tb.TB_god.get_TB_godById(info.tbSummonTime.model_show);   //英雄  info.tbSummonTime.model_show
            //logdebug("god:",god);
            this.lb_name.text = god.name;                                       //英雄名
            this.list_starts.repeatX = god.star[0];                             //英雄星级
            // this.img_level.skin = SkinUtil.getQulitySkin(god.quality - 1); //英雄品质
            //模型
            this.uiScene.onShow();
            Laya.timer.once(400, this, this.delayShow, [god]);
            //判断是否有免费次数  消耗
            let num = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.summonFreeNum)
            if (info.getFreeCount() - num > 0) {
                this.img_cost.visible = false;
                this.lb_costone.text = "免费";
                this.img_redpoint.visible = true;
            } else {
                this.img_cost.visible = true;
                this.lb_costone.text = info.getBuyCost()[0] + '';
                this.img_redpoint.visible = false;
            }
            this.lb_costten.text = info.getBuyCost()[1] + '';
            //剩余几次出四星
            let count = 10 - (App.hero.summonScore % 100) / 10;
            this.lb_cishu.text = '还有' + count + '次必出四星';
            //宝箱列表
            let tbSbox = info.tbSummonBox[info.tbSummonBox.length - 1];
            if (tbSbox) {
                let maxScore = tbSbox.score;
                for (let i = 0; i < this._baoxiangList.length; i++) {
                    let sbox = info.tbSummonBox[i];
                    let baoItem = this._baoxiangList[i];
                    baoItem.dataSource = sbox;
                    baoItem.img_baoxiang.on(Laya.Event.CLICK, this, this.reward, [i]);
                    //定前三个宝箱的位置，跟随进度条的倾斜
                    baoItem.x = sbox.score / maxScore * this.img_progress.width;
                    if (sbox.score > maxScore / 2) {
                        baoItem.y = (maxScore - sbox.score) / (maxScore / 2) * this.img_progress.height + this.img_progress.y + 20;
                    } else {
                        baoItem.y = sbox.score / (maxScore / 2) * this.img_progress.height + this.img_progress.y + 20;
                    }
                    //给最后一个箱子定死
                    if (i == 3) {
                        baoItem.x = 570;
                        baoItem.y = 584;
                    }
                }
                //更新进读条 使用遮罩
                let value = App.hero.summonScore / maxScore;
                if (!this._probarmask) this._probarmask = new Laya.Sprite();
                this.img_progress.mask = this._probarmask;
                this._probarmask.graphics.clear();
                this._probarmask.graphics.drawRect(0, 0, this.img_progress.width * value, this.img_progress.height, "#ff0000", "#00ff00", 0);
            } else {
                //logdebug("tbSummonBox:",info,info.tbSummonBox);
            }
            //排行列表的ui初始化
            this.box_btn_more.y = 200;
            this.list_rank.repeatY = 4;
            this.img_more.rotation = 90;
            this.img_more.y = 218;
            this.img_di.height = 230;
            this.img_moredi.y = 200;
            this.lb_more.y = 200;
            this.lb_more.text = "查看更多排行";
            this.doRequest();
        }

        /** 延迟展示模型（延迟主要为了定位） */
        private delayShow(god): void {
            // if(this.uiScene.sceneChar) {
            //     this.uiScene.sceneChar.setRoleUrl(getRoleUrl(god.model));
            //     this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
            // } else {
            this.uiScene.addModelChar(String(god.model), this.box_model.x + 55, this.box_model.y + 315, 180, 2);
            this.uiScene.sceneChar.play(tl3d.CharAction.ATTACK_02, 2);
            // }       
        }

        /** 请求排行榜数据 */
        private doRequest(): void {
            let args = {};
            PLC.request(Protocol.center_activity_getSummonRankList, args, ($data: any) => {
                if (!$data) return;
                //排行榜的更新 [排名,排名当前所需分数？,排名信息？] 
                let arr = [];
                if (this.dataSource) {
                    for (let index = 1; index <= 10; index++) {
                        if (!$data.summonRankList[index]) {
                            arr.push([index, this.dataSource.getRankScoreByRank(index)]);
                            continue;
                        }
                        arr.push([index, this.dataSource.getRankScoreByRank(index), $data.summonRankList[index]]);
                    }
                    this.list_rank.array = arr;
                    //获取到个人数据
                    let mySummonRank = $data.mySummonRank == 0 ? "未上榜" : $data.mySummonRank;
                    this.lb_mymess.text = "我的积分：" + App.hero.summonScore + "    我的排名：" + mySummonRank;
                }
            });
        }

        /** 刷新页面 */
        public refresh(): void {
            this.lb_time.text = this.dataSource.getRemainTime();
            this.doRequest();
        }

        /** 奖励预览 */
        private jiangli(): void {
            let tb = this.dataSource.tbSummonRank;
            tb.sort((a, b) => {
                return a.ID - b.ID;
            });
            dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.SHOW_RANK_VIEW), tb);
        }

        /** 排行榜的伸缩 */
        private moreRank(): void {
            if (this.img_more.rotation == 90) {
                this.box_btn_more.y += 150;
                this.list_rank.repeatY = 9;
                this.img_more.rotation = 270;
                this.img_more.y += 150;
                this.img_di.height += 150;
                this.img_moredi.y += 150;
                this.lb_more.y += 150;
                this.lb_more.text = "返回";
            } else {
                this.box_btn_more.y -= 150;
                this.list_rank.repeatY = 4;
                this.img_more.rotation = 90;
                this.img_more.y -= 150;
                this.img_di.height -= 150;
                this.img_moredi.y -= 150;
                this.lb_more.y -= 150;
                this.lb_more.text = "查看更多排名";
            }
            //是否更新排行榜列表   是:进行请求服务端 否:使用本地数据
            //this.refresh();
        }

        /** 领取宝箱 */
        private reward(index: number): void {
            //判断积分是否足够
            if (App.hero.summonScore >= this.dataSource.tbSummonBox[index].score && !LimiteBuyModel.getInstance().isReward(this.dataSource.tbSummonBox[index].ID)) {
                dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.LIMITESUMMON_REWARD), this.dataSource.tbSummonBox[index].ID);
            } else {
                //展示宝箱奖励
                let arrItem = [];
                this.dataSource.tbSummonBox[index].reward.forEach((ary: any[]) => {
                    arrItem.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
                UIMgr.showUI(UIConst.ManyItemsTip, { data: arrItem });
            }
        }
        /** 购买 */
        private buy(num: number): void {
            if (num == 1) {
                dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.LIMITESUMMON_BUY), { summonId: 1, num: 0 });
            } else if (num == 10) {
                dispatchEvt(new LimiteBuyEvent(LimiteBuyEvent.LIMITESUMMON_BUY), { summonId: 2, num: 1 });
            }
        }

    }
}