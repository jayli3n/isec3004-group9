function stringToBinary(inStr) {
    var result = "";
    for (var i = 0; i < inStr.length; i++) {
        result = result + inStr.charCodeAt(i).toString(2) + " ";
    }
    return result;
}
function documentWriteSink() {
    var textIn = new URLSearchParams(window.location.search).get("textInput");
    var result = "";
    result = stringToBinary(textIn);
    document.write('<div class = "main">' + "<br>" + "Text Entered: " + textIn + "<br>" + "Result: " + result + "</div>");
}
documentWriteSink();
