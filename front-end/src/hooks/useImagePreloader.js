import { useState, useEffect } from 'react';

export function useImagePreloader(sources) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let loaded = 0;
        const onLoad = () => { if (++loaded === sources.length) setReady(true); };
        // Fallback: reveal after 3s regardless, in case a resource is slow/fails
        const timeout = setTimeout(() => setReady(true), 3000);
        sources.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = onLoad;
            img.src = src;
        });
        return () => clearTimeout(timeout);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return ready;
}
