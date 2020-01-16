var game;
(function (game) {
    var FightVo = /** @class */ (function () {
        function FightVo() {
        }
        FightVo.prototype.getMapid = function () {
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.underground:
                case iface.tb_prop.copyTypeKey.tower:
                    return this.tab_copyinfo.scene;
                case CopyType.glory:
                    return tb.TB_honour_set.getSet().scene;
                case CopyType.jingji_pve:
                case CopyType.jingji_record:
                case CopyType.qiecuo:
                    return tb.TB_arena_new_set.getArenaNewSet().map;
                case CopyType.arenaMatch:
                    return tb.TB_match_set.getSet().map;
                case CopyType.dailycopy:
                    return tb.TB_copy_set.getCopySet().daily_copymap;
                case CopyType.yuanzhenCopy:
                    return tb.TB_copy_set.getCopySet().expedition_map;
                case CopyType.fogForest:
                    return tb.TB_forest_set.getSet().scene;
                case CopyType.worldboss:
                    return tb.TB_boss_set.getSet().map;
                case CopyType.escort:
                    return tb.TB_escort_set.getSet().scene;
                case CopyType.guildFight:
                    return tb.TB_guild_war_set.getSet().scene;
                case CopyType.guildCopy:
                    return tb.TB_guild_set.getSet().map;
                case CopyType.island:
                    return tb.TB_island_set.getSet().scene;
                case CopyType.godDomain:
                    return tb.TB_fight_goddomain_set.getSet().map;
                case CopyType.teamCopy:
                    return tb.TB_team_set.getTB_team_set().map;
                default:
                    return 23;
            }
        };
        //获得自己处于什么阵营中
        FightVo.prototype.getCamp = function () {
            switch (this.copyType) {
                case CopyType.godDomain:
                    return this.godDomainVo.getSelfCamp();
                case CopyType.glory:
                    return this.gloryMatchVo.getSelfCamp();
                default:
                    return battle.BatteConsts.BATTLE_CAMPATK;
            }
        };
        FightVo.prototype.guochangAction = function () {
            switch (this.copyType) {
                case CopyType.godDomain:
                    return tl3d.CharAction.ATTACK_01;
                case CopyType.teamCopy:
                    return tl3d.CharAction.STANAD;
                default:
                    return tl3d.CharAction.WALK;
            }
        };
        FightVo.prototype.fightStart = function (optType, closeCb) {
            var _dataSource = null;
            switch (this.copyType) {
                case CopyType.godDomain:
                    var teams = this.godDomainVo.getFightTeams(this.fightPageControl.curwave - 1);
                    var vo = {
                        leftInfo: this.godDomainVo.leftInfo,
                        rightInfo: this.godDomainVo.rightInfo,
                        teams: teams,
                        selfCamp: this.getCamp()
                    };
                    _dataSource = { optType: optType, vo: vo, cb: closeCb };
                    if (UIMgr.hasStage(UIConst.GodDomain_FightStart)) {
                        var ui_1 = UIMgr.getUIByName(UIConst.GodDomain_FightStart);
                        ui_1.dataSource = _dataSource;
                        ui_1.refresh();
                    }
                    else {
                        UIMgr.showUI(UIConst.GodDomain_FightStart, _dataSource);
                    }
                    break;
                case CopyType.teamCopy:
                    var monsterdata = this.copyTeamFightVo.getShowMonsterVo();
                    if (monsterdata) {
                        monsterdata.force = this.getEnemyForce();
                    }
                    var playerdata = this.copyTeamFightVo.getPosMember(this.fightPageControl.curwave - 1);
                    if (playerdata) {
                        var temp = null;
                        var temps = playerdata.lineupInfo[0];
                        for (var key in temps) {
                            if (temps[key]) {
                                temp = temps[key];
                                break;
                            }
                        }
                        if (temp) {
                            playerdata.modelId = game.GodUtils.getShowGodModel(temp[0], temp[6]);
                        }
                    }
                    _dataSource = { optType: optType, vo: { leftInfo: playerdata, rightInfo: monsterdata }, cb: closeCb };
                    if (UIMgr.hasStage(UIConst.CopyTeamFightStart)) {
                        var ui_2 = UIMgr.getUIByName(UIConst.CopyTeamFightStart);
                        ui_2.dataSource = _dataSource;
                        ui_2.refresh();
                    }
                    else {
                        UIMgr.showUI(UIConst.CopyTeamFightStart, _dataSource);
                    }
                    break;
                default:
                    var isJingYing = false;
                    if (this.copyType == iface.tb_prop.copyTypeKey.rune && this.tab_copyinfo.boss_icon == 0) {
                        isJingYing = true;
                    }
                    var flag = this.copyType == CopyType.guildCopy || this.copyType == CopyType.worldboss || (this.copyType == iface.tb_prop.copyTypeKey.rune && this.tab_copyinfo.boss_icon > 0);
                    _dataSource = { optType: optType, cb: closeCb, isBoss: flag, isJy: isJingYing };
                    if (UIMgr.hasStage(UIConst.General_FightStart)) {
                        var ui_3 = UIMgr.getUIByName(UIConst.General_FightStart);
                        ui_3.dataSource = _dataSource;
                        ui_3.refresh();
                    }
                    else {
                        UIMgr.showUI(UIConst.General_FightStart, _dataSource);
                    }
                    break;
            }
        };
        //获得总波数
        FightVo.prototype.getTotalWave = function () {
            return this.fightPageControl.getWaveNum();
        };
        /**
         * 获得怪物id 二维数组划分
         */
        FightVo.prototype.getEnemyIdAry = function () {
            var ary = new Array();
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.underground:
                case iface.tb_prop.copyTypeKey.tower:
                    return this.tab_copyinfo.monster;
                case CopyType.teamCopy:
                    //组队副本计算怪物的战斗里
                    return this.copyTeamFightVo.getMonster();
                case CopyType.qiecuo:
                    return [this.qiecuoVo.getLineupGodIds()];
                case CopyType.dailycopy:
                    return [this.dailyCopyInfo.tbCopy.monster];
                case CopyType.yuanzhenCopy:
                    return [this.yuanzhengCopyVo.getLineupGodIds()];
                case CopyType.fogForest:
                    return this.forestGuanqia.tbForest.monster;
                case CopyType.worldboss:
                    return [this.worldBossInfo.tbBoss.monster];
                case CopyType.escort:
                    var lineupInfolist = this.caravanInfoVo.lineupInfo[0];
                    for (var i = 0; i < lineupInfolist.length; i++) {
                        var element = lineupInfolist[i];
                        ary.push((element && element.length > 3) ? element[0] : 0);
                    }
                    return [ary];
                case CopyType.guildFight:
                    return [this.guildMemberVo.getLineupGodIds()];
                case CopyType.guildCopy:
                    return [this.guildGuanqiaVo.tbCopy.moster];
                case CopyType.island:
                    return [this.islandOreInfo.getLineupGodIds()];
            }
            return [];
        };
        FightVo.prototype.getFightName = function () {
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                    return game.GuajiModel.getInstance().copyName[this.tab_copy.sub_type] + " " + this.tab_copy.chapter + "-" + this.tab_copyinfo.area_number;
                case iface.tb_prop.copyTypeKey.underground:
                case iface.tb_prop.copyTypeKey.tower:
                    return this.tab_copyinfo.name;
                case CopyType.glory:
                    return LanMgr.getLan("", 12413);
                case CopyType.arenaMatch:
                    return LanMgr.getLan("", 12414);
                case CopyType.jingji_pve:
                case CopyType.jingji_record:
                    return LanMgr.getLan("", 12415);
                case CopyType.qiecuo:
                    return LanMgr.getLan("", 12416);
                case CopyType.dailycopy:
                    return LanMgr.getLan("", 12417);
                case CopyType.yuanzhenCopy:
                    return LanMgr.getLan("", 12418) + " " + this.yuanzhengCopyVo.guanqiaVo.tbCopy.ID + LanMgr.getLan("", 12419);
                case CopyType.fogForest:
                    return LanMgr.getLan("", 12420) + " " + this.forestGuanqia.tbForest.ID + LanMgr.getLan("", 12419);
                case CopyType.worldboss:
                    return LanMgr.getLan("", 12421);
                case CopyType.escort:
                    return LanMgr.getLan("", 12422);
                case CopyType.guildFight:
                    return LanMgr.getLan("", 12423);
                case CopyType.guildCopy:
                    return LanMgr.getLan("", 12424);
                case CopyType.island:
                    return LanMgr.getLan("", 12425);
                case CopyType.godDomain:
                    return LanMgr.getLan("", 12426);
                case CopyType.teamCopy:
                    return LanMgr.getLan("", 12427);
                default:
                    return "xxx";
            }
        };
        FightVo.prototype.getWaveAndWave = function () {
            return this.fightPageControl.getTitle();
        };
        FightVo.prototype.getMaxWave = function () {
            return this.fightPageControl.getWaveNum();
        };
        FightVo.prototype.getAllRound = function () {
            switch (this.copyType) {
                case CopyType.jingji_pve:
                case CopyType.jingji_record:
                case CopyType.jingji_npc:
                    return tb.TB_arena_new_set.getArenaNewSet().round_max;
                case CopyType.guildCopy:
                    return tb.TB_guild_set.getSet().round_max;
                case CopyType.worldboss:
                    return tb.TB_boss_set.getSet().round_max;
                case CopyType.arenaMatch:
                    return tb.TB_match_set.getSet().round_max;
                case CopyType.godDomain:
                    return tb.TB_fight_goddomain_set.getSet().time;
                default:
                    return tb.TB_copy_set.getCopySet().round_max;
            }
        };
        //获得下一个回合数据
        FightVo.prototype.getNextRound = function () {
            return this.fightPageControl.getNextRound();
        };
        /**
         * 是否可跳过
         */
        FightVo.prototype.canJump = function () {
            var tbconfig = this.getConfigSet();
            return tbconfig ? tbconfig.is_skip == 1 : false;
        };
        FightVo.prototype.getConfigSet = function () {
            var id = 19;
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                    id = 1;
                    break;
                case iface.tb_prop.copyTypeKey.underground:
                    id = 3;
                    break;
                case iface.tb_prop.copyTypeKey.tower:
                    id = 2;
                    break;
                case CopyType.glory:
                    id = 13;
                    break;
                case CopyType.arenaMatch:
                    id = this.arenaMatchVo.isRecord() ? 17 : 14;
                    break;
                case CopyType.godDomain:
                    id = 18;
                    break;
                case CopyType.jingji_record:
                    id = 5;
                    break;
                case CopyType.jingji_pve:
                    id = 4;
                    break;
                case CopyType.qiecuo:
                    id = 16;
                    break;
                case CopyType.dailycopy:
                    id = 9;
                    break;
                case CopyType.yuanzhenCopy:
                    id = 6;
                    break;
                case CopyType.fogForest:
                    id = 8;
                    break;
                case CopyType.worldboss:
                    id = 12;
                    break;
                case CopyType.escort:
                    id = 7;
                    break;
                case CopyType.guildFight:
                    id = 11;
                    break;
                case CopyType.guildCopy:
                    id = 10;
                    break;
                case CopyType.island:
                    id = 15;
                    break;
                case CopyType.teamCopy:
                    id = 20;
                    break;
            }
            if (id == 19) {
                logerror("-----------------为找到相应的战斗id-------------------");
            }
            return tb.TB_copy_config.getSet(id);
        };
        FightVo.prototype.getOwnForce = function () {
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.tower:
                case CopyType.jingji_pve:
                case CopyType.qiecuo:
                case CopyType.dailycopy:
                case CopyType.fogForest:
                case CopyType.worldboss:
                case CopyType.escort:
                case CopyType.guildFight:
                case CopyType.guildCopy:
                case CopyType.island:
                    return App.hero.force;
                case CopyType.arenaMatch:
                    return this.arenaMatchVo.getForce();
                case CopyType.glory:
                    return this.gloryMatchVo.svo.leftForce;
                case CopyType.jingji_record:
                    return this.arenaReportVo.force;
                case CopyType.yuanzhenCopy:
                    return getLineupForce(this.getOwnTeam());
                case CopyType.godDomain:
                    var teams = this.godDomainVo.getFightTeams(this.fightPageControl.curwave - 1);
                    var isLeft = this.getCamp() == battle.BatteConsts.BATTLE_CAMPATK;
                    var leftvo = isLeft ? this.godDomainVo.leftInfo[teams[0]] : this.godDomainVo.rightInfo[teams[1]];
                    return leftvo.force;
                case CopyType.teamCopy:
                    return this.copyTeamFightVo.getCurAtkForce(this.fightPageControl.curwave - 1);
                default:
                    return 0;
            }
        };
        FightVo.prototype.getEnemyForce = function () {
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.tower:
                case CopyType.dailycopy:
                case CopyType.fogForest:
                case CopyType.worldboss:
                case CopyType.guildCopy:
                    var enemyteam = this.getEnemyTeam()[this.fightPageControl.curwave - 1];
                    if (!enemyteam)
                        return 0;
                    var teamList = enemyteam[0];
                    return this.calMonsterForce(teamList);
                case CopyType.jingji_pve:
                    return this.arenaReportVo.force;
                case CopyType.qiecuo:
                    return this.qiecuoVo.svo.force;
                case CopyType.arenaMatch:
                    return this.arenaMatchVo.getTagForce();
                case CopyType.escort:
                    return this.caravanInfoVo.svo.force;
                case CopyType.guildFight:
                    return this.guildMemberVo.svo.force;
                case CopyType.island:
                    return this.islandOreInfo.svo.force;
                case CopyType.glory:
                    return this.gloryMatchVo.svo.rightForce;
                case CopyType.jingji_record:
                    return this.arenaReportVo.targetforce;
                case CopyType.yuanzhenCopy:
                    return this.yuanzhengCopyVo.svo.force;
                case CopyType.godDomain:
                    var teams = this.godDomainVo.getFightTeams(this.fightPageControl.curwave - 1);
                    var isLeft = this.getCamp() == battle.BatteConsts.BATTLE_CAMPATK;
                    var rightvo = isLeft ? this.godDomainVo.rightInfo[teams[1]] : this.godDomainVo.leftInfo[teams[0]];
                    return rightvo.force;
                case CopyType.teamCopy:
                    var copyTeamDef = this.getEnemyTeam()[0];
                    if (!copyTeamDef)
                        return 0;
                    var copyTeamDefCamp = copyTeamDef[0];
                    return this.calMonsterForce(copyTeamDefCamp);
                default:
                    return 0;
            }
        };
        FightVo.prototype.calMonsterForce = function (monsterCamp) {
            var tab = null;
            var force = 0;
            for (var i = 0; monsterCamp && i < monsterCamp.length; i++) {
                var element = monsterCamp[i];
                if (element) {
                    tab = tb.TB_god.get_TB_godById(Number(element[0]));
                    force += getForce(element[3], tab ? tab.quality : 1);
                }
            }
            return force;
        };
        /**
             * 自定义出站阵容,不需求可不使用。我方
             */
        FightVo.prototype.getTeamLineup = function () {
            switch (this.copyType) {
                case CopyType.yuanzhenCopy:
                    return iface.tb_prop.lineupTypeKey.expedition;
                default:
                    return iface.tb_prop.lineupTypeKey.attack;
            }
        };
        /**
             * 自定义初始化血量,不需求可不使用
             * 设置百分比
             */
        FightVo.prototype.getTeamHp = function () {
            var hpInfo = {};
            switch (this.copyType) {
                case CopyType.yuanzhenCopy:
                    var hpAry = this.yuanzhengCopyVo.getSelfGodsHp();
                    for (var i = 0; i < hpAry.length; i++) {
                        hpInfo[battle.BatteConsts.BATTLE_CAMPATK * 100 + (i + 1)] = hpAry[i];
                    }
                    var ehpAry = this.yuanzhengCopyVo.getEnemyGodsHpAry();
                    for (var j = 0; j < ehpAry.length; j++) {
                        hpInfo[battle.BatteConsts.BATTLE_CAMPDEF * 100 + (j + 1)] = ehpAry[j];
                    }
                    logfight("战斗初始化血量：", hpInfo);
                    return isEmptyObject(hpInfo) ? null : hpInfo;
                case CopyType.worldboss:
                    var worldBossHpAry = this.worldBossInfo.getMonstersHp();
                    for (var k = 0; k < worldBossHpAry.length; k++) {
                        hpInfo[battle.BatteConsts.BATTLE_CAMPDEF * 100 + (k + 1)] = worldBossHpAry[k];
                    }
                    logfight("战斗初始化血量：", hpInfo);
                    return isEmptyObject(hpInfo) ? null : hpInfo;
                case CopyType.guildFight:
                    var guildMemberHpAry = this.guildMemberVo.getEnemyGodsHpAry();
                    for (var y = 0; y < guildMemberHpAry.length; y++) {
                        hpInfo[battle.BatteConsts.BATTLE_CAMPDEF * 100 + (y + 1)] = guildMemberHpAry[y];
                    }
                    logfight("战斗初始化血量：", hpInfo);
                    return isEmptyObject(hpInfo) ? null : hpInfo;
                case CopyType.guildCopy:
                    var guildCopyHpAry = this.guildGuanqiaVo.getMonstersHp();
                    for (var z = 0; z < guildCopyHpAry.length; z++) {
                        hpInfo[battle.BatteConsts.BATTLE_CAMPDEF * 100 + (z + 1)] = guildCopyHpAry[z];
                    }
                    logfight("战斗初始化血量：", hpInfo);
                    return isEmptyObject(hpInfo) ? null : hpInfo;
                default:
                    return null;
            }
        };
        FightVo.prototype.getFightVo = function () {
            switch (this.copyType) {
                case CopyType.qiecuo:
                    return this.qiecuoVo;
                case CopyType.guildFight:
                    return this.guildMemberVo;
                case CopyType.yuanzhenCopy:
                    return this.yuanzhengCopyVo;
                case CopyType.escort:
                    return this.caravanInfoVo;
                case CopyType.island:
                    return this.islandOreInfo;
                // case CopyType.arenaMatch:
                //     return this.arenaMatchVo;
                default:
                    return null;
            }
        };
        /**
         * 敌方神器 fix：多波战斗时，需要取多次，会不会有区分
         */
        FightVo.prototype.getEnemyShenQi = function () {
            var fightVo = this.getFightVo();
            if (fightVo) {
                var shenqiVo = fightVo.shenqiVo;
                return shenqiVo && shenqiVo.length >= 2 ? shenqiVo : [];
            }
            return [];
        };
        FightVo.prototype.getMyShenQi = function () {
            var lineUp = this.getTeamLineup();
            if (App.hero.lineupArtifactInfo.hasOwnProperty(lineUp)) {
                var id = Number(App.hero.lineupArtifactInfo[lineUp]);
                if (id > 0) {
                    return [id, App.hero.artifactSkillLv, App.hero.artifactStrengthLv];
                }
            }
            return [];
        };
        FightVo.prototype.getOwnTeam = function () {
            var lineupType = this.getTeamLineup();
            var infoary = new Array;
            var godItemAry = App.hero.getLineUpTeam(lineupType, true);
            for (var i = 0; i < godItemAry.length; i++) {
                var item = godItemAry[i];
                if (!item) {
                    infoary.push(null);
                }
                else {
                    var ary = null;
                    if (item.isAid) {
                        var aidvo = game.YuanzhengModel.getInstance().getHelpItemByUuid(item.uuid);
                        ary = (aidvo ? aidvo.godInfo : null);
                        if (ary) {
                            ary[7] = String(item.templateId);
                        }
                    }
                    else {
                        ary = new Array;
                        ary.push(item.templateId);
                        ary.push(item.starLevel);
                        ary.push(item.level);
                        ary.push(item.getFightAttr(lineupType));
                        ary.push(item.degree);
                        ary.push(item.awakenLv);
                        ary.push(item.skinId);
                        ary.push(item.uuid);
                    }
                    infoary.push(ary);
                }
            }
            return [infoary, this.getMyShenQi()];
        };
        /**
         * 获得头像等信息
         */
        FightVo.prototype.getHeadData = function () {
            var data = { ownName: App.hero.name, enemyName: "异常啦", ownLevel: App.hero.level, enemyLevel: 0, ownTeam: {}, enemyTeam: {}, ownForce: 0, enemyForce: 0, title: this.getFightName() };
            // let ownData = { level: App.hero.level, name: App.hero.name, team: {} };
            // let enemyData = { level: 0, name: "异常啦", team: {} };
            switch (this.copyType) {
                //服务端给对战列表
                case CopyType.qiecuo:
                    this.setHeadData(data, 1, this.qiecuoVo.svo.level, this.qiecuoVo.svo.name);
                    break;
                case CopyType.escort:
                    this.setHeadData(data, 1, this.caravanInfoVo.svo.level, this.caravanInfoVo.svo.name);
                    break;
                case CopyType.yuanzhenCopy:
                    this.setHeadData(data, 1, this.yuanzhengCopyVo.svo.level, this.yuanzhengCopyVo.svo.name);
                    break;
                case CopyType.guildFight:
                    this.setHeadData(data, 1, this.guildMemberVo.svo.level, this.guildMemberVo.svo.name);
                    break;
                case CopyType.island:
                    this.setHeadData(data, 1, this.islandOreInfo.svo.level, this.islandOreInfo.svo.playerName);
                    break;
                //服务端战斗
                case CopyType.glory:
                    this.setHeadData(data, 2, this.gloryMatchVo.svo.leftLevel, this.gloryMatchVo.svo.leftName);
                    this.setHeadData(data, 1, this.gloryMatchVo.svo.rightLevel, this.gloryMatchVo.svo.rightName);
                    break;
                case CopyType.arenaMatch:
                    this.setHeadData(data, 1, this.arenaMatchVo.level, this.arenaMatchVo.name);
                    break;
                case CopyType.jingji_pve:
                case CopyType.jingji_record:
                    this.setHeadData(data, 1, 10, this.arenaReportVo.name);
                    break;
                case CopyType.godDomain:
                    var teams = this.godDomainVo.getFightTeams(this.fightPageControl.curwave - 1);
                    var isLeft = this.getCamp() == battle.BatteConsts.BATTLE_CAMPATK;
                    var leftvo = isLeft ? this.godDomainVo.leftInfo[teams[0]] : this.godDomainVo.rightInfo[teams[1]];
                    var rightvo = isLeft ? this.godDomainVo.rightInfo[teams[1]] : this.godDomainVo.leftInfo[teams[0]];
                    this.setHeadData(data, 2, leftvo.level, leftvo.name);
                    this.setHeadData(data, 1, rightvo.level, rightvo.name);
                    break;
                case CopyType.teamCopy:
                    this.copyTeamFightVo.setHeadData(data, this.fightPageControl.curwave - 1);
                    break;
                default:
                    //客户端读表取阵容
                    var tbGod = void 0;
                    var temp = void 0;
                    var _animysAry = this.getEnemyIdAry();
                    for (var i = 0; i < _animysAry.length; i++) {
                        var waveList = _animysAry[i];
                        for (var k = 0; k < waveList.length; k++) {
                            var templateId = Number(waveList[k]);
                            if (!temp) {
                                temp = tb.TB_monster.get_TB_monsterById(templateId);
                                if (temp && temp.type > 0) {
                                    break;
                                }
                            }
                            else {
                                tbGod = tb.TB_monster.get_TB_monsterById(templateId);
                                if (tbGod && tbGod.type > 0) {
                                    temp = tbGod;
                                    break;
                                }
                            }
                        }
                    }
                    if (temp) {
                        this.setHeadData(data, 1, temp.level, temp.name);
                    }
                    break;
            }
            //获取第几波的阵容信息
            var waveobj = this.fightPageControl.getWaveObj();
            for (var team in waveobj) {
                if (team == "1") {
                    data.ownTeam = this.doHalo(waveobj[team]);
                }
                else {
                    data.enemyTeam = this.doHalo(waveobj[team]);
                }
            }
            data.ownForce = Math.ceil(this.getOwnForce());
            data.enemyForce = Math.ceil(this.getEnemyForce());
            return data;
        };
        FightVo.prototype.doHalo = function (waveTeamObj) {
            var tempobj = {};
            var tempbuff = {};
            var tempkey, temptab;
            var tempNums = [0, 0, 0, 0, 0, 0];
            for (var key in waveTeamObj) {
                for (var id in waveTeamObj[key]) {
                    tempkey = waveTeamObj[key][id];
                    if (key == "god") {
                        temptab = tb.TB_god.get_TB_godById(tempkey);
                    }
                    else {
                        temptab = tb.TB_monster.get_TB_monsterById(tempkey);
                    }
                    tempNums[temptab.race_type]++;
                    tempobj[id] = { race: temptab.race_type, active: false };
                }
            }
            var data = TableData.getInstance().getTableByName(TableData.tb_halo).data;
            var temptype;
            for (var key_1 in data) {
                tempkey = data[key_1].type;
                var type = Math.floor(tempkey / tb.TB_halo.TYPE_BASE);
                var num = tempkey % tb.TB_halo.TYPE_BASE;
                if (type == 0) {
                    //全阵营
                    if (tempNums[1] > 0 && tempNums[2] > 0 && tempNums[3] > 0 && tempNums[4] > 0 && tempNums[5] > 0) {
                        tempbuff[type] = num;
                    }
                }
                else {
                    if (tempNums[type] >= num) {
                        if (!tempbuff.hasOwnProperty(type) || tempbuff[type] < num) {
                            tempbuff[type] = num;
                        }
                    }
                }
            }
            for (var key in tempbuff) {
                this.resetRaceAct(tempobj, key, tempbuff[key]);
            }
            return { lineup: tempobj, teamInfo: tempbuff };
        };
        FightVo.prototype.resetRaceAct = function (tempobj, race, num) {
            var temp = null, tempnum = 0;
            if (Number(race) == 0) {
                for (var key in tempobj) {
                    tempobj[key].active = true;
                }
            }
            else {
                for (var key in tempobj) {
                    temp = tempobj[key];
                    if (temp.race == Number(race) && tempnum < Number(num)) {
                        temp.active = true;
                        tempnum++;
                    }
                }
            }
        };
        FightVo.prototype.setHeadData = function (data, type, level, playerName) {
            if (type == 1) {
                data.enemyLevel = level;
                data.enemyName = playerName;
            }
            else {
                data.ownLevel = level;
                data.ownName = playerName;
            }
        };
        FightVo.prototype.getEnemyTeam = function () {
            switch (this.copyType) {
                case CopyType.qiecuo:
                    return [this.qiecuoVo.lineupInfo];
                case CopyType.escort:
                    return [this.caravanInfoVo.lineupInfo];
                case CopyType.yuanzhenCopy:
                    return [this.yuanzhengCopyVo.lineupInfo];
                case CopyType.guildFight:
                    return [this.guildMemberVo.lineupInfo];
                case CopyType.island:
                    return [this.islandOreInfo.lineupInfo];
                default:
                    return this.resetList();
            }
        };
        FightVo.prototype.resetList = function () {
            var alllist = new Array;
            var _animysAry = this.getEnemyIdAry();
            for (var i = 0; i < _animysAry.length; i++) {
                //波
                var waveList = _animysAry[i];
                var infoary = new Array;
                for (var k = 0; k < waveList.length; k++) {
                    var templateId = Number(waveList[k]);
                    if (templateId == 0) {
                        //兼容站位
                        infoary.push(null);
                        continue;
                    }
                    var tbGod = void 0;
                    var attr = {};
                    var level = 0;
                    var star = 0;
                    var tempKey = [];
                    switch (this.copyType) {
                        case iface.tb_prop.copyTypeKey.rune:
                        case iface.tb_prop.copyTypeKey.underground:
                        case iface.tb_prop.copyTypeKey.tower:
                        case CopyType.dailycopy:
                        case CopyType.fogForest:
                        case CopyType.worldboss:
                        case CopyType.guildCopy:
                        case CopyType.teamCopy:
                            tbGod = tb.TB_monster.get_TB_monsterById(templateId);
                            if (!tbGod) {
                                logerror("怪物不存在:%d", templateId);
                                continue;
                            }
                            star = tbGod.star;
                            attr = ary2map(tbGod.attr);
                            level = tbGod.level;
                            var tempAttr = modifyPasvAttr(tbGod.skill);
                            var fixed = tempAttr[0];
                            var precent = tempAttr[1];
                            var tempfixed = void 0;
                            var temppercent = void 0;
                            // for (var key in attr) {
                            //     tempfixed = fixed[key] || 0;
                            //     temppercent = precent[key] || 0;
                            //     attr[key] = calAddAttr(key,tempfixed,temppercent,attr[key]);
                            // }
                            for (var key in fixed) {
                                tempfixed = fixed[key] || 0;
                                temppercent = precent[key] || 0;
                                attr[key] = calAddAttr(key, tempfixed, temppercent, attr[key]);
                                tempKey.push(key);
                            }
                            for (var key in precent) {
                                if (tempKey.indexOf(key) != -1) {
                                    continue;
                                }
                                tempfixed = fixed[key] || 0;
                                temppercent = precent[key] || 0;
                                attr[key] = calAddAttr(key, tempfixed, temppercent, attr[key]);
                            }
                            break;
                        default:
                            break;
                    }
                    var ary = new Array;
                    ary.push(templateId);
                    ary.push(star);
                    ary.push(level);
                    ary.push(attr);
                    ary.push(999);
                    ary.push(999);
                    ary.push(0);
                    ary.push(tbGod.ID);
                    infoary.push(ary);
                }
                alllist.push([infoary, this.getEnemyShenQi()]);
            }
            return alllist;
        };
        FightVo.prototype.getCopyId = function () {
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.underground:
                case iface.tb_prop.copyTypeKey.tower:
                    return this.tab_copyinfo.ID;
                case CopyType.guildCopy:
                    return this.guildGuanqiaVo.tbCopy.ID;
                case CopyType.worldboss:
                    return this.worldBossInfo.tbBoss.ID;
                case CopyType.dailycopy:
                    return this.dailyCopyInfo.tbCopy.ID;
                case CopyType.yuanzhenCopy:
                    return this.yuanzhengCopyVo.guanqiaVo.tbCopy.ID;
                case CopyType.escort:
                    return this.caravanInfoVo.tbEscort.ID;
                case CopyType.fogForest:
                    return this.forestGuanqia.tbForest.ID;
                case CopyType.island:
                    return this.islandOreInfo.tbOre.ID;
                case CopyType.teamCopy:
                    return this.copyTeamFightVo.copyFloor;
            }
        };
        FightVo.prototype.turnTemplatID = function (objs) {
            switch (this.copyType) {
                case iface.tb_prop.copyTypeKey.rune:
                case iface.tb_prop.copyTypeKey.underground:
                case iface.tb_prop.copyTypeKey.tower:
                case CopyType.guildCopy:
                    var ary = {};
                    var infos = this.getEnemyIdAry()[0];
                    for (var key in objs) {
                        var id = (Number(key) % 10) - 1;
                        ary[infos[id]] = objs[key];
                    }
                    return ary;
                default:
                    var vo = this.getFightVo();
                    if (!vo) {
                        return null;
                    }
                    return vo.turnTemplatID(objs);
            }
        };
        return FightVo;
    }());
    game.FightVo = FightVo;
})(game || (game = {}));
