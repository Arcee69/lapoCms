import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { appUrls } from '../../../../services/urls';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';

const AddLgas = () => {
    const [loading, setLoading] = useState(false)
    const [statesOptions, setStatesOptions] = useState([]) 

    const getStates = async() => {
        try {
            const res = await api.get(appUrls?.STATE_URL)
            setStatesOptions(res?.data.data)
            console.log(res, "mix")
        } catch (err) {
            console.log(err, "err")
        }
    }

    const submitForm = async (values) => {
        const lgas = values?.lg.split(",").map(lga => lga.trim()).filter(Boolean);
        setLoading(true)
        const data = {
            "state_id": values?.state,
            "lgas": lgas
        }
        try {
            const res = await api.post(appUrls?.MASS_CREATE_LGA_URL, data)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
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
        <p className='text-black text-xl font-semibold'>Add Lgas</p>
    
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
                                state: "",
                                lg: "",
                            }}
                            // validationSchema={formValidationSchema}
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
                                    <label htmlFor='state' className="text-base text-left font-semibold text-[#000000]">State</label>
                                    <select
                                        name='state'
                                        value={values.state} 
                                        onChange={handleChange} 
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
                                    <label htmlFor='Local Government' className="text-base text-left font-semibold text-[#000000]">Lgas</label>
                                    <textarea
                                        name="lg"
                                        placeholder="Ikeja, Ikorodu"
                                        type="text" 
                                        value={values.lg}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[140px] border-solid  p-3 border"
                                    ></textarea>
                                    {errors.lg && touched.lg ? (
                                    <div className='text-RED-_100'>{errors.lg}</div>
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

export default AddLgas