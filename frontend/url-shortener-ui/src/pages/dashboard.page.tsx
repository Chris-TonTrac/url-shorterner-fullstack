import React from "react";
import { IoLinkSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { LuLogOut, LuCopy, LuTrash2, LuExternalLink } from "react-icons/lu";
import { GiNetworkBars } from "react-icons/gi";
import {
  buildPublicShortUrl,
  createShortUrl,
  deleteShortUrlById,
  getUserUrlCodes,
  type UrlCode,
} from "@/api/url.api";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>(null);
  const [codes, setCodes] = React.useState<UrlCode[]>([]);
  const [loadingCodes, setLoadingCodes] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState("");
  const [customCode, setCustomCode] = React.useState("");

  const totalUrls = codes.length;
  const totalClicks = codes.reduce((sum, item) => sum + item.clicks, 0);
  const averageClicks = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

  const formatDate = (value: string) => {
    if (!value) return "-";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "-";
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const loadCodes = React.useCallback(async (authToken: string) => {
    try {
      setLoadingCodes(true);
      setError(null);
      const data = await getUserUrlCodes(authToken);
      setCodes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load URLs.");
    } finally {
      setLoadingCodes(false);
    }
  }, []);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("shortlinks_token") || sessionStorage.getItem("shortlinks_token");

    if (!storedToken) {
      navigate("/user/login");
      return;
    }

    setToken(storedToken);
    loadCodes(storedToken);
  }, [loadCodes, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("shortlinks_token");
    sessionStorage.removeItem("shortlinks_token");
    navigate("/user/login");
  };

  const handleCreateShortUrl = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      setError("Please log in again.");
      return;
    }

    if (!originalUrl.trim()) {
      setError("Original URL is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createShortUrl(token, {
        url: originalUrl.trim(),
        code: customCode.trim() || undefined,
      });

      setOriginalUrl("");
      setCustomCode("");
      await loadCodes(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to shorten URL.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !id) return;

    try {
      setError(null);
      await deleteShortUrlById(token, id);
      await loadCodes(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete URL.");
    }
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(buildPublicShortUrl(code));
    } catch {
      setError("Could not copy the short link.");
    }
  };

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
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
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
              <p className="pt-4 text-4xl font-semibold text-gray-900">{totalUrls}</p>
              <p className="text-xs text-gray-500">Active short links</p>
            </div>
          </div>

          <div className="card w-60 max-w-sm border border-gray-200 bg-white shadow-sm">
            <div className="card-body p-6">
              <h2 className="card-title flex items-center justify-between text-[29px] font-medium text-gray-900">
                <span className="text-sm">Total Clicks</span>
                <GiNetworkBars className="text-gray-400" />
              </h2>
              <p className="pt-4 text-4xl font-semibold text-gray-900">{totalClicks}</p>
              <p className="text-xs text-gray-500">Across all links</p>
            </div>
          </div>

          <div className="card w-60 max-w-sm border border-gray-200 bg-white shadow-sm">
            <div className="card-body p-6">
              <h2 className="card-title flex items-center justify-between text-[29px] font-medium text-gray-900">
                <span className="text-sm">Average Clicks</span>
                <GiNetworkBars className="text-gray-400" />
              </h2>
              <p className="pt-4 text-4xl font-semibold text-gray-900">{averageClicks}</p>
              <p className="text-xs text-gray-500">Per link</p>
            </div>
          </div>
        </div>

        {/* Shorten a New URL */}
        <div className="card w-full mt-8 bg-base-100 card-xl shadow-sm">
          <form className="card-body" onSubmit={handleCreateShortUrl}>
            <p className="card-title font-semibold">Shorten a New URL</p>
            <p className="text-gray-400">Create a short link for your long URL</p>
            <p className="text-sm font-semibold">Original URL</p>
            <input
              type="text"
              className="rounded-md bg-gray-100 text-sm px-2.5 py-1"
              placeholder="https://example.com/very-long-url"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
            />
            <p className="text-sm font-semibold">Custom Short Code (optional)</p>
            <input
              type="text"
              className="rounded-md bg-gray-100 text-sm px-2.5 py-1"
              placeholder="my-custom-link"
              value={customCode}
              onChange={(event) => setCustomCode(event.target.value)}
            />
            <p className="text-xs text-gray-500">Leave blank to generate a random code</p>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-xs w-fit text-white text-sm rounded-md bg-black sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
            >
              {isSubmitting ? "Shortening..." : "Shorten URL"}
            </button>
          </form>
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
                  {loadingCodes ? (
                    <tr>
                      <td className="py-3 text-gray-500" colSpan={5}>Loading your URLs...</td>
                    </tr>
                  ) : null}

                  {!loadingCodes && codes.length === 0 ? (
                    <tr>
                      <td className="py-3 text-gray-500" colSpan={5}>No short links created yet.</td>
                    </tr>
                  ) : null}

                  {!loadingCodes && codes.map((item) => (
                    <tr key={item.shortCode} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium text-blue-600">{item.shortCode}</td>
                      <td className="py-3 text-gray-500">
                        <Link to={item.targetUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                          {item.targetUrl}
                          <LuExternalLink className="shrink-0 text-gray-400" />
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500">{formatDate(item.createdAt)}</td>
                      <td className="py-3 font-bold text-gray-900">{item.clicks}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="btn btn-ghost btn-xs text-gray-500 hover:text-gray-800"
                            onClick={() => handleCopy(item.shortCode)}
                          >
                            <LuCopy className="text-base" />
                          </button>
                          <button
                            className="btn btn-ghost btn-xs text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item.id)}
                            disabled={!item.id}
                          >
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