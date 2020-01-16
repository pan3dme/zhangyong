function traceNoTabelData(): void {
    throw new Error("数据表无");
}
module tb {
    export class TB_hud {
        public ID: number;
        public name: string;
        public icon: string;
        public pos: number;
        public rank: number;
        public system_id: number;
        public is_show : number;

        public static get_TB_hudById($id: number): TB_hud {
            var $obj: any = TableData.getInstance().getData(TableData.tb_hud, $id)
            var $vo: TB_hud = $obj as TB_hud
            return $vo
        }
        public static get_TB_hudBySysId(id: number): TB_hud {
            let list = TB_hud.get_TB_hud();
            return list.find((vo)=>{
                return vo.system_id == id;
            });
        }

        public static get_TB_hud($selectkey: string = null, $selectValue: string = null): Array<TB_hud> {
            var $arr: Array<TB_hud> = new Array;
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_hud)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_hud = $obj.data[$key] as TB_hud
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_hud = $obj.data[$key] as TB_hud
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }


    export class TB_sys_open {
        public ID: number;
        public name: string;
        public icon: string;
        public des: string;
        public prompt: string;
        public open_info: string;
        public open_type: number;
        public open_parameter: number;
        public is_show_open: boolean;
        public link: string;
        public is_show: number;
        public is_building: number;
        public open_reward: Array<number>;

        public static get_TB_sys_openById($id: number): TB_sys_open {
            var $obj: any = TableData.getInstance().getData(TableData.tb_sys_open, $id);
            if (!$obj) {
                logerror('没有该系统id', $id);
            }
            var $vo: TB_sys_open = $obj as TB_sys_open
            return $vo
        }

        public static get_TB_sys_open($selectkey: string = null, $selectValue: string = null): Array<TB_sys_open> {
            var $arr: Array<TB_sys_open> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sys_open)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_sys_open = $obj.data[$key] as TB_sys_open
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_sys_open = $obj.data[$key] as TB_sys_open
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_role {
        public ID: number;
        public exp: number;
        public reward: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.ID = $obj.ID;
            this.exp = $obj.exp;
            this.reward = $obj.reward;
        }
        public static get_TB_rolenById($id: number): TB_role {
            var $obj: any = TableData.getInstance().getData(TableData.tb_role, $id)
            var $vo: TB_role = $obj as TB_role
            return $vo
        }

        public static get_TB_role($selectkey: string = null, $selectValue: string = null): Array<TB_role> {
            var $arr: Array<TB_role> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_role)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_role = $obj.data[$key] as TB_role
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_role = $obj.data[$key] as TB_role
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_god_employ_set {
        public ID: number;
        public prop_cost: number;
        public friend_cost: number;
        public zuanshi_once_priority: Array<number>;
        public zuanshi_ten_priority: Array<number>;
        public special_employ: Array<number>;
        public zuanshi_once: number;
        public zuanshi_ten: number;
        public first_employ: number;
        public second_employ: number;

        public static get_TB_god_employ_setnById($id: number): TB_god_employ_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_god_employ_set, $id)
            var $vo: TB_god_employ_set = $obj as TB_god_employ_set
            return $vo
        }

        public static get_TB_god_employ_set($selectkey: string = null, $selectValue: string = null): Array<TB_god_employ_set> {
            var $arr: Array<TB_god_employ_set> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_god_employ_set)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_god_employ_set = $obj.data[$key] as TB_god_employ_set
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_god_employ_set = $obj.data[$key] as TB_god_employ_set
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_god_resolve {
        public ID: number;
        public resolve_reward: Array<Array<number>>;

        public static get_TB_god_resolveById($id: number): TB_god_resolve {
            var $obj: any = TableData.getInstance().getData(TableData.tb_god_resolve, $id)
            var $vo: TB_god_resolve = $obj as TB_god_resolve
            return $vo
        }
    }

    export class TB_god_level {
        public ID: number;
        public cost: Array<any>;
        public return_exp: Array<Array<number>>;

        public static get_TB_god_levelnById($id: number): TB_god_level {
            var $obj: any = TableData.getInstance().getData(TableData.tb_god_level, $id)
            var $vo: TB_god_level = $obj as TB_god_level
            return $vo
        }

