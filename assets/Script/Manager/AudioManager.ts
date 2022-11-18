import { mXhr } from "./XHRManager";

/**
 * @description web 音频播放
 */
class AudioManager {

    private _context: AudioContext;
    private _source: AudioBufferSourceNode;
    
    /**
     * 加载
     * @param name 音乐名称
     * @returns ArrayBuffer
     */
    public load(name: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const req: IXHRReq = {
                url: AUDIO_DOMAIN + '/' + name,
                method: 'get',
                responseType: 'arraybuffer',
                success: (data: ArrayBuffer) => {
                    this._context = new AudioContext();
                    this._source = this._context.createBufferSource();
                    resolve(data);
                }
            }
            mXhr.send(req);
        })
    }

    /**
     * ArrayBuffer to AudioBuffer
     * @param arrayBuffer 
     */
    public bufferToAduio(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
        return new  Promise((resolve, reject) => {
            const success = (data) => {
                resolve(data);
            };
            const fail = () => {
                reject(null);
            };
            this._context.decodeAudioData(arrayBuffer, success, fail);
        });
    }

    /**
     * 播放
     * @param audioBuffer
     */    
    public play(audioBuffer: AudioBuffer): void {
        if (!this._context || this._context.state == 'running') { return; }
        this._source.buffer = audioBuffer;
        this._source.connect(this._context.destination);
        this._source.start();
    }

    /**
     * 暂停
     */
    public pause(): void {
        if(!this._context) { return; }
        this._context.suspend();
    }

    /**
     * 恢复
     */
    public resume(): void {
        if (!this._context || this._context.state == 'running') {
            return;
        }
        if (this._context.state == 'suspended') {
            this._context.resume();
        } else {
            //todo
        }
    }

    /**
     * 设置播放速度
     */
    public setRate(r: number): void {
        if (!this._context) { return; }
        this._source.playbackRate.value = r;
    }
}
export const mAudio = new  AudioManager();
const AUDIO_DOMAIN = 'http://172.16.11.229:7894'