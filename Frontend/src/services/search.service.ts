import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const searchContent = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
}; 