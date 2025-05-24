import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserCourses as getUserEnrolledCourses}  from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const EnrolledCourses = () => {
    const dispatch=useDispatch();

    const {token}  = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [progressData, setProgressData] = useState(undefined);
    const [Loading, setLoading] = useState(false);


    const getEnrolledCourses = async() => {
        setLoading(true);
            const response = await getUserEnrolledCourses(token,dispatch);
            console.log("getEnrolledCourses -> response", response?.courseProgress);
            setLoading(false);
            setEnrolledCourses(response?.courses);
            setProgressData(response?.courseProgress);

    }

    useEffect(()=> {
        getEnrolledCourses();
    },[]);

    if(Loading) {
        return (
            <div className='flex h-[calc(100vh)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500'></div>
            </div>
        )
    }

  return (
    <div className='text-white w-[1000px] justify-center'>
        <h1 className=''>Enrolled Courses</h1>
        {
          !enrolledCourses ? (<div>
            Loading....
          </div>)
          : !enrolledCourses.length ? (<p>You have not enrolled in any courses yet</p>)
          : (
            <div>
              <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>
              {/* Course Start HERE */}
              {
                enrolledCourses.map((course, index) => (
                  <div>
                    <div>
                      <img src={course.thumbnail} alt="" />
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                      </div>
                    </div>

                    <div>
                      {course?.totalDuration}
                    </div>

                    <div>
                      <p>Progress: {course.progressPercentage || 0}</p>
                      <ProgressBar completed={course.progressPercentage || 0}/>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
    </div>
  )
}

export default EnrolledCourses