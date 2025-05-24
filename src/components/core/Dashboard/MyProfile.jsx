import { RiEditBoxLine } from "react-icons/ri"
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn';

function MyProfile() {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();

  return (
    <div className='w-[1000px] py-10'>
        <div className='text-white mx-auto w-11/12'>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
            My Profile
        </h1>

        {/* Section 1 */}
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12 '>
            <div className='flex items-center gap-x-4 '>
                <img src={user?.image} alt={`profile-${user?.firstname}`} 
                className='aspect-square w-[78px] rounded-md object-cover'/>
                <div>
                    <p>{user?.firstName + " " + user?.lastName}</p>
                    <p className='mb-2 text-sm text-richblack-100'>{user?.email}</p>
                </div>
            </div>
            <IconBtn 
            text="Edit" onClick={() => navigate("/dashboard/settings")} >
            <RiEditBoxLine/>
            </IconBtn>

        </div>

        {/* Section 2 */}
        <div className='my-10 flex flex-col  justify-between rounded-md border-[1px] border-richblue-700 bg-richblue-800 mt-5 p-3 md:p-8 md:px-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>About</p>
                <div>
                <IconBtn text="Edit" onClick={
                    () => {navigate("/dashboard/settings ")}
                } >
                    <RiEditBoxLine/>
                </IconBtn>
                
                </div>
            </div>
            <p>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
        </div>

        {/* Section 3 */}
        <div className='my-10 flex flex-col  justify-between rounded-md border-[1px] border-richblue-700 bg-richblue-800 mt-5 p-3 md:p-8 md:px-12'>
           <div className='flex w-full items-center justify-between'>
           <p className='font-bold'>Personal Details</p>
            <IconBtn 
            text="Edit" onClick={() => navigate("/dashboard/settings")} >
                <RiEditBoxLine/>
            </IconBtn>
           </div>
           <div className='flex flex-col md:flex-row  gap-y-5 justify-between max-w-[500px]'>
            <div className='flex flex-col gap-y-5'>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>First Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Email</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Gender</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                </div>

            <div className='flex flex-col gap-y-5'>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Last Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                </div>
                <div >
                    <p className='mb-2 text-sm text-richblack-100'>Phone Number</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Date of Birth</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
             </div>
            
           </div>
        </div>
    </div>
    </div>
  )
}

export default MyProfile