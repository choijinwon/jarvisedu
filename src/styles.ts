export const colors = {
  bg: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  subText: "#6B7280",
  border: "#E5E7EB",
  primary: "#2563EB",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
};

export const shadow = "0 2px 10px rgba(17,24,39,0.06)";

export const ui = {
  page: {
    padding: 16,
    background: colors.bg,
    minHeight: "100vh",
  } as const,
  card: {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 14,
    padding: 14,
    boxShadow: shadow,
    marginBottom: 12,
  } as const,
  title: {
    margin: "0 0 10px 0",
    color: colors.text,
    fontSize: 22,
  } as const,
  sectionTitle: {
    margin: "16px 0 8px 0",
    color: colors.text,
    fontSize: 16,
  } as const,
};
