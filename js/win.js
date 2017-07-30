var winState = {
    create: function(){
        // set fail timer to 0, so a refresh works as if from start
        localStorage.setItem("turtlegames_localstoragetimer", 0);

        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundwin');
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        placeholdertext = game.add.text(50,50,"GAME OVER ", style);

        button = game.add.button(game.world.centerX, game.world.height * .8, 'buttonrestart', actionOnClick, this, 1, 0, 2);
        button.onInputUp.add(this.backtostart, this);
    },

    backtostart: function(){
        game.state.start('menu');
    }

};
