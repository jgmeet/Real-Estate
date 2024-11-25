import { configureStore } from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function handleDeleteUser() {

    try {
      dispatch(deleteUserStart());
        console.log('delete user start')
      const res = await fetch(`/api/auth/delete/${user._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  async function handleSignOut() {
    try {
      dispatch(signOutUserStart())
      console.log('inside handle signout')
      const res = await fetch('/api/auth/sign-out');
      const data = await res.json();
      if (!res.ok) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/sign-in')
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <div className='flex flex-col items-center gap-2'>
        <div className='items-center bg-slate-200 shadow-md p-4'>
            <div className='text-2xl mb-2' >
                <span className='text-slate-500' > Username </span> : {user.username}</div>
            <div className='text-2xl' >
                <span className='text-slate-500' > Email </span> : {user.email}</div>
        </div>

        <div onClick={handleDeleteUser} className='text-red-700 cursor-pointer text-lg hover:underline'>Delete account</div>
        <div onClick={handleSignOut} className='text-red-700 cursor-pointer text-lg hover:underline'>Sign out</div>

      </div>

    </div>
  )
}