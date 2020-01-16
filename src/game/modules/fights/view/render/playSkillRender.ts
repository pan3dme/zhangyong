module game {
    export class playSkillRender extends ui.fight.box.playSkillBoxUI {
        constructor() {
            super();
        }

        public setData(team,icon,name){
            this.img_bg1.skin = team == battle.BatteConsts.BATTLE_CAMPATK?SkinUtil.wofangjinengdi:SkinUtil.difangjinengdi
            this.img_bg2.skin = team == battle.BatteConsts.BATTLE_CAMPATK?SkinUtil.wofangjinengGX:SkinUtil.difangjinengGX
            this.img_icon.skin = SkinUtil.getHeadIcon(icon);
            this.img_icon.x = team == battle.BatteConsts.BATTLE_CAMPATK?82:271
            this.lab_name.text = name;
            this.lab_name.strokeColor = team == battle.BatteConsts.BATTLE_CAMPATK?"#003481":"#810000";
            this.lab_name.x = team == battle.BatteConsts.BATTLE_CAMPATK?137:82
            // this.lab_name.align = team == battle.BatteConsts.BATTLE_CAMPATK?"left":"right"

            this.clearTimer(this,this.playEnd);
            this.ani2.stop();
            this.ani1.stop();
            this.ani1.play(0,false);
            this.timerOnce(1500,this,this.playEnd);
        }

        private playEnd(){
            this.ani2.play(0,false);
        }
    }
}