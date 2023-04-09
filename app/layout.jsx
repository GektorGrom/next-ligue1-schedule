import PropTypes from 'prop-types';
import { AnalyticsWrapper } from './components/analytics';

import './globals.css';

export const metadata = {
    title: 'Ligue 1 schedule',
    description: 'List of Ligue 1 matches for a given day',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer>
            <small>Footer from root layout</small>
        </footer>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
