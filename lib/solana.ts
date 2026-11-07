
import "server-only";

import { readFileSync } from "node:fs";
import {
  createKeyPairSignerFromBytes,
  createSolanaRpc,
} from "@solana/kit";

const rpcUrl = process.env.SOLANA_RPC_URL;
const keypairPath = process.env.SOLANA_KEYPAIR_PATH;

if (!rpcUrl || !keypairPath) {
  throw new Error("Missing Solana environment configuration.");
}

const rpc = createSolanaRpc(rpcUrl);

export async function getSolanaStatus() {
  const secretKey = JSON.parse(
    readFileSync(keypairPath, "utf8")
  ) as number[];

  const signer = await createKeyPairSignerFromBytes(
    new Uint8Array(secretKey)
  );

  const { value } = await rpc.getBalance(signer.address).send();

  return {
    address: signer.address,
    balanceSol: Number(value) / 1_000_000_000,
  };
}
