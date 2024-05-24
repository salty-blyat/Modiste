import { NextRequest, NextResponse } from 'next/server';
const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
  apiKey: process.env.EMAIL_API,
  apiSecret: process.env.EMAIL_SECRET,
});

export async function POST(req: NextRequest) {
  // Log a message to indicate that the endpoint is hit
  console.log("Request received at /api/sendEmail"); 
    // Parse the request body
    const { name, message, date, time } = await req.json();
    const email = "hokheng12123@gmail.com";
    console.log("Received email:", name, "time:", time);
  console.log(name, message, date, time );

  try {
    const result = await mailjet.post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [{
          "From": {
            "Email": email,
            "Name": name
          },
          "To": [{
            "Email": "hokheng12123@gmail.com",
            "Name": "Modiste"
          }],
          "Subject": "Customer Report",
          "TextPart": `Client Name: ${name}\nDate: ${date}\nTime: ${time}\n\nMessage:\n${message}`,
          "HTMLPart": `
          <div style="font-family: Helvetica, Arial, sans-serif; background-color: #f7f7f7; padding: 20px; border-radius: 5px; color: #333;">
          <h2 style="color: #333;">New Appointment Request</h2>
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p> 
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          </div>
`,

          "CustomID": "AppointmentRequest"
        }]
      });

    // Returning a successful response
    return NextResponse.json({ message: 'Email sent successfully', result: result.body });
  } catch (err) {
      // Logging the error
      console.error("Error sending email:", err);
  
      // Returning a failure response with error details
      return NextResponse.json({ error: 'Failed to send email', details: err.message || err }, { status: 500 });
  }
}