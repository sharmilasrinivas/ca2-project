import { useApp } from "../context/AppContext";

const Stats = () => {
  const { state } = useApp();

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

    if (!order.status) return false;

    return true;
  });

  const stats = validOrders.reduce(
    (acc, order) => {
      acc.totalOrders++;

      const status = order.status.toLowerCase();

      if (status === "delivered") acc.deliveredOrders++;
      else if (status === "cancelled") acc.cancelledOrders++;

      return acc;
    },
    { totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0 }
  );

  window.appState = stats;

  return (
    <div>
      <div data-testid="total-orders">{stats.totalOrders}</div>
      <div data-testid="delivered-orders">{stats.deliveredOrders}</div>
      <div data-testid="cancelled-orders">{stats.cancelledOrders}</div>
    </div>
  );
};

export default Stats;