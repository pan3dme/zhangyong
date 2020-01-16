/**
* name 
*/
module common {
	export class CheatView extends ui.hud.view.CheatUI {
		constructor() {
			super()
			this.isModelClose = true;
			this.chk_cam.on(Laya.Event.CLICK, this, this.onCam);
			this.btn1.on(Laya.Event.CLICK, this, this.onGm);
			this.btn2.on(Laya.Event.CLICK, this, this.onGm);
			this.btn3.on(Laya.Event.CLICK, this, this.onGm);
			this.btn4.on(Laya.Event.CLICK, this, this.onGm);
			this.btn5.on(Laya.Event.CLICK, this, this.onGm);
			this.btnAddGod.on(Laya.Event.CLICK, this, this.onGm);
			this.btnAddItem.on(Laya.Event.CLICK, this, this.onGm);
			this.btnAddMail.on(Laya.Event.CLICK, this, this.onGm);
			this.btnCmd.on(Laya.Event.CLICK, this, this.onGm);
			this.btnDelItem.on(Laya.Event.CLICK, this, this.onGm);
			this.btnJishiRef.on(Laya.Event.CLICK, this, this.onGm);
			this.btnLv.on(Laya.Event.CLICK, this, this.onGm);
			this.btnPassTower.on(Laya.Event.CLICK, this, this.onGm);
			this.btnReset.on(Laya.Event.CLICK, this, this.onGm);
			this.btnGuide.on(Laya.Event.CLICK, this, this.onGm);

			this.bgPanel.dataSource = { uiName: UIConst.CheatView, closeOnSide: this.isModelClose, closeOnButton: true };
			let ary = tb.TB_item.get_TB_item();
			ary = ary.filter((item) => {
				return item.type != 5 && item.type != 6;
			});
			let labels = [];
			for (let i = 0; i < ary.length; i++) {
				labels.push(ary[i].name);
			}
			this.itemCombo.labels = labels.join(',');
			this.itemCombo.selectHandler = new Handler(this, this.onSelectItem);
			// this.lbContent.autoSize = true;
            this.lbContent.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);
		}

		public onOpened(): void {
			super.onOpened();
		}

