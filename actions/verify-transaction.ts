import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

var paystack = require('paystack')('sk_test_a3316cc7a9c00c018534a17d95657fe9daf237f6');

export const verifyTransaction = async (
  reference: string,
  courseId: string,
): Promise<{ success: boolean } | any> => {
  try {
    const verifyResponse = await paystack.transaction.verify(reference);

    if (verifyResponse.data.status === 'success') {
      const user = await currentUser();
        if (!user || !user.id || !courseId) {
          return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }
  
        await db.purchase.create({
          data: {
            courseId: courseId,
            userId: user.id,
          }
        });
  
      return { success: true }
    }

    return new NextResponse(`Webhook Error: Verification failed`, { status: 400 });
  } catch (error) {
    console.log("[VERIFY_TXN]", error);
    return 0;
  }
}