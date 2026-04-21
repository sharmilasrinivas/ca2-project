import { useState } from "react";
import { useApp } from "../context/AppContext";

const Filter = () => {
  const { state } = useApp();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

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

  const handleChange = (value) => {
    setSearch(value);
    setError(value.trim() === "" ? "Enter restaurant name" : "");
  };

  const filtered = validOrders.filter((o) =>
    o.restaurant?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        data-testid="filter-input"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
      />

      {error && <p>{error}</p>}

      {!error && search && filtered.length === 0 && (
        <p>No results found</p>
      )}

      {!error &&
        filtered.map((o) => (
          <div key={o.orderId} data-testid="order-item">
            {o.customerName || "Unknown"} - {o.restaurant}
          </div>
        ))}
    </div>
  );
};

export default Filter;