import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorefrontHeader } from '../components/storefront/StorefrontPage';
import LandingFooter from '../components/LandingFooter';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  return <>
    <StorefrontHeader />
    <main className="gu-migration-section gu-migration-content gu-migration-coming">
      <div>
        <h1>Coming Soon</h1>
        <p className="my-8">Something thoughtful is on its way. In the meantime, discover gifts for the people you love.</p>
        <form onSubmit={(event) => { event.preventDefault(); navigate('/signup', { state: { prefillEmail: email.trim() } }); }}>
          <label htmlFor="coming-email" className="block mb-4">Create your GiftUnwrap account</label>
          <div><input id="coming-email" type="email" required autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button className="gu-migration-button" type="submit">Register</button></div>
        </form>
        <Link to="/#featured-gifts" className="mt-8 underline">Explore gifts →</Link>
      </div>
    </main>
    <LandingFooter />
  </>;
}
