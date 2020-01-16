/*
* name;
*/
import SoundManager = Laya.SoundManager;
class AudioMgr {
    static _soundChannel: laya.media.SoundChannel;
    static _curbgm: string; //当前音效
    static MUSICPAUSE: boolean = false;
    static SOUNDSTOP: boolean = false;
    constructor() {

    }

    // AudioManager.playMusic("sound/bgm_login.mp3");
    // AudioManager.playMusic("sound/battle_bgm2.mp3");
    // AudioManager.playMusic("sound/battle_bgm3.mp3");
    // AudioManager.playMusic("sound/bgmusic1.mp3");
    // AudioManager.playMusic("sound/bgmusic.mp3");
    //播放音乐
    public static playMusic(path: string = "sound/battle_bgm3.mp3"): void {
        if (!AudioMgr.MUSICPAUSE) {
            try {
                if (AudioMgr._curbgm != path) {
                    if (AudioMgr._soundChannel)  {
                        AudioMgr._soundChannel.stop();
                    }
                    AudioMgr._curbgm = path;
                    AudioMgr._soundChannel = SoundManager.playMusic(path, 0);
                    // SoundManager.setMusicVolume(0.8);
                }
            } catch (error) {

            }
        }
    }

    public static setPlayRate(val) {
        try {
            SoundManager.playbackRate = val;
        } catch (error) {

        }
    }

    //暂停背景音乐
    public static pauseMusic(): void  {
        if (AudioMgr._soundChannel)  {
            AudioMgr._soundChannel.pause();
            AudioMgr.MUSICPAUSE = true;
        }
    }

    //停止背景音乐
    public static stopMusic(): void  {
        if (AudioMgr._soundChannel)  {
            AudioMgr._soundChannel.stop();
        }
    }

    //继续背景音乐
    public static resumeMusic(): void  {
        if (AudioMgr._soundChannel)  {
            AudioMgr._soundChannel.resume();
        }
    }

    //播放音效
    public static playSound(path: string = "sound/button.mp3"): void {
        if (!AudioMgr.SOUNDSTOP)  {
            try {
                SoundManager.playSound(path, 1);
            } catch (error) {

            }
        }

    }

    //停止音效
    public static StopSound(path: string): void {
        if (!path || path == "") return;
        if (!AudioMgr.SOUNDSTOP)  {
            try {
                SoundManager.stopSound(path);
            } catch (error) {

            }
        }

    }

    public static pauseSound(): void  {
        SoundManager.stopAllSound();
        AudioMgr.SOUNDSTOP = true;
    }
}