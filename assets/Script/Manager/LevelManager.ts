import { ConfigLoader } from "../ConfigLoader";

class LevelManager {
    private _levels: Level;

    public init(): void {
        ConfigLoader.load<Level>('level')
        .then((data) => {
            this._levels = data;
            //enter plaza
        })
        .catch(() => {
            //show alert, exit game
        })
    }

    /**
     * 获取关卡配置信息
     * @param index 关卡索引
     * @returns 
     */
    public getLevel(index: number): ILevelPlaza[] {
        const key = `level${index}`;
        return this._levels && this._levels[key];
    }
}

export const mLevel = new LevelManager();