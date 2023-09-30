import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASEURL}` + "/api/v1/job";

function NewPostModel({ closeModel, refresh, action, editingDetails }) {
  const [descriptionCount, setDescriptionCount] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data as the user types
    setFormData({ ...formData, [name]: value });

    // Count the description number
    if (name === "description") {
      setDescriptionCount(countWords(value));
    }
  };

  const countWords = (inputString) => {
    return inputString.split(" ").filter(function (n) {
      return n != "";
    }).length;
  };

  const send = () => {
    if (action === "edit") {
      axios
        .put(baseURL + `/${editingDetails.id}`, {
          title: formData.title,
          description: formData.description,
        })
        .then(() => {
          closeModel();
          refresh();
        });
    } else {
      axios
        .post(baseURL, {
          title: formData.title.trim(),
          description: formData.description.trim(),
          user: "6516c7b8848bbd00ecec1af9",
        })
        .then(() => {
          closeModel();
          refresh();
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    if (action === "edit") {
      // Initialize formData with editingDetails
      setFormData({
        title: editingDetails.title,
        description: editingDetails.description,
      });
      setDescriptionCount(countWords(editingDetails.description));
    }
  }, [action, editingDetails]);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-center text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {action === "edit" ? "Edit" : "Add"} Post
                  </h3>
                  <div className="mt-5">
                    <form className="w-full max-w-lg">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Title
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            required
                            placeholder="Full stack developer"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Description
                          </label>
                          <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="textarea"
                            placeholder="Your Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                          />
                          <p className="text-gray-600 text-xs italic">
                            {descriptionCount} words
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => send()}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {action === "edit" ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => closeModel()}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPostModel;
