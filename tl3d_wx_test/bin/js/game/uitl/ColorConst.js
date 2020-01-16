var ColorConst = /** @class */ (function () {
    function ColorConst() {
    }
    /**获取随机品质颜色 */
    ColorConst.getRankdomColor = function () {
        return this.getQulityColor(random(6));
    };
    //获取品质颜色
    ColorConst.getQulityColor = function (qulity) {
        switch (qulity) {
            case 1:
                return ColorConst.WHITE;
            case 2:
                return ColorConst.GREEN;
            case 3:
                return ColorConst.BLUE;
            case 4:
                return ColorConst.PURPLE;
            case 5:
                return ColorConst.ORANGE;
            case 6:
                return ColorConst.RED;
        }
        return ColorConst.WHITE;
    };
    //获取限时热购折扣颜色
    ColorConst.getLimiteBuyZheKouColor = function (num) {
        switch (num) {
            case 1:
                return '#e691f6';
            case 2:
                return '#830072';
            case 3:
                return '#ffec9c';
            case 4:
                return '#b14808';
            default:
                return '#000000';
        }
    };
    //迷雾森林排行榜颜色
    ColorConst.getFogForestRankColor = function (rank) {
        switch (rank) {
            case 1:
                return '#fff17d';
            case 2:
                return '#ad23ab';
            case 3:
                return '#1555c0';
            default:
                return '#000000';
        }
    };
    //图鉴英雄名字颜色(根据icon_quality)
    ColorConst.getTujianNameColor = function (icon_quality) {
        switch (icon_quality) {
            case 1:
                return "#f7edda";
            case 2:
                return "#d8ffb8";
            case 3:
                return "#b8fff4";
            case 4:
                return "#f8c6ff";
            case 5:
                return "#fff4dc";
            default:
                return "#000000";
        }
    };
    //每日副本难度颜色
    ColorConst.getDailyCopyColor = function (difficulty) {
        switch (difficulty) {
            case 1:
                return "#ffffff";
            case 2:
                return "#afe5a0";
            case 3:
                return "#a0dfe5";
            case 4:
                return "#daa0e5";
            case 5:
                return "#ffd649";
            case 6:
                return "#ff4848";
            default:
                return "#ffffff";
        }
    };
    //每日副本按钮描边
    ColorConst.getDailyCopyBtnStroke = function (boolean) {
        return boolean ? "#676767" : "#ca7005";
    };
    /** 获取段位颜色 */
    ColorConst.getGradeColor = function (grade) {
        switch (grade) {
            case 1:
                return "#ffec6f";
            case 2:
                return "#ff6e6e";
            case 3:
                return "#e0ccff";
            case 4:
                return "#cffafc";
            case 5:
                return "#ffc455";
            case 6:
                return "#a9c4cb";
            case 7:
                return "#d1884c";
            default:
                return "#ffffff";
        }
    };
    /** 神灵星级称谓描边颜色 */
    ColorConst.getStarLvStrokeColor = function (lv) {
        var ary = ["#5b7007", "#2c527c", "#64217c", "#9e6715", "#9e1515"];
        var index = Math.floor((lv - 1) / 2);
        return ary[index] || ary[0];
    };
    //创建红色色颜色滤镜
    ColorConst.redFilter = new Laya.ColorFilter([
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 1, 0,
    ]);
    //创建灰色颜色滤镜
    ColorConst.grayFilter = new Laya.ColorFilter([
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0,
    ]);
    //外发光滤镜
    ColorConst.lightFilter = new Laya.GlowFilter("#ff0000", 15, 0, 0);
    //阴影滤镜
    ColorConst.shadowFilter = new Laya.GlowFilter("#000000", 8, 8, 8);
    //默认文字颜色
    ColorConst.normalFont = "#7e5336";
    //物品不足文字字颜色
    ColorConst.redFont = "#ff0400";
    ColorConst.LIGHT_STH = "#f66217";
    //红
    ColorConst.RED = "#ff0000";
    //橙
    ColorConst.ORANGE = "#ff7000";
    //紫
    ColorConst.PURPLE = "#b700ff";
    //灰
    ColorConst.GRAY = "#848484";
    //绿
    ColorConst.GREEN = "#35cd41";
    //图鉴_羁绊_绿
    ColorConst.FATE_GREEN = "#3d9441";
    //首通_绿
    ColorConst.FIRST_GREEN = "#99ff01";
    // 任务_绿
    ColorConst.TASK_GREEN = "#319c28";
    ColorConst.TASK_ORANGE = "#c26939";
    //图鉴_羁绊_金色
    ColorConst.FATE_GOLD = "#7e5336";
    //蓝
    ColorConst.BLUE = "#0000ff";
    //白
    ColorConst.WHITE = "#ffffff";
    //黑
    ColorConst.BLACK = "#000000";
    //棕色
    ColorConst.ZONGSE = "#fff5c1";
    //tab font
    ColorConst.TAB_FONT = "#4C260D";
    // 亮色
    ColorConst.LIGHT = "#ffeecc";
    //橙色按钮描边
    ColorConst.ORANGE_FILTER = "#ca7005";
    //红色按钮描边
    ColorConst.RED_FILTER = "#e6360d";
    //绿色按钮描边
    ColorConst.GREEN_FILTER = "#538901";
    /** 世界 */
    ColorConst.CHAT_WORLD = "#f69600";
    /** 公会 */
    ColorConst.CHAT_GUILD = "#19a816";
    /** 同省 */
    ColorConst.CHAT_PROVINCE = "#0a87bb";
    /** 跨服 */
    ColorConst.CHAT_CROSS_SVR = "#e65700";
    return ColorConst;
}());
