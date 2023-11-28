import OrderCard from "@/components/OrderCard";
import { getServerSession } from "@/lib/serverAuth";

export default async function OrderPage() {
  const session = await getServerSession();
  const { supabase } = await getServerSession();

  const userId = session?.user?.id;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);

  console.log(error);

  return (
    <section className="flex flex-col items-center justify-center pt-11 px-2">
      <h1 className="text-xl mb-20">Orders</h1>
      <div>
        {data ? (
          data.map((item) => {
            return (
              <div key={item.order}>
                <OrderCard />
              </div>
            );
          })
        ) : (
          <p className="text-xl text-neutral-500 text-center">
            You don&apos;t have any orders yet.
          </p>
        )}
      </div>
    </section>
  );
}
