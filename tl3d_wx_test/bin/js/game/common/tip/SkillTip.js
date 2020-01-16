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
/**
* name
*/
var common;
(function (common) {
    var SkillTip = /** @class */ (function (_super) {
        __extends(SkillTip, _super);
        function SkillTip() {
            var _this = _super.call(this) || this;
            _this._Objectpos = new Laya.Point();
            _this.mouseEnabled = false;
            _this.mouseThrough = true;
            _this.lab_miaoshusize.mouseEnabled = false;
            _this.list_miaoshu.renderHandler = new Handler(_this, _this.onRenderMiaoshu);
            return _this;
        }
        /**坐标初始化 */
        SkillTip.prototype.initPosition = function () {
            this.img_bg.height = 146;
            this.list_miaoshu.height = 24;
            this.img_bg.x = this._Objectpos.x - this.img_bg.width / 2;
            this.img_bg.y = this._Objectpos.y - this.img_bg.height;
        };
        /**坐标适配 */
        SkillTip.prototype.setPosition = function () {
            var value = 10;
            if (this.img_bg.x + this.img_bg.width > Laya.stage.width) {
                var pos_x = this.img_bg.x + this.img_bg.width - Laya.stage.width;
                this.img_bg.x -= (pos_x + value);
            }
            else if (this.img_bg.y + this.img_bg.height > Laya.stage.height) {
                var pos_y = this.img_bg.y + this.img_bg.height - Laya.stage.height;
                this.img_bg.y -= (pos_y + value);
            }
            else if (this.img_bg.x < 0) {
                this.img_bg.x = value;
            }
            else if (this.img_bg.y < 0) {
                this.img_bg.y = value;
            }
        };
        /**
         * 渲染等级技能描述
         * @param cell
         * @param index
         */
        SkillTip.prototype.onRenderMiaoshu = function (cell, index) {
            if (index > this.list_miaoshu.dataSource.length)
                return;
            var $data = this.list_miaoshu.dataSource[index];
            if (!$data)
                return;
            var dianliang = cell.getChildByName("img_dianliang");
            dianliang.visible = false;
            if ($data.level && $data.level <= this._dataSource.level)
                dianliang.visible = true;
            var miaoshu = cell.getChildByName("lab_miaoshu");
            miaoshu.text = LanMgr.getLan("{0}级：{1}", -1, $data.level, $data.info);
        };
        SkillTip.prototype.timerOnce = function () {
            Laya.timer.once(1900, this, this.Tweento);
        };
        SkillTip.prototype.Tweento = function () {
            Laya.Tween.to(this, { alpha: 0 }, 200, null, new Handler(this, function () {
                UIMgr.hideUIByName(UIConst.SkillTip);
            }));
        };
        SkillTip.prototype.onOpened = function () {
            _super.prototype.onOpened.call(this);
            var data = this.dataSource[0];
            this._Objectpos.x = this.dataSource[1];
            this._Objectpos.y = this.dataSource[2];
            if (!data.skilldata) {
                return;
            }
            var skillData = data.skilldata[0];
            Laya.timer.clearAll(this);
            this.timerOnce();
            this.initPosition();
            //显示				
            this.lab_type.text = skillData.type == 0 ? LanMgr.getLan("(被动)", -1) : LanMgr.getLan("(主动)", -1);
            this.lab_type.visible = skillData.type == 0;
            this.lab_skillname.text = skillData.name;
            this.lab_skillname.event(Laya.Event.RESIZE);
            this.lab_skillinfo.text = skillData.info;
            this.lab_skillinfo.event(Laya.Event.RESIZE);
            data.skilldata.shift();
            /**描述文字增加宽度值 */
            var miaoShuValue = this.lab_skillinfo.height - 20;
            this.lab_cd.text = "";
            this.lab_cd.height = 0;
            this.lab_cd.event(Laya.Event.RESIZE);
            // if (data.isShowlist) {
            // 	this.list_miaoshu.visible = true;
            // 	this.list_miaoshu.dataSource = data.skilldata;
            // 	let value = (this.list_miaoshu.dataSource.length - 1) * 24;
            // 	this.list_miaoshu.height += (value + miaoShuValue);
            // 	this.img_bg.height += (value + miaoShuValue);					
            // } else {
            this.list_miaoshu.visible = false;
            this.list_miaoshu.height += (miaoShuValue - 24);
            this.img_bg.height += (miaoShuValue - 24);
            // }
            this.img_bg.height -= 20;
            var valueY = this.img_bg.height - 146;
            this.img_bg.y -= valueY;
            this.setPosition();
            Laya.Tween.to(this, { alpha: 1 }, 200);
        };
        SkillTip.prototype.onClosed = function () {
            _super.prototype.onClosed.call(this);
        };
        return SkillTip;
    }(ui.component.SkillTipUI));
    common.SkillTip = SkillTip;
})(common || (common = {}));
