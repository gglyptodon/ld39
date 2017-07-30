var menuState = {
    startup: function(){
        game.state.start('play');
    },

    create: function(){

        game.stage.backgroundColor = '#555555';
        console.log("menu")

        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundmenu');

        button = game.add.button(game.world.centerX, game.world.height * .9, 'buttonmenu', actionOnClick, this, 1, 0, 2);

        button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(this.startup, this);

        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        placeholdertext = game.add.text(50,50,"TURTLE GAMES \nclick button to start", style);
        var style_sm = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        instructionstext = game.add.text(50, 210, 
                                         "- mash arrow keys to move (and/or WASD)\n- collect battery swaps and charges to keep your power high\n- watch out for mine turtles", 
                                         style_sm)
    }

};
