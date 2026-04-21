import { createContext, useContext, useReducer, useEffect } from "react";
import { AppReducer } from "../reducer/AppReducer";
import { getToken, getOrders } from "../api/api";

const initialState = {
  orders: [],
  loading: true,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken(
          "E0323014",
          "307864",
          "A"
        );

        const data = await getOrders(token);

        dispatch({ type: "SET_ORDERS", payload: data });
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AppContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        dispatch, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);