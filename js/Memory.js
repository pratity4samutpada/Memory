
var Memory = function(level){
    this.theme = [["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"],
        ["7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg"]];
    this.currentTheme = [].concat.apply([], this.theme.slice(0,level+1))
    this.gameArray = [];
    this.counter = 0;
    this.endAt = this.currentTheme.length;
    this.wrong = 0;
    this.init = function(){
        this.randomize(this.currentTheme);
        this.placeCards(this.gameArray);
    }
};

Memory.prototype = {
  randomize: function(currentTheme){

      var newGameArray = [];
        for(var i = 0; i < currentTheme.length; i++){
            newGameArray.push(currentTheme[i]);
            newGameArray.push(currentTheme[i]);
        }console.log(newGameArray);

      var length = newGameArray.length;
      while(length--){
          var rand = Math.floor((Math.random() * newGameArray.length));
          this.gameArray.push(newGameArray[rand]);
          newGameArray.splice(rand,1);
      }

  },
   placeCards: function(gameArray){
       alert(gameArray);
    //creates a new display of divs with all of the images from the array in the randomized order.
   //assigns the event listeners connected to other functions in this prototype.
   //"conceals" the cards. All cards come with this class "concealed", clicking removes the .concealed class. (background image?)
   },
    memoryGame: function(){
        //Function to be associated with event listeners on all cards. On click of first card, the card clicked is displayed
        //for an indefinite period. When the second card is clicked, if the cards did not match, a timer is set for two seconds
        //and then the cards are concealed again after that time. When the user gets a successful match, the cards remain displayed
        //When the second click happens, the event listeners are removed for the duration of the timer and replaced once again.
        //The counter is added to on each match. Once the counter === endAt, the game is over.
    }
};


var newGame = new Memory(0);
newGame.init();
