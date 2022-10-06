function stringToBinary(inStr) {
    var result = "";
    for (var i = 0; i < inStr.length; i++) {
        result = result + inStr.charCodeAt(i).toString(2) + " ";
    }
    return result;
}
function documentWriteSink() {
    /*Get SOURCE*/ var textIn = new URLSearchParams(window.location.search).get("textInput");
    console.log(textIn + " " + typeof textIn);
    /*Do something to textIn->return result (optional)*/ /*eg. convert to binary*/ var result = "";
    result = stringToBinary(textIn);
    console.log(result);
    /*SINK*/ document.write('<div class = "main">' + "<br>" + "Text Entered: " + textIn + "<br>" + "Result: " + result + "</div>"); /*source->sink*/
}
/*RUN*/ documentWriteSink();
