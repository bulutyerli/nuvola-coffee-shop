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

export async function GET(request) {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && session.user) {
      const userId = session.user.id;

      const { data, error } = await supabase
        .from("shopping_cart")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        // Handle the error more explicitly
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json(
        { success: false, error: "No user session" },
        { status: 401 }
      );
    }
  } catch (e) {
    // Handle unexpected errors
    console.error(e);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const userId = session?.user?.id;

    try {
      const { productId, sizeId, quantity, price } = await request.json();

      const { data: existingCartData, error } = await supabase
        .from("shopping_cart")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .eq("sizeId", sizeId);

      if (error) {
        console.log("dublicate problem", error.message);
        throw new Error(error);
      }

      if (existingCartData && existingCartData.length > 0) {
        await supabase
          .from("shopping_cart")
          .update({
            quantity: existingCartData[0].quantity + quantity,
          })
          .eq("user_id", userId)
          .eq("product_id", productId)
          .eq("sizeId", sizeId);
      } else {
        const { error } = await supabase.from("shopping_cart").insert([
          {
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            price: price,
            sizeId: sizeId,
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

export async function DELETE(request) {
  const supabase = createClient();
  const { id } = await request.json();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    try {
      const { error } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      return NextResponse.json({ success: true });
    } catch (error) {
      console.log(error.message);
      return NextResponse.json({ success: false, error: error.message });
    }
  } else {
    return NextResponse.json({ success: false, error: "No user session" });
  }
}
