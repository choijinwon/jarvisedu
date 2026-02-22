import { LogEntry } from "../types";

export const mockLogs: LogEntry[] = [
  {
    id: "l1",
    userId: "u1",
    date: "2026-03-12",
    category: "교과",
    title: "생명과학 수행평가 - 효소 반응 실험",
    action: "변인 통제 방식을 재설계하고 측정 오차 원인을 분류했다.",
    learn: "온도 변수보다 pH 통제가 결과 재현성에 더 큰 영향을 준다는 점을 확인했다.",
    nextStep: "pH 구간별 반응속도 비교표를 만들어 후속 탐구로 확장",
    subjectTags: ["생명과학"],
    competencyTags: ["탐구", "문제해결"],
    majorTags: ["의생명"],
    visibility: "core"
  },
  {
    id: "l2",
    userId: "u1",
    date: "2026-03-08",
    category: "교과",
    title: "국어 발표 - 과학 기사 비판적 읽기",
    action: "근거 문장과 주장 문장을 분리해 발표 자료를 구성했다.",
    learn: "주장 타당성을 판단할 때 자료 출처 신뢰도를 먼저 검토해야 함을 배웠다.",
    nextStep: "다음 발표에서 반론 파트 추가",
    subjectTags: ["국어"],
    competencyTags: ["문해", "의사소통"],
    majorTags: ["데이터분석"],
    visibility: "core"
  },
  {
    id: "l3",
    userId: "u1",
    date: "2026-03-02",
    category: "진로",
    title: "진로 독서 메모",
    action: "관심 분야 도서를 읽고 핵심 문장을 정리했다.",
    learn: "생명정보학에서 통계 기초가 중요하다는 점을 이해했다.",
    nextStep: "관련 수학 단원 연결 정리",
    subjectTags: ["진로"],
    competencyTags: ["성실"],
    majorTags: ["의생명", "데이터분석"],
    visibility: "limited"
  }
];
