// src/components/blog-generator/FeatureCards.jsx
import { FileText, Sparkles, Zap, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const iconMap = {
  FileText,
  Sparkles,
  Zap,
  CheckCircle,
};

export default function FeatureCards({ features }) {
  return (
    <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon];
        return (
          <Card
            key={index}
            className="border-2 transition-shadow hover:shadow-md"
          >
            <CardContent className="p-4 sm:p-5 md:pt-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
