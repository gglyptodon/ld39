var winState = {
    create: function(){
        // set fail timer to 0, so a refresh works as if from start
        localStorage.setItem("escapepot_localstoragetimer", 0);

        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundwin');
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        placeholdertext = game.add.text(50,50,"Whaaa?? you mixed your\npotion correctly\nsomething exciting\nhappens and\nyou're free", style);

        button = game.add.button(game.world.centerX/2, 400, 'buttonrestart', actionOnClick, this, 1, 0, 2);
        button.onInputUp.add(this.backtostart, this);
    },

    backtostart: function(){
        game.state.start('menu');
    }

};