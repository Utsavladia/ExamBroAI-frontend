import { useState } from 'react';
import { getFolders, createFolderApi } from '../api/folder';

export default function useFolder() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFolders = async (userId, parentId = null) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getFolders(userId, parentId);
            setFolders(response.items);
        } catch (error) {
            console.error('Error fetching folders:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const createFolder = async (formData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createFolderApi(formData);
            console.log("response of createFolder", response);
            // Add the new folder to the current list
            if (response.folder) {
                setFolders(prev => [response.folder, ...prev]);
            }
        } catch (error) {
            console.error('Error creating folder:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    return { folders, loading, error, fetchFolders, createFolder };
}