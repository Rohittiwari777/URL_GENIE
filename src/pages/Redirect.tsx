import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecentUrls } from "@/db/urlRepository";
import supabase from "@/db/supabase";

const Redirect = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  useEffect(() => {
    const go = async () => {
      if (!code) return;
      const { data, error } = await supabase
        .from('urls')
        .select('original_url')
        .eq('short_url', `${window.location.origin}/${code}`)
        .maybeSingle();

      if (error || !data) {
        navigate('/');
        return;
      }
      window.location.replace(data.original_url);
    };
    go();
  }, [code, navigate]);

  return null;
};

export default Redirect;


