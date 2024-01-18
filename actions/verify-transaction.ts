import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

var paystack = require('paystack')('sk_live_7803c444e118e885450630864d6430bade832da2');

export const verifyTransaction = async (
  reference: string,
  courseId: string,
  price: number, // Add a parameter for the course price
): Promise<{ success: boolean } | any> => {
  try {
    const verifyResponse = await paystack.transaction.verify(reference);

    if (verifyResponse.data.status === 'success') {
      const user = await currentUser();
      if (!user || !user.id || !courseId) {
        return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
      }

      if (price === 0) {
        // Handle free course logic (e.g., grant access without payment)
        await db.purchase.create({
          data: {
            courseId: courseId,
            userId: user.id,
          },
        });

        return { success: true };
      } else {
        // Handle paid course logic
        // You might want to process the payment here

        await db.purchase.create({
          data: {
            courseId: courseId,
            userId: user.id,
          },
        });

        return { success: true };
      }
    }

    return new NextResponse(`Webhook Error: Verification failed`, { status: 400 });
  } catch (error) {
    console.log("[VERIFY_TXN]", error);
    return 0;
  }
};
