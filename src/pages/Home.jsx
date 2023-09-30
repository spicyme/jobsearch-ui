import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import NewPostModel from "../widgets/NewPostModel";

const baseURL = `${import.meta.env.VITE_BASEURL}` + "/api/v1/job";

function Home() {
  const [action, setAction] = useState("add");
  const [editingDetails, setEditingDetails] = useState("");
  const [posts, setPosts] = useState(null);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e) => {
    let query;
    e.target.value !== ""
      ? (query = `?title=${e.target.value}&description=${e.target.value}`)
      : (query = "");
    axios.get(baseURL + query).then((response) => {
      setPosts(response.data.results);
    });
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  const handleCallback = () => {
    // Update the name in the component's state
    setIsOpenModel(false);
  };

  const refresh = () => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data.results);
    });
  };

  const deleteJob = (jobId) => {
    axios.delete(baseURL + `/${jobId}`).then(() => {
      setPosts(posts.filter((post) => post.id !== jobId));
    });
  };

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    axios.get(`${baseURL}?page=${currentPage}`).then((response) => {
      setPosts(response.data.results);
      setTotalPages(response.data.totalPages);
    });
  }, [currentPage]);

  if (!posts) return null;

  return (
    <>
      <div>
        {isOpenModel && (
          <NewPostModel
            action={action}
            editingDetails={editingDetails}
            closeModel={handleCallback}
            refresh={refresh}
          />
        )}
        <div>
          <input
            type="text"
            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 m-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search title and description"
            onChange={debouncedResults}
          />
        </div>
        <div className="flex justify-around m-3">
          <button
            onClick={() => {
              setIsOpenModel(true);
              setAction("add");
            }}
            className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            Create Post
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {posts.map((post, i) => {
            return (
              <div key={i}>
                <div className="max-w-sm rounded overflow-hidden shadow border mb-2">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <p className="text-gray-700 text-base">
                      {post.description}
                    </p>
                  </div>
                  <div className="px-6 pb-2">
                    <button
                      onClick={() => {
                        setIsOpenModel(true);
                        setAction("edit");
                        setEditingDetails(post);
                      }}
                      className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteJob(post.id)}
                      className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center m-3 pb-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleChangePage(i + 1)}
            className={`mx-1 ${
              i + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-200"
            } rounded-full px-3 py-1 text-sm font-semibold`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Home;
