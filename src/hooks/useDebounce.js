import { useState, useEffect } from "react";

export function useDebounce(valeur, delai = 300) {
  const [valeurDebounced, setValeurDebounced] = useState(valeur);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValeurDebounced(valeur);
    }, delai);

    return () => clearTimeout(timer);
  }, [valeur, delai]);

  return valeurDebounced;
}
