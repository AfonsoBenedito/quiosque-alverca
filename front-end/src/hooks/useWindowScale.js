import { useState, useEffect, useCallback } from 'react';

export function useWindowScale(designWidth = 1920, designHeight = 1080) {
    const [scale, setScale]     = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const update = useCallback(() => {
        const s = Math.min(window.innerWidth / designWidth, window.innerHeight / designHeight);
        setScale(s);
        setOffsetX((window.innerWidth  - designWidth  * s) / 2);
        setOffsetY((window.innerHeight - designHeight * s) / 2);
    }, [designWidth, designHeight]);

    useEffect(() => {
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [update]);

    return { scale, offsetX, offsetY };
}