        public static get_TB_god_level($selectkey: string = null, $selectValue: string = null): Array<TB_god_level> {
            var $arr: Array<TB_god_level> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_god_level)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_god_level = $obj.data[$key] as TB_god_level
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_god_level = $obj.data[$key] as TB_god_level
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_god implements inface.IHeadData {
        public ID: number;
        public name: string;
        public type: number;
        public desc: string;
        public quality: number;
        public icon_quality: number;
        public model: number;
        public icon: number;
        public star: Array<number>;
        public skill: Array<Array<number>>;
        public race_type: number;
        public race: string;
        public sex: string;
        public attr_init: Array<Array<number>>;
        public attr_grow: Array<number>;
        public skill_devour: number;
        public evaluation: Array<number>;
        public awake_model: number;
        public skin: Array<number>;
        private _constitems: Array<tb.TB_item>;
        public death_frame: number;
        public paint: number;//立绘
        public fight_skill: number;//立绘

        public getName(): string {
            return this.name;
        }

        public getLevel(): number {
            return 1;
        }

        public getStar(): number {
            return 0;
        }

        public isAwaken(): boolean {
            return false;
        }
        /** 是否有觉醒模型 */
        public hasAwakenModel(): boolean {
            return this.awake_model > 0 && this.awake_model != this.model;
        }

        public isMoreThanSix(): boolean {
            return this.quality >= 6;
        }

        public getType(): string {
            return "null";
        }

        public getDataType(): number {
            return 1;
        }

        public getRaceType(): any {
            return false;
        }
        public getAttrType(): any {
            return this.type;
        }

        public getQulity(): string {
            let starLv = this.quality >= 6 ? 6 : this.quality;
            return SkinUtil.getBoxQulityIcon(starLv);
        }
        public getIconUrl(): string {
            return SkinUtil.getHeadIcon(this.icon);
        }
        public getFrameUrl(): string {
            let quality: number = this.star ? this.star[0] : 0;
            if (quality > 6) quality = 6;
            return SkinUtil.getBoxQulityIcon(quality);
        }

        public getProperty(): Array<Array<number>> {
            return null;
        }

        public jisuanjineng(): Array<any> {
            return null;
        }

        public getSkill(): number[] {
            let skillAry = [];
            for (let ary of this.skill) {
                skillAry.push(ary[0]);
            }
            return skillAry;
        }

        /** 是否可以觉醒 */
        public isCanAwaken():boolean{
            let maxStar = this.star[1] || 0;
            return maxStar > tb.TB_god_set.get_TB_god_set().star_evolution;
        }

        public static get_TB_godById($id: number): TB_god {
            var $obj: any = TableData.getInstance().getData(TableData.tb_god, $id)
            var $vo: TB_god = $obj as TB_god
            return $vo
        }

        public static get_TB_god($selectkey: string = null, $selectValue: string = null): Array<TB_god> {
            var $arr: Array<TB_god> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_god)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_god = $obj.data[$key] as TB_god
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_god = $obj.data[$key] as TB_god
                    $arr.push($vo)
                }
            }
            return $arr
        }

        /** 获取属性值 */
        public getPropValByType(type: number): number {
            let result = this.attr_init.find((ary) => {
                return ary[0] == type;
            });
            return Number(result[1]);
        }
        /** 获取技能的开放阶级 */
        public getSkillOpenDgLv(skill: number): number {
            let skillAry = this.skill.find((ary) => {
                return ary[0] == skill;
            });
            return skillAry && (skillAry[1] || 0);
        }
        /** 获取阶数开启的技能 */
        public getSkillIdByDegree(degree: number): number {
            for (let ary of this.skill) {
                if (ary[1] == degree) {
                    return ary[0];
                }
            }
            return 0;
        }

        /** 皮肤列表 */
        private _skinList: game.GodSkinVo[]
        public getSkinList(): game.GodSkinVo[] {
            if (!this._skinList) {
                this._skinList = [];
                this._skinList.push(new game.GodSkinVo(this, game.GodSkinType.origin));
                if (this.hasAwakenModel()) {
                    this._skinList.push(new game.GodSkinVo(this, game.GodSkinType.awaken));
                }
                if (this.skin && this.skin.length > 0) {
                    for (let id of this.skin) {
                        this._skinList.push(new game.GodSkinVo(this, id));
                    }
                }
            }
            return this._skinList;
        }
        /** 获取皮肤对象 */
        public getSkinVo(skinid:number):game.GodSkinVo {
            let list = this.getSkinList();
            return list.find((vo)=>{
                return vo.skinId == skinid;
            });
        }

        /**
        * 获取英雄的所有技能
        * @param  英雄对象
        */
        public getAllSkill(degree:number, starLevel:number): Array<tb.TB_skill> {
            let ary: Array<tb.TB_skill> = new Array;
            let realskills = getSkillList(this.skill, degree, starLevel);
            for (var i = 0; i < realskills.length; i++) {
                let tbSkill = tb.TB_skill.get_TB_skillById(realskills[i][0])
                if (tbSkill) {
                    ary.push(tbSkill);
                }
            }
            return ary;
        }

        /**
        * 获取英雄的所有技能
        * @param  英雄对象
        */
        public getBaseSkill(): Array<any> {
            let ary: Array<any> = new Array;
            for (var i = 0; i < this.skill.length; i++) {
                let tbSkill = tb.TB_skill.get_TB_skillById(this.skill[i][0])
                if (tbSkill) {
                    ary.push(tbSkill);
                }
            }
            return ary;
        }
    }

    export class TB_skin {
        public ID: number
        public name: string;
        public quality: number;
        public model: number;
        public desc: string;
        public attr: Array<Array<number>>;
        public item: number[];

        public static getTbById(id): TB_skin {
            let $obj: TB_skin = <TB_skin>TableData.getInstance().getData(TableData.tb_skin, id);
            return $obj;
        }

        /** 格式:[{固定值对象},{百分比对象}] */
        private _attrAry: any[];
        /** 获取属性 */
        public getAttr(): any[] {
            if (!this._attrAry) {
                this._attrAry = [{}, {}];
                if (this.attr) {
                    for (let ary of this.attr) {
                        if (ary[1] == ValueType.fixed) {
                            this._attrAry[0][ary[0]] = ary[2];
                        } else {
                            this._attrAry[1][ary[0]] = ary[2];
                        }
                    }
                }
            }
            return this._attrAry;
        }
    }

    export class TB_awaken_conditions {
        public ID: number;
        public awake_section_max: number;

        public static getTbById($id: number): TB_awaken_conditions {
            var $obj: any = TableData.getInstance().getData(TableData.tb_awaken_conditions, $id)
            var $vo: TB_awaken_conditions = $obj as TB_awaken_conditions
            return $vo
        }
    }
    export class TB_star_title {
        public ID: number;
        public title: string;

        public static getTbById($id: number): TB_star_title {
            return TableData.getInstance().getData(TableData.tb_star_title, $id) as TB_star_title;
        }
    }

    export class TB_god_awaken {
        public ID: number;
        public material: Array<Array<number>>;
        public god_material: Array<Array<number>>;
        public return_material: Array<Array<number>>;
        public attr: Array<Array<number>>;

        public static getTbById($id: number): TB_god_awaken {
            return TableData.getInstance().getData(TableData.tb_god_awaken, $id) as TB_god_awaken;
        }
        /** 觉醒道具材料 */
        private _materialList: ItemVo[];
        getMaterialList(): ItemVo[] {
            if (!this._materialList) {
                this._materialList = [];
                if (this.material) {
                    this.material.forEach((ary: any[]) => {
                        let itemVo = new ItemVo(ary[0], 0);
                        itemVo.constNum = ary[1];
                        itemVo.countFromBag = true;
                        this._materialList.push(itemVo);
                    });
                }
            }
            return this._materialList;
        }

        /** 觉醒神灵材料 */
        private _godMaterialList: game.GodMaterialTbVo[];
        getGodMaterialList(): game.GodMaterialTbVo[] {
            if (!this._godMaterialList) {
                this._godMaterialList = [];
                if (this.god_material) {
                    this.god_material.forEach((ary: any[]) => {
                        this._godMaterialList.push({ type: game.ConfigType.race, starLv: ary[0], count: ary[1], race: ary[2] });
                    });
                }
            }
            return this._godMaterialList;
        }
        /** 觉醒材料返还 */
        private _returnMaterialList: ItemVo[];
        getReturnMaterialList(): ItemVo[] {
            if (!this._returnMaterialList) {
                this._returnMaterialList = [];
                if (this.return_material) {
                    this.return_material.forEach((ary: any[]) => {
                        this._returnMaterialList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._returnMaterialList;
        }
        /** 获取加成的属性值 */
        getAttrValue(id: number): number {
            let attr = this.attr ? this.attr.find((ary: any[]) => {
                return ary[0] == id;
            }) : null;
            return attr ? attr[1] : 0;
        }
    }

    export class TB_god_set {
        public ID: number;
        public special_god: number;
        public devour_god: Array<number>;
        public not_evolution_god: Array<number>;
        public universal_card: Array<Array<number>>;
        public not_battle_god: Array<number>;
        public restrain_bonus: Array<number>;
        public star_evolution: number;
        public awake_section: number;
        public comment_needlevel: number;

        public static get_TB_god_set(): TB_god_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_god_set, 1)
            var $vo: TB_god_set = $obj as TB_god_set
            return $vo
        }
    }

    export class TB_skill implements inface.ISkillData {
        public ID: number;
        public name: string;
        public info: string;
        public icon: string;
        public type: number;
        public skill_feature: number;
        public sub_skills: Array<number>;
        public use_conditions: Array<number>;
        public recover_percent: number;
        // public cd: number;
        // public group: number;
        // public next_skill: number;
        public level: number;
        public effect: number;
        // public priority: number;
        // public effective_type: number;
        public effect_desc : number[];

        //获取图片路径
        public getIconUrl(): string {
            return SkinUtil.getSkillIcon(Number(this.icon));
        }

        //获取品质
        public getQulity(): string {
            return SkinUtil.getBoxQulityIcon(this.type);
        }

        //获取等级
        public getLevel(): number {
            return this.level;
        }

        public isSkillDmgMultiSection() {
            if (this.effect <= 0) {
                return false;
            }
            let tabeff = tb.TB_skill_effect.get_TB_skill_effectById(this.effect);
            if (!tabeff) {
                return false;
            }
            var frame = tabeff.frame;
            return frame && frame.length > 2;
        }

        public static get_TB_skillById($id: number): TB_skill {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill, $id)
            var $vo: TB_skill = $obj as TB_skill
            return $vo;
        }

        public static get_TB_skill($selectkey: string = null, $selectValue: string = null): Array<TB_skill> {
            var $arr: Array<TB_skill> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_skill)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_skill = $obj.data[$key] as TB_skill
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_skill = $obj.data[$key] as TB_skill
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_skill_desc {
        public ID: number;
        public name: string;
        public desc: string;

        public static getTbSkillDesc(id: number): TB_skill_desc {
            return TableData.getInstance().getData(TableData.tb_skill_desc, id) as TB_skill_desc;
        }
    }

    export class TB_sub_skill {
        public ID: number;
        public name: string;
        public info: string;
        public main_skill: number;
        public casting_target: number;
        public target_limit: number;
        public damage: number;
        public damage_fixed: number;
        public target_damage: Array<Array<number>>;
        public damage_sputter: Array<number>;
        public trigger_type: Array<number>;
        public trigger_subtype: Array<number>;
        public trigger_param: Array<number>;
        public trigger_prob: Array<number>;
        public effects: Array<Array<number>>;
        public trigger_count: number;

        public static get_TB_sub_skillById($id: number): TB_sub_skill {
            var $obj: any = TableData.getInstance().getData(TableData.tb_sub_skill, $id)
            var $vo: TB_sub_skill = $obj as TB_sub_skill
            return $vo;
        }

        public static get_TB_sub_skill($selectkey: string = null, $selectValue: string = null): Array<TB_sub_skill> {
            var $arr: Array<TB_sub_skill> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sub_skill)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_sub_skill = $obj.data[$key] as TB_sub_skill
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_sub_skill = $obj.data[$key] as TB_sub_skill
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_skill_replace {
        public ID: number;
        public initial_skill: Array<number>;
        public replace_skill: Array<number>;

        public static replaceSkill(skillList): boolean {
            var flag: boolean = false;
            var itemIdx;
            for (var i = 0; i < skillList.length; i++) {
                var id = skillList[i];
                var $obj: any = TableData.getInstance().getTableByName(TableData.tb_skill_replace)
                var $vo: TB_skill_replace = $obj.data[id] as TB_skill_replace
                if (!$vo) {
                    continue;
                }
                //搜索是否有替换的目标
                for (var x = 0; x < skillList.length; x++) {
                    var chgItem = skillList[x];
                    itemIdx = $vo.initial_skill.indexOf(chgItem);
                    if(itemIdx != -1 && $vo.replace_skill[itemIdx]){
                        skillList[x] = $vo.replace_skill[itemIdx];
                        flag = true;
                        break;
                    }
                }

                if(flag){
                    break;
                }
            }
            return flag;
        }
    }

    export class TB_effect {
        public ID: number;
        public name: string;
        public describe: string;
        public type: number;
        public type_param: Array<number>;
        public effect_value: number;

        public static get_TB_effectById($id: number): TB_effect {
            var $obj: any = TableData.getInstance().getData(TableData.tb_effect, $id)
            var $vo: TB_effect = $obj as TB_effect
            return $vo;
        }

        public static get_TB_effect($selectkey: string = null, $selectValue: string = null): Array<TB_effect> {
            var $arr: Array<TB_effect> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_effect)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_effect = $obj.data[$key] as TB_effect
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_effect = $obj.data[$key] as TB_effect
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_msgCode {
        public ID: number;
        public code: string;
        public text: string;
        public region0: number;
        public time: number;
        public onTop: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.ID = $obj.ID;
            this.code = $obj.code;
            this.text = $obj.text;
            this.region0 = $obj.region0;
            this.time = $obj.time;
            this.onTop = $obj.onTop;
        }
        public static get_TB_msgCodeById($id: number): TB_msgCode {
            var $obj: any = TableData.getInstance().getData(TableData.tb_msgCode, $id)
            var $vo: TB_msgCode = $obj as TB_msgCode
            return $vo;
        }

        private static _codeObj: any = {};
        public static get_TB_msgCodeByCode(code: string): TB_msgCode {
            if (this._codeObj[code]) {
                return this._codeObj[code];
            }
            let ary = TB_msgCode.get_TB_msgCode('code', code);

            return ary && ary.length > 0 ? ary[0] : null;
        }

        public static get_TB_msgCode($selectkey: string = null, $selectValue: string = null): Array<TB_msgCode> {
            var $arr: Array<TB_msgCode> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_msgCode)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_msgCode = $obj.data[$key] as TB_msgCode
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_msgCode = $obj.data[$key] as TB_msgCode
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_game_set {
        public ID: number;
        public lineup: Array<number>;
        public evaluation_num: Array<number>;
        public friend_once_reward: Array<Array<any>>;
        public limit_god: number;
        public limit_rune: number;
        public friend_max: number;
        public friend_mail: number;
        public add_sign: number;
        public sign_cost: Array<number>;
        public attr_para: Array<Array<number>>;
        public quality_para: Array<number>;
        public max_level: number;
        public counter_per: number;
        public friend_point_max: number;
        public limit_equip: number;
        public modify_name_cost: Array<number>;
        public attr_buff: Array<Array<number>>;
        public pvp_para: number;

        public selectAttrItem(key){
            let temp = null;
            for (var i = 0; i < this.attr_para.length; i++) {
                temp = this.attr_para[i];
                if(temp && temp[0] == key){
                    return temp[1]
                }
            }
            return 0;
        }

        public static get_TB_game_setById($id: number): TB_game_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_game_set, $id)
            var $vo: TB_game_set = $obj as TB_game_set
            return $vo;
        }

        public static get_TB_game_set($selectkey: string = null, $selectValue: string = null): Array<TB_game_set> {
            var $arr: Array<TB_game_set> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_game_set)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_game_set = $obj.data[$key] as TB_game_set
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_game_set = $obj.data[$key] as TB_game_set
                    $arr.push($vo)
                }
            }
            return $arr
        }
        /** 获得buff */
        public static getBuffByAttr(attr: number): number {
            var $obj: TB_game_set = <TB_game_set>TableData.getInstance().getData(TableData.tb_game_set, 1);
            for (var i = 0; i < $obj.attr_buff.length; i++) {
                var element = $obj.attr_buff[i];
                if (element[0] == attr) {
                    return element[1];
                }
            }
            logerror("--------tb error-------缺少数据配置");
            return -1;
        }
        /** 获取每次好友赠送的友情点配置 */
        public static getFriendPonit(): number {
            var $obj: TB_game_set = <TB_game_set>TableData.getInstance().getData(TableData.tb_game_set, 1);
            let arr = $obj.friend_once_reward[0];
            return parseInt(arr[1]);
        }
        /** 获取每日获得的友情点上限 */
        public static getMaxFriendPonit(): number {
            var $obj: TB_game_set = <TB_game_set>TableData.getInstance().getData(TableData.tb_game_set, 1);
            return $obj.friend_point_max;
        }
        /** 获取最大好友上限 */
        public static getMaxfriendNum(): number {
            var $obj: TB_game_set = <TB_game_set>TableData.getInstance().getData(TableData.tb_game_set, 1);
            return $obj.friend_max;
        }
        /**获取最大英雄上限 */
        public static getMaxGodsNum(): number {
            var $obj: TB_game_set = <TB_game_set>TableData.getInstance().getData(TableData.tb_game_set, 1);
            return $obj.limit_god;
        }
    }

    export class TB_buff {
        public ID: number;
        public name: string;
        public describe: string;
        public icon: string;
        public is_show: boolean;
        public dead_exist: number;
        public status_type: number;
        public type: number;
        public type_param: number;
        public effect_percent: number;
        public effective_type: number;
        public round: number;
        public trigger_type: number;
        public effects: Array<number>;
        public trigger_skill: number;
        public trigger_count: number;
        public stack_type: number;
        public stack_max: number;
        public index: number;

        public static get_TB_buffById($id: number): TB_buff {
            var $obj: any = TableData.getInstance().getData(TableData.tb_buff, $id)
            var $vo: TB_buff = $obj as TB_buff
            return $vo;
        }

        public static get_TB_buff($selectkey: string = null, $selectValue: string = null): Array<TB_buff> {
            var $arr: Array<TB_buff> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_buff)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_buff = $obj.data[$key] as TB_buff
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_buff = $obj.data[$key] as TB_buff
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_skill_effect {
        public ID: number;
        public action: string;
        public frame: Array<number>;
        public att_type: number;
        public ballistic: number;
        public effect_id: number;
        public damage_section: Array<number>;
        public action_frame: number;

        public static get_TB_skill_effectById($id: number): TB_skill_effect {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_effect, $id)
            var $vo: TB_skill_effect = $obj as TB_skill_effect
            return $vo;
        }

        public static get_TB_skill_effect($selectkey: string = null, $selectValue: string = null): Array<TB_skill_effect> {
            var $arr: Array<TB_skill_effect> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_skill_effect)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_skill_effect = $obj.data[$key] as TB_skill_effect
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_skill_effect = $obj.data[$key] as TB_skill_effect
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }


    export class TB_skill_set {
        public ID: number;
        public begin_anger: number;
        public spell_anger: number;
        public anger_effect: Array<Array<number>>;

        public static getSkillSet(): TB_skill_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_set, 1)
            var $vo: TB_skill_set = $obj as TB_skill_set
            return $vo;
        }
    }

    export class TB_buff_effect {
        public ID: number;
        public type: number;
        public sub_type: number;
        public value: number;
        public effect_id: number;
        public is_cycle: number;
        public location: number;
        public name: string;

        public static get_TB_buff_effectById($id: number): TB_buff_effect {
            var $obj: any = TableData.getInstance().getData(TableData.tb_buff_effect, $id)
            var $vo: TB_buff_effect = $obj as TB_buff_effect
            return $vo;
        }

        public static get_TB_buff_effect($selectkey: string = null, $selectValue: string = null): Array<TB_buff_effect> {
            var $arr: Array<TB_buff_effect> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_buff_effect)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_buff_effect = $obj.data[$key] as TB_buff_effect
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_buff_effect = $obj.data[$key] as TB_buff_effect
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_trial {
        public ID: number;
        public reward: Array<Array<any>>;
        public model: number;
        public desc: string;
        public type: number;
        public static get_TB_trialById($id: number): TB_trial {
            var $obj: any = TableData.getInstance().getData(TableData.tb_trial, $id)
            var $vo: TB_trial = $obj as TB_trial
            return $vo;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
    }

    export class TB_copy {
        public ID: number;
        public name: string;
        public desc: string;
        public chapter: number;
        public type: number;
        public sub_type: number;
        public star: number;
        public before_id: number;
        public after_id: number;
        public reward_preview: Array<number>;
        public background_id: string;
        /** 道路编号 */
        public road_id: string;
        private _rewardItems: Array<TB_item>;

        /**获取副本奖励 */
        public getRewardItems(): Array<TB_item> {
            if (!this._rewardItems) {
                this._rewardItems = new Array<TB_item>();
                this.reward_preview.forEach((item, index, arr) => {
                    this._rewardItems.push(TB_item.get_TB_itemById(item));
                });

            }
            return this._rewardItems;
        }

        /**主线副本 */
        public static zhuxianFuben: Array<TB_copy>;
        /**符文符文 */
        public static fuwenFuben: Array<TB_copy>;
        /**地下城副本 */
        public static dixiaFuben: Array<TB_copy>;
        /**试练塔副本 */
        public static shilianFuben: Array<TB_copy>;

        public static initAllCopy(): void {
            if (!TB_copy.zhuxianFuben) {
                TB_copy.zhuxianFuben = new Array<TB_copy>();
                TB_copy.fuwenFuben = new Array<TB_copy>();
                TB_copy.dixiaFuben = new Array<TB_copy>();
                TB_copy.shilianFuben = new Array<TB_copy>();
                var $obj: any = TableData.getInstance().getTableByName(TableData.tb_copy)
                for (var $key in $obj.data) {
                    var $vo: TB_copy = $obj.data[$key] as TB_copy;
                    switch ($vo.type) {
                        case iface.tb_prop.copyTypeKey.main:
                            TB_copy.zhuxianFuben.push($vo);
                            break;
                        case iface.tb_prop.copyTypeKey.rune:
                            TB_copy.fuwenFuben.push($vo);
                            break;
                        case iface.tb_prop.copyTypeKey.underground:
                            if ($vo.ID == 2002 || $vo.ID == 2004)
                                TB_copy.dixiaFuben.push($vo);
                            break;
                        case iface.tb_prop.copyTypeKey.tower:
                            TB_copy.shilianFuben.push($vo);
                            break;
                    }
                }
            }
        }

        public static get_TB_copyById($id: number): TB_copy {
            var $obj: any = TableData.getInstance().getData(TableData.tb_copy, $id)
            var $vo: TB_copy = $obj as TB_copy
            return $vo;
        }

        public static get_TB_copy($selectkey: string = null, $selectValue: string = null): Array<TB_copy> {
            var $arr: Array<TB_copy> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_copy)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_copy = $obj.data[$key] as TB_copy
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_copy = $obj.data[$key] as TB_copy
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_copy_info {
        public ID: number;
        public name: string;
        public desc: string;
        /** 章节id */
        public area: number;
        /** 关卡 */
        public area_number: number;
        public boss_icon: number;
        public is_enter: number;
        public scene: number;
        /** 有几波怪 */
        public stay_time: number;
        public monster: Array<Array<number>>;
        public show_icon: Array<number>;
        public scene_desc: string;
        public checkpoint_icon: number;
        public monster_desc: string;
        public before_plot: number[];  // 战斗前对话
        public after_plot: number[];   // 战斗后对话
        public precondition: Array<any>;
        public next: number;
        public role_exp_speed: number;//主角经验效率
        public exp_speed: number;//魂石速率
        public gold_speed: number;//金币速率
        public hang_up_reward: Array<number>;
        public reward: Array<Array<number>>;//首通奖励
        public reward_show: Array<number>;

        /** 获取开启前置条件值 */
        public getConditionVal(type: number): number {
            let conditionsAry = this.precondition ? this.precondition : [];
            for (let ary of conditionsAry) {
                if (Number(ary[0]) == type) {
                    return Number(ary[1]);
                }
            }
            return 0;
        }

        private _rewardShowItems: Array<ItemVo>;
        /**获取副本奖励 */
        public getRewardShowItems(): Array<ItemVo> {
            if (!this._rewardShowItems) {
                this._rewardShowItems = new Array<ItemVo>();
                for (let i = 0; this.reward_show && i < this.reward_show.length; i++) {
                    let propid = this.reward_show[i];
                    let itemVo = App.hero.createItemVo(0, propid);
                    this._rewardShowItems.push(itemVo);
                }
            }
            return this._rewardShowItems;
        }

        private _rewardItems : ItemVo[];
        public getRewardItems():ItemVo[] {
            if (!this._rewardItems) {
                this._rewardItems = [];
                if(this.reward){
                    for (let i = 0; i < this.reward.length; i++) {
                        let itemVo = App.hero.createItemVo(this.reward[i][1], this.reward[i][0]);
                        this._rewardItems.push(itemVo);
                    }
                }
            }
            return this._rewardItems;
        }

        private _monsters: Array<TB_monster>;
        public monstersModels: Array<number>;

        public getMonsters(): Array<TB_monster> {
            if (!this._monsters) {
                this._monsters = new Array<TB_monster>();
                this.monstersModels = new Array<number>();

                for (let i = 0; i < this.monster.length; i++) {
                    for (let j = 0; j < this.monster[i].length; j++) {
                        var item = this.monster[i][j];
                        if (item != 0) {
                            let itemVo = TB_monster.get_TB_monsterById(item);
                            this._monsters.push(itemVo);
                            this.monstersModels.push(itemVo.model);
                        }
                    }
                }
            }
            return this._monsters;
        }

        //不填为null
        private _allmonster: Array<TB_monster>;
        public getAllMonsters(): Array<TB_monster> {
            if (!this._allmonster) {
                this._allmonster = new Array<TB_monster>();

                for (let i = 0; i < this.monster.length; i++) {
                    for (let j = 0; j < this.monster[i].length; j++) {
                        var item = this.monster[i][j];
                        if (item != 0) {
                            let itemVo = TB_monster.get_TB_monsterById(item);
                            this._allmonster.push(itemVo);
                        } else {
                            this._allmonster.push(null);
                        }
                    }
                }
            }
            return this._allmonster;
        }

        private _showIconMonsters: Array<TB_monster>;
        public getIconMonster(): Array<TB_monster> {
            if (!this._showIconMonsters) {
                this._showIconMonsters = new Array<TB_monster>();
                for (let i = 0; i < this.show_icon.length; i++) {
                    let item = this.show_icon[i];
                    if (item != 0) {
                        let itemVo = TB_monster.get_TB_monsterById(item);
                        this._showIconMonsters.push(itemVo);
                    }
                }
            }
            return this._showIconMonsters;
        }

        public static get_TB_copy_infoById($id: number): TB_copy_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_copy_info, $id)
            var $vo: TB_copy_info = $obj as TB_copy_info
            return $vo;
        }

        public static get_TB_copy_info($selectkey: string = null, $selectValue: any = null): Array<TB_copy_info> {
            var $arr: Array<TB_copy_info> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_copy_info)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_copy_info = $obj.data[$key] as TB_copy_info
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_copy_info = $obj.data[$key] as TB_copy_info
                    $arr.push($vo)
                }
            }
            return $arr
        }

        //章节
        private _chapter: number = -1;
        public getChapter(): number {
            if (this._chapter == -1) {
                let tbcopy: tb.TB_copy = tb.TB_copy.get_TB_copyById(this.area);
                this._chapter = tbcopy ? tbcopy.chapter : 0;
            }
            return this._chapter;
        }
    }

    export class TB_plot {
        public ID: number;
        public plot: string;        // 对话内容
        public model: number;       // 模型
        public location: number;
        public name: string;
        public model_multiple: number;       // 倍率

        public static getItemById(id: number): TB_plot {
            let $obj: TB_plot = <TB_plot>TableData.getInstance().getData(TableData.tb_plot, id);
            return $obj;
        }
    }

    export class TB_daily_copy {
        public ID: number;
        public name: string;        // 难度名称
        public level: number;      // 挑战所需等级
        public reward: Array<Array<number>>;   // 副本奖励
        public monster: Array<number>;
        public model: number;

        public static getItemById(id: number): TB_daily_copy {
            let $obj: TB_daily_copy = <TB_daily_copy>TableData.getInstance().getData(TableData.tb_daily_copy, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
    }

    export class TB_expedition {
        public ID: number;
        public fight_per_min: number;          // 实力百分比min
        public fight_per_max: number;          // 实力百分比max
        public box: Array<Array<number>>;      // 宝箱
        public reward: Array<Array<number>>;   // 副本奖励
        public special: Array<Array<number>>;  // 特殊掉落

        public static getItemById(id: number): TB_expedition {
            let $obj: TB_expedition = <TB_expedition>TableData.getInstance().getData(TableData.tb_expedition, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }

        private _specialList: ItemVo[];
        getSpecialList(): ItemVo[] {
            if (!this._specialList) {
                this._specialList = [];
                if (this.special) {
                    this.special.forEach((ary: any[]) => {
                        this._specialList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._specialList;
        }

        private _boxRewards: ItemVo[];
        getBoxRewardList(): ItemVo[] {
            if (!this._boxRewards) {
                this._boxRewards = [];
                if (this.box) {
                    this.box.forEach((ary: any[]) => {
                        this._boxRewards.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._boxRewards;
        }
    }

    export class TB_copy_set {
        public ID: number;
        public earn_time: number;      //快速战斗的收益时间
        public fast_fighting: number;  //快速战斗次数
        public fighting_cost: any[];   //快速战斗消耗
        public offline_time: number;   //离线收益最大时长
        public auto_time: number;       //主线自动挂机时间
        public short_time: number;       //在线最短可领取时间、挂机宝箱领取间隔
        public max_chapter: number;       //最大章节数
        public daily_copy_cost: number[];  // 每日副本购买消耗
        public daily_copy_buy: number;  // 每日副本初始购买次数
        public daily_copy_num: number;  // 每日副本初始次数
        public special_type_cost: Array<Array<number>>;    // 黑暗森林特殊类型价格
        public daily_copymap: number;                      // 每日副本地图
        public expedition_map: number;                     // 远征地图
        public round_max: number;
        public next_open: number;
        public skip_round: number;
        public free_fastfight_num: number;
        public hire_num: number;            // 失落遗迹每日雇佣次数
        public hire_fight_percent: number;            // 雇佣战力百分比上限
        public aid_limit: number;            // 支援奖励上限
        public aid_reward: Array<Array<number>>;            // 支援好友获得奖励
        

        static getCopySet(): TB_copy_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_copy_set, 1) as TB_copy_set;
            return $obj;
        }
    }

    /**合成表 */
    export class TB_exchange {
        public ID: number;
        public type: number;
        public desc: string;
        public material: Array<Array<number>>;
        public obtain: Array<Array<number>>;

        public static get_TB_exchangeById($id: number): TB_exchange {
            var $obj: any = TableData.getInstance().getData(TableData.tb_exchange, $id)
            var $vo: TB_exchange = $obj as TB_exchange
            return $vo;
        }
    }

    export class TB_item implements inface.IItemData {
        public ID: number;
        public name: string;
        public desc: string;
        public type: number;
        public type_name: string;
        public quality: number;
        public icon: Array<number>;
        public max_overlap: number;
        public arrange: number;
        public time_limit: number;
        public daily_limit: number;
        public link: number;
        public using_effect: Array<number>;
        public defined: Array<number>;
        public constnum: number;
        public rewardNum: number;
        public way: string;
        public isFirst: boolean = false;
        public show: boolean = true;
        public way_link: Array<Array<number>>;
        firstFlag(): boolean {
            return this.isFirst;
        }

        getShow(): boolean {
            return this.show;
        }

        getStar(): number {
            return this.icon[3] ? this.icon[3] : 0;
        }
        isMoreThanSix(): boolean {
            return false;
        }

        //获取图片路径
        public getIconUrl(): string {
            return SkinUtil.getItemIcon(this);
        }

        //显示动画
        isStartAction(): boolean {
            return false;
        }

        //获取品质
        public getQulity(): string {
            return SkinUtil.getBoxQulityIcon(this.quality);
        }

        public showNum: boolean = true;
        //获取数量
        public getNum(): number {
            return this.showNum ? App.hero.getBagItemNum(this.ID.toString()) : 0;
        }

        //获取消耗数量
        public getConstNum(): number {
            return this.constnum;
        }

        //是否碎片
        isChip(): boolean {
            return this.icon && this.icon[1] > 0;
        }

        getChipSkin(): string {
            return this.icon && this.icon[1] == 2 ? SkinUtil.chip_godSkin : SkinUtil.chip_normal;
        }

        showRace(): number {
            return this.icon[2] ? this.icon[2] : 0;
        }

        getExtParm(){
            return null;
        }


        public static get_TB_itemById($id: number): TB_item {
            var $obj: any = TableData.getInstance().getData(TableData.tb_item, $id)
            var $vo: TB_item = $obj as TB_item
            return $vo;
        }

        public static get_TB_item($selectkey: string = null, $selectValue: string = null): Array<TB_item> {
            var $arr: Array<TB_item> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_item)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_item = $obj.data[$key] as TB_item
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_item = $obj.data[$key] as TB_item
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_optional {
        public ID: number;
        public option: Array<Array<number>>;

        public static get_TB_ById($id: number): TB_optional {
            var $obj: any = TableData.getInstance().getData(TableData.tb_optional, $id)
            var $vo: TB_optional = $obj as TB_optional
            return $vo;
        }
    }

    export class TB_monster implements inface.IHeadData {
        public ID: number;
        public name: string;
        public quality: number;
        public desc: string;
        public type: number;
        public model_multiple: number;
        public star: number;
        public level: number;
        public attr_type: number;
        public model: number;
        public icon: number;
        public is_immune: boolean;
        public attr: Array<Array<number>>;
        public skill: Array<number>;
        public race_type: number;
        public is_immune_poison: boolean;
        public death_frame: number;

        public getAttrType():number {
            return this.attr_type;
        }

        public getName(): string {
            return this.name;
        }

        public getLevel(): number {
            return this.level;
        }

        public getStar(): number {
            return this.star;
        }

        public isAwaken(): boolean {
            return false;
        }

        public isMoreThanSix(): boolean {
            return this.star >= 6;
        }

        public getType(): string {
            return "null";
        }

        public getDataType(): number {
            return 1;
        }

        public getRaceType(): any {
            return this.race_type;
        }

        public getQulity(): string {
            let starLv = this.star >= 6 ? 6 : this.star;
            return SkinUtil.getBoxQulityIcon(starLv);
        }
        public getIconUrl(): string {
            return SkinUtil.getHeadIcon(this.icon);
        }
        public getFrameUrl(): string {
            return SkinUtil.getBoxQulityIcon(this.quality);
        }

        public jisuanjineng(): Array<any> {
            let ary: Array<any> = new Array;
            let tempvo;
            for (var i = 0; i < this.skill.length; i++) {
                ary.push(tb.TB_skill.get_TB_skillById(this.skill[i]));
            };
            return ary;
        }

        //根据当前星级修正真实技能id
        public getSkillList() {
            return this.skill.map((skilid)=>{
                return [skilid,0];
            });
        }

        public getProperty(): Array<Array<number>> {
            return this.attr;
        }
        /** 获取属性值 */
        public getPropValByType(type: number): number {
            let result = this.attr.find((ary) => {
                return ary[0] == type;
            });
            return Number(result[1]);
        }

        public getShenli():number{
            return 0;
        }

        public static get_TB_monsterById($id: number): TB_monster {
            var $obj: any = TableData.getInstance().getData(TableData.tb_monster, $id)
            var $vo: TB_monster = $obj as TB_monster
            return $vo;
        }

        public static get_TB_monster($selectkey: string = null, $selectValue: string = null): Array<TB_monster> {
            var $arr: Array<TB_monster> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_monster)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_monster = $obj.data[$key] as TB_monster
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_monster = $obj.data[$key] as TB_monster
                    $arr.push($vo)
                }
            }
            return $arr
        }

    }

    export class TB_god_evolution {
        public ID: number;
        public star_prop: Array<Array<number>>;
        public star_growth: Array<number>;
        public level: number;
        public cost: Array<Array<number>>;
        public total_cost: Array<Array<number>>;
        public multiple_show: number;
        public evolution_effect: Array<number>;

        public static get_TB_god_evolutionById($id: number): TB_god_evolution {
            var $obj: any = TableData.getInstance().getData(TableData.tb_god_evolution, $id)
            var $vo: TB_god_evolution = $obj as TB_god_evolution
            return $vo;
        }

        public static get_TB_god_evolutionAtMaxID(): TB_god_evolution {
            var $obj: Array<any> = TableData.getInstance().getTableByName(TableData.tb_god_evolution).data;
            let vaule: TB_god_evolution = null;
            for (let key in $obj) {
                if ($obj[key]) {
                    vaule = $obj[key];
                }
            }
            return vaule;
        }

        public static get_TB_god_evolution($selectkey: string = null, $selectValue: string = null): Array<TB_god_evolution> {
            var $arr: Array<TB_god_evolution> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_god_evolution)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_god_evolution = $obj.data[$key] as TB_god_evolution
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_god_evolution = $obj.data[$key] as TB_god_evolution
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_god_star {
        public ID: number;
        public material: Array<Array<number>>;
        public item: Array<Array<number>>;
        public star: Array<number>;

        public static get_TB_god_starById(id: number): TB_god_star {
            return <TB_god_star>TableData.getInstance().getData(TableData.tb_god_star, id);
        }

        public static get_TB_god_star($selectkey: string = null, $selectValue: string = null): Array<TB_god_star> {
            var $arr: Array<TB_god_star> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_god_star)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_god_star = $obj.data[$key] as TB_god_star
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_god_star = $obj.data[$key] as TB_god_star
                    $arr.push($vo)
                }
            }
            return $arr
        }

        /** 升星神灵材料 */
        private _godMaterialList: game.GodMaterialTbVo[];
        getGodMaterialList(): game.GodMaterialTbVo[] {
            if (!this._godMaterialList) {
                this._godMaterialList = [];
                if (this.material) {
                    this.material.forEach((ary: any[]) => {
                        this._godMaterialList.push({ type: ary[0], race: ary[1], godId: ary[1], starLv: ary[2], count: ary[3] });
                    });
                }
            }
            return this._godMaterialList;
        }
    }

    /** 英雄缘分系统表 */
    export class TB_god_fate {
        public ID: number;
        public need_god: Array<number>;
        public name: string;
        public attr: Array<Array<number>>;
        public rank: number;

        public static get_TB_god_fateById($id: number): TB_god_fate {
            let $obj: TB_god_fate = <TB_god_fate>TableData.getInstance().getData(TableData.tb_god_fate, $id);
            return $obj;
        }

        public static get_TB_god_fate($selectkey: string = null, $selectValue: string = null): Array<TB_god_fate> {
            var $arr: Array<TB_god_fate> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_god_fate)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_god_fate = $obj.data[$key] as TB_god_fate
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_god_fate = $obj.data[$key] as TB_god_fate
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**英雄融魂表 */
    export class TB_fusion_soul {
        public ID: number;
        public attr_max: Array<Array<number>>;
        public hp_max: number;
        public atk_max: number;
        public def_max: number;
        public special_attr: Array<any>;
        public break_limit: number;
        public cost_hp: Array<any>;
        public cost_atk: Array<any>;
        public cost_def: Array<any>;
        public add_hp: number;
        public add_atk: number;
        public add_def: number;
        public crit: Array<any>;

        public static get_TB_fusion_soulById($id: number): TB_fusion_soul {
            var $obj: any = TableData.getInstance().getData(TableData.tb_fusion_soul, $id)
            var $vo: TB_fusion_soul = $obj as TB_fusion_soul
            return $vo;
        }

        public static get_TB_fusion_soul($selectkey: string = null, $selectValue: string = null): Array<TB_fusion_soul> {
            var $arr: Array<TB_fusion_soul> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_fusion_soul)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_fusion_soul = $obj.data[$key] as TB_fusion_soul
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_fusion_soul = $obj.data[$key] as TB_fusion_soul
                    $arr.push($vo)
                }
            }
            return $arr
        }

        /** 获取单次消耗的 */
        public getOnceCost(type: number): number {
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                return this.cost_hp[0][1];
            } else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                return this.cost_atk[0][1];
            } else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                return this.cost_def[0][1];
            }
            return 0;
        }

        /** 获取属性上限 */
        public getMaxAttr(type: number): number {
            for (let ary of this.attr_max) {
                if (ary[0] == type) {
                    return ary[1];
                }
            }
            return 0;
        }
        /** 获取等级上限 */
        public getMaxLv(type: number): number {
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                return this.hp_max
            } else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                return this.atk_max;
            } else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                return this.def_max;
            }
            return 0;
        }
        /** 获取单次增加的属性值 */
        public getOnceAdd(type: number): number {
            if (type == iface.tb_prop.fuseAttrTypeKey.hp) {
                return this.add_hp
            } else if (type == iface.tb_prop.fuseAttrTypeKey.atk) {
                return this.add_atk;
            } else if (type == iface.tb_prop.fuseAttrTypeKey.def) {
                return this.add_def;
            }
            return 0;
        }
    }

    export class TB_wish {
        public ID: number;
        public weight: number;
        public type: number;
        public min_num: number;
        public server_num: number;
        public location: number;
        public notice_id: number;
        public item: Array<number>;
        public is_show_effect: number;

        public static get_TB_wishById($id: number): TB_wish {
            var $obj: any = TableData.getInstance().getData(TableData.tb_wish, $id)
            var $vo: TB_wish = $obj as TB_wish
            return $vo;
        }

        public static get_TB_wish($selectkey: string = null, $selectValue: string = null): Array<TB_wish> {
            var $arr: Array<TB_wish> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_wish)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_wish = $obj.data[$key] as TB_wish
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_wish = $obj.data[$key] as TB_wish
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_wish_set {
        public ID: number;
        public free_num: number;
        public cost_diamond: number;
        public max_num: number;

        public static get_TB_wish_set(): TB_wish_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_wish_set, 1)
            var $vo: TB_wish_set = $obj as TB_wish_set
            return $vo;
        }

        /** 获取每日免费次数 */
        static getFreeNum(): number {
            let item = tb.TB_wish_set.get_TB_wish_set();
            return item.free_num;
        }
        /** 获取最大次数 */
        static getMaxNum(): number {
            let item = tb.TB_wish_set.get_TB_wish_set();
            return item.max_num;
        }
    }

    /** 主线任务 */
    export class TB_task {
        public ID: number;
        public name: string;   //任务名称
        public desc: string;
        public icon: string;
        public type: number;   //类型 1主线 2成就 3限时
        public sub_type: number;
        public count_type: number;
        public para: any[];   //任务条件
        public check_num: number;  //完成次数
        public reward: any[];        //任务奖励
        public rune_reward: any[];   //符文奖励
        public pre_taskid: number; //前置任务
        public post_taskid: number;    //后置任务
        public req_minlevel: number;   //最低接取等级
        public link: any[];           //链接
        public label: number;          //标签页
        public sub_label: number;      //子标签页
        public rank: number;           //任务排序
        public time_type: number;      //限时类型
        public conditions: any[];        //条件值

        public static getTaskById(id: number): TB_task {
            let $obj: TB_task = <TB_task>TableData.getInstance().getData(TableData.tb_task, id);
            return $obj;
        }

        public static getTaskListByType(type: number): TB_task[] {
            let table = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_task)).data;
            let list: TB_task[] = [];
            for (let id in table) {
                let task: TB_task = table[id];
                if (task.type == type) {
                    list.push(task);
                }
            }
            return list;
        }

        public static getAchievementListByType(lbType: number, subLbType: number = 0): TB_task[] {
            let table = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_task)).data;
            let list: TB_task[] = [];
            for (let id in table) {
                let task: TB_task = table[id];
                if (task.type == iface.tb_prop.taskTypeKey.achievement && task.label == lbType && task.sub_label == subLbType) {
                    list.push(task);
                }
            }
            return list;
        }
    }

    /** 挑战任务的主标签 */
    export class TB_task_title {
        public ID: number;
        public desc: string;

        public static getCfgById(id: number): TB_task_title {
            let $obj: TB_task_title = <TB_task_title>TableData.getInstance().getData(TableData.tb_task_title, id);
            return $obj;
        }
    }

    /** 日常任务 */
    export class TB_daily {
        public ID: number;
        public name: string;   //任务名称
        public desc: string;
        public icon: string;
        public type: number;   //类型 1主线 2成就 3限时
        public num: number;
        public reward: any[];
        public liveness: number;
        public obtain_exp: number;  // 勇者之证的经验 
        public link: any[];           //链接

        public static getTaskById(id: number): TB_daily {
            let $obj: TB_daily = <TB_daily>TableData.getInstance().getData(TableData.tb_daily, id);
            return $obj;
        }
    }

    /** 日常任务活跃任务 */
    export class TB_daily_reward {
        public ID: number;
        public reward: any[];
        public liveness: number;

        public static getItemById(id: number): TB_daily_reward {
            let $obj: TB_daily_reward = <TB_daily_reward>TableData.getInstance().getData(TableData.tb_daily_reward, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
    }
    /** 集市商品 */
    export class TB_market {
        public ID: number;
        public type: number;
        public reward: any[];
        public weight: number;
        public open: number;
        public price: number;
        public max_count: number;
        public discount: number;

        public static getItemById(id: number): TB_market {
            let $obj: TB_market = <TB_market>TableData.getInstance().getData(TableData.tb_market, id);
            return $obj;
        }
    }

    /** 集市商品 */
    export class TB_market_set {
        public ID: number;
        public max_num: number;
        public cost_diamond: number;
        public reply_num: number;
        public reply_interval: number;
        public first_arise:Array<number>;

        public static getItemById(id: number): TB_market_set {
            let $obj: TB_market_set = <TB_market_set>TableData.getInstance().getData(TableData.tb_market_set, id);
            return $obj;
        }
        /** 获取每日刷新次数 */
        static getMaxNum(): number {
            let item = tb.TB_market_set.getItemById(1);
            return item.max_num;
        }
        /** 获取刷新消耗 */
        static getCostDiamond(): number {
            let item = tb.TB_market_set.getItemById(1);
            return item.cost_diamond;
        }
    }

    /** 英雄评价模板 */
    export class TB_evaluation {
        public ID: number;
        public content: string;
        public like: number;

        public static get_TB_evaluationById(id: number): TB_evaluation {
            let $obj: TB_evaluation = <TB_evaluation>TableData.getInstance().getData(TableData.tb_evaluation, id);
            return $obj;
        }
    }

    export class TB_rune {
        public ID: number;
        public name: string;
        public main_attr: number;
        public append_attr: number;
        public suit: number;
        public vice_attr: Array<number>;

        public static get_TB_runeById(id: number): TB_rune {
            let $obj: TB_rune = <TB_rune>TableData.getInstance().getData(TableData.tb_rune, id);
            return $obj;
        }
    }

    export class TB_rune_prefix {
        public ID: number;
        public desc: string;

        public static get_TB_rune_prefixById(id: number): TB_rune_prefix {
            let $obj: TB_rune_prefix = <TB_rune_prefix>TableData.getInstance().getData(TableData.tb_rune_prefix, id);
            return $obj;
        }
    }

    export class TB_rune_strength {
        public ID: number;
        public cost: number;
        public success: number;
        public attr: Array<Array<number>>;

        public static get_TB_rune_strengthById(id: number): TB_rune_strength {
            let $obj: TB_rune_strength = <TB_rune_strength>TableData.getInstance().getData(TableData.tb_rune_strength, id);
            return $obj;
        }
    }

    export class TB_rune_set {
        public ID: number;
        public attr_max: number;
        public strength_maxlevel: number;
        public attr_add: Array<number>;
        public quality_append: Array<number>;
        public append_attrmax: Array<Array<number>>;

        public static get_TB_rune_setById(id: number): TB_rune_set {
            let $obj: TB_rune_set = <TB_rune_set>TableData.getInstance().getData(TableData.tb_rune_set, id);
            return $obj;
        }
    }

    export class TB_rune_suit {
        public ID: number;
        public desc: string;
        public need_num: number;
        public kind_basis: number;
        public suit: number;
        public buff: number;
        public suit_add: Array<number>;
        public star_para: Array<number>;
        public vice_para: Array<number>;
        public quality_para: Array<number>;
        public location_para: Array<number>;

        public static get_TB_rune_suitById(id: number): TB_rune_suit {
            let $obj: TB_rune_suit = <TB_rune_suit>TableData.getInstance().getData(TableData.tb_rune_suit, id);
            return $obj;
        }

        public static get_TB_rune($selectkey: string = null, $selectValue: string = null): Array<TB_rune_suit> {
            var $arr: Array<TB_rune_suit> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_rune_suit)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_rune_suit = $obj.data[$key] as TB_rune_suit
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_rune_suit = $obj.data[$key] as TB_rune_suit
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /* 随机名字库 */
    export class TB_random_name {
        public ID: number;
        public xing: string;
        public boy_name: string;
        public girl_name: string;
        public static familyNames = [];
        public static boyNames = [];
        public static girlNames = [];



        /**
         * 根据性别获得一个随机的名字
         * @param sex null:随机性别,0:男,1女
         */
        public static getRandomName(sex: number): string {
            if (this.familyNames.length == 0) {
                var tb_random_name: any = TableData.getInstance().getTableByName(TableData.tb_random_name).data;
                for (var key in tb_random_name) {
                    var info = tb_random_name[key];
                    if (info.xing !== '') {
                        TB_random_name.familyNames.push(info.xing);
                    }
                    if (info.boy_name !== '') {
                        TB_random_name.boyNames.push(info.boy_name);
                    }
                    if (info.girl_name !== '') {
                        TB_random_name.girlNames.push(info.girl_name);
                    }
                }
            }
            var familyName = this.familyNames[utils.random(0, this.familyNames.length - 1)];
            var firstName = null;
            if (!sex) {
                sex = utils.random(0, 1);
            }
            if (sex === 0) {
                firstName = this.boyNames[utils.random(0, this.boyNames.length - 1)];
            }
            else {
                firstName = this.girlNames[utils.random(0, this.girlNames.length - 1)];
            }
            return familyName + firstName;
        }
    }

    /** Npc挑战列表 */
    export class TB_arena_npc {
        public cd: number;
        public ID: number;
        public name: string;
        public icon: number;
        public open_level: number;
        public reward: number;
        public cost_num: number;
        public title: string;
        public map: number;
        public monster: Array<number>;

        public static get_TB_arena_npcById(id: number): TB_arena_npc {
            let $obj: TB_arena_npc = <TB_arena_npc>TableData.getInstance().getData(TableData.tb_arena_npc, id);
            return $obj;
        }

        public static get_TB_arena_npc($selectkey: string = null, $selectValue: string = null): Array<TB_arena_npc> {
            var $arr: Array<TB_arena_npc> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_arena_npc)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_arena_npc = $obj.data[$key] as TB_arena_npc
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_arena_npc = $obj.data[$key] as TB_arena_npc
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**名次和所需积分 */
    export class TB_arena_rank {
        public ID: number;
        public need_value: number;
        public rank: Array<number>;

        public static get_TB_arena_rankById(id: number): TB_arena_rank {
            let $obj: TB_arena_rank = <TB_arena_rank>TableData.getInstance().getData(TableData.tb_arena_rank, id);
            return $obj;
        }

        public static get_TB_arena_rank($selectkey: string = null, $selectValue: string = null): Array<TB_arena_rank> {
            var $arr: Array<TB_arena_rank> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_arena_rank)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_arena_rank = $obj.data[$key] as TB_arena_rank
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_arena_rank = $obj.data[$key] as TB_arena_rank
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**段位奖励 */
    export class TB_rank_score {
        public ID: number;
        public level: number;
        public name: string;
        public score: number;
        public rank: number;
        public fail_medal: Array<number>;
        public victory_medal: Array<number>;
        public reward: Array<Array<number>>;

        public static get_TB_rank_scoreById(id: number): TB_rank_score {
            let $obj: TB_rank_score = <TB_rank_score>TableData.getInstance().getData(TableData.tb_rank_score, id);
            return $obj;
        }

        public static get_TB_rank_score($selectkey: string = null, $selectValue: string = null): Array<TB_rank_score> {
            var $arr: Array<TB_rank_score> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_rank_score)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_rank_score = $obj.data[$key] as TB_rank_score
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_rank_score = $obj.data[$key] as TB_rank_score
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**商店/荣誉商店 */
    export class TB_goods {
        public ID: number;
        public type: number;
        public label: number;
        public item_id: Array<number>;
        public name: string;
        public money_type: number;
        public price: number;
        public rank: number;
        public buy_type: number;
        public num: number

        public static get_TB_goodsById(id: number): TB_goods {
            let $obj: TB_goods = <TB_goods>TableData.getInstance().getData(TableData.tb_goods, id);
            return $obj;
        }

        public static get_TB_goods($selectkey: string = null, $selectValue: string = null): Array<TB_goods> {
            var $arr: Array<TB_goods> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_goods)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_goods = $obj.data[$key] as TB_goods
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_goods = $obj.data[$key] as TB_goods
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static get_TB_goodsByType(type: number, label: number = 0): Array<TB_goods> {
            let $goodsobj: Array<TB_goods> = TableData.getInstance().getTableByName(TableData.tb_goods).data;
            let $obj: Array<TB_goods> = [];
            for (let i in $goodsobj) {
                if ($goodsobj[i].type === type) {
                    if ($goodsobj[i].label === label)
                        $obj.push($goodsobj[i]);
                }
            }

            $obj.sort((obja, objb) => {
                return obja.rank - objb.rank;
            });

            return $obj;
        }
    }

    /**公会升级所需经验/人数上限 */
    export class TB_guild {
        public ID: number
        public need_exp: number;
        public limit_num: number;

        public static get_TB_guildById(id: number): TB_guild {
            let $obj: TB_guild = <TB_guild>TableData.getInstance().getData(TableData.tb_guild, id);
            return $obj;
        }

        public static get_TB_guild($selectkey: string = null, $selectValue: string = null): Array<TB_guild> {
            var $arr: Array<TB_guild> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_guild)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_guild = $obj.data[$key] as TB_guild
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_guild = $obj.data[$key] as TB_guild
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /** 公会图标 */
    export class TB_guild_icon {
        public ID: number;
        public icon: string;

        public static get_TB_guild_iconById(id: number): TB_guild_icon {
            let $obj: TB_guild_icon = <TB_guild_icon>TableData.getInstance().getData(TableData.tb_guild_icon, id);
            return $obj;
        }

        public static get_TB_guild_icon($selectkey: string = null, $selectValue: string = null): Array<TB_guild_icon> {
            let $arr: Array<TB_guild_icon> = new Array();
            let $obj: any = TableData.getInstance().getTableByName(TableData.tb_guild_icon);
            for (let $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        let $vo: TB_guild_icon = $obj.data[$key] as TB_guild_icon;
                        $arr.push($vo);
                    }
                } else {
                    let $vo: TB_guild_icon = $obj.data[$key] as TB_guild_icon;
                    $arr.push($vo);
                }
            }
            return $arr;
        }
    }

    /** 公会技能 */
    export class TB_guild_skill {
        public ID: number;
        public name: string;
        public attr: Array<number>;
        public cost: number;

        public static get_TB_guild_skillById(id: number): TB_guild_skill {
            let $obj: TB_guild_skill = <TB_guild_skill>TableData.getInstance().getData(TableData.tb_guild_skill, id);
            return $obj;
        }

        public static getTbByParam(godType:number,attrType:number,level:number): TB_guild_skill {
            let key = godType * 1000 + attrType * 100 + level;
            return TB_guild_skill.get_TB_guild_skillById(key);
        }

        public static get_TB_guild_skill($selectkey: string = null, $selectValue: string = null): Array<TB_guild_skill> {
            let $arr: Array<TB_guild_skill> = new Array();
            let $obj: any = TableData.getInstance().getTableByName(TableData.tb_guild_skill);
            for (let $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        let $vo: TB_guild_skill = $obj.data[$key] as TB_guild_skill;
                        $arr.push($vo);
                    }
                } else {
                    let $vo: TB_guild_skill = $obj.data[$key] as TB_guild_skill;
                    $arr.push($vo);
                }
            }
            return $arr;
        }

    }

    /**公会签到奖励 */
    export class TB_guild_sign {
        public ID: number
        public scope: Array<number>;
        public reward: Array<Array<number>>;

        public static get_TB_guild_signById(id: number): TB_guild_sign {
            let $obj: TB_guild_sign = <TB_guild_sign>TableData.getInstance().getData(TableData.tb_guild_sign, id);
            return $obj;
        }

        public static get_TB_guild_signMaxId(): TB_guild_sign {
            return this.get_TB_guild_signById(this.get_TB_guild_sign().length);
        }

        public static get_TB_guild_sign($selectkey: string = null, $selectValue: string = null): Array<TB_guild_sign> {
            var $arr: Array<TB_guild_sign> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_guild_sign)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_guild_sign = $obj.data[$key] as TB_guild_sign
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_guild_sign = $obj.data[$key] as TB_guild_sign
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**公会限制信息 */
    export class TB_guild_set {
        public ID: number
        public cd: number;
        public join_limit: Array<number>;
        public create_cost: Array<number>;
        public map: number;
        public time: number;   // boss挑战次数
        public mail: number;    // 击杀邮件
        public buy_cost: Array<number>;    // 购买副本次数消耗钻石
        public copy_buy: number;       // 普通玩家副本购买次数
        public round_max: number;
        public resetskill_cost: Array<number>;
        //援助
        public daily_help_num : number;     // 每日累计求援次数
        public help_cd : number;            // 求助CD
        public free_help_num : number;      // 免费求助次数
        public help_cost: Array<Array<number>>;    // 每次援助消耗
        public help_box: Array<Array<number>>;     // 援助宝箱
        public help_reward: Array<Array<number>>;     // 援助奖励
        public help_gonggao : number;
        public cost_help_max : number;              // 每日钻石援助次数上限
        public create_viplevel : number;              // 创建公会所需VIP

        public daily_recruit_num : number;      // 每日招募次数
        public recruit_cost : Array<number>;    // 招募钻石消耗
        public usurper_time : Array<number>;    // 篡位时长
        public vice_chairman_num : number;      // 副会长数量

        public static getSet(): TB_guild_set {
            let $obj: TB_guild_set = <TB_guild_set>TableData.getInstance().getData(TableData.tb_guild_set, 1);
            return $obj;
        }
    }

    export class TB_guild_donate {
        public ID: number
        public desc: string;
        public cost: Array<number>;
        public reward: Array<Array<number>>;
        
        public static getItemnById(id: number): TB_guild_donate {
            let $obj: TB_guild_donate = <TB_guild_donate>TableData.getInstance().getData(TableData.tb_guild_donate, id);
            return $obj;
        }
    }

    export class TB_guild_help {
        public ID: number
        public desc: string;
        public reward: Array<Array<number>>;    // 实际奖励
        public help_num : number;               // 援助次数上限
        public daily_help_num : number;         // 每日可求援次数
        
        public static getItemnById(id: number): TB_guild_help {
            let $obj: TB_guild_help = <TB_guild_help>TableData.getInstance().getData(TableData.tb_guild_help, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach((ary: any[]) => {
                        let vo = new ItemVo(Number(ary[0]), Number(ary[1]));
                        vo.show = false;
                        this._rewardList.push(vo);
                    });
                }
            }
            return this._rewardList;
        }

        public static getList(selectkey: string = null, selectValue: string = null): Array<TB_guild_help> {
            var arr: Array<TB_guild_help> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_guild_help).data;
            for (var key in obj) {
                if (selectkey != null) {
                    if (obj[key][selectkey] == selectValue) {
                        arr.push(obj[key])
                    }
                } else {
                    arr.push(obj[key])
                }
            }
            return arr
        }
    }

    export class TB_guild_copy {
        public ID: number
        public model: number;
        public moster: Array<number>;
        public attack_reward: Array<Array<number>>;
        public rank_1: Array<Array<number>>;
        public rank_2: Array<Array<number>>;
        public rank_3: Array<Array<number>>;
        public rank_4: Array<Array<number>>;
        public index : number;

        getName():string {
            return LanMgr.getLan('',10030,(this.index+1));
        }

        getMonterId():number {
            let monsterId = this.moster.find((id)=>{
                return Number(id) != 0;
            });
            return monsterId;
        }

        public static getItemnById(id: number): TB_guild_copy {
            let $obj: TB_guild_copy = <TB_guild_copy>TableData.getInstance().getData(TableData.tb_guild_copy, id);
            return $obj;
        }

        public static getListByChapter(chapter: number): TB_guild_copy[] {
            let list = [];
            let tbCopy = (<ResTabelVo>TableData.getInstance().getTableByName(TableData.tb_guild_copy)).data;
            for (let id in tbCopy) {
                let num = Math.floor(parseInt(id) / 10);
                if (num == chapter) {
                    list.push(tbCopy[id]);
                }
            }
            return list;
        }

        public static getList(selectkey: string = null, selectValue: string = null): Array<TB_guild_copy> {
            var arr: Array<TB_guild_copy> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_guild_copy).data;
            for (var key in obj) {
                if (selectkey != null) {
                    if (obj[key][selectkey] == selectValue) {
                        arr.push(obj[key])
                    }
                } else {
                    arr.push(obj[key])
                }
            }
            return arr
        }
    }

    export class TB_copy_reward {
        public ID: number
        public num: number;
        public desc: string;
        public reward: Array<Array<number>>;

        public static getItemnById(id: number): TB_copy_reward {
            let $obj: TB_copy_reward = <TB_copy_reward>TableData.getInstance().getData(TableData.tb_copy_reward, id);
            return $obj;
        }
    }

    /**首充奖励 */
    export class TB_first_recharge {
        public ID: number;
        public show: Array<number>;
        public recharge_count: number;
        public reward_1: Array<Array<number>>;
        public reward_2: Array<Array<number>>;
        public reward_3: Array<Array<number>>;
        public show_type: number;
        public desc: string;

        public static get_TB_first_rechargeById(id: number): TB_first_recharge {
            let $obj: TB_first_recharge = <TB_first_recharge>TableData.getInstance().getData(TableData.tb_first_recharge, id);
            return $obj;
        }

        public static get_TB_first_recharge($selectkey: string = null, $selectValue: string = null): Array<TB_first_recharge> {
            var $arr: Array<TB_first_recharge> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_first_recharge)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_first_recharge = $obj.data[$key] as TB_first_recharge
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_first_recharge = $obj.data[$key] as TB_first_recharge
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**等级礼包 */
    export class TB_level {
        public ID: number;
        public level: number;
        public reward: Array<Array<number>>;

        public static get_TB_levelById(id: number): TB_level {
            let $obj: TB_level = <TB_level>TableData.getInstance().getData(TableData.tb_level, id);
            return $obj;
        }

        public static get_TB_level($selectkey: string = null, $selectValue: string = null): Array<TB_level> {
            var $arr: Array<TB_level> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_level)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_level = $obj.data[$key] as TB_level
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_level = $obj.data[$key] as TB_level
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**签到奖励 */
    export class TB_day_sign {
        public ID: number;
        public reward: Array<number>;

        public static get_TB_day_signById(id: number): TB_day_sign {
            let $obj: TB_day_sign = <TB_day_sign>TableData.getInstance().getData(TableData.tb_day_sign, id);
            return $obj;
        }

        public static get_TB_day_sign($selectkey: string = null, $selectValue: string = null): Array<TB_day_sign> {
            var $arr: Array<TB_day_sign> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_day_sign)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_day_sign = $obj.data[$key] as TB_day_sign
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_day_sign = $obj.data[$key] as TB_day_sign
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**累计签到奖励 */
    export class TB_total_sign {
        public ID: number;
        public total_day: number;
        public reward: Array<number>;

        public static get_TB_total_signById(id: number): TB_total_sign {
            let $obj: TB_total_sign = <TB_total_sign>TableData.getInstance().getData(TableData.tb_total_sign, id);
            return $obj;
        }

        public static get_TB_total_sign($selectkey: string = null, $selectValue: string = null): Array<TB_total_sign> {
            var $arr: Array<TB_total_sign> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_total_sign)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_total_sign = $obj.data[$key] as TB_total_sign
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_total_sign = $obj.data[$key] as TB_total_sign
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /** 每日礼包 */
    export class TB_daily_recharge {
        public ID: number;
        public recharge_num: number;    // 充值额度
        public limit_num: number;       // 限购次数
        public desc: string;            // 描述
        public reward: Array<Array<number>>;
        public discount: number;       // 折扣显示
        public recharge_id: number;    // 充值ID

        public static get_TB_ById(id: number): TB_daily_recharge {
            let obj: TB_daily_recharge = <TB_daily_recharge>TableData.getInstance().getData(TableData.tb_daily_recharge, id);
            return obj;
        }

        public static getTBByRechargeId(id: number): TB_daily_recharge {
            let ary = TB_daily_recharge.getAllTB();
            return ary.find((vo) => {
                return vo.recharge_id == id;
            });
        }

        public static getAllTB(): Array<TB_daily_recharge> {
            let arr: Array<TB_daily_recharge> = new Array
            let obj: any = TableData.getInstance().getTableByName(TableData.tb_daily_recharge)
            for (let $key in obj.data) {
                arr.push(obj.data[$key]);
            }
            return arr
        }

        /** 获取所有的充值ID */
        public static getAllRecharges(): number[] {
            let ids = []
            let ary = TB_daily_recharge.getAllTB();
            for (let tbVo of ary) {
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach((ary: any[]) => {
                        this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        }
    }
    /** 每周礼包 */
    export class TB_week_recharge {
        public ID: number;
        public recharge_num: number;    // 充值额度
        public limit_num: number;       // 限购次数
        public desc: string;            // 描述
        public reward: Array<Array<number>>;
        public discount: number;       // 折扣显示
        public recharge_id: number;    // 充值ID

        public static get_TB_ById(id: number): TB_week_recharge {
            let obj: TB_week_recharge = <TB_week_recharge>TableData.getInstance().getData(TableData.tb_week_recharge, id);
            return obj;
        }

        public static getTBByRechargeId(id: number): TB_week_recharge {
            let ary = TB_week_recharge.getAllTB();
            return ary.find((vo) => {
                return vo.recharge_id == id;
            });
        }

        public static getAllTB(): Array<TB_week_recharge> {
            let arr: Array<TB_week_recharge> = new Array
            let obj: any = TableData.getInstance().getTableByName(TableData.tb_week_recharge)
            for (let $key in obj.data) {
                arr.push(obj.data[$key]);
            }
            return arr
        }

        /** 获取所有的充值ID */
        public static getAllRecharges(): number[] {
            let ids = []
            let ary = TB_week_recharge.getAllTB();
            for (let tbVo of ary) {
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach((ary: any[]) => {
                        this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        }
    }
    /** 每月礼包 */
    export class TB_month_recharge {
        public ID: number;
        public recharge_num: number;    // 充值额度
        public limit_num: number;       // 限购次数
        public desc: string;            // 描述
        public reward: Array<Array<number>>;
        public discount: number;       // 折扣显示
        public recharge_id: number;    // 充值ID

        public static get_TB_ById(id: number): TB_month_recharge {
            let obj: TB_month_recharge = <TB_month_recharge>TableData.getInstance().getData(TableData.tb_month_recharge, id);
            return obj;
        }

        public static getTBByRechargeId(id: number): TB_month_recharge {
            let ary = TB_month_recharge.getAllTB();
            return ary.find((vo) => {
                return vo.recharge_id == id;
            });
        }

        public static getAllTB(): Array<TB_month_recharge> {
            let arr: Array<TB_month_recharge> = new Array
            let obj: any = TableData.getInstance().getTableByName(TableData.tb_month_recharge)
            for (let $key in obj.data) {
                arr.push(obj.data[$key]);
            }
            return arr
        }

        /** 获取所有的充值ID */
        public static getAllRecharges(): number[] {
            let ids = []
            let ary = TB_month_recharge.getAllTB();
            for (let tbVo of ary) {
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.reward) {
                    this.reward.forEach((ary: any[]) => {
                        this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        }
    }

    /**七日签到奖励 */
    export class TB_sevendays {
        public ID: number;
        public showicon: number;
        public reward: Array<Array<number>>;

        public static get_TB_sevendaysById(id: number): TB_sevendays {
            let $obj: TB_sevendays = <TB_sevendays>TableData.getInstance().getData(TableData.tb_sevendays, id);
            return $obj;
        }

        public static TYPE_DAYS: number = 7;
        public static TYPE_NUM: number = 2;
        private static _allSevenTypes: Array<Array<TB_sevendays>>;
        public static get_TB_sevendays(type: number = 1): Array<TB_sevendays> {
            if (!this._allSevenTypes) {
                this._allSevenTypes = [];
                var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sevendays)
                for (var $key in $obj.data) {
                    var $vo: TB_sevendays = $obj.data[$key] as TB_sevendays
                    let index: number = Math.floor(($vo.ID - 1) / this.TYPE_DAYS);
                    if (!this._allSevenTypes[index]) {
                        this._allSevenTypes[index] = [];
                    }
                    this._allSevenTypes[index].push($vo);
                }
            }
            let idx: number = type - 1;
            if (idx < 0) return [];

            return this._allSevenTypes[idx];
        }
    }

    /**七日活动时间 */
    export class TB_sevendays_times {
        public ID: number;
        public time: Array<number>;

        public static getActivityOpenId(): number {
            //创角第几天
            let crt = Math.floor((App.serverTime - App.hero.getCreateDayTiem()) / TimeConst.ONE_DAY_MILSEC) + 1;
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sevendays_time);
            for (var $key in $obj.data) {
                let $vo: TB_sevendays_times = $obj.data[$key] as TB_sevendays_times
                if (crt >= $vo.time[0] && crt <= $vo.time[1]) {
                    return $vo.ID;
                }
            }
            return -1;
        }

        public static getIdx(createday: number): number {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sevendays_time);
            for (var $key in $obj.data) {
                let $vo: TB_sevendays_times = $obj.data[$key] as TB_sevendays_times
                if (createday >= $vo.time[0] && createday <= $vo.time[1]) {
                    return createday - $vo.time[0];
                }
            }
            return -1;
        }

        public static getEndTime(createday: number): number {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sevendays_time);
            for (var $key in $obj.data) {
                let $vo: TB_sevendays_times = $obj.data[$key] as TB_sevendays_times
                if (createday >= $vo.time[0] && createday <= $vo.time[1]) {
                    return $vo.time[1];
                }
            }
            return -1;
        }
    }

    /**竞技场（新） */
    export class TB_arena_new implements inface.IAwardRankData {
        ID: number;
        rank: number[];
        reward: number[][];

        static get_TB_arena_newById(id: number): TB_arena_new {
            return <TB_arena_new>TableData.getInstance().getData(TableData.tb_arena_new, id);
        }

        static get_TB_arena_new($selectkey: string = null, $selectValue: string = null): Array<TB_arena_new> {
            var $arr: Array<TB_arena_new> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_arena_new)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_arena_new = $obj.data[$key] as TB_arena_new
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_arena_new = $obj.data[$key] as TB_arena_new
                    $arr.push($vo)
                }
            }
            return $arr
        }

        /**是否是前三 */
        isBeforeThree(): boolean {
            return !this.rank.some(rank => rank > 3) && this.rank[0] == this.rank[1];
        }

        /**名次描述 */
        getRankText(): string {
            return this.isBeforeThree() ? `` : this.rank[0] + `-` + this.rank[1];
        }

        getRankSkin(): string {
            let rank = Number(this.rank[0]);
            return SkinUtil.getRankingSkin(rank - 1);
        }

        getRank(): number {
            return Number(this.rank[0]) == Number(this.rank[1]) ? Number(this.rank[0]) : 999;
        }
        private _rankStr: string;
        getRankStr(): string {
            if (!this._rankStr) {
                this._rankStr = this.rank[0] == this.rank[1] ? `${this.rank[0]}` : `${this.rank[0]}-${this.rank[1]}`;
            }
            return this._rankStr;
        }

        private _rewards: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewards) this._rewards = this.reward.map(item => new ItemVo(item[0], item[1]));
            return this._rewards;
        }
    }

    /**竞技场NPC（新) */
    export class TB_arena_new_npc {
        ID: number;
        name: string;
        power: number;
        monster: number[];
        level: number = 1;
        first_reward: number;
        head: number = Math.ceil(random(2));

        static getTB_arena_newById(id: number) {
            return <TB_arena_new_npc>TableData.getInstance().getData(TableData.tb_arena_new_npc, id);
        }

        getModelId(): number {
            return this.getMonsters()[0].model;
        }

        private _monsters: tb.TB_monster[];
        getMonsters(): tb.TB_monster[] {
            if (!this._monsters) this._monsters = this.monster.map(vo => tb.TB_monster.get_TB_monsterById(vo));
            return this._monsters;
        }
    }

    /**竞技场翻牌 */
    export class TB_arena_draw {
        ID: number;
        type: number;
        item: number[];
        cost: number[];
        weight: number;
        discount: number;

        static getDataById(id: number): TB_arena_draw {
            return <TB_arena_draw>TableData.getInstance().getData(TableData.tb_arena_draw, id);
        }
    }

    export class TB_arena_new_set {
        ID: number;
        /**玩家对战地图 */
        map: number;
        /**战斗失败冷却 */
        fail_cd: number;
        /**包含购买次数的最大挑战次数 */
        max_num: number;
        /**每日挑战次数 */
        limit_num: number;
        /**普通玩家购买次数 */
        buy_limit: number;
        /**竞技场最大回合数 */
        round_max: number;
        /**购买竞技场次数消耗钻石 */
        buy_cost: number[];
        /**每日奖励邮件发放*/
        daily_mail: number;
        /**清除CD消耗钻石 */
        clear_cost: number;
        /**匹配宽度值 */
        match_width: number;
        /**最高排名的邮件 */
        highest_mail: number;
        /**玩家初始排名 */
        initial_rank: number;
        /**匹配修正值 */
        match_correct: number;
        /**每日奖励发放时间 */
        daily_reward: number[];
        /**胜利获得奖励 */
        win_reward: number[][];
        /**失败获得奖励 */
        lose_reward: number[][];

        /**获取竞技场购买次数花费 */
        getBuyCostDiamond(): number {
            let limitNum = App.hero.getlimitValue(iface.tb_prop.limitTypeKey.buyArenaNum);
            return this.buy_cost[limitNum] ? this.buy_cost[limitNum] : this.buy_cost[this.buy_cost.length - 1];
        }

        static getArenaNewSet(): TB_arena_new_set {
            return <TB_arena_new_set>TableData.getInstance().getData(TableData.tb_arena_new_set, 1);
        }
    }

    /** 商队护送配置 */
    export class TB_escort {
        public ID: number;
        public name: string;
        public escort_reward: Array<any>;
        public escort_loss: Array<any>;
        public rob_reward: Array<any>;
        public model: string;

        public static getItemById(id: number): TB_escort {
            let $obj: TB_escort = <TB_escort>TableData.getInstance().getData(TableData.tb_escort, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.escort_reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }

        private _lossList: ItemVo[];
        getLossList(): ItemVo[] {
            if (!this._lossList) {
                this._lossList = [];
                if (this.escort_loss) {
                    this.escort_loss.forEach((ary: any[]) => {
                        this._lossList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._lossList;
        }

        private _robList: ItemVo[];
        getRobList(): ItemVo[] {
            if (!this._robList) {
                this._robList = [];
                if (this.rob_reward) {
                    this.rob_reward.forEach((ary: any[]) => {
                        this._robList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._robList;
        }

    }

    /** 商队护送参数配置 */
    export class TB_escort_set {
        public ID: number
        public escort_num: number;          // 护送次数
        public rob_num: number;             // 掠夺次数
        public be_rob_num: number;          // 被掠夺次数
        public refresh_item: any[];         // 刷新消耗道具
        public refresh_cost: number;       // 刷新消耗道具
        public auto_item: any[];           // 一键刷新消耗道具
        public auto_cost: number;          // 一键刷新消耗钻石
        public double_time: Array<Array<number>>;        // 双倍时间
        public escort_time: number;        // 护送时间秒
        public complete_cost: any[];      // 快速完成消耗
        public scene: number;               // 战斗场景
        public double_prompt: string;

        public static getSet(): TB_escort_set {
            let $obj: TB_escort_set = <TB_escort_set>TableData.getInstance().getData(TableData.tb_escort_set, 1);
            return $obj;
        }
    }

    /** 迷雾森林 */
    export class TB_forest {
        public ID: number;
        public name: string;
        public monster: any[]
        public boss_show: number;
        public need_power: number;//需求战力
        public first_reward: Array<any>;        // 普通奖励
        public special_show: any[];            // 特殊奖励
        public special_desc: string;
        public reward: Array<any>              // 通关奖励

        public static getItemById(id: number): TB_forest {
            let $obj: TB_forest = <TB_forest>TableData.getInstance().getData(TableData.tb_forest, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        /** 通关奖励 */
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
        private _boosRewardList: ItemVo[];
        /** 每3层奖励 */
        getBossRewards(): ItemVo[] {
            if (!this._boosRewardList) {
                this._boosRewardList = [];
                if (this.first_reward && this.first_reward.length > 0) {
                    this.first_reward.forEach((ary: any[]) => {
                        this._boosRewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._boosRewardList;
        }

        private _monsters: Array<TB_monster>;
        public getMonsters(): Array<TB_monster> {
            if (!this._monsters) {
                this._monsters = new Array<TB_monster>();
                for (let i = 0; i < this.monster.length; i++) {
                    var mid = parseInt(this.monster[i]);
                    if (mid != 0) {
                        let itemVo = TB_monster.get_TB_monsterById(mid);
                        this._monsters.push(itemVo);
                    }
                }
            }
            return this._monsters;
        }
    }
    export class TB_forest_set {
        public ID: number
        public scene: number;

        public static getSet(): TB_forest_set {
            let $obj: TB_forest_set = <TB_forest_set>TableData.getInstance().getData(TableData.tb_forest_set, 1);
            return $obj;
        }
    }

    /** 神秘岛屿 */
    export class TB_island {
        public ID: number;
        public type: number;    // 1普通 2中级 3高级
        public name: string;
        public mine_level: Array<Array<number>>;    // 产出资源矿等级
        public mine_count: number;          // 每次刷新的矿数量
        public max_num: number;            // 最大存在数量

        public static getItemById(id: number): TB_island {
            let $obj: TB_island = <TB_island>TableData.getInstance().getData(TableData.tb_island, id);
            return $obj;
        }
    }
    export class TB_island_level {
        public ID: number;
        public name: string;
        public reward: Array<number>;  // 收益
        public interval: number;    // 收益间隔
        public max_time: number;    // 最多采集时间
        public rare_reward: Array<Array<number>>;  // 概率获得
        public plunder_loss: number;   // 被掠夺损失百分比
        public rare_loss: Array<Array<number>>;  // 稀有产出每次被掠夺的损失
        public occupy_loss: number;  // 被抢占损失百分比

        public static getItemById(id: number): TB_island_level {
            let $obj: TB_island_level = <TB_island_level>TableData.getInstance().getData(TableData.tb_island_level, id);
            return $obj;
        }
        private _rateList: ItemVo[];
        /** 概率物品 */
        getRateList(): ItemVo[] {
            if (!this._rateList) {
                this._rateList = [];
                this.rare_reward.forEach((ary: any[]) => {
                    this._rateList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rateList;
        }

        private _lossList: ItemVo[];
        /** 被掠夺的损失 */
        getLossList(): ItemVo[] {
            if (!this._lossList) {
                this._lossList = [];
                this.rare_loss.forEach((ary: any[]) => {
                    this._lossList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._lossList;
        }
    }
    export class TB_island_set {
        public ID: number
        public daily_num: number;   // 每日占领次数
        public plunder_max: number;   // 最大掠夺次数
        public buy_max: number;   // 最大购买次数
        public reply_time: number;   // 掠夺次数恢复间隔
        public refresh_time: Array<number>;   // 矿点刷新时间
        public buy_cost: Array<number>;    // 次数购买消耗
        public plunder_max_num: number;    // 普通收益被掠夺次数上限
        public scene: number;

        public static getSet(): TB_island_set {
            let $obj: TB_island_set = <TB_island_set>TableData.getInstance().getData(TableData.tb_island_set, 1);
            return $obj;
        }
    }

    /** 世界boss配置 */
    export class TB_worldboss {
        public ID: number;
        public monster: number[];
        public boss_level: number;         // boss等级
        public first_reward: number;       // 排名第一的奖励
        public part_reward: number;        // 非排名第一的奖励
        public resurgence_time: number;    // 死亡复活时间
        public level: number;              // 等级开启
        public attack_reward: any[];           // 挑战奖励
        public item_show: any[];           // 概率掉落奖励
        public rank_1: Array<Array<number>>;
        public rank_2: Array<Array<number>>;
        public rank_3: Array<Array<number>>;
        public rank_4: Array<Array<number>>;

        public static getItemById(id: number): TB_worldboss {
            let $obj: TB_worldboss = <TB_worldboss>TableData.getInstance().getData(TableData.tb_worldboss, id);
            return $obj;
        }

        private _rewardList: any[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.attack_reward.forEach((ary: any[]) => {
                    let temp = {
                        itemData: new ItemVo(Number(ary[0]), Number(ary[1])),
                        type: 0//必掉
                    };
                    this._rewardList.push(temp);
                });
                if (this.item_show) {
                    this.item_show.forEach((ary1: any[]) => {
                        let temp1 = {
                            itemData: new ItemVo(Number(ary1[0]), Number(ary1[1])),
                            type: 1//概率
                        };
                        this._rewardList.push(temp1);
                    });
                }

            }
            return this._rewardList;
        }
    }
    export class TB_boss_set {
        public ID: number
        public map: number;
        public round_max: number;          // 最大挑战次数
        public max_time: number;           // 最大挑战次数
        public reply_time: number;         // 回复时间
        public buy_cost: number;           // 购买所需钻石
        public normal_buy: number;         // 普通玩家购买次数

        public static getSet(): TB_boss_set {
            let $obj: TB_boss_set = <TB_boss_set>TableData.getInstance().getData(TableData.tb_boss_set, 1);
            return $obj;
        }
    }

    /** 邮件 */
    export class TB_mail {
        public ID: number
        public mail_name: string;
        public type: number;
        public mail_content: string;
        public sender: string;
        public reward: any[];

        public static getItemById(id): TB_mail {
            let $obj: TB_mail = <TB_mail>TableData.getInstance().getData(TableData.tb_mail, id);
            return $obj;
        }
    }

    /**充值表 */
    export class TB_recharge {
        public ID: number;
        public recharge_count: number;
        public desc: string;
        public first_multiple: number;
        public recharge_type: number;
        public extra_reward: number;
        public rank: number;
        // public day_gift: Array<any>;

        public static get_TB_rechargeById(id: number): TB_recharge {
            let $obj: TB_recharge = <TB_recharge>TableData.getInstance().getData(TableData.tb_recharge, id);
            return $obj;
        }

        public static get_TB_recharge($selectkey: string = null, $selectValue: string = null): Array<TB_recharge> {
            var $arr: Array<TB_recharge> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_recharge)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_recharge = $obj.data[$key] as TB_recharge
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_recharge = $obj.data[$key] as TB_recharge
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**VIP表 */
    export class TB_vip {
        public ID: number;
        public hang_up: number;
        public recharge: number;
        public arena_buy: number;
        public now_price: number;
        public flash_num: number;
        public god_limit: number;
        public wish_limit: number;
        public sweep_add: number;
        public daily_copy: number;
        // public offline_time: number;
        public fast_fighting: number;
        public original_price: number;
        public special: Array<number>;
        public guildcopy_buy: number;
        public item_gift: Array<Array<number>>;
        public rune_gift: Array<Array<number>>;
        public gold_exchange: number;
        public worldboss: number;
        public match_buy: number;
        public fight_goddomain: number;

        public static getMaxVip(): number {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_vip);
            let keylist = Object.keys($obj.data);
            return Number(keylist[keylist.length - 1]);
        }

        public static get_TB_vipById(id: number): TB_vip {
            let $obj: TB_vip = <TB_vip>TableData.getInstance().getData(TableData.tb_vip, id);
            return $obj;
        }

        public static get_TB_vip($selectkey: string = null, $selectValue: string = null): Array<TB_vip> {
            var $arr: Array<TB_vip> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_vip)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_vip = $obj.data[$key] as TB_vip
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_vip = $obj.data[$key] as TB_vip
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**月卡 */
    export class TB_month_card {
        public ID: number;
        public desc: string;
        public recharge_count: number;
        public effective_date: number;
        public item_gift: Array<Array<number>>;
        public day_gift: Array<Array<number>>;
        public offline_time: number;
        public free_fastfight_num: number;
        public recharge_id: number;


        public static getTbMonthCardById(id: number): TB_month_card {
            let $obj: TB_month_card = <TB_month_card>TableData.getInstance().getData(TableData.tb_month_card, id);
            return $obj;
        }


    }

    /** 专属特权*/
    export class TB_vip_privilege {
        public ID: number;
        public desc: string;
        /**vip开启等级 */
        public vip_level: number;
        /**普通玩家等级 */
        public general_level: number;
        /**参数 */
        public para: number;
        public is_show_special: number;

        public static get_TB_vip_privilegeById(id: number): TB_vip_privilege {
            let $obj: TB_vip_privilege = <TB_vip_privilege>TableData.getInstance().getData(TableData.tb_vip_privilege, id);
            return $obj;
        }

        public static get_TB_vip_privilege($selectkey: string = null, $selectValue: string = null): Array<TB_vip_privilege> {
            var $arr: Array<TB_vip_privilege> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_vip_privilege)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_vip_privilege = $obj.data[$key] as TB_vip_privilege
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_vip_privilege = $obj.data[$key] as TB_vip_privilege
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static getPrompt(id: number): string {
            let tbVip: TB_vip_privilege = <TB_vip_privilege>TableData.getInstance().getData(TableData.tb_vip_privilege, id);
            if (tbVip.vip_level > 0 && tbVip.general_level != 999) {
                return `vip${tbVip.vip_level}开启，或玩家等级${tbVip.general_level}开启`;
            } else if (tbVip.vip_level > 0) {
                return `vip${tbVip.vip_level}开启`;
            } else {
                return `玩家等级${tbVip.general_level}开启`;
            }
        }
    }

    /** 专属特权*/
    export class TB_vip_desc {
        public ID: number;
        public desc: string;
        public rank: number;

        public static get_TB_vip_descById(id: number): TB_vip_desc {
            let $obj: TB_vip_desc = <TB_vip_desc>TableData.getInstance().getData(TableData.tb_vip_desc, id);
            return $obj;
        }
    }

    /**装备强化基础属性表 */
    export class TB_equip_strength {
        /**ID */
        public ID: number;
        /**属性 */
        public strength_attr: Array<Array<number>>;
        /**强化消耗 */
        public cost: Array<Array<number>>;
        /**强化总消耗 */
        public total_cost: Array<Array<number>>;

        public static get_TB_equip_strengthById(id: number): TB_equip_strength {
            let $obj: TB_equip_strength = <TB_equip_strength>TableData.getInstance().getData(TableData.tb_equip_strength, id);
            return $obj;
        }

        private _attrObj: any;
        public getAttr(): any {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.strength_attr) {
                    for (let ary of this.strength_attr) {
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        }

        public static get_TB_equip_strength($selectkey: string = null, $selectValue: string = null): Array<TB_equip_strength> {
            var $arr: Array<TB_equip_strength> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equip_strength)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_equip_strength = $obj.data[$key] as TB_equip_strength
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_equip_strength = $obj.data[$key] as TB_equip_strength
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**装备强化套装属性表 */
    export class TB_strength_suit {
        /**ID */
        public ID: number;
        /**强化等级 */
        public level: number;
        /**套装属性 */
        public attr: Array<Array<number>>;

        public static get_TB_strength_suitById(id: number): TB_strength_suit {
            let $obj: TB_strength_suit = <TB_strength_suit>TableData.getInstance().getData(TableData.tb_strength_suit, id);
            return $obj;
        }

        private _attrObj: any;
        public getAttr(): any {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (let ary of this.attr) {
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        }

        public static get_TB_strength_suit($selectkey: string = null, $selectValue: string = null): Array<TB_strength_suit> {
            let $arr: Array<TB_strength_suit> = new Array
            let $obj: any = TableData.getInstance().getTableByName(TableData.tb_strength_suit)
            for (let $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        let $vo: TB_strength_suit = $obj.data[$key] as TB_strength_suit
                        $arr.push($vo)
                    }
                } else {
                    let $vo: TB_strength_suit = $obj.data[$key] as TB_strength_suit
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static get_TB_strength_suitByLv(lv: number): TB_strength_suit {
            let tbSuit: TB_strength_suit = null;
            let obj: any = TableData.getInstance().getTableByName(TableData.tb_strength_suit)
            for (let key in obj.data) {
                let vo: TB_strength_suit = obj.data[key] as TB_strength_suit;
                if (tbSuit) {
                    if (lv >= vo.level && vo.level > tbSuit.level) {
                        tbSuit = vo;
                    }
                } else {
                    if (lv >= vo.level) {
                        tbSuit = vo;
                    }
                }
            }
            return tbSuit;
        }
    }

    /**装备强化套装属性表 */
    export class TB_refine_suit {
        /**ID */
        public ID: number;
        /**强化等级 */
        public level: number;
        /**套装属性 */
        public attr: Array<Array<number>>;

        public static get_TB_refine_suitById(id: number): TB_refine_suit {
            let $obj: TB_refine_suit = <TB_refine_suit>TableData.getInstance().getData(TableData.tb_refine_suit, id);
            return $obj;
        }

        private _attrObj: any;
        public getAttr(): any {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (let ary of this.attr) {
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        }

        public static get_TB_refine_suit($selectkey: string = null, $selectValue: string = null): Array<TB_refine_suit> {
            var $arr: Array<TB_refine_suit> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_refine_suit)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_refine_suit = $obj.data[$key] as TB_refine_suit
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_refine_suit = $obj.data[$key] as TB_refine_suit
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static get_TB_refine_suitByLv(lv: number): TB_refine_suit {
            let tbSuit: TB_refine_suit = null;
            let obj: any = TableData.getInstance().getTableByName(TableData.tb_refine_suit)
            for (let key in obj.data) {
                let vo: TB_refine_suit = obj.data[key] as TB_refine_suit;
                if (tbSuit) {
                    if (lv >= vo.level && vo.level > tbSuit.level) {
                        tbSuit = vo;
                    }
                } else {
                    if (lv >= vo.level) {
                        tbSuit = vo;
                    }
                }
            }
            return tbSuit;
        }
    }

    /**装备套装加成表 */
    export class TB_equip_suit {
        /**ID */
        public ID: number;
        /**套装加成 */
        public suit_percent: Array<number>;

        public static get_TB_equip_suitById(id: number): TB_equip_suit {
            let $obj: TB_equip_suit = <TB_equip_suit>TableData.getInstance().getData(TableData.tb_equip_suit, id);
            return $obj;
        }

        /** 获取套装品质 */
        public getQuality(): number {
            return Math.floor(this.ID / 10);
        }
        /** 获取套装所需数量 */
        public getCount(): number {
            return this.ID % 10;
        }

        public static get_TB_equip_suit($selectkey: string = null, $selectValue: string = null): Array<TB_equip_suit> {
            var $arr: Array<TB_equip_suit> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equip_suit)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_equip_suit = $obj.data[$key] as TB_equip_suit
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_equip_suit = $obj.data[$key] as TB_equip_suit
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static getSuitByQuality(quality: number): TB_equip_suit[] {
            var arr: TB_equip_suit[] = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_equip_suit)
            for (var key in obj.data) {
                var vo: TB_equip_suit = obj.data[key] as TB_equip_suit;
                if (Math.floor(vo.ID / 10) == quality) {
                    arr.push(vo);
                }
            }
            return arr;
        }
    }

    /**装备精炼表 */
    export class TB_equip_refine {
        /**ID */
        public ID: number;
        /**升级经验 */
        public exp: number;
        /**精炼消耗 */
        public cost: Array<number>;
        /**属性加成 */
        public attr: Array<Array<number>>;
        /**精炼总消耗 */
        public total_cost: Array<Array<number>>;

        public static get_TB_equip_refineById(id: number): TB_equip_refine {
            let $obj: TB_equip_refine = <TB_equip_refine>TableData.getInstance().getData(TableData.tb_equip_refine, id);
            return $obj;
        }

        private _attrObj: any;
        public getAttr(): any {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (let ary of this.attr) {
                        this._attrObj[ary[0]] = ary[2];
                    }
                }
            }
            return this._attrObj;
        }

        public static get_TB_equip_refine($selectkey: string = null, $selectValue: string = null): Array<TB_equip_refine> {
            var $arr: Array<TB_equip_refine> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equip_refine)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_equip_refine = $obj.data[$key] as TB_equip_refine
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_equip_refine = $obj.data[$key] as TB_equip_refine
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**装备回收表 */
    export class TB_equip_recycle {
        /**ID */
        public ID: number;
        /**返还 */
        public return_item: Array<Array<number>>;

        public static get_TB_equip_recycleById(id: number): TB_equip_recycle {
            let $obj: TB_equip_recycle = <TB_equip_recycle>TableData.getInstance().getData(TableData.tb_equip_recycle, id);
            return $obj;
        }

        public static get_TB_equip_recycle($selectkey: string = null, $selectValue: string = null): Array<TB_equip_recycle> {
            var $arr: Array<TB_equip_recycle> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equip_recycle)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_equip_recycle = $obj.data[$key] as TB_equip_recycle
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_equip_recycle = $obj.data[$key] as TB_equip_recycle
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**装备读表 */
    export class TB_equip_set {
        /**ID */
        public ID: number;
        /**回收百分比（强化） */
        public strength_recycle: number;
        /**回收百分比（精炼） */
        public refine_recycle: number;
        /**精炼材料对应经验 */
        public refine_exp: Array<Array<number>>;
        /**精炼返还道具顺序 */
        public refine_rank: Array<number>;
        /**强化最大等级 */
        public strength_maxlevel: number;
        /**精炼最大等级 */
        public refine_maxlevel: number;
        /**宝石最大等级 */
        public gemstone_maxlevel: number;
        /** 精炼限制 */
        public refine_limit: number[];
        /** 装备镶嵌的宝石类型 */
        public gemstone_type: number[];        // 格式：[第1孔的类型,第2孔的类型,第3孔的类型]

        public static get_TB_equip_setById(id: number = 1): TB_equip_set {
            let $obj: TB_equip_set = <TB_equip_set>TableData.getInstance().getData(TableData.tb_equip_set, id);
            return $obj;
        }

        public static get_TB_equip_set($selectkey: string = null, $selectValue: string = null): Array<TB_equip_set> {
            var $arr: Array<TB_equip_set> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equip_set)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_equip_set = $obj.data[$key] as TB_equip_set
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_equip_set = $obj.data[$key] as TB_equip_set
                    $arr.push($vo)
                }
            }
            return $arr
        }

        /** 获取对应阶级可精炼的等级上限 */
        public static getRefineLimit(degree: number): number {
            let tbset: TB_equip_set = <TB_equip_set>TableData.getInstance().getData(TableData.tb_equip_set, 1);
            return tbset.refine_limit[degree] || 0;
        }
    }

    /**装备宝石表 */
    export class TB_gemstone_new {
        public ID: number;          // ABB (A类型：1生命2攻击3防御   B等级)
        public attr: Array<any>;

        public static getTBOneById(id: number): TB_gemstone_new {
            let $obj: TB_gemstone_new = <TB_gemstone_new>TableData.getInstance().getData(TableData.tb_gemstone_new, id);
            return $obj;
        }

        public static getTbGemByType(type: number, lv: number): TB_gemstone_new {
            let id = type * 100 + lv;
            return TB_gemstone_new.getTBOneById(id);
        }

        private _attrObj: any;
        /** 固定值属性加成 */
        public getAttr(): any {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.attr) {
                    for (let ary of this.attr) {
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        }

        public getType(): number {
            return Math.floor(this.ID / 100);
        }
        public getLevel(): number {
            return this.ID % 100;
        }
        // 宝石只有一种属性
        public getAttrType(): number {
            return this.attr && this.attr[0] ? this.attr[0][0] : 0;
        }
        public getAttrVal(): number {
            return this.attr && this.attr[0] ? this.attr[0][1] : 0;
        }

        public static getTbList($selectkey: string = null, $selectValue: string = null): Array<TB_gemstone_new> {
            var $arr: Array<TB_gemstone_new> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_gemstone_new)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_gemstone_new = $obj.data[$key] as TB_gemstone_new;
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_gemstone_new = $obj.data[$key] as TB_gemstone_new;
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static getTbList2(type:number,lv:number): Array<TB_gemstone_new> {
            let list = TB_gemstone_new.getTbList();
            let result = list.filter((vo)=>{
                return (type == 0 || vo.getType() == type) && vo.getLevel() == lv;
            });
            return result;
        }
    }

    export class TB_gemstone_compound {
        public ID: number;
        public obtain: Array<Array<number>>;        // 合成可获得
        public material: Array<Array<number>>;      // 合成材料

        public static getTBOneById(id: number): TB_gemstone_compound {
            let $obj: TB_gemstone_compound = <TB_gemstone_compound>TableData.getInstance().getData(TableData.tb_gemstone_compound, id);
            return $obj;
        }

        private _materialList: ItemVo[];
        getMaterialList(): ItemVo[] {
            if (!this._materialList) {
                this._materialList = [];
                if (this.material) {
                    this.material.forEach((ary: any[]) => {
                        this._materialList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._materialList;
        }

        private _obtainList: ItemVo[];
        getObtainList(): ItemVo[] {
            if (!this._obtainList) {
                this._obtainList = [];
                if (this.obtain) {
                    this.obtain.forEach((ary: any[]) => {
                        this._obtainList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._obtainList;
        }

        public static getTBList($selectkey: string = null, $selectValue: string = null): Array<TB_gemstone_compound> {
            var $arr: Array<TB_gemstone_compound> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_gemstone_compound)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_gemstone_compound = $obj.data[$key] as TB_gemstone_compound;
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_gemstone_compound = $obj.data[$key] as TB_gemstone_compound;
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**运营活动表 */
    export class TB_operate_activity {
        /**ID */
        public ID: number;
        public link: number;
        public desc: string;
        public type: number;
        /**属性 */
        public defined: Array<any>;
        public index: number;
        public time_index: number;
        public way_link: number;
        public reward: Array<Array<number>>;

        //获得time_index对应的活动link
        public static getLinkByIdx(idx: number): number {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_operate_activity)
            for (var $key in $obj.data) {
                var $vo: TB_operate_activity = $obj.data[$key] as TB_operate_activity
                if ($vo && $vo.time_index == idx) {
                    return $vo.link;
                }
            }
            return -1;
        }

        //获得time_index的数组
        public static gettimeIdx(): Array<number> {
            let ary = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_operate_activity)
            for (var $key in $obj.data) {
                var $vo: TB_operate_activity = $obj.data[$key] as TB_operate_activity
                if (ary.indexOf($vo.time_index) == -1) {
                    ary.push($vo.time_index);
                }
            }
            return ary;
        }

        public static get_TB_operate_activityById(id: number): TB_operate_activity {
            let $obj: TB_operate_activity = <TB_operate_activity>TableData.getInstance().getData(TableData.tb_operate_activity, id);
            return $obj;
        }

        public static getChangeTemplate($selectkey: string, $selectValue: string): TB_operate_activity {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_operate_activity);
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_operate_activity = $obj.data[$key] as TB_operate_activity
                        return $vo;
                    }
                }
            }
            return null;
        }

        public static get_TB_operate_activity($selectkey: string = null, $selectValue: string = null): Array<TB_operate_activity> {
            var $arr: Array<TB_operate_activity> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_operate_activity)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_operate_activity = $obj.data[$key] as TB_operate_activity
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_operate_activity = $obj.data[$key] as TB_operate_activity
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_activity_time {
        /**ID */
        public ID: number;
        public type: number;

        public time: Array<number>;
        public special: Array<number>;
        public copy_type: Array<number>;
        public desc: string;

        public static getTabInfo($id: number): string {
            let $obj: TB_activity_time = <TB_activity_time>TableData.getInstance().getData(TableData.tb_activity_time, $id);
            return $obj.desc;
        }
    }

    export class TB_group_buy {
        /**ID */
        public ID: number;
        public desc: string;
        public condition: Array<number>;
        public reward: Array<Array<number>>;

        public static get_TB_group_buy(): Array<TB_group_buy> {
            var $arr: Array<TB_group_buy> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_group_buy)
            for (var $key in $obj.data) {
                var $vo: TB_group_buy = $obj.data[$key] as TB_group_buy
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_model_dialogue {
        /**ID */
        public ID: number;
        public dialogue_id: Array<number>;

        public static getRandomTalk(id): string {
            let $obj: TB_model_dialogue = <TB_model_dialogue>TableData.getInstance().getData(TableData.tb_model_dialogue, id);
            if (!$obj) {
                return '';
            }
            let key = random($obj.dialogue_id.length);
            let linkId = $obj.dialogue_id[key];
            return TB_evaluation.get_TB_evaluationById(linkId).content;
        }
    }

    export class TB_risk {
        /**ID */
        public ID: number;
        public type: number;
        public para: Array<Array<number>>;
        public box_preview: Array<Array<number>>;
        public coordinate: Array<number>;
        public item_coordinate: Array<number>;

        public static getTB_riskById($id: number): TB_risk {
            let $obj: TB_risk = <TB_risk>TableData.getInstance().getData(TableData.tb_risk, $id);
            return $obj;
        }

        public static get_TB_risk($selectkey: string = null, $selectValue: string = null): Array<TB_risk> {
            var $arr: Array<TB_risk> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_risk)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_risk = $obj.data[$key] as TB_risk
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_risk = $obj.data[$key] as TB_risk
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_question {
        /**ID */
        public ID: number;
        public question: string;
        public left_option: string;
        public right_option: string;
        public correct_option: number;
        public correct_reward: Array<Array<number>>;

        public static getTB_questionById($id: number): TB_question {
            let $obj: TB_question = <TB_question>TableData.getInstance().getData(TableData.tb_question, $id);
            return $obj;
        }
    }

    export class TB_recharge_rebate {
        public ID: string;
        public recharge_total: number;

        public static getTBItemById(id: string): TB_recharge_rebate {
            return TableData.getInstance().getData(TableData.tb_recharge_rebate, id) as TB_recharge_rebate;
        }

        public static getTBList(): Array<TB_recharge_rebate> {
            var ary: Array<TB_recharge_rebate> = new Array
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_recharge_rebate)
            for (var key in obj.data) {
                ary.push(obj.data[key])
            }
            return ary
        }
    }

    export class TB_activity_set {
        /**ID */
        public ID: number;
        public level_recharge: number;
        public level_fund_buy: Array<number>;

        /**属性 */
        public share_rewrad: Array<Array<number>>;
        public autonym_rewrad: Array<Array<number>>;
        public model: number;
        public share_cd: number;
        public sign_cycle: number;
        public fight_rank_time: number;
        public fight_rank_endtime: number;
        public group_buy_time: number;
        public micro_download_reward: Array<Array<number>>;
        public super_vip_gift: Array<Array<number>>;
        public phone_bind_reward: Array<Array<number>>;

        public static getTabSet(): TB_activity_set {
            let $obj: TB_activity_set = <TB_activity_set>TableData.getInstance().getData(TableData.tb_activity_set, 1);
            return $obj;
        }

        private _vipGiftList: ItemVo[];
        getVipGiftList(): ItemVo[] {
            if (!this._vipGiftList) {
                this._vipGiftList = [];
                this.super_vip_gift.forEach((ary: any[]) => {
                    this._vipGiftList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._vipGiftList;
        }
    }

    export class TB_risk_set {
        /**ID */
        public ID: number;
        public circle_reward: Array<Array<number>>;
        public once_cost: Array<number>;
        public guess_fist: Array<Array<number>>;
        public guess_size_cost: Array<Array<number>>;
        public guess_size: Array<Array<number>>;


        public static getTabSet(): TB_risk_set {
            let $obj: TB_risk_set = <TB_risk_set>TableData.getInstance().getData(TableData.tb_risk_set, 1);
            return $obj;
        }
    }

    export class TB_fight_rank {
        /**ID */
        public ID: number;
        public rank: Array<number>;

        public reward: Array<Array<number>>;
        public special_reward: Array<Array<number>>;
        public special_desc: string;

        public static getTB_fight_rank(): Array<TB_fight_rank> {
            var $arr: Array<TB_fight_rank> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_fight_rank)
            for (var $key in $obj.data) {
                var $vo: TB_fight_rank = $obj.data[$key] as TB_fight_rank
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_openservice {
        /**ID */
        public ID: number;
        public recharge_num: number;
        public model_show: number;
        public reward: Array<Array<number>>;
        public charge_id: number;
        public model_multiple: number;

        public static getTB_openservice(): Array<TB_openservice> {
            var $arr: Array<TB_openservice> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_openservice)
            for (var $key in $obj.data) {
                var $vo: TB_openservice = $obj.data[$key] as TB_openservice
                $arr.push($vo)
            }
            return $arr
        }

        public static getTB_openserviceByChargeid(id: number): TB_openservice {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_openservice)
            for (var $key in $obj.data) {
                var $vo: TB_openservice = $obj.data[$key] as TB_openservice
                if ($vo.charge_id == id) return $vo;
            }
            return null;

        }
    }

    export class TB_share {
        /**ID */
        public ID: number;
        public share_num: number;
        public reward: Array<Array<number>>;
        public desc: string;
        public type: number;

        public static getTB_share(): Array<TB_share> {
            var $arr: Array<TB_share> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_share)
            for (var $key in $obj.data) {
                var $vo: TB_share = $obj.data[$key] as TB_share
                $arr.push($vo)
            }
            return $arr
        }

        public static getTB_shareById(id: number): TB_share {
            let $obj: TB_share = <TB_share>TableData.getInstance().getData(TableData.tb_share, id);
            return $obj;
        }

    }

    export class TB_online {
        /**ID */
        public ID: number;
        public time: number;
        public reward: Array<number>;

        public static getTB_share(): Array<TB_online> {
            var $arr: Array<TB_online> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_online)
            for (var $key in $obj.data) {
                var $vo: TB_online = $obj.data[$key] as TB_online
                $arr.push($vo)
            }
            return $arr
        }
    }

    /**七日活动表 */
    export class TB_activity_sevendays {
        public ID: number;
        /**期数 */
        public time_type: number;
        /**天数 */
        public day: number;
        /**标签页 */
        public link: number;
        /**描述 */
        public desc: string;
        /**类型 */
        public type: number;
        /**达成值 */
        public value: number;
        /**奖励 */
        public reward: Array<Array<number>>;
        /**自定义参数 */
        public defined: Array<Array<number>>;
        /**跳转链接 */
        public way_link: Array<number>;

        public static get_TB_operate_activityByDay(period: number, day: number): Array<Array<TB_activity_sevendays>> {
            let $obj: any = TableData.getInstance().getTableByName(TableData.tb_activity_sevendays).data
            let $arr: Array<Array<TB_activity_sevendays>> = new Array
            let arr: Array<TB_activity_sevendays> = new Array
            for (let $key in $obj) {
                let vo = $obj[$key];
                if (vo.time_type == period && vo.day == day) {
                    arr.push($obj[$key]);
                }
            }

            for (let i = 1; i < 5; i++) {
                let data = [];
                for (let j in arr) {
                    if (arr[j].link == i) {
                        data.push(arr[j]);
                    }
                }
                $arr.push(data);
            }
            return $arr;
        }

        public static get_TB_operate_activityById(id: number): TB_activity_sevendays {
            let $obj: TB_activity_sevendays = <TB_activity_sevendays>TableData.getInstance().getData(TableData.tb_activity_sevendays, id);
            return $obj;
        }

        public static get_TB_operate_activity($selectkey: string = null, $selectValue: string = null): Array<TB_activity_sevendays> {
            var $arr: Array<TB_activity_sevendays> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_activity_sevendays)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_activity_sevendays = $obj.data[$key] as TB_activity_sevendays
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_activity_sevendays = $obj.data[$key] as TB_activity_sevendays
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /** 限时召唤时间表 */
    export class TB_limit_time {
        public ID: number;
        public type: number;                //时间类型
        public time: Array<string>;                //时间
        public free_num: number;            //每日免费次数
        public buy_cost: Array<number>;     //购买消耗
        public summon: Array<number>;       //召唤id
        public guaranteed_num: number;      //保底次数
        public model_show: number;          //英雄展示id

        public static get_TB_limit_timeById(id: number): TB_limit_time {
            let $obj: TB_limit_time = <TB_limit_time>TableData.getInstance().getData(TableData.tb_limit_time, id);
            return $obj;
        }

        public static get_TB_limit_time($selectkey: string = null, $selectValue: string = null): Array<TB_limit_time> {
            var $arr: Array<TB_limit_time> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_limit_time)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_limit_time = $obj.data[$key] as TB_limit_time
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_limit_time = $obj.data[$key] as TB_limit_time
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /** 限时召唤排行表 */
    export class TB_summon_rank {
        public ID: number;
        public type: number;
        public rank: Array<number>;             //名次
        public reward: Array<Array<number>>;    //奖励
        public score: number;                   //所需积分

        public static get_TB_summon_rankById(id: number): TB_summon_rank {
            let $obj: TB_summon_rank = <TB_summon_rank>TableData.getInstance().getData(TableData.tb_summon_rank, id);
            return $obj;
        }

        public static get_TB_summon_rank($selectkey: string = null, $selectValue: string = null): Array<TB_summon_rank> {
            var $arr: Array<TB_summon_rank> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_summon_rank)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_summon_rank = $obj.data[$key] as TB_summon_rank
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_summon_rank = $obj.data[$key] as TB_summon_rank
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static get_TB_summon_rankByType(type: number): Array<TB_summon_rank> {
            var $arr: Array<TB_summon_rank> = new Array;
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_summon_rank);
            for (var $key in $obj.data) {
                if ($obj.data[$key].type == type) {
                    var $vo: TB_summon_rank = $obj.data[$key] as TB_summon_rank;
                    $arr.push($vo);
                }
            }
            return $arr;
        }

    }

    /** 限时召唤宝箱表 */
    export class TB_summon_box {
        public ID: number;
        public type: number;
        public reward: Array<Array<number>>;        //奖励
        public score: number;                       //所需积分

        public static get_TB_summon_boxById(id: number): TB_summon_box {
            let $obj: TB_summon_box = <TB_summon_box>TableData.getInstance().getData(TableData.tb_summon_box, id);
            return $obj;
        }

        public static get_TB_summon_box($selectkey: string = null, $selectValue: string = null): Array<TB_summon_box> {
            var $arr: Array<TB_summon_box> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_summon_box)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_summon_box = $obj.data[$key] as TB_summon_box
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_summon_box = $obj.data[$key] as TB_summon_box
                    $arr.push($vo)
                }
            }
            return $arr
        }

        public static get_TB_summon_boxByType(type: number): Array<TB_summon_box> {
            var $arr: Array<TB_summon_box> = new Array;
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_summon_box);
            for (var $key in $obj.data) {
                if ($obj.data[$key].type == type) {
                    var $vo: TB_summon_box = $obj.data[$key] as TB_summon_box;
                    $arr.push($vo);
                }
            }
            return $arr;
        }
    }

    /** 限时团购时间表 */
    export class TB_group_buying_time {
        public ID: number;
        public type: number;
        public time: Array<string>;

        public static TB_group_buying_timeById(id: number): TB_group_buying_time {
            let $obj: TB_group_buying_time = <TB_group_buying_time>TableData.getInstance().getData(TableData.tb_group_buying_time, id);
            return $obj;
        }

        public static get_TB_group_buying_time($selectkey: string = null, $selectValue: string = null): Array<TB_group_buying_time> {
            var $arr: Array<TB_group_buying_time> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_group_buying_time)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_group_buying_time = $obj.data[$key] as TB_group_buying_time
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_group_buying_time = $obj.data[$key] as TB_group_buying_time
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /** 限时团购表 */
    export class TB_group_buying {
        public ID: number;
        public type: number;
        public name: string;
        public item: Array<number>;             //道具配置表 [itemID, itemNum]
        public buy_num: number;                 //每日可购买次数
        public price: Array<number>;            //售价
        public total_buy_num: Array<number>;    //团购数目
        public discount_show: Array<number>;    //折扣显示

        public static get_TB_group_buyingById(id: number): TB_group_buying {
            let $obj: TB_group_buying = <TB_group_buying>TableData.getInstance().getData(TableData.tb_group_buying, id);
            return $obj;
        }

        public static get_TB_group_buying($selectkey: string = null, $selectValue: string = null): Array<TB_group_buying> {
            var $arr: Array<TB_group_buying> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_group_buying)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_group_buying = $obj.data[$key] as TB_group_buying
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_group_buying = $obj.data[$key] as TB_group_buying
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    /**神力之门表 */
    export class TB_divinity_door {
        /**ID */
        public ID: number;
        public cost: Array<any>;
        public god_percent: Array<any>;
        public show_god4: Array<any>;
        public show_god5: Array<any>;

        public static get_TB_divinity_doorById(id: number): TB_divinity_door {
            let $obj: TB_divinity_door = <TB_divinity_door>TableData.getInstance().getData(TableData.tb_divinity_door, id);
            return $obj;
        }

        public static get_TB_divinity_door($selectkey: string = null, $selectValue: string = null): Array<TB_divinity_door> {
            var $arr: Array<TB_divinity_door> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_divinity_door)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_divinity_door = $obj.data[$key] as TB_divinity_door
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_divinity_door = $obj.data[$key] as TB_divinity_door
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }

    export class TB_divinity_set {
        /**ID */
        public ID: number;
        public star: Array<number>;

        public static get_TB_divinity_set(): TB_divinity_set {
            let $obj: TB_divinity_set = <TB_divinity_set>TableData.getInstance().getData(TableData.tb_divinity_set, 1);
            return $obj;
        }

    }

    /** 英雄转换 */
    export class TB_divinity_replace {
        /**ID */
        public ID: number;
        /**消耗 */
        public cost: Array<any>;

        public static get_TB_divinity_replaceById(id: number): TB_divinity_replace {
            let $obj: TB_divinity_replace = <TB_divinity_replace>TableData.getInstance().getData(TableData.tb_divinity_replace, id);
            return $obj;
        }
    }

    /**等级基金表 */
    export class TB_level_fund {
        public ID: number;
        public level: number;
        public reward: Array<Array<number>>;

        public static get_TB_get_TB_level_fundById(id: number): TB_level_fund {
            let $obj: TB_level_fund = <TB_level_fund>TableData.getInstance().getData(TableData.tb_level_fund, id);
            return $obj;
        }

        public static get_TB_level_fund($selectkey: string = null, $selectValue: string = null): Array<TB_level_fund> {
            var $arr: Array<TB_level_fund> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_level_fund)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_level_fund = $obj.data[$key] as TB_level_fund
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_level_fund = $obj.data[$key] as TB_level_fund
                    $arr.push($vo)
                }
            }

            let arr = [];
            for (let i = 0; i < $arr.length;) {
                if (App.hero.welfare.levelFundAward[$arr[i].ID]) {
                    arr.push($arr[i]);
                    $arr.splice(Number(i), 1);
                } else {
                    i++
                }
            }
            return $arr.concat(arr);
        }
    }

    export class TB_sevendays_reward {
        public ID: number;
        public type: number;
        public need_num: number;
        public reward: Array<Array<number>>;

        public static get_TB_get_TB_level_fundById(id: number): TB_sevendays_reward {
            let $obj: TB_sevendays_reward = <TB_sevendays_reward>TableData.getInstance().getData(TableData.tb_sevendays_reward, id);
            return $obj;
        }

        public static get_TB_sevendays_reward($selectkey: string = null, $selectValue: string = null): Array<TB_sevendays_reward> {
            var $arr: Array<TB_sevendays_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_sevendays_reward)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_sevendays_reward = $obj.data[$key] as TB_sevendays_reward
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_sevendays_reward = $obj.data[$key] as TB_sevendays_reward
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    /**神器 */
    export class TB_artifact {
        public ID: number;
        public icon: number;
        public name: string;
        public desc: string;
        public model: number;
        public copy_id: number;
        public location: Array<number>;
        public cost: Array<Array<number>>;
        public _constitems: Array<tb.TB_item>;

        public getConstItems(): Array<tb.TB_item> {
            this._constitems = this.cost.map(element => {
                let item = tb.TB_item.get_TB_itemById(element[0]);
                return item
            });
            return this._constitems;
        }

        public static get_TB_artifactById(id: number): TB_artifact {
            let $obj: TB_artifact = <TB_artifact>TableData.getInstance().getData(TableData.tb_artifact, id);
            return $obj;
        }

        public static get_TB_artifact($selectkey: string = null, $selectValue: string = null): Array<TB_artifact> {
            var $arr: Array<TB_artifact> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_artifact = $obj.data[$key] as TB_artifact
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_artifact = $obj.data[$key] as TB_artifact
                    $arr.push($vo)
                }
            }

            return $arr;
        }

        private static ItemToArtifacts: any;
        public static getArtifactByItemId(itemid: number): tb.TB_artifact {
            if (!this.ItemToArtifacts) {
                this.ItemToArtifacts = {}
                var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact)
                for (var $key in $obj.data) {
                    let temp: tb.TB_artifact = $obj.data[$key];
                    if (temp) {
                        for (let i: number = 0; i < temp.cost.length; i++) {
                            let iteminfo: number[] = temp.cost[i];
                            this.ItemToArtifacts[iteminfo[0]] = temp;
                        }
                    }
                }
            }

            return this.ItemToArtifacts[itemid];
        }
    }

    /**神器强化 */
    export class TB_artifact_strength {
        public ID: number;
        public cost: Array<Array<number>>;
        public recycle: Array<Array<number>>;
        public strength_attr: Array<Array<number>>;

        public static get_TB_artifact_strengthById(id: number): TB_artifact_strength {
            let $obj: TB_artifact_strength = <TB_artifact_strength>TableData.getInstance().getData(TableData.tb_artifact_strength, id);
            return $obj;
        }

        private _attrObj: any;
        public getAttr(): any {
            if (!this._attrObj) {
                this._attrObj = {};
                if (this.strength_attr) {
                    for (let ary of this.strength_attr) {
                        this._attrObj[ary[0]] = ary[1];
                    }
                }
            }
            return this._attrObj;
        }

        public static get_TB_artifact_strength($selectkey: string = null, $selectValue: string = null): Array<TB_artifact_strength> {
            var $arr: Array<TB_artifact_strength> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact_strength)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_artifact_strength = $obj.data[$key] as TB_artifact_strength
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_artifact_strength = $obj.data[$key] as TB_artifact_strength
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    /**神器技能 */
    export class TB_artifact_skill {
        public ID: number;
        // public buff: number;
        public skill: number;
        public next: Array<string>;

        public static get_TB_artifact_skillById(id: number): TB_artifact_skill {
            let $obj: TB_artifact_skill = <TB_artifact_skill>TableData.getInstance().getData(TableData.tb_artifact_skill, id);
            return $obj;
        }

        public static get_TB_artifact_skills(ArtifactId: number = null): Array<TB_artifact_skill> {
            var $arr: Array<TB_artifact_skill> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact_skill)
            for (var $key in $obj.data) {
                if (ArtifactId != null) {
                    if (Number($obj.data[$key].ID.toString().substring(0, 1)) == ArtifactId) {
                        var $vo: TB_artifact_skill = $obj.data[$key] as TB_artifact_skill
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_artifact_skill = $obj.data[$key] as TB_artifact_skill
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_artifact_skillcost {
        public ID: number;
        public need_level: number;
        public cost: Array<Array<number>>;

        public static get_TB_artifact_skillcostById(id: number): TB_artifact_skillcost {
            let $obj: TB_artifact_skillcost = <TB_artifact_skillcost>TableData.getInstance().getData(TableData.tb_artifact_skillcost, id);
            return $obj;
        }
    }

    /**神器洗练 */
    export class TB_artifact_baptize {
        public ID: number;
        public exp: number;
        public attr: Array<Array<number>>;

        public static get_TB_artifact_baptizeById(id: number): TB_artifact_baptize {
            let $obj: TB_artifact_baptize = <TB_artifact_baptize>TableData.getInstance().getData(TableData.tb_artifact_baptize, id);
            return $obj;
        }

        public static get_TB_artifact_baptize($selectkey: string = null, $selectValue: string = null): Array<TB_artifact_baptize> {
            var $arr: Array<TB_artifact_baptize> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact_baptize)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_artifact_baptize = $obj.data[$key] as TB_artifact_baptize
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_artifact_baptize = $obj.data[$key] as TB_artifact_baptize
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    /** 洗练品质 */
    export class TB_baptize {
        public ID: number;
        public attr: Array<Array<number>>;

        /**是否在本属性范围之内 */
        public isOnScope(value: Array<number>): boolean {
            return this.attr.some(vo => vo[0] == value[0] && vo[1] == value[1] && vo[2] <= value[2] && vo[3] >= value[2]);
        }

        /**是否是最大值 */
        public isMaxAttr(v): boolean {
            return v[3] == 0 && this.attr.some(vo => vo[3] == v[2]);
        }

        public static get_TB_baptizeById(id: number): TB_baptize {
            let $obj: TB_baptize = <TB_baptize>TableData.getInstance().getData(TableData.tb_baptize, id);
            return $obj;
        }

        public static get_TB_baptize($selectValue: number = null): Array<TB_baptize> {
            var $arr: Array<TB_baptize> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_baptize)
            for (var $key in $obj.data) {
                if ($selectValue != null) {
                    if ($obj.data[$key].attr[1] == $selectValue) {
                        var $vo: TB_baptize = $obj.data[$key] as TB_baptize
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_baptize = $obj.data[$key] as TB_baptize
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    /** 神器附魔 */
    export class TB_artifact_enchant {
        public ID: number;
        public buff: number;
        public plan: number;
        public num: Array<number>;
        public cost: Array<number>;
        public success_odds: number;
        public odds_show: Array<number>;
        /**附魔基础属性 */
        public enchant_basic: Array<Array<number>>;
        /**升阶临时属性 */
        public temporary_attr: Array<Array<number>>;
        /**附魔特殊属性 */
        public enchant_special: Array<Array<number>>;

        /**当前概率释义 */
        public getOddStrByOdds(odd: number): string {
            if (odd < this.odds_show[0]) return `低`;
            else if (odd > this.odds_show[1]) return `高`;
            else return `一般`;
        }

        public static get_TB_artifact_enchantById(id: number): TB_artifact_enchant {
            let $obj: TB_artifact_enchant = <TB_artifact_enchant>TableData.getInstance().getData(TableData.tb_artifact_enchant, id);
            return $obj;
        }
    }

    /**神器收集 */
    export class TB_artifact_obtain {
        /**神器收集数量 */
        ID: number;
        /**属性加成 */
        attr: number[][];

        static get_TB_artifact_obtainById(id: number): TB_artifact_obtain {
            let $obj: TB_artifact_obtain = <TB_artifact_obtain>TableData.getInstance().getData(TableData.tb_artifact_obtain, id);
            return $obj;
        }

        static get_TB_artifact_obtain($selectkey: string = null, $selectValue: string = null): Array<TB_artifact_obtain> {
            var $arr: Array<TB_artifact_obtain> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact_obtain)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_artifact_obtain = $obj.data[$key] as TB_artifact_obtain
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_artifact_obtain = $obj.data[$key] as TB_artifact_obtain
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    /**神器set */
    export class TB_artifact_set {
        public ID: number;
        /**怒气 */
        public anger: Array<number>;
        /**洗练固定条数 */
        public baptize_num: number;
        /**附魔增加进度 */
        public enchant_plan: number;
        /**技能最大等级 */
        public max_skill_level: number;
        /**洗练增加经验 */
        public baptize_exp: Array<number>;
        /**强化最大等级 */
        public max_strength_level: number;
        /**锁定洗练属性消耗 */
        public lock_cost: Array<Array<number>>;
        /**重铸消耗 */
        public recast_cost: Array<Array<number>>;
        /**稀有洗练消耗 */
        public rare_baptize: Array<Array<number>>;
        /**普通洗练消耗 */
        public general_baptize: Array<Array<number>>;
        /**神器标签解锁条件 */
        public artifact_unlock: Array<number>;

        public static get_TB_artifact_setById(id: number = 1): TB_artifact_set {
            let $obj: TB_artifact_set = <TB_artifact_set>TableData.getInstance().getData(TableData.tb_artifact_set, id);
            return $obj;
        }

        public static get_TB_artifact_set($selectkey: string = null, $selectValue: string = null): Array<TB_artifact_set> {
            var $arr: Array<TB_artifact_set> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_artifact_set)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_artifact_set = $obj.data[$key] as TB_artifact_set
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_artifact_set = $obj.data[$key] as TB_artifact_set
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    /**推荐阵容 */
    export class TB_recommend_squad {
        public ID: number;
        public god: Array<any>;
        public location: string;
        public desc: string;

        public static get_TB_recommend_squadById(id: number = 1): TB_recommend_squad {
            let $obj: TB_recommend_squad = <TB_recommend_squad>TableData.getInstance().getData(TableData.tb_recommend_squad, id);
            return $obj;
        }

        public static get_TB_recommend_squad($selectkey: string = null, $selectValue: string = null): Array<TB_recommend_squad> {
            var $arr: Array<TB_recommend_squad> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_recommend_squad)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_recommend_squad = $obj.data[$key] as TB_recommend_squad
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_recommend_squad = $obj.data[$key] as TB_recommend_squad
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_dan {
        public ID: number;
        public name: string;
        public total_score: number;
        public win_score: number;
        public min_score: number;
        public box: Array<Array<number>>;
        public result: Array<Array<number>>;

        public static get_TB_danById(id: number = 1): TB_dan {
            let $obj: TB_dan = <TB_dan>TableData.getInstance().getData(TableData.tb_dan, id);
            return $obj;
        }

        public static get_TB_dan($selectkey: string = null, $selectValue: string = null): Array<TB_dan> {
            var $arr: Array<TB_dan> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_dan)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_dan = $obj.data[$key] as TB_dan
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_dan = $obj.data[$key] as TB_dan
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_artifact {
        public ID: number;
        public type: number;
        public name: string;
        public notice: number;
        public weight: number;
        public min_num: number;
        public location: number;
        public count_type: number;
        public server_num: number;
        public item: Array<number>;
        public openservice_weight: number;

        public static get_TB_luck_artifactById(id: number = 1): TB_luck_artifact {
            let $obj: TB_luck_artifact = <TB_luck_artifact>TableData.getInstance().getData(TableData.tb_luck_artifact, id);
            return $obj;
        }

        public static get_TB_luck_artifact($selectkey: string = 'type', $selectValue: string = App.hero.welfare.luckArtId): Array<TB_luck_artifact> {
            var $arr: Array<TB_luck_artifact> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_artifact)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_artifact = $obj.data[$key] as TB_luck_artifact
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_artifact = $obj.data[$key] as TB_luck_artifact
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_artifact_time {
        public ID: number;
        public type: number;
        public free_num: number;
        public time: Array<number>;
        public buy_cost: Array<number>;
        public reward_show: Array<Array<number>>;

        public static get_TB_luck_artifact_timeById(id: number = App.hero.welfare.luckArtId): TB_luck_artifact_time {
            let $obj: TB_luck_artifact_time = <TB_luck_artifact_time>TableData.getInstance().getData(TableData.tb_luck_artifact_time, id);
            return $obj;
        }

        public static get_TB_luck_artifact_time($selectkey: string = null, $selectValue: string = null): Array<TB_luck_artifact_time> {
            var $arr: Array<TB_luck_artifact_time> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_artifact_time)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_artifact_time = $obj.data[$key] as TB_luck_artifact_time
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_artifact_time = $obj.data[$key] as TB_luck_artifact_time
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_god {
        public ID: number;
        public type: number;
        public name: string;
        public weight: number;
        public min_num: number;
        public location: number;
        public is_record: number;
        public notice_id: number;
        public count_type: number;
        public server_num: number;
        public item: Array<number>;
        public openservice_weight: number;
        public is_show_effect: number;

        public static get_TB_luck_godById(id: number = 1): TB_luck_god {
            let $obj: TB_luck_god = <TB_luck_god>TableData.getInstance().getData(TableData.tb_luck_god, id);
            return $obj;
        }

        public static get_TB_luck_god($selectkey: string = 'type', $selectValue: string = App.hero.welfare.luckGodId): Array<TB_luck_god> {
            var $arr: Array<TB_luck_god> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_god)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_god = $obj.data[$key] as TB_luck_god
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_god = $obj.data[$key] as TB_luck_god
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_god_time {
        public ID: number;
        public type: number;
        public free_num: number;
        public time: Array<number>;
        public buy_cost: Array<number>;
        public luck_reward: Array<number>;

        public static get_TB_luck_god_timeById(id: number = App.hero.welfare.luckGodId): TB_luck_god_time {
            let $obj: TB_luck_god_time = <TB_luck_god_time>TableData.getInstance().getData(TableData.tb_luck_god_time, id);
            return $obj;
        }

        public static get_TB_luck_god_time($selectkey: string = null, $selectValue: string = null): Array<TB_luck_god_time> {
            var $arr: Array<TB_luck_god_time> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_god_time)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_god_time = $obj.data[$key] as TB_luck_god_time
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_god_time = $obj.data[$key] as TB_luck_god_time
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_equip {
        public ID: number;
        public type: number;
        public name: string;
        public weight: number;
        public min_num: number;
        public location: number;
        public notice_id: number;
        public count_type: number;
        public server_num: number;
        public item: Array<number>;
        public openservice_weight: number;
        public is_show_effect: number;

        public static get_TB_luck_equipById(id: number = 1): TB_luck_equip {
            let $obj: TB_luck_equip = <TB_luck_equip>TableData.getInstance().getData(TableData.tb_luck_equip, id);
            return $obj;
        }

        public static get_TB_luck_equip($selectkey: string = 'type', $selectValue: string = App.hero.welfare.luckEquipId): Array<TB_luck_equip> {
            var $arr: Array<TB_luck_equip> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_equip)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_equip = $obj.data[$key] as TB_luck_equip
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_equip = $obj.data[$key] as TB_luck_equip
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_equip_time {
        public ID: number;
        public type: number;
        public free_num: number;
        public time: Array<number>;
        public buy_cost: Array<number>;

        public static get_TB_luck_equip_timeById(id: number = App.hero.welfare.luckEquipId): TB_luck_equip_time {
            let $obj: TB_luck_equip_time = <TB_luck_equip_time>TableData.getInstance().getData(TableData.tb_luck_equip_time, id);
            return $obj;
        }

        public static get_TB_luck_equip_time($selectkey: string = null, $selectValue: string = null): Array<TB_luck_equip_time> {
            var $arr: Array<TB_luck_equip_time> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_equip_time)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_equip_time = $obj.data[$key] as TB_luck_equip_time
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_equip_time = $obj.data[$key] as TB_luck_equip_time
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_treasure {
        public ID: number;
        public type: number;
        public name: string;
        public weight: number;
        public min_num: number;
        public location: number;
        public notice: number;
        public count_type: number;
        public server_num: number;
        public item: Array<number>;
        public openservice_weight: number;
        public is_show_effect: number;

        public static getTempById(id: number): TB_luck_treasure {
            let $obj: TB_luck_treasure = <TB_luck_treasure>TableData.getInstance().getData(TableData.tb_luck_treasure, id);
            return $obj;
        }

        public static get_TB_luck_Treasure($selectkey: string = 'type', $selectValue: string): Array<TB_luck_treasure> {
            var $arr: Array<TB_luck_treasure> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_treasure)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_treasure = $obj.data[$key] as TB_luck_treasure
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_treasure = $obj.data[$key] as TB_luck_treasure
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_treasure_time {
        public ID: number;
        public type: number;
        public free_num: number;
        public time: Array<number>;
        public buy_cost: Array<number>;
        public luck_value: number;
        public luck_reward: Array<number>;
        public openservice_time: number;

        public static getTempById(id: number): TB_luck_treasure_time {
            let $obj: TB_luck_treasure_time = <TB_luck_treasure_time>TableData.getInstance().getData(TableData.tb_luck_treasure_time, id);
            return $obj;
        }
    }

    export class TB_recharge_sign {
        public ID: number;
        public type: number;
        public lucky: number;
        public vip_level: number;
        public recharge_num: number;
        public reward: Array<Array<number>>;
        public vip_reward: Array<Array<number>>;
        public recharge_reward: Array<Array<number>>;

        public static get_TB_recharge_signById(id: number): TB_recharge_sign {
            let $obj: TB_recharge_sign = <TB_recharge_sign>TableData.getInstance().getData(TableData.tb_recharge_sign, id);
            return $obj;
        }

        public static get_TB_recharge_sign($selectkey: string = null, $selectValue: string = null): Array<TB_recharge_sign> {
            var $arr: Array<TB_recharge_sign> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_recharge_sign)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_recharge_sign = $obj.data[$key] as TB_recharge_sign
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_recharge_sign = $obj.data[$key] as TB_recharge_sign
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_luck_equip_reward {
        public ID: number;
        public type: number;
        public lucky: number;
        public reward: Array<Array<number>>;

        public static get_TB_luck_equip_rewardById(id: number = 1): TB_luck_equip_reward {
            let $obj: TB_luck_equip_reward = <TB_luck_equip_reward>TableData.getInstance().getData(TableData.tb_luck_equip_reward, id);
            return $obj;
        }

        public static get_TB_luck_equip_reward($selectkey: string = `type`, $selectValue: string = App.hero.welfare.luckEquipId): Array<TB_luck_equip_reward> {
            var $arr: Array<TB_luck_equip_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_luck_equip_reward)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_luck_equip_reward = $obj.data[$key] as TB_luck_equip_reward
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_luck_equip_reward = $obj.data[$key] as TB_luck_equip_reward
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_guild_season {
        public ID: number;
        public desc: string;
        public dan: number;
        public rank: Array<number>;
        public season_reward: Array<Array<number>>;

        public static get_TB_guild_seasonById(id: number = 1): TB_guild_season {
            let $obj: TB_guild_season = <TB_guild_season>TableData.getInstance().getData(TableData.tb_guild_season, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.season_reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }

        public static get_TB_guild_season($selectkey: string = null, $selectValue: string = null): Array<TB_guild_season> {
            var $arr: Array<TB_guild_season> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_guild_season)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_guild_season = $obj.data[$key] as TB_guild_season
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_guild_season = $obj.data[$key] as TB_guild_season
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_person_season implements inface.IAwardRankData {
        public ID: number;
        public desc: string;
        public rank: Array<number>;
        public season_reward: Array<Array<number>>;

        public static get_TB_person_seasonById(id: number = 1): TB_person_season {
            let $obj: TB_person_season = <TB_person_season>TableData.getInstance().getData(TableData.tb_person_season, id);
            return $obj;
        }

        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.season_reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }


        getRank(): number {
            return undefined;
        }
        private _rankStr: string;
        getRankStr(): string {
            if (!this._rankStr) {
                this._rankStr = this.rank[0] == this.rank[1] ? `${this.rank[0]}` : `${this.rank[0]}-${this.rank[1]}`;
            }
            return this._rankStr;
        }
        getRankSkin(): string {
            let rank = Number(this.rank[0]);
            return rank <= 3 ? SkinUtil.getRankingSkin(rank) : "";
        }

        public static get_TB_person_season($selectkey: string = null, $selectValue: any = null): Array<TB_person_season> {
            var $arr: Array<TB_person_season> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_person_season)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        var $vo: TB_person_season = $obj.data[$key] as TB_person_season
                        $arr.push($vo)
                    }
                } else {
                    var $vo: TB_person_season = $obj.data[$key] as TB_person_season
                    $arr.push($vo)
                }
            }

            return $arr;
        }
    }

    export class TB_guild_war_set {
        public ID: number;
        public guild_count: number;     // 开启公会战所需公会数量
        public role_level: number;      // 公会玩家最低多少级才可参与
        public life_num: number;        // 每个玩家的生命数
        public atk_num: number;         // 每个玩家的进攻次数
        public team_num: number;        // 公会小组人数
        public guild_player_num: number;   // 公会最低人数
        public star_time: number;       // 开始时间
        public end_time: number;        // 结束时间
        public scene: number;

        public static getSet(id: number = 1): TB_guild_war_set {
            let $obj: TB_guild_war_set = <TB_guild_war_set>TableData.getInstance().getData(TableData.tb_guild_war_set, id);
            return $obj;
        }
    }

    export class Tb_version {
        public ID: number;
        public version: string;

        public static get_TB_version_ById(id: number): Tb_version {
            let $obj: Tb_version = <Tb_version>TableData.getInstance().getData(TableData.tb_version, id);
            return $obj;
        }
    }

    export class TB_notice {
        public ID: number;
        public beizhu: string;
        public content: string;
        public location: number;
        public par_state: string;
        public par_click: Array<Array<number>>;

        public static get_TB_notice_ById(id: number): TB_notice {
            let $obj: TB_notice = <TB_notice>TableData.getInstance().getData(TableData.tb_notice, id);
            return $obj;
        }

        /** 获取类型 */
        public getType(index: number): number {
            if (!this.par_click) return -1;
            for (let ary of this.par_click) {
                if (Number(ary[0]) == index) {
                    return Number(ary[1]);
                }
            }
            return -1;
        }

        /** 获取下标 */
        public getIndex(type: number): number {
            if (!this.par_click) return -1;
            for (let ary of this.par_click) {
                if (Number(ary[1]) == type) {
                    return Number(ary[0]);
                }
            }
            return -1;
        }
    }

    /** 交换金币 */
    export class TB_gold_exchange {
        /** 次数 */
        public ID: number;
        /** 所需钻石数 */
        public diamond: number;
        /** 所需金币数 */
        public gold: number;

        /** 通过次数查找所需金币和钻石数据 */
        public static getDataById(id: number): TB_gold_exchange {
            let $obj: TB_gold_exchange = <TB_gold_exchange>TableData.getInstance().getData(TableData.tb_gold_exchange, id) as TB_gold_exchange;
            return $obj;
        }
    }

    /** 交换金币初始数量 */
    export class TB_exchange_set {
        public ID: number;
        /** 交换金币最初次数 */
        public num: number;
        /** 每日免费次数 */
        public daily_free: number;

        /** 最初数据 */
        public static getSet(): TB_exchange_set {
            let $obj: TB_exchange_set = <TB_exchange_set>TableData.getInstance().getData(TableData.tb_exchange_set, 1) as TB_exchange_set;
            return $obj;
        }
    }

    export class TB_map {
        public ID: number;
        public map_id: string;
        public turnstate: number;
        public mlocal_monster: Array<Array<number>>;
        // public formula: Array<number>;
        public longitudinal_scope: Array<number>;
        public transverse_scope: Array<number>;
        public auto_scope: Array<number>;
        public amp: number;
        public mlocal_boss: Array<Array<number>>;
        public mlocal_god: Array<Array<number>>;
        public mskilldot: Array<Array<number>>;
        public mcamera: Array<Array<number>>;
        public blocal_monster: Array<Array<number>>;
        public blocal_god: Array<Array<number>>;
        public bskilldot: Array<Array<number>>;
        public bcamera: Array<Array<number>>;

        public canAutoTurn():boolean{
            return this.auto_scope && this.auto_scope.length > 0;
        }

        public canTurn():boolean{
            return this.turnstate == 1;
        }

        public static get_TB_map_ById(id: number): TB_map {
            let $obj: TB_map = <TB_map>TableData.getInstance().getData(TableData.tb_map, id);
            return $obj;
        }
    }

    export class TB_honour {
        public ID: number
        public type: number;        // 类型
        public name: string;      // 备注
        public rank: number;        // 场次
        public star_time: number[];      // 开始时间 周几、小时、分钟
        public end_time: number[];      // 结束时间 周几、小时、分钟
        public bet_item: any[];     // 押注道具 填空表示无法押注
        public bet_reward: any[];   // 押注奖励
        public mail: number;
        public notice_time: Array<Array<number>>;
        public notice: number;
        public static getItemById(id: number): TB_honour {
            let $obj: TB_honour = <TB_honour>TableData.getInstance().getData(TableData.tb_honour, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                if (this.bet_reward) {
                    this.bet_reward.forEach((ary: any[]) => {
                        this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._rewardList;
        }
        private _itemList: ItemVo[];
        getItemList(): ItemVo[] {
            if (!this._itemList) {
                this._itemList = [];
                if (this.bet_item) {
                    this.bet_item.forEach((ary: any[]) => {
                        this._itemList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                    });
                }
            }
            return this._itemList;
        }

        public getNotice(): string {
            let tbNotice = tb.TB_notice.get_TB_notice_ById(this.notice);
            return tbNotice ? tbNotice.content : "无内容";
        }
    }
    export class TB_honour_reward {
        public ID: number
        public type: number;   // 每场战斗时长间隔
        public name: string;   // 备注
        public rank: number;   // 排名
        public reward: any[];    // 奖励
        public mail: number;
        public notice: number;
        public desc: string;

        public static getItemById(id: number): TB_honour_reward {
            let $obj: TB_honour_reward = <TB_honour_reward>TableData.getInstance().getData(TableData.tb_honour_reward, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }

        public static getHonourRewardList($selectkey: string = null, $selectValue: any = null): Array<TB_honour_reward> {
            var $arr: Array<TB_honour_reward> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_honour_reward)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }
    export class TB_honour_set {
        public ID: number
        public time: number;   // 每场战斗时长间隔
        public apply_startime: number[];   // 报名开始时间
        public apply_endtime: number[];   // 报名结束时间
        public match_interval: number;   // 每轮比赛后多长时间匹配新对手
        public bet_startime: number;   // 押注开始时间
        public bet_endtime: number;    // 押注结束时间
        public min_num: number;    // 比赛开启的最低人数
        public scene: number;
        public round_max: number;

        public static getSet(): TB_honour_set {
            let $obj: TB_honour_set = <TB_honour_set>TableData.getInstance().getData(TableData.tb_honour_set, 1);
            return $obj;
        }
    }

    export class TB_match implements inface.IAwardRankData {
        public ID: number
        public rank: number;   // 排名
        public reward: any[];    // 奖励

        public static getItemById(id: number): TB_match {
            let $obj: TB_match = <TB_match>TableData.getInstance().getData(TableData.tb_match, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
        getRankSkin(): string {
            let rank = Number(this.rank[0]);
            return SkinUtil.getRankingSkin(rank - 1);
        }

        getRank(): number {
            return Number(this.rank[0]) == Number(this.rank[1]) ? Number(this.rank[0]) : 999;
        }
        private _rankStr: string;
        getRankStr(): string {
            if (!this._rankStr) {
                if (this.rank[1] == 99999999) {
                    this._rankStr = `大于${this.rank[0]}`;
                } else {
                    this._rankStr = this.rank[0] == this.rank[1] ? `${this.rank[0]}` : `${this.rank[0]}-${this.rank[1]}`;
                }

            }
            return this._rankStr;
        }

        public static getItemList($selectkey: string = null, $selectValue: any = null): Array<TB_match> {
            var $arr: Array<TB_match> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_match)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }
    export class TB_match_score {
        public ID: number
        public name: string;
        public score: number;       // 所需积分
        public dan_basic: number;  // 段位基数
        public reward: any[];    // 奖励
        public type: number;

        public max_score: number = -1;
        public static getItemById(id: number): TB_match_score {
            let $obj: TB_match_score = <TB_match_score>TableData.getInstance().getData(TableData.tb_match_score, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }

        getRankText(): string {
            return this.max_score == -1 ? ("大于" + this.score) : (this.score + "-" + this.max_score);
        }

        public static getItemList($selectkey: string = null, $selectValue: any = null): Array<TB_match_score> {
            var $arr: Array<TB_match_score> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_match_score)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }
    export class TB_match_box {
        public ID: number
        public need_num: number;
        public reward: any[];    // 奖励
        public box_model: number;

        public static getItemById(id: number): TB_match_box {
            let $obj: TB_match_box = <TB_match_box>TableData.getInstance().getData(TableData.tb_match_box, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
    }

    export class TB_copy_config {
        public ID: number
        public name: string;
        public is_skip: number;
        public is_skipfree: number;
        public skipfree_round: number;
        public level_skip: number;

        public static getSet(id: number): TB_copy_config {
            let $obj: TB_copy_config = <TB_copy_config>TableData.getInstance().getData(TableData.tb_copy_config, id);
            return $obj;
        }
    }

    export class TB_match_set {
        public ID: number
        public initial_score: number;      // 初始积分
        public limit_num: number;          // 次数上限
        public buy_cost: number;           // 购买消耗
        public buy_limit: number;          // 购买次数上限
        public refresh_interval: number;   // 每次刷新间隔
        public map: number;                // 玩家对战地图       
        public round_max: number;          // 回合数
        public win_reward: any[];          // 胜利获得奖励
        public lose_reward: any[];         // 失败获得奖励
        public match_correct: number;      // 匹配修正值
        public match_width: number;        // 匹配宽度值
        public result_para: any[];         // 胜负参数

        public static getSet(): TB_match_set {
            let $obj: TB_match_set = <TB_match_set>TableData.getInstance().getData(TableData.tb_match_set, 1);
            return $obj;
        }
        private _winRewardList: ItemVo[];
        getWinRewardList(): ItemVo[] {
            if (!this._winRewardList) {
                this._winRewardList = [];
                this.win_reward.forEach((ary: any[]) => {
                    this._winRewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._winRewardList;
        }

        private _loserRewardList: ItemVo[];
        getLostRewardList(): ItemVo[] {
            if (!this._loserRewardList) {
                this._loserRewardList = [];
                this.lose_reward.forEach((ary: any[]) => {
                    this._loserRewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._loserRewardList;
        }
    }

    /** 激战神域 */
    export class TB_fight_goddomain {
        public ID: number
        public score: number[];
        public win_score: number;
        public lose_score: number;
        public priority: number;
        public robot_rank: number[];

        public static getItemById(id: number): TB_fight_goddomain {
            let $obj: TB_fight_goddomain = <TB_fight_goddomain>TableData.getInstance().getData(TableData.tb_fight_goddomain, id);
            return $obj;
        }
    }

    export class TB_fight_goddomain_reward implements inface.IAwardRankData {
        public ID: number
        public rank: number[];
        public season_reward: any[];
        public mail: number;

        public static getItemById(id: number): TB_fight_goddomain_reward {
            let $obj: TB_fight_goddomain_reward = <TB_fight_goddomain_reward>TableData.getInstance().getData(TableData.tb_fight_goddomain_reward, id);
            return $obj;
        }
        private _rewardList: ItemVo[];
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.season_reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._rewardList;
        }
        getRank(): number {
            return this.rank[0];
        }
        private _rankStr: string;
        getRankStr(): string {
            if (!this._rankStr) {
                this._rankStr = this.rank[0] == this.rank[1] ? `${this.rank[0]}` : (this.rank[0] > 500 ? `大于500` : `${this.rank[0]}-${this.rank[1]}`);
            }
            return this._rankStr;
        }
        getRankSkin(): string {
            let rank = Number(this.rank[0]);
            return rank <= 3 ? SkinUtil.getRankingSkin(rank - 1) : "";
        }

        public static getItemList($selectkey: string = null, $selectValue: any = null): Array<TB_fight_goddomain_reward> {
            var $arr: Array<TB_fight_goddomain_reward> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_fight_goddomain_reward)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }

    export class TB_fight_goddomain_set {
        public ID: number
        public initial_score: number;       // 初始积分
        public time: number;                // 每场战斗回合数
        public double_time: any[];          // 双倍时间
        public double_prompt: string;       // 不在双倍时间的提示
        public reward_num: number;          // 每日奖励次数
        public buy_num: number;            // 普通玩家可购买次数
        public buy_cost: number[];         // 购买消耗
        public win_reward: any[];          // 挑战胜利奖励
        public win_reward_bonus: any[];    // 挑战胜利奖励额外加成
        public lose_reward: any[];         // 挑战失败奖励
        public lose_reward_bonus: any[];   // 挑战失败奖励加成
        public auto_prepare: number;       // 自动准备时间
        public bekick_cd: number;          // 被踢出队伍后的冷却
        public invite_friend: number;          // 邀请好友cd
        public invite_time: number;        // 邀请玩家的弹窗时间
        public invite_cd: number;          // 一键邀请cd
        public priority_time: number;      // 优先匹配时间
        public team_bonus: number[];       // 组队加成
        public bonus_item: number[];       // 加成针对的道具
        public map: number;

        public static getSet(id: number = 1): TB_fight_goddomain_set {
            let $obj: TB_fight_goddomain_set = <TB_fight_goddomain_set>TableData.getInstance().getData(TableData.tb_fight_goddomain_set, id);
            return $obj;
        }

        private _winReward: ItemVo[];
        getWinReward(): ItemVo[] {
            if (!this._winReward) {
                this._winReward = [];
                this.win_reward.forEach((ary: any[]) => {
                    this._winReward.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
                this.win_reward_bonus.forEach((ary: any[]) => {
                    this._winReward.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._winReward;
        }

        private _loseReward: ItemVo[];
        getLoseReward(): ItemVo[] {
            if (!this._loseReward) {
                this._loseReward = [];
                this.lose_reward.forEach((ary: any[]) => {
                    this._loseReward.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }
            return this._loseReward;
        }
    }

    export class TB_rank_type {
        public ID: number;
        public type: number;//（1.战力排行，2.历练副本排行，3.等级排行，4.试炼塔排行，5.单英雄排行）
        public time_type: number;
        public time: number[];

        public static getSet(id: number = 1): TB_rank_type {
            let $obj: TB_rank_type = <TB_rank_type>TableData.getInstance().getData(TableData.tb_rank_type, id);
            return $obj;
        }

        //神界排行结束时间
        private static _powerRankEndTime: number = 0;
        public static getPowerRanKEndTime(): number {
            // this._powerRankEndTime = 7;
            if (this._powerRankEndTime == 0) {
                let alldata: any = TableData.getInstance().getTableByName(TableData.tb_rank_type).data;
                for (let key in alldata) {
                    if (alldata[key] && alldata[key].time.length >= 2 && alldata[key].time[1] > this._powerRankEndTime) {
                        this._powerRankEndTime = alldata[key].time[1];
                    }
                }
            }
            return this._powerRankEndTime;
        }

        //是否在活动时间内--params:time--开服到现在的时间
        public isActivityTime(time: number): boolean {
            if (this.time.length < 2) return false;

            return (this.time[0] - 1) * TimeConst.ONE_DAY_SEC <= time && time <= this.time[1] * TimeConst.ONE_DAY_SEC;
        }

        //是否显示活动入口按钮--params:time--开服到现在的时间
        public isShowActivityBtn(time: number): boolean {
            if (this.time.length < 2) return false;
            return (this.time[0] - 1) * TimeConst.ONE_DAY_SEC <= time && time <= (this.time[1] + 1) * TimeConst.ONE_DAY_SEC;
        }
    }

    export class TB_growth_guide {
        public ID: number;
        public name: string;
        public icon: number;
        public desc: string;
        public recommend: number;//推荐类型（1.新手入门，2.小子必备，3.土豪必刷）
        public link: number[];
        public rank: number;//排序

        public static getSet(id: number = 1): TB_growth_guide {
            let $obj: TB_growth_guide = <TB_growth_guide>TableData.getInstance().getData(TableData.tb_growth_guide, id);
            return $obj;
        }

        private static _growthGuideList: TB_growth_guide[];
        public static getGrowthGuideList(): TB_growth_guide[] {
            if (!this._growthGuideList) {
                this._growthGuideList = [];
                let alldata: any = TableData.getInstance().getTableByName(TableData.tb_growth_guide).data;
                for (let key in alldata) {
                    if (alldata[key]) {
                        this._growthGuideList.push(alldata[key]);
                    }
                }
                //排序
                this._growthGuideList.sort((a: TB_growth_guide, b: TB_growth_guide) => {
                    return a.rank - b.rank;
                })
            }
            return this._growthGuideList;
        }
    }

    export class TB_rank_reward {
        public ID: number;
        public type: number;//（1.战力排行，2.历练副本排行，3.等级排行，4.试炼塔排行，5.单英雄排行）
        public rank: number[];
        public reward: Array<Array<number>>;
        public score: number;
        public mail: number;
        public special_reward: Array<Array<number>>;
        public special_desc: string;

        public static getSet(id: number = 1): TB_rank_reward {
            let $obj: TB_rank_reward = <TB_rank_reward>TableData.getInstance().getData(TableData.tb_rank_reward, id);
            return $obj;
        }

        private static _typeRewardList: Object;
        public static getRewardListByType(type: number): TB_rank_reward[] {
            if (!this._typeRewardList) {
                this._typeRewardList = new Object();
                let alldata: any = TableData.getInstance().getTableByName(TableData.tb_rank_reward).data;
                for (let key in alldata) {
                    if (alldata[key]) {
                        if (!this._typeRewardList[alldata[key].type]) {
                            this._typeRewardList[alldata[key].type] = new Array<TB_rank_reward>();
                        }
                        this._typeRewardList[alldata[key].type].push(alldata[key]);
                    }
                }

                //排序下
            }
            return this._typeRewardList[type];
        }
    }

    export class TB_function {
        public ID: number;
        public name: string;
        public icon: string;
        public desc: string;
        public system_id: number;

        public static TYPE_LILIAN: number = 100;//历练
        public static TYPE_MAOXIAN: number = 200;//冒险
        public static TYPE_JINGJI: number = 300;//竞技
        public static TYPE_KUAFU: number = 400;//跨服

        public static FUNCTION_REDPOINT: any = {
            101: "dailycopy_group",
            102: "yuanzheng_group",
            103: "escort_group",
            104: "team_group",

            201: "",
            202: "boss_group",
            203: "forest_group",

            301: "jingjichang_group",
            302: "island_group",

            401: "glory_group",
            402: "jjc_match_group",
            403: "godDm_group",
        }

        public static FUNCTION_GROUP_REDPOINT: any = {
            100: ["dailycopy_group", "yuanzheng_group", "escort_group","team_group"],
            200: ["boss_group", "forest_group"],
            300: ["jingjichang_group", "island_group"],
            400: ["jjc_match_group", "glory_group", "godDm_group"],
        }
        
        public static getSysids(funcId:number):number[] {
            switch(funcId){
                case TB_function.TYPE_MAOXIAN:
                    return [ModuleConst.WORLD_BOSS,ModuleConst.FOG_FOREST,ModuleConst.SHILIANTA];
                case TB_function.TYPE_LILIAN:
                    return [ModuleConst.DAILY_COPY,ModuleConst.EXPEDITION,ModuleConst.CARAVAN_ESCORT,ModuleConst.TEAM_COPY];
                case TB_function.TYPE_JINGJI:
                    return [ModuleConst.JINGJI,ModuleConst.Island];
                case TB_function.TYPE_KUAFU:
                    return [ModuleConst.MATCH_FIGHT,ModuleConst.GLORY_FIGHT,ModuleConst.GOD_DOMAIN];
            }
            return [];
        }

        public static getSet(id: number = 1): TB_function {
            let $obj: TB_function = <TB_function>TableData.getInstance().getData(TableData.tb_function, id);
            return $obj;
        }

        private static _functionList: Object;
        public static getFunctionListByType(type: number): TB_function[] {
            if (!this._functionList) {
                this._functionList = new Object();
                let alldata: any = TableData.getInstance().getTableByName(TableData.tb_function).data;
                for (let key in alldata) {
                    if (alldata[key]) {
                        let id: number = alldata[key].ID;
                        let yu: number = id % 100;
                        let type: number = id - yu;
                        if (!this._functionList[type]) {
                            this._functionList[type] = new Array<TB_function>();
                        }
                        if (yu != 0) {
                            this._functionList[type].push(alldata[key]);
                        }
                    }
                }

                //排序下
            }
            return this._functionList[type];
        }
    }

    export class TB_fund {
        public ID: number;
        public recharge_num: number;//充值金额
        public recharge_id: number;
        public openserver_time: number;
        public show_reward: Array<Array<number>>;
        public flash_num: number;

        public static getSet(id: number = 1): TB_fund {
            let $obj: TB_fund = <TB_fund>TableData.getInstance().getData(TableData.tb_fund, id);
            return $obj;
        }

        private static _fundStartTime: number = 0;
        private static _fundEndTime: number = 0;
        private static init(): void {
            let day: number = 0;
            let alldata: any = TableData.getInstance().getTableByName(TableData.tb_fund).data;
            for (let key in alldata) {
                if (alldata[key]) {
                    if (day < alldata[key].openserver_time) {
                        day = alldata[key].openserver_time;
                    }
                }
            }
            this._fundStartTime = App.getOpenServerTime();
            this._fundEndTime = this._fundStartTime + day * 86400;
        }

        //获取基金开始时间
        public static fundStartTime(): number {
            if (this._fundStartTime == 0) {
                this.init();
            }
            return this._fundStartTime;
        }

        //获取基金结束时间
        public static fundEndTime(): number {
            if (this._fundEndTime == 0) {
                this.init();
            }
            return this._fundEndTime;
        }
    }

    export class TB_fund_reward {
        public static FUND_TYPE_128: number = 1;
        public static FUND_TYPE_228: number = 2;


        public ID: number;
        public type: number;//1:128档  2：228档
        public value: number;
        public reward: Array<Array<number>>;

        public static getSet(id: number = 1): TB_fund_reward {
            let $obj: TB_fund_reward = <TB_fund_reward>TableData.getInstance().getData(TableData.tb_fund_reward, id);
            return $obj;
        }

        private static _fundList: Object;
        public static getFundListByType(type: number): TB_fund_reward[] {
            if (!this._fundList) {
                this._fundList = new Object();
                let alldata: any = TableData.getInstance().getTableByName(TableData.tb_fund_reward).data;
                for (let key in alldata) {
                    if (alldata[key]) {
                        let type: number = alldata[key].type;
                        if (!this._fundList[type]) {
                            this._fundList[type] = new Array<TB_fund_reward>();
                        }
                        this._fundList[type].push(alldata[key]);
                    }
                }

                //排序下
            }
            return this._fundList[type];
        }
    }

    export class TB_openservice_gift {
        public ID: number;
        public time_index: number;
        public reward: Array<Array<number>>;
        public recharge_num: number;
        public charge_id: number;
        public num: number;//可领取次数

        public static getSet(id: number = 1): TB_openservice_gift {
            let $obj: TB_openservice_gift = <TB_openservice_gift>TableData.getInstance().getData(TableData.tb_openservice_gift, id);
            return $obj;
        }


    }

    export class TB_gift_time {
        public ID: number;
        public type: number;
        public time: Array<number>;

        public static getSet(id: number = 1): TB_gift_time {
            let $obj: TB_gift_time = <TB_gift_time>TableData.getInstance().getData(TableData.tb_gift_time, id);
            return $obj;
        }

    }

    /** 快捷语 */
    export class TB_chat_quick {
        public ID: number;
        public desc: string;

        public static getItemById(id: number): TB_chat_quick {
            let $obj: TB_chat_quick = <TB_chat_quick>TableData.getInstance().getData(TableData.tb_chat_quick, id);
            return $obj;
        }

        public static getList($selectkey: string = null, $selectValue: any = null): Array<TB_chat_quick> {
            var $arr: Array<TB_chat_quick> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_chat_quick)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }

    /** 圣物 */
    export class TB_treasure {
        public ID: number;
        public attr: Array<Array<number>>;
        public exp: number;
        public return_exp: number; // 返还经验

        /** 格式:[{固定值对象},{百分比对象}] */
        private _attrAry: any[];
        /** 获取属性 */
        public getAttr(): any[] {
            if (!this._attrAry) {
                this._attrAry = [{}, {}];
                if (this.attr) {
                    for (let ary of this.attr) {
                        if (ary[1] == ValueType.fixed) {
                            this._attrAry[0][ary[0]] = ary[2];
                        } else {
                            this._attrAry[1][ary[0]] = ary[2];
                        }
                    }
                }
            }
            return this._attrAry;
        }
        /** 获取品质 */
        public getQuality(): number {
            return Math.floor(this.ID / 100000);
        }
        /** 获取编号 */
        public getSlot(): number {
            let qlty = this.getQuality();
            let slt = Math.floor((this.ID - qlty * 100000) / 1000);
            return slt;
        }
        /** 获取强化等级 */
        public getStrengthLv(): number {
            let qlty = this.getQuality();
            let slt = this.getSlot();
            return this.ID - qlty * 100000 - 1000 * slt;
        }

        /** 通过品质、编号、等级获取表数据 */
        public static getTbItem(quality: number, pos: number, lv: number): TB_treasure {
            let id = TB_treasure.getTbId(quality, pos, lv);
            return tb.TB_treasure.getItemById(id);
        }

        /**通过品质、编号、等级获取表ID */
        public static getTbId(quality: number, pos: number, lv: number): number {
            return quality * 100000 + pos * 1000 + lv;;
        }

        public static getItemById(id: number): TB_treasure {
            let $obj: TB_treasure = <TB_treasure>TableData.getInstance().getData(TableData.tb_treasure, id);
            return $obj;
        }

        public static getList($selectkey: string = null, $selectValue: any = null): Array<TB_treasure> {
            var $arr: Array<TB_treasure> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_treasure)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
        /** 获取某品质某编号下的所有等级数据列表 */
        public static getList2(quality: number, slot: number): Array<TB_treasure> {
            var arr: Array<TB_treasure> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_treasure)
            for (var key in obj.data) {
                let tbData = obj.data[key] as tb.TB_treasure;
                let qlty = tbData.getQuality();
                let slt = tbData.getSlot();
                if (qlty == quality && slt == slot) {
                    arr.push(obj.data[key]);
                }
            }
            return arr;
        }
    }

    export class TB_treasure_star {
        public ID: number;
        public attr: Array<Array<number>>;
        public star_cost: Array<Array<number>>;

        /** 格式:[{固定值对象},{百分比对象}] */
        private _attrAry: any[];
        /** 获取属性 */
        public getAttr(): any[] {
            if (!this._attrAry) {
                this._attrAry = [{}, {}];
                if (this.attr) {
                    for (let ary of this.attr) {
                        if (ary[1] == ValueType.fixed) {
                            this._attrAry[0][ary[0]] = ary[2];
                        } else {
                            this._attrAry[1][ary[0]] = ary[2];
                        }
                    }
                }
            }
            return this._attrAry;
        }

        /** 升星材料 */
        private _godMaterialList: game.TreasureMaterialTbVo[];
        getMaterialList(): game.TreasureMaterialTbVo[] {
            if (!this._godMaterialList) {
                this._godMaterialList = [];
                if (this.star_cost) {
                    this.star_cost.forEach((ary: any[]) => {
                        this._godMaterialList.push({ type: ary[0], quality: ary[1], itemId: ary[1], starLv: ary[2], count: ary[3] });
                    });
                }
            }
            return this._godMaterialList;
        }
        /** 获取品质 */
        public getQuality(): number {
            return Math.floor(this.ID / 10000);
        }
        /** 获取编号 */
        public getSlot(): number {
            let qlty = this.getQuality();
            let slt = Math.floor((this.ID - qlty * 10000) / 100);
            return slt;
        }
        /** 获取星级 */
        public getStarlv(): number {
            let qlty = this.getQuality();
            let slt = this.getSlot();
            return this.ID - qlty * 10000 - 100 * slt;
        }

        /**通过品质、编号、等级获取表数据 */
        public static getTbItem(quality: number, pos: number, starLv: number): TB_treasure_star {
            let id = TB_treasure_star.getTbId(quality, pos, starLv);
            return tb.TB_treasure_star.getItemById(id);
        }
        /**通过品质、编号、等级获取表ID */
        public static getTbId(quality: number, pos: number, starLv: number): number {
            return quality * 10000 + pos * 100 + starLv;
        }


        /**通过ID获取表数据 */
        public static getItemById(id: number): TB_treasure_star {
            let $obj: TB_treasure_star = <TB_treasure_star>TableData.getInstance().getData(TableData.tb_treasure_star, id);
            return $obj;
        }

        public static getList($selectkey: string = null, $selectValue: any = null): Array<TB_treasure_star> {
            var $arr: Array<TB_treasure_star> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_treasure_star)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
        /** 获取某品质某编号下的所有等级数据列表：排除无属性的项 */
        public static getList2(quality: number, slot: number): Array<TB_treasure_star> {
            var arr: Array<TB_treasure_star> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_treasure_star)
            for (var key in obj.data) {
                let tbData = obj.data[key] as tb.TB_treasure_star;
                let qlty = tbData.getQuality();
                let slt = tbData.getSlot();
                if (tbData.attr && tbData.attr.length > 0 && qlty == quality && slt == slot) {
                    arr.push(obj.data[key]);
                }
            }
            return arr;
        }

    }

    /** 圣物 */
    export class TB_treasure_book {
        public ID: number;
        public rank: number;

        public static getItemById(id: number): TB_treasure_book {
            let $obj: TB_treasure_book = <TB_treasure_book>TableData.getInstance().getData(TableData.tb_treasure_book, id);
            return $obj;
        }

        public static getList($selectkey: string = null, $selectValue: any = null): Array<TB_treasure_book> {
            var $arr: Array<TB_treasure_book> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_treasure_book)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }


    /** 组队副本配置表 */
    export class TB_team_set {
        public ID: number;
        public auto_dissolve: number;
        public team_period: number;
        public team_notice: number;
        public person_first_mail: number;
        public service_first_mail: number;
        public service_first_reward: Array<Array<number>>;
        public map: number;

        public static getTB_team_set(): TB_team_set {
            let $obj: TB_team_set = <TB_team_set>TableData.getInstance().getData(TableData.tb_team_set, 1);
            return $obj;
        }
    }

    export class TB_team_target {
        public ID: number;
        public need_copy: number;
        public desc: string;
        public reward: Array<Array<number>>;

        public static getTB_team_targetById(id): TB_team_target {
            let $obj: TB_team_target = <TB_team_target>TableData.getInstance().getData(TableData.tb_team_target,id);
            return $obj;
        }

        private _rewardItems : ItemVo[];
        public getRewardItems():ItemVo[] {
            if (!this._rewardItems) {
                this._rewardItems = [];
                if(this.reward){
                    this.reward.forEach((ary, index) => {
                        this._rewardItems.push(new ItemVo(ary[0],ary[1]));
                    });
                }
            }
            return this._rewardItems;
        }

        public static getList($selectkey: string = null, $selectValue: any = null): Array<TB_team_target> {
            var $arr: Array<TB_team_target> = [];
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_team_target)
            for (var $key in $obj.data) {
                if ($selectkey != null) {
                    if ($obj.data[$key][$selectkey] == $selectValue) {
                        $arr.push($obj.data[$key])
                    }
                } else {
                    $arr.push($obj.data[$key]);
                }
            }
            return $arr;
        }
    }

    export class TB_team_copy {
        public ID: number;
        public copy: number;
        public monster: Array<number>;
        public monster_show: number;
        public model_multiple: number;
        public reward: Array<Array<number>>;

        public static getTB_team_copyById(id): TB_team_copy {
            let $obj: TB_team_copy = <TB_team_copy>TableData.getInstance().getData(TableData.tb_team_copy,id);
            return $obj;
        }

        private _rewardList:ItemVo[]
        getRewardList(): ItemVo[] {
            if (!this._rewardList) {
                this._rewardList = [];
                this.reward.forEach((ary: any[]) => {
                    this._rewardList.push(new ItemVo(Number(ary[0]), Number(ary[1])));
                });
            }

            for (var key in this._rewardList) {
                //使用isShowEff来代替已领取的数据存储
                this._rewardList[key].extPram = Boolean(game.CopyTeamModel.getInstance().myFloor >= this.ID);
            }
            return this._rewardList;
        }
    }

    export class TB_treasure_set {
        public ID: number;
        public be_devour_quality: number;              // 高于该品质无法被吞噬
        public be_devour_exp: Array<Array<number>>;    //  圣物被吞噬给的经验
        public treasure_exp: Array<Array<number>>;     //  圣物经验石
        public exp_return: number;                     // 强化经验超过返还的道具ID
        public star_quality: number;                   // 低于该品质无法升星
        public recast_cost: Array<Array<number>>;      //  重铸消耗

        public static getSet(id: number = 1): TB_treasure_set {
            let $obj: TB_treasure_set = <TB_treasure_set>TableData.getInstance().getData(TableData.tb_treasure_set, id);
            return $obj;
        }

        /** 获取圣物道具的经验 */
        public getTreasureExp(id: number): number {
            let ary = this.treasure_exp.find((ary) => {
                return ary[0] == id;
            });
            return ary && ary[1] ? ary[1] : 0;
        }

        /** 获取圣物被吞噬的经验 */
        public getQualityExp(quality: number): number {
            let ary = this.be_devour_exp.find((ary) => {
                return ary[0] == quality;
            });
            return ary && ary[1] ? ary[1] : 0;
        }
    }

    export class TB_advance_road {
        public ID: number;
        public name: string;
        public condition: Array<number>;     //  条件
        public reward: Array<Array<number>>;
        public show: string;
        public desc: string;

        public static getSet(id: number = 1): TB_advance_road {
            let $obj: TB_advance_road = <TB_advance_road>TableData.getInstance().getData(TableData.tb_advance_road, id);
            return $obj;
        }

        private _conditionT: TB_advance_condition[];
        public getCondition(): TB_advance_condition[] {
            if (!this._conditionT) {
                this._conditionT = [];
                for (let i: number = 0; i < this.condition.length; i++) {
                    let temp: TB_advance_condition = TB_advance_condition.getSet(this.condition[i]);
                    if (temp) this._conditionT.push(temp);
                }
            }
            return this._conditionT;
        }

        private static _maxLevel: number = -1;
        public static getMaxLevel(): number {
            if (this._maxLevel == -1) {
                this._maxLevel = 0;
                let data = TableData.getInstance().getTableByName(TableData.tb_advance_road).data;
                for (let key in data) {
                    this._maxLevel++;
                }
            }
            return this._maxLevel;
        }
    }

    export class TB_advance_condition {
        public ID: number;
        public name: string;
        public type: number;
        public para: Array<number>;     //  条件
        public num: number;                     // 完成次数
        public reward: Array<Array<number>>;
        public link: any[];           //链接   

        public static getSet(id: number = 1): TB_advance_condition {
            let $obj: TB_advance_condition = <TB_advance_condition>TableData.getInstance().getData(TableData.tb_advance_condition, id);
            return $obj;
        }

        private static ADVANCE_LEVEL: number[];
        public static getAdvanceLevel(id: number): number {
            if (!this.ADVANCE_LEVEL) {
                this.ADVANCE_LEVEL = [];
                let data = TableData.getInstance().getTableByName(TableData.tb_advance_road).data;
                for (let key in data) {
                    let conditions: number[] = data[key].condition;
                    for (let i: number = 0; i < conditions.length; i++) {
                        this.ADVANCE_LEVEL[conditions[i]] = data[key].ID;
                    }
                }
            }

            return this.ADVANCE_LEVEL[id] ? this.ADVANCE_LEVEL[id] : 0;
        }
    }

    export class TB_checkpoint_pass {
        public ID: number;
        public name: string;
        public para: number;     //  条件
        public reward: Array<Array<number>>;
        public effect_num: number;           //闪光数量   
        public desc: string;

        public static getSet(id: number = 1): TB_checkpoint_pass {
            let $obj: TB_checkpoint_pass = <TB_checkpoint_pass>TableData.getInstance().getData(TableData.tb_checkpoint_pass, id);
            return $obj;
        }


        public static getTabByTaskId(id: number = 1): TB_checkpoint_pass {
            let data = TableData.getInstance().getTableByName(TableData.tb_checkpoint_pass).data;
            for (let key in data) {
                let taskid: number = data[key].para;
                if (taskid == id) {
                    return data[key];
                }
            }
            return null;
        }


    }

    export class TB_halo {
        public ID: number;
        public type: number;
        public attr: Array<Array<number>>;
        public desc: string;

        public static getTB(id: number): TB_halo {
            var $obj: any = TableData.getInstance().getData(TableData.tb_halo, id)
            var $vo: TB_halo = $obj as TB_halo
            return $vo;
        }

        private _raceType: number = -1;
        public get raceType(): number {
            if (this._raceType == -1) {
                this._raceType = Math.floor(this.type / TB_halo.TYPE_BASE);
                if (this._raceType < 0) this._raceType = -2;
            }
            return this._raceType;
        }

        private _godNum: number = -1;
        public get godNum(): number {
            if (this._godNum == -1) {
                this._godNum = this.type % TB_halo.TYPE_BASE;
            }
            return this._godNum;
        }

        private _conditionStr: string = "";
        public get conditionStr(): string {
            if (this._conditionStr == "") {
                let idx: number = Math.floor(this.type / TB_halo.TYPE_BASE);
                let needNum: number = this.type % tb.TB_halo.TYPE_BASE;
                if (idx == TB_halo.TYPE_ALL) {
                    this._conditionStr = LanMgr.getLan("所有阵营上阵{0}个", -1, needNum);
                } else {
                    this._conditionStr = LanMgr.getLan("上阵{0}个{1}英雄", -1, needNum, LanMgr.GOD_RACE_NAME[idx]);
                }
            }
            return this._conditionStr;
        }

        public static TYPE_ALL: number = 0;//全能之力
        public static TYPE_NUM: number = 6;//类型数量
        public static TYPE_BASE: number = 100;

        private static _isInit: boolean = false;
        private static _typeList: TB_halo[][];
        private static init(): void {
            if (this._isInit) return;
            this._isInit = true;
            this._typeList = [];
            let data = TableData.getInstance().getTableByName(TableData.tb_halo).data;
            for (let key in data) {
                let type: number = Math.floor(data[key].type / this.TYPE_BASE);
                if (!this._typeList[type]) {
                    this._typeList[type] = [];
                }
                this._typeList[type].push(data[key]);
            }
        }
        //获取全部类型
        public static getAllType(): TB_halo[][] {
            this.init();
            return this._typeList;
        }

        //获取类型
        public static getType(type: number): TB_halo[] {
            this.init();
            return this._typeList[type];
        }
    }

    /** 头像框 */
    export class TB_picture_frame {
        public ID: number;
        public icon: string;
        public desc: string;
        public name: string;
        public activate_condition : number;
        public rank : number;

        public static getItemById(id: number): TB_picture_frame {
            return <TB_picture_frame>TableData.getInstance().getData(TableData.tb_picture_frame, id);
        }

        public static getList(selectkey: string = null, $selectValue: string = null): Array<TB_picture_frame> {
            var arr: Array<TB_picture_frame> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_picture_frame)
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo: TB_picture_frame = obj.data[key] as TB_picture_frame;
                        arr.push(vo);
                    }
                } else {
                    var vo: TB_picture_frame = obj.data[key] as TB_picture_frame;
                    arr.push(vo);
                }
            }
            return arr
        }

        /** 是否锁住了 */
        public isLock():boolean {
            let tbVip = tb.TB_vip_privilege.get_TB_vip_privilegeById(this.activate_condition);
            return tbVip ? App.hero.vip < tbVip.vip_level : false;
        }
    }

    /** 勇者之证期数 */
    export class TB_warrior_cycle {
        public ID: number;
        public time: number;        // 月份 201912
        public recharge_id: number; // 所需充值ID
        public level_up: number;    // 进阶直升等级
        public activate_reward : Array<Array<number>>;      // 进阶直接获得奖励
        public activate_reward_show : Array<Array<number>>; // 进阶激活奖励展示
        public buy_cost : number;   // 购买1级所需钻石
        public item : number;       // 勇者道具
        public function : number;   // 关联功能表ID

        public static getItemById(id: number): TB_warrior_cycle {
            return <TB_warrior_cycle>TableData.getInstance().getData(TableData.tb_warrior_cycle, id);
        }

        /** 获取所有的充值ID */
        public static getAllRecharges(): number[] {
            let ids = []
            let ary = TB_warrior_cycle.getList();
            for (let tbVo of ary) {
                if (tbVo.recharge_id > 0) {
                    ids.push(tbVo.recharge_id);
                }
            }
            return ids;
        }

        public static getList(selectkey: string = null, $selectValue: string = null): Array<TB_warrior_cycle> {
            var arr: Array<TB_warrior_cycle> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_warrior_cycle)
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo: TB_warrior_cycle = obj.data[key] as TB_warrior_cycle;
                        arr.push(vo);
                    }
                } else {
                    var vo: TB_warrior_cycle = obj.data[key] as TB_warrior_cycle;
                    arr.push(vo);
                }
            }
            return arr
        }

        private _rewardItems : ItemVo[];
        /** 进阶直接获得奖励 */
        public getRewardItems():ItemVo[] {
            if (!this._rewardItems) {
                this._rewardItems = [];
                if(this.activate_reward){
                    this.activate_reward.forEach((ary, index) => {
                        this._rewardItems.push(new ItemVo(ary[0],ary[1]));
                    });
                }
            }
            return this._rewardItems;
        }

        private _showItems : ItemVo[];
        /** 进阶激活奖励展示 */
        public getShowItems():ItemVo[] {
            if (!this._showItems) {
                this._showItems = [];
                if(this.activate_reward_show){
                    this.activate_reward_show.forEach((ary, index) => {
                        this._showItems.push(new ItemVo(ary[0],ary[1]));
                    });
                }
            }
            return this._showItems;
        }
    }

    /** 勇者之证等级 */
    export class TB_warrior_prove {
        public ID: number;
        public cycle: number;           // 期数
        public level: number;           // 等级
        public exp: number;             // 升到下一级经验
        public total_exp: number;       // 进阶到当前所需总经验
        public reward : Array<Array<number>>;           // 普通奖励
        public special_reward : Array<Array<number>>;   // 进阶奖励

        public static getItemById(id: number): TB_warrior_prove {
            return <TB_warrior_prove>TableData.getInstance().getData(TableData.tb_warrior_prove, id);
        }
        public static getItemByLv(cycle:number,level: number): TB_warrior_prove {
            let list = TB_warrior_prove.getList();
            return list.find((vo)=>{
                return vo.cycle == cycle && vo.level == level;
            });
        }

        public static getList(selectkey: string = null, $selectValue: string = null): Array<TB_warrior_prove> {
            var arr: Array<TB_warrior_prove> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_warrior_prove)
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo: TB_warrior_prove = obj.data[key] as TB_warrior_prove;
                        arr.push(vo);
                    }
                } else {
                    var vo: TB_warrior_prove = obj.data[key] as TB_warrior_prove;
                    arr.push(vo);
                }
            }
            return arr
        }

        private _rewardItems : ItemVo[];
        /** 普通奖励 */
        public getRewardItems():ItemVo[] {
            if (!this._rewardItems) {
                this._rewardItems = [];
                if(this.reward){
                    this.reward.forEach((ary, index) => {
                        this._rewardItems.push(new ItemVo(ary[0],ary[1]));
                    });
                }
            }
            return this._rewardItems;
        }

        private _specialItems : ItemVo[];
        /** 进阶奖励 */
        public getSpecialItems():ItemVo[] {
            if (!this._specialItems) {
                this._specialItems = [];
                if(this.special_reward){
                    this.special_reward.forEach((ary, index) => {
                        this._specialItems.push(new ItemVo(ary[0],ary[1]));
                    });
                }
            }
            return this._specialItems;
        }
    }

    /** 周试炼任务 */
    export class TB_week_trial {
        public ID: number;
        public cycle: number;           // 期数
        public title: string;           // 标题
        public name: string;            // 条件名称
        public type: number;            // 类型
        public para: number;            // 任务条件
        public num : number;            // 完成次数
        public link : Array<number>;    // 跳转
        public obtain_exp : number;     // 完成获得经验

        public static getItemById(id: number): TB_week_trial {
            return <TB_week_trial>TableData.getInstance().getData(TableData.tb_week_trial, id);
        }

        public static getList(selectkey: string = null, $selectValue: any = null): Array<TB_week_trial> {
            var arr: Array<TB_week_trial> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_week_trial)
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo: TB_week_trial = obj.data[key] as TB_week_trial;
                        arr.push(vo);
                    }
                } else {
                    var vo: TB_week_trial = obj.data[key] as TB_week_trial;
                    arr.push(vo);
                }
            }
            return arr
        }
        
    }

    /** 月试炼任务 */
    export class TB_month_trial {
        public ID: number;
        public cycle: number;           // 期数
        public title: string;           // 标题
        public name: string;            // 条件名称
        public type: number;            // 类型
        public para: number;            // 任务条件
        public num : number;            // 完成次数
        public link : Array<number>;    // 跳转
        public obtain_exp : number;     // 完成获得经验

        public static getItemById(id: number): TB_month_trial {
            return <TB_month_trial>TableData.getInstance().getData(TableData.tb_month_trial, id);
        }

        public static getList(selectkey: string = null, $selectValue: any = null): Array<TB_month_trial> {
            var arr: Array<TB_month_trial> = [];
            var obj: any = TableData.getInstance().getTableByName(TableData.tb_month_trial)
            for (var key in obj.data) {
                if (selectkey != null) {
                    if (obj.data[key][selectkey] == $selectValue) {
                        var vo: TB_month_trial = obj.data[key] as TB_month_trial;
                        arr.push(vo);
                    }
                } else {
                    var vo: TB_month_trial = obj.data[key] as TB_month_trial;
                    arr.push(vo);
                }
            }
            return arr
        }
    }

    /** 勇者之证 */
    export class TB_warrior_set {
        public ID: number
        public warrior_gift: number;    // 勇者经验礼包

        public static getSet(): TB_warrior_set {
            let $obj: TB_warrior_set = <TB_warrior_set>TableData.getInstance().getData(TableData.tb_warrior_set, 1);
            return $obj;
        }
    }

}
class ResTabelVo {
    public name: string;
    public field: Array<string>;
    public typs: Array<string>;
    public data: Object;
    public size: number = 0;
    public maxId: number = 0;
    public constructor() {
    }
    public parseTable($name: string, $typs: string, $field: string, $data: string): void {
        if (!$data) return;
        this.name = $name;
        this.field = [];
        if ($field) {
            this.field = $field.split(",");
        }
        this.typs = [];
        if ($typs) {
            this.typs = $typs.split(",");
        }
        var lines: Array<string> = $data.split(String.fromCharCode(1));

        var tw: number = this.field.length;
        var th: number = lines.length / tw;  //行数
        var id: number = 0;
        this.data = new Object;
        var maxId: number = 0;


        for (var i: number = 0; i < th; i++) {
            //   var $celarr: Array<string> = new Array;
            let cls: any = TableData.mapCls[$name];
            let obj: any = cls ? new cls : new Object; //映射到指定的类或者
            for (var j: number = 0; j < tw; j++) {
                var $str: string = lines[id]
                //      $celarr.push(tempCell);
                switch (this.typs[j]) {
                    case "int":
                    case "float":
                        obj[this.field[j]] = Number($str);
                        break;
                    case "bool":
                        obj[this.field[j]] = $str == "1";
                        break;
                    case "string":
                        obj[this.field[j]] = $str;
                        break;
                    case "array":
                        obj[this.field[j]] = this.parseAry($str);
                        break;
                    case "array2":
                        obj[this.field[j]] = this.parseAry2($str);
                        break;
                    default:
                        obj[this.field[j]] = $str;
                        break;
                }
                id++;
            }
            this.data[obj.ID] = obj;
            if (obj.ID > maxId) {
                maxId = obj.ID;
            }
        }

        this.size = th;
        this.maxId = maxId;

    }

    private parseAry($str: string): Array<any> {
        $str = ($str + "").replace(/，/g, ",");//为了防止策划误填，先进行转换
        $str = $str.trim();
        if ($str === "") return null;
        var tempArr = $str.split(",");
        var arr = [];
        for (var i = 0, li = tempArr.length; i < li; i++) {
            var v = tempArr[i].trim();
            arr.push(!isNaN(Number(v)) ? Number(v) : v);
        }
        if (tempArr.length === 1 && arr[0] == 0) {
            arr = [];
        }
        return arr;

    }

    private parseAry2($str: string) {
        $str = ($str + "").replace(/，/g, ",");//为了防止策划误填，先进行转换
        $str = ($str + "").replace(/},/g, ";").replace(/{/g, "").replace(/}/g, "");
        $str = $str.trim();
        if ($str === "") return null;
        var arr = [];
        var tempArr0 = $str.split(";");
        for (var i = 0, li = tempArr0.length; i < li; ++i) {
            var strI = tempArr0[i].trim();
            if (strI === "") {
                continue;
            }

            // var tempArr1 = strI.split(",");
            // var arr1 = [];
            // for (var j = 0, lj = tempArr1.length; j < lj; j++) {
            //     var v = tempArr1[j].trim();
            //     arr1.push(v);
            // }
            // arr.push(arr1);
            arr.push(this.parseAry(strI));
        }
        // if (tempArr0.length === 1 && arr[0].length === 1 && arr[0][0] == 0) {
        //     arr = [];
        // }
        if (tempArr0.length === 1 && arr[0].length === 0) {
            arr = [];
        }
        return arr;

    }

    public getDataByID($id: number): Object {
        return this.data[$id];
    }




}
class TableData {
    private static _instance: TableData;
    public static getInstance(): TableData {
        if (!this._instance) {
            this._instance = new TableData();
        }
        return this._instance;
    }

    public static tb_hud: string = "tb_hud";
    public static tb_sys_open: string = "tb_sys_open";
    public static tb_role: string = "tb_role";
    public static tb_god: string = "tb_god";
    public static tb_skin: string = "tb_skin";
    public static tb_god_set: string = "tb_god_set";
    public static tb_god_employ_set: string = "tb_god_employ_set";
    public static tb_awaken_conditions: string = "tb_awaken_conditions";
    public static tb_god_awaken: string = "tb_god_awaken";
    public static tb_star_title: string = "tb_star_title";
    public static tb_msgCode: string = "tb_msgCode";
    public static tb_game_set: string = "tb_game_set";
    public static tb_skill: string = "tb_skill";
    public static tb_skill_desc: string = "tb_skill_desc";
    public static tb_sub_skill: string = "tb_sub_skill";
    public static tb_skill_replace: string = "tb_skill_replace";
    public static tb_effect: string = "tb_effect";
    public static tb_buff: string = "tb_buff";
    public static tb_skill_effect: string = "tb_skill_effect";
    public static tb_buff_effect: string = "tb_buff_effect";
    public static tb_copy: string = "tb_copy";
    public static tb_copy_info: string = "tb_copy_info";
    public static tb_plot: string = "tb_plot";
    public static tb_daily_copy: string = "tb_daily_copy";
    public static tb_expedition: string = "tb_expedition";
    public static tb_copy_set: string = "tb_copy_set";
    public static tb_item: string = "tb_item";
    public static tb_monster: string = "tb_monster";
    public static tb_god_evolution: string = "tb_god_evolution";
    public static tb_god_star: string = "tb_god_star";
    public static tb_wish: string = "tb_wish";
    public static tb_wish_set: string = "tb_wish_set";
    public static tb_task: string = "tb_task";
    public static tb_task_title: string = "tb_task_title";
    public static tb_daily: string = "tb_daily";
    public static tb_daily_reward: string = "tb_daily_reward";
    public static tb_market: string = "tb_market";
    public static tb_market_set: string = "tb_market_set";
    public static tb_god_level: string = "tb_god_level";
    public static tb_god_resolve: string = "tb_god_resolve";
    public static tb_god_fate: string = "tb_god_fate";
    public static tb_fusion_soul: string = "tb_fusion_soul";
    public static tb_evaluation: string = "tb_evaluation";
    public static tb_random_name: string = "tb_random_name";
    public static tb_rune_suit: string = "tb_rune_suit";
    public static tb_rune: string = "tb_rune";
    public static tb_rune_prefix: string = "tb_rune_prefix";
    public static tb_rune_strength: string = "tb_rune_strength";
    public static tb_rune_set: string = "tb_rune_set";
    public static tb_arena_npc: string = "tb_arena_npc";
    public static tb_rank_score: string = "tb_rank_score";
    public static tb_arena_rank: string = "tb_arena_rank";
    // public static tb_arena_set: string = "tb_arena_set";
    public static tb_goods: string = "tb_goods";
    public static tb_trial: string = "tb_trial";
    public static tb_guild: string = "tb_guild";
    public static tb_guild_icon: string = "tb_guild_icon";
    public static tb_guild_skill: string = "tb_guild_skill";
    public static tb_guild_sign: string = "tb_guild_sign";
    public static tb_guild_set: string = "tb_guild_set";
    public static tb_guild_donate: string = "tb_guild_donate";
    public static tb_guild_copy: string = "tb_guild_copy";
    public static tb_guild_help: string = "tb_guild_help";
    public static tb_copy_reward: string = "tb_copy_reward";
    public static tb_exchange: string = "tb_exchange";
    public static tb_first_recharge: string = "tb_first_recharge";
    public static tb_level: string = "tb_level";
    public static tb_day_sign: string = "tb_day_sign";
    public static tb_total_sign: string = "tb_total_sign";
    public static tb_sevendays: string = "tb_sevendays";
    public static tb_sevendays_time: string = "tb_sevendays_time";
    public static tb_arena_new: string = "tb_arena_new";
    public static tb_arena_new_npc: string = "tb_arena_new_npc";
    public static tb_arena_draw: string = "tb_arena_draw";
    public static tb_arena_new_set: string = "tb_arena_new_set";
    public static tb_recharge: string = "tb_recharge";
    public static tb_vip: string = "tb_vip";
    public static tb_month_card: string = "tb_month_card";
    public static tb_vip_privilege: string = "tb_vip_privilege";
    public static tb_vip_desc: string = "tb_vip_desc";
    public static tb_escort_set: string = "tb_escort_set";
    public static tb_escort: string = "tb_escort";
    public static tb_adventure: string = "tb_adventure";
    public static tb_adventure_set: string = "tb_adventure_set";
    public static tb_forest: string = "tb_forest";
    public static tb_forest_set: string = "tb_forest_set";
    public static tb_island_set: string = "tb_island_set";
    public static tb_island_level: string = "tb_island_level";
    public static tb_island: string = "tb_island";
    public static tb_worldboss: string = "tb_worldboss";
    public static tb_boss_set: string = "tb_boss_set";
    public static tb_mail: string = "tb_mail";
    public static tb_equip_strength = "tb_equip_strength";
    public static tb_strength_suit = "tb_strength_suit";
    public static tb_refine_suit = "tb_refine_suit";
    public static tb_equip_suit = "tb_equip_suit";
    public static tb_equip_refine = "tb_equip_refine";
    public static tb_equip_recycle = "tb_equip_recycle";
    public static tb_equip_set = "tb_equip_set";
    public static tb_gemstone = "tb_gemstone";
    public static tb_gemstone_new = "tb_gemstone_new";
    public static tb_gemstone_compound = "tb_gemstone_compound";
    public static tb_accessory = "tb_accessory";
    public static tb_accessory_suit = "tb_accessory_suit";
    public static tb_accessory_set = "tb_accessory_set";
    public static tb_level_fund = "tb_level_fund";
    public static tb_operate_activity = "tb_operate_activity";
    public static tb_risk_set = "tb_risk_set";
    public static tb_activity_set = "tb_activity_set";
    public static tb_model_dialogue = "tb_model_dialogue";
    public static tb_risk = "tb_risk";
    public static tb_group_buy = "tb_group_buy";
    public static tb_question = "tb_question";
    public static tb_activity_sevendays = "tb_activity_sevendays";
    public static tb_limit_time = "tb_limit_time";
    public static tb_summon_rank = "tb_summon_rank";
    public static tb_summon_box = "tb_summon_box"
    public static tb_group_buying_time = "tb_group_buying_time";
    public static tb_group_buying = "tb_group_buying";
    public static tb_divinity_door = "tb_divinity_door";
    public static tb_divinity_set = "tb_divinity_set";
    public static tb_sevendays_reward = "tb_sevendays_reward";
    public static tb_baptize = "tb_baptize";
    public static tb_artifact = "tb_artifact";
    public static tb_artifact_strength = "tb_artifact_strength";
    public static tb_artifact_enchant = "tb_artifact_enchant";
    public static tb_artifact_baptize = "tb_artifact_baptize";
    public static tb_artifact_obtain = "tb_artifact_obtain";
    public static tb_artifact_skill = "tb_artifact_skill";
    public static tb_artifact_skillcost = "tb_artifact_skillcost";
    public static tb_artifact_set = "tb_artifact_set";
    public static tb_divinity_replace = "tb_divinity_replace";
    public static tb_version = "tb_version";
    public static tb_notice = "tb_notice";
    public static tb_exchange_set = "tb_exchange_set";
    public static tb_gold_exchange = "tb_gold_exchange";
    public static tb_map = "tb_map";
    public static tb_skill_set = "tb_skill_set";
    public static tb_shield = "tb_shield";
    public static tb_recommend_squad = "tb_recommend_squad";
    public static tb_dan = "tb_dan";
    public static tb_person_season = "tb_person_season";
    public static tb_guild_season = "tb_guild_season";
    public static tb_guild_war_set = "tb_guild_war_set";
    public static tb_luck_artifact = "tb_luck_artifact";
    public static tb_luck_artifact_time = "tb_luck_artifact_time";
    public static tb_luck_god = "tb_luck_god";
    public static tb_luck_god_time = "tb_luck_god_time";
    public static tb_luck_equip = "tb_luck_equip";
    public static tb_luck_equip_time = "tb_luck_equip_time";
    public static tb_luck_equip_reward = "tb_luck_equip_reward";
    public static tb_luck_treasure = "tb_luck_treasure";
    public static tb_luck_treasure_time = "tb_luck_treasure_time";
    public static tb_recharge_sign = "tb_recharge_sign";
    public static tb_share = "tb_share";
    public static tb_online = "tb_online";
    public static tb_openservice = "tb_openservice";
    public static tb_fight_rank = "tb_fight_rank";
    public static tb_activity_time = "tb_activity_time";
    public static tb_honour = "tb_honour";
    public static tb_honour_reward = "tb_honour_reward";
    public static tb_honour_set = "tb_honour_set";
    public static tb_match = "tb_match";
    public static tb_match_score = "tb_match_score";
    public static tb_match_set = "tb_match_set";
    public static tb_match_box = "tb_match_box";
    public static tb_copy_config = "tb_copy_config";
    public static tb_fight_goddomain = "tb_fight_goddomain";
    public static tb_fight_goddomain_reward = "tb_fight_goddomain_reward";
    public static tb_fight_goddomain_set = "tb_fight_goddomain_set";
    public static tb_rank_type = "tb_rank_type";
    public static tb_growth_guide = "tb_growth_guide";
    public static tb_rank_reward = "tb_rank_reward";
    public static tb_function = "tb_function";
    public static tb_fund = "tb_fund";
    public static tb_fund_reward = "tb_fund_reward";
    public static tb_openservice_gift = "tb_openservice_gift";
    public static tb_gift_time = "tb_gift_time";
    public static tb_optional = "tb_optional";
    public static tb_daily_recharge = "tb_daily_recharge";
    public static tb_week_recharge = "tb_week_recharge";
    public static tb_month_recharge = "tb_month_recharge";
    public static tb_chat_quick = "tb_chat_quick";
    public static tb_treasure_star = "tb_treasure_star";
    public static tb_treasure = "tb_treasure";
    public static tb_treasure_book = "tb_treasure_book";
    public static tb_treasure_set = "tb_treasure_set";
    public static tb_advance_road = "tb_advance_road";
    public static tb_advance_condition = "tb_advance_condition";
    public static tb_checkpoint_pass = "tb_checkpoint_pass";
    public static tb_halo = "tb_halo";
    public static tb_recharge_rebate = "tb_recharge_rebate";
    public static tb_picture_frame = "tb_picture_frame";
    public static tb_warrior_prove = "tb_warrior_prove";
    public static tb_warrior_cycle = "tb_warrior_cycle";
    public static tb_week_trial = "tb_week_trial";
    public static tb_month_trial = "tb_month_trial";
    public static tb_warrior_set = "tb_warrior_set";
    public static tb_team_copy = "tb_team_copy";
    public static tb_team_target = "tb_team_target";
    public static tb_team_set = "tb_team_set";

    static mapCls: Object = {
        "tb_treasure_star": tb.TB_treasure_star,
        "tb_team_copy": tb.TB_team_copy,
        "tb_team_target": tb.TB_team_target,
        "tb_treasure": tb.TB_treasure,
        "tb_treasure_set": tb.TB_treasure_set,
        "tb_skill": tb.TB_skill,
        "tb_map": tb.TB_map,
        "tb_item": tb.TB_item,
        "tb_god": tb.TB_god,
        "tb_copy_info": tb.TB_copy_info,
        "tb_daily_copy": tb.TB_daily_copy,
        "tb_expedition": tb.TB_expedition,
        "tb_copy": tb.TB_copy,
        "tb_god_set": tb.TB_god_set,
        "tb_god_star": tb.TB_god_star,
        "tb_monster": tb.TB_monster,
        "tb_worldboss": tb.TB_worldboss,
        "tb_notice": tb.TB_notice,
        "tb_artifact": tb.TB_artifact,
        "tb_daily_reward": tb.TB_daily_reward,
        "tb_escort": tb.TB_escort,
        "tb_forest": tb.TB_forest,
        "tb_baptize": tb.TB_baptize,
        "tb_island_level": tb.TB_island_level,
        "tb_artifact_enchant": tb.TB_artifact_enchant,
        "tb_guild_season": tb.TB_guild_season,
        "tb_guild_help": tb.TB_guild_help,
        "tb_person_season": tb.TB_person_season,
        "tb_recharge_sign": tb.TB_recharge_sign,
        "tb_group_buying_time": tb.TB_group_buying_time,
        "tb_summon_box": tb.TB_summon_box,
        "tb_summon_rank": tb.TB_summon_rank,
        "tb_limit_time": tb.TB_limit_time,
        "tb_honour": tb.TB_honour,
        "tb_honour_reward": tb.TB_honour_reward,
        "tb_arena_new_set": tb.TB_arena_new_set,
        "tb_arena_new": tb.TB_arena_new,
        "tb_arena_new_npc": tb.TB_arena_new_npc,
        "tb_match": tb.TB_match,
        "tb_match_score": tb.TB_match_score,
        "tb_match_set": tb.TB_match_set,
        "tb_match_box": tb.TB_match_box,
        "tb_trial": tb.TB_trial,
        "tb_fight_goddomain_reward": tb.TB_fight_goddomain_reward,
        "tb_fight_goddomain_set": tb.TB_fight_goddomain_set,
        "tb_activity_set": tb.TB_activity_set,
        "tb_rank_type": tb.TB_rank_type,
        "tb_growth_guide": tb.TB_growth_guide,
        "tb_god_awaken": tb.TB_god_awaken,
        "tb_fusion_soul": tb.TB_fusion_soul,
        "tb_rank_reward": tb.TB_rank_reward,
        "tb_strength_suit": tb.TB_strength_suit,
        "tb_function": tb.TB_function,
        "tb_refine_suit": tb.TB_refine_suit,
        "tb_fund": tb.TB_fund,
        "tb_fund_reward": tb.TB_fund_reward,
        "tb_month_card": tb.TB_month_card,
        "tb_openservice_gift": tb.TB_openservice_gift,
        "tb_gift_time": tb.TB_gift_time,
        "tb_optional": tb.TB_optional,
        "tb_equip_suit": tb.TB_equip_suit,
        "tb_artifact_strength": tb.TB_artifact_strength,
        "tb_equip_refine": tb.TB_equip_refine,
        "tb_equip_strength": tb.TB_equip_strength,
        "tb_game_set": tb.TB_game_set,
        "tb_advance_road": tb.TB_advance_road,
        "tb_advance_condition": tb.TB_advance_condition,
        "tb_checkpoint_pass": tb.TB_checkpoint_pass,
        "tb_luck_treasure": tb.TB_luck_treasure,
        "tb_luck_treasure_time": tb.TB_luck_treasure_time,
        "tb_skin": tb.TB_skin,
        "tb_daily_recharge": tb.TB_daily_recharge,
        "tb_week_recharge": tb.TB_week_recharge,
        "tb_month_recharge": tb.TB_month_recharge,
        "tb_gemstone_new": tb.TB_gemstone_new,
        "tb_gemstone_compound": tb.TB_gemstone_compound,
        "tb_halo": tb.TB_halo,
        "tb_guild_copy": tb.TB_guild_copy,
        "tb_picture_frame": tb.TB_picture_frame,
        "tb_warrior_prove": tb.TB_warrior_prove,
        "tb_warrior_cycle": tb.TB_warrior_cycle,
        "tb_week_trial": tb.TB_week_trial,
        "tb_month_trial": tb.TB_month_trial,
    };

    public constructor() {
        this.tb = new Object;
    }


    public loadGameData(tbUrl: string, $fun: Function = null, $progessFun: Function = null): void {
        this._completeFun = $fun;
        this._progessFun = $progessFun;
        tl3d.LoadManager.getInstance().load(tbUrl, tl3d.LoadManager.XML_TYPE, ($str: any) => {
            this.parseLineByStr($str);
        });
    }

    public tb: Object;
    private _lines: Array<string>;
    private _iter: number = 0;
    private _count: number = 0;
    private _progessFun: Function;
    private _completeFun: Function;
    private parseLineByStr($str: string): void {
        this._lines = $str.split(String.fromCharCode(13));
        this._count = this._lines.length / 4;
        Laya.timer.frameLoop(1, this, this.loopAnlysi);
    }

    //异步解析配置表
    private loopAnlysi(): void {
        var i = 3;
        while (i > 0) {
            i--;
            if (this._iter >= this._count) {
                if (this._completeFun) {
                    this._completeFun();
                    this._completeFun = null;
                    this._progessFun = null;
                }
                return;
            }
            if (this._progessFun) {
                this._progessFun(this._iter / this._count);
            }
            var $name: string = this._lines[this._iter * 4 + 0];
            var $field: string = this._lines[this._iter * 4 + 1];
            var $typs: string = this._lines[this._iter * 4 + 2];
            var $data: string = this._lines[this._iter * 4 + 3];
            var vo: ResTabelVo = new ResTabelVo();
            vo.parseTable($name, $typs, $field, $data);
            this.tb[$name] = vo;
            this._iter++;
        }

    }

    public getData($tbName: string, $id: any): Object {
        if (this.tb[$tbName]) {
            //logdebug(this.tb[$tbName].getDataByID($id));
            return this.tb[$tbName].getDataByID($id);
        }
        return null;
    }

    public getTabSize($tbName: string): number {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].size;
        }
        return 0;
    }
    public getTabMaxID($tbName: string): number {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].maxId;
        }
        return 0;
    }
    public getTableByName($tbName: string): any {
        if (this.tb[$tbName]) {
            return this.tb[$tbName]
        }
        return null;
    }
}