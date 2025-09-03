import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../db/supabase";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    const checkShortUrl = async () => {
      const shortCode = location.pathname.replace("/", "");

      if (!shortCode) return;

      const { data, error } = await supabase
        .from("urls")
        .select("original_url")
        .eq("short_url", shortCode)
        .single();

      if (error || !data) {
        console.error("Redirect error:", error);
        return;
      }

      // redirect to original url
      window.location.href = data.original_url;
    };

    checkShortUrl();
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">404 - Not Found</h1>
      <p>If this is a short link, redirecting...</p>
    </div>
  );
};

export default NotFound;
