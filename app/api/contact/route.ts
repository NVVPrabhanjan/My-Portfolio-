import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Nodemailer transporter using Gmail App Password directly
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nvvenkatprabhanjan@gmail.com",
        pass: "susgdbiqtfycgioa",
      },
    });

    // Email to you (notification)
    await transporter.sendMail({
      from: `"Portfolio Contact" <nvvenkatprabhanjan@gmail.com>`,
      to: "nvvenkatprabhanjan@gmail.com", // sends to yourself
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'JetBrains Mono', monospace, sans-serif; background: #0B0F14; color: #e6edf3; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
              .header { border-bottom: 1px solid #21262d; padding-bottom: 16px; margin-bottom: 24px; }
              .badge { display: inline-block; background: #3fb950; color: #0B0F14; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 4px; margin-bottom: 12px; }
              .title { font-size: 20px; font-weight: bold; color: #e6edf3; margin: 0; }
              .label { font-size: 11px; color: #484f58; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; margin-top: 16px; }
              .value { font-size: 14px; color: #8b949e; background: #161B22; border: 1px solid #21262d; border-radius: 6px; padding: 10px 14px; }
              .message-box { font-size: 14px; color: #8b949e; background: #161B22; border: 1px solid #21262d; border-radius: 6px; padding: 14px; white-space: pre-wrap; line-height: 1.7; }
              .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #21262d; font-size: 11px; color: #484f58; }
              .keyword { color: #ff79c6; }
              .string { color: #f1fa8c; }
              .comment { color: #6272a4; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="badge">✓ NEW MESSAGE</div>
                <h1 class="title">
                  <span class="comment">// </span>portfolio/contact.sh
                </h1>
              </div>

              <div class="label">from</div>
              <div class="value"><span class="string">"${name}"</span></div>

              <div class="label">email</div>
              <div class="value">
                <a href="mailto:${email}" style="color: #58a6ff; text-decoration: none;">${email}</a>
              </div>

              <div class="label">message</div>
              <div class="message-box">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>

              <div class="footer">
                <span class="comment">// Sent via prabhanjan.live · ${new Date().toUTCString()}</span><br/>
                <span class="keyword">reply-to</span>: <a href="mailto:${email}" style="color: #58a6ff;">${email}</a>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Prabhanjan N.V.V" <nvvenkatprabhanjan@gmail.com>`,
      to: email,
      subject: "✓ Message received — Prabhanjan N.V.V",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'JetBrains Mono', monospace, sans-serif; background: #0B0F14; color: #e6edf3; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
              .badge { display: inline-block; background: #3fb950; color: #0B0F14; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 4px; margin-bottom: 16px; }
              pre { font-family: inherit; background: #161B22; border: 1px solid #21262d; border-radius: 6px; padding: 16px; font-size: 13px; line-height: 1.7; color: #8b949e; white-space: pre-wrap; }
              .footer { margin-top: 24px; font-size: 11px; color: #484f58; border-top: 1px solid #21262d; padding-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="badge">✓ ACK RECEIVED</div>
              <pre>Hey ${name},

$ ./contact.sh --status

  Message delivered to prabhanjan.live
  Response time: &lt; 24 hours

  Your message has been received.
  I'll get back to you as soon as possible.

  — Prabhanjan N.V.V
    Full Stack Developer · BMSCE ISE
    github.com/NVVPrabhanjan

[session] Connection closed.
[session] Exit code: 0</pre>
              <div class="footer">
                This is an automated reply. Please do not reply to this email directly.<br/>
                Reach me at <a href="mailto:nvvenkatprabhanjan@gmail.com" style="color: #58a6ff;">nvvenkatprabhanjan@gmail.com</a>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[contact/route] Error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
