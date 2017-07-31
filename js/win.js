var winState = {
    create: function(){

        var highscore= +localStorage.getItem("turtlegames_highscore");
        var yourscore = +localStorage.getItem("turtlegames_yourscore");

        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundwin');
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        if (yourscore >= highscore){
            placeholdertext = game.add.text(50,50,"GAME OVER \nNEW HIGHSCORE:  "+ yourscore + " \\o/", style);
            localStorage.setItem("turtlegames_highscore", yourscore);
        }
        else{
            placeholdertext = game.add.text(50,50,"GAME OVER \nOLD HIGHSCORE:  "+ highscore + "\n" + "Your Score: "+yourscore, style);
        }

        button = game.add.button(game.world.centerX, game.world.height * .9, 'buttonrestart', actionOnClick, this, 1, 0, 2);
        button.onInputUp.add(this.backtostart, this);
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode);
            if (e.keyCode == 13){
                game.state.start('menu'); // because I'm to stupid to get to scope of function
            }
        }

    },

    backtostart: function(){
        game.state.start('menu');
    }

};
