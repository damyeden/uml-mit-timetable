import { Equipment } from "@/src/lib/models/Equipment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const equipements = await Equipment.getAllEquipments();
  return NextResponse.json(equipements);
}
