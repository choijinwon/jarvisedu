export const colors = {
  bg: "#F3F6FB",
  card: "#FFFFFF",
  text: "#0F172A",
  subText: "#64748B",
  border: "#E2E8F0",
  primary: "#2563EB",
  primarySoft: "#EFF6FF",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#0284C7",
};

export const shadow = "0 6px 20px rgba(15,23,42,0.06)";

export const typo = {
  h1: {
    margin: 0,
    fontSize: 24,
    lineHeight: "32px",
    letterSpacing: "-0.02em",
    fontWeight: 800,
    color: colors.text,
  } as const,
  h2: {
    margin: 0,
    fontSize: 18,
    lineHeight: "26px",
    fontWeight: 700,
    color: colors.text,
  } as const,
  body: {
    margin: 0,
    fontSize: 14,
    lineHeight: "22px",
    color: colors.text,
  } as const,
  caption: {
    margin: 0,
    fontSize: 12,
    lineHeight: "18px",
    color: colors.subText,
  } as const,
};

export const ui = {
  page: {
    padding: 16,
    background: colors.bg,
    minHeight: "100vh",
  } as const,
  card: {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    padding: 14,
    boxShadow: shadow,
    marginBottom: 12,
  } as const,
  sectionTitle: {
    margin: "16px 0 8px 0",
    color: colors.text,
    fontSize: 15,
    fontWeight: 700,
  } as const,
  buttonPrimary: {
    width: "100%",
    border: "none",
    borderRadius: 12,
    padding: "12px 14px",
    background: colors.primary,
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  } as const,
};
