import { AnalyticsWrapper } from './components/analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
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
