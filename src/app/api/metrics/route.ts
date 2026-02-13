import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();

    const usedMemPercentage = ((totalMem - freeMem) / totalMem) * 100;

    return NextResponse.json({
        cpuModel: cpus[0].model,
        cpuCount: cpus.length,
        memoryUsage: usedMemPercentage.toFixed(1),
        uptime: os.uptime(),
        hostname: os.hostname(),
        platform: os.platform(),
    });
}
