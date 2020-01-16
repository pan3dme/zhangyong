/**
* ShenjiezhimenModel
*/
var game;
(function (game) {
    var GodDoorModel = /** @class */ (function () {
        function GodDoorModel() {
        }
        GodDoorModel.getInstance = function () {
            if (!GodDoorModel._instance) {
                GodDoorModel._instance = new GodDoorModel();
            }
            return GodDoorModel._instance;
        };
        GodDoorModel.prototype.getGodList = function ($teamType) {
            var tab = tb.TB_divinity_set.get_TB_divinity_set();
            var allgods = App.hero.getGodAry();
            var needGods = new Array;
            for (var i = 0; i < allgods.length; i++) {
                var curgod = allgods[i];
                //符合星级条件
                if (tab.star.indexOf(Number(curgod.starLevel)) != -1) {
                    //符合类型
                    var racetype = curgod.tab_god.race_type;
                    if (($teamType == 0 && racetype != iface.tb_prop.godRaceTypeKey.light && racetype != iface.tb_prop.godRaceTypeKey.dark) || racetype == $teamType) {
                        needGods.push(curgod);
                    }
                }
            }
            return needGods;
        };
        return GodDoorModel;
    }());
    game.GodDoorModel = GodDoorModel;
})(game || (game = {}));
