import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import LongMenu from '../../../components/actionMenuIcon';
import ModalPop from '../../../components/modal/modalPop';
import DeleteFaq from './components/DeleteFaq';


const Faq = () => {
      const [faqs, setFaqs] = useState([])
      const [loading, setLoading] = useState(false)
      const [prevPageUrl, setPrevPageUrl] = useState(null);
      const [nextPageUrl, setNextPageUrl] = useState(null);
      const [currentPage, setCurrentPage] = useState(1);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
      const [data, setData] = useState();

       const fetchFaqs = async (url = "https://lapo.smhptech.com/api/v1/faq") => {
              setLoading(true)
              try {
                const res = await axios.get(url);
                console.log(res, "batman")
                const data = res.data;
          
                setFaqs(data?.data || []);
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
              fetchFaqs();
            }, []);
          
            const handlePrevPage = () => {
              if (prevPageUrl) fetchFaqs(prevPageUrl);
            };
          
            const handleNextPage = () => {
              if (nextPageUrl) fetchFaqs(nextPageUrl);
            };
      

  return (
   <div className='md:p-8 flex flex-col gap-4'>
           <p className='text-black text-xl font-semibold'>Faqs</p>
           {
               loading 
               ?
               <p  className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
               :
               <div className={`${faqs?.length > 0 ? "grid grid-cols-3 gap-8" :  "flex items-center justify-center"}`}>
                   {
                       faqs?.length > 0 ? faqs?.map((faq, index) => (
                           <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:min-w-[280px]">
                               <div className='flex flex-col'>
                                   <p className='font-bold text-sm'>Question: <span className="font-medium text-lg">{faq?.question}</span></p>
                                   <p className='font-bold text-sm'>Answer: <span className="font-medium text-lg">{faq?.answer}</span></p>
                                   <div className='flex items-end justify-end'>
                                       <LongMenu
                                           // action={(action) => handleMenuClick(action, faq)} 
                                       >
                                           <div className='flex flex-col gap-3 p-3'>
                                               <p 
                                               className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                               onClick={() => {setOpenDeleteModal(true), setData(faq)}}
                                               >
                                                   Delete
                                               </p>
                                               <Link 
                                                   to="/update-faq"
                                                   state={faq}
                                                   className='cursor-pointer hover:bg-[#F8F8F8] p-1'
                                               >
                                                   Edit
                                               </Link>
                                           </div>
                                       </LongMenu>
                                   </div>
                               </div>
                           </div>
                       ))
                       :
                       <p className='text-2xl text-[#000] text-center font-semibold'>No Faqs Available</p>
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
               <DeleteFaq
                   handleClose={() => setOpenDeleteModal(false)} 
                   data={data}
               />
           </ModalPop>
       
       </div>
          
  )
}

export default Faq