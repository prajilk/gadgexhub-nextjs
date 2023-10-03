import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { pid: string }) {
  // console.log(req.nextUrl.searchParams.get("name"));
  // console.log(params);

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 },
  );
}
