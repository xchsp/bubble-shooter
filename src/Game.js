import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Logger from './utils/Logger';
import Bubble from './entities/Bubble';
import Sprite from './entities/Sprite';
import Colors from './utils/Colors';
import {ROWS, COLUMNS, BUBBLE_DIAMETER, BUBBLE_OFFSET} from './utils/Constants';

class Game extends Phaser.Game {
    constructor(width, height) {        
        super({
            width,
            height,
            renderer: Phaser.AUTO,
            state: {
                preload: () => {
                    Logger.logState('PRELOAD');
                    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.scale.pageAlignHorizontally = true;
                    this.scale.pageAlignVertically = true;
                    this.stage.backgroundColor = '#fff';
                },
                create: () => {
                    Logger.logState('CREATE');
                    this.physics.startSystem(Phaser.Physics.ARCADE);
                    this.physics.setBoundsToWorld();
                    
                    for(let i = 0; i < ROWS; i++) {
                        for(let j = 0; j < COLUMNS; j++) {
                            if(i % 2 !== 0 && j === COLUMNS - 1) continue;
                            let x = i % 2 !== 0 ? j * BUBBLE_DIAMETER + BUBBLE_DIAMETER : j * BUBBLE_DIAMETER + BUBBLE_OFFSET;
                            let y = i * BUBBLE_DIAMETER + BUBBLE_OFFSET;
                            let s = new Sprite(this, x, y);
                            s.spritify(new Bubble(this, BUBBLE_DIAMETER, Colors.green));
                            this.add.existing(s);
                            this.physics.enable(s, Phaser.Physics.ARCADE);
                            s.setCollisionDetection();
                        }
                    }
                    // s.body.velocity.set(100, 0);
                    // for(var i = 0; i < 20; i++) {
                    //     this.add.existing(new Bubble(this, 20 * i + 1, 20 * i + 1, 24, Colors.red));
                    // }
                }
            }
        });        
    }        
}

export default Game;