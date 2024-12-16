import { useLoaderData, redirect } from 'react-router-dom';

import OrderItem from './OrderItem';
import UpdateOrder from './UpdateOrder';

import { getOrder, createOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

function Order() {
  const order = useLoaderData(); // Load order data from the loader

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={item.ingredients ?? []} // Assume ingredients are included in `cart`
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const { orderId } = params;

  // Ensure "new" is routed to the action, not the loader
  if (orderId === "new") {
    throw new Error("Invalid request method. POST requests should be handled by the action.");
  }

  // Fetch existing order
  const order = await getOrder(orderId);
  return order;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const cart = JSON.parse(data.cart || "[]");

  if (cart.length === 0) {
    throw new Error("Cart cannot be empty.");
  }

  const newOrder = {
    ...data,
    cart,
    priority: data.priority === "true",
  };

  try {
    const createdOrder = await createOrder(newOrder);
    return redirect(`/order/${createdOrder.id}`);
  } catch (error) {
    console.error("Failed to create order:", error.message);
    throw error;
  }
}

export default Order;