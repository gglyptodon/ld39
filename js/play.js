

var playState = {
//    ingredientTxt: [],
//    ingredientBtnCW: [],
//    ingredientBtnCCW: [],
//    ingredientDir: [],
//    ingredientTimes: [],
    resmd5: [],
    numInputs: 4,
    powerbarState: 100,

    updatePowerbar: function(){
        this.powerbarState -=5;
    },

    create: function(){
        time_font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        boing_snd = game.add.audio('boing_snd');
        run_snd = game.add.audio('run_snd');
        score_font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        var time_txt = game.add.image(500,  16, time_font);
        var score_txt = game.add.image(0, 16, score_font);//'score: 0', { fontSize: '32px', fill: '#000' });
        score_txt.fixedToCamera = true;
        time_txt.fixedToCamera = true;

        //background = game.add.tileSprite(0, 0, 800, 600, 'backgroundplay');
        cursors = game.input.keyboard.createCursorKeys();
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        chargeboxes = game.add.group();    
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        // Here we create the ground.
        var ground = platforms.create(-800, game.world.height - 60, 'ground');
 
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        // the first recharge
        box1 = chargeboxes.create(740, game.world.height - 128, 'recharge');


        player = game.add.sprite(game.world.width / 2, game.world.height - ground.body.height *2.1, 'tortuga_small');
        score = 0;
         //  Create our Timer
        timer = game.time.create(false);
        timer.loop(1000, this.updatePowerbar, this);
        timer.start();



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
        //var score = 0;
        game.add.plugin(PhaserInput.Plugin);
        game.input.keyboard.onUpCallback = function (e) {
            var speed = 10;
            var moveleftright = function(e) {
               run_snd.play();
               if (e.keyCode == 39){
                   speed *= -1;
                   player.animations.play('right');
               }else{
                   player.animations.play('left');
               }
               console.log(e.keyCode, "from moveleft");
               // move ground
               ground.x = ground.x + speed;

               // recenter as necessary
               if (ground.x >= 0 | ground.x <= -1600){
                   ground.x = -800;
               }
               // move boxes
               for (cbox in chargeboxes.children){
                   chargebox = chargeboxes.children[cbox];
                   chargebox.x += speed;
               };
               console.log(ground.x);
            };
            // These can be checked against Phaser.Keyboard.UP, for example.
            
            if ([37,39].indexOf(e.keyCode) >= 0){
               moveleftright(e);
               score +=1;
            }
           
        };

    },
    update: function(){

        powerbar.width = this.powerbarState;
        powerbar.x = player.x;
        powerbar.y = player.y - 40;
        //console.log(this.score);
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        //time_font.text = "Time: " + total;
        score_font.text = "Score: "+score;
        //console.log(this.score);
        //  Reset the players velocity (movement)
    
       
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
            boing_snd.play();
            this.powerbarState -=10;

        }
        if (this.powerbarState <= 0){
            player.kill();





            var oldhighscore = localStorage.getItem("turtlegames_score");
            var newscore = score;


            game.state.start('win');
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
