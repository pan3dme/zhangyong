
class Base2dSceneLayerExt extends Base2dSceneLayer {
        /**
     * 添加ui角色
     * @param mid 
     * @param postionx 
     * @param postiony 
     * @param rotate 
     * @param scale 
     */
        public addModelChar(mid: string, postionx: number, postiony: number, rotate: number = 180, scale: number = 2.7, rotationz: number = 0): GameUIChar {
            let sceneChar = new GameUIChar();
            this.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl(mid));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.rotationZ = rotationz;
            sceneChar.set2dPos(postionx, postiony);  //坐标
            sceneChar.scale = scale;
            return sceneChar;
        }


        /**关闭 */
        public onExit(): void {
            this.scene.clearAllParticle();
            this.scene.removeAllMovieDisplay();
        }
    }