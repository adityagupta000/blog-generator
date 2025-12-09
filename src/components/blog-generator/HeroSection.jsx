// src/components/blog-generator/HeroSection.jsx
import { Brain, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 px-4 py-2 text-sm font-medium">
            <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400">
              AI-Powered Content Generation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Professional Blog Generator
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into comprehensive, well-structured blog posts
            in seconds. Powered by advanced AI technology.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>1000+ Words</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Professional Format</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
