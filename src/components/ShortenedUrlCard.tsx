import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShortenedUrlCardProps {
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  onDelete?: () => void;
}

export const ShortenedUrlCard = ({ originalUrl, shortUrl, createdAt, onDelete }: ShortenedUrlCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const makeLocalShortHref = (short: string) => {
    try {
      const u = new URL(short);
      const segments = u.pathname.split('/').filter(Boolean);
      const code = segments[0] ?? '';
      return `${window.location.origin}/${code}`;
    } catch {
      const code = short.split('/').filter(Boolean).pop() ?? '';
      return `${window.location.origin}/${code}`;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <Card className="w-full bg-gradient-card border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-end">
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="p-2 h-auto text-muted-foreground hover:text-foreground"
                aria-label="Delete"
                title="Delete"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Original URL</label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-foreground/80 text-sm">{truncateUrl(originalUrl)}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(originalUrl, '_blank')}
                className="p-1 h-auto text-muted-foreground hover:text-primary"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Short URL</label>
            <div className="flex items-center gap-3 mt-1 p-3 bg-secondary/30 rounded-lg border border-border/30">
              <a
                href={makeLocalShortHref(shortUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-mono flex-1 underline decoration-dotted"
              >
                {shortUrl}
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="p-2 h-auto hover:bg-primary/10"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Created {createdAt.toLocaleDateString()} at {createdAt.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};