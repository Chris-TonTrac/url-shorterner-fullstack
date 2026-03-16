import { IoLinkSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { LuLogOut, LuCopy, LuTrash2, LuExternalLink } from "react-icons/lu";
import { GiNetworkBars } from "react-icons/gi";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-indigo-50">
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <IoLinkSharp className="text-2xl text-blue-600" />
            <Link to="#" className="text-3xl font-bold leading-none">
              ShortLinks
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-base text-gray-600">user@gmail.com</p>
            <button className="btn btn-ghost btn-sm">
              <LuLogOut className="text-base" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-evenly gap-5">
          <div className="card w-60 max-w-sm border border-gray-200 bg-white shadow-sm">
            <div className="card-body p-6">
              <h2 className="card-title flex items-center justify-between text-[29px] font-medium text-gray-900">
                <span className="text-sm">Total URLs</span>
                <IoLinkSharp className="text-gray-400" />
              </h2>
              <p className="pt-4 text-4xl font-semibold text-gray-900">3</p>
              <p className="text-xs text-gray-500">Active short links</p>
            </div>
          </div>

          <div className="card w-60 max-w-sm border border-gray-200 bg-white shadow-sm">
            <div className="card-body p-6">
              <h2 className="card-title flex items-center justify-between text-[29px] font-medium text-gray-900">
                <span className="text-sm">Total Clicks</span>
                <GiNetworkBars className="text-gray-400" />
              </h2>
              <p className="pt-4 text-4xl font-semibold text-gray-900">450</p>
              <p className="text-xs text-gray-500">Across all links</p>
            </div>
          </div>

          <div className="card w-60 max-w-sm border border-gray-200 bg-white shadow-sm">
            <div className="card-body p-6">
              <h2 className="card-title flex items-center justify-between text-[29px] font-medium text-gray-900">
                <span className="text-sm">Average Clicks</span>
                <GiNetworkBars className="text-gray-400" />
              </h2>
              <p className="pt-4 text-4xl font-semibold text-gray-900">150</p>
              <p className="text-xs text-gray-500">Per link</p>
            </div>
          </div>
        </div>

        {/* Shorten a New URL */}
        <div className="card w-full mt-8 bg-base-100 card-xl shadow-sm">
          <div className="card-body">
            <p className="card-title font-semibold">Shorten a New URL</p>
            <p className="text-gray-400">Create a short link for your long URL</p>
            <p className="text-sm font-semibold">Original URL</p>
            <input type="text" className="rounded-md bg-gray-100 text-sm px-2.5 py-1" placeholder="https://example.com/very-long-url" />
            <p className="text-sm font-semibold">Custom Short Code (optional)</p>
            <input type="text" className="rounded-md bg-gray-100 text-sm px-2.5 py-1" placeholder="my-custom-link" />
            <p className="text-xs text-gray-500">Leave blank to generate a random code</p>
            <button className="btn btn-xs w-fit text-white text-sm rounded-md bg-black sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Shorten URL</button>
          </div>
        </div>

        {/* Your Shortened URLs */}
        <div className="card w-full mt-8 bg-base-100 card-xl shadow-sm mb-10">
          <div className="card-body">
            <p className="card-title font-semibold">Your Shortened URLs</p>
            <p className="text-gray-400">Manage and track your short links</p>
            <div className="overflow-x-auto mt-2">
              <table className="table w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-700">
                    <th className="pb-3 font-semibold">Short Code</th>
                    <th className="pb-3 font-semibold">Original URL</th>
                    <th className="pb-3 font-semibold">Created</th>
                    <th className="pb-3 font-semibold">Clicks</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "gh-proj", url: "https://github.com/your-repo/awesome-project", created: "Feb 15, 2026", clicks: 127 },
                    { code: "api-docs", url: "https://docs.example.com/api/reference/authentication", created: "Feb 14, 2026", clicks: 89 },
                    { code: "prod-tips", url: "https://blog.example.com/10-tips-for-better-productivity", created: "Feb 13, 2026", clicks: 234 },
                  ].map((item) => (
                    <tr key={item.code} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium text-blue-600">{item.code}</td>
                      <td className="py-3 text-gray-500">
                        <Link to={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                          {item.url}
                          <LuExternalLink className="shrink-0 text-gray-400" />
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500">{item.created}</td>
                      <td className="py-3 font-bold text-gray-900">{item.clicks}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="btn btn-ghost btn-xs text-gray-500 hover:text-gray-800">
                            <LuCopy className="text-base" />
                          </button>
                          <button className="btn btn-ghost btn-xs text-red-500 hover:text-red-700">
                            <LuTrash2 className="text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard