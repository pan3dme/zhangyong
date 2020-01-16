    class ColorConst {

        //创建红色色颜色滤镜
        static redFilter: Laya.ColorFilter = new Laya.ColorFilter([
            1, 0, 0, 0, 0, //R
            0, 0, 0, 0, 0, //G
            0, 0, 0, 0, 0, //B
            0, 0, 0, 1, 0, //A
        ]);
        //创建灰色颜色滤镜
        static grayFilter: Laya.ColorFilter = new Laya.ColorFilter([
            0.3086, 0.6094, 0.0820, 0, 0,  //R
            0.3086, 0.6094, 0.0820, 0, 0, //G
            0.3086, 0.6094, 0.0820, 0, 0,  //B
            0, 0, 0, 1, 0, //A
        ]);
        //外发光滤镜
        static lightFilter: Laya.GlowFilter = new Laya.GlowFilter("#ff0000", 15, 0, 0);
        //阴影滤镜
        static shadowFilter: Laya.GlowFilter = new Laya.GlowFilter("#000000", 8, 8, 8);
        //默认文字颜色
        static normalFont: string = "#7e5336";
        //物品不足文字字颜色
        static redFont: string = "#ff0400";
        static LIGHT_STH: string = "#f66217";
        //红
        static RED: string = "#ff0000";
        //橙
        static ORANGE: string = "#ff7000";
        //紫
        static PURPLE: string = "#b700ff";
        //灰
        static GRAY: string = `#848484`;
        //绿
        static GREEN: string = "#35cd41";
        //图鉴_羁绊_绿
        static FATE_GREEN: string = "#3d9441";
        //首通_绿
        static FIRST_GREEN: string = "#99ff01";
        // 任务_绿
        static TASK_GREEN: string = "#319c28";
        static TASK_ORANGE: string = "#c26939";
        //图鉴_羁绊_金色
        static FATE_GOLD: string = "#7e5336";
        //蓝
        static BLUE: string = "#0000ff";
        //白
        static WHITE: string = "#ffffff";
        //黑
        static BLACK: string = "#000000";
        //棕色
        static ZONGSE: string = "#fff5c1";
        //tab font
        static TAB_FONT: string = "#4C260D";
        // 亮色
        static LIGHT : string = "#ffeecc";

        //橙色按钮描边
        static ORANGE_FILTER: string = "#ca7005";
        //红色按钮描边
        static RED_FILTER: string = "#e6360d";
        //绿色按钮描边
        static GREEN_FILTER: string = "#538901";

        /**获取随机品质颜色 */
        static getRankdomColor(): string {
            return this.getQulityColor(random(6));
        }

        /** 世界 */
        static CHAT_WORLD : string = "#f69600";
        /** 公会 */
        static CHAT_GUILD : string = "#19a816";
        /** 同省 */
        static CHAT_PROVINCE : string = "#0a87bb";
        /** 跨服 */
        static CHAT_CROSS_SVR : string = "#e65700";

        //获取品质颜色
        static getQulityColor(qulity: number): string {
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
        }

        //获取限时热购折扣颜色
        static getLimiteBuyZheKouColor(num: number): string {
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
        }

        //迷雾森林排行榜颜色
        static getFogForestRankColor(rank: number): string {
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
        }

        //图鉴英雄名字颜色(根据icon_quality)
        static getTujianNameColor(icon_quality: number): string {
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
        }

        //每日副本难度颜色
        static getDailyCopyColor(difficulty: number): string {
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
        }
        //每日副本按钮描边
        static getDailyCopyBtnStroke(boolean: boolean): string {
            return boolean ? "#676767" : "#ca7005";
        }

        /** 获取段位颜色 */
        static getGradeColor(grade: number): string {
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
        }
        /** 神灵星级称谓描边颜色 */
        static getStarLvStrokeColor(lv:number):string {
            let ary = ["#5b7007","#2c527c","#64217c","#9e6715","#9e1515"];
            let index = Math.floor((lv-1)/2);
            return ary[index] || ary[0];
        }
    }