// ==UserScript==
// @name         NavidromeGeniusLyrics
// @namespace    http://tampermonkey.net/
// @version      2024-12-12
// @description  Change the semi-useless lyrics button to a GeniusLyrics search
// @author       gregleg
// @match        http*://YOUR_SERVER_IP:YOUR_NAVIDROME_PORT_OR_WHATEVER/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=navidrome.org
// @grant        none
// ==/UserScript==
// !!! YOU NEED TO CHANGE THE "@match" PROPERTY OF THE SCRIPT TO YOUR ACTUAL SERVER FOR THIS TO EVEN ATTEMPT TO WORK !!!

const geniusQueryBase = 'https://genius.com/search?q='
const observer = new MutationObserver(callback)
const config = { attributes: false, childList: true, subtree: true }
observer.observe(document.body, config)
function callback () {
    'use strict';
    observer.disconnect()
    let playBar = document.querySelector('section.panel-content')
    if(playBar) {
        let controls = document.querySelector('div.player-content')
        if (!controls) return
        let newLyricsButton = controls.querySelector('span.group.lyric-btn')
        if (!newLyricsButton) return
        newLyricsButton.removeAttribute('onClick')
        newLyricsButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let artistElem = document.querySelector('span.songArtist')
            if(!artistElem) return
            let songElem = document.querySelector('span[class*="songTitle"]')
            if(!songElem) return
            let artist = artistElem.textContent;
            let song = songElem.textContent;
            let url = geniusQueryBase + artist + ' - ' + song
            window.open(url, '_blank').focus();
            console.log(url)
        });


        observer.observe(playBar, config)
        return
    }
    observer.observe(document.body, config)
}
