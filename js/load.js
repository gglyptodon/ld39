var loadState = {
    preload: function(){
        // buttons
        game.load.spritesheet('buttonmenu', 'assets/btn/button_menu.png', 96, 32);
//        game.load.spritesheet('buttonredo', 'assets/btn/button_redo.png', 96, 32);
        game.load.spritesheet('buttonrestart', 'assets/btn/button_restart.png', 96, 32);
        game.load.spritesheet('buttonmix', 'assets/btn/button_mix.png', 96, 32);
        //
        //game.load.spritesheet('cw', 'assets/btn/cw.png', 32, 32);
        //game.load.spritesheet('ccw', 'assets/btn/ccw.png', 32, 32);

        // backgrounds
        game.load.image('backgroundmenu','assets/img/bg_menu.png');
//        game.load.image('backgroundredo','assets/img/bg_redo.png');
        game.load.image('backgroundwin', 'assets/img/bg_win.png')
        game.load.image('backgroundplay', 'assets/img/bg_play.png')
        // load fonts
        game.load.image('knightHawks', 'assets/fonts/KNIGHT3.png');


        // sprite sheets for characters

        game.load.spritesheet('tortuga_small', 'assets/img/tortuga_small.png', 68, 47);

        //items
        game.load.spritesheet('recharge', 'assets/img/recharge.png', 68, 68);
        game.load.image('ground', 'assets/img/ground.png');
        game.load.image("powerbar","assets/img/powerbar.png");
        //music and soundFX TODO
        //game.load.audio('bgmusic', ['assets/sounds/bgmusic.ogg']);
        game.load.audio('recharge_snd', ['assets/sounds/recharge_snd.ogg']);
        game.load.audio('battery_snd', ['assets/sounds/battery_snd.ogg']);
        game.load.audio('run_snd',['assets/sounds/run_snd.ogg']);
        game.load.audio('boing_snd',['assets/sounds/boing_snd.ogg']);
        //game.load.audio('reachstop_snd',['assets/sounds/reachstop_snd.ogg']);
        //game.load.audio('gameover_snd',['assets/sounds/gameover_snd.ogg']);
        //game.load.audio('gamestart_snd',['assets/sounds/gamestart_snd.ogg']);
        game.load.audio('explode_snd',['assets/sounds/explosion_snd.ogg']);
        game.load.audio('hallo_snd', ['assets/sounds/hallo_snd.ogg']);
    },

    create: function(){
        game.state.start('menu');

    }
};
