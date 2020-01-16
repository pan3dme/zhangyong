var tl3d;
(function (tl3d) {
    var Groundposition = /** @class */ (function () {
        function Groundposition() {
        }
        Groundposition.getGroundPos = function ($x, $y) {
            var $ty = -500;
            if (!this._plantObjectMath) {
                var A = new tl3d.Vector3D(0, $ty, 500);
                var B = new tl3d.Vector3D(-500, $ty, 0);
                var C = new tl3d.Vector3D(500, $ty, 0);
                this._plantObjectMath = tl3d.Calculation._PanelEquationFromThreePt(A, B, C);
                this._plantnormal = new tl3d.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
                this._plantnormal.normalize();
                this._plane_a = new tl3d.Vector3D(A.x, A.y, A.z);
            }
            //计算直线与平面交点
            var line_a = tl3d.MathUtil.mathDisplay2Dto3DWorldPos(new tl3d.Vector2D($x, $y), 500);
            var line_b = new tl3d.Vector3D(tl3d.Scene_data.cam3D.x, tl3d.Scene_data.cam3D.y, tl3d.Scene_data.cam3D.z);
            var crossPoint = tl3d.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
            return crossPoint;
        };
        return Groundposition;
    }());
    tl3d.Groundposition = Groundposition;
})(tl3d || (tl3d = {}));
