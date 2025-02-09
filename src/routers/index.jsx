import React from 'react'
import { Route, Routes} from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes';

import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';

import BoardLayout from '../layouts/boardLayout';
import CreateBlog from '../pages/dashboard/createBlog';
import ViewBlog from '../pages/dashboard/viewBlog';
import UpdateBlog from '../pages/dashboard/viewBlog/components/UpdateBlog';
import PasswordReset from '../pages/auth/forgotPassword/PasswordReset';
import Gallery from '../pages/dashboard/gallery';
import Newsletter from '../pages/dashboard/newsletter';
import CreateNews from '../pages/dashboard/createNews';
import ViewNews from '../pages/dashboard/viewNews';
import UpdateNews from '../pages/dashboard/viewNews/components/UpdateNews';
import Banner from '../pages/dashboard/banner';
import Careers from '../pages/dashboard/careers';

//<ProtectRoutes /> 


export default function Routers () {

  return (
    <div>
        <Routes>

            <Route element={<BoardLayout /> }>
              <Route path="/create-news" element={<CreateNews />} />
              <Route path="/view-news" element={<ViewNews />} />
              <Route path="/update-news" element={<UpdateNews />} />
              <Route path="/media" element={<Gallery />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/view-blog" element={<ViewBlog />} />
              <Route path="/banner" element={<Banner />} />
              <Route path="/careers" element={<Careers />} />
            </Route>

            {/* <Route element={<AuthProtectRoutes />}> */}
                <Route path='/' element={<Login />} />
                <Route path='/reset-password' element={<PasswordReset />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            {/* </Route> */}
        </Routes>
    </div>
  )
}
