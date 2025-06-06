import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'

import Upload from "../../../../assets/icons/upload.png"
import uploadLogo from "../../../../assets/Icons/uploadLogo.svg"
import { api } from '../../../../services/api'
import { appUrls } from '../../../../services/urls'
import axios from 'axios'


const AddVid = ({ handleClose }) => {
    const [loading, setLoading] = useState(false)
    const [pic, setPic] = useState(null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPic(selectedFile)
    };

    const token = localStorage.getItem("token")

  

    const submitForm = async (values, action) => {
        setLoading(true)
        
        let formData = new FormData();
        formData.append("title", values?.title);
        formData.append("thumb", pic);
        formData.append("link", values?.link);

        try {
            const res = await api.post(appUrls?.VID_URL, formData)
            console.log(res, "pop");
            toast(`${res?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
            handleClose();
            window.location.reload()
        } catch (err) {
            console.error(err, "err");
            toast(`${err?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
        } finally {
            setLoading(false)
        }
    };


  return (
    <div className='w-[700px] h-[500px] overflow-y-auto  mt-[20px] rounded-lg bg-[#fff] flex flex-col  py-[40px] '>
        <div className='flex w-full'>
        <Formik
            initialValues={{
                title: "",
                link: ""
            }}
                // validationSchema={formValidationSchema}
                onSubmit={(values, action) => {
                window.scrollTo(0, 0);
                console.log(values, "market")
              
                submitForm(values, action);
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
            <Form onSubmit={handleSubmit} className="w-full flex flex-col ">
                <div className="w-full flex flex-col gap-[24px]">
                   
                    <div className='flex flex-col mx-auto  bg-transparent rounded-lg items-center w-[400px] border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                        <div className='p-[9px] w-[300px] cursor-pointer flex justify-center gap-[16px] '>
                            {  
                                pic?.name ? 
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-[15px] font-hanken text-[#858585]'>{pic?.name}</p>
                                            <p className='text-[#000] text-[11px]'>Completed</p>
                                        </div>
                                        <div className='w-[266px] h-[5px] bg-[#51E38B] rounded-lg'></div>
                                    </div> 
                                    :
                                    <div className='flex flex-col items-center gap-[16px]'>
                                        <img src={Upload} alt='upload' className='w-[56px] h-[56px]' />
                                        <div className='flex flex-col'>
                                            <p className='text-sm font-semibold font-inter text-center text-[#E78020]'>
                                                Click the button below to upload thumb image 
                                                {/* <span className='text-[#475367]'>or drag and drop</span> */}
                                            </p>
                                            <p className='text-xs text-center font-medium text-[#98A2B3]'>SVG, PNG, JPG or GIF (max. 800x300px)</p>
                                        </div>
                                        <div className='flex gap-1.5 invisible items-center'>
                                            <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                            <p className='text-xs font-inter font-semibold text-[#98A2B3]'>OR</p>
                                            <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                        </div>
                                        <label htmlFor="fileInput" className='cursor-pointer px-[22px] flex justify-center items-center h-[39px] rounded-[5px] bg-[#E78020] text-[#FFF] text-sm font-inter font-semibold'>
                                            Browse Files
                                            <input
                                                type="file"
                                                id="fileInput"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                            }
                            
                        </div>
                    </div>


                    <div className='flex flex-col gap-4 mx-8'>
                        <div className='flex flex-col  '>
                              <label htmlFor='title' className=' font-medium text-[#1E1E1E] text-sm'>Video Title</label>
                              <input
                                  name="title"
                                  placeholder=""
                                  type="text" 
                                  value={values?.title}
                                  onChange={handleChange}
                                  className="outline-none w-full p-2 bg-[#FFF] border  border-[#D0D5DD] h-[48px] rounded-lg border-solid "
                              />
                              {errors.title && touched.title ? (
                              <div className="text-RED-_100 text-xs">
                                  {errors.title}
                              </div>
                              ) : null}
                        </div>

                    </div>

                    <div className='flex flex-col gap-4 mx-8'>

                        <div className='flex flex-col  '>
                              <label htmlFor='link' className=' font-medium text-[#1E1E1E] text-sm'>Video Link</label>
                              <input
                                  name="link"
                                  placeholder=""
                                  type="text" 
                                  value={values?.link}
                                  onChange={handleChange}
                                  className="outline-none w-full p-2 bg-[#FFF] border  border-[#D0D5DD] h-[48px] rounded-lg border-solid "
                              />
                              {errors.link && touched.link ? (
                              <div className="text-RED-_100 text-xs">
                                  {errors.link}
                              </div>
                              ) : null}
                        </div>

                    </div>

                    
                
                    <div className='flex justify-between gap-[32px] items-center mx-8'>
                        <button
                            className='w-[220px] border rounded-lg border-[#E78020] bg-[#fff] flex items-center justify-center  h-[49px]'
                            type='button'
                            onClick={handleClose}
                        >
                            <p className='font-merri font-bold text-base text-[#E78020]'>Cancel</p>
                        </button>
                        <button
                            className="w-[536px]  flex items-center border-none  rounded-lg justify-center  h-[49px] bg-[#E78020] text-base  text-center"
                            type="submit"
                        >
                            <p className='text-[#fff] text-base  font-merri text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Upload'}</p>
                        </button>

                    </div>
                </div>

            </Form>
            )}
        </Formik>

    </div>

    </div>
  )
}

export default AddVid