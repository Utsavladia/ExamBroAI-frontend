import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, ChevronDown, ChevronRight, FileText, FolderCheck, Plus } from 'lucide-react';

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState("home");
    const [expandedNotes, setExpandedNotes] = useState(true);
    const defaultNotes = [
        {
            name: "Sample note 1",
            path: "/notes/sample-note-1",
            className: ""
        },
        {
            name: "Sample note 2",
            path: "/notes/sample-note-2",
            className: ""
        },
        {
            name: "Math Formulas",
            path: "/notes/math-formulas",
            className: ""
        },
        {
            name: "Physics Notes",
            path: "/notes/physics-notes",
            className: ""
        },
        {
            name: "Math Formulas",
            path: "/notes/math-formulas",
            className: ""
        },
        {
            name: "Physics Notes",
            path: "/notes/physics-notes",
            className: ""
        }
    ];
    const [notes, setNotes] = useState(defaultNotes);
    const location = useLocation();

    // Update active tab when location changes
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === "/") {
            setActiveTab("home");
        } else if (currentPath.startsWith("/ai")) {
            setActiveTab("ai");
        } else if (currentPath.startsWith("/notes/")) {
            setActiveTab("notes");
            setExpandedNotes(true);
        } else {
            setActiveTab(currentPath.split("/")[1]);
        }
    }, [location.pathname]);

    const isNoteActive = (notePath) => {
        return location.pathname === notePath;
    };

    const createNote = () => {
        // create a new note
        const newNote = {
            name: "New Note",
            path: "/notes/new-note",
            className: ""
        }
        setNotes([newNote, ...notes]);
        console.log("createNote");
    }

    return (
        <div className='flex flex-col bg-stone-950 w-56 h-screen'>
            <span className='text-yellow-400 text-xl font-bold px-4 py-3 text-center border-b border-gray-500 h-14 mb-2'>Exam Buddy AI</span>

            {/* Home Link */}
            <Link
                to="/"
                className={`flex items-center px-4 py-2 hover:bg-gray-800 rounded-xl mx-2 mb-1 transition-colors ${activeTab === "home" ? "bg-gray-800 text-white" : "text-gray-300"}`}
            >
                <House className="text-gray-300 w-5" />
                <span className='ml-3 text-gray-300'>Home</span>
            </Link>

            {/* AI Link */}
            <Link
                to="/ai"
                className={`flex items-center px-4 py-2 mb-1 hover:bg-gray-800 rounded-xl mx-2 transition-colors ${activeTab === "ai" ? "bg-gray-800 text-white" : "text-gray-300"}`}
            >
                <span className='text-yellow-400'>✨</span>
                <span className='ml-3'>AI- New chat</span>
            </Link>

            <Link to="/documents" className={`flex items-center px-4 py-2 mb-1 hover:bg-gray-800 rounded-xl mx-2 transition-colors ${activeTab === "documents" ? "bg-gray-800 text-white" : "text-gray-300"}`}>
                <FolderCheck className='text-gray-300 w-5' />
                <span className='ml-3'>Uploaded Files</span>
            </Link>

            {/* Notes Section */}
            <div>
                <button
                    className={`flex items-center justify-between w-full px-4 py-2 mb-1 hover:bg-gray-800 rounded-xl mx-2 transition-colors ${activeTab === "notes" ? "bg-gray-900" : ""}`}
                >
                    <div className="flex w-full items-center" onClick={() => setExpandedNotes(!expandedNotes)}>
                        <FileText className="text-gray-300 w-5" />
                        <span className='ml-3 text-gray-300'>Notes</span>
                    </div>
                    <Plus className='text-gray-300 w-4 hover:text-white transition-colors cursor-pointer' onClick={createNote} />
                </button>

                {/* Notes List */}
                {expandedNotes && (
                    <div className="ml-4 mb-1 space-y-1 max-h-[30vh] overflow-y-auto custom-scrollbar">
                        {notes.map((note, index) => (
                            <Link
                                key={index}
                                to={note.path}
                                className={`block px-4 py-1.5 rounded-lg mx-2 text-sm hover:bg-gray-800 transition-colors ${isNoteActive(note.path)
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400"
                                    }`}
                            >
                                {note.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
