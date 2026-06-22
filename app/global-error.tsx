'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: '40px 20px',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          background: '#0a0a0a',
          color: '#e0e0e0',
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '24px', color: '#d4af37', marginBottom: '16px' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#999', marginBottom: '24px' }}>
            The page encountered a client-side error. Details below help us fix it.
          </p>

          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              ERROR MESSAGE:
            </div>
            <div style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '16px' }}>
              {error.message || 'Unknown error'}
            </div>

            {error.digest && (
              <div style={{ fontSize: '12px', color: '#888' }}>
                Digest: {error.digest}
              </div>
            )}

            {error.stack && (
              <>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#888',
                    marginTop: '16px',
                    marginBottom: '8px',
                  }}
                >
                  STACK TRACE:
                </div>
                <pre
                  style={{
                    color: '#aaa',
                    fontSize: '11px',
                    lineHeight: '1.5',
                    overflow: 'auto',
                    maxHeight: '300px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {error.stack}
                </pre>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={reset}
              style={{
                background: '#d4af37',
                color: '#000',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: 'transparent',
                color: '#999',
                border: '1px solid #333',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
