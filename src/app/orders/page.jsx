import OrderCard from "@/components/OrderCard";
import { getServerSession } from "@/lib/serverAuth";
import { dateFormatter } from "../helpers/dateFormatter";

export default async function OrderPage() {
  const { supabase, session } = await getServerSession();

  const userId = (session?.user?.id).toString();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);

  const orderGroup = data?.reduce((acc, item) => {
    const { order_number, created_at, total, ...rest } = item;

    if (!acc[order_number]) {
      acc[order_number] = [];
    }
    acc[order_number].push({
      order_number,
      created_at,
      total,
      ...rest,
    });
    return acc;
  }, {});

  return (
    <section className="flex flex-col items-center justify-center pt-11 mb-20">
      <h1 className="text-xl mb-5">Orders</h1>
      <div className="w-screen flex flex-col gap-5 items-center">
        {data.length > 0 && orderGroup ? (
          Object.entries(orderGroup).map(([orderNumber, orders]) => (
            <div
              className="border-2 rounded-lg border-secondary border-opacity-50 bg-primary_light bg-opacity-40 p-3 bg-seconda mb-2 w-11/12 xl:w-8/12"
              key={orderNumber}
            >
              <div className="flex justify-between">
                <div className="text-start text-xs flex flex-col xl:flex-row xl:gap-2 items-center text-neutral-600">
                  <span>Order Date:</span>
                  <span className="text-sm font-semibold">
                    {dateFormatter(orders[0].created_at)}
                  </span>
                </div>

                <div className="text-start text-xs flex flex-col xl:gap-2 xl:flex-row items-center  text-neutral-600">
                  <span> Order Number:</span>
                  <span className="text-xs font-semibold">{orderNumber} </span>
                </div>
              </div>
              <OrderCard item={orders} />
              <div className="justify-between flex mt-5">
                <div className="flex flex-col xl:flex-row gap-2 items-center">
                  <span className="text-neutral-600 text-md">Total:</span>
                  <span className="text-neutral-800 text-xl">
                    ${orders[0].total}
                  </span>
                </div>
                <div className="flex flex-col xl:flex-row gap-2 items-center">
                  <span className="text-neutral-600">Status:</span>
                  <span className="text-neutral-800 text-lg xl:text-xl">
                    Awaiting shipment
                  </span>{" "}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-neutral-500">
            You don&apos;t have any orders yet.
          </p>
        )}
      </div>
    </section>
  );
}
