// src/components/blog-generator/BlogInput.jsx
import {
  Loader2,
  Sparkles,
  Zap,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import ExamplePrompts from "./ExamplePrompts";
import { PROMPT_CONFIG } from "../../utils/constants";

export default function BlogInput({
  prompt,
  setPrompt,
  isLoading,
  error,
  onGenerate,
  onReset,
}) {
  const handleExampleSelect = (example) => {
    setPrompt(example);
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="space-y-2 sm:space-y-3">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
          <span>Create Your Blog</span>
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Describe your topic in detail. The more specific you are, the better
          the results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-3">
          <Textarea
            placeholder={PROMPT_CONFIG.PLACEHOLDER}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="resize-none text-sm sm:text-base min-h-[120px] sm:min-h-[144px]"
            disabled={isLoading}
            maxLength={PROMPT_CONFIG.MAX_LENGTH}
          />
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="order-2 xs:order-1">
              {prompt.length}/{PROMPT_CONFIG.MAX_LENGTH} characters
            </span>
            {prompt && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="h-8 w-full xs:w-auto order-1 xs:order-2"
                disabled={isLoading}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <ExamplePrompts
          onSelectPrompt={handleExampleSelect}
          disabled={isLoading}
        />

        {error && (
          <Alert variant="destructive" className="text-sm sm:text-base">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <AlertDescription className="ml-2">{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full justify-center h-11 sm:h-12 text-sm sm:text-base"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin flex-shrink-0" />
              <span className="truncate">Generating Your Blog...</span>
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="hidden sm:inline">Generate Professional Blog</span>
              <span className="sm:hidden">Generate Blog</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}