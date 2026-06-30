import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummykey");
const FROM = process.env.EMAIL_FROM || "QuantumCanary <no-reply@quantumcanary.io>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const APP_NAME = "QuantumCanary";

// ────────── Email Template Wrapper ──────────

function emailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#060918;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060918;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#0D1525;border:1px solid rgba(55,138,221,0.2);border-radius:16px;padding:40px;">
        <tr><td align="center" style="padding-bottom:24px;">
          <span style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600;color:#E8EDF5;">Quantum</span><span style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600;background:linear-gradient(135deg,#378ADD,#1D9E75);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Canary</span>
        </td></tr>
        <tr><td style="color:#E8EDF5;font-size:14px;line-height:1.7;">
          ${content}
        </td></tr>
        <tr><td style="padding-top:32px;border-top:1px solid rgba(55,138,221,0.1);margin-top:24px;">
          <p style="color:#5A6A82;font-size:12px;text-align:center;margin:16px 0 0;">
            © ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.<br/>
            <a href="${APP_URL}" style="color:#378ADD;text-decoration:none;">${APP_URL}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, url: string, color = "#378ADD"): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td align="center">
        <a href="${url}" style="display:inline-block;background:${color};color:white;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;">${text}</a>
      </td></tr>
    </table>`;
}

// ────────── Email Functions ──────────

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Welcome to ${APP_NAME}, ${name}!`,
      html: emailTemplate(`
        <h2 style="color:#E8EDF5;font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 16px;">Welcome aboard, ${name}! 🎉</h2>
        <p>You've just joined the most advanced cybersecurity deception platform. Here's what you can do:</p>
        <ul style="padding-left:20px;color:#85B7EB;">
          <li style="margin:8px 0;">Deploy intelligent honeypots that mimic your real infrastructure</li>
          <li style="margin:8px 0;">Detect and analyze attackers with AI-powered threat intelligence</li>
          <li style="margin:8px 0;">Set canary tokens to catch data exfiltration in real-time</li>
        </ul>
        ${ctaButton("Go to Dashboard", `${APP_URL}/dashboard`)}
        <p style="color:#5A6A82;font-size:13px;">If you have any questions, reply to this email — we're here to help.</p>
      `),
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function sendVerificationEmail({ to, name, token }: { to: string; name: string; token: string }) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Verify your ${APP_NAME} email`,
      html: emailTemplate(`
        <h2 style="color:#E8EDF5;font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 16px;">Verify your email address</h2>
        <p>Hi ${name},</p>
        <p>Click the button below to verify your email address. This link expires in <strong>24 hours</strong>.</p>
        ${ctaButton("Verify Email Address", `${APP_URL}/verify-email?token=${token}`, "#1D9E75")}
        <p style="color:#5A6A82;font-size:13px;">If you didn't create a ${APP_NAME} account, you can safely ignore this email.</p>
      `),
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}

export async function sendPasswordResetEmail({ to, name, token }: { to: string; name: string; token: string }) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Reset your ${APP_NAME} password`,
      html: emailTemplate(`
        <h2 style="color:#E8EDF5;font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 16px;">Reset your password</h2>
        <p>Hi ${name},</p>
        <p>You requested a password reset. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        ${ctaButton("Reset Password", `${APP_URL}/reset-password?token=${token}`)}
        <p style="color:#5A6A82;font-size:13px;">If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
      `),
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
}

export async function sendCanaryAlertEmail({
  to,
  tokenType,
  location,
  timestamp,
}: {
  to: string;
  tokenType: string;
  location: string;
  timestamp: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `🚨 Canary token triggered — data may be exfiltrated`,
      html: emailTemplate(`
        <div style="border-left:4px solid #E24B4A;padding-left:16px;margin-bottom:16px;">
          <h2 style="color:#E24B4A;font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 8px;">⚠️ SECURITY ALERT</h2>
          <p style="margin:0;font-size:16px;color:#F09595;">A canary token has been triggered</p>
        </div>
        <table style="width:100%;margin:16px 0;">
          <tr><td style="color:#5A6A82;padding:8px 0;width:120px;">Token Type:</td><td style="color:#E8EDF5;font-weight:600;">${tokenType}</td></tr>
          <tr><td style="color:#5A6A82;padding:8px 0;">Source:</td><td style="color:#E8EDF5;font-weight:600;">${location}</td></tr>
          <tr><td style="color:#5A6A82;padding:8px 0;">Triggered At:</td><td style="color:#E8EDF5;font-weight:600;">${timestamp}</td></tr>
        </table>
        <p><strong>What this means:</strong> Someone has accessed or opened a decoy file/link that was planted as a trap. This may indicate unauthorized access to your systems.</p>
        <p><strong>Recommended actions:</strong></p>
        <ol style="padding-left:20px;color:#85B7EB;">
          <li style="margin:6px 0;">Review the attacker's dossier in your dashboard</li>
          <li style="margin:6px 0;">Check access logs for the compromised system</li>
          <li style="margin:6px 0;">Consider rotating credentials for affected services</li>
        </ol>
        ${ctaButton("View in Dashboard", `${APP_URL}/canary`, "#E24B4A")}
      `),
    });
  } catch (error) {
    console.error("Failed to send canary alert email:", error);
  }
}

export async function sendTeamInviteEmail({
  to,
  inviterName,
  orgName,
  token,
}: {
  to: string;
  inviterName: string;
  orgName: string;
  token: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `${inviterName} invited you to join ${orgName} on ${APP_NAME}`,
      html: emailTemplate(`
        <h2 style="color:#E8EDF5;font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 16px;">You're invited! 🎉</h2>
        <p><strong>${inviterName}</strong> has invited you to join <strong>${orgName}</strong> on ${APP_NAME}.</p>
        <p>Join the team to collaborate on cybersecurity monitoring and threat detection.</p>
        ${ctaButton("Accept Invitation", `${APP_URL}/join?token=${token}`, "#1D9E75")}
        <p style="color:#5A6A82;font-size:13px;">This invitation expires in 7 days. If you don't recognize this sender, you can safely ignore this email.</p>
      `),
    });
  } catch (error) {
    console.error("Failed to send team invite email:", error);
  }
}
