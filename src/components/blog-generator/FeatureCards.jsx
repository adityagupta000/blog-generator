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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon];
        return (
          <Card key={index} className="border-2">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
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
