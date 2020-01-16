	class GodUtil{
		constructor(){

		}

        /**
         * 计算升级属性
         * @param data 
         */
        // static jisuanshengji(data): Array<any> {
        //     let godtab: tb.TB_god = tb.TB_god.get_TB_godById(Number(data[1].templateId));
        //     let godset: tb.TB_god_set = tb.TB_god_set.get_TB_god_set();
        //     // let evotab: tb.TB_god_evolution = tb.TB_god_evolution.get_TB_god_evolutionById(Number(data[1].starLevel)-1);
        //     let evotab: tb.TB_god_evolution;
        //     let nowStar = data[1].starLevel;
        //     let nowLevel = 0;
        //     let keeparry = 0;
        //     if(nowStar <= godset.star_evolution)
        //         evotab = tb.TB_god_evolution.get_TB_god_evolutionById(nowStar);//阶级
        //     else
        //         evotab = tb.TB_god_evolution.get_TB_god_evolutionById(nowStar);
        //     if(data[3]){
        //         nowLevel = data[1].level-1;
        //     }
        //     else{
        //         keeparry = GodUtil.jisuandengji(data);
        //         nowLevel = data[1].level + keeparry[0]["level"];
        //     }
        //     // let nowLevel = $data[1]["level"] + Math.floor($data[0] / shengjitab.exp);
        //     let ary: Array<number> = new Array
        //     for (let i = 0; i < 3; i++) {
        //         let num;
        //         let chengzhangnum;
        //         let xishu = 1;
        //         let chengzhangxishu = 1;
        //         if (godtab.star[0] == nowStar) {
        //             num = Number(godtab.attr_init[i][1]);
        //             chengzhangnum = Number(godtab.attr_grow[i][1]);
        //             // logdebug("成长系数：", chengzhangnum);
        //             if (nowLevel == 1){
        //                 ary.push(num);
        //             }
        //             else {
        //                 num = num + chengzhangnum * (nowLevel - 1);
        //                 ary.push(num);
        //             }
        //         } else {
        //             // let a = nowStar - godtab.star[0];
        //             // for (let j = 0; j < a; j++) {
        //             //     xishu *= Number(evotab.star_prop[i][1]);
        //             //     chengzhangxishu *= Number(evotab.star_growth[i][1]);
        //             //     if ((Number(godtab.star) + j + 1) < 6)
        //             //         evotab = tb.TB_god_evolution.get_TB_god_evolutionById(Number(godtab.star) + j + 1);
        //             // }
        //             xishu = evotab.star_prop[i][1];
        //             chengzhangxishu = evotab.star_growth[i][1];
        //             chengzhangnum = Number(godtab.attr_grow[i][1]) * chengzhangxishu;
        //             // logdebug("成长系数：", chengzhangnum);
        //             num = Number(godtab.attr_init[i][1]) * xishu;
        //             if (nowLevel == 1){
        //                 ary.push(num);
        //             }
        //             else {
        //                 num = num + chengzhangnum * (nowLevel - 1);
        //                 ary.push(num);
        //             }
        //         }
        //     }
        //     ary.push(nowLevel);
        //     //ary.push(keeparry[1]["exp"]);
        //     return ary
        // }

        /**
         * 计算升级后等级
         * @param data 
         */
        // static jisuandengji(data): any {
        //     let tempId = game.GodUtils.getGodLevelId(data[1]["starLevel"],data[1]["level"]);
        //     let shengjitab: tb.TB_god_level = tb.TB_god_level.get_TB_god_levelnById(data[1]["level"]);
        //     let shengjiarry: Array<any> = new Array();
        //     let level = 0;
        //     let exp = 0;
        //     let tempexp = data[0] - (shengjitab.cost[0][1] - data[1]["exp"]);
        //     if(tempexp < 0) {
        //         level = 0;
        //         exp = data[0] + data[1]["exp"];
        //         shengjiarry.push({"level": level});
        //         shengjiarry.push({"exp": exp});
        //     }
        //     else{
        //         for(;tempexp >= 0;){
        //             level++;
        //             tempId++;
        //             let shengjitab: tb.TB_god_level = tb.TB_god_level.get_TB_god_levelnById(data[1]["level"]+level);
        //             if(shengjitab)
        //                 tempexp = tempexp - shengjitab.cost[0][1];
        //             else{
        //                 level -= 1;
        //                 break;
        //             }
        //         }
        //         let shengjitabnew: tb.TB_god_level = tb.TB_god_level.get_TB_god_levelnById(data[1]["level"] + level);
        //         tempexp = tempexp + shengjitabnew.cost[0][1];
        //         shengjiarry.push({"level": level});
        //         shengjiarry.push({"exp": tempexp});
        //     }
        //     return shengjiarry;
        // }
	 }