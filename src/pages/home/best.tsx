import type { HomePropsType } from "@/type";
import { useConfig } from "@/hooks/useConfig";
import { getConfig } from "@/helper";
import { HomeSectionTitle } from "@/components/common/section-title";
import { ProductSlider } from "@/components/common/products-slider";

export const BestSellerSection = ({ isLoading, products }: HomePropsType) => {
  const config = useConfig();

  const isShow = getConfig(config, "best_selling")?.value as string;

  return isShow ? (
    <section
      className={`container mx-auto  ${
        products?.length === 0 && !isLoading && "hidden"
      }`}>
      <HomeSectionTitle title="Best Sellers" />
      <ProductSlider products={products} isLoading={isLoading} />
    </section>
  ) : null;
};
