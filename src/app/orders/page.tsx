import Container from '@/src/components/Container/Container';
import styles from './orders.module.scss';
import OrderCard from '@/src/components/OrderCard/OrderCard';
import { getOrders } from '@/src/services/orderService';
import { GroupedOrder } from '@/src/types';
import OrdersFilter from '@/src/components/OrdersFilter/OrdersFilter';
import TitleContainer from '@/src/components/TitleContainer/TitleContainer';

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { filter: string };
}) {
  const { filter } = searchParams;

  const orders: GroupedOrder[] = await getOrders({ year: filter });

  return (
    <>
      <TitleContainer
        title="Orders"
        content="You can check your orders and see shipment status on this page."
      />
      <Container color="white">
        <main className={styles.container}>
          <div className={styles.innerContainer}>
            <h1>My Orders</h1>
            <div className={styles.filters}>
              <OrdersFilter filter={filter} />
            </div>
            <div className={styles.orders}>
              {orders.map((order) => {
                return <OrderCard key={order.order_id} order={order} />;
              })}
            </div>
          </div>
        </main>
      </Container>
    </>
  );
}
