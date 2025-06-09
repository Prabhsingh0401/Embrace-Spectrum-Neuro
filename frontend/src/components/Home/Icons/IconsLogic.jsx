import { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"; 
import React from "react";
import { useAudioDescription } from "../../AudioDescription/AudioDescriptionContext";

export default function IconsCards({
  className = "",
  images = [],
  titles = [],
  links = [],
  containerWidth = 300,
  containerHeight = 300,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
}) {
  const { isAudioDescriptionEnabled, speakText } = useAudioDescription();
  useEffect(() => {
    gsap.fromTo(
      ".card",
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      }
    );
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      role="navigation"
      aria-label="Feature navigation"
    >
      {images.map((src, idx) => (
        <Link
          to={links[idx] || "#"}
          key={idx}
          className={`card card-${idx} absolute w-[170px] aspect-square rounded-[30px] overflow-hidden group`}
          style={{
            transform: transformStyles[idx] || "none",
          }}
          onMouseEnter={() => {
            pushSiblings(idx);
            if (isAudioDescriptionEnabled && titles[idx]) {
              speakText(`${titles[idx]} feature`);
            }
          }}
          onMouseLeave={resetSiblings}
          aria-label={`${titles[idx] || `Feature ${idx+1}`} - Navigate to ${links[idx] || "#"}`}
          role="button"
        >
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={titles[idx] || `Feature ${idx+1}`}
          />
          {titles[idx] && (
            <div className="absolute bottom-0 w-full bg-black/70 text-white text-center py-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {titles[idx]}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
