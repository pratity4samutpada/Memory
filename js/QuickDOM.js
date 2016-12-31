QuickDOM = {
    mkBsElement: function (elementType, elementClass) {
        var newElement = document.createElement(elementType);
        if (elementClass.substring(0, 1) === "#") {
            newElement.id = elementClass.substring(1);
        } else {
            newElement.className = (elementClass);
        }
        return newElement;

    },

    mkRadio: function (parent, array1, array2) {
        for (var i = 0; i < array1; i++) {
            var list = QuickDOM.mkBsElement("li", "list");
            parent.appendChild(list);
            var label = QuickDOM.mkBsElement("label", "lab");
            list.appendChild(label);
            var radio = QuickDOM.mkBsElement("input", "radio");
            radio.name = "difficulty";
            radio.type = "radio";
            radio.value = i;
            label.innerHTML = array2[i];
            label.appendChild(radio);
        }
    },

    gameOverToggle: function () {
        var gameOver = document.getElementById("gameOver");
        if(gameOver.classList.contains("onScreen")){
            gameOver.classList.remove("onScreen");
            gameOver.style.left="300%";

        }else{
            gameOver.classList.add("onScreen");
            gameOver.style.left=0;
        }
    }

};


