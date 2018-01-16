function nextElement () {
    var lastInArray = arrayOfId.indexOf(arrayOfId.length - 1);
    arrayOfId.push(lastInArray + 1);
    console.log(lastInArray);
}
var arrayOfId = [];
