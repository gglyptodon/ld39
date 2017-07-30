var loadState = {
    preload: function(){
        // buttons
        game.load.spritesheet('buttonmenu', 'assets/btn/button_menu.png', 96, 32);
        game.load.spritesheet('buttonredo', 'assets/btn/button_redo.png', 96, 32);
        game.load.spritesheet('buttonrestart', 'assets/btn/button_restart.png', 96, 32);
        game.load.spritesheet('buttonmix', 'assets/btn/button_mix.png', 96, 32);
        // stir direction buttons
        game.load.spritesheet('cw', 'assets/btn/cw.png', 32, 32);
        game.load.spritesheet('ccw', 'assets/btn/ccw.png', 32, 32);

        // backgrounds
        game.load.image('backgroundmenu','assets/img/bg_menu.png');
        game.load.image('backgroundredo','assets/img/bg_redo.png');
        game.load.image('backgroundwin', 'assets/img/bg_win.png')
        game.load.image('backgroundplay', 'assets/img/bg_play.png')

    },

    create: function(){
        game.state.start('menu');

    }
};