/**
 * @description web 音频播放
 */
class AudioManager {

    private _context: AudioContext;
    private _source: AudioBufferSourceNode;

    constructor() {
        this._context = new AudioContext();
        this._source = this._context.createBufferSource();
    }
    
    /**
     * 加载
     * @param url 音频地址
     * @returns ArrayBuffer
     */
    public load(url: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.responseType = 'arraybuffer';
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(xhr.response);
                }
            }
            xhr.send();
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