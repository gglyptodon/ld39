var timer;
var countdown;
var text;
var redoState = {
  timeToWait: 0.1*1,

  getStorageTimer: function(){
        if (localStorage.getItem("escapepot_localstoragetimer") === 0 || localStorage.getItem("escapepot_localstoragetimer") === undefined) {
            countdown = this.timeToWait;
            localStorage.setItem("escapepot_localstoragetimer", this.timeToWait);
            //console.log("reset localstorage", localStorage.getItem("escapepot_localstoragetimer") )

        }
        else{
            //console.log("local storage was not 0 / undefined", localStorage.getItem("escapepot_localstoragetimer") )
            countdown = localStorage.getItem("escapepot_localstoragetimer");

        }
  },
  update: function(){
      text.setText('Restart in ' + countdown + ' seconds');
      localStorage.setItem("escapepot_localstoragetimer", countdown);

  if (countdown == 0){
      this.displaybutton();
      timer.stop();
      localStorage.setItem("escapepot_localstoragetimer", 0);
      text.setText('Start from scratch...');
  }

  },

  explode: function(){
        console.log("time for an animation");

  },
  displaybutton: function(){
        button = game.add.button(game.world.centerX/2, 400, 'buttonredo', actionOnClick, this, 1, 0, 2);
        button.onInputUp.add(this.backtostart, this);

  },
  backtostart(){
        console.log("back to start");
        game.state.start('menu');
  },
  create: function(){
        timer = game.time.create(false);
        this.getStorageTimer();

        timer.loop(1000, function(){ countdown-- }, this);
        timer.start();

        game.stage.backgroundColor = '#555555';
        background = game.add.tileSprite(0, 0, 800, 600, 'backgroundredo');
        text = game.add.text(32, 32, '', { font: "55px Arial", fill: "#000065" });
        this.explode();

  }
};
