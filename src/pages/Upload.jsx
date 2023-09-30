import { useState } from "react";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASEURL}` + "/api/v1/job/upload";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const resetFileInput = () => {
    // Clear the file input field
    const fileInput = document.getElementById("fileInput");
    fileInput.value = null;
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setUploading(true);
        setError(null);

        let uploaded = await axios.post(baseURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert(
          `${uploaded.data.message}, please visit the home page to check the imported Job List`
        );

        // Reset the file input field after a successful upload
        resetFileInput();

        // Reset the file input field after a successful upload
        setSelectedFile(null);
      } catch (error) {
        setError("Error uploading file. Please try again.");
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-start">Important</p>
            <p className="text-sm text-start">
              Make sure you follow the header name of each column, the column
              order is not matter.
            </p>
            <p className="text-sm text-start">
              The uploaded CSV will automatically process and imported into Job
              List.
            </p>
            <p className="text-sm text-start">
              A sample CSV is provided, feel free to download.
            </p>
            <p className="text-sm text-start">
              <a href="sample.csv" download>
                sample.csv
              </a>
            </p>
          </div>
        </div>
      </div>
      <h2 className="mt-10">Upload a CSV File</h2>
      <input id="fileInput" type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default FileUpload;
