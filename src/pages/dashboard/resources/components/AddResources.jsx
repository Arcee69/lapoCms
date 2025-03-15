import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';



const AddResources = () => {
    const [loading, setLoading] = useState(false)
    const [fileData, setFileData] = useState(null)
    const [fileName, setFileName] = useState('')
    const [fileUploadLoading, setFileUploadLoading] = useState(false)

    const formValidationSchema = Yup.object().shape({
        title: Yup.string().required("Blog Title is Required"),
        category: Yup.string().required('Category is required'),
        description: Yup.mixed().required("Description is Required")
    });


    const fileInputRef = useRef(null)
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setFileData(file)
    };

    const handleRemoveFile = () => {
        setFileName('');
        setFileData('')
        fileInputRef.current.value = ''; // Clear file input
    };

    const submitForm = async (values, actions) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("title", values?.title);
        formData.append("category", values?.category);
        formData.append("desc", values?.description);
        formData.append("file", fileData);

        await api.post(appUrls?.CREATE_RESOURCES_URL, formData)
        .then((res)=> {
            toast("Resources Created Successfully", {
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
        <p className='text-black text-xl font-semibold'>Create Resources</p>

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
                            title: "",
                            category: "",
                            description: "",
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
                                        placeholder="ex. 2023 Yearly Report"
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
                                    <label htmlFor='Category' className="text-base text-left font-semibold text-[#000000]">Category</label>
                                    <select
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[48px] border-solid  p-3 border"
                                    >
                                        <option value="">Category</option>
                                        <option value="annual_report">Annual Report</option>
                                        <option value="brochure">Brochure</option>
                                        <option value="form">Form</option>
                                        <option value="sdg_badge">Sdg Badge</option>
                                    </select>
                                    {errors.category && touched.category ? (
                                    <div className='text-RED-_100'>{errors.category}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col mx-2 gap-1'>
                                    <label htmlFor='uploadManuscript-id' className='text-base text-left font-semibold text-[#000000]'>
                                        File 
                                    </label>
                                    <div className='flex items-center mb-4 justify-between w-full border lg:w-[507px] h-[50px] p-3 border-solid rounded'>
                                        <div className='flex items-center flex-1'>
                                            <input
                                                type='text'
                                                className='placeholder:text-[#D4D4D0] font-inter rounded outline-none w-full bg-[#F8F8F8] '
                                                value={fileName}
                                                placeholder='No file chosen'
                                                readOnly
                                            />
                                            <input 
                                                type='file'
                                                className='hidden'
                                                ref={fileInputRef}
                                                onChange={(e) => handleFileChange(e)}
                                                id="uploadManuscript-id"
                                                accept=".pdf,.doc,.docx,.epub" // Add appropriate accept attribute
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={fileName ? handleRemoveFile : () => fileInputRef.current.click()}
                                            className='bg-[#EDEDED] w-[116px] p-2 text-center font-inter text-base rounded' 
                                        >
                                            {fileName ? 'Remove' : 'Choose File'}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='description' className="text-base text-left font-semibold text-[#000000]">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="description"
                                        type="text" 
                                        value={values.description}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[100px] border-solid  p-3 border"
                                    ></textarea>
                                    {errors.description && touched.description ? (
                                    <div className='text-RED-_100'>{errors.description}</div>
                                    ) : null}
                                </div>

                                    

                            
                            </div>

                            <div className='flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center'>
                                <button 
                                type="submit" 
                                className="w-6/12 bg-[#E78020] border-none p-3 text-white flex items-center justify-center text-sm rounded-tl-2xl rounded-tr-md rounded-b-md "
                                style={{ width: "130px" }}
                                >
                                    <p className='text-[#fff] text-sm  text-center  font-semibold'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Submit'}</p>
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



export default AddResources