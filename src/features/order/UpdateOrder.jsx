import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="patch" className="text-right">
      <input type="hidden" name="orderId" value={order.id} />
      <input type="hidden" name="priority" value={true} />
      <Button type="primary" disabled={fetcher.state === 'submitting'}>
        {fetcher.state === 'submitting' ? 'Updating...' : 'Make priority'}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// Action Function Implementation
export async function action({ request }) {
  const formData = await request.formData();
  const orderId = formData.get('orderId');
  const priority = formData.get('priority') === 'true';

  try {
    // Use the updateOrder service to update the priority status
    const updatedOrder = await updateOrder(orderId, { priority });
    return updatedOrder;
  } catch (error) {
    throw new Response('Failed to update the order priority.', {
      status: 500,
      statusText: error.message,
    });
  }
}