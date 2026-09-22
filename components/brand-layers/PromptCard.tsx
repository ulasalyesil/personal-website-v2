import type { SentimentId, State } from "@/lib/brand-layers/resolve";
import styles from "./BrandLayers.module.css";

/**
 * The one component on the stage. It knows global token names and nothing
 * else: no brand, no sentiment, no primitive appears in this file, which is
 * the whole claim of the piece. Colours arrive as CSS variables set on the
 * stage; `data-state` on each control picks which state's variable applies.
 */

export type Part = "primary" | "secondary" | "control";

const COPY: Record<
  SentimentId,
  {
    title: string;
    body: string;
    link: string;
    primary: string;
    secondary: string;
  }
> = {
  proposition: {
    title: "Cashback on card payments",
    body: "Earn 2% back all month.",
    link: "See how the cashback works",
    primary: "Turn it on",
    secondary: "Not now",
  },
  neutral: {
    title: "Your statement is ready",
    body: "September is closed and filed.",
    link: "Open the full statement",
    primary: "Download PDF",
    secondary: "Later",
  },
  success: {
    title: "Transfer sent",
    body: "450.00 is on its way to Deniz.",
    link: "View the transfer receipt",
    primary: "Done",
    secondary: "Send another",
  },
  warning: {
    title: "Your card expires soon",
    body: "Order one before 30 October.",
    link: "Order a replacement card",
    primary: "Order card",
    secondary: "Remind me",
  },
  alert: {
    title: "Payment declined",
    body: "Your card couldn't be reached.",
    link: "See why the payment failed",
    primary: "Try again",
    secondary: "Contact us",
  },
};

/** Sentiment is carried by the glyph as well as the colour. */
function Glyph({ sentiment }: { sentiment: SentimentId }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (sentiment) {
    case "success":
      return (
        <svg {...common}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="M12 4l9 16H3z" />
          <path d="M12 10v4M12 17.2v.1" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "neutral":
      return (
        <svg {...common}>
          <path d="M12 11v6M12 7.2v.1" />
        </svg>
      );
    case "proposition":
      return (
        <svg {...common}>
          <path d="M12 3.5l2.4 5.3 5.6.6-4.2 3.8 1.2 5.6L12 16l-5 2.8 1.2-5.6L4 9.4l5.6-.6z" />
        </svg>
      );
  }
}

type Props = {
  sentiment: SentimentId;
  states: Record<Part, State>;
  bind: (part: Part) => React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function PromptCard({ sentiment, states, bind }: Props) {
  const copy = COPY[sentiment];
  return (
    <div
      className={styles.card}
      role="group"
      aria-label={`${sentiment} prompt`}
    >
      <div className={styles.cardHead}>
        <span className={styles.badge}>
          <Glyph sentiment={sentiment} />
        </span>
        <div className={styles.cardText}>
          <p className={styles.cardTitle}>{copy.title}</p>
          <p className={styles.cardBody}>{copy.body}</p>
          {/* Drawn as a link for the token it demonstrates; it goes nowhere, so it is not one. */}
          <span className={styles.cardLink}>{copy.link}</span>
        </div>
        <button
          type="button"
          className={styles.dismiss}
          aria-label="Dismiss"
          data-state={states.control}
          disabled={states.control === "disabled"}
          {...bind("control")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <button
        type="button"
        className={styles.secondary}
        data-state={states.secondary}
        disabled={states.secondary === "disabled"}
        {...bind("secondary")}
      >
        {copy.secondary}
      </button>
      <button
        type="button"
        className={styles.primary}
        data-state={states.primary}
        disabled={states.primary === "disabled"}
        {...bind("primary")}
      >
        {copy.primary}
      </button>
    </div>
  );
}
