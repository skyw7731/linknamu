// 배경 장식: 흐릿한 벚꽃빛 원들. 리퀴드 글래스 카드 뒤로 색이 비쳐 보이도록
// 일부 원은 화면 가운데(카드가 놓이는 영역)에 걸치게 배치했습니다.
// 위치는 화면 가운데(left-1/2) 기준으로 잡아, 넓은 화면에서도 콘텐츠 열 주변에 모이게 합니다.
const blobs = [
  // 좌상단: 프로필 뒤로 은은하게
  "left-1/2 top-[-4rem] size-[22rem] -translate-x-[95%] bg-[#f9b8c8]/60",
  // 우상단 작은 포인트
  "left-1/2 top-[10%] size-[8rem] translate-x-[60%] bg-[#ffd6e0]/80",
  // 우측 중단: 첫·두 번째 카드 뒤
  "left-1/2 top-[36%] size-[18rem] -translate-x-[5%] bg-[#f497b0]/45",
  // 좌측 중하단: 세 번째 카드 뒤
  "left-1/2 top-[56%] size-[14rem] -translate-x-[90%] bg-[#ffc9d6]/70",
  // 우하단: 바닥을 받쳐 주는 큰 원
  "left-1/2 bottom-[-8rem] size-[24rem] -translate-x-[15%] bg-[#f6a9bd]/40",
];

export default function BlossomBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {blobs.map((cls) => (
        <div key={cls} className={`absolute rounded-full blur-3xl ${cls}`} />
      ))}
    </div>
  );
}
