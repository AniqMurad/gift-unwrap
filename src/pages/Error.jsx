import { Link } from 'react-router-dom';
import error from '../assets/error.png';
import { StorefrontHeader } from '../components/storefront/StorefrontPage';
import LandingFooter from '../components/LandingFooter';

export default function Error() {
  return <>
    <StorefrontHeader />
    <main className="gu-migration-section gu-migration-content gu-migration-error">
      <img src={error} alt="" />
      <div>
        <h1>404</h1>
        <h2>Something Is Missing.</h2>
        <p>The page you are looking for cannot be found. Take a break before trying again.</p>
        <Link className="gu-migration-button" to="/">← Back To Homepage</Link>
      </div>
    </main>
    <LandingFooter />
  </>;
}
