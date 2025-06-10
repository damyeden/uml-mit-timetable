// app/api/images/[...path]/route.ts
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Join the path segments
    const imagePath = params.path.join("/");

    // Construct the full file path
    const fullPath = join(process.cwd(), "public", "uploads", imagePath);

    // Security: Prevent path traversal attacks
    if (!fullPath.startsWith(join(process.cwd(), "public", "uploads"))) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Read the file
    const imageBuffer = await readFile(fullPath);

    // Determine content type based on file extension
    const ext = imagePath.split(".").pop()?.toLowerCase();
    let contentType = "image/jpeg"; // default

    switch (ext) {
      case "png":
        contentType = "image/png";
        break;
      case "gif":
        contentType = "image/gif";
        break;
      case "webp":
        contentType = "image/webp";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
    }

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
