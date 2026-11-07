
import { NextResponse } from "next/server";
import { getSolanaStatus } from "@/lib/solana";

export async function GET() {
  try {
    const status = await getSolanaStatus();

    return NextResponse.json({
      success: true,
      network: "Devnet",
      address: status.address,
      balanceSol: status.balanceSol,
    });
  } catch (error) {
    console.error("Solana status error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to connect to Solana." },
      { status: 500 }
    );
  }
}
