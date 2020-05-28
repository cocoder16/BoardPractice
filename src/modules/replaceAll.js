export default String.prototype.replaceAll = function (prevStr, nextStr) {
    var newString = '';
    for (var i = 0; i < this.length; i++) {
        if (this[i] === prevStr) {
            newString += nextStr;
        } else {
            newString += this[i];
        }
    }
    return newString;
}