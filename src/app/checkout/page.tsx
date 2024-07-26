'use client';

import CheckoutForm from '@/src/components/CheckoutForm/CheckoutForm';
import styles from './checkout.module.scss';
import { RootState, useDispatch, useSelector } from '@/src/redux/store';
import Container from '@/src/components/Container/Container';
import AddressCard from '@/src/components/AddressCard/AddressCard';
import { selectAddress } from '@/src/redux/slices/addressSlice';
import OrderProductCard from '@/src/components/OrderProduct/OrderProductCard';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.order);
  const { addresses, selectedAddress } = useSelector(
    (state: RootState) => state.address
  );
  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    const address = addresses.find(
      (address) => address.id === parseInt(selectedAddressId)
    );

    if (address) {
      dispatch(selectAddress(address));
    }
  };

  return (
    <Container className={styles.main} color="white">
      <h1>Checkout</h1>
      <div className={styles.container}>
        <div className={styles.paymentContainer}>
          <section className={styles.addressSection}>
            <h2>Deliver To:</h2>
            <select
              name="addresses"
              id="address"
              onChange={handleAddressChange}
              value={selectedAddress?.id || ''}
            >
              {addresses.map((address) => {
                return (
                  <option key={address.id} value={address.id}>
                    {address.address_name}
                  </option>
                );
              })}
            </select>
            {selectedAddress && <AddressCard address={selectedAddress} />}
          </section>
          <section className={styles.paymentSection}>
            <div className={styles.checkoutForm}>
              <CheckoutForm />
            </div>
          </section>
        </div>
        <section className={styles.cartSection}>
          <h2>Your Order</h2>
          {items.map((item) => {
            return <OrderProductCard key={item.id} item={item} />;
          })}
          <div className={styles.summary}>
            <span className={styles.total}>Total</span>
            <span className={styles.price}>${totalPrice}</span>
          </div>
        </section>
      </div>
    </Container>
  );
}
