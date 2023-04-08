import { NextResponse } from 'next/server';
import getMatches from '../../lib/dynamoDB/getMatches';

export async function GET() {
  try {
    const matches = await getMatches('2023-04-08', 'America/Edmonton');
    return NextResponse.json({matches});
  } catch (e) {
    return NextResponse.json({error: e.message}, {status: 400});
  }
}
