// app/api/upload/route.ts (App Router)
// or pages/api/upload.ts (Pages Router)

import prisma from "@/src/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const logo = formData.get("logo") as File;
    const nom = formData.get("nom") as string;
    const responsable = formData.get("responsable") as string;

    if (!logo) {
      const newMention = await prisma.mention.create({
        data: {
          nom,
          responsable,
        },
      });

      return NextResponse.json({
        success: true,
      });
    }

    // Convert File to buffer
    const bytes = await logo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create filename
    const timestamp = Date.now();
    const fileExtension = logo.name.split(".").pop();
    const filename = `${nom}-${timestamp}.${fileExtension}`;

    // Save to public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filepath = join(uploadDir, filename);

    // Ensure directory exists
    const fs = require("fs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(filepath, buffer);

    const newMention = await prisma.mention.create({
      data: {
        nom,
        responsable,
        logo: `/uploads/${filename}`,
      },
    });
    
    return NextResponse.json({
      success: true,
      filename,
      path: `/uploads/${filename}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }
}
