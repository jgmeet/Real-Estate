import {useSelector} from 'react-redux'

export default function Profile() {
  const {user} = useSelector((state) => state.user)

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
        <div className='text-red-700 cursor-pointer text-lg hover:underline'>Delete account</div>
        <div className='text-red-700 cursor-pointer text-lg hover:underline'>Sign out</div>

      </div>

    </div>
  )
}