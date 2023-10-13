import { transporter } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        {
          message: "Body not found",
        },
        { status: 400 }
      );
    }
    const {
      userEmail,
      achievementImage,
      achievementName,
      userName,
      achievementId,
    } = body;

    const achievement = await prisma.achievement.findUnique({
      where: {
        id: achievementId,
      },
    });

    if (!achievement) throw new Error("No achivement");

    if (achievement.emailSent) {
      return NextResponse.json({
        message: "Email already sent successfully",
      });
    }

    const mailOptions = {
      from: `Team Snapline <${process.env.NEXT_EMAIL}>`,
      to: userEmail,
      subject: "Congratulations on Your Achievement!",
      html: `<p style="font-size: 18px; font-weight: bold;">Dear ${userName},</p>

      <p style="font-size: 16px;">We are thrilled to inform you that you've achieved a remarkable milestone on SnapLine!</p>
      
      <p style="font-size: 16px;">You've earned the prestigious "${achievementName}" achievement, a testament to your dedication and creativity on our platform.</p>
      
      <p style="font-size: 16px;">This is just the beginning of your creative journey with SnapLine. We encourage you to keep up the fantastic work and continue to explore new horizons of creativity with us.</p>
      
      <div style="width: 200px; height: 200px; overflow: hidden; border-radius: 50%;">
        <img src="${achievementImage}" alt="Achievement Image" width="100%" height="100%" style="border-radius: 50%;">
      </div>
      
      <p style="font-size: 16px;">Wear this badge with pride, and let it inspire you to reach even greater heights in your creative endeavors.</p>
      
      <p style="font-size: 16px;">Best regards,<br>Your SnapLine Team</p>
      `, // Update the image source URL
    };

    const res = await transporter.sendMail(mailOptions);

    if (res.accepted && res.accepted.length > 0) {
      console.log("Email sent successfully to:", res.accepted);
      await prisma.achievement.update({
        where: {
          id: achievementId,
        },
        data: {
          emailSent: true,
        },
      });
      return NextResponse.json({
        message: "Email sent successfully",
      });
    } else {
      console.error("Email sending failed:", res.rejected);
      return NextResponse.json(
        {
          message: "Email sending failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 501,
      }
    );
  }
}
