import { useState, useRef, useEffect } from "react";
import { FolderPlus, X } from "lucide-react";


export default function CreateFolderModal({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;
    const [folderName, setFolderName] = useState("");
    const modalRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCreateFolder();
        }
    }
    const handleCreateFolder = () => {
        if (folderName.trim()) {
            onSubmit(folderName);
            setFolderName("");
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-200">New Folder</h3>
                    <button
                        onClick={() => {
                            onClose();
                            setFolderName("");
                        }}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col items-center">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        <FolderPlus className="w-30  h-30" strokeWidth={0.8} />
                    </label>
                    <div className="flex items-center justify-center gap-4">
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            onKeyDown={handleInputKeyPress}
                            placeholder="Enter folder name..."
                            className="w-48 px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                        />
                        <button onClick={handleCreateFolder} className={`${folderName.trim() ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-600 cursor-not-allowed"}  px-4 py-1.5 rounded-md text-gray-200 transition-colors`}>Create</button>
                    </div>

                </div>
            </div>
        </div>
    )
}