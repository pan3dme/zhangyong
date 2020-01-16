var game;
(function (game) {
    var RankVo = /** @class */ (function () {
        function RankVo(data, rank) {
            this.uid = data[0];
            this.guanqia = data[1];
            this.name = data[2];
            this.head = data[3];
            this.level = data[4];
            this.guildName = data[5];
            this.headFrame = data[6];
            this.rank = rank;
        }
        RankVo.prototype.getName = function () {
            return this.rank <= 3 ? this.name + " (" + this.level + LanMgr.getLan('', 10031) + ")" : this.name;
        };
        RankVo.prototype.getRank = function () {
            return this.rank;
        };
        RankVo.prototype.getHeadVo = function () {
            if (!this._headVo) {
                this._headVo = new UserHeadVo(this.head, this.level, this.headFrame);
            }
            return this._headVo;
        };
        RankVo.prototype.getValue = function () {
            var info = tb.TB_copy_info.get_TB_copy_infoById(this.guanqia);
            var copy = info ? tb.TB_copy.get_TB_copyById(info.area) : null;
            return copy ? LanMgr.getLan('', (copy.sub_type == game.ShiliantaType.jiandan ? 10102 : 10103), info.area_number) : LanMgr.getLan('', 10051);
        };
        RankVo.prototype.getDesc = function () {
            return LanMgr.getLan('', 10148);
        };
        return RankVo;
    }());
    game.RankVo = RankVo;
})(game || (game = {}));
