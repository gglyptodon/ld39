

var playState = {
    ingredientTxt: [],
    ingredientBtnCW: [],
    ingredientBtnCCW: [],
    ingredientDir: [],
    ingredientTimes: [],
    resmd5: [],
    numInputs: 4,
    create: function(){
        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundplay');

        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        // headers
        var header_y = 50;
        ingredientHeader = game.add.text(50,header_y,"ingredient", style);
        directionHeader = game.add.text(200, header_y, "stir cw/ccw", style);
        timesHeader = game.add.text(350, header_y, "times to stir (0-9999)", style);

        button = game.add.button(game.world.centerX/2, 400, 'buttonmix', actionOnClick, this, 1, 0, 2);
        button.onInputUp.add(this.submit, this);

        game.add.plugin(PhaserInput.Plugin);

        for (i = 0; i < this.numInputs; i++) {
            var j = i+1;
            var spacing = 90;
            this.ingredientTxt[i] = game.add.inputField(10, spacing*j);
            // button sprite frame numbers on end are over, out, down
            this.ingredientBtnCW[i] = game.add.button(game.world.centerX/2, spacing*j, 'cw', actionOnClick, this, 2, 0, 0);

            this.ingredientBtnCW[i].onInputUp.add(this.toggleCW.bind(this,i), this);
            this.ingredientBtnCCW[i] = game.add.button(game.world.centerX/2+50, spacing*j, 'ccw', actionOnClick, this, 2, 1, 0);

            this.ingredientBtnCCW[i].onInputUp.add(this.toggleCCW.bind(this,i), this);

            this.ingredientDir[i] = 0 ;
            this.ingredientTimes[i] =  game.add.inputField(350, spacing*j);
        }

    },
    toggleCW: function(index){
        this.ingredientDir[index] = 0;
        console.log(this.ingredientDir, index);
        // re-color buttons
        this.ingredientBtnCW[index].setFrames(2, 0, 0);
        this.ingredientBtnCCW[index].setFrames(2, 1, 0);

    },

    toggleCCW: function(index){
        this.ingredientDir[index] = 1;
        this.ingredientBtnCW[index].setFrames(2, 1, 0);
        this.ingredientBtnCCW[index].setFrames(2, 0, 0);


    },

    submit: function(){
        if (this.are_inputs_valid()){
            game.state.start('win');
        }else{
            game.state.start('redo');
        }
    },

    are_inputs_valid: function(){
        var isCorrect = true;
        // set pass values below
        var pass_vals = ["c4ca4238a0b923820dcc509a6f75849b", "c4ca4238a0b923820dcc509a6f75849b", "cfcd208495d565ef66e7dff9f98764da", "c4ca4238a0b923820dcc509a6f75849b"]
         //i1...item4


        var hashed_inputs = [];
        for (i = 0; i < this.numInputs; i++) {
            hashed_inputs[i] = CryptoJS.MD5(this.ingredientTxt[i].value+this.ingredientDir[i]+this.ingredientTimes[i].value).toString();
            this.resmd5[i] = hashed_inputs[i];
            if (hashed_inputs[i].toString() != pass_vals[i]){
                 isCorrect = false
            }
        }
        console.log(this.resmd5);
        return isCorrect;
    }
};