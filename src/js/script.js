$(document).ready(function() {
    var enabled = window.localStorage.getItem('search-preview-enabled');
    enabled = (enabled == 'true');
    
    $("#enable-search-preview").prop("checked", enabled);
});

$("#enable-search-preview").change(function() {
    window.localStorage.setItem('search-preview-enabled', this.checked);
});