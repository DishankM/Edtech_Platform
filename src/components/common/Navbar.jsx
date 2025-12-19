import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/StudyHelper.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
//import { apiConnector } from '../../services/apiconnector'
//import { categories } from '../../services/api'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

const sublinks = [
    {
        title: "python",
        link: "catalog/python",
    },
    {
        title: "JAVA",
        link: "catalog/java",
    }
]
function Navbar() { 

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)

    // const [sublinks, setsublinks] = useState([]);
    // const fetchSublinks = async () => {
    //     try {
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         if (result?.data?.data?.length > 0) {
    //             setsublinks(result?.data?.data);
    //         }
    //         localStorage.setItem("sublinks", JSON.stringify(result.data.data));

    //     } catch (error) {
            
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     fetchSublinks();
    // }, [])

    const location = useLocation()
    const matchRoute = (routes) =>{
        return matchPath({path: routes}, location.pathname)
    }


  return (
    <div className='flex h-14 items-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy'/>            
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) =>(
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div className='relative flex items-center gap-1 group'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className='invisible absolute left-[50%] top-[2%] flex flex-col translate-x-[-50%] translate-y-[50%]
                                            rounded-md bg-richblack-5 text-richblack-900 opacity-0 p-4 transition-all duration-200 
                                            group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                            <div className='absolute left-[51%] top-0 bg-richblack-5 translate-x-[50%] translate-y-[-45%] 
                                              h-6 w-6 rotate-45 rounded'></div>
                                            {
                                                    sublinks.length ? (
                                                        sublinks.map((sublinks, index) => (
                                                            <Link to={`${sublinks.link}`} key={index}>
                                                                <p>{sublinks.title}</p>
                                                            </Link>
                                                        ))
                                                    ) :(<div></div>)

                                            }
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className= {`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav> 

{/* Login , Signup, Dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType != "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token == null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token == null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                 {
                        token !== null && (
                            <div className='pt-2' >
                                <ProfileDropDown />
                            </div>
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default Navbar

