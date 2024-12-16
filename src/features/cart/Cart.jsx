import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  // Use useSelector to get the username and cart from the Redux store
  const cart = useSelector(getCart); // Assuming `getCart` is a selector from `cartSlice`
  const username = useSelector((state) => state.user.username); // Assuming `username` is stored in the user slice

  // Use useDispatch to get the dispatch function
  const dispatch = useDispatch();

  // Implement the logic to handle empty carts
  if (!cart || cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="p-4">
      {/* Apply Tailwind CSS classes for padding and layout */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {/* Apply Tailwind CSS for spacing between items and border styling */}
      <ul className="space-y-4 border-t border-gray-200 pt-4">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      {/* Apply Tailwind CSS for horizontal button layout and spacing */}
      <div className="mt-6 flex space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;