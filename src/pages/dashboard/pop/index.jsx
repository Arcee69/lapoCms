import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai"
import { Skeleton } from '@mui/material';

import ModalPop from '../../../components/modal/modalPop';
import AddPop from './components/AddPop';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';


import DeletePop from './components/DeletePop';
import axios from 'axios';


const Pop = () => {
  const [open, setOpen] = useState(false)
  const [pop, setPop] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [popId, setPopId] = useState()
  const [search, setSearch] = useState("")  
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

    let URL = import.meta.env.VITE_APP_API_URL;
    
    const getPop = async (url = `${URL}/v1/pop`) => {
        setLoading(true)
        try {
          const res = await axios.get(url);
          console.log(res, "addict")
          const data = res.data;
    
          setPop(data?.data || []);
          setPrevPageUrl(data.pagination?.prev_page_url);
          setNextPageUrl(data.pagination?.next_page_url);
          setCurrentPage(data.pagination?.current_page);
        } catch (err) {
          console.error(err);
        } finally {
            setLoading(false)
        }
      };

    // const getPop = async (url = `${URL}/v1/pop`) => {
    //   setLoading(true);
    //   try {
    //     const res = await axios.get(url);
    //     const data = res.data;
    
    //     // Ensure popData is always an array
    //     const popData = Array.isArray(data?.data) ? data.data : [];
    //     setPop(popData);
    
    //     setPrevPageUrl(data.pagination?.prev_page_url);
    //     setNextPageUrl(data.pagination?.next_page_url);
    //     setCurrentPage(data.pagination?.current_page);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
        
    
    
      useEffect(() => {
      getPop();
    }, []);

    console.log(pop, "skip")
  
    const handlePrevPage = () => {
      if (prevPageUrl) getPop(prevPageUrl);
    };
  
    const handleNextPage = () => {
      if (nextPageUrl) getPop(nextPageUrl);
    };

    // const filteredPop = pop?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase() || ""))

  return (
    <div className='flex flex-col mx-[33px] '>
      <div className=' flex justify-end mt-5'>
        <button type='button' onClick={() => setOpen(true)} className='flex items-center justify-center border-none rounded-xl gap-3 w-[164px] h-[40px] bg-[#E78020]' >
          <FaPlus className='text-[#fff]'/>
          <p className='text-[#fff] font-poppins font-medium text-sm'>Add Media </p>
        </button>
      </div>
      <div className='bg-[#fff] flex flex-col pt-[23px] pl-[33px] pr-[33px] pb-[76px] mt-[28px] rounded'>
        {/* <div className='flex gap-3 items-center mb-[11px]'>
          <div className='w-full bg-[#F8F8FA] flex items-center gap-[10px] p-2  rounded-lg'>
            <CiSearch className='w-[24px] h-[24px] text-[#9A9AA6]'/>
            <input 
                name='search'
                placeholder='Search'
                className='outline-none w-full font-hanken p-3 bg-transparent text-[#8B8B8B] text-[11px]'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            className='text-[#fff] font-inter text-xs w-[102px] h-[40px] bg-[#263238] rounded-lg' 
          >
            Search
          </button>
        </div> */}
        {/* <hr /> */}

        {
            loading 
            ?
            <Skeleton variant="rectangular" width={1185} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)' }}/>
            :
            <div className={`${pop?.length > 0 ?  "grid grid-cols-3 gap-[32px]"  : "flex items-center justify-center"} mt-[29px]`} >
              {
                    pop?.media ? (
                    <div className='bg-[#fff] w-[500px] shadow h-[400px] relative'>
                    <img src={pop?.media} alt='item-image'  className='rounded-tr-lg rounded-tl-lg'/>
                    <div className='rounded-br-lg rounded-bl-xl flex flex-col p-2'>
                      <p className='font-poppins text-[#455A64] text-sm font-light'><span className='font-medium'>Title:</span> {pop?.title} </p>
      
                    </div>
                    <button className="w-[26px] h-[26px] absolute top-1 right-1 bg-[#fff] flex  rounded-full justify-center items-center p-2" onClick={() => {setOpenDeleteModal(true); setPopId(item)}}>
                      <AiOutlineClose className="text-[#5F5F5F] w-[14px] h-[14px]"/>
                    </button>
                  </div>
              )
              :
              <p className='text-2xl text-[#000] text-center font-semibold'>No Media Pop Up Available</p>
              }
              
              {/* {
                filteredPop?.length > 0 ? filteredPop?.map((item, index) => (
                      <div key={index} className='bg-[#fff] shadow h-[400px] relative'>
                        <img src={item?.media} alt='item-images'  className='rounded-tr-lg rounded-tl-lg'/>
                        <div className='rounded-br-lg rounded-bl-xl flex flex-col p-2'>
                          <p className='font-poppins text-[#455A64] text-sm font-light'><span className='font-medium'>Title:</span> {item?.title} </p>
          
                        </div>
                        <button className="w-[26px] h-[26px] absolute top-1 right-1 bg-[#fff] flex  rounded-full justify-center items-center p-2" onClick={() => {setOpenDeleteModal(true); setPopId(item)}}>
                          <AiOutlineClose className="text-[#5F5F5F] w-[14px] h-[14px]"/>
                        </button>
                      </div>
                  ))
                  :
                  <p className='text-2xl text-[#000] text-center font-semibold'>No Media Pop Up Available</p>
              } */}
            </div>
        }

        {/* <div className="flex justify-center items-center gap-4 mt-10">
            <button
                onClick={handlePrevPage}
                disabled={!prevPageUrl}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                !prevPageUrl && "opacity-50 cursor-not-allowed"
                }`}
            >
                Previous
            </button>
            <p className="text-[#222222] font-bold">Page {currentPage}</p>
            <button
                onClick={handleNextPage}
                disabled={!nextPageUrl}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                !nextPageUrl && "opacity-50 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div> */}
      </div>

          <ModalPop isOpen={open}>
              <AddPop  handleClose={() => setOpen(false)}/>
          </ModalPop>

          <ModalPop isOpen={openDeleteModal}>
            <DeletePop handleClose={() => setOpenDeleteModal(false)} popId={popId} />
          </ModalPop>
    </div>
  )
}

export default Pop