import axios from 'axios';

export const getFolders = async (userId, parentId = null) => {
    try {
        const response = await axios.get('/api/folders', {
            params: {
                user_id: userId,
                parent_id: parentId
            }
        });
        console.log("response of getFolders", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching folders:', error);
        throw error;
    }
};

export const createFolderApi = async (formData) => {
    try {
        const response = await axios.post('/api/create-folder', formData);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
};
