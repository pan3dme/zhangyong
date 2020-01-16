enum UI_FLYTEXT { AWAKEN, UPSTART }
module common {
    export class FlyText {

        // public static fly($type: number, $pos: tl3d.Vector2D) {
        //     let img_flytext: Laya.Image = new Laya.Image;
        //     if ($type == UI_FLYTEXT.AWAKEN) {
        //         img_flytext.skin = "comp/image/juexing.png";
        //     } else if ($type == UI_FLYTEXT.UPSTART) {
        //         img_flytext.skin = "comp/image/shengxing.png";
        //     }
        //     Laya.stage.addChild(img_flytext);
        //     img_flytext.x = $pos.x;
        //     img_flytext.y = $pos.y;
        //     let tagerY: number = $pos.y - 100;
        //     Laya.Tween.to(img_flytext, { y: tagerY }, 1500, null, Handler.create(this, () => {
        //         img_flytext.removeSelf();
        //     }));
        // }
    }
}