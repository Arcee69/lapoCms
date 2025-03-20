import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';

import { CgSpinner } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';


const UpdateFaq = () => {
    const [loading, setLoading] = useState(false)
    const [faqCategory, setFaqCategory] = useState([])

    const formValidationSchema = Yup.object().shape({
        question: Yup.string().required("Question is Required"),
        answer: Yup.string().required("Answer is Required"),
    });

    const { state } = useLocation()
    const navigate = useNavigate()

    // const getFaqCategory = async () => {
    //     setLoading(true)
    //     try {
    //         const res = await api.get(appUrls?.FAQ_CATEGORY_URL)
    //         setFaqCategory(res?.data?.data)
    //         console.log(res, "res")
    //     } catch (err) {
    //         console.log(err, "err")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     getFaqCategory()
    // }, [])

    const submitForm = async (values, actions) => {
        setLoading(true)
         const data = {
            "question": values?.question || state?.question,
            "answer": values?.answer || state?.answer,
            "category_id": state?.category_id      
        }
        await api.put(appUrls?.FAQ_URL + `/${state?.id}`, data)
        .then((res) => {
            toast("Faq Updated Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
            navigate("/view-faq")
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
        <p className='text-black text-xl font-semibold'>Update Faq</p>

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
                            question: state.question || "",
                            answer: state.answer || "",
                            // category: ""
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

                                        
                                {/* <div className="flex flex-col mx-2">
                                    <label htmlFor='question' className="text-base text-left font-semibold text-[#000000]">Category</label>
                                    <select
                                        name='category'
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                        onChange={handleChange}
                                        value={values.category}
                                    >
                                        <option value="">Select Faq Category</option>
                                        {
                                            faqCategory?.map((category, index) => (
                                                <option key={index} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.category && touched.category ? (
                                    <div className='text-RED-_100'>{errors.category}</div>
                                    ) : null}
                                </div> */}

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='question' className="text-base text-left font-semibold text-[#000000]">Question</label>
                                    <input
                                        name="question"
                                        placeholder="Question"
                                        type="text" 
                                        value={values.question}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                    />
                                    {errors.question && touched.question ? (
                                    <div className='text-RED-_100'>{errors.question}</div>
                                    ) : null}
                                </div>
                        

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='question' className="text-base text-left font-semibold text-[#000000]">Answer</label>
                                    <textarea
                                        name="answer"
                                        placeholder="Answer"
                                        type="text" 
                                        value={values.answer}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[140px] border-solid  p-3 border"
                                    ></textarea>
                                    {errors.answer && touched.answer ? (
                                    <div className='text-RED-_100'>{errors.answer}</div>
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


export default UpdateFaq