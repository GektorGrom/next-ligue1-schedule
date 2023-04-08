import { headers } from 'next/headers';
import getMatches from '../lib/dynamoDB/getMatches';

export const revalidate = 43200;

async function getHeaders() {
  const headersInstance = headers()
  const headersJSON = {}
  for (const pair of headersInstance.entries()) {
    const [key, value] = pair
    headersJSON[key] = value
  }
  return headersJSON;
}

async function getMatchesData({day}) {
  const timeZone = headers().get('x-vercel-ip-timezone') || 'America/Edmonton';
  return getMatches(day, timeZone);
}

export default async function MatchDayPage({params}) {
  console.log(params);
  const headersData = await getHeaders();
  const matches = await getMatchesData(params);
  return (<div>
      <h1>Match day page</h1>
      <pre>{params.day}</pre>
      <pre>
        <code>
          {JSON.stringify(matches, null, 2)}
        </code>
      </pre>
      <hr/>
      <pre>
                <code>
                    {JSON.stringify(headersData, null, 2)}
                </code>
            </pre>
    </div>)
}
