import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { state } = useApp();

  const order = state.orders.find(
    (o) => o && String(o.orderId) === String(id)
  );

  if (!order) return <h2>Order not Found</h2>;

  return (
    <div>
      <h2>{order.customerName || "Unknown"}</h2>

      <p>{order.restaurant || "Unknown"}</p>
      <p>Status: {order.status}</p>
      <p>Total: {order.totalAmount}</p>

      {order.items?.map((item, i) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        const subtotal = price * quantity;

        return (
          <div key={i}>
            {item.name} → {quantity} × {price} = {subtotal}
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetails;