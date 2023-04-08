import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { formatInTimeZone } from 'date-fns-tz';

async function getMatchDay() {
  const timeZone = headers().get('x-vercel-ip-timezone') || 'America/Edmonton';

  return formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd')
}

export default async function Home() {
  const matchDay = await getMatchDay();
  redirect(`/${matchDay}`);
}
