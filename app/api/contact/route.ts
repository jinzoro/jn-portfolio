import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "contact@yourdomain.com",
      to: process.env.CONTACT_TO_EMAIL ?? "you@yourdomain.com",
      replyTo: email,
      subject: `New message from ${name} via portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #080808; color: #f0eee8; border-radius: 12px;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #ccff00;">
            New Portfolio Enquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(240,238,232,0.08); color: #8a8880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 80px;">From</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(240,238,232,0.08);">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(240,238,232,0.08); color: #8a8880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(240,238,232,0.08);"><a href="mailto:${email}" style="color: #ccff00;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0 0; color: #8a8880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
              <td style="padding: 12px 0 0; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
