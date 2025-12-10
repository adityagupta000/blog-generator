// src/components/blog-generator/ExamplePrompts.jsx
import { FileText } from "lucide-react";
import { EXAMPLE_PROMPTS } from "../../utils/constants";

export default function ExamplePrompts({ onSelectPrompt, disabled }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <p className="text-xs sm:text-sm font-medium text-foreground">
        Try these examples
      </p>
      <div className="grid gap-2 sm:gap-2.5 md:gap-3 grid-cols-1 sm:grid-cols-2">
        {EXAMPLE_PROMPTS.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(example)}
            disabled={disabled}
            className="
              text-left p-2.5 sm:p-3 rounded-lg 
              border border-dashed 
              hover:border-solid hover:bg-accent hover:shadow-sm
              active:scale-[0.98]
              transition-all duration-200
              text-xs sm:text-sm 
              disabled:opacity-50 disabled:cursor-not-allowed
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            "
          >
            <span className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
              <span className="truncate leading-snug">{example}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}