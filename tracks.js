(function () {
    var artist = document.getElementsByClassName('artist-name')[0].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
    var albumartist = artist;
    if (artist.match(/various|divers/i)) albumartist = 'Various Artists';
    var album = document.getElementsByClassName('album-title')[0].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
    var year = document.getElementsByClassName('product-meta')[0].firstChild.nextSibling.nextSibling.nodeValue.match(/\d{4}/);
    if (!year) year = '';
    var tracks = document.getElementsByClassName('track-title');
    var str = albumartist + '<br/>' + album + '<br/>' + year + '<br/><br/>';
    for (var i = 0; i < tracks.length; i++) {
        if (albumartist == 'Various Artists') artist = document.getElementsByClassName('track-details hide')[i].firstChild.nextSibling.firstChild.nodeValue.split(',')[0];
        var track = tracks[i].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
        var trackextra = '';
        if (tracks[i].firstChild.nextSibling) trackextra = tracks[i].firstChild.nextSibling.firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
        if (i < 9) str += '0';
        str += (i + 1) + ' ' + artist + ' - ' + track;
        if (trackextra) str += ' ' + trackextra;
        if (i < tracks.length - 1) str += '<br/>';
    }
    var d = open().document;
    d.title = albumartist + ' - ' + album;
    d.body.innerHTML = str;
})();
