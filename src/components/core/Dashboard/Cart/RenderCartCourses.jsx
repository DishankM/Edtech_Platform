import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from 'react-icons/gi'
import {ReactStars} from 'react-rating-stars-component'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'


function RenderCartCourses() {

    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
  return (
    <div>
        {
            cart.map((course, index) => {
                <div className='text-white'>
                    <div>
                        <img src={course?.tumbnail} alt="" />
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.5</span>
                                <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#fff700"
                                emptyIcon={<GiNinjaStar/>}
                                fullIcon= {<GiNinjaStar/>}
                                />
                                <span>{course?.ratingAndReviwes?.length}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => dispatch(removeFromCart(course._id))}>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>
                        <p>Rs.{course?.price}</p>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses