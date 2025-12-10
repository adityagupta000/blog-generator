// src/components/blog-generator/BlogOutput.jsx
import { useState } from "react";
import { Copy, Download, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { downloadBlog } from "../../utils/blogMetrics";

export default function BlogOutput({ blog, onCopy }) {
  const [viewMode, setViewMode] = useState("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const result = await onCopy();
    if (result.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadBlog(blog.content);
  };

  return (
    <Card className="border-2 shadow-lg" id="blog-output">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl sm:text-2xl">
              Generated Blog
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Created on{" "}
              {new Date(blog.timestamp).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CardDescription>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1 sm:gap-2 flex-1 sm:flex-initial h-9 sm:h-8"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Copy</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-1 sm:gap-2 flex-1 sm:flex-initial h-9 sm:h-8"
            >
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Download</span>
            </Button>
          </div>
        </div>

        <Separator className="mt-3 sm:mt-4" />

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-3 sm:pt-4">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Words</p>
            <p className="text-xl sm:text-2xl font-bold">
              {blog.metrics.wordCount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Characters
            </p>
            <p className="text-xl sm:text-2xl font-bold">
              {blog.metrics.characterCount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Read Time
            </p>
            <p className="text-xl sm:text-2xl font-bold">
              {blog.metrics.readingTime} min
            </p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Generated
            </p>
            <p className="text-xl sm:text-2xl font-bold">
              {blog.metrics.generationTime}s
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <Tabs value={viewMode} onValueChange={setViewMode}>
          <TabsList className="grid w-full max-w-md grid-cols-2 h-9 sm:h-10">
            <TabsTrigger value="preview" className="text-xs sm:text-sm">
              Preview
            </TabsTrigger>
            <TabsTrigger value="markdown" className="text-xs sm:text-sm">
              Markdown
            </TabsTrigger>
          </TabsList>

          {/* ---------------- PREVIEW MODE ---------------- */}
          <TabsContent value="preview" className="mt-4 sm:mt-6">
            <div
              className="
                prose prose-slate dark:prose-invert
                text-left max-w-none
                
                /* Base text sizing - responsive */
                text-sm sm:text-base
                
                /* Headings - responsive */
                prose-headings:font-bold
                prose-h1:text-2xl sm:prose-h1:text-3xl
                prose-h2:text-xl sm:prose-h2:text-2xl
                prose-h3:text-lg sm:prose-h3:text-xl
                prose-h4:text-base sm:prose-h4:text-lg
                
                /* Paragraphs */
                prose-p:leading-6 sm:prose-p:leading-7
                prose-p:mb-4
                
                /* Lists - responsive spacing */
                prose-li:my-0.5 sm:prose-li:my-1
                
                /* Bullet points */
                prose-ul:list-disc
                prose-ol:list-decimal
                prose-li:marker:text-current
                
                /* Indentation - responsive */
                prose-ul:pl-6 sm:prose-ul:pl-10
                prose-ol:pl-6 sm:prose-ol:pl-8
                prose-li:pl-1 sm:prose-li:pl-2
                
                /* Nested lists */
                prose-ul:space-y-1
                prose-ol:space-y-1
                
                /* Extra enforcement */
                [&_ul]:list-disc
                [&_li]:list-disc
                
                /* Code blocks - responsive */
                prose-code:text-xs sm:prose-code:text-sm
                prose-pre:text-xs sm:prose-pre:text-sm
                prose-pre:p-3 sm:prose-pre:p-4
                
                /* Links */
                prose-a:break-words
                
                /* Images - responsive */
                prose-img:rounded-lg
                prose-img:w-full
                
                /* Blockquotes - responsive */
                prose-blockquote:border-l-4
                prose-blockquote:pl-3 sm:prose-blockquote:pl-4
                prose-blockquote:text-sm sm:prose-blockquote:text-base
              "
            >
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </TabsContent>

          {/* ---------------- MARKDOWN MODE ---------------- */}
          <TabsContent value="markdown" className="mt-4 sm:mt-6">
            <pre className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg overflow-x-auto text-xs sm:text-sm">
              <code className="block whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">
                {blog.content}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
