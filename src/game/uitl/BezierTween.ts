class BezierTween {
    private static TWEEN_MAP: Map<any, BezierItem> = new Map


    /**
     * 贝塞尔曲线缓动
     * 支持同时位移 极 以外的其他缓动
     * 其他属性的缓动，沿用tween,位移通过逐帧计算位于曲线上的点，来实现曲线运动
     * @param target 
     * @param duration 时间
     * @param anchorpoints 位置属性 [初始位置,终点位置]
     * @param props 除位移以外的属性
     * @param ease 除位移以外的属性缓动动画函数
     * @param complete 完成回调
     */
    static to(target: any, duration: number, anchorpoints: Array<any>, props?: any, ease?: Function, complete?: Handler) {
        let bezierItem: BezierItem = Laya.Pool.getItemByClass("bezierTween", BezierItem);

        bezierItem.Anchorpoints = anchorpoints;

        let sta = bezierItem.Anchorpoints[0]
        let end = bezierItem.Anchorpoints[1]
        let control = { x: sta.x + Math.floor(Math.random() * 100), y: sta.y + Math.floor(Math.random() * 300) }
        bezierItem.Anchorpoints.splice(1, 0, control);

        // console.log("bezierItem.Anchorpoints:---------",bezierItem.Anchorpoints);

        bezierItem.StartTime = Laya.timer.currTimer;
        bezierItem.Duration = duration;
        bezierItem.EndTime = bezierItem.StartTime + bezierItem.Duration;
        bezierItem.Target = target;
        bezierItem.Complete = complete;
        bezierItem.ease = ease;
        bezierItem.props = props;

        bezierItem.onStart();

        BezierTween.TWEEN_MAP.set(target, bezierItem);
    }

    static clear(target: any) {
        if (BezierTween.TWEEN_MAP.has(target)) {
            let bezierItem: BezierItem = BezierTween.TWEEN_MAP.get(target);
            bezierItem.clear();
            Laya.Pool.recover("bezierTween", bezierItem);

            BezierTween.TWEEN_MAP.delete(target);
        }
    }

}

class BezierItem {
    public Anchorpoints: Array<any>;
    public StartTime: number;
    public EndTime: number;
    public Duration: number;
    public Target: any;
    public Complete: Handler
    public props: any
    public ease: any

    private tweenok: boolean;
    private bezierok: boolean;


    public onStart() {
        this.bezierok = false;
        this.tweenok = true;
        if (this.props) {
            this.tweenok = false;
            Laya.Tween.to(this.Target, this.props, this.Duration, this.ease, Handler.create(this, () => {
                this.tweenok = true;
                this.onComp();
            }));
        }
        Laya.timer.clear(this, this.updateBezier);
        Laya.timer.frameLoop(1, this, this.updateBezier);
    }

    private updateBezier() {
        let curt = Laya.timer.currTimer;
        if (curt > this.EndTime) {
            // logyhj("end===========");
            Laya.timer.clear(this, this.updateBezier);
            this.bezierok = true;
            this.onComp();
            return;
        }

        let t = (curt - this.StartTime) / this.Duration
        let point = this.MultiPointBezier(this.Anchorpoints, t);
        // logyhj("时间： " + t + " 位置: %o" , point);
        this.Target.x = point.x;
        this.Target.y = point.y;
    }

    private MultiPointBezier(points, t): any {
        let len: number = points.length;
        let x: number = 0, y: number = 0;
        for (let i: number = 0; i < len; i++) {
            let point: any = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    }

    private erxiangshi(start: number, end: number): number {
        let cs: number = 1, bcs: number = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    }

    private onComp() {
        if (!this.bezierok || !this.tweenok) return;
        if (this.Complete) {
            this.Complete.run();
        }

        BezierTween.clear(this.Target);
    }

    public clear() {
        Laya.Tween.clearTween(this.Target);
        Laya.timer.clear(this, this.updateBezier);
        this.Anchorpoints = null;
        this.bezierok = false;
        this.Duration = 0;
        this.ease = null;
        this.EndTime = 0;
        this.props = null;
        this.StartTime = 0;
        this.Target = null;
        this.tweenok = false;
    }
}