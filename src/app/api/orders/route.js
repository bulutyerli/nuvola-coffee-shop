import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function createClient() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
  return supabase;
}

export async function POST(request) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const userId = session?.user?.id;

    try {
      const { productId, sizeId, quantity, price, orderNumber, total } =
        await request.json();

      const { error: orderError } = await supabase.from("orders").insert([
        {
          order_number: orderNumber,
          user_id: userId,
          product_id: productId,
          quantity: quantity,
          price: price,
          sizeId: sizeId,
          total: total,
        },
      ]);

      if (orderError) {
        console.log(orderError.message);
        throw new Error(orderError);
      }

      const { error: cartError } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("user_id", userId);

      if (cartError) {
        console.log(cartError.message);
        throw new Error(cartError);
      }

      return NextResponse.json({
        userId,
        success: true,
        message: "Order successfull",
      });
    } catch (error) {
      console.error("Order error:", error);
      return NextResponse.json({
        success: false,
        error: "Order could not completed",
      });
    }
  } else {
    return NextResponse.json({ success: false, error: "No user session" });
  }
}
