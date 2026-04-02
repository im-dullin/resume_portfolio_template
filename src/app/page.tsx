"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/layout/CustomCursor";
import CommandPalette from "@/components/layout/CommandPalette";
import Footer from "@/components/layout/Footer";
import TechAnnotation from "@/components/ui/TechAnnotation";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"));
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Timeline = dynamic(() => import("@/components/sections/Timeline"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"), { ssr: false });
const Blog = dynamic(() => import("@/components/sections/Blog"));
const OpenTo = dynamic(() => import("@/components/sections/OpenTo"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <CommandPalette />
      <Navbar />

      <main>
        <TechAnnotation
          tech="Editorial Layout + Staggered Motion"
          detail="대형 타이포그래피와 전신 사진을 좌우 배치한 에디토리얼 레이아웃. Framer Motion의 stagger delay로 텍스트·이미지·CTA가 순차 등장합니다."
        >
          <Hero />
        </TechAnnotation>

        <Philosophy />

        <TechAnnotation
          tech="Framer Motion — Word-level Reveal"
          detail="각 단어를 overflow-hidden + translateY 애니메이션으로 스크롤 시 순차적으로 등장시킵니다. whileInView로 뷰포트 진입 시 트리거."
        >
          <About />
        </TechAnnotation>

        <TechAnnotation
          tech="CSS Grid — Bento Layout"
          detail="auto-rows + col-span/row-span 조합으로 비정형 그리드를 구성. whileHover로 카드 부양 효과를 적용합니다."
        >
          <Projects />
        </TechAnnotation>

        <TechAnnotation
          tech="Scroll-driven SVG Line"
          detail="useScroll + sticky 뷰포트 고정 안에서 stroke-dashoffset으로 S-커브가 그려지며, getPointAtLength 기반 좌표 계산으로 카드가 순차 등장합니다."
        >
          <Timeline />
        </TechAnnotation>

        <TechAnnotation
          tech="Bento Grid — Scroll-driven Bars"
          detail="useScroll + useSpring으로 각 스킬 바가 스크롤에 따라 채워지는 벤토 그리드. 카테고리별 카드가 시차를 두고 등장합니다."
        >
          <TechStack />
        </TechAnnotation>

        <TechAnnotation
          tech="Magazine Editorial — Scroll-linked Reveal"
          detail="히어로 포스트 + 2단 사이드 레이아웃의 매거진 에디토리얼. useScroll + useSpring으로 각 카드가 시차를 두고 등장합니다."
        >
          <Blog />
        </TechAnnotation>

        <TechAnnotation
          tech="Editorial Grid — Scroll-linked Stagger"
          detail="4단 컬럼 에디토리얼 레이아웃. useScroll + useSpring으로 제목→설명→컬럼이 시차를 두고 등장하며 pulsing dot으로 활성 상태를 표시합니다."
        >
          <OpenTo />
        </TechAnnotation>

        <TechAnnotation
          tech="Magnetic Button — Spring Physics"
          detail="마우스 좌표와 버튼 중심의 거리를 계산하여 spring animation으로 버튼이 커서를 따라오는 자기장 효과를 구현합니다."
        >
          <Contact />
        </TechAnnotation>
      </main>

      <Footer />
    </>
  );
}
