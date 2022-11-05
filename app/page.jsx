import { redirect } from 'next/navigation';
import {format} from 'date-fns';

async function getMatchDay() {
  return format(new Date(), 'yyyy-MM-dd');
}

export default async function Home() {
  const matchDay = await getMatchDay();
  redirect(matchDay);
  return null
}
