import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface DecodedToken {
  email: string;
  exp: number;
}

const Menu: React.FC = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login'); // Redirect to login if no token
    } else {
      const decoded = jwt.decode(token) as DecodedToken;
      if (!decoded || decoded.exp * 1000 < Date.now()) {
        Cookies.remove('token');
        router.push('/login');
      } else {
        setUser(decoded);
      }
    }
  }, [router]);

  const logout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Menu;