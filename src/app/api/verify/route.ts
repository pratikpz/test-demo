import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json({ message: 'No code provided' }, { status: 400 });
  }
  if (code.length === 6 && code[5] !== '7') {
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Verification Error' }, { status: 400 });
  }
}
