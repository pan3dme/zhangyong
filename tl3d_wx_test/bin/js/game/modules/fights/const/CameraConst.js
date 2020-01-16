var game;
(function (game) {
    var CameraConst;
    (function (CameraConst) {
        CameraConst[CameraConst["BOSSMAIN"] = 0] = "BOSSMAIN";
        CameraConst[CameraConst["MAIN"] = 1] = "MAIN";
        CameraConst[CameraConst["BOSSINIT"] = 2] = "BOSSINIT";
        CameraConst[CameraConst["INIT"] = 3] = "INIT";
        CameraConst[CameraConst["VICTORY"] = 4] = "VICTORY";
        CameraConst[CameraConst["DEFEATED"] = 5] = "DEFEATED";
    })(CameraConst = game.CameraConst || (game.CameraConst = {}));
})(game || (game = {}));
