export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "MARK_DELIVERED":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (!order || !order.orderId) return order;

          if (order.orderId === action.payload) {
            if (order.status?.toLowerCase() === "delivered") return order;

            return { ...order, status: "delivered" };
          }

          return order;
        }),
      };

    default:
      return state;
  }
};