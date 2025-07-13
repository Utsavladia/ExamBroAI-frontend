import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useUser, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import './App.css'
import FileUpload from './components/FileUpload'
import AskQuestion from './components/AskQuestion'
import Sidebar from './components/Sidebar'
import Markdown from 'react-markdown'
import Documents from './components/Documents'
import Header from './components/Header'


// AI Chat Component
function AIChat() {
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { user } = useUser();

  function handleAnswer(answer) {
    setAnswer(answer);
    setChatHistory(prev => [...prev, { type: 'answer', content: answer }]);
  }

  function handleQuestion(question) {
    setChatHistory(prev => [...prev, { type: 'question', content: question }]);
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
        <p className="text-sm text-gray-500">Ask questions about your uploaded documents</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Start a conversation</p>
              <p className="text-sm">Upload a document and ask questions about it</p>
            </div>
          ) : (
            chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-lg px-4 py-2 ${message.type === 'question'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
                  }`}>
                  {message.type === 'question' ? (
                    <p>{message.content}</p>
                  ) : (
                    <Markdown>{message.content}</Markdown>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <AskQuestion onAnswer={handleAnswer} onQuestion={handleQuestion} userId={user?.id} />
            </div>
            <div className="w-48">
              <FileUpload userId={user?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Home Component
function Home() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Welcome to ExamPrep AI</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Your intelligent study companion. Upload your documents and ask questions to get instant, accurate answers.
        </p>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-2">✨ AI-Powered Learning</h3>
            <p className="text-gray-600">Ask questions about your study materials and get instant answers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-2">📚 Document Management</h3>
            <p className="text-gray-600">Upload and organize your study materials in one place</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Note Component
function Note() {
  const { noteName } = useParams();

  // Convert URL parameter to display name
  const getDisplayName = (name) => {
    return name.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">{getDisplayName(noteName)}</h1>
        <p className="text-sm text-gray-500">Your personal notes and study materials</p>
      </div>

      {/* Note Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Note Content</h2>
          <p className="text-gray-600">
            This is the content for <strong>{getDisplayName(noteName)}</strong>.
            You can add your notes, formulas, or study materials here.
          </p>

          {/* Placeholder content based on note type */}
          {noteName.includes('math') && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Math Formulas</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a</li>
                <li>• Pythagorean Theorem: a² + b² = c²</li>
                <li>• Area of Circle: A = πr²</li>
                <li>• Volume of Sphere: V = (4/3)πr³</li>
              </ul>
            </div>
          )}

          {noteName.includes('physics') && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Physics Notes</h3>
              <ul className="text-green-800 space-y-1">
                <li>• Newton's Laws of Motion</li>
                <li>• Kinetic Energy: KE = ½mv²</li>
                <li>• Gravitational Force: F = Gm₁m₂/r²</li>
                <li>• Ohm's Law: V = IR</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const { user } = useUser();

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-500 mb-4">Manage your account settings</p>
        {user && (
          <div className="bg-white p-6 rounded-lg shadow-sm border max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-2 text-left">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</p>
              <p><strong>User ID:</strong> {user.id}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <SignedIn>
        <div className="flex w-screen h-screen bg-gray-800">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai" element={<AIChat />} />
              <Route path="/notes/:noteName" element={<Note />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/documents/*" element={<Documents />} />
            </Routes>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex w-screen h-screen flex-col items-center justify-end bg-[#1f1f23]">
          <SignIn />
        </div>
      </SignedOut>
    </Router>
  );
}

export default App
