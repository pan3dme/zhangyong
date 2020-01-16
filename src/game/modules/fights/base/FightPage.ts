

module game {

    export class FightPage {

        public curwave: number;
        protected auto: boolean;
        public isQuick: boolean;
        public defType: number;
        public result: number;  //结果
        public waveObj;
        public lossHpObj: any;
        public maxHpObj: any;

        constructor() {
            this.isQuick = false;
            this.waveObj = {};
        }

        initPage($jsonOrobj:any) {
            
        }

        initState(){
            
        }

        protected addlist(ary, vo) {
            if (ary.indexOf(vo) == -1) {
                ary.push(vo);
            }
        }

        /**
         * 获得战报中需要预加载的模型和技能
         */
        getPreloadIds() {
            return { roles: [], skills: [] };
        }

        //获得一共多少波
        getWaveNum(): number {
            return 0;
        }

        getWaveObj(){
            return this.waveObj[this.curwave];
        }

        getTitle(): string {
            return "";
        }

        //获得下一回合的数据
        getNextRound(newWave: boolean = false) {
            return null;
        }

        setAuto(val:boolean){
            this.auto = val;
        }

        selectSkillFight(data:any){

        }

        getResult(): number{
            return playState.FAILURE;
        }

        quickFight(){
            this.isQuick = true;
        }

        /**
         * 不支持多波怪物战斗后获取丢失血量
         * 只支持单波战斗
         */
        getLossHpObj(): any {
            return {};
        }

        getMaxHpObj(): any {
            return {};
        }

        clonePage(parm):FightPage{
            return null;
        }

        //销毁
        onDestroy() {

        }
    }
}


