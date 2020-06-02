export default String.prototype.replaceAll = function (prevStr, nextStr) {
    return this.split(prevStr).join(nextStr);
}