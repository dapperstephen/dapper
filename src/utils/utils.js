const utils = {
    // 字符串脱敏
    hideCode: function (str, frontLen, endLen) {
        var len = str.length - frontLen - endLen;
        var xing = '';
        for (var i = 0; i < len; i++) {
            xing += '*';
        }
        return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
    },
}
export default utils
