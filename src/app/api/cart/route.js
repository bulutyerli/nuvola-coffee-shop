import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
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

  const {
    data: { session },
  } = supabase;

  const user = session?.id;

  if (user) {
    const { data, error } = await supabase
      .from("shopping_cart")
      .eq("user_id", user);

    if (data) {
      return NextResponse.json({ success: true, data });
    } else {
      // Handle the error or return an appropriate response
      return NextResponse.json({ success: false, error });
    }
  } else {
    return NextResponse.json({ success: false, error: "No user session" });
  }
}

export async function POST(request) {
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const userId = session.user.id;

    try {
      const { productId, quantity, price } = await request.json();

      const { data: existingCartData, error } = await supabase
        .from("shopping_cart")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) {
        console.log(error.message);
        throw new Error(error);
      }

      if (existingCartData && existingCartData.length > 0) {
        await supabase
          .from("shopping_cart")
          .update({
            quantity: existingCartData[0].quantity + quantity,
            price: existingCartData[0].price + price,
          })
          .eq("user_id", userId)
          .eq("product_id", productId);
      } else {
        const { error } = await supabase.from("shopping_cart").insert([
          {
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            price: price,
          },
        ]);

        if (error) {
          console.log(error.message);
          throw new Error(error);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Item added to the cart",
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return NextResponse.json({
        success: false,
        error: "Error adding item to cart",
      });
    }
  } else {
    return NextResponse.json({ success: false, error: "No user session" });
  }
}
