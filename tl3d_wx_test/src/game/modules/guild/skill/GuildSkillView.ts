
module game {
    export class GuildSkillView extends ui.guild.skill.GuildSkillUI {

        private _model : GuildSkillModel;
        private _shuxingqiuList : GuildSkillRender[];
        private _typeList:number[];
        constructor() {
            super();
        }
        
        createChildren(): void {
            super.createChildren();
            this._typeList = [GodType.shuchu,GodType.zhiliao,GodType.fuzhu,GodType.kongzhi,GodType.fangyu];
            this.tab_zhenying.labels = "输出,治疗,辅助,控制,坦克";
            this._model = GuildSkillModel.getInstance();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose,closeOnButton:true,title:"公会技能" };	
            this._shuxingqiuList = [];
            let attrs = this._model.skillAttrs;
            for(let attr of attrs){
                let itemIR = this["item"+attr] as GuildSkillRender;
                itemIR.on(Laya.Event.CLICK, this, this.onClickSkill);
                this._shuxingqiuList.push(itemIR);
            }
            this.btn_reset.on(Laya.Event.CLICK, this, this.reset);
            this.btn_shengji.on(Laya.Event.CLICK, this, this.levelUp);       
            this.tab_zhenying.selectedIndex = -1;
            this.tab_zhenying.selectHandler = new Handler(this, this.onTab);   
        }

        public show(closeOther?: boolean, showEffect?: boolean): void {
			super.show(closeOther, showEffect);
			this.initView();		
		}

		public popup(closeOther?: boolean, showEffect?: boolean): void {
			super.popup(closeOther, showEffect);
			this.initView();
		}

        public onClosed(): void {
            super.onClosed();
            this.tab_zhenying.selectedIndex = -1;
            this._curAttr = 0;
            for(let itemir of this._shuxingqiuList) {
                itemir.dataSource = null;
            }
        }

        private initView(): void {
            this.tab_zhenying.selectedIndex = 0;
        }

        /** 属性球选中计数 */
        private _curAttr: number = 0;
        /** 选择 */
        private onTab(index: number): void {
            if(index == -1) return;
            let type = this._typeList[this.tab_zhenying.selectedIndex];
            this._curAttr = this._model.getCanLvupAttr(type);
            this.updateView();
            
        }

        /** 选择属性球 */
        private onClickSkill(event:Laya.Event): void {
            let itemIR = event.target as GuildSkillRender;
            if(itemIR && itemIR.dataSource) {
                this._curAttr = itemIR.dataSource.attrType;
                this.updateView();
            }
        }

        //更新界面
        public updateView(): void {
            if(this._curAttr <= 0) return;
            //更新上层数据
            let godType = this._typeList[this.tab_zhenying.selectedIndex];
            let skillList = this._model.getSkillList(godType);
            //更新下层数据 选中属性球
            let curVo : GuildSkillVo;
            for(let i = 0,len = this._shuxingqiuList.length ; i < len ; i++){
                let itemIR = this._shuxingqiuList[i];
                let skillVo = skillList[i];
                itemIR.dataSource = skillVo;
                if(this._curAttr == skillVo.attrType){
                    curVo = skillVo;
                }
                itemIR.img_shuxingqiu.skin = SkinUtil.getGuildSkillIcon(skillVo.attrType,godType);
                // itemIR.img_selected.skin = SkinUtil.getGuildSkillSelectedIcon(godType);
                itemIR.ani_select.visible = this._curAttr == skillVo.attrType;
            }
            if(!curVo) return;
            //判断是否升到满级
            if(curVo.tbSkill.cost == 0) {
                this.btn_shengji.disabled = true;
                this.lb_shuxing.text = curVo.tbSkill.name;
                this.lb_name.text = curVo.tbSkill.name.substr(0, curVo.tbSkill.name.indexOf("L"));
                this.lb_name.align = "center";
                this.lb_xiaoguo.text = '+' + curVo.getXiaoguo();
                this.lb_xiaoguo.align = "center";
                this.box_xiaohao.visible = false;
                this.lb_max.visible = true;
                this.box_xiaoguo.refresh();
                return;
            }
            //未升到满级
            this.btn_shengji.disabled = false;
            this.lb_shuxing.text = curVo.tbSkill.name;
            //获取下一个等级的数据
            let nextData = tb.TB_guild_skill.getTbByParam(curVo.godType, curVo.attrType,curVo.lv + 1);
            if(nextData.attr[0] <= 4 && nextData.attr[1] == 0) {
                this.lb_name.text = curVo.tbSkill.name.substr(0, curVo.tbSkill.name.indexOf("L"));
                this.lb_xiaoguo.text = '+' + curVo.getXiaoguo() + "   >>   " + "+" + nextData.attr[2];
            } else {
                this.lb_name.text = curVo.tbSkill.name.substr(0, curVo.tbSkill.name.indexOf("L"));
                this.lb_xiaoguo.text = '+' + curVo.getXiaoguo() + "   >>   " + "+" + (Math.floor(nextData.attr[2] * 10000) / 100) + '%';
            }
            this.lb_name.align = "right";
            this.lb_xiaoguo.align = "left";
            this.box_xiaohao.visible = true;
            this.lb_max.visible = false;
            //消耗的判断
            this.lb_xiaohao.text = '' + Snums(App.hero.guildDonate);
            this.lb_xiaohao2.text = '/' + Snums(curVo.tbSkill.cost); 
            this.box_xiaohao.refresh();
            this.box_xiaoguo.refresh();
            this.box_xiaoguo.event(Laya.Event.RESIZE);
            if(App.hero.guildDonate < curVo.tbSkill.cost) this.lb_xiaohao.color = ColorConst.RED;
            else this.lb_xiaohao.color = ColorConst.normalFont;
        }

        //升级
        private levelUp(): void {
            // 传入升级所需数据
            let godType = this._typeList[this.tab_zhenying.selectedIndex];
            let skillVo = this._model.getSkillVo(godType,this._curAttr);
            if (!skillVo) return;
            dispatchEvt(new GuildEvent(GuildEvent.GUILD_SKILL_LEVELUP), skillVo);
        }

        //重置
        private reset(): void {
            // 第一次判断是否升级过任何技能
            if(Object.keys(App.hero.guildSkillInfo).length === 0) {
                showToast(LanMgr.getLan("", 10424));
                return;
            }
            // 第二次判断是否重置公会技能(弹窗提示)
            let skillResetCostAry = tb.TB_guild_set.getSet().resetskill_cost;
            let costItemName: string = tb.TB_item.get_TB_itemById(parseInt(skillResetCostAry[0][0])).name;
			let alertStr = LanMgr.getLan("", 10425, skillResetCostAry[0][1], costItemName);
            common.AlertBox.showAlert({
                text: alertStr, confirmCb: () => {
                    dispatchEvt(new GuildEvent(GuildEvent.GUILD_SKILL_RESET));
                }
            });
        }

    }
}