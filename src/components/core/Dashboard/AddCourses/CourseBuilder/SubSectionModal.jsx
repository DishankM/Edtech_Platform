import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createSubSection, updateSubSection} from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from "../../../../../slices/courseSlice"
import { RxCross2 } from "react-icons/rx";
import IconBtn from '../../../../common/IconBtn';
//import Upload from '../Upload';

function SubSectionModal({
  modalData,
  setModelData,
  add = false,
  view = false,
  edit = false,
}) {

  const {
    register,
    handleSubmit,
    setValue,
    getValues, 
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);   

  const isFromUpdated = () => {
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl){
        return true;
      }
    else {
      return false;
    }
      
  }

  const handleEditSubSection = async() => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append('sectionId', modalData.sectionId);
    formData.append('subSectionId', modalData._id);

    if(currentValues.lectureTitle !== modalData.title){
      formData.append('title', currentValues.lectureTitle);
    }

    if(currentValues.lectureDesc !== modalData.description){
      formData.append('description', currentValues.lectureDesc);
    }

    if(currentValues.lectureVideo !== modalData.video){
      formData.append('video', currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if(result){
      dispatch(setCourse(result));
    }
    setModelData(null);
    setLoading(false)
  }
  const onSubmit = async(data) => {
    if(view) 
      return;
    if(edit){
      if(!isFromUpdated){
        toast.error("No changes made to the form")
      }
      else{
        //edit krdo store me
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append('sectionId', modalData);
    formData.append('title', data.lectureTitle);
    formData.append('description', data.description);
    formData.append('video', data.lectureVideo);
    setLoading(true);  

    //API CALL 
    const result = await createSubSection(formData, token);

    if(result){
      //todo: check for updates
      dispatch(setCourse(result));
    }
    setModelData(null);
    setLoading(false);
  }
  
  return (
    <div>
       <div>
        <div>
          <p>{view && "Viewing"} {add && "Adding"} {edit && 'Editing'} Lecture</p>
          <button onClick={() => (!loading ? setModelData(null) : {})}>
             <RxCross2/>
          </button>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Upload
          name='LectureVideo'
          register={register}
          setValue={setValue}
          error={errors}
          video={true}
          videoData={view ? modalData.videoUrl : null}
          editData = {edit ? modalData.videoUrl : null}
          />

          <div>
            <label htmlFor="">Lecture Title</label>
            <input id='lectureTitle'
            placeholder='Enter Lecture Title'
            {...register('lectureTitle', {required: true})}
            className='w-full'
            />
            {errors.lectureTitle && (<span>
              Lecture Title is required
            </span>)}
          </div>
          <div>
            <label htmlFor="">Lecture Description</label>
            <textarea name="" id="LectureDesc"
            placeholder='Enter Lecture Description'
            {...register('lectureDesc', {required: true})}
            className='w-full min-h-[130px]'/>
            {
              errors.lectureDesc && (
                <span>Lecture Description is required</span>
              )
            }
          </div>

          {
            !view && (
              <div>
                <IconBtn
                text= {loading ? "Loading...": edit ? "Save Changes" : "Save"}
                />

                
              </div>
            )
          }
        </form>
       </div>
    </div>
  )
}

export default SubSectionModal  
 
