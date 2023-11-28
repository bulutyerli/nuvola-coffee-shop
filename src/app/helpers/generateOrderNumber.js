export function generateOrderNumber() {
  const timestamp = new Date().getTime();
  const randomId = Math.floor(Math.random() * 10000);
  const orderNumber = `${timestamp}-${randomId}`;

  return orderNumber;
}
