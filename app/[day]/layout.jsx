import PropTypes from 'prop-types';

export async function generateMetadata({ params }) {
    return {
        title: 'Welcome to Ligue 1 schedule',
        description: `Ligue 1 schedule for ${params.day}`
    }
}

export default function MatchDayLayout({ children }) {
    return (
        <main>{children}</main>
    )
}

MatchDayLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
