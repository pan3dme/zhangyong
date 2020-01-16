/**
* ShareModel
*/
module game {
    export class RealNameModel {
        private static _instance: RealNameModel;
        static getInstance(): RealNameModel {
            if (!RealNameModel._instance) {
                RealNameModel._instance = new RealNameModel();
            }
            return RealNameModel._instance;
        }

        public static RealNameOpt(status) {
            let _isIndulge = 0;
            let _isCertification = 0;
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
                let arg = {};
                arg[Protocol.game_welfare_updateRealName.args.fcm] = _isIndulge;
                arg[Protocol.game_welfare_updateRealName.args.shiming] = _isCertification;
                PLC.request(Protocol.game_welfare_updateRealName, arg, () => {
                    dispatchEvt(new ResEvent(ResEvent.ISCERTIFICATION_EVENT));
                });
            }
        }

    }
}