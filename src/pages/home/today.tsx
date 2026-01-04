import type { HomePropsType } from "@/type";

import { HomeSectionTitle } from "@/components/common/section-title";
import { ProductSlider } from "@/components/common/products-slider";

export const TodaysDealSection = ({ isLoading, products }: HomePropsType) => {
  return (
    <section
      className={`container mx-auto ${
        products?.length === 0 && !isLoading && "hidden"
      }`}>
      <HomeSectionTitle title="Today's Deal" />
      <ProductSlider products={products} isLoading={isLoading} delay={4000} />
    </section>
  );
};
