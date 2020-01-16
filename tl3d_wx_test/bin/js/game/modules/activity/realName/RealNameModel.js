/**
* ShareModel
*/
var game;
(function (game) {
    var RealNameModel = /** @class */ (function () {
        function RealNameModel() {
        }
        RealNameModel.getInstance = function () {
            if (!RealNameModel._instance) {
                RealNameModel._instance = new RealNameModel();
            }
            return RealNameModel._instance;
        };
        RealNameModel.RealNameOpt = function (status) {
            var _isIndulge = 0;
            var _isCertification = 0;
            if (status == 2) {
                _isCertification = 1;
                _isIndulge = 1;
            }
            if (status == 1) {
                _isCertification = 1;
                _isIndulge = 0;
            }
            if (_isCertification != App.hero.isCertification || _isIndulge != App.hero.isIndulge) {
                App.hero.isCertification = _isCertification;
                App.hero.isIndulge = _isIndulge;
                var arg = {};
                arg[Protocol.game_welfare_updateRealName.args.fcm] = _isIndulge;
                arg[Protocol.game_welfare_updateRealName.args.shiming] = _isCertification;
                PLC.request(Protocol.game_welfare_updateRealName, arg, function () {
                    dispatchEvt(new game.ResEvent(game.ResEvent.ISCERTIFICATION_EVENT));
                });
            }
        };
        return RealNameModel;
    }());
    game.RealNameModel = RealNameModel;
})(game || (game = {}));
