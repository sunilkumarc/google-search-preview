var queryResults = null;
var selectedResult = null;
var selectedIndex;

function loadWebPage(result) {
    // Add preview container 
    // var resultContainer = $("#center_col #res.med");
    // $(resultContainer).css("float", "left");
    // $("<div style=\"margin-left: 100%; width: 590px; height: 1156px;\"><object type=\"text/html\" data=\"https://css-tricks.com/\" width=\"800px\" height=\"600px\" style=\"overflow:auto;border:5px ridge blue\"></object></div>").insertAfter(resultContainer);
    
    // Get URL of the page to be displayed
    // $(result).find(".rc .r a").attr("href");

    // Load web page on to the preview container
}

function onPressOfResult() {
    $(selectedResult).removeClass("selectedResult");
    selectedResult = this;
    $(selectedResult).addClass("selectedResult");
    selectedIndex = parseInt($(this).attr("index"));
    loadWebPage(selectedResult);
}

function handleUpArrow() {
    if (selectedIndex > 0) {
        $(queryResults[selectedIndex]).removeClass("selectedResult");
        selectedResult = queryResults[selectedIndex-1];
        $(selectedResult).addClass("selectedResult");
        selectedIndex -= 1;
        loadWebPage(selectedResult);
    }
}

function handleDownArrow() {
    if (selectedIndex < queryResults.length-1) {
        $(queryResults[selectedIndex]).removeClass("selectedResult");
        selectedResult = queryResults[selectedIndex+1];
        $(selectedResult).addClass("selectedResult");
        selectedIndex += 1;
        loadWebPage(selectedResult);
    }
}

function showPreview() {
    $("#main #cnt .mw #rcnt .col")
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
        showPreview();
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

        default: return;
    }
    e.preventDefault();
});