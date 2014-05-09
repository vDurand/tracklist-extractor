// ==UserScript==
// @name Qobuz Album Info Extractor
// @description Extract info from qobuz album web page
// @namespace none
// @include http://www.qobuz.com/album/*
// @version 0.1
// @grant GM_addStyle
// ==/UserScript==
/*jslint browser: true, regexp: true */
/*globals qbPlayer */
document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    function info_album() {
        var artist = document.getElementsByClassName('artist-name')[0].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
        var albumartist = artist;
        if (artist.match(/various|divers/i)) albumartist = 'Various Artists';
        var album = document.getElementsByClassName('album-title')[0].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
        var labo = document.getElementsByClassName('product-meta')[0];
        var label = labo.getElementsByTagName('a')[0].firstChild.nodeValue;
        var linker = document.getElementsByClassName('share-toolbar-google')[0];
        var link = linker.getElementsByTagName('g:plusone')[0].getAttribute("href");
        var year = document.getElementsByClassName('product-meta')[0].firstChild.nextSibling.nextSibling.nodeValue.match(/\d{4}/);
        if (!year) year = '';
        var tracks = document.getElementsByClassName('track-title');
        var lengths = document.getElementsByClassName('duration');
        var str = albumartist + '<br/>' + album + '<br/>' + label + '<br/>' + year + '<br/><br/><br/>Tracklist:<br/><br/>';
        for (var i = 0; i < tracks.length; i++) {
            artist = document.getElementsByClassName('track-details hide')[i].firstChild.nextSibling.firstChild.nodeValue.split(',')[0];
            var track = tracks[i].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
            var length = lengths[i].firstChild.nodeValue.replace("00:", '');
            var trackextra = '';
            if (tracks[i].firstChild.nextSibling) trackextra = tracks[i].firstChild.nextSibling.firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
            if (i < 9) str += '0';
            if(artist == albumartist)
                str += (i + 1) + '. ' + track + '  [' + length + ']';
            else
                str += (i + 1) + '. ' + artist + ' - ' + track + '  [' + length + ']';
            if (trackextra) str += ' ' + trackextra;
            if (i < tracks.length - 1) str += '<br/>';
        }
        str += '<br/><br/><br/>[b]Source: [url=http://href.li?' + link + ']Qobuz[/url][/b]\n';
        var d = open().document;
        d.title = albumartist + ' - ' + album;
        d.body.innerHTML = str;
    }
    var zNode       = document.createElement ('div');
    zNode.innerHTML = '<button class="GButt" id="myButton" type="button">'
                    + 'Get Album Info</button>'
                    ;
    zNode.setAttribute ('id', 'myContainer');
    document.body.appendChild (zNode);

    //--- Activate the newly added button.
    document.getElementById ("myButton").addEventListener (
        "click", info_album, false
    );

    function ButtonClickAction (zEvent) {
        /*--- For our dummy action, we'll just add a line of text to the top
            of the screen.
        */
        var zNode       = document.createElement ('p');
        zNode.innerHTML = 'The button was clicked.';
        document.getElementById ("myContainer").appendChild (zNode);
    }

    //--- Style our newly added elements using CSS.
    GM_addStyle ( multilineStr ( function () {/*!
        #myContainer {
            position:               absolute;
            top:                    0;
            left:                   0;
            font-size:              20px;
            margin:                 5px;
            opacity:                0.9;
            z-index:                222;
        }
        #myButton {
            cursor:                 pointer;
        }
        #myContainer p {
            color:                  red;
            background:             white;
        }
        .GButt {
            -moz-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
            -webkit-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
            box-shadow:inset 0px 1px 0px 0px #bbdaf7;
            background:-webkit-gradient( linear, top, bottom, color-stop(0.05, #5bc0de), color-stop(1, #2f96b4) );
            background:-moz-linear-gradient( center top, #5bc0de 5%, #2f96b4 100% );
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5bc0de', endColorstr='#2f96b4');
            background-color:#5bc0de;
            -webkit-border-top-left-radius:5px;
            -moz-border-radius-topleft:5px;
            border-top-left-radius:5px;
            -webkit-border-top-right-radius:5px;
            -moz-border-radius-topright:5px;
            border-top-right-radius:5px;
            -webkit-border-bottom-right-radius:5px;
            -moz-border-radius-bottomright:5px;
            border-bottom-right-radius:5px;
            -webkit-border-bottom-left-radius:5px;
            -moz-border-radius-bottomleft:5px;
            border-bottom-left-radius:5px;
            text-indent:0;
            border:1px solid #075b75;
            display:inline-block;
            color:#ffffff;
            font-family:Arial;
            font-size:18px;
            font-weight:bold;
            font-style:normal;
            height:47px;
            line-height:47px;
            width:200px;
            text-decoration:none;
            text-align:center;
            text-shadow:1px 1px 0px #528ecc;
        }
        .GButt:hover {
            background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #2f96b4), color-stop(1, #2f96b4) );
            background:-moz-linear-gradient( center top, #2f96b4 5%, #2f96b4 100% );
            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#2f96b4', endColorstr='#2f96b4');
            background-color:#2f96b4;
        }.GButt:active {
            position:relative;
            top:1px;
        }
    */} ) );

    function multilineStr (dummyFunc) {
        var str = dummyFunc.toString ();
        str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
                .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
                .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
                ;
        return str;
    }
});