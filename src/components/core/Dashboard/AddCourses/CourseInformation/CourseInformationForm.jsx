import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI'
import { TbCoinRupee } from "react-icons/tb";
import {setCourse, setStep} from '../../../../../slices/courseSlice'
import { categories } from '../../../../../services/api';
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn';
import {toast} from 'react-hot-toast'

function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValue,
        formState:{errors},
    } = useForm();

    const dispatch= useDispatch();
    const {token} = useSelector((state) => state.auth)
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    
    useEffect(() =>{
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false)
        }

        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouwilllearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirement", course.instructions)
            //setValue("courseImage", course.thumbnail)
            
        }
        getCategories()
    }, [])

    const isFromUpdated = () => {
        const currentValues = getValue();
        if(currentValues.courseTitle !== course.courseName||
            currentValues.courseShortDesc !== course.courseDescription||
            currentValues.coursePrice !== course.price||
            //currentValues.courseTags !== course.tag||
            currentValues.courseBenefits !== course.whatYouwilllearn||
            currentValues.courseRequirement.toString() !== course.instructions.toString()
            //currentValues.courseImage !== course.thumbnail
        )
            return true;
        else
            return false;
    }

    const onSubmit = async(data) => {
        if(editCourse){
            
            if(isFromUpdated){
                const currentValues = getValue();
                const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName){
                formData.append('courseName', data.courseTitle);
            }

            if(currentValues.courseShortDesc !== course.courseDescription){
                formData.append('courseDescription', data.courseShortDesc);
            }
            if(currentValues.coursePrice !== course.price){
                formData.append('price', data.coursePrice);
            }
            // if (currentValues.courseTags.toString() !== course.tag.toString()) {
            //     formData.append("tag", JSON.stringify(data.courseTags))
            // }
            if(currentValues.courseBenefits !== course.whatYouwilllearn){
                formData.append('whatYouwilllearn', data.courseBenefits);
            }
            if(currentValues.courseCategory._id !== course.category._id){
                formData.append('category', data.courseCategory);
            }
            if(currentValues.courseRequirement.toString() !== course.instructions.toString()){
                formData.append('instructions', JSON.stringify(data.courseRequirement));
            }

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);
            if(result){
                setStep(2);
                dispatch(setCourse(result));
            }
        }else{
            toast.error("No Changes made so far");
        }
        return;
      }

      //create a new course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseDescription);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirement));
      //formData.append('status', COURSE_STATUS.DRAFT);

      setLoading(true);
      const result = await addCourseDetails(formData, token);
      if(result){
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
      setLoading(false);

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-md richblack-700 bg-richblack-800 p-6 space-y-8 mb-8'>
        <div className='flex flex-col space-y-2'>
            <label htmlFor="" className='text-sm text-richblack-5'>Course Title<sup>*</sup></label>
            <input type="text" name="courseTitle" id="courseTitle" 
            placeholder='Enter Courses Title'
            {...register("courseTitle", {required: true})}
            className='w-full'/>
            {errors.courseTitle && (
                <span>Course Title is Required**</span>
            )}
        </div>

        <div>
            <label htmlFor="courseShortDesc">Course Short Description <span>*</span></label>
            <textarea id="courseShortDesc" placeholder='Enter Decription'
            className='min-h-[140px] w-full '
            {...register("courseShortDesc", {require: true})}/>
            {
                errors.courseShortDesc && (
                    <span>Course Description is Required**</span>
                )
            }
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price <span>*</span></label>
            <input id='coursePrice' placeholder='Enter Course Price' 
            {...register("coursePrice", {required:true, valueAsNumber:true})}
            className='w-full'
            />
            <TbCoinRupee className=' absolute top-1/2 ' />
            {
                errors.coursePrice && (
                    <span>Enter the Course Price</span>
                )
            }
        </div>

         {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

        {/* //Create a custom component for handling tags input */}
        {/* <ChipInput
        label="Tags"
        name="courseTags" placeholder="Enter tags and press enter"
        register={register} errors={errors}
        setValue={setValue} getValue={getValue}
        /> */}

            {/* //Create a component for Uploading and showing preview of media */}
        {/* <Upload name="" label=""
        errors={errors} setValue={setValue}/> */}

        <div>
            <label htmlFor="coursebenefits" >Benefits of the course <span>*</span></label>
            <textarea name="coursebenefits" id="coursebenefits"
            placeholder='Enter Benefits of course'
            {...register("courseBenefits", {require:true})}
            className="Min-h-[130px] w-full"/>
            {
                errors.courseBenefits && (
                    <span>
                        Benefits of the course are required**
                    </span>
                )
            }
        </div>

        <RequirementField name="courseRequirements" 
        label="Requirement/Instructions"
        errors={errors} setValue={setValue} getValue={getValue}/>

        <div>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'>
                        Continue without Saving 
                    </button>
                )
            }

            <IconBtn
            text={!editCourse ? "Next": "Save Changes"}/>
        </div>
    </form>


  )
}

export default CourseInformationForm