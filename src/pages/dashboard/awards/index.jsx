import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import LongMenu from '../../../components/actionMenuIcon';
import ModalPop from '../../../components/modal/modalPop';
import DeleteAward from './components/DeleteAward';



const Awards = () => {
    const [awards, setAwards] = useState([])
    const [loading, setLoading] = useState(false)
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [data, setData] = useState(); 
    
    let URL = import.meta.env.VITE_APP_API_URL; 

    const fetchAward = async (url = `${URL}/v1/award`) => {
        setLoading(true)
        try {
          const res = await axios.get(url);
          console.log(res, "addict")
          const data = res.data;
    
          setAwards(data?.data || []);
          setPrevPageUrl(data.pagination?.prev_page_url);
          setNextPageUrl(data.pagination?.next_page_url);
          setCurrentPage(data.pagination?.current_page);
        } catch (err) {
          console.error(err);
        } finally {
            setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchAward();
      }, []);
    
      const handlePrevPage = () => {
        if (prevPageUrl) fetchAward(prevPageUrl);
      };
    
      const handleNextPage = () => {
        if (nextPageUrl) fetchAward(nextPageUrl);
      };

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Awards</p>
        {
            loading 
            ?
            <p  className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
            :
            <div className={`${awards?.length > 0 ? "grid grid-cols-3 gap-8" :  "flex items-center justify-center"}`}>
                {
                    awards?.length > 0 ? awards?.map((award, index) => (
                        <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:min-w-[280px]">
                            <p className='xs:w-full'>{award?.year} </p>
                            <div className='flex flex-col'>
                                <p className='font-bold text-lg'>{award?.name}</p>
                                <div className='flex items-end justify-end'>
                                    <LongMenu
                                        // action={(action) => handleMenuClick(action, award)} 
                                    >
                                        <div className='flex flex-col gap-3 p-3'>
                                            <p 
                                            className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                            onClick={() => {setOpenDeleteModal(true), setData(award)}}
                                            >
                                                Delete
                                            </p>
                                        </div>
                                    </LongMenu>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <p className='text-2xl text-[#000] text-center font-semibold'>No Awards Available</p>
                }

            </div>
        }

        <div className="flex justify-center items-center gap-4 mt-10">
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
        </div>
       

        <ModalPop isOpen={openDeleteModal}>
            <DeleteAward 
                handleClose={() => setOpenDeleteModal(false)} 
                data={data}
            />
        </ModalPop>
        
    </div>
  )
}

export default Awards