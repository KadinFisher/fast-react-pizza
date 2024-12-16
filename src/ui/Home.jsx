import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { Link } from 'react-router-dom';

function Home() {
  // 1. Use useSelector to get the username from the Redux store
  const username = useSelector((state) => state.user.username);

  // 2. Conditional rendering: If username is empty, show CreateUser component; else, show a button linking to the menu
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      {/* Styled the header and div with Tailwind CSS */}
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        Straight out of your oven.
      </h1>

      {username ? (
        <Link to="/menu">
          <Button type="primary">
            Welcome back, {username}! Start your order
          </Button>
        </Link>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;