var queryResults = null;
var selectedResult = null;
var selectedIndex;

function onPressOfResult() {
    $(selectedResult).removeClass("selectedResult");
    selectedResult = this;
    $(selectedResult).addClass("selectedResult");
    selectedIndex = parseInt($(this).attr("index"));
    showPreview(selectedResult);
}

function handleUpArrow() {
    if (selectedIndex > 0) {
        $(queryResults[selectedIndex]).removeClass("selectedResult");
        selectedResult = queryResults[selectedIndex-1];
        $(selectedResult).addClass("selectedResult");
        selectedIndex -= 1;
        showPreview(selectedResult);
    }
}

function handleDownArrow() {
    if (selectedIndex < queryResults.length-1) {
        $(queryResults[selectedIndex]).removeClass("selectedResult");
        selectedResult = queryResults[selectedIndex+1];
        $(selectedResult).addClass("selectedResult");
        selectedIndex += 1;
        showPreview(selectedResult);
    }
}

async function showPreview(result) {
    // Get URL of the page to be displayed
    var url = $(result).find(".rc .r a").attr("href");
    console.log("Will load page : ", url);
    
    $.ajax({
        url: "https://get-pagesource-gncelbtumd.now.sh/page_source?url=" + url,
        async: false,
        success: function(data) {
           $("#previewContainerDiv").html(data);
        },
        error: function(error) {
            console.log('HERE' + error);
        } 
    });

    // $("#previewContainerObject").remove();
    // Load web page on to the preview container
    // var content = "<object id=\"previewContainerObject\" type=\"text/html\" data=\"" + url + "\" style=\"overflow:auto; width: inherit; height: inherit\"></object>";
    // $.getJSON('https://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){
    //     $("#previewContainerDiv").html(data.contents);
    // });

    // $.getJSON('https://anyorigin.com/get?url=' + url + '&callback=?', function(data){
    //     $('#previewContainerDiv').html(data.contents);
    // });
    // $("#previewContainerDiv").attr("src", url);
}

function initPreviewContainer() {
    console.log("Adding Preview Container");
    var resultContainer = $("#center_col #res.med");
    $(resultContainer).css("float", "left");
    // $("<iframe id=\"previewContainerDiv\" sandbox=\"allow-scripts allow-same-origin allow-popups\" style=\"margin-left: 100%; border: 0px; width: 100%; height: 100%; overflow: hidden;\"></iframe>").insertAfter(resultContainer);
    $("<div id=\"previewContainerDiv\" style=\"margin-left: 100%; border: 1px solid black; \"></div>").insertAfter(resultContainer);
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
        initPreviewContainer();
        showPreview(selectedResult);
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