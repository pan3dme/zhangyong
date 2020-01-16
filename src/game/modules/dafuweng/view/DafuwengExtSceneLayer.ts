module game {
    export class DafuwengExtSceneLayer extends Base2dSceneLayer {

        constructor() {
            super();
        }

        /**基于偏移量设置位置 */
        setPosition(x: number, y: number): void {
            this.x = x + Launch.offsetX;
            this.y = y + Launch.offsetY;
        }

        /**
          * 充值镜头
          */
        protected upFrame(): void {
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            tl3d.TimeUtil.update();
            //设置为2D的镜头角度
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -60;
            Scene_data.cam3D.distance = 250;

            //这是是移动2D的基础坐标
            scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new tl3d.Vector2D(this.x, this.y)
            scene2d.CanvasPostionModel.getInstance().resetSize();


            Scene_data.context3D.renderContext.clear(Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT);//重置深度
            tl3d.MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Scene_data.context3D._contextSetTest.clear();
            this.scene.upFrame();
        }

        /**
         * 添加ui角色
         * @param mid 
         * @param postionx 
         * @param postiony 
         * @param rotate 
         * @param scale 
         */
        public addModelChar(mid: string, postionx: number, postiony: number, rotate: number = 180, scale: number = 2.7, rotationz: number = 0): any {
            let sceneChar = new DafuwengChar();
            this.scene.addMovieDisplay(sceneChar);
            sceneChar.setRoleUrl(getRoleUrl(mid));
            sceneChar.play(tl3d.CharAction.STANAD);
            sceneChar.forceRotationY = rotate;
            sceneChar.rotationZ = rotationz;
            sceneChar.set2dPos(postionx, postiony);  //坐标
            sceneChar.scale = scale;
            return sceneChar;
        }
    }
}