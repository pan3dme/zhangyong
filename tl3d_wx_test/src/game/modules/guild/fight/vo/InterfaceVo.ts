

module game {

    /** 小组排名 */
    export interface IWarGroupRankVo {
        groupList: IWarGuildRankSvo[];    // 小组信息
        guildGrade : number;    // 当前段位
        upGradeType : number;   // 晋级类型
        myRank : number;        // 当前王者排名
	}
    /** 小组公会排名数据 */
    export interface IWarGuildRankSvo {
		guildId : string;
		guildHead : number;
		guildLevel : number;
		guildName : string;
		score : number;
		force : number;
		rank : number;			// 排名
		guildGrade : number;		// 当前段位
		upType : number; 		// 晋级类型 UpGradeType
	}

    /** 成员排行数据 */
    export interface IWarMemberRankVo {
        playerId : string;
        name : string;
        level : number;
        head : number;
        headFrame : number;
        score : number;
		force : number;
		rank : number;			// 排名
    }

    /** 宝箱vo */
    export interface IGuildChestSvo { 
		index : number;     // 索引
		name : string;      // 开启宝箱者
		num : number;       // 宝箱奖励：贡献值

        grade : number;     // 段位宝箱
	}

    /** 荣誉公会 */
    export interface IHonorGuildSvo {
		guildRank : number;     // 公会赛季排名
		serverName : string;    // 服务器名字
		guildName : string;
		presidentName : string; // 会长名字
		guildLevel : number;
		guildHead : number;
		totalForce : number;    // 总战斗力
	}

    /** 晋级类型 */
    export enum GuildUpGradeType {
        none = 0,       // 不显示
        up = 1,         // 晋级
        keep = 2,       // 保级
        down = 3        // 降级
    }
}