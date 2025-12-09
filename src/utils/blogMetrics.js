// src/utils/blogMetrics.js

/**
 * Calculate blog content metrics
 * @param {string} content - The blog content
 * @param {number} generationTime - Time taken to generate (in seconds)
 * @returns {Object} Metrics object
 */
export function calculateBlogMetrics(content, generationTime) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;
  const characterCount = content.length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute average

  return {
    wordCount,
    characterCount,
    readingTime,
    generationTime: generationTime.toFixed(1),
  };
}

/**
 * Download blog as markdown file
 * @param {string} content - Blog content
 */
export function downloadBlog(content) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/markdown;charset=utf-8" });
  element.href = URL.createObjectURL(file);
  element.download = `blog-${new Date().toISOString().split("T")[0]}.md`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
}
