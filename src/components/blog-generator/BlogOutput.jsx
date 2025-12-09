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
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Generated Blog</CardTitle>
            <CardDescription>
              Created on {new Date(blog.timestamp).toLocaleString()}
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <Separator className="mt-4" />

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Words</p>
            <p className="text-2xl font-bold">
              {blog.metrics.wordCount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Characters</p>
            <p className="text-2xl font-bold">
              {blog.metrics.characterCount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Read Time</p>
            <p className="text-2xl font-bold">{blog.metrics.readingTime} min</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Generated</p>
            <p className="text-2xl font-bold">{blog.metrics.generationTime}s</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={viewMode} onValueChange={setViewMode}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>

          {/* ---------------- PREVIEW MODE ---------------- */}
          <TabsContent value="preview" className="mt-6">
            <div
              className="
    prose prose-slate dark:prose-invert
    text-left max-w-none
    prose-headings:font-bold
    prose-h1:text-3xl
    prose-h2:text-2xl
    prose-h3:text-xl
    prose-p:leading-7
    prose-li:my-1

    /* ---- FORCE BULLET POINTS ---- */
    prose-ul:list-disc
    prose-ol:list-decimal
    prose-li:marker:text-current

    /* ---- FIX INDENTATION ---- */
    prose-ul:pl-10 prose-li:pl-2
    prose-ol:pl-8
    prose-li:pl-1

    /* extra enforcement */
    [&_ul]:list-disc
    [&_li]:list-disc
  "
            >
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </TabsContent>

          {/* ---------------- MARKDOWN MODE ---------------- */}
          <TabsContent value="markdown" className="mt-6">
            <pre className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg overflow-x-auto text-sm">
              <code>{blog.content}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
