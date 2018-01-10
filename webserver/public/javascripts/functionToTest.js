'use strict';

var xmlhttprequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new xmlhttprequest();

function httpGet(theUrl)
{
    xhr.open( "GET", theUrl, false ); // false for synchronous request
    xhr.send( null );
    return xhr.responseText;
}

module.exports = {
    httpGet
}
