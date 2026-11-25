import { ScrollRestoration } from 'react-router';

// Scrolls to top on new navigations, restores position on back/forward,
// and leaves hash links (/#about) alone.
const ScrollToTop = () => <ScrollRestoration />;

export default ScrollToTop;
