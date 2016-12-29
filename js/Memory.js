var Memory = function (level) {
    this.theme = [["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
        ["7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"]];
    this.currentTheme = [].concat.apply([], this.theme.slice(0, level + 1));
    this.gameArray = [];
    this.counter = 0;
    this.endAt = this.currentTheme.length;
    this.clickedOn1 = false;
    this.clickedOn2 = false;
    this.init = function () {
        this.randomize(this.currentTheme);
        this.makeGameElements();
    }
};

Memory.prototype = {
    randomize: function (currentTheme) {

        var newGameArray = [];
        for (var i = 0; i < currentTheme.length; i++) {
            newGameArray.push(currentTheme[i]);
            newGameArray.push(currentTheme[i]);
        }

        var length = newGameArray.length;
        while (length--) {
            var rand = Math.floor((Math.random() * newGameArray.length));
            this.gameArray.push(newGameArray[rand]);
            newGameArray.splice(rand, 1);
        }

    },

    makeGameElements: function () {
        var self=this;
        var memoryContainerMain = mkBsElement("div", "#memoryContainerMain");
        document.body.appendChild(memoryContainerMain);
        var navbar = mkBsElement("nav", "navbar navbar-inverse");
        memoryContainerMain.appendChild(navbar);
        var container = mkBsElement("div", "container-fluid");
        navbar.appendChild(container);
        var header = mkBsElement("div", "navbar-header");
        container.appendChild(header);
        var gameName = mkBsElement("div", "navbar-brand");
        header.appendChild(gameName);
        gameName.innerHTML = "Memory: The Game";
        var button = mkBsElement("button", "btn btn-success navbar-btn");
        container.appendChild(button);
        button.innerHTML = "New Game";
        button.addEventListener("click", newMemoryGame);
        var cardHolder = mkBsElement("container", "#cardHolder");
        memoryContainerMain.appendChild(cardHolder);
        var row = mkBsElement("div", "row row-centered");
        cardHolder.appendChild(row);
        for (var j = 1; j <= (this.gameArray.length); j++) {
            var cardCol = mkBsElement("div", "col-xs-3 col-centered gameCardDiv");
            row.appendChild(cardCol);
            var card = mkBsElement("div", "gameCard");
            card.style.backgroundImage = "url(images/texture.jpg)";
            card.addEventListener("click",this.changeImg.bind(this));
            // card.addEventListener("click", this.memoryGame.bind(this));
            cardCol.appendChild(card);
        }
        var cards = document.querySelectorAll(".gameCard");
        for (var i = 0; i < cards.length; i++) {
            cards[i].value = this.gameArray[i].substring(0, this.gameArray[i].indexOf("."));

        }
    },

    //creates a new display of divs with all of the images from the array in the randomized order.
    //assigns the event listeners connected to other functions in this prototype.
    //"conceals" the cards. All cards come with this class "concealed", clicking removes the .concealed class. (background image?)

    memoryGame: function (e) {
        if (document.querySelectorAll(".clicked").length > 1) {
            return;
        }
        var clicked = e.target;
        clicked.classList.add("clicked");
        clicked.style.visibility = "hidden";

        var array = document.querySelectorAll(".clicked");

        var clickedTimer = setTimeout(function () {
            for (var i = 0; i < array.length; i++) {
                array[i].classList.remove("clicked");
                array[i].style.visibility = "visible";
            }
        }, 1500);

        setTimeout(function () {
            self.clickedOn = 0;
        }, 2000);

        if (e.target["value"] === this.clickedOn) {
            this.counter++;
            for (var i = 0; i < array.length; i++) {
                array[i].classList.add("answered");
                array[i].classList.remove("clicked");
            }
            if (this.counter === this.endAt)this.gameOver = true;
            clearInterval(clickedTimer);
            this.clickedOn = 0;
        } else {
            this.clickedOn = e.target["value"];
        }

        //Function to be associated with event listeners on all cards. On click of first card, the card clicked is displayed
        //for an indefinite period. When the second card is clicked, if the cards did not match, a timer is set for two seconds
        //and then the cards are concealed again after that time. When the user gets a successful match, the cards remain displayed
        //When the second click happens, the event listeners are removed for the duration of the timer and replaced once again.
        //The counter is added to on each match. Once the counter === endAt, the game is over.
    },
    changeImg: function(e){
        var clicked = e.target;
        clicked.style.backgroundImage = "url(images/" + parseInt(clicked["value"]) + ".jpg)";
    }
};

var temporary = new Memory(0);
temporary.init();

function newMemoryGame() {
    var oldGame = document.getElementById("memoryContainerMain");
    document.body.removeChild(oldGame);
    var newGame = new Memory(0);
    newGame.init();
}
