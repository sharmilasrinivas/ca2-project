const OrderCard = ({ order }) => {
  return (
    <div>
      <h3>{order.customerName || "Unknown"}</h3>
      <p>{order.restaurant || "Unknown"}</p>
      <p>Status: {order.status}</p>
      <p>Total: {order.totalAmount}</p>

      {order.rating && <p>Rating: {order.rating}</p>}
    </div>
  );
};

export default OrderCard;