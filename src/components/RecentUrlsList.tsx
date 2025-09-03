import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShortenedUrlCard } from "./ShortenedUrlCard";
import { Moon, History } from "lucide-react";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

interface RecentUrlsListProps {
  urls: ShortenedUrl[];
  onDelete?: (id: string) => void;
}

export const RecentUrlsList = ({ urls, onDelete }: RecentUrlsListProps) => {
  if (urls.length === 0) {
    return (
      <Card className="w-full max-w-2xl bg-gradient-card border-border/50">
        <CardContent className="p-8 text-center">
          <Moon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">The lamp is quiet</h3>
          <p className="text-muted-foreground">Grant a wish to see your links here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl bg-gradient-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <History className="w-5 h-5 text-primary" />
          Recent Wishes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {urls.map((url) => (
          <ShortenedUrlCard
            key={url.id}
            originalUrl={url.originalUrl}
            shortUrl={url.shortUrl}
            createdAt={url.createdAt}
            onDelete={onDelete ? () => onDelete(url.id) : undefined}
          />
        ))}
      </CardContent>
    </Card>
  );
};