import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    revalidatePath(`/${body.category}/${body.slug}`);

    return NextResponse.json({
      revalidated: true,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed' },
      { status: 500 }
    );
  }
}
