import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertUrl } from "@/db/urlRepository";

interface UrlShortenerFormProps {
  onUrlShortened: (originalUrl: string, shortUrl: string) => void;
}

export const UrlShortenerForm = ({ onUrlShortened }: UrlShortenerFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    const urlToShorten = url.startsWith('http') ? url : `https://${url}`;
    
    if (!isValidUrl(urlToShorten)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const shortCode = generateShortCode();
    const shortUrl = `${window.location.origin}/${shortCode}`;
    try {
      await insertUrl(urlToShorten, shortUrl);
      onUrlShortened(urlToShorten, shortUrl);
      setUrl("");
      toast({
        title: "Success!",
        description: "Your URL has been shortened successfully",
      });
    } catch (err: any) {
      toast({
        title: "Failed to save",
        description: err?.message || "Could not save to database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-card border-border/50 shadow-elegant">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Wand2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Ask the URL Genie</h2>
            <p className="text-muted-foreground">Whisper a link and let the magic begin</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-12 bg-input/50 border-border/50 focus:border-primary transition-colors"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Shortening...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Grant Wish
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};