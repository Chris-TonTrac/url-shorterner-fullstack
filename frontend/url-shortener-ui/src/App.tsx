import React from 'react';
import { IoLinkSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { RxLightningBolt } from "react-icons/rx";
import { FiShield } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";

const App = () => {
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      {/* Navigation Bar. */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start ml-40">
          <IoLinkSharp className='text-3xl text-blue-600 mr-1' />
          <Link
            to='#'
            className="text-xl font-bold"
          >
            ShortLinks
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
        <div className="navbar-end mr-40">
          <Link to='#' className="btn bg-black text-white rounded-md ">Get Started</Link>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Text and buttons */}
        <div className='flex items-center h-96'>
          <div className='m-auto'>
            <h1 className=' font-bold text-7xl text-center text-indigo-600'>Shorten Your Links, <br /> Amplify Your Reach.</h1>
            <p className='mt-4 text-center text-gray-600 text-2xl'>
              Create short, memorable links in seconds. Track analytics, manage your
            </p>
            <p className="text-gray-600 text-center text-2xl">
              URLs, and share them anywhere.
            </p>

            <div className='flex gap-8 justify-center pt-8'>
              <Link to='#' className='btn btn-lg text-white bg-black rounded-md'> Start for free</Link>
              <Link to='#' className='btn btn-lg text-black bg-white rounded-md '> Learn more</Link>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className='flex justify-center text-4xl font-bold mt-20'>
          Why choose ShortLinks?
        </div>

        <div className='flex justify-center gap-12 pt-10'>
          <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <RxLightningBolt className='text-4xl text-blue-700' />
              <h2 className="card-title">Lightning Fast</h2>
              <p>Generate short links instantly with our optimized infrastructure. No waiting, just results.</p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <FiShield className='text-4xl text-blue-700' />
              <h2 className="card-title">Secure & Private</h2>
              <p>Your data is encrypted and secure. JWT authentication ensures only you can manage your links.</p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <VscGraph className='text-4xl text-blue-700' />
              <h2 className="card-title">Track Performance</h2>
              <p>Monitor all your shortened URLs in one dashboard. See what's working at a glance.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-horizontal footer-center bg-blue-800 text-primary-content p-10">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          
        </nav>
      </footer>

      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} ShortLinks. Built with React & Tailwind CSS.</p>
        </aside>
      </footer>

    </div>
  )
}

export default App