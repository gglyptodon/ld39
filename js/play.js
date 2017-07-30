

var playState = {
    resmd5: [],
    numInputs: 4,
    powerbarState: 100,

    updatePowerbar: function(){
        this.powerbarState -= 7;
    },
    spawnBox: function(){
        var shuffleArray = function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
        box1 = chargeboxes.create(760+Math.random() * (70 - 10) + 10, game.world.height - 128, 'recharge');

        box1.animations.add('all', shuffleArray([0,1, 1, 2, 2, 3]), 10, true);
        box1.animations.play('all', 0+Math.random() * (6 - 0) + 0, true);

    },
    stopPlayer: function(player, platform){
        if (player.x < platform.x){
            player.x = platform.x - player.width;
        }else{
            player.x = platform.x + platform.width;
        }
    },
    collectItem: function(player, item){

        item.kill();

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
        var score_txt = game.add.image(0, 16, score_font);
        score_txt.fixedToCamera = true;
        gameover_txt.fixedToCamera = true;

        // setting up input (that I'm not sure if we still use???)
        cursors = game.input.keyboard.createCursorKeys();
        // the ground
        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(-800, game.world.height - 60, 'ground');
        ground.body.immovable = true;

        var hurdle = platforms.create(1200, game.world.height - 128, 'hurdle');
        ground.body.immovable = true;

        // charge boxes prep
        chargeboxes = game.add.group();
        chargeboxes.enableBody = true;

        // the first recharge
        box1 = chargeboxes.create(740, game.world.height - 128, 'recharge');

        box1.animations.add('all', [0, 1, 2, 3], 10, true);
        box1.animations.play('all', 2, true);

        // create our player
        player = game.add.sprite(game.world.width / 2, game.world.height - ground.body.height *2.1, 'tortuga_small');
        game.physics.arcade.enable(player);
    
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
    
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1], 10, true);
        player.animations.add('right', [2, 3], 10, true);


        score = 0;
         //  Create our Timer
        timer = game.time.create(false);
        timer.loop(1000, this.updatePowerbar, this);
        timer.start();

        powerbar = game.add.sprite(player.x,player.y-20,"powerbar");
        powerbar.width = this.powerbarState;


        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        // headers
        var header_y = 50;

        // setup movement
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode);
            console.log('wat');
            var speed = 15;
            var moveleftright = function(e) {
               run_snd.play();
               if ([39,68].indexOf(e.keyCode) >= 0){
                   speed *= -1;
                   player.animations.play('right');
               }else{
                   player.animations.play('left');
               }

               // move ground
               //ground.x = ground.x + speed;
               for (platidx in platforms.children){
                   platform = platforms.children[platidx];
                   platform.x += speed;
               }

               // recenter as necessary
               if (ground.x >= 0 | ground.x <= -1600){
                   ground.x = -800;

               }
               if (hurdle.x > 1200){
                  hurdle.x = -1200;
                  console.log('hurdle down');
               }else if (hurdle.x < -1200){
                  hurdle.x = 1200;
                  console.log('hurdle up');
               }
               // move boxes
               for (cbox in chargeboxes.children){
                   chargebox = chargeboxes.children[cbox];
                   chargebox.x += speed;
               };

            };
            
            if ([37,39,65,68].indexOf(e.keyCode) >= 0){
               moveleftright(e);
               score +=1;
            }
           
        };

    },
    update: function(){

        powerbar.width = this.powerbarState;
        powerbar.x = player.x;
        powerbar.y = player.y - 40;

        var hitPlatform = game.physics.arcade.collide(player, platforms);

        score_font.text = "Score: "+score;

        //  Reset the players velocity (movement)
        game.physics.arcade.overlap(player, platforms, this.stopPlayer, null, this);

        game.physics.arcade.overlap(player, chargeboxes, this.collectItem, null, this);

    
       
        //  Allow the player to jump if they are touching the ground.
        wdown = game.input.keyboard.isDown(Phaser.Keyboard.W);
        if ((cursors.up.isDown | wdown) && player.body.touching.down && hitPlatform)
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
