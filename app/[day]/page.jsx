import React from 'react';
import { headers } from 'next/headers';
import getMatches from '../lib/dynamoDB/getMatches';

export const revalidate = 3600;
async function getMatchesData({ day }) {
  const timeZone = headers().get('x-vercel-ip-timezone') || 'America/Edmonton';
  return getMatches(day, timeZone);
}

export default async function MatchDayPage({ params }) {
  const matches = await getMatchesData(params);
  return (
    <div>
      <h1>Match day page</h1>
      <pre>{params.day}</pre>
      <pre>
        <code>{JSON.stringify(matches, null, 2)}</code>
      </pre>
    </div>
  );
}
