import { ChevronDown, LogOut, ShoppingBag, UserRound } from 'lucide-react';
import React, { ReactNode, Suspense } from 'react';
import { CircleFlag } from 'react-circle-flags';

import { Button } from '@bigcommerce/components/button';
import {
  NavigationMenu,
  NavigationMenuCollapsed,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuToggle,
  NavigationMenuTrigger,
} from '@bigcommerce/components/navigation-menu';
import { getSessionCustomerId } from '~/auth';
import { getCategoryTree } from '~/client/queries/get-category-tree';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

import { QuickSearch } from '../quick-search';
import { StoreLogo } from '../store-logo';

import { logout } from './_actions/logout';
import { CartLink } from './cart';
import PromoBanner from './promo-banner';

const HeaderNav = async ({
  className,
  inCollapsedNav = false,
}: {
  className?: string;
  inCollapsedNav?: boolean;
}) => {
  // To prevent the navigation menu from overflowing, we limit the number of categories to 6.
  // To show a full list of categories, modify the `slice` method to remove the limit.
  // Will require modification of navigation menu styles to accommodate the additional categories.
  const categoryTree = (await getCategoryTree()).slice(0, 6);

  return (
    <div className="w-full bg-gray-100">
      <NavigationMenuList
        className={cn(
          'justify-center font-light 2xl:container sm:px-10 lg:gap-8 lg:px-12 2xl:mx-auto 2xl:px-0',
          !inCollapsedNav && 'lg:gap-4',
          inCollapsedNav && 'flex-col items-start pb-6',
          className,
        )}
      >
        {categoryTree.map((category) => (
          <NavigationMenuItem className={cn(inCollapsedNav && 'w-full')} key={category.path}>
            {category.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className="gap-0 p-0">
                  <NavigationMenuLink asChild>
                    <Link className="grow text-sm uppercase 2xl:text-xl" href={category.path}>
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={cn(
                    !inCollapsedNav && 'mx-auto flex w-[700px] flex-row gap-20',
                    inCollapsedNav && 'ps-3',
                  )}
                >
                  {category.children.map((childCategory1) => (
                    <ul className={cn(inCollapsedNav && 'pb-4')} key={childCategory1.entityId}>
                      <NavigationMenuItem>
                        <NavigationMenuLink href={childCategory1.path}>
                          {childCategory1.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      {childCategory1.children.map((childCategory2) => (
                        <NavigationMenuItem key={childCategory2.entityId}>
                          <NavigationMenuLink href={childCategory2.path}>
                            {childCategory2.name}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link className="text-sm uppercase 2xl:text-xl" href={category.path}>
                  {category.name}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link className="flex p-5 text-sm font-light uppercase 2xl:text-xl" href="/blog-filter">
            Amplience Blog
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      {inCollapsedNav && (
        <NavigationMenuList className="flex-col items-start border-t border-gray-200 pt-6 lg:hidden">
          <NavigationMenuItem className="w-full">
            <NavigationMenuLink href="/login">
              Your Account <UserRound />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      )}
    </div>
  );
};

function LocaleSelector() {
  return (
    <div className="hidden items-center space-x-4 pl-2 text-xs lg:flex 2xl:text-sm">
      <a href="/shipping-returns/">Store &amp; Treatments</a>
      <span>|</span>
      <div className="flex cursor-pointer items-center">
        <CircleFlag className="h-5 pr-2" countryCode="gb" />
        <p>UK | EN</p>
        <ChevronDown aria-hidden="true" className="stroke-1" />
      </div>
    </div>
  );
}

export const Header = async ({ cart }: { cart: ReactNode }) => {
  const customerId = await getSessionCustomerId();

  return (
    <header>
      <PromoBanner />
      <NavigationMenu className="border-b">
        <div className="w-full">
          <div className="grid grid-cols-3 items-center justify-between py-2 font-light 2xl:container sm:px-10 lg:gap-8 lg:px-12 2xl:mx-auto 2xl:px-0 2xl:py-10">
            <LocaleSelector />
            <NavigationMenuToggle className="ms-2 lg:hidden" />
            <NavigationMenuLink asChild className="shrink-0 justify-center p-0">
              <Link href="/">
                <StoreLogo />
              </Link>
            </NavigationMenuLink>
            <div className="flex justify-end">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <QuickSearch>
                    <Link className="flex" href="/">
                      <StoreLogo />
                    </Link>
                  </QuickSearch>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden lg:flex">
                  {customerId ? (
                    <form action={logout}>
                      <Button
                        className="p-3 text-black hover:bg-transparent"
                        type="submit"
                        variant="subtle"
                      >
                        <LogOut />
                      </Button>
                    </form>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link aria-label="Login" href="/login">
                        <UserRound />
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <p role="status">
                    <Suspense
                      fallback={
                        <CartLink>
                          <ShoppingBag aria-label="cart" />
                        </CartLink>
                      }
                    >
                      {cart}
                    </Suspense>
                  </p>
                </NavigationMenuItem>
              </NavigationMenuList>
            </div>
          </div>

          <HeaderNav className="hidden lg:flex" />
        </div>
        <NavigationMenuCollapsed>
          <HeaderNav inCollapsedNav />
        </NavigationMenuCollapsed>
      </NavigationMenu>
    </header>
  );
};
