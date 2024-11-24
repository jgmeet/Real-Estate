import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
    return <header>
        <div className="bg-[#e2e8f0] flex justify-between py-4 items-center px-2 shadow-md">
        
        <Link to={'/'}>
            <div className="font-bold text-sm sm:text-xl">
                <span className="text-[#64748b]">Jagmeet</span>  
                <span>Estate</span>
            </div>
        </Link>
        

        <div className='flex justify-between bg-slate-50 items-center p-2 rounded-lg'>
            <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-30 sm:w-64' />
            <FaSearch />
        </div>
        
        <div className='flex gap-4'>
            <Link to={'/'}>
            <div className='hidden sm:inline text-slate-700 hover:underline'>Home</div>
            </Link>
            <Link to={'/about'}>
            <div className='hidden sm:inline text-slate-700 hover:underline'>About</div>
            </Link>
            <Link to={'/sign-in'}>
            <div className='hover:text-slate-600'>Sign In</div>
            </Link>
        </div>
        

        </div>
    </header>
}