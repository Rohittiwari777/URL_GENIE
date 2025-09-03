import { useState, useEffect } from "react";
import { UrlShortenerForm } from "@/components/UrlShortenerForm";
import { RecentUrlsList } from "@/components/RecentUrlsList";
import { Wand2 } from "lucide-react";
import { fetchRecentUrls, deleteUrl } from "@/db/urlRepository";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

const Index = () => {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

  // Load URLs from Supabase on component mount
  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchRecentUrls(10);
        const mapped: ShortenedUrl[] = rows.map((r) => ({
          id: r.id,
          originalUrl: r.original_url,
          shortUrl: r.short_url,
          createdAt: new Date(r.created_at),
        }));
        setShortenedUrls(mapped);
      } catch (err) {
        console.error('Failed to load URLs', err);
      }
    };
    load();
  }, []);

  const handleUrlShortened = (originalUrl: string, shortUrl: string) => {
    // optimistic update (id/time will be corrected on reload)
    const optimistic: ShortenedUrl = {
      id: Math.random().toString(36).slice(2),
      originalUrl,
      shortUrl,
      createdAt: new Date(),
    };
    setShortenedUrls(prev => [optimistic, ...prev].slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="text-center max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                <Wand2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                URL Genie
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Summon short, shareable links — with a touch of Arabian magic
            </p>
          </div>

          {/* URL Shortener Form */}
          <UrlShortenerForm onUrlShortened={handleUrlShortened} />

          {/* Recent URLs List */}
          <RecentUrlsList
            urls={shortenedUrls}
            onDelete={async (id) => {
              // optimistic update
              setShortenedUrls((prev) => prev.filter((u) => u.id !== id));
              try {
                await deleteUrl(id);
              } catch (err) {
                // reload on error to sync
                const rows = await fetchRecentUrls(10);
                const mapped: ShortenedUrl[] = rows.map((r) => ({
                  id: r.id,
                  originalUrl: r.original_url,
                  shortUrl: r.short_url,
                  createdAt: new Date(r.created_at),
                }));
                setShortenedUrls(mapped);
              }
            }}
          />

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              Made with ✨ by{" "}
              <a
                href="https://rohittiwari7.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline decoration-dotted transition-colors"
              >
                Rohit
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
