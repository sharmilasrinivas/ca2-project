import { useApp } from "../context/AppContext";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const { state, dispatch } = useApp();

  // VALID ORDERS (Q1)
  const validOrders = state.orders.filter((order) => {
    if (!order) return false;

    if (!Array.isArray(order.items) || order.items.length === 0)
      return false;

    const validItems = order.items.every(
      (item) => Number(item.quantity) > 0
    );
    if (!validItems) return false;

    if (isNaN(order.totalAmount) || Number(order.totalAmount) <= 0)
      return false;

    return true;
  });

  // PENDING ONLY
  const pendingOrders = validOrders.filter(
    (o) => o.status?.toLowerCase() !== "delivered"
  );

  return (
    <div>
      <h2>Orders</h2>

      {pendingOrders.map((order) => (
        <div key={order.orderId} data-testid="order-item">
          <OrderCard order={order} />

          <button
            onClick={() =>
              dispatch({
                type: "MARK_DELIVERED",
                payload: order.orderId,
              })
            }
          >
            Mark as Delivered
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;