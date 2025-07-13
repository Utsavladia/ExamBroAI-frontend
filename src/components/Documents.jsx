import { useState, useEffect, useRef } from "react";
import { Plus, Folder, FolderOpen, Upload, FilePlus, FolderPlus, X, File } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useFolder from "../hooks/useFolder";
import CreateFolderModal from "./CreateFolderModal";
import { useUser } from "@clerk/clerk-react";

// Circular loading component
const DocumentLoader = () => {
    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-900">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

            </div>
        </div>
    );
};

export default function Documents() {
    const { folders, loading, error, fetchFolders, createFolder } = useFolder();
    const [CreatingFolder, setCreatingFolder] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const buttonRef = useRef(null);
    const params = useParams();
    const { user } = useUser();
    const userId = user?.id;

    // Extract parentId from the wildcard parameter
    // The route is "/documents/*" so params.* contains the path after /documents
    const pathAfterDocuments = params["*"] || "";
    const pathSegments = pathAfterDocuments.split("/").filter(segment => segment !== "");
    const parentId = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : null;

    console.log("userId", userId);
    console.log("parentId", parentId);


    useEffect(() => {
        fetchFolders(userId, parentId);
    }, [parentId]);

    if (loading) return <DocumentLoader />;
    if (error) return <div>Error: {error.message}</div>;


    const handleCreateFolder = (folderName) => {
        const formData = new FormData();
        formData.append("folder_name", folderName);
        if (parentId !== null) {
            formData.append("parent_id", parentId);
        }
        formData.append("user_id", userId);
        createFolder(formData);
    };




    return (
        <div className="flex flex-col w-full h-full bg-gray-900 relative">
            <div className="flex flex-wrap w-full h-full py-16 px-32 overflow-y-auto">
                {folders && folders.map((folder, index) => (

                    <Link to={`/documents/${folder.id}`} key={index} className="cursor-pointer flex flex-col  items-center justify-center w-32 max-h-fit rounded-xl mx-8 my-4 group">
                        {folder.type === "folder" ?
                            <FolderOpen className="text-gray-500 w-32 h-32 group-hover:text-white transition-colors group-hover:scale-105" strokeWidth={0.8} />
                            :
                            <File className="text-gray-500 w-32 h-30 group-hover:text-white transition-colors group-hover:scale-105" strokeWidth={0.8} />
                        }
                        <span className="text-gray-300 group-hover:text-white font-semibold text-lg text-center -mt-1">{folder.name}</span>
                    </Link>

                ))}
            </div>
            <div className="absolute right-8 bottom-16">
                <button
                    ref={buttonRef}
                    onClick={() => setCreateOpen(!createOpen)}
                    className={`flex items-center px-4 py-2 relative hover:bg-gray-700 ${createOpen ? "bg-gray-700" : "bg-gray-800"} rounded-xl  transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                    {createOpen &&
                        <div className="absolute right-0 -top-1 -translate-y-full  flex flex-col items-start justify-center overflow-hidden bg-gray-700  text-gray-300  rounded-xl w-40 z-10">
                            <span
                                onClick={() => setCreatingFolder(true)}
                                className="flex items-center hover:bg-gray-600 hover:text-white px-4 py-2 w-full cursor-pointer"
                            >
                                <FolderPlus className="w-5 h-5 mr-3 " />New Folder
                            </span>
                            <span className="flex items-center hover:bg-gray-600 hover:text-white px-4 py-2 w-full">
                                <Upload className="w-5 h-5 mr-3 " />Upload File
                            </span>
                        </div>
                    }
                    <Plus className={`text-gray-300 w-5 ${createOpen ? "text-white" : ""}`} />
                    <span className={`ml-3 text-gray-300 ${createOpen ? "text-white" : ""}`}>New</span>
                </button>
            </div>

            {/* Create Folder Modal */}
            {CreatingFolder && (
                <CreateFolderModal
                    isOpen={CreatingFolder}
                    onClose={() => setCreatingFolder(false)}
                    onSubmit={handleCreateFolder}
                />
            )}
        </div>
    )
}
