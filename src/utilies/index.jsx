import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect, useState } from "react";

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState(null);

  useEffect(() => {
    const fetchFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    fetchFingerprint();
  }, []);

  return fingerprint;
};
