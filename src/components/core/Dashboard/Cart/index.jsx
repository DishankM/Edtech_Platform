import { useSelector } from "react-redux"



export default function Cart(){

    const {total, totalItems} = useSelector((state) => state.auth);
    return(
        <div className="text-white my-44 mx-52 w-[1000px]">
            <h1>Your Cart</h1>
            <p>{totalItems} Courses in Cart</p>
            {
                total > 0 ? 
             (<div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
             </div>)
             : (<p>Your Cart is empty</p>)
            }
        </div>
    )
}