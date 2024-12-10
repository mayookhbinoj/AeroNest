const otpEmail = (otp: string, name: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Roboto', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #000; /* Black text */
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 50px auto;
          background: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #0A3C96;
          color: #ffffff;
          text-align: center;
          padding: 20px;
          font-size: 1.8em;
          font-weight: bold;
        }
        .content {
          padding: 30px 20px;
          text-align: center;
        }
        .content p {
          margin: 0 0 15px;
          font-size: 1rem;
          line-height: 1.6;
          color: #000; /* Black text */
        }
        .otp-container {
          display: inline-block;
          background: #0A3C96;
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 12px 24px;
          border-radius: 6px;
          margin: 20px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .button-container {
          margin: 20px 0;
        }
        .action-button {
          text-decoration: none;
          background-color: #0A3C96;
          color: #ffffff;
          padding: 12px 30px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 6px;
          display: inline-block;
          margin-top: 10px;
        }
        .action-button:hover {
          background-color: #082b6c;
        }
        .footer {
          text-align: center;
          padding: 15px;
          background-color: #f1f1f1;
          font-size: 0.85rem;
          color: #666;
        }
        .footer a {
          color: #0A3C96;
          text-decoration: none;
        }
        @media (max-width: 600px) {
          .content {
            padding: 20px 15px;
          }
          .header {
            font-size: 1.5em;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          Aero Nest
        </div>
        <div class="content">
          <p>Hi, <strong>${name}</strong>,</p>
          <p>Welcome to Aero Nest! Use the OTP code below to complete your sign-up procedure. The OTP is valid for 2 minutes.</p>
          <div class="otp-container">${otp}</div>
          <p>If you didn’t request this email, please ignore it or contact our support team.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Aero Nest. All rights reserved. 
          <br>
          <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
        </div>
      </div>
    </body>
    </html>
  `;
};
export default otpEmail;
