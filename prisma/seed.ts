import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.event.deleteMany();
  await prisma.canaryToken.deleteMany();
  await prisma.threat.deleteMany();
  await prisma.honeypot.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.report.deleteMany();
  await prisma.user.deleteMany();

  const adminHash = await bcrypt.hash("Admin123!", 12);
  const userHash = await bcrypt.hash("User123!", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@quantumcanary.io",
      passwordHash: adminHash,
      emailVerified: new Date(),
      role: "ADMIN",
      plan: "ENTERPRISE",
      onboardingDone: true,
      orgName: "QuantumCanary",
      industry: "Technology",
      teamSize: "11-50",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "user@quantumcanary.io",
      passwordHash: userHash,
      emailVerified: new Date(),
      role: "USER",
      plan: "PRO",
      onboardingDone: true,
      orgName: "Acme Corp",
      industry: "Financial Services",
      teamSize: "2-10",
    },
  });

  const honeypots = await Promise.all([
    prisma.honeypot.create({ data: { userId: admin.id, name: "prod-ssh-decoy-01", type: "SSH", port: 22, status: "ACTIVE", description: "SSH honeypot mimicking production jump server", totalHits: 234, config: { banner: "OpenSSH_8.9p1 Ubuntu-3ubuntu0.7" } } }),
    prisma.honeypot.create({ data: { userId: admin.id, name: "api-gateway-decoy", type: "API", port: 8080, status: "ACTIVE", description: "REST API honeypot with fake user endpoints", totalHits: 89, config: { endpoints: ["/api/users", "/api/admin"] } } }),
    prisma.honeypot.create({ data: { userId: admin.id, name: "mail-server-trap", type: "SMTP", port: 25, status: "ACTIVE", description: "SMTP relay honeypot", totalHits: 567, config: { domain: "mail.internal.example.com" } } }),
    prisma.honeypot.create({ data: { userId: user.id, name: "data-lake-bucket", type: "S3", port: 443, status: "PAUSED", description: "S3 bucket honeypot with fake data exports", totalHits: 12, config: { bucketName: "company-data-exports-2024" } } }),
    prisma.honeypot.create({ data: { userId: user.id, name: "postgres-analytics-db", type: "DATABASE", port: 5432, status: "ACTIVE", description: "PostgreSQL honeypot", totalHits: 45, config: { dbName: "analytics_prod" } } }),
  ]);

  const threats = await Promise.all([
    prisma.threat.create({ data: { userId: admin.id, ipAddress: "185.220.101.42", ipPartial: "185.220.***", totalEvents: 47, threatScore: 87, attackerType: "Automated Scanner", status: "ACTIVE", osGuess: "Linux (Kali)", toolchain: ["nmap", "hydra", "gobuster"], country: "Germany", city: "Frankfurt", asn: "AS205100", radarScores: { persistence: 72, stealth: 34, sophistication: 61, intent: 89 } } }),
    prisma.threat.create({ data: { userId: admin.id, ipAddress: "103.253.41.98", ipPartial: "103.253.***", totalEvents: 12, threatScore: 94, attackerType: "Targeted Human", status: "LURED", osGuess: "Linux (Ubuntu)", toolchain: ["ssh", "scp", "curl"], country: "Russia", city: "Moscow", asn: "AS49505", radarScores: { persistence: 91, stealth: 88, sophistication: 85, intent: 96 } } }),
    prisma.threat.create({ data: { userId: admin.id, ipAddress: "45.33.32.156", ipPartial: "45.33.***", totalEvents: 156, threatScore: 42, attackerType: "Script Kiddie", status: "BLOCKED", osGuess: "Windows 11", toolchain: ["metasploit", "nmap"], country: "United States", city: "Los Angeles", asn: "AS63949", radarScores: { persistence: 22, stealth: 15, sophistication: 28, intent: 55 } } }),
    prisma.threat.create({ data: { userId: user.id, ipAddress: "91.121.209.77", ipPartial: "91.121.***", totalEvents: 8, threatScore: 98, attackerType: "Nation State Indicator", status: "TRAPPED", osGuess: "Linux (Custom)", toolchain: ["custom-c2", "mimikatz", "cobalt-strike"], country: "China", city: "Beijing", asn: "AS4808", radarScores: { persistence: 97, stealth: 95, sophistication: 99, intent: 100 } } }),
    prisma.threat.create({ data: { userId: user.id, ipAddress: "192.168.10.55", ipPartial: "192.168.***", totalEvents: 5, threatScore: 15, attackerType: "Red Team", status: "RESOLVED", osGuess: "macOS", toolchain: ["burpsuite", "ffuf"], country: "United States", city: "San Francisco", asn: "Internal", radarScores: { persistence: 10, stealth: 70, sophistication: 65, intent: 5 } } }),
  ]);

  await Promise.all([
    prisma.event.create({ data: { userId: admin.id, honeypotId: honeypots[0].id, threatId: threats[0].id, eventType: "AUTH_ATTEMPT", severity: "HIGH", payload: { username: "root", password: "admin123" } } }),
    prisma.event.create({ data: { userId: admin.id, honeypotId: honeypots[1].id, threatId: threats[1].id, eventType: "CONNECTION", severity: "MEDIUM", payload: { method: "GET", path: "/api/admin/users" } } }),
    prisma.event.create({ data: { userId: admin.id, honeypotId: honeypots[0].id, threatId: threats[3].id, eventType: "COMMAND", severity: "CRITICAL", payload: { command: "cat /etc/shadow" } } }),
    prisma.event.create({ data: { userId: user.id, honeypotId: honeypots[3].id, threatId: threats[1].id, eventType: "FILE_ACCESS", severity: "HIGH", payload: { file: "customers.csv" } } }),
    prisma.event.create({ data: { userId: user.id, threatId: threats[1].id, eventType: "CANARY_TRIGGER", severity: "CRITICAL", payload: { tokenType: "URL", label: "admin-credentials-doc" } } }),
    prisma.event.create({ data: { userId: admin.id, honeypotId: honeypots[4].id, threatId: threats[2].id, eventType: "AUTH_ATTEMPT", severity: "MEDIUM", payload: { username: "postgres", password: "postgres" } } }),
    prisma.event.create({ data: { userId: admin.id, honeypotId: honeypots[2].id, threatId: threats[0].id, eventType: "CONNECTION", severity: "LOW", payload: { from: "scanner@malicious.ru" } } }),
    prisma.event.create({ data: { userId: admin.id, honeypotId: honeypots[0].id, threatId: threats[3].id, eventType: "EXFILTRATION", severity: "CRITICAL", payload: { size: "2.4MB", destination: "91.121.209.77:4444" } } }),
  ]);

  await Promise.all([
    prisma.canaryToken.create({ data: { userId: admin.id, honeypotId: honeypots[0].id, tokenHash: "ct_hash_001", tokenType: "URL", label: "admin-credentials-doc", triggered: true, triggeredAt: new Date(), triggeredIp: "103.253.41.98" } }),
    prisma.canaryToken.create({ data: { userId: admin.id, tokenHash: "ct_hash_002", tokenType: "DNS", label: "internal-dns-record" } }),
    prisma.canaryToken.create({ data: { userId: user.id, tokenHash: "ct_hash_003", tokenType: "DOCUMENT", label: "salary-spreadsheet-2024", triggered: true, triggeredAt: new Date(), triggeredIp: "185.220.101.42" } }),
    prisma.canaryToken.create({ data: { userId: user.id, tokenHash: "ct_hash_004", tokenType: "IMAGE", label: "network-diagram-png" } }),
  ]);

  console.log("✅ Seed complete!");
  console.log(`   Created ${2} users, ${honeypots.length} honeypots, ${threats.length} threats, 8 events, 4 canary tokens`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
