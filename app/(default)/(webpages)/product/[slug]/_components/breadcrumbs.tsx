import { getProduct } from '~/client/queries/get-product';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

interface Props {
  productId: number;
}

export const BreadCrumbs = async ({ productId }: Props) => {
  const product = await getProduct(productId);
  const category = product?.categories?.[0];

  if (!category) {
    return null;
  }

  return (
    <nav>
      <ul className="m-0 flex flex-wrap items-center p-0 py-4 text-xs md:container md:mx-auto">
        {category.breadcrumbs.map((breadcrumb, i, arr) => {
          const isLast = arr.length - 1 === i;

          return (
            <li
              className={cn('p-1 ps-0 hover:text-blue-primary', {
                'font-light': !isLast,
                'font-normal': isLast,
              })}
              key={breadcrumb.name}
            >
              <Link href="#">{breadcrumb.name}</Link>
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
