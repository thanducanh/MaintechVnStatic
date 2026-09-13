"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "./auth";
import fs from "fs";
import path from "path";

export async function getSystemInfo() {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  let dbSize = 0;
  let dbConnected = false;
  let contactCount = 0;
  let adminCount = 0;
  let visitorCount = 0;
  let sizeError = false;

  try {
    contactCount = await prisma.contactMessage.count();
    adminCount = await prisma.adminUser.count();
    visitorCount = await prisma.visitorLog.count();
    dbConnected = true;
  } catch (err) {
    console.error("DB connection error:", err);
    dbConnected = false;
  }

  if (dbConnected) {
    try {
      const sizeResult: any = await prisma.$queryRaw`SELECT pg_database_size(current_database()) as size`;
      if (Array.isArray(sizeResult) && sizeResult.length > 0) {
        // Handle BigInt from Prisma
        dbSize = Number(sizeResult[0].size || 0);
      }
    } catch (e) {
      console.error("pg_database_size error:", e);
      sizeError = true;
    }
  }

  let nextVersion = "Unknown";
  try {
    const pkgPath = path.join(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    nextVersion = pkg.dependencies.next || "Unknown";
  } catch (e) {}

  const limitMb = Number(process.env.SUPABASE_DB_LIMIT_MB) || 500;
  const usedMb = dbSize / (1024 * 1024);
  const percentUsed = limitMb > 0 ? (usedMb / limitMb) * 100 : 0;

  const vercelStatus = process.env.VERCEL === "1" ? "Đang triển khai" : "Local";
  const githubRepo = process.env.GITHUB_REPOSITORY ||
    (process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG ?
      `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}` : "Chưa cấu hình");

  return {
    success: true,
    data: {
      environment: process.env.NODE_ENV || "development",
      nextVersion,
      nodeVersion: process.version,
      database: "PostgreSQL / Prisma",
      dbConnected,
      dbSizeMb: usedMb,
      dbLimitMb: limitMb,
      dbPercent: percentUsed,
      sizeError,
      vercelStatus,
      githubRepo,
      stats: {
        contacts: contactCount,
        admins: adminCount,
        visitors: visitorCount
      }
    }
  };
}
