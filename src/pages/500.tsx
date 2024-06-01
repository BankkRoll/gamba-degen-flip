// src/pages/500.tsx

import { BASE_SEO_CONFIG } from "../constants";
import { GambaButton } from "@/components/ui/GambaPlayButton";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Custom500() {
  return (
    <>
      <NextSeo title={`${BASE_SEO_CONFIG.defaultTitle} | 500`} />

      <div className="bg-black min-h-[80vh] relative mx-auto flex flex-col justify-center items-center text-center transition-all">
        <div className="bg-black animate-pulse flex flex-col justify-center items-center mx-auto px-10 py-20 rounded-lg shadow-xl">
          <div className="flex flex-col justify-center items-center rounded-lg">
            <video
              src="/gamba.mp4"
              className="w-full h-full"
              autoPlay
              muted
              playsInline
              loop
            />
            <p className="text-2xl text-white my-5">Oops! Page not found.</p>
            <Link href="/" passHref>
              <GambaButton
                disabled={false}
                onClick={() => []}
                text="Back Home"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
