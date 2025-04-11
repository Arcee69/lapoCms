import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import LongMenu from '../../../components/actionMenuIcon';
import ModalPop from '../../../components/modal/modalPop';
import DeleteBranch from './component/DeleteBranch';



const Branches = () => {
      const [branches, setBranches] = useState([])
      const [loading, setLoading] = useState(false)
      const [currentPage, setCurrentPage] = useState(1);
      const [branchesPerPage] = useState(10)
      const [totalPages, setTotalPages] = useState(1);

   
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
      const [data, setData] = useState();

      let URL = import.meta.env.VITE_APP_API_URL;

       const fetchBranches = async (url = `${URL}/v1/branch`) => {
              setLoading(true)
              try {
                const res = await axios.get(url);
                console.log(res, "story")
                const data = res.data;
          
                setBranches(data?.data || []);
             
              } catch (err) {
                console.error(err);
              } finally {
                  setLoading(false)
              }
            };
          
            useEffect(() => {
              fetchBranches();
            }, []);

            
      useEffect(() => {
        // Update total pages whenever filteredOrders changes
        setTotalPages(Math.ceil(branches?.length / branchesPerPage));
    }, [branches?.length, branchesPerPage]);

   // Calculate indices for paginated data
   const indexOfLastBranch = currentPage * branchesPerPage;
   const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
   const currentBranches = branches?.slice(indexOfFirstBranch, indexOfLastBranch);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
        
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
          
         
      

  return (
   <div className='md:p-8 flex flex-col gap-4'>
           <p className='text-black text-xl font-semibold'>Branches</p>
           {
               loading 
               ?
               <p  className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
               :
               <div className={`${currentBranches?.length > 0 ? "grid grid-cols-3 gap-8" :  "flex items-center justify-center"}`}>
                   {
                       currentBranches?.length > 0 ? currentBranches?.map((branch, index) => (
                           <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:min-w-[280px]">
                               <div className='flex flex-col'>
                                   <p className='font-bold text-sm'>Branch Name: <span className="font-medium text-lg">{branch?.name}</span></p>
                                   <p className='font-bold text-sm'>Address: <span className="font-medium text-lg">{branch?.address}</span></p>
                                   <p className='font-bold text-sm'>State: <span className="font-medium text-lg">{branch?.state?.name}</span></p>
                                   <p className='font-bold text-sm'>Lga: <span className="font-medium text-lg capitalize">{branch?.lga?.name}</span></p>
                                   <p className='font-bold text-sm'>Phone: <span className="font-medium text-lg capitalize">{branch?.phone_number}</span></p>
                                   <div className='flex items-end justify-end'>
                                       <LongMenu>
                                           <div className='flex flex-col gap-3 p-3'>
                                               <p 
                                               className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                               onClick={() => {setOpenDeleteModal(true), setData(branch)}}
                                               >
                                                   Delete
                                               </p>
                                               <Link 
                                                   to="/update-branch"
                                                   state={branch}
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
                       <p className='text-2xl text-[#000] text-center font-semibold'>No Branches Available</p>
                   }
   
               </div>
           }
   
           <div className="flex justify-center items-center gap-4 mt-10">
               <button
                   onClick={handlePrevPage}
                   disabled={currentPage === 1}
                   className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                    currentPage === 1 && "opacity-50 cursor-not-allowed"
                   }`}
               >
                   Previous
               </button>
               <p className="text-[#222222] font-bold">Page {currentPage}</p>
               <button
                   onClick={handleNextPage}
                   disabled={currentPage === totalPages}
                   className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                    currentPage === totalPages && "opacity-50 cursor-not-allowed"
                   }`}
               >
                   Next
               </button>
           </div>
          
   
           <ModalPop isOpen={openDeleteModal}>
               <DeleteBranch
                   handleClose={() => setOpenDeleteModal(false)} 
                   data={data}
               />
           </ModalPop>
       
       </div>
          
  )
}

export default Branches