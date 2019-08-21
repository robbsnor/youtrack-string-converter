
import '../styles/style.scss';
import 'fullpage.js/vendors/scrolloverflow.min.js';
import fullpage from 'fullpage.js';

// import 'https://connect.soundcloud.com/sdk/sdk-3.3.2.js';

var fullPageInstance = new fullpage('#fullpage', {
	// paddingTop: '45px',
	menu: '.nav__main',
	// paddingBottom: '145px',
	// verticalCentered: false,
	anchors:['label', 'music', 'events', 'djsets', 'merch']
});


console.log(Math.floor(Math.random() * 6) + 1  );
