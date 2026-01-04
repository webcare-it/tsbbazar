import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  SectionTitle,
  SectionTitleSkeleton,
} from "@/components/common/section-title";
import { useGetCategoryProductsForHome } from "@/api/queries/useProducts";
import type { ProductType } from "@/type";
import { slugify } from "@/helper";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { CardLayout } from "@/components/common/card-layout";

interface FormatType {
  categoryId: string;
  name: string;
  products: { data: ProductType[] };
  hasProducts: boolean;
  isLoading: boolean;
}

export const CategoryProductsSection = () => {
  const { data, isLoading } = useGetCategoryProductsForHome();
  const formatted = (data?.data as FormatType[]) || [];

  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <section key={i} className="mb-10 md:mb-20">
              <SectionTitleSkeleton />
              <div className="w-full">
                <CardLayout>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </CardLayout>
              </div>
            </section>
          ))}
        </>
      ) : (
        formatted?.length > 0 &&
        formatted?.map((category, idx: number) => {
          const maxSlidesPerView = 6;
          const productCount = category?.products?.data?.length || 0;

          let displayProducts: (ProductType & {
            __duplicateIndex?: number;
            __originalIndex?: number;
          })[] = [];

          if (productCount > 0) {
            const minSlidesNeeded = maxSlidesPerView * 2;

            if (productCount < minSlidesNeeded) {
              const times = Math.ceil(minSlidesNeeded / productCount);
              displayProducts = Array.from({ length: times }, (_, i) =>
                category.products?.data?.map(
                  (p, j) =>
                    ({
                      ...p,
                      __duplicateIndex: i,
                      __originalIndex: j,
                    } as ProductType & {
                      __duplicateIndex: number;
                      __originalIndex: number;
                    })
                )
              ).flat();
            } else {
              displayProducts = category?.products?.data || [];
            }
          }

          const displayProductCount = displayProducts.length;

          const enableLoop = displayProductCount > maxSlidesPerView;

          const uniqueSliderId = `${category?.categoryId}-${idx}`;
          const uniqueSliderClass = `product-slider-${uniqueSliderId}`;

          const swiperKey = `swiper-${uniqueSliderId}-${displayProductCount}-${enableLoop}`;

          if (!category?.products || category?.products?.data?.length === 0) {
            return null;
          }

          return (
            <section key={category?.categoryId} className="mb-10 md:mb-20">
              <SectionTitle
                title={category?.name}
                linkText={"View All"}
                href={`/categories/${category?.categoryId}/${slugify(
                  category?.name
                )}`}
              />
              <div
                className="w-full mx-1 md:mx-0"
                id={`slider-wrapper-${uniqueSliderId}`}>
                <Swiper
                  key={swiperKey}
                  modules={[Navigation, Autoplay]}
                  slidesPerView={2}
                  spaceBetween={1}
                  centeredSlides={false}
                  loop={enableLoop}
                  loopPreventsSliding={false}
                  loopAdditionalSlides={
                    enableLoop ? Math.max(2, maxSlidesPerView) : 0
                  }
                  autoplay={
                    enableLoop
                      ? {
                          delay: idx % 2 === 0 ? 3000 : 5000,
                          disableOnInteraction: false,
                        }
                      : false
                  }
                  speed={1000}
                  navigation={false}
                  watchOverflow={!enableLoop}
                  allowTouchMove={true}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 8 },
                    768: { slidesPerView: 3, spaceBetween: 8 },
                    1024: { slidesPerView: 4, spaceBetween: 16 },
                    1280: { slidesPerView: 5, spaceBetween: 16 },
                    1536: { slidesPerView: 6, spaceBetween: 16 },
                  }}
                  className={uniqueSliderClass}>
                  {displayProducts?.map((product, i: number) => {
                    const productId = product?.id || `dup-${i}`;
                    const duplicateIndex = (
                      product as ProductType & {
                        __duplicateIndex?: number;
                      }
                    ).__duplicateIndex;
                    const uniqueKey =
                      duplicateIndex !== undefined
                        ? `${uniqueSliderId}-${productId}-${duplicateIndex}-${i}`
                        : `${uniqueSliderId}-${productId}-${i}`;
                    return (
                      <SwiperSlide key={uniqueKey} className="mx-1">
                        <ProductCard product={product} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </section>
          );
        })
      )}
    </>
  );
};
