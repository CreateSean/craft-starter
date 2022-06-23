/* add javascript here */

function stopVideo() {
console.log('please stop');
}


// Change the second argument to your options:
// https://github.com/sampotts/plyr/#options
// const player = new Plyr('#player', {captions: {active: true}});
const players = Plyr.setup('.js-player');

// Expose player so it can be used from the console
window.player = player;