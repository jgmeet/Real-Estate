import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice.jsx';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

      const data = await res.json();
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      }
      else {
        dispatch(signInFailure(data.message));
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return ( <>
        <button disabled={loading} onClick={handleGoogleClick} type='button'className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'> 
            {loading ? 'Loading...' : 'Continue with Google'}
        </button>
    </>
  );
}