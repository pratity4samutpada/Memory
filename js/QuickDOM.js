
function mkBsElement(elementType, elementClass) {
    var newElement = document.createElement(elementType);
        if(elementClass.substring(0,1)==="#"){
            newElement.id = elementClass.substring(1);
        }else{
        newElement.className=(elementClass);
        }
        return newElement;

}
