import React, { useState } from 'react'
import axios from 'axios';

export default function FileUpload({ userId, parentId = null }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const handleFileUpload = async () => {
        if (!file || !userId) {
            setStatus("Please select a file and ensure you're logged in.");
            return;
        }
        setStatus("Uploading...");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userId);
        if (parentId) {
            formData.append("parent_id", parentId);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, formData);
            setStatus(response.data.message);
            setFile(null); // Clear the file input
        } catch (error) {
            console.error("Error uploading file:", error);
            setStatus("Upload failed. Please try again.");
        } finally {
            setStatus("");
            setFile(null);
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Upload Document</h3>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.txt"
            />
            <button
                onClick={handleFileUpload}
                disabled={!file || !userId}
                className="mt-2 w-full bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                Upload
            </button>
            {status && (
                <p className="mt-2 text-xs text-gray-600">{status}</p>
            )}
        </div>
    );
}