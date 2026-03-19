const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const WAITLIST_NOTIFY_TO =
  process.env.WAITLIST_NOTIFY_TO ?? "zaidahmad8060@gmail.com";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

async function sendWaitlistNotification(email) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !resendFromEmail) {
    console.warn(
      "Waitlist notification skipped because RESEND_API_KEY or RESEND_FROM_EMAIL is missing.",
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [WAITLIST_NOTIFY_TO],
      subject: `New BuildAtlas waitlist signup: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
          <h2 style="margin-bottom: 12px;">New waitlist signup</h2>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;">A new user joined the BuildAtlas waitlist.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send notification email: ${response.status} ${errorText}`);
  }
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return jsonResponse(500, { error: "Server misconfigured" });
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email;
  } catch {
    return jsonResponse(400, { error: "Invalid request body" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(400, { error: "Invalid email" });
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok || res.status === 201) {
      await sendWaitlistNotification(email);
      return jsonResponse(200, { message: "Success" });
    }

    // 409 = duplicate email (unique constraint)
    if (res.status === 409) {
      await sendWaitlistNotification(email);
      return jsonResponse(200, { message: "Already on the waitlist" });
    }

    const errText = await res.text();
    console.error("Supabase error:", res.status, errText);
    return jsonResponse(500, { error: "Failed to save email" });
  } catch (err) {
    console.error("Waitlist error:", err.message);
    return jsonResponse(500, {
      error: err.message || "Failed to save email",
    });
  }
}
