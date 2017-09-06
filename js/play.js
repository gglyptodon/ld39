var speed;
var speedmod = 1;
var canjump = true;

var playState = {
    resmd5: [],
    numInputs: 4,
    powerbarState: 100,

    updatePowerbar: function(){
        this.powerbarState -= 7;
    },
    explode: function(){
    
      explosion = explosions.getFirstExists(false);
      explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
      explosion.body.velocity.y = player.body.velocity.y;
      explosion.alpha = 0.7;
      explosion.play('explosion', 30, false, true);
     //shapeshift(player, choice(shape_choices));
      player.body.velocity.y = -800;
      speed = -speed*10;
      this.powerbarState = 0.1;

  //  blockedlayer.kill(); todo, select blocks under explosion
    
    },

    sleep: function (duration){
        now = new Date().getTime();
        while(new Date().getTime() < now + duration){ /* do nothing */ } 
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
        for (var i =0 ; i<Math.random()*(1-1)+1;i++){
            var arrayToShuffle = [0, 1, 1, 2, 2, 3];
            //arrayToShuffle = [0,1,3]; //uncomment to test without exploding
            box1 = chargeboxes.create(900, game.world.height - 128, 'recharge');
            //box1 = chargeboxes.create(20*i+Math.random() * (800 - 60) +  60, game.world.height - 128, 'recharge');
            box1.animations.add('all', shuffleArray(arrayToShuffle), 10, true);
            box1.animations.play('all', 0+Math.random() * (6 - 0) + 0, true);
            box2 = chargeboxes.create(-900, game.world.height - 128, 'recharge');
            box2.animations.add('all', shuffleArray(arrayToShuffle), 10, true);
            box2.animations.play('all', 0+Math.random() * (6 - 0) + 0, true);

        }
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
                    speed+=10;
                    }
                else {
                    this.powerbarState = 100;
                }
                break;
            case 2:
                this.explode();
                hallo_snd.play();
                explode_snd.play();
                

                break;
            case 3:
                break;

        }
    },
    create: function(){
        speed = 15;
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
         //  An explosion pool
    explosions = game.add.group();
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE;
    explosions.createMultiple(30, 'explosion');
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);
    explosions.forEach( function(explosion) {
        explosion.animations.add('explosion');
    });

        score_font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        var gameover_txt = game.add.image(500,  16, gameover_font);
        var score_txt = game.add.image(0, 16, score_font);
        score_txt.fixedToCamera = true;
        gameover_txt.fixedToCamera = true;

        // setting up input (that I'm not sure if we still use???)
        cursors = game.input.keyboard.createCursorKeys();

        // the grass (essentially as bg)
        grass = game.add.tileSprite(-800, game.world.height - 75, game.world.width * 3, 15, 'grass');
        // the ground
        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(-800, game.world.height - 60, 'ground');
        ground.body.immovable = true;

        hurdle = platforms.create(1200, game.world.height - 128, 'hurdle');
        hurdle.body.immovable = true;

        // water pit
        pit = game.add.sprite(6000 + hurdle.width, game.world.height - ground.height - 9, 'pit');
        //pit.enableBody = true;
        game.physics.arcade.enable(pit);
        // charge boxes prep
        chargeboxes = game.add.group();
        chargeboxes.enableBody = true;

        // the first recharge
        box1 = chargeboxes.create(640, game.world.height - 128, 'recharge');

        box1.animations.add('all', [0, 1, 2, 3], 10, true);
        box1.animations.play('all', 2, true);

        box2 = chargeboxes.create(-440, game.world.height - 128, 'recharge');

        box2.animations.add('all', [0, 1, 2, 3], 10, true);
        box2.animations.play('all', 2, true);
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

            var moveleftright = function(e) {
               run_snd.play();
               tomove = speed;
               tomove *= speedmod;

               if ([39,68].indexOf(e.keyCode) >= 0){
                   tomove *= -1;
                   player.animations.play('right');
               }else{
                   player.animations.play('left');
               }

               // move ground 
               // todo, group for non-interacting movables
               grass.x = grass.x + tomove;
               pit.x = pit.x + tomove;

               for (platidx in platforms.children){
                   platform = platforms.children[platidx];
                   platform.x += tomove;
               }

               // recenter as necessary
               if (ground.x >= 0 | ground.x <= -1600){
                   ground.x = -800;

               }
               if (grass.x >= 0 | grass.x <= -1600){
                   grass.x = -800;

               }
               if (hurdle.x > 1600){
                  hurdle.x = -800;
                  console.log('hurdle down');
               }else if (hurdle.x < -800){
                  hurdle.x = 1600;
                  console.log('hurdle up');
               }
               if (pit.x > 6400){
                  pit.x = -800;
                  hurdle.x = -800;
               }else if (pit.x < -800){
                  pit.x = 6400;
                  hurdle.x = 1600;
               }
               // move boxes
               for (cbox in chargeboxes.children){
                   chargebox = chargeboxes.children[cbox];
                   chargebox.x += tomove;
               };

            };
            
            if ([37,39,65,68].indexOf(e.keyCode) >= 0){
               moveleftright(e);
               score +=1;
            }
           
        };

    },
    slow: function(){
      console.log('slow');
      //canjump = false; // entertaining idea if the 
      speedmod = 0.4;
      var outside2left = player.body.x < pit.x;
      var outside2right = (player.body.x + player.body.width) > (pit.x + pit.width);
      if (outside2left || outside2right){
      }else{
        canjump = false;
      }
    },
    update: function(){
        //console.log(speed);
        powerbar.width = this.powerbarState;
        powerbar.x = player.x;
        powerbar.y = player.y - 40;

        var hitPlatform = game.physics.arcade.collide(player, platforms);
//        game.physics.arcade.collide(platforms, platforms);


        score_font.text = "Score: "+score;

        //  Reset the players velocity (movement)
        game.physics.arcade.overlap(player, platforms, this.stopPlayer, null, this);

        game.physics.arcade.overlap(player, chargeboxes, this.collectItem, null, this);
        speedmod = 1;
        canjump = true;
        game.physics.arcade.overlap(player, pit, this.slow, null, this);
    
       
        //  Allow the player to jump if they are touching the ground.
        wdown = game.input.keyboard.isDown(Phaser.Keyboard.W);
        spacedown = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
        wanna_jump = (wdown | spacedown | cursors.up.isDown);
        if (wanna_jump && player.body.touching.down && hitPlatform && canjump)
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
