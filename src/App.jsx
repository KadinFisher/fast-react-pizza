import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, { action as orderAction } from './features/order/CreateOrder';
import Order, {
  loader as orderLoader,
  action as updateOrderAction,
} from './features/order/Order';

import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: orderAction, // POST handled by action
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader, // GET handled by loader
        action: updateOrderAction, // Updates handled by action
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;