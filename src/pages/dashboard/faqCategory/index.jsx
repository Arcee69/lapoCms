import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';

import { CgSpinner } from 'react-icons/cg';

const FaqCategory = () => {
     const [loading, setLoading] = useState(false)
  
      const formValidationSchema = Yup.object().shape({
        name: Yup.string().required("Faq Category Name is Required"),
      });
  
      const submitForm = async (values, actions) => {
          setLoading(true)
           const data = {
              "name": values?.name,
          }
          await api.post(appUrls?.FAQ_CATEGORY_URL, data)
          .then((res) => {
              toast("Faq category created Successfully", {
                  position: "top-right",
                  autoClose: 5000,
                  closeOnClick: true,
              })
              setLoading(false)
              actions.resetForm()
          })
          .catch((err) => {
              console.log(err, "soso")
              toast(`${err?.data?.message}`, {
                  position: "top-right",
                  autoClose: 5000,
                  closeOnClick: true,
              })
              setLoading(false)
          })
  
      }

  return (
    <div className='md:p-8 flex flex-col gap-4'>
            <p className='text-black text-xl font-semibold'>Add Faq Category</p>
    
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
                                name: "",
                               
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
                                        <label htmlFor='name' className="text-base text-left font-semibold text-[#000000]">Faq Category Name</label>
                                        <input
                                            name="name"
                                            placeholder="Faq Category Name"
                                            type="text" 
                                            value={values.name}
                                            onChange={handleChange}
                                            className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                        />
                                        {errors.name && touched.name ? (
                                        <div className='text-RED-_100'>{errors.name}</div>
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

export default FaqCategory