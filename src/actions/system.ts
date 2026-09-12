"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "./auth";
import fs from "fs";
import path from "path";

export async function getSystemInfo() {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    const contactCount = await prisma.contactMessage.count();
    const adminCount = await prisma.adminUser.count();
    const visitorCount = await prisma.visitorLog.count();

    // Read package.json for Next.js version
    let nextVersion = "Unknown";
    try {
      const pkgPath = path.join(process.cwd(), "package.json");
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      nextVersion = pkg.dependencies.next || "Unknown";
    } catch (e) {
      console.error("Could not read package.json");
    }

    return {
      success: true,
      data: {
        environment: process.env.NODE_ENV || "development",
        nextVersion,
        nodeVersion: process.version,
        database: "PostgreSQL (Prisma)",
        stats: {
          contacts: contactCount,
          admins: adminCount,
          visitors: visitorCount
        }
      }
    };
  } catch (err: any) {
    return { error: err.message };
  }
}
