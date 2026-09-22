import type { SentimentId, State } from "@/lib/brand-layers/resolve";
import styles from "./BrandLayers.module.css";

/**
 * The one component on the stage: a payment ticket. It knows global token
 * names and nothing else: no brand, no ramp, no primitive appears in this
 * file, which is the whole claim of the piece. Colours arrive as CSS
 * variables set on the stage; `data-state` on each control picks which
 * state's variable applies.
 *
 * Sentiment is what the payment means right now, so each one is a payment
 * status: an offer, a scheduled payment, a paid one, one due soon, one late.
 */

export type Part = "primary" | "secondary" | "control";

const COPY: Record<
  SentimentId,
  {
    status: string;
    payee: string;
    meta: string;
    amount: string;
    link: string;
    primary: string;
    secondary: string;
  }
> = {
  proposition: {
    status: "Offer",
    payee: "Pay in 3",
    meta: "On your next purchase",
    amount: "0% interest",
    link: "Read the full terms",
    primary: "Activate",
    secondary: "Later",
  },
  neutral: {
    status: "Scheduled",
    payee: "Istanbul Water",
    meta: "Autopay · 28 October",
    amount: "₺412.80",
    link: "Change the payment date",
    primary: "Pay early",
    secondary: "Details",
  },
  success: {
    status: "Paid",
    payee: "Istanbul Energy",
    meta: "Electricity · October",
    amount: "₺1,240.50",
    link: "Download the receipt",
    primary: "Done",
    secondary: "Details",
  },
  warning: {
    status: "Due soon",
    payee: "Phone plan",
    meta: "Due in 3 days",
    amount: "₺649.00",
    link: "Set up automatic payment",
    primary: "Pay now",
    secondary: "Remind me",
  },
  alert: {
    status: "Overdue",
    payee: "Credit card",
    meta: "Missed on 12 October",
    amount: "₺3,870.25",
    link: "Avoid the late fee",
    primary: "Pay now",
    secondary: "Details",
  },
};

/** Sentiment is carried by the glyph and the status word as well as the colour. */
function Glyph({ sentiment }: { sentiment: SentimentId }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
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
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M12 4l9 16H3z" />
          <path d="M12 10v4M12 17.2v.1" />
        </svg>
      );
    case "neutral":
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
          <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
        </svg>
      );
    case "proposition":
      return (
        <svg {...common}>
          <path d="M6 18L18 6" />
          <circle cx="7.5" cy="7.5" r="2.5" />
          <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
      );
  }
}

type Props = {
  sentiment: SentimentId;
  states: Record<Part, State>;
  bind: (part: Part) => React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function PaymentTicket({ sentiment, states, bind }: Props) {
  const copy = COPY[sentiment];
  return (
    <div
      className={styles.card}
      role="group"
      aria-label={`${copy.payee}, ${copy.status.toLowerCase()}`}
    >
      <div className={styles.panel}>
        <Glyph sentiment={sentiment} />
        <span className={styles.statusWord}>{copy.status}</span>
      </div>
      <span className={styles.notch} data-edge="top" aria-hidden />
      <span className={styles.notch} data-edge="bottom" aria-hidden />

      <div className={styles.body}>
        <div className={styles.bodyHead}>
          <div>
            <p className={styles.payee}>{copy.payee}</p>
            <p className={styles.meta}>{copy.meta}</p>
          </div>
          <button
            type="button"
            className={styles.more}
            aria-label="More options"
            data-state={states.control}
            disabled={states.control === "disabled"}
            {...bind("control")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <circle cx="3.5" cy="8" r="1.5" fill="currentColor" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="12.5" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
        <p className={styles.amount}>{copy.amount}</p>
        {/* Drawn as a link for the token it demonstrates; it goes nowhere, so it is not one. */}
        <span className={styles.cardLink}>{copy.link}</span>

        <div className={styles.actions}>
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
      </div>
    </div>
  );
}
