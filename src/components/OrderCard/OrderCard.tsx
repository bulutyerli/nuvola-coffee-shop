import { GroupedOrder } from '@/src/types';
import styles from './orderCard.module.scss';
import OrderProductCard from '../OrderProduct/OrderProductCard';
import Image from 'next/image';
import { getImageUrl } from '@/src/utils/getImageUrl';

export default function OrderCard({ order }: { order: GroupedOrder }) {
  const orderDate = new Date(order.order_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const status = order.status[0].toUpperCase() + order.status.slice(1);
  return (
    <div className={styles.container}>
      <section className={styles.topTitles}>
        <dl className={styles.titles_group}>
          <div className={styles.topSummaries}>
            <dt>Order Date</dt>
            <dd>{orderDate}</dd>
          </div>
          <div className={styles.topSummaries}>
            <dt>Total</dt>
            <dd>${order.total_price}</dd>
          </div>
          <div className={styles.topSummaries}>
            <dt>Delivery Address</dt>
            <dd>{order.address.address_name}</dd>
          </div>
        </dl>
        <div className={styles.topSummaries}>
          <dt>Order No:</dt>
          <dd>{order.order_id}</dd>
        </div>
      </section>
      <section className={styles.content}>
        <h2>{status}</h2>
        {order.items.map((item, index) => {
          return (
            <div key={index} className={styles.orderCardContainer}>
              <Image
                className={styles.image}
                src={getImageUrl(item.product_image)}
                width={75}
                height={75}
                alt={item.product_name}
              ></Image>
              <div className={styles.items}>
                <div>
                  <p className={styles.item}>{item.product_name}</p>
                  <p className={styles.brand}>{item.brand}</p>
                  <p className={styles.category}>{item.category}</p>
                </div>
                <span className={styles.quantity}>
                  Quantity: {item.quantity}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
