import React from 'react'
import { Route, Routes} from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes';

import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';
import VerifyOtp from '../pages/auth/verifyOtp';
import PasswordReset from '../pages/auth/passwordReset';

import BoardLayout from '../layouts/boardLayout';
import CreateBlog from '../pages/dashboard/createBlog';
import ViewBlog from '../pages/dashboard/viewBlog';
import UpdateBlog from '../pages/dashboard/viewBlog/components/UpdateBlog';

import Gallery from '../pages/dashboard/gallery';
import Newsletter from '../pages/dashboard/newsletter';
import CreateNews from '../pages/dashboard/createNews';
import ViewNews from '../pages/dashboard/viewNews';
import UpdateNews from '../pages/dashboard/viewNews/components/UpdateNews';
import Banner from '../pages/dashboard/banner';
import Badges from '../pages/dashboard/badges';
import FaqCategory from '../pages/dashboard/faq/components/FaqCategory';
import Faq from '../pages/dashboard/faq';
import AddFaq from '../pages/dashboard/faq/components/AddFaq';
import Awards from '../pages/dashboard/awards';
import Branches from '../pages/dashboard/branches';
import Reports from '../pages/dashboard/reports';
import Events from '../pages/dashboard/events';
import JobListings from '../pages/dashboard/jobListings';
import AddAwards from '../pages/dashboard/awards/components/AddAwards';
import AddLgas from '../pages/dashboard/branches/component/AddLgas';
import AddBranches from '../pages/dashboard/branches/component/AddBranches';
import AddJobs from '../pages/dashboard/jobListings/components/AddJobs';
import UpdateJob from '../pages/dashboard/jobListings/components/UpdateJob';
import Resources from '../pages/dashboard/resources';
import AddResources from '../pages/dashboard/resources/components/AddResources';
import UpdateResource from '../pages/dashboard/resources/components/UpdateResource';
import UpdateFaq from '../pages/dashboard/faq/components/UpdateFaq';
import UpdateBranch from '../pages/dashboard/branches/component/UpdateBranch';
import Admins from '../pages/dashboard/admins';
import AddAdmin from '../pages/dashboard/admins/components/AddAdmin';




export default function Routers () {

  return (
    <div>
        <Routes>

            <Route element={<ProtectRoutes /> }>
              <Route path="/create-news" element={<CreateNews />} />
              <Route path="/view-news" element={<ViewNews />} />
              <Route path="/update-news" element={<UpdateNews />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/update-blog" element={<UpdateBlog />} />
              <Route path="/blog" element={<ViewBlog />} />
              <Route path="/view-blog" element={<ViewBlog />} />
              <Route path="/banner" element={<Banner />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/view-awards" element={<Awards />} />
              <Route path="/add-award" element={<AddAwards />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/events" element={<Events />} />
              <Route path="/job-listings" element={<JobListings />} />
              <Route path="/view-jobs" element={<JobListings />} />
              <Route path="/add-job" element={<AddJobs />} />
              <Route path="/update-job" element={<UpdateJob />} />
              <Route path="/yearly-reports" element={<Reports />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/view-branch" element={<Branches />} />
              <Route path="/update-branch" element={<UpdateBranch />} />
              <Route path="/lgas" element={<AddLgas />} />
              <Route path="/add-branch" element={<AddBranches />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/add-faq-category" element={<FaqCategory />} />
              <Route path="/add-faq" element={<AddFaq />} />
              <Route path="/view-faq" element={<Faq />} />
              <Route path="/update-faq" element={<UpdateFaq />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/view-resources" element={<Resources />} />
              <Route path="/add-resource" element={<AddResources />} />
              <Route path="/update-resource" element={<UpdateResource />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/view-admins" element={<Admins />} />
              <Route path="/add-admin" element={<AddAdmin />} />
            </Route>

            <Route element={<AuthProtectRoutes />}>
                {/* <Route path='/' element={<Login />} /> */}
                <Route path='/cms' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/verify-otp' element={<VerifyOtp />} />
                <Route path='/reset-password' element={<PasswordReset />} />
             
            </Route>
        </Routes>
    </div>
  )
}
