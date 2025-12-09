// src/components/blog-generator/BlogInput.jsx
import { Loader2, Sparkles, Zap, ArrowRight, RefreshCw, Brain, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import ExamplePrompts from './ExamplePrompts';
import { PROMPT_CONFIG } from '../../utils/constants';

export default function BlogInput({ 
  prompt, 
  setPrompt, 
  isLoading, 
  error, 
  onGenerate,
  onReset 
}) {
  const handleExampleSelect = (example) => {
    setPrompt(example);
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-blue-600" />
          Create Your Blog
        </CardTitle>
        <CardDescription className="text-base">
          Describe your topic in detail. The more specific you are, the better the results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Textarea
            placeholder={PROMPT_CONFIG.PLACEHOLDER}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="resize-none text-base"
            disabled={isLoading}
            maxLength={PROMPT_CONFIG.MAX_LENGTH}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{prompt.length}/{PROMPT_CONFIG.MAX_LENGTH} characters</span>
            {prompt && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="h-8"
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
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full h-12 text-base"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Your Blog...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Generate Professional Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Brain className="h-3 w-3" />
            Powered by Llama 3.3 70B
          </span>
          <span>•</span>
          <span>Average generation: 5-10 seconds</span>
        </div>
      </CardContent>
    </Card>
  );
}