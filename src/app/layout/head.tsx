
import React from 'react';

interface HeadProps {
  title?: string;
  description?: string;
}

export function Head({ title = "ProcurityIQ", description = "Procurement Intelligence Platform" }: HeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
