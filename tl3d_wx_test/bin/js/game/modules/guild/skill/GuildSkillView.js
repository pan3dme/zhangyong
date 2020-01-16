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
var game;
(function (game) {
    var GuildSkillView = /** @class */ (function (_super) {
        __extends(GuildSkillView, _super);
        function GuildSkillView() {
            var _this = _super.call(this) || this;
            /** 属性球选中计数 */
            _this._curAttr = 0;
            return _this;
        }
        GuildSkillView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._typeList = [GodType.shuchu, GodType.zhiliao, GodType.fuzhu, GodType.kongzhi, GodType.fangyu];
            this.tab_zhenying.labels = "输出,治疗,辅助,控制,坦克";
            this._model = game.GuildSkillModel.getInstance();
            this.isModelClose = true;
            this.bgPanel.dataSource = { closeOnSide: this.isModelClose, closeOnButton: true, title: "公会技能" };
            this._shuxingqiuList = [];
            var attrs = this._model.skillAttrs;
            for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                var attr = attrs_1[_i];
                var itemIR = this["item" + attr];
                itemIR.on(Laya.Event.CLICK, this, this.onClickSkill);
                this._shuxingqiuList.push(itemIR);
            }
            this.btn_reset.on(Laya.Event.CLICK, this, this.reset);
            this.btn_shengji.on(Laya.Event.CLICK, this, this.levelUp);
            this.tab_zhenying.selectedIndex = -1;
            this.tab_zhenying.selectHandler = new Handler(this, this.onTab);
        };
        GuildSkillView.prototype.show = function (closeOther, showEffect) {
            _super.prototype.show.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildSkillView.prototype.popup = function (closeOther, showEffect) {
            _super.prototype.popup.call(this, closeOther, showEffect);
            this.initView();
        };
        GuildSkillView.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
            this.tab_zhenying.selectedIndex = -1;
            this._curAttr = 0;
            for (var _i = 0, _a = this._shuxingqiuList; _i < _a.length; _i++) {
                var itemir = _a[_i];
                itemir.dataSource = null;
            }
        };
        GuildSkillView.prototype.initView = function () {
            this.tab_zhenying.selectedIndex = 0;
        };
        /** 选择 */
        GuildSkillView.prototype.onTab = function (index) {
            if (index == -1)
                return;
            var type = this._typeList[this.tab_zhenying.selectedIndex];
            this._curAttr = this._model.getCanLvupAttr(type);
            this.updateView();
        };
        /** 选择属性球 */
        GuildSkillView.prototype.onClickSkill = function (event) {
            var itemIR = event.target;
            if (itemIR && itemIR.dataSource) {
                this._curAttr = itemIR.dataSource.attrType;
                this.updateView();
            }
        };
        //更新界面
        GuildSkillView.prototype.updateView = function () {
            if (this._curAttr <= 0)
                return;
            //更新上层数据
            var godType = this._typeList[this.tab_zhenying.selectedIndex];
            var skillList = this._model.getSkillList(godType);
            //更新下层数据 选中属性球
            var curVo;
            for (var i = 0, len = this._shuxingqiuList.length; i < len; i++) {
                var itemIR = this._shuxingqiuList[i];
                var skillVo = skillList[i];
                itemIR.dataSource = skillVo;
                if (this._curAttr == skillVo.attrType) {
                    curVo = skillVo;
                }
                itemIR.img_shuxingqiu.skin = SkinUtil.getGuildSkillIcon(skillVo.attrType, godType);
                // itemIR.img_selected.skin = SkinUtil.getGuildSkillSelectedIcon(godType);
                itemIR.ani_select.visible = this._curAttr == skillVo.attrType;
            }
            if (!curVo)
                return;
            //判断是否升到满级
            if (curVo.tbSkill.cost == 0) {
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
            var nextData = tb.TB_guild_skill.getTbByParam(curVo.godType, curVo.attrType, curVo.lv + 1);
            if (nextData.attr[0] <= 4 && nextData.attr[1] == 0) {
                this.lb_name.text = curVo.tbSkill.name.substr(0, curVo.tbSkill.name.indexOf("L"));
                this.lb_xiaoguo.text = '+' + curVo.getXiaoguo() + "   >>   " + "+" + nextData.attr[2];
            }
            else {
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
            if (App.hero.guildDonate < curVo.tbSkill.cost)
                this.lb_xiaohao.color = ColorConst.RED;
            else
                this.lb_xiaohao.color = ColorConst.normalFont;
        };
        //升级
        GuildSkillView.prototype.levelUp = function () {
            // 传入升级所需数据
            var godType = this._typeList[this.tab_zhenying.selectedIndex];
            var skillVo = this._model.getSkillVo(godType, this._curAttr);
            if (!skillVo)
                return;
            dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_SKILL_LEVELUP), skillVo);
        };
        //重置
        GuildSkillView.prototype.reset = function () {
            // 第一次判断是否升级过任何技能
            if (Object.keys(App.hero.guildSkillInfo).length === 0) {
                showToast(LanMgr.getLan("", 10424));
                return;
            }
            // 第二次判断是否重置公会技能(弹窗提示)
            var skillResetCostAry = tb.TB_guild_set.getSet().resetskill_cost;
            var costItemName = tb.TB_item.get_TB_itemById(parseInt(skillResetCostAry[0][0])).name;
            var alertStr = LanMgr.getLan("", 10425, skillResetCostAry[0][1], costItemName);
            common.AlertBox.showAlert({
                text: alertStr, confirmCb: function () {
                    dispatchEvt(new game.GuildEvent(game.GuildEvent.GUILD_SKILL_RESET));
                }
            });
        };
        return GuildSkillView;
    }(ui.guild.skill.GuildSkillUI));
    game.GuildSkillView = GuildSkillView;
})(game || (game = {}));
