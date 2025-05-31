import { ref, get, push, set } from 'firebase/database';
import { db } from './firebaseConfig.js';

// Fetch available meals
export async function getAvailableMeals() {
  const mealsRef = ref(db, 'available-meals');
  const snapshot = await get(mealsRef);

  if (!snapshot.exists()) {
    throw new Error('No meals found');
  }

  const data = snapshot.val();
  console.log(data);
  return Object.entries(data).map(([id, meal]) => ({ id, ...meal }));
}

// Submit a new order
export async function submitOrder(order) {
  if (
    !order ||
    !order.items ||
    order.items.length === 0 ||
    !order.customer ||
    !order.customer.email?.includes('@') ||
    !order.customer.name?.trim() ||
    !order.customer.street?.trim() ||
    !order.customer['postal-code']?.trim() ||
    !order.customer.city?.trim()
  ) {
    throw new Error('Invalid order data');
  }

  const ordersRef = ref(db, 'orders');
  const newOrderRef = push(ordersRef);
  await set(newOrderRef, order);

  return { message: 'Order submitted successfully', orderId: newOrderRef.key };
}
