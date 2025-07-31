import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { Banner } from "@/types/api";
import { useEffect } from "react";

interface Props {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: Props) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    banners.length > 0
      ? {
          loop: true,
          slides: {
            perView: 4,
            spacing: 16,
          },
          breakpoints: {
            "(max-width: 1024px)": {
              slides: { perView: 3, spacing: 12 },
            },
            "(max-width: 768px)": {
              slides: { perView: 2, spacing: 10 },
            },
            "(max-width: 480px)": {
              slides: { perView: 1, spacing: 8 },
            },
          },
        }
      : undefined
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let mouseOver = false;

    const clearNextTimeout = () => clearTimeout(timeout);
    const nextTimeout = () => {
      clearNextTimeout();
      if (mouseOver || !instanceRef.current) return;
      timeout = setTimeout(() => {
        instanceRef.current?.next();
      }, 3000);
    };

    const slider = instanceRef.current?.container;

    if (slider) {
      slider.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
    }

    nextTimeout();

    return () => {
      clearNextTimeout();
    };
  }, [instanceRef]);

  useEffect(() => {
    const resizeHandler = () => {
      instanceRef.current?.update();
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [instanceRef]);

  return (
    <div className="mt-6">
      <h2 className="font-medium text-sm mb-2">Temukan promo menarik</h2>

      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner, i) => (
          <div
            key={i}
            className="keen-slider__slide rounded-xl overflow-hidden bg-gray-100 shadow"
          >
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              className="w-full object-cover h-40"
            />
            <div className="p-2">
              <h3 className="font-semibold">{banner.banner_name}</h3>
              <p className="text-sm text-gray-600">{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
