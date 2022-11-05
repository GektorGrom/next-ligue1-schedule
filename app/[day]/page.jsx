import { headers } from 'next/headers';

async function getHeaders() {
    const headersInstance = headers()
    const headersJSON = {}
    for (const pair of headersInstance.entries()) {
        const [key, value] = pair
        headersJSON[key] = value
    }
    return headersJSON;
}

export default async function MatchDayPage({params}) {
    const headersData = await getHeaders();
    return (
        <div>
            <h1>Match day page</h1>
            <h4>{params.day}</h4>
            <hr/>
            <pre>
                <code>
                    {JSON.stringify(headersData, null, 2)}
                </code>
            </pre>
        </div>
    )
}
