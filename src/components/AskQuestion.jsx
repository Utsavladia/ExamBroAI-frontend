import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export default function AskQuestion({ onAnswer, onQuestion, userId }) {
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState("");
    const { getToken } = useAuth();

    async function handleAsk() {
        if (!question.trim() || !userId) {
            return;
        }

        // Call onQuestion callback to add question to chat history
        if (onQuestion) {
            onQuestion(question);
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("query", question);
            formData.append("user_id", userId);
            const token = await getToken();
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ask`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            onAnswer(response.data.answer);
            setQuestion(""); // Clear input after successful ask
        } catch (error) {
            console.error("Error asking question:", error);
            if (error.response?.status === 401) {
                onAnswer("Authentication failed. Please log in again.");
            } else if (error.response?.status === 403) {
                onAnswer("Access denied. Please check your permissions.");
            } else {
                onAnswer("Sorry, there was an error processing your question. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your documents..."
                disabled={loading || !userId}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
                onClick={handleAsk}
                disabled={!question.trim() || loading || !userId}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Asking...' : 'Ask'}
            </button>
        </div>
    );
}