		private onGm(event: Laya.Event): void {
			let target = event.target as Laya.Button;
			let content: string = "";
			let errorMsg: string = "";
			if (target == this.btn1 || target == this.btn2 || target == this.btn5) {
				content = target.label;
			} else if (target == this.btn3 || target == this.btn4) {
				content = target.name;
			} else if (target == this.btnAddItem) {
				if (!this.lbAddID.text) {
					errorMsg = "物品id不能为空";
				} else if (!this.lbAddNum.text) {
					errorMsg = "物品数量不能为空";
				}
				content = `@additem ${this.lbAddID.text} ${this.lbAddNum.text}`;
			} else if (target == this.btnDelItem) {
				if (!this.lbDelId.text) {
					errorMsg = "物品id不能为空";
				} else if (!this.lbDelNum.text) {
					errorMsg = "物品数量不能为空";
				}
				content = `@costitem ${this.lbDelId.text} ${this.lbDelNum.text}`;
			} else if (target == this.btnLv) {
				if (!this.lbLv.text) {
					errorMsg = "等级不能为空";
				}
				content = `@等级 ${this.lbLv.text}`;
			} else if (target == this.btnAddMail) {
				if (!this.lbMailID.text) {
					errorMsg = "邮件id不能为空";
				}
				content = `@邮件 ${this.lbMailID.text}`;
			} else if (target == this.btnJishiRef) {
				if (!this.lbJishi.text) {
					errorMsg = "集市刷新时间不能为空";
				}
				content = `@集市刷新时间 ${this.lbJishi.text}`;
			} else if (target == this.btnAddGod) {
				if (!this.lbGodID.text) {
					errorMsg = "英雄id不能为空";
				}
				let tbGod = tb.TB_god.get_TB_godById(Number(this.lbGodID.text));
				if (!tbGod) {
					showToast(LanMgr.getLan('', 10210));
					return
				}
				// else if(!this.lbGodQua.text){
				// 	errorMsg = "英雄星级不能为空";
				// }else if(!this.lbGodLv.text){
				// 	errorMsg = "英雄等级不能为空";
				// }
				content = `@addgod ${this.lbGodID.text} ${this.lbGodQua.text} ${this.lbGodLv.text}`;
			} else if (target == this.btnPassTower) {
				if (!this.lbTowerId.text) {
					errorMsg = "副本id不能为空";
				}
				content = `@tower ${this.lbTowerId.text}`;
			} else if (target == this.btnReset) {
				content = `@重置 ${this.resetCombo.selectedIndex}`;
			} else if (target == this.btnCmd) {
				content = `${this.lbCmd.text}`;
			} else if (target == this.btnGuide) {
				let index = this.guideCombo.selectedIndex;
				if (index == 0) {
					game.GuideManager.allPass();
				} else if (index == 1) {
					game.GuideWeakManager.allPass();
				}
				return;
			}
			if (errorMsg && errorMsg != "") {
				// showToast('gm格式错误：' + errorMsg);
				logdebug('gm格式错误：', content, errorMsg);
				return;
			}
			logdebug('gm命令：', content);
			let arg = {};
			arg[Protocol.game_gm_command.args.content] = content;
			PLC.request(Protocol.game_gm_command, arg, (res) => {
				if (res && res.content) {
					this.lbContent.text = res.content;
					this.lbContent.event(Laya.Event.RESIZE);
				}
				if (content == "@清空聊天CD") {
					game.ChatModel.getInstance().clearCdTime();
				}
				if (content == "@center重置 1") {
					game.GuildHelpModel.getInstance().clearCrossDayData();
				}
				if (content == "@honour 0") {
					App.hero.copyInfo.honourWarRegTime = 0;
				}
				if (content == "@honour 1") {
					game.GloryModel.getInstance().testChange();
				}
				if (res && res.roleLevel) {
					App.hero.level = res.roleLevel;
					App.hero.exp = 0;
					dispatchEvt(new game.ResEvent(game.ResEvent.ROLE_LEVEL_CHANGE));
					dispatchEvt(new game.ResEvent(game.ResEvent.RESOURCE_CHANGE));
				}
				if (res && res.battleReport) {
					logyhj("开始战斗：", res.battleReport);
					let copyvo = new game.FightVo();
					copyvo.copyType = CopyType.test;

					let page = new game.ServerPage();
					page.initPage(res.battleReport.reportData);
					page.result = playState.VICTORY;//左方胜利就为胜
					copyvo.fightPageControl = page;
					let enterVo: game.EnterFightVo = { vo: copyvo, responseData: res.battleReport.reportData };
					dispatchEvt(new game.FightsEvent(game.FightsEvent.ENTER_FIGHT_EVENT), enterVo);
				}
			});
		}

		private onSelectItem(index: number): void {
			let label = this.itemCombo.selectedLabel;
			let tbItem = tb.TB_item.get_TB_item("name", label);
			if (tbItem && tbItem.length > 0) {
				this.lbAddID.text = tbItem[0].ID + "";
				this.lbDelId.text = tbItem[0].ID + "";
			}
		}

		private prevX:number = 0;
        private prevY:number = 0;
		/* 开始滚动文本 */
        private startScrollText(e:Event):void
        {
            this.prevX = this.lbContent.mouseX;
            this.prevY = this.lbContent.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        }
        
        /* 停止滚动文本 */
        private finishScrollText(e:Event):void
        {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        }

        /* 鼠标滚动文本 */
        private scrollText(e:Event):void
        {
            var nowX:number = this.lbContent.mouseX;
            var nowY:number = this.lbContent.mouseY;
            this.lbContent.textField.scrollX += this.prevX - nowX;
            this.lbContent.textField.scrollY += this.prevY - nowY;
            this.prevX = nowX;
            this.prevY = nowY;
        }

		//是否显示相机参数
		private onCam(): void {
			game.FightView.chkCam = this.chk_cam.selected;
			if(game.FightView.chkCam){
				ExtConfig.LOG_LEVEL = 999
			}
		}
	}
}