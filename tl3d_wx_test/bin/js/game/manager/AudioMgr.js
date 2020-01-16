/*
* name;
*/
var SoundManager = Laya.SoundManager;
var AudioMgr = /** @class */ (function () {
    function AudioMgr() {
    }
    // AudioManager.playMusic("sound/bgm_login.mp3");
    // AudioManager.playMusic("sound/battle_bgm2.mp3");
    // AudioManager.playMusic("sound/battle_bgm3.mp3");
    // AudioManager.playMusic("sound/bgmusic1.mp3");
    // AudioManager.playMusic("sound/bgmusic.mp3");
    //播放音乐
    AudioMgr.playMusic = function (path) {
        if (path === void 0) { path = "sound/battle_bgm3.mp3"; }
        if (!AudioMgr.MUSICPAUSE) {
            try {
                if (AudioMgr._curbgm != path) {
                    if (AudioMgr._soundChannel) {
                        AudioMgr._soundChannel.stop();
                    }
                    AudioMgr._curbgm = path;
                    AudioMgr._soundChannel = SoundManager.playMusic(path, 0);
                    // SoundManager.setMusicVolume(0.8);
                }
            }
            catch (error) {
            }
        }
    };
    AudioMgr.setPlayRate = function (val) {
        try {
            SoundManager.playbackRate = val;
        }
        catch (error) {
        }
    };
    //暂停背景音乐
    AudioMgr.pauseMusic = function () {
        if (AudioMgr._soundChannel) {
            AudioMgr._soundChannel.pause();
            AudioMgr.MUSICPAUSE = true;
        }
    };
    //停止背景音乐
    AudioMgr.stopMusic = function () {
        if (AudioMgr._soundChannel) {
            AudioMgr._soundChannel.stop();
        }
    };
    //继续背景音乐
    AudioMgr.resumeMusic = function () {
        if (AudioMgr._soundChannel) {
            AudioMgr._soundChannel.resume();
        }
    };
    //播放音效
    AudioMgr.playSound = function (path) {
        if (path === void 0) { path = "sound/button.mp3"; }
        if (!AudioMgr.SOUNDSTOP) {
            try {
                SoundManager.playSound(path, 1);
            }
            catch (error) {
            }
        }
    };
    //停止音效
    AudioMgr.StopSound = function (path) {
        if (!path || path == "")
            return;
        if (!AudioMgr.SOUNDSTOP) {
            try {
                SoundManager.stopSound(path);
            }
            catch (error) {
            }
        }
    };
    AudioMgr.pauseSound = function () {
        SoundManager.stopAllSound();
        AudioMgr.SOUNDSTOP = true;
    };
    AudioMgr.MUSICPAUSE = false;
    AudioMgr.SOUNDSTOP = false;
    return AudioMgr;
}());
