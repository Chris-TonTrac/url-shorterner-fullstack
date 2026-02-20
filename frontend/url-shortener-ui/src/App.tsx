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
          <Link to='#' className="btn border-0 bg-black text-white rounded-md ">Get Started</Link>
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
              <p className="text-gray-500">Generate short links instantly with our optimized infrastructure. No waiting, just results.</p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <FiShield className='text-4xl text-blue-700' />
              <h2 className="card-title">Secure & Private</h2>
              <p className="text-gray-500">Your data is encrypted and secure. JWT authentication ensures only you can manage your links.</p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <VscGraph className='text-4xl text-blue-700' />
              <h2 className="card-title">Track Performance</h2>
              <p className="text-gray-500">Monitor all your shortened URLs in one dashboard. See what's working at a glance.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-horizontal footer-center bg-blue-700 text-primary-content p-10">
        <aside>
          <p className="text-5xl font-bold">Ready To Get Started?</p>
          <p className="text-gray-400 pt-5">Join thousands of users who trust ShortLinks for their URL shortening needs.</p>
        </aside>
        <nav>
          <Link to= "#" className="btn border-0">Create Your Account</Link>
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