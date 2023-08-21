"use client";

import { imageUrlCloudinary } from "@/lib/functions";
import Image from "next/image";
import { Media } from "@/utils/prompt";
import React from "react";
import { TrackDetails, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const FeedMedia = ({ medias }: { medias: Media[] }) => {
  const [details, setDetails] = React.useState<TrackDetails | null>(null);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    detailsChanged(s) {
      setDetails(s.track.details);
    },
    slides: {
      origin: "center",
    },

    initial: 2,
  });

  function scaleStyle(idx: number) {
    if (!details) return {};
    const slide = details.slides[idx];
    const scale_size = 0.7;
    const scale = 1 - (scale_size - scale_size * slide.portion);
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    };
  }

  return (
    <div ref={sliderRef} className="keen-slider zoom-out">
      {medias?.map((image, idx) => {
        return (
          <div className={`keen-slider__slide zoom-out__slide`}>
            <div style={scaleStyle(idx)}>
              <Image
                key={idx}
                src={imageUrlCloudinary(image)}
                alt={`${image.public_id} preview ${idx}`}
                priority={idx === 0}
                className="rounded-lg shadow-lg p-2 object-cover"
                placeholder="empty"
                height={300}
                width={350}
              />
              <div>
                <span className="text-center text-neutral-600 p-2">
                  {idx + 1} of {medias.length}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedMedia;
