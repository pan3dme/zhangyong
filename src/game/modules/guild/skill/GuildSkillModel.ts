
module game {
    export class GuildSkillModel {

        private static _instance: GuildSkillModel;
        public static getInstance(): GuildSkillModel {
            if(!GuildSkillModel._instance) {
                GuildSkillModel._instance = new GuildSkillModel();
            }
            return GuildSkillModel._instance;
        }
        constructor() {};

        /** 公会技能列表 */ 
        private _skillList : GuildSkillVo[] = [];
        /** 公会技能数量 */
        public skillNum: number = 5;

        public godTypes : number[] = [];    // 神灵类型数组
        public skillAttrs : number[] = [];  // 技能属性数组
        initModel() : void {
            this.godTypes = [GodType.shuchu,GodType.zhiliao,GodType.fuzhu,GodType.kongzhi,GodType.fangyu];
            let attrType = iface.tb_prop.attrTypeKey;
            // 属性定死，不需要去遍历表结构
            this.skillAttrs = [attrType.hpMax,attrType.atk,attrType.def,attrType.crit,attrType.critDmg];
            for(let gtype of this.godTypes) {
                for(let attr of this.skillAttrs){
                    this._skillList.push(new GuildSkillVo(gtype,attr));
                }
            }
        }

        /** 通过种族获取到公会技能列表 x个  先更新再获取*/ 
        getSkillList(godType: number) : GuildSkillVo[] {
            return godType == 0 ? this._skillList : this._skillList.filter((vo)=>{
                return vo.godType == godType;
            });
        }
        
        /**　获取到可升级的属性 */
        getCanLvupAttr(type:number) : number {
            let list = this.getSkillList(type);
            let vo = list.find((vo)=>{
                return vo.isCanLvup();
            })
            return vo ? vo.attrType : 1;
        }


        private _check: boolean = true;
        public set check($value) {
            this._check = $value;
        }
        public get check(): boolean {
            return this._check;
        }
        /** 遍历查看是否有可以升级的 */
        isHasDonateLevelUp() : boolean {
            if(App.IsSysOpen(ModuleConst.GONGHUI) && GuildModel.getInstance().isHasGuild() && App.hero.loginCount == 1 && this._check) {
                return this._skillList.some((vo)=>{
                    return vo.isCanLvup();
                });
            }
            return false;
        }

        /** 获取到神力对象 */
        getCurSkillAttr(godType: number): any[] {
            // 格式:[{固定值对象},{百分比对象}]
            let attrAry = [{}, {}];
            let list = this.getSkillList(godType);
            for(let skillVo of list) {
                let attr = skillVo.tbSkill.attr;
                if(attr[1] == ValueType.percent){
                    attrAry[1][attr[0]] = attrAry[1][attr[0]] ? attrAry[1][attr[0]]+attr[2] : attr[2];
                }else{
                    attrAry[0][attr[0]] = attrAry[0][attr[0]] ? attrAry[0][attr[0]]+attr[2] : attr[2];
                }
            }
            return attrAry;
        }

        /** 获取技能等级 */
        public getSkillLv(godType:number,attrType:number):number {
            let key = `${godType}${attrType}`;
            return App.hero.guildSkillInfo[key] || 0;

        }

        /** 获取技能对象 */
        public getSkillVo(godType:number,attrType:number):GuildSkillVo {
            return this._skillList.find((vo)=>{
                return vo.godType == godType && vo.attrType == attrType;
            });
        }

        public updateSkillData():void {
            for(let skill of this._skillList){
                skill.updateData();
            }
        }
    }
}