// src/components/blog-generator/ExamplePrompts.jsx
import { FileText } from "lucide-react";
import { EXAMPLE_PROMPTS } from "../../utils/constants";

export default function ExamplePrompts({ onSelectPrompt, disabled }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        Try these examples
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {EXAMPLE_PROMPTS.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(example)}
            disabled={disabled}
            className="text-left p-3 rounded-lg border border-dashed hover:border-solid hover:bg-accent transition-colors text-sm disabled:opacity-50"
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{example}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
