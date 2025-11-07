"use client";

import "./globals.css";
import { ReactNode, useEffect } from "react";

const fontFace = `
  @font-face {
    font-family: 'Inter';
    src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrKpeIF8t2yCQ.woff2') format('woff2');
    font-weight: 400 900;
    font-display: swap;
  }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fontFace;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Mahadeshwara Swamy Devotional Portrait</title>
        <meta
          name="description"
          content="Ultra-realistic, cinematic devotional portrayal of Male Mahadeshwara Swamy seated in divine serenity atop a majestic tiger amidst the dawn-lit MM Hills."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body>{children}</body>
    </html>
  );
}
