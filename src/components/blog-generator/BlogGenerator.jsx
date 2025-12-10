// src/components/blog-generator/BlogGenerator.jsx
import { useEffect } from "react";
import { toast } from "sonner";
import { useBlogGenerator } from "../../hooks/useBlogGenerator";
import BlogInput from "./BlogInput";
import BlogOutput from "./BlogOutput";

export default function BlogGenerator() {
  const {
    prompt,
    setPrompt,
    blog,
    isLoading,
    error,
    generate,
    reset,
    copyToClipboard,
  } = useBlogGenerator();

  const handleGenerate = async () => {
    const result = await generate();

    if (result.success) {
      toast.success("Blog generated successfully!", {
        description: `${result.blog.metrics.wordCount} words in ${result.blog.metrics.generationTime}s`,
      });

      // Scroll to result
      setTimeout(() => {
        document.getElementById("blog-output")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      toast.error("Generation failed", {
        description: result.error,
      });
    }
  };

  const handleCopy = async () => {
    const result = await copyToClipboard();
    if (result.success) {
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Failed to copy to clipboard");
    }
    return result;
  };

  const handleReset = () => {
    reset();
    toast.info("Generator reset");
  };

  const handleExampleSelect = (example) => {
    setPrompt(example);
    toast.info("Example prompt loaded");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <BlogInput
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
            error={error}
            onGenerate={handleGenerate}
            onReset={handleReset}
            onExampleSelect={handleExampleSelect}
          />

          {blog && <BlogOutput blog={blog} onCopy={handleCopy} />}
        </div>
      </div>
    </div>
  );
}
