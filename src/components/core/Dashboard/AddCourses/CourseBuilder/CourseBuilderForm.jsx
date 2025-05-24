import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { MdOutlineAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { GrCaretNext } from "react-icons/gr";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import {createSection, updateSection} from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView';

function CourseBuilderForm() {
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  console.log("Course Content Length before rendering NestedView:", course.courseContent.length);


  const onSubmit = async  (data) =>{
     setLoading(true);
     let result;

     if(editSectionName){
      //We are editing a section Name
      result = await updateSection(
        { 
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )}
     else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token) 
     }
     // Log the result received from API
      console.log("API Response - New Course Data:", result);

     //Update Value
     if(result){
      dispatch(setCourse(result));
      console.log("Updated Course Data in Redux:", result); // Log after updating Redux
      setEditSectionName(null);
      setValue("sectionName", "")  
     }
     setLoading(false);
  }
  const cancleEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course.courseContent.length == 0){
      toast.add("Please Add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subsection.length )){
      toast.error("Please Add atleast One Lecture in each section");
      return;
    }
    //If everything is good
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancleEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName)
  }

  return (
    <div className='text-white'>
       <h1>Course Builder</h1>
       <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">Section Name <sup>*</sup></label>
          <input type="text" 
          id='sectionName'
          placeholder='Add Section Name'
          {...register("sectionName",{required: true})}
          className='w-full text-black'/>
          {
            errors.sectionName && (
              <span>Secion Name is Required</span>
            )
          }
        </div>
        <div className='mt-6 flex'>
          <IconBtn
          type='Submit' text={editSectionName ? "Edit Secion Name": "Create Section Name"}
          outline={true} >
            <MdOutlineAddCircle />
          </IconBtn>
          {
            editSectionName && (
              <button type='button' onClick={cancleEdit} className='text-white text-sm underline'>
                Cancel Edit
              </button>
            )
          }
        </div>
       </form>

      
      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }
      <div className='flex justify-end gap-x-5 mt-5 '>
        <button onClick={goBack} 
        className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>
        <IconBtn text="Next" onClick={goToNext}>
        <GrCaretNext />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm