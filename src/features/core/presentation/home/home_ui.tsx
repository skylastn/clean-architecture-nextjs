"use client";

import { StateType } from "@/shared/domain/model/state_model";
import { useHomeLogic } from "./home_logic";
import LoadingComponent from "@/shared/component/ui/loading/loading_component";
import DefaultImage from "@/shared/component/ui/default_image";
import { SamplePhotoResponse } from "../../domain/model/response/sample/sample_photo_response";

export default function HomeUI() {
  const { photoState } = useHomeLogic();

  switch (photoState.type) {
    case StateType.loading:
    case StateType.initial:
      return (
        <div className="flex h-75 items-center justify-center">
          <LoadingComponent />
        </div>
      );

    case StateType.error:
      return (
        <div className="px-4 py-10">
          <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {photoState.message}
          </p>
        </div>
      );

    default:
      break;
  }

  return (
    <section className="px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white md:text-xl">
          Product Lainnya
        </h3>
        <span className="text-xs  md:text-sm text-white">
          {(photoState.data ?? []).length} items
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(photoState.data ?? []).map((item) => (
          <ContentComponent
            content={item}
            key={item.id}
            // onClick={() => toProductDetail(item.id ?? "")}
          />
        ))}
      </div>
    </section>
  );
}

export function ContentComponent({
  content,
  onClick,
}: {
  content: SamplePhotoResponse;
  onClick?: () => void;
}): React.ReactElement {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <DefaultImage
          src={content.download_url ?? ""}
          alt={content.author ?? "image"}
          className="h-full w-full"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="inline-flex max-w-full rounded-full bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white/70 backdrop-blur-md">
          Featured
        </div>

        <h3 className="mt-3 line-clamp-2 text-base font-semibold text-white md:text-lg">
          {content.author}
        </h3>

        <p className="mt-1 text-sm text-white/70">Explore this collection</p>
      </div>
    </a>
  );
}
