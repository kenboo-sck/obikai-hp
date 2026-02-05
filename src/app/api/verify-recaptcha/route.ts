import { NextResponse } from 'next/server';

export async function POST() {
  // 帯会ではAPI側(send-email)で検証していたため、
  // ここはフロントエンドを通過させるためのダミー応答を返す
  return NextResponse.json({ success: true, score: 0.9 });
}