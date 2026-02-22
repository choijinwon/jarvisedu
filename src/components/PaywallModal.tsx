import React from "react";
import { colors, typo } from "../styles";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

export function PaywallModal({ open, onClose, onStart }: PaywallModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          background: "#fff",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: 16,
          border: `1px solid ${colors.border}`,
        }}
      >
        <h3 style={typo.h2}>Pro로 업그레이드</h3>
        <p style={{ ...typo.caption, marginTop: 6 }}>
          이번 주에 뭘 해야 할지, 자비스가 정해줍니다.
        </p>
        <ul style={{ margin: "10px 0 0 18px", color: colors.subText, fontSize: 14 }}>
          <li>리포트 PDF 무제한</li>
          <li>전형 전략 비교</li>
          <li>부모 공유 링크</li>
        </ul>

        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              border: `1px solid ${colors.border}`,
              background: "#fff",
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
            }}
          >
            무료로 계속
          </button>
          <button
            onClick={onStart}
            style={{
              flex: 1,
              border: "none",
              background: colors.primary,
              color: "#fff",
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
            }}
          >
            Pro 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
