import React, { useState, useEffect } from 'react'
import { CgSpinner } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom"

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';



const UpdateJob = () => {
    const [statesOptions, setStatesOptions] = useState([]);
    const [loading, setLoading] = useState(false) 

    const { state } = useLocation()

     const formValidationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        role: Yup.string().required('Role is required'),
        link: Yup.string().required('Link is required'),
        state: Yup.string().required('State is required'),
        workType: Yup.string().required('Work Type is required'),
        employmentType: Yup.string().required('Employment Type is required'),
    });

    const workTypeOptions = ["remote","hybrid","onsite"]
    const employmentTypeOptions = ["full-time","part-time","contract"]

    const getStates = async () => {
        try {
            const res = await api.get(appUrls?.STATE_URL)
            setStatesOptions(res?.data.data)
        } catch (err) {
            console.log(err, "err")
        }
    }

    const submitForm = async (values, actions) => {
            setLoading(true)
            const data = {
                "title": values.title,
                "role": values.role,
                "link": values.link,
                "state_id": values.state,
                "work_type": values.workType,
                "employment_type": values.employmentType
            }
            try {
                const res = await api.put(appUrls?.CREATE_JOBS_URL + `/${state?.id}`, data)
                console.log(res, "sick")
                toast(`Job Updated Successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
                actions.resetForm()
            } catch (err) {
                toast(`${err?.data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
            } finally {
                setLoading(false)
            }
        }

    useEffect(() => {
        getStates()
    }, [])

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Update Job</p>

        <div className="flex items-center ">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5 }}
                className=""
            >
                <div className='flex flex-col gap-6 lg:w-[607px] border border-solid p-8'> {/* h-[670px] */}
                    
                    <div className="h-auto">
                        <Formik
                        initialValues={{
                            title: state.title || "",
                            role: state.role || "",
                            link: state.link || "",
                            state: state.state.name || "",
                            workType: state.work_type || "",
                            employmentType: state.employment_type ||"",
                        }}
                        validationSchema={formValidationSchema}
                        enableReinitialize={true}
                        onSubmit={(values, actions) => {
                            // window.scrollTo(0, 0)
                            console.log(values, "often")
                            submitForm(values, actions)
                        }}
                        >
                        {({
                            handleSubmit,
                            handleChange,
                            dirty,
                            isValid,
                            setFieldValue,
                            errors,
                            touched,
                            // setFieldTouched,
                            values,
                        }) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col w-full">
                            <div className='flex flex-col gap-6 lg:items-center'>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='title' className="text-base text-left font-semibold text-[#000000]">Title</label>
                                    <input
                                        name="title"
                                        placeholder="ex. Frontend developer, Backend Developer"
                                        type="text" 
                                        value={values.title}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                    />
                                    {errors.title && touched.title ? (
                                    <div className='text-RED-_100'>{errors.title}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='role' className="text-base text-left font-semibold text-[#000000]">Role</label>
                                    <input
                                        name="role"
                                        placeholder="ex. Engineering, Sales"
                                        type="text" 
                                        value={values.role}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                    />
                                    {errors.role && touched.role ? (
                                    <div className='text-RED-_100'>{errors.role}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='link' className="text-base text-left font-semibold text-[#000000]">Link</label>
                                    <input
                                        name="link"
                                        placeholder="ex. https://"
                                        type="text" 
                                        value={values.link}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                    />
                                    {errors.link && touched.link ? (
                                    <div className='text-RED-_100'>{errors.link}</div>
                                    ) : null}
                                </div>
         
                                <div className="flex flex-col mx-2">
                                    <label htmlFor='state' className="text-base text-left font-semibold text-[#000000]">State</label>
                                    <select
                                        name='state'
                                        value={values.state} 
                                        onChange={(e) => {
                                            handleChange(e); // Update Formik state
                                        }}
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    >
                                        <option value="">Select States</option>
                                        {
                                            statesOptions.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.state && touched.state ? (
                                    <div className='text-RED-_100'>{errors.state}</div>
                                    ) : null}
                                </div>   

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='Work Type' className="text-base text-left font-semibold text-[#000000]">Work Type</label>
                                    <select
                                        name='workType'
                                        value={values.workType} 
                                        onChange={(e) => {
                                            handleChange(e); // Update Formik state
                                        }}
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    >
                                        <option value="">Select Work Type</option>
                                        {
                                            workTypeOptions.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.workType && touched.workType ? (
                                    <div className='text-RED-_100'>{errors.workType}</div>
                                    ) : null}
                                </div>  

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='Employment Type' className="text-base text-left font-semibold text-[#000000]">Employment Type</label>
                                    <select
                                        name='employmentType'
                                        value={values.employmentType} 
                                        onChange={(e) => {
                                            handleChange(e); // Update Formik state
                                        }}
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    >
                                        <option value="">Select Employment Type</option>
                                        {
                                            employmentTypeOptions.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.employmentType && touched.employmentType ? (
                                    <div className='text-RED-_100'>{errors.employmentType}</div>
                                    ) : null}
                                </div>  

                        
                    
                            
                            </div>

                            <div className='flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center'>
                                <button 
                                    type="submit" 
                                    className="w-6/12 bg-[#E78020] border-none p-3 text-white flex items-center justify-center text-sm rounded-tl-2xl rounded-tr-md rounded-b-md "
                                    style={{ width: "130px" }}
                                >
                                    <p className='text-[#fff] text-sm  text-center font-semibold'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Submit'}</p>
                                </button>
                            </div>
                            

                        </Form>
                    )}
                        </Formik>
                    </div>

                </div>
                
            </motion.div>
            </div>

    </div>
  )
}

export default UpdateJob