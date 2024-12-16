import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  // Get the dispatch function
  const dispatch = useDispatch();

  return (
    <Button
      type="small"
      onClick={() => dispatch(deleteItem(pizzaId))} // Dispatch the deleteItem action
    >
      Delete
    </Button>
  );
}

export default DeleteItem;