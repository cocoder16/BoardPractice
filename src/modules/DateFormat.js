export default (function () {
    Date.prototype.format = function(formatString) {
        if (!this.valueOf()) return " ";
    
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = this;
        var h;
        
        return formatString.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
})();
// //ex
// //2011년 09월 11일 오후 03시 45분 42초
// console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
 
// //2011-09-11
// console.log(new Date().format("yyyy-MM-dd"));
 
// //'11 09.11
// console.log(new Date().format("'yy MM.dd"));
 
// //2011-09-11 일요일
// console.log(new Date().format("yyyy-MM-dd E"));
 
// //현재년도 : 2011
// console.log("현재년도 : " + new Date().format("yyyy"));
