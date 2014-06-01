javascript: (function () {
    var albumartist = document.getElementsByClassName('heading2')[1].firstChild.firstChild.nodeValue;
    var album = document.getElementsByClassName('heading0 marginTopS')[0].firstChild.nodeValue;
    var label = document.getElementsByClassName('textMedium marginTopM colorLight product-copyright')[0].firstChild.nodeValue.replace(/^(.*?)\d{4}/, '').replace(" ", '');
    var link = document.URL;
    var year = document.getElementsByClassName('textMedium marginTopM colorLight product-copyright')[0].firstChild.nodeValue.match(/\b([0-9]{4})\b/)[0];
    var tracks = document.getElementsByClassName('track-play');
    var str = albumartist + '<br/>' + album + '<br/>' + year + '<br/>' + label + '<br/><br/>';
    for (var i = 0; i < tracks.length; i++) {
        artist = document.getElementsByClassName('track-artist')[i].firstChild.nextSibling.firstChild.firstChild.nodeValue;
        var track = tracks[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.firstChild.nodeValue;;
        if (i < 9) str += '0';
        if (artist == albumartist) str += (i + 1) + '. ' + track + '  [' + length + ']';
        else str += (i + 1) + '. ' + artist + ' - ' + track;
        if (i < tracks.length - 1) str += '<br/>';
    }
    str += '<br/><br/><br/>[b]Source: [url=http://href.li?' + link + ']WiMP[/url][/b]\n';
    var d = open().document;
    d.title = albumartist + ' - ' + album;
    d.body.innerHTML = str;
})();