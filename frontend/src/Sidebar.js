import { Link, Outlet } from "react-router-dom";
import logo from './assets/sars.jpg';
import pencil from './assets/icons/pencil.svg';
import trash from './assets/icons/trash.svg';
import account from './assets/icons/account.svg';
import support from './assets/icons/support.svg';
import logout from './assets/icons/power.svg';
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="bg-slate-800 w-2/12 h-full">
            <div className="side-menu pl-7 pt-7 w-full h-full">
                <div className='flex align-middle h-auto cursor-pointer'>
                    <img src={logo} className="w-[3rem] rounded-full" alt="Logo" />
                    <h1 className='text-white font-extrabold text-3xl pl-1'>SARS-2023</h1>
                </div>
                <div className='navbar pt-[5rem] pl-[1rem] flex-col text-white text-2xl'>
                    <div className='list'>
                        <ul>
                            <li className='flex color-white align-middle pb-5 cursor-pointer hover:text-gray-400'>
                                <img src={pencil} className="w-[1.25rem]" alt="Pencil" />
                                <p className='pl-[1rem]'><Link to="/">My Prompts</Link></p>
                            </li>
                            <li className='flex color-white align-middle pb-5 cursor-pointer hover:text-gray-400'>
                                <img src={trash} className="w-[1.25rem]" alt="Trash" />
                                <p className='pl-[1rem]'><Link to="/trash">Trash</Link></p>
                            </li>
                            <li className='flex color-white align-middle pb-5 cursor-pointer hover:text-gray-400'>
                                <img src={account} className="w-[1.25rem]" alt="Account" />
                                <p className='pl-[1rem]'>Account</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='flex color-white align-middle pb-5 cursor-pointer hover:text-gray-400'>
                                    <img src={support} className="w-[1.25rem]" alt="Support" />
                                    <p className='pl-[1rem]'>Support</p>
                            </li>
                            <li className='flex color-white align-middle pb-5 cursor-pointer hover:text-gray-400'>
                                    <img src={logout} className="w-[1.25rem]" alt="Log Out" />
                                    <p className='pl-[1rem]'>Log Out</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Sidebar;