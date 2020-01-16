var game;
(function (game) {
    var CopyTeamFightVo = /** @class */ (function () {
        function CopyTeamFightVo(copyFloor, memberInfo) {
            this.copyFloor = copyFloor;
            this.memberlist = memberInfo;
        }
        CopyTeamFightVo.prototype.getCurAtkForce = function (curWave) {
            var item = this.getPosMember(curWave);
            return (item && item.force) || 0;
        };
        CopyTeamFightVo.prototype.getMonster = function () {
            var tab = tb.TB_team_copy.getTB_team_copyById(this.copyFloor);
            if (!tab)
                return [[]];
            return [tab.monster];
        };
        CopyTeamFightVo.prototype.setHeadData = function (data, curWave) {
            var tab = tb.TB_team_copy.getTB_team_copyById(this.copyFloor);
            if (tab) {
                var tbmonster = tb.TB_monster.get_TB_monsterById(tab.monster_show);
                data.enemyLevel = tbmonster.level;
                data.enemyName = tbmonster.name;
            }
            var item = this.getPosMember(curWave);
            if (item) {
                data.ownLevel = item.level;
                data.ownName = item.name;
            }
        };
        /** 获得展示的怪物信息对象 */
        CopyTeamFightVo.prototype.getShowMonsterVo = function () {
            var tab = tb.TB_team_copy.getTB_team_copyById(this.copyFloor);
            if (!tab)
                return null;
            var monstertab = tb.TB_monster.get_TB_monsterById(tab.monster_show);
            var vo = new copyTeamFightMember;
            vo.head = monstertab.icon;
            vo.modelId = monstertab.model;
            vo.headFrame = 0;
            vo.level = monstertab.level;
            vo.name = monstertab.name;
            return vo;
        };
        CopyTeamFightVo.prototype.getPosMember = function (curWave) {
            var pos = curWave + 1;
            if (this.memberlist) {
                this.memberlist.sort(function (a, b) {
                    return a.pos - b.pos;
                });
                return this.memberlist[curWave];
            }
            else {
                return null;
            }
        };
        return CopyTeamFightVo;
    }());
    game.CopyTeamFightVo = CopyTeamFightVo;
    var copyTeamFightMember = /** @class */ (function () {
        function copyTeamFightMember() {
        }
        return copyTeamFightMember;
    }());
    game.copyTeamFightMember = copyTeamFightMember;
})(game || (game = {}));
