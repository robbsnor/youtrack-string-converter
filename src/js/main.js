
// styles
import '../styles/all.scss';

// vendors
import './vendors';

// dev
import './dev/dev';

////
///
//

console.log('main')

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log('dev')
} else {
  console.log('prod')
}