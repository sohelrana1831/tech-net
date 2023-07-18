import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { auth } from './lib/firebase';
import { useAppDispatch } from './redux/hooks';
import { setLodging, setUser } from './redux/features/user/userSlices';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLodging(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLodging(false));
      } else {
        dispatch(setLodging(false));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
