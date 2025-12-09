// src/services/blogApi.js
import { API_CONFIG } from '../utils/constants';

/**
 * Generate blog using API
 * @param {string} prompt - User prompt
 * @returns {Promise<Object>} API response
 */
export async function generateBlog(prompt) {
  const response = await fetch(API_CONFIG.ENDPOINT, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ prompt: prompt.trim() }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Failed to generate blog (${response.status})`);
  }

  if (!data.blog || data.blog.trim().length === 0) {
    throw new Error('Generated blog is empty. Please try again.');
  }

  return data;
}

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export async function checkApiHealth() {
  const response = await fetch(API_CONFIG.ENDPOINT, {
    method: 'GET',
  });
  
  return response.json();
}