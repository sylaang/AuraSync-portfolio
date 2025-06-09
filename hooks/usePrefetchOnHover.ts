import { useCallback, useEffect, useRef } from 'react'

export function usePrefetchOnHover(url?: string) {
    const prefetched = useRef(false)

    const prefetch = useCallback(() => {
        if (!url || prefetched.current) return

        const link = document.createElement('link')
        if (!('relList' in link) || !link.relList.supports?.('prefetch')) return

        if ('connection' in navigator && (navigator.connection as any).saveData) return
        if (!window.matchMedia('(hover: hover)').matches) return

        prefetched.current = true
        link.rel = 'prefetch'
        link.href = url
        document.head.appendChild(link)

        return () => {
            document.head.removeChild(link)
        }
    }, [url])

    useEffect(() => {
        const timer = setTimeout(prefetch, 5000)
        return () => clearTimeout(timer)
    }, [prefetch])

    return prefetch
}