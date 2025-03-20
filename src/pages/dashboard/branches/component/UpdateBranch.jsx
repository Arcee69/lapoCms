import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { appUrls } from '../../../../services/urls';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateBranch = () => {
    const [loading, setLoading] = useState(false)
    const [statesOptions, setStatesOptions] = useState([]) 
    const [lgaOptions, setLgaOptions] = useState([])

    const formValidationSchema = Yup.object().shape({
        state: Yup.string().required('State is required'),
        lg: Yup.string().required('LGA is required'),
        name: Yup.string().required('Branch name is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string()
            .required('Phone number is required'),
            // .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
    });

    const { state } = useLocation()
    const navigate = useNavigate()

    const getStates = async () => {
        try {
            const res = await api.get(appUrls?.STATE_URL)
            setStatesOptions(res?.data.data)
        } catch (err) {
            console.log(err, "err")
        }
    }

    const getLgas = async (stateId) => {
        console.log(stateId, "stateId")
        try {
            const res = await api.get(appUrls?.GET_LGA_BY_STATE_URL + `/${stateId}`)
            setLgaOptions(res?.data?.data || [])
        } catch (err) {
            console.log(err, "err")
        }
    }

    const submitForm = async (values, actions) => {
        setLoading(true)
        const data = {
            "state_id": values.state || state?.state_id,
            "lga_id": values.lg || state?.lga_id,
            "name": values.name || state?.name,
            "address": values.address || state?.address,
            "phone_number": `0${values.phone}` || state?.phone_number,
        }
        try {
            const res = await api.put(appUrls?.CREATE_BRANCH_URL + `/${state?.id}`, data)
            console.log(res, "sick")
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            actions.resetForm()
            navigate("/view-branch")
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
        <p className='text-black text-xl font-semibold'>Update Branch</p>
    
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
                                name: state?.name || "",
                                address: state?.address || "",
                                phone: state?.phone_number ||"",
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
                                    <label htmlFor='state' className="text-base text-left font-semibold text-[#000000]">State</label>
                                    <select
                                        name='state'
                                        value={values.state} 
                                        onChange={(e) => {
                                            handleChange(e); // Update Formik state
                                            getLgas(e.target.value); // Fetch LGAs for the selected state
                                            setFieldValue('lg', ''); // Reset LGA selection
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
                                    <label htmlFor='state' className="text-base text-left font-semibold text-[#000000]">Lga</label>
                                    <select
                                        name='lg'
                                        value={values.lg} 
                                        onChange={handleChange} 
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    >
                                        <option value="">Select Lga</option>
                                        {
                                            lgaOptions.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.lg && touched.lg ? (
                                    <div className='text-RED-_100'>{errors.lg}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='branch name' className="text-base text-left font-semibold text-[#000000]">Branch Name</label>
                                    <input
                                        name="name"
                                        placeholder="Branch Name"
                                        type="text" 
                                        value={values.name}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    />
                                    {errors.name && touched.name ? (
                                    <div className='text-RED-_100'>{errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='Address' className="text-base text-left font-semibold text-[#000000]">Address</label>
                                    <input
                                        name="address"
                                        placeholder="Branch Address"
                                        type="text" 
                                        value={values.address}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    />
                                    {errors.address && touched.address ? (
                                    <div className='text-RED-_100'>{errors.address}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col mx-2">
                                    <label htmlFor='Phone' className="text-base text-left font-semibold text-[#000000]">Phone Number</label>
                                    <input
                                        name="phone"
                                        placeholder="09012345678"
                                        type="number" 
                                        value={values.phone}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-auto border-solid  p-3 border"
                                    />
                                    {errors.phone && touched.phone ? (
                                    <div className='text-RED-_100'>{errors.phone}</div>
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

export default UpdateBranch