// src/hooks/useBlogGenerator.js
import { useState, useCallback } from "react";
import { generateBlog } from "../services/blogApi";
import { calculateBlogMetrics } from "../utils/blogMetrics";
import { useLocalStorage } from "./useLocalStorage";
import { PROMPT_CONFIG } from "../utils/constants";

export function useBlogGenerator() {
  const [prompt, setPrompt] = useLocalStorage("blog-prompt", "");
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validatePrompt = (text) => {
    if (!text.trim()) {
      return "Please enter a prompt";
    }
    if (text.trim().length < PROMPT_CONFIG.MIN_LENGTH) {
      return `Please provide a more detailed prompt (at least ${PROMPT_CONFIG.MIN_LENGTH} characters)`;
    }
    return null;
  };

  const generate = useCallback(async () => {
    const validationError = validatePrompt(prompt);
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setIsLoading(true);
    setError(null);
    setBlog(null);

    const startTime = Date.now();

    try {
      const data = await generateBlog(prompt);
      const generationTime = (Date.now() - startTime) / 1000;
      const metrics = calculateBlogMetrics(data.blog, generationTime);

      const blogData = {
        content: data.blog,
        metrics,
        timestamp: new Date().toISOString(),
      };

      setBlog(blogData);
      return { success: true, blog: blogData };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate blog";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const reset = useCallback(() => {
    setPrompt("");
    setBlog(null);
    setError(null);
  }, [setPrompt]);

  const copyToClipboard = useCallback(async () => {
    if (!blog) return { success: false };

    try {
      await navigator.clipboard.writeText(blog.content);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to copy to clipboard" };
    }
  }, [blog]);

  return {
    prompt,
    setPrompt,
    blog,
    isLoading,
    error,
    generate,
    reset,
    copyToClipboard,
  };
}
