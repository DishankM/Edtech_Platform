import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModel'
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';

function NestedView({handleChangeEditSectionName}) {
  const {course} = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth); 
  const dispath = useDispatch();
  
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection]  = useState(null);

  const [confirmationModel, setConfirmationModel] = useState(null);
   
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection ({
      sectionId, 
      courseid: course._id,
      token,
    })
    if(result){
      dispath(setCourse(result));
    }
    setConfirmationModel(null);
  }

  const handleDeleteSubSection =  async (subSectionId, sectionId) =>{
    const result = await deleteSubSection({subSectionId, sectionId, token});
    if(result){
      //...Extra what will be happen
      dispath(setCourse(result));
    }
    setConfirmationModel(null);
  }

  return (
    <div>
      <div className='rounded-lg bg-richblack-700 p-5 px-6 mt-2'>
        {course?.courseContent?.map((section) => {
        console.log("Rendering Section:", section);
        return (
          <details key={section._id} open>
            <summary className='flex items-center justify-between gap-x-3 border-b-2 '>
              <div className='flex items-center gap-x-3'>
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>
              <div className='flex items-center gap-x-3'>

                <button
                onClick={() => handleChangeEditSectionName(section._id, section.name)}>
                 <MdModeEditOutline />
                </button>

                <button 
                onClick={() => {
                  setConfirmationModel({
                    text1: "Delete this Section",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModel(null),
                  })
                }}
                >
                <RiDeleteBin6Line />
                </button>
                <span>|</span> 
                <BiSolidDownArrow className={`text-richblack-500`}/>   
              </div>
            </summary>

                //Subsection
            <div>
              {
                section.subSection.map((data) => (
                  <div key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className='flex items-center justify-cenetr gap-x-3 border-b-2'>
                    <div className='flex items-center gap-x-3'>
                      <RxDropdownMenu />
                      <p>{data.title}</p>
                    </div>

                    <div
                    className='flex items-center gap-x-2'>
                      <button
                      onClick={() => setEditSubSection({...data, sectionId: section._id})}>
                        <MdModeEditOutline/>
                      </button>
                      <button
                      onClick={() => {
                        setConfirmationModel({
                          text1: "Delete this Sub Section",
                          text2: "All the lectures in this Subsection will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModel(null),
                        })
                      }}>
                        <RiDeleteBin6Line/>
                      </button>
                    </div>
                  </div>
                ))
              }
              
              <button
              onClick={() => setAddSubSection(section._id)}
              className='flex mt-4 items-center gap-x-2 text-yellow-50'>
                 <FiPlus/>
                 <p>Add Lecture</p>
              </button>
            </div>

          </details>
        );
      })}
      </div>   

      {addSubSection ? (<SubSectionModal
        modalData={addSubSection}
        setModalData= {setAddSubSection}
        add = {true}
      />) : 

      viewSubSection ? (<SubSectionModal
        modalData={viewSubSection}
        setModalData= {setViewSubSection}
        view = {true}
      />) :

      editSubSection ? (<SubSectionModal
        modalData={editSubSection}
        setModalData= {setEditSubSection}
        edit = {true}
      />) :
      (<div></div>)
      }

      {confirmationModel ?
        (
          <ConfirmationModal modalData= {confirmationModel}/>
        )
        : (<div></div>)
      } 
      
    </div>
  )
}

export default NestedView

