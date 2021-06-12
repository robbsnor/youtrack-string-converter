import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();
const accessToken = getHashValue('access_token');
var isLoggedin = false;

if (accessToken) {
    isLoggedin = true;

    console.log('is logged in');
    document.body.classList.add('logged-in');
}


var userImage = null
var userName = null

spotifyApi.setAccessToken(accessToken);

// ===

if (isLoggedin) {
// elvis
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
//     if (err) console.error(err);
//     else console.log('Artist albums', data);
//   });



    spotifyApi.getMe({}, function(err, user){
        if (err) console.error(err);
        else {
            console.log(user);
            userImage = user.images[0].url;
            userName = user.display_name;

            document.getElementById('userimage').src = userImage
            document.getElementById('username').innerHTML = userName
        }
    })
}









// get hash value
function getHashValue(key) {
    const matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
}



// craft login link
const redirectUrl   = window.location.origin;
const baseUrl       = 'https://accounts.spotify.com/authorize';
const clientId      = '4acb2c2beed54527aa5851b75467fe86';
const responsType   = 'token';

// console.log();

const buttonLink    = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}/&response_type=${responsType}`

document.getElementById('login-button').href = buttonLink;
// https://accounts.spotify.com/authorize?client_id=4acb2c2beed54527aa5851b75467fe86&redirect_uri=http://localhost:3000/&response_type=token