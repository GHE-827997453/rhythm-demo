import { mAudio } from "./AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    private _progress: cc.ProgressBar;
    private _bg: cc.Node;
    private _tip: cc.Node;
    private _btnPause: cc.Node;
    private _btnResume: cc.Node;
    private _btnQuicker: cc.Node;

    private _audioBuffer: AudioBuffer;
    private _ready: boolean = false;


    protected onLoad(): void {
        console.log('on load....');
        this._bg = this.node.getChildByName('bg');
        this._bg.on(cc.Node.EventType.TOUCH_START, this.gameStart, this);
        this._tip = this._bg.getChildByName('tip');

        this._progress = this.node.getChildByName('progressBar').getComponent(cc.ProgressBar);
        this._progress.progress = 0;

        this._btnPause = this.node.getChildByName('btn_pause');
        this._btnPause.on(cc.Node.EventType.TOUCH_END, this.clickPause, this);

        this._btnResume = this.node.getChildByName('btn_resume');
        this._btnResume.on(cc.Node.EventType.TOUCH_END, this.clickResume, this);

        this._btnQuicker = this.node.getChildByName('btn_quicker');
        this._btnQuicker.on(cc.Node.EventType.TOUCH_END, this.clickQuicker, this);
    }

    async start () {
        console.log('start....');
        const tw = cc.tween(this._progress).to(1, {progress: 0.9}).start();

        const arrayBuffer = await mAudio.load('http://172.16.11.229:8000/bg.mp3');
        this._audioBuffer = await mAudio.bufferToAduio(arrayBuffer);
        if (this._audioBuffer) {
            tw.stop();
            this._progress.progress = 1;
            this._tip.active = true;
            this._ready = true;
        } else {
            alert('加载失败, 请重启游戏...');
        }
    }

    private gameStart(): void {
        if (!this._ready) { return; }
        this._bg.active = this._progress.node.active = false;
        mAudio.play(this._audioBuffer);
    }

    private clickPause(): void {
        mAudio.pause();
    }

    private clickResume(): void {
        mAudio.resume();
    }

    private clickQuicker(): void {
        mAudio.setRate(2);
    }
}
