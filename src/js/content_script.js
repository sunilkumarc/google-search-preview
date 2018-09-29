var queryResults = null;
var selectedResult = null;
var selectedIndex;

function onPressOfResult() {
    $(selectedResult).removeClass("selectedResult");
    selectedResult = this;
    $(selectedResult).addClass("selectedResult");
    selectedIndex = $(this).attr("index");
}

function handleUpArrow() {
    if (selectedIndex > 0) {
        console.log("Going UP!");
        $(queryResults[selectedIndex]).removeClass("selectedResult");
        selectedResult = queryResults[selectedIndex-1];
        $(selectedResult).addClass("selectedResult");
        selectedIndex -= 1;
    }
}

function handleDownArrow() {
    if (selectedIndex < queryResults.length-1) {
        console.log("Going DOWN!");
        $(queryResults[selectedIndex]).removeClass("selectedResult");
        selectedResult = queryResults[selectedIndex+1];
        $(selectedResult).addClass("selectedResult");
        selectedIndex += 1;
    }
}

$(document).ready(function() {
    queryResults = $("#search .srg").find(".g");
    if (queryResults.length > 0) {        
        selectedIndex = 0;
        selectedResult = queryResults[0];
        $(selectedResult).addClass("selectedResult");
        for (var i = 0; i < queryResults.length; ++i) {
            $(queryResults[i]).css("cursor", "pointer");
            $(queryResults[i]).attr("index", i);
            $(queryResults[i]).on("click", onPressOfResult);
        }
    }
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 38:
            handleUpArrow();
        break;

        case 40:
            handleDownArrow();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});