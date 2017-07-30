

var playState = {
//    ingredientTxt: [],
//    ingredientBtnCW: [],
//    ingredientBtnCCW: [],
//    ingredientDir: [],
//    ingredientTimes: [],
    resmd5: [],
    numInputs: 4,
    powerbarState: 100,

    create: function(){

        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundplay');
        cursors = game.input.keyboard.createCursorKeys();
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
    
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        // Here we create the ground.
        var ground = platforms.create(-800, game.world.height - 60, 'ground');
 
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;


        player = game.add.sprite(game.world.width / 2, game.world.height - ground.body.height *2.1, 'tortuga_small');
        powerbar = game.add.sprite(player.x,player.y-20,"powerbar");
        powerbar.width = this.powerbarState;
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
    
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
    
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1], 10, true);
        player.animations.add('right', [2, 3], 10, true);
        //add the power bar just above the head of the hero

        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        // headers
        var header_y = 50;
        //ingredientHeader = game.add.text(50,header_y,"ingredient", style);
        //directionHeader = game.add.text(200, header_y, "stir cw/ccw", style);
        //timesHeader = game.add.text(350, header_y, "times to stir (0-9999)", style);

        //button = game.add.button(game.world.centerX/2, 400, 'buttonmix', actionOnClick, this, 1, 0, 2);
        //button.onInputUp.add(this.submit, this);

        game.add.plugin(PhaserInput.Plugin);
        game.input.keyboard.onUpCallback = function (e) {
            var speed = 10;
            var moveleft = function(e) {
               console.log(e.keyCode, "from moveleft");
               ground.x = ground.x + speed;
               player.animations.play('left');
               if (ground.x >= 0){
                   ground.x = -800;
               }
               console.log(ground.x);
            };
            var moveright = function(w) {
               ground.x = ground.x - speed;
               player.animations.play('right');
               if (ground.x <= -1600){
                   ground.x = -800;
               }
            };
            // These can be checked against Phaser.Keyboard.UP, for example.
            console.log(e.keyCode);
            if (e.keyCode == 37){
               moveleft(e);
            }else if (e.keyCode == 39){
               moveright();
            }
           
        };

    },
    update: function(){
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        //  Reset the players velocity (movement)
    
       
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }

    }
//    toggleCW: function(index){
//        this.ingredientDir[index] = 0;
//        console.log(this.ingredientDir, index);
//        // re-color buttons
//        this.ingredientBtnCW[index].setFrames(2, 0, 0);
//        this.ingredientBtnCCW[index].setFrames(2, 1, 0);
//
//    },
//
//    toggleCCW: function(index){
//        this.ingredientDir[index] = 1;
//        this.ingredientBtnCW[index].setFrames(2, 1, 0);
//        this.ingredientBtnCCW[index].setFrames(2, 0, 0);
//
//
//    },
//
//    submit: function(){
//        if (this.are_inputs_valid()){
//            game.state.start('win');
//        }else{
//            game.state.start('redo');
//        }
//    },
//
//    are_inputs_valid: function(){
//        var isCorrect = true;
//        // set pass values below
//        var pass_vals = ["c4ca4238a0b923820dcc509a6f75849b", "c4ca4238a0b923820dcc509a6f75849b", "cfcd208495d565ef66e7dff9f98764da", "c4ca4238a0b923820dcc509a6f75849b"]
//         //i1...item4
//
//
//        var hashed_inputs = [];
//        for (i = 0; i < this.numInputs; i++) {
//            hashed_inputs[i] = CryptoJS.MD5(this.ingredientTxt[i].value+this.ingredientDir[i]+this.ingredientTimes[i].value).toString();
//            this.resmd5[i] = hashed_inputs[i];
//            if (hashed_inputs[i].toString() != pass_vals[i]){
//                 isCorrect = false
//            }
//        }
//        console.log(this.resmd5);
//        return isCorrect;
//    }
};
