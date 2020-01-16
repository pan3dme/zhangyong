var game;
(function (game) {
    var PrRankVo = /** @class */ (function () {
        function PrRankVo(id, index, arrData) {
            this.id = id;
            this.index = index;
            this.rank = String(index + 1);
            this.hasPerson = arrData != null;
            if (this.hasPerson) {
                if (this.id == PrRankVo.ID_SHENLING) {
                    //神灵
                    this.playerID = arrData[0];
                    this.name = arrData[4];
                    this.level = arrData[6];
                    this.head = arrData[5];
                    this.guild = arrData[7];
                    this.power = arrData[1];
                    this.slShenLi = arrData[2];
                    this.shenlingid = arrData[3];
                    this.headFrame = arrData[8];
                }
                else {
                    this.playerID = arrData[0];
                    this.name = arrData[2];
                    this.level = arrData[4];
                    this.head = arrData[3];
                    this.guild = arrData[5];
                    this.power = arrData[1];
                    this.headFrame = arrData[6];
                }
            }
            else {
                this.clear();
            }
        }
        PrRankVo.prototype.copyInfo = function (info) {
            if (info && info.hasPerson) {
                this.playerID = info.playerID;
                this.name = info.name;
                this.level = info.level;
                this.head = info.head;
                this.headFrame = info.headFrame;
                this.guild = info.guild;
                this.power = info.power;
                this.shenlingid = info.shenlingid;
                this.slShenLi = info.slShenLi;
                this.hasPerson = true;
            }
            else {
                this.clear();
            }
        };
        PrRankVo.prototype.clear = function () {
            this.playerID = "";
            this.name = "";
            this.level = 0;
            this.head = null;
            this.headFrame = 0;
            this.guild = "";
            this.power = 0;
            this.shenlingid = 0;
            this.slShenLi = 0;
            this.hasPerson = false;
        };
        //获取标题
        PrRankVo.prototype.getTitle = function () {
            switch (this.id) {
                case PrRankVo.ID_FUBEN: //副本
                    return LanMgr.getLan("", 10148);
                case PrRankVo.ID_LEVEL: //等级
                    return LanMgr.getLan("", 12179);
                    ;
                case PrRankVo.ID_SHENLING: //神灵
                    return LanMgr.getLan("", 12081);
                    ;
                case PrRankVo.ID_SHILIAN: //试炼
                    return LanMgr.getLan("", 12183);
                    ;
                case PrRankVo.ID_ZHANLI: //战力
                    return LanMgr.getLan("", 12081);
                    ;
                default:
                    return "";
            }
        };
        //获取标题
        PrRankVo.prototype.getConditionTitle = function () {
            switch (this.id) {
                case PrRankVo.ID_FUBEN: //副本
                    return LanMgr.getLan("", 10148);
                case PrRankVo.ID_LEVEL: //等级
                    return LanMgr.getLan("", 12179);
                    ;
                case PrRankVo.ID_SHENLING: //神灵
                    return LanMgr.getLan("", 12629);
                    ;
                case PrRankVo.ID_SHILIAN: //试炼
                    return LanMgr.getLan("", 12183);
                case PrRankVo.ID_ZHANLI: //战力
                    return LanMgr.getLan("", 12081);
                    ;
                default:
                    return "";
            }
        };
        //获取条件描述
        PrRankVo.prototype.getConditionDesc = function () {
            switch (this.id) {
                case PrRankVo.ID_FUBEN: //副本
                    return LanMgr.getLan("", 12628) + game.GuajiModel.getInstance().getCopyRankDesc(this.reward.score);
                case PrRankVo.ID_LEVEL: //等级
                    return LanMgr.getLan("", 12501) + this.reward.score + LanMgr.getLan("", 10031);
                case PrRankVo.ID_SHENLING: //星级
                    return LanMgr.getLan("", 12501) + this.reward.score + LanMgr.getLan("", 12528);
                case PrRankVo.ID_SHILIAN: //试炼
                    return LanMgr.getLan("", 12628) + game.TowerModel.getInstance().getCopyRankDesc(this.reward.score);
                case PrRankVo.ID_ZHANLI: //神力
                    return LanMgr.getLan("", 12501) + this.reward.score;
                default:
                    return "";
            }
        };
        //获取神灵名字
        PrRankVo.prototype.getShenLingName = function () {
            var god = tb.TB_god.get_TB_godById(this.shenlingid);
            return god ? god.name : "";
        };
        //获取描述
        PrRankVo.prototype.getValueDesc = function () {
            switch (this.id) {
                case PrRankVo.ID_FUBEN: //副本
                    return game.GuajiModel.getInstance().getCopyRankDesc(this.power);
                case PrRankVo.ID_LEVEL: //等级
                    return this.power + LanMgr.getLan("", 10031);
                case PrRankVo.ID_SHENLING: //星级
                    return this.slShenLi + "";
                case PrRankVo.ID_SHILIAN: //试炼
                    return game.TowerModel.getInstance().getCopyRankDesc(this.power);
                case PrRankVo.ID_ZHANLI: //神力
                    return this.power + "";
                default:
                    return "";
            }
        };
        PrRankVo.ID_ZHANLI = 1;
        PrRankVo.ID_FUBEN = 2;
        PrRankVo.ID_LEVEL = 3;
        PrRankVo.ID_SHILIAN = 4;
        PrRankVo.ID_SHENLING = 5;
        return PrRankVo;
    }());
    game.PrRankVo = PrRankVo;
})(game || (game = {}));
