import { useLoaderData } from 'react-router-dom'; // Import useLoaderData
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // Use useLoaderData to fetch the menu data
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

let cachedMenu = null;

// Complete the loader function to fetch menu data
export async function loader() {
  if (cachedMenu) {
    return cachedMenu;
  }
  cachedMenu = await getMenu(); // Fetch menu data and cache it
  return cachedMenu;
}

export default Menu;