import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
var paystack = require('paystack')('sk_test_a3316cc7a9c00c018534a17d95657fe9daf237f6');


export async function POST(req: Request) {
  // const body = await req.text();
  // const signature = headers().get("Stripe-Signature") as string;
  
  // let event: Stripe.Event;

  try {

    const verifyResponse = await paystack.verify({
      reference:""
    })
    http://localhost:3000/courses/c3f4aa84-acb7-4a72-acd8-adeb801a2f13/chapters/2029f250-774a-4dfe-9c7e-be82f8dc6793
    console.log(verifyResponse," verify ", req)
    if (verifyResponse.data.status) {
      // if (!userId || !courseId) {
      //   return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
      // }
  
      // await db.purchase.create({
      //   data: {
      //     courseId: courseId,
      //     userId: userId,
      //   }
      // });
    } else {
      // return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }
  
    // event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  // const session = event.data.object as Stripe.Checkout.Session;
  // const userId = session?.metadata?.userId;
  // const courseId = session?.metadata?.courseId;

  // if (event.type === "checkout.session.completed") {
  //   if (!userId || !courseId) {
  //     return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
  //   }

  //   await db.purchase.create({
  //     data: {
  //       courseId: courseId,
  //       userId: userId,
  //     }
  //   });
  // } else {
  //   return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  // }

  return new NextResponse(null, { status: 200 });
}