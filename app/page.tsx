"use client";

import { useCallback, useState } from "react";
import DevotionalScene from "../components/DevotionalScene";

export default function Home() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const handleCanvasReady = useCallback((node: HTMLCanvasElement) => {
    setCanvas(node);
  }, []);

  const handleDownload = useCallback(() => {
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "male-mahadeshwara-swamiji-cinematic-portrait.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  }, [canvas]);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "56px 24px 120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "grid",
          gap: "48px"
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              margin: "0 auto",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(249, 115, 22, 0.16)",
              color: "#f97316",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.78rem"
            }}
          >
            Divine Sunrise Portrait
          </div>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 3.4vw + 1.2rem, 4.5rem)",
              margin: 0,
              fontWeight: 700,
              lineHeight: 1.05
            }}
          >
            Male Mahadeshwara Swamy in Celestial Serenity
          </h1>
          <p
            style={{
              margin: "0 auto",
              maxWidth: "780px",
              color: "rgba(226, 232, 240, 0.86)",
              fontSize: "1.05rem",
              lineHeight: 1.7
            }}
          >
            Ultra-realistic devotional art envisioned with cinematic detail. Witness the compassionate grace of
            Male Mahadeshwara Swamy seated upon a majestic tiger amidst the sunrise-soaked, mist-laden forests of the MM
            Hills, bathed in divine golden light and adorned with glowing vibhuti.
          </p>
        </header>

        <DevotionalScene onCanvasReady={handleCanvasReady} />

        <section
          style={{
            display: "grid",
            gap: "20px",
            padding: "28px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(15, 23, 42, 0.86), rgba(30, 41, 59, 0.55))",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow: "0 20px 60px rgba(3, 7, 18, 0.55)"
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center"
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(135deg, #fb923c, #f97316)",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 12px 32px rgba(249, 115, 22, 0.45)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              onMouseEnter={(event) => {
                const target = event.currentTarget;
                target.style.transform = "translateY(-2px)";
                target.style.boxShadow = "0 24px 48px rgba(249, 115, 22, 0.55)";
              }}
              onMouseLeave={(event) => {
                const target = event.currentTarget;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 12px 32px rgba(249, 115, 22, 0.45)";
              }}
            >
              Download 8K Portrait
            </button>
            <a
              href="#scene-details"
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                border: "1px solid rgba(251, 146, 60, 0.55)",
                color: "#f8fafc",
                fontWeight: 600,
                fontSize: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              Scene breakdown
              <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
                →
              </span>
            </a>
          </div>

          <div
            id="scene-details"
            style={{
              display: "grid",
              gap: "18px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
            }}
          >
            {sceneDescriptors.map((descriptor) => (
              <article
                key={descriptor.title}
                style={{
                  padding: "18px",
                  borderRadius: "18px",
                  background: "rgba(15, 23, 42, 0.55)",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#fbbf24"
                  }}
                >
                  {descriptor.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "rgba(226, 232, 240, 0.82)",
                    fontSize: "0.96rem",
                    lineHeight: 1.6
                  }}
                >
                  {descriptor.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const sceneDescriptors = [
  {
    title: "Divine Presence",
    description:
      "Mahadeshwara Swamy is portrayed with compassionate calm, sacred vibhuti adorning his forehead and a radiant halo shimmering behind his headcloth."
  },
  {
    title: "Majestic Mount",
    description:
      "A regal tiger sits in tranquil devotion, its luminous coat glowing with golden warmth while subtle stripes signal both strength and surrender."
  },
  {
    title: "Mystic MM Hills",
    description:
      "Sunrise rays cascade through verdant, mist-filled forests of the Mahadeswara Hills, revealing depth, serenity, and cinematic atmosphere."
  },
  {
    title: "Glowing Trishula",
    description:
      "The golden Trishula radiates celestial light, captured with luminous gradients to symbolize divine power, protection, and unwavering devotion."
  }
];
