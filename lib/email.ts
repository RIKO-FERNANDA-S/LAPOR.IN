import nodemailer from "nodemailer";

interface SendOtpParams {
  to: string;
  otp: string;
  type: "register" | "reset_password";
}

/**
 * Sends an OTP email to the specified recipient using Nodemailer.
 * If SMTP environment variables are not configured, it logs the OTP code cleanly to the server console.
 */
export async function sendOtpEmail({ to, otp, type }: SendOtpParams) {
  const isReset = type === "reset_password";
  const subject = isReset
    ? "Kode OTP Reset Password - Lapor.in"
    : "Kode OTP Verifikasi Registrasi - Lapor.in";

  const title = isReset ? "Reset Password Akun Lapor.in" : "Verifikasi Akun Lapor.in";
  const message = isReset
    ? "Gunakan kode OTP berikut untuk melanjutkan proses reset password akun Lapor.in Anda."
    : "Terima kasih telah mendaftar di Lapor.in. Masukkan kode OTP berikut untuk memverifikasi alamat email Anda.";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
    </head>
    <body style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 40px 20px; color: #f8fafc;">
      <div style="max-width: 500px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
        
        <!-- Header Brand -->
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #6366f1; font-size: 28px; font-weight: 800; margin: 0; tracking: -0.5px;">Lapor.in</h1>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">Sistem Layanan Pelaporan Warga</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #334155; margin-bottom: 24px;" />

        <!-- Title & Body -->
        <h2 style="color: #f1f5f9; font-size: 20px; font-weight: 700; margin-bottom: 12px; text-align: center;">${title}</h2>
        <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; text-align: center; margin-bottom: 28px;">
          ${message}
        </p>

        <!-- OTP Box -->
        <div style="background: #0f172a; border: 2px dashed #6366f1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #818cf8; font-family: monospace; display: block; margin-left: 12px;">${otp}</span>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 10px; margin-bottom: 0;">Kode ini berlaku selama <strong>10 menit</strong>.</p>
        </div>

        <!-- Security Warning -->
        <div style="background: #0284c715; border-left: 4px solid #38bdf8; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px;">
          <p style="color: #7dd3fc; font-size: 12px; margin: 0; line-height: 1.5;">
            🔒 <strong>Penting:</strong> Jangan berikan kode OTP ini kepada siapa pun, termasuk pihak Lapor.in.
          </p>
        </div>

        <!-- Footer -->
        <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
          Jika Anda tidak melakukan permintaan ini, abaikan email ini.<br/>
          &copy; 2026 Lapor.in. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Lapor.in" <${user}>`,
        to,
        subject,
        html: htmlContent,
      });

      console.log(`[EMAIL SENT] OTP ${otp} successfully sent via SMTP to ${to}`);
      return { success: true, simulated: false };
    } catch (err) {
      console.error("[EMAIL ERROR] Failed to send email via SMTP:", err);
      // Fallback to simulated delivery log
    }
  }

  // Simulated OTP log for local development
  console.log(`
====================================================
📩 [SIMULATED EMAIL OTP]
To: ${to}
Type: ${type}
OTP Code: ${otp}
Expires: 10 Minutes
====================================================
  `);

  return { success: true, simulated: true, otp };
}
