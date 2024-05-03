import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASS,
      },
    });

    const htmlForVerifyMail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a>
        to verify your email or copy the below link in your browser.
<br>
${process.env.DOMAIN}/verifyemail?token=${hashedToken}
</p>`;
    const htmlForResetMail = `<p>Click <a href="${process.env.DOMAIN}/forgotpassword?token=${hashedToken}">Here</a>
        to reset your password or copy the below link in your browser.
<br>
${process.env.DOMAIN}/forgotpassword?token=${hashedToken}
</p>`;

    const mailOptions = {
      from: "Your mail", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verification mail" : "Change Password Mail", // Subject line
      html: emailType === "VERIFY" ? htmlForVerifyMail : htmlForResetMail, // TODO: Refactor this
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("SOmething went wrong when sending the mail: ", error);
  }
};

export default sendMail;
