var Memory = function (level) {
    this.difficulty = level || 0;
    this.theme = [["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
        ["7.jpg", "8.jpg"], ["9.jpg", "10.jpg", "11.jpg", "12.jpg"]];
    this.difficulties = ["Easy", "Medium", "Hard"];
    this.currentTheme = [].concat.apply([], this.theme.slice(0, this.difficulty + 1));
    this.gameArray = [];
    this.counter = 0;
    this.endAt = this.currentTheme.length;
    this.clickedOn2 = false;
    this.init = function () {
        this.makeNavBar();
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

    start: function () {
        this.randomize(this.currentTheme);
        this.makeGameElements();


    },

    makeNavBar: function () {//Make navbar.
        var navBarMain = document.getElementById("navbar");
        var navbar = QuickDOM.mkBsElement("nav", "navbar navbar-inverse");
        navBarMain.appendChild(navbar);
        var container = QuickDOM.mkBsElement("div", "container-fluid");
        navbar.appendChild(container);
        var header = QuickDOM.mkBsElement("div", "navbar-header");
        container.appendChild(header);
        var gameName = QuickDOM.mkBsElement("div", "navbar-brand");
        header.appendChild(gameName);
        gameName.innerHTML = "Memory: The Game";
        var button = QuickDOM.mkBsElement("button", "btn btn-success navbar-btn");
        container.appendChild(button);
        button.innerHTML = "New Game";
        button.addEventListener("click", this.newMemoryGame);
        QuickDOM.mkRadio(container, this.theme.length, this.difficulties);
    },

    makeGameElements: function () {
        //Make overlay for game over.
        var gameOver = document.getElementById("gameOver");
        var gameOverDiv = QuickDOM.mkBsElement("div", "#gameOverDiv");
        gameOver.appendChild(gameOverDiv);
        var restart = QuickDOM.mkBsElement("button", "btn btn-success");
        gameOverDiv.appendChild(restart);
        restart.innerHTML = "New Game";
        restart.addEventListener("click", this.newMemoryGame);
        QuickDOM.mkRadio(gameOverDiv, this.theme.length, this.difficulties);


        var cardHolder = QuickDOM.mkBsElement("container", "#cardHolder");
        memoryContainerMain.appendChild(cardHolder);
        var row = QuickDOM.mkBsElement("div", "row row-centered");
        cardHolder.appendChild(row);
        for (var j = 1; j <= (this.gameArray.length); j++) {
            if(this.difficulty>1){
                var cardCol = QuickDOM.mkBsElement("div", "col-xs-2 col-centered gameCardDiv");
            }else{
                var cardCol = QuickDOM.mkBsElement("div", "col-xs-3 col-centered gameCardDiv");
            }
            row.appendChild(cardCol);
            var card = QuickDOM.mkBsElement("div", "gameCard");
            card.style.backgroundImage = "url(images/texture2.jpg)";
            card.addEventListener("click", this.memoryGame.bind(this));
            card.addEventListener("click", this.changeImg.bind(this));
            cardCol.appendChild(card);
        }
        var cards = document.querySelectorAll(".gameCard");
        for (var i = 0; i < cards.length; i++) {
            cards[i].value = this.gameArray[i].substring(0, this.gameArray[i].indexOf("."));
        }

    },


    memoryGame: function (e) {
        if (this.clickedOn2) {
            return;
        }
        var target = e.target;
        target.classList.add("clicked");
        var clicked = document.querySelectorAll(".clicked");
        if (clicked.length > 1 && clicked[0]["value"] == clicked[1]["value"]) {
            for (var i = 0; i < clicked.length; i++) {
                clicked[i].classList.add("answered");
                clicked[i].classList.remove("clicked");

            }
            this.counter++;
            this.counter === this.endAt ? QuickDOM.gameOverToggle() : this.clickedOn2 = false;

        }


    },
    changeImg: function (e) {
        var self = this;
        if (this.clickedOn2) {
            return;
        }
        var clicked = e.target;
        clicked.style.backgroundImage = "url(images/" + parseInt(clicked["value"]) + ".jpg)";
        var allClicked = document.querySelectorAll(".clicked");
        if (allClicked.length > 1 && !(clicked.classList.contains("answered"))) {
            this.clickedOn2 = true;
            setTimeout(function () {
                for (var i = 0; i < allClicked.length; i++) {
                    allClicked[i].style.backgroundImage = "url(images/texture2.jpg)";
                    allClicked[i].classList.remove("clicked");

                }
                self.clickedOn2 = false;


            }, 1500);
        }
    },
    newMemoryGame: function () {
        var flipped = document.querySelectorAll(".answered");
        var gameOver = document.getElementById("gameOver");
        if (flipped.length===this.endAt || gameOver.classList.contains("onScreen") ){
            QuickDOM.gameOverToggle();
        }
        var x = parseInt(document.querySelector('input[name="difficulty"]:checked').value);
        var oldGame = document.getElementById("memoryContainerMain");
        oldGame.innerHTML="";
        var newGame = new Memory(x);
        newGame.start();
    }


};


var temporary = new Memory();
temporary.init();


