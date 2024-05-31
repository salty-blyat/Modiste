import { NextRequest, NextResponse } from 'next/server';
const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
  apiKey: process.env.EMAIL_API,
  apiSecret: process.env.EMAIL_SECRET,
});

export async function POST(req: NextRequest) { 
    const { name, message, email   } = await req.json(); 
   
  try {
    const result = await mailjet.post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [{
          "From": {
            "Email": "hokheng12123@gmail.com",
            "Name": name
          },
          "To": [{
            "Email": "hokheng12123@gmail.com",
            "Name": "Modiste"
          }],
          "Subject": "Customer Report",
          "TextPart": `Client Name: ${name}\n   Message:\n${message}`,
          "HTMLPart": `
          <div style="font-family: Helvetica, Arial, sans-serif; background-color: #f7f7f7; padding: 20px; border-radius: 5px; color: #333;">
          <h2 style="color: #333;">Customer Email</h2>
          <p><strong>Client Name:</strong> ${name}</p> 
          <p><strong>Client Email:</strong> ${email}</p> 
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          </div>
`,

          "CustomID": "AppointmentRequest"
        }]
      });

    // Returning a successful response
    return NextResponse.json({ message: 'Email sent successfully', result: result.body });
  } catch (err: unknown) {
    // Logging the error
    console.error("Error sending email:", err);

    // Narrowing the error type
    let errorMessage: string;
    if (err instanceof Error) {
        errorMessage = err.message;
    } else if (typeof err === 'string') {
        errorMessage = err;
    } else {
        errorMessage = 'An unknown error occurred';
    }

    // Returning a failure response with error details
    return NextResponse.json({ error: 'Failed to send email', details: errorMessage }, { status: 500 });
} 
}