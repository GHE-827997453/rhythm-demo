import { mLevel } from "./Manager/LevelManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    protected onLoad(): void {
        console.log('on load....');
    }

    start () {
        console.log('start....');
        mLevel.init();
    }
}
