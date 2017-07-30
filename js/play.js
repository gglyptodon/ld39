

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
    spawnBox: function(){
            box1 = chargeboxes.create(760+Math.random() * (70 - 10) + 10, game.world.height - 128, 'recharge');
             //box1.animations.play('all', 2, true);
             box1.animations.add('all', [0, 1, 2, 3], 10, true);
             box1.animations.play('all', 0+Math.random() * (6 - 0) + 0, true);

    },
    collectItem: function(player, item){
        //console.log("was in frame:"+item.frame); // 0 battery, 1 recharge, 2 mine , 3 empty
        item.kill();
        //console.log("collect");

        this.spawnBox();
        switch (item.frame){
            case 0:
                this.powerbarState = 100;
                battery_snd.play();
            case 1:
                recharge_snd.play();
                if (this.powerbarState + 20 <= 100){
                    this.powerbarState += 20;
                    }
                else {
                    this.powerbarState = 100;
                }
                break;
            case 2:
                hallo_snd.play();
                explode_snd.play();
                this.powerbarState = 0;

                break;
            case 3:
                break;

        }
    },
    create: function(){

        time_font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        gameover_font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);

        bgmusic = game.add.audio('bgmusic');
        bgmusic.play();
        boing_snd = game.add.audio('boing_snd');
        run_snd = game.add.audio('run_snd');
        recharge_snd = game.add.audio('recharge_snd');
        battery_snd = game.add.audio('battery_snd');
        explode_snd = game.add.audio('explode_snd');
        hallo_snd = game.add.audio('hallo_snd');


        score_font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        var gameover_txt = game.add.image(500,  16, gameover_font);
        var score_txt = game.add.image(0, 16, score_font);//'score: 0', { fontSize: '32px', fill: '#000' });
        score_txt.fixedToCamera = true;
        gameover_txt.fixedToCamera = true;

        //background = game.add.tileSprite(0, 0, 800, 600, 'backgroundplay');
        cursors = game.input.keyboard.createCursorKeys();
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        chargeboxes = game.add.group();
        chargeboxes.enableBody = true;
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        // Here we create the ground.
        var ground = platforms.create(-800, game.world.height - 60, 'ground');
 
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        // the first recharge
        box1 = chargeboxes.create(740, game.world.height - 128, 'recharge');

        box1.animations.add('all', [0, 1, 2, 3], 10, true);
        //box1.animations.add('battery', [2, 3], 10, true);
        //box1.animations.add('mine', [4, 5], 10, true);
        //box1.animations.add('empty', [5,6], 10, true);
        box1.animations.play('all', 2, true);


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
            var speed = 15;
            var moveleftright = function(e) {
               run_snd.play();
               if (e.keyCode == 39){
                   speed *= -1;
                   player.animations.play('right');
               }else{
                   player.animations.play('left');
               }
               //console.log(e.keyCode, "from moveleft");
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
               //console.log(ground.x);
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
        game.physics.arcade.overlap(player, chargeboxes, this.collectItem, null, this);

    
       
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
            boing_snd.play();
            this.powerbarState -=10;

        }
        if (this.powerbarState <= 0){
            player.kill();
            console.log('no more power');
            bgmusic.stop();



            var oldhighscore = localStorage.getItem("turtlegames_highscore");
            localStorage.setItem("turtlegames_yourscore", score);
            var newscore = score;
            console.log(newscore);
            if (oldhighscore && oldhighscore != newscore){
              if (score > +oldhighscore){

                  localStorage.setItem("turtlegames_yourscore", score);
              }else{

              }
            }else {
            localStorage.setItem("turtlegames_highscore", score);

        }


            this.powerbarState = 100;
            game.state.start('win');
        }

    }
};
