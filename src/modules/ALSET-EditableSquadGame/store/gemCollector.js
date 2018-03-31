import { observable, computed, extendObservable } from 'mobx';
import gemCollectorCong from '../defaultConfigs/gemCollectorCong.json';

class GemCollectorStore {
    constructor() {
    extendObservable(this, {
   characterPosition : [
        {
            x: gemCollectorCong.game.character1.startingPoint.x,
            y: gemCollectorCong.game.character1.startingPoint.y 
        },
        {
            x: gemCollectorCong.game.character2.startingPoint.x,
            y: gemCollectorCong.game.character2.startingPoint.y 
        }
    ],
    characterDirection : ['right','down'],
    time : 0,
    score : [0,0],
    mode : "play",
})
    }
}

export default new GemCollectorStore();