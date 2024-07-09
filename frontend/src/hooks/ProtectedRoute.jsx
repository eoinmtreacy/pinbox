// this hook is designed to protect /mainpage/{pinbox_id}
// if no account exists for that user
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import checkUserExists from '../utils/checkUserExists';

export default function ProtectedRoute({ element: Component }) {
  const { pinbox_id } = useParams();
  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const exists = await checkUserExists(pinbox_id);
      setUserExists(exists);
      setIsLoading(false);
    };

    fetchUser();
  }, [pinbox_id]);

  if (isLoading) return <div>Loading...</div>; // Or any loading indicator

  if (!pinbox_id) return <Component />;

  return userExists ? <Component /> : <Navigate to="/mainpage/" replace />;
};