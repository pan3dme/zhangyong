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
/*
* name;
*/
var game;
(function (game) {
    var FirstGuideProcessor = /** @class */ (function (_super) {
        __extends(FirstGuideProcessor, _super);
        function FirstGuideProcessor() {
            return _super.call(this) || this;
        }
        FirstGuideProcessor.prototype.getName = function () {
            return "FirstGuideProcessor";
        };
        FirstGuideProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.FirstGuideEvent(game.FirstGuideEvent.FIRST_GUIDE_STEP_SUCC),
                // new FirstGuideEvent(FirstGuideEvent.SHOW_SKILL_EVENT),
                new game.FirstGuideEvent(game.FirstGuideEvent.CHANGE_BOSSBLOOD),
            ];
        };
        //处理事件
        FirstGuideProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.FirstGuideEvent) {
                switch ($event.type) {
                    case game.FirstGuideEvent.CHANGE_BOSSBLOOD:
                        if ($event.data != null && $event.data.type != iface.tb_prop.copyTypeKey.main) {
                            this.changeBossBlood($event.data.vo);
                        }
                        break;
                    case game.FirstGuideEvent.FIRST_GUIDE_STEP_SUCC:
                        this.stepsucc($event.data);
                        break;
                    // case FirstGuideEvent.SHOW_SKILL_EVENT:
                    //     if (this.fightview) {
                    //         if ($event.data != null && $event.data.type == -100) {
                    //             this.fightview.showSelectSkillPanel($event.data.vo,$event.data.clickman);
                    //         }
                    //     }
                    //     break;
                }
            }
        };
        FirstGuideProcessor.prototype.stepsucc = function ($stepId) {
            if (this.fightview) {
                this.fightview.fightNext($stepId);
            }
        };
        FirstGuideProcessor.prototype.changeBossBlood = function ($bloodnum) {
            if (this.fightview) {
                this.fightview.setBossBlood($bloodnum);
            }
        };
        Object.defineProperty(FirstGuideProcessor.prototype, "fightview", {
            get: function () {
                var bole = UIMgr.hasStage(UIConst.FirstGuide);
                return bole ? UIMgr.getUIByName(UIConst.FirstGuide) : null;
            },
            enumerable: true,
            configurable: true
        });
        return FirstGuideProcessor;
    }(tl3d.Processor));
    game.FirstGuideProcessor = FirstGuideProcessor;
})(game || (game = {}));
