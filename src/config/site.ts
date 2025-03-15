export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "西安余兮信息技术有限公司",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "主页",
      href: "/",
    },
    {
      label: "产品",
      href: "/product",
    },
    {
      label: "定价",
      href: "/pricing",
    },
    {
      label: "博客",
      href: "/blog",
    },
    {
      label: "关于我们",
      href: "/about",
    },    {
      label: "联系我们",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    product: "/product",
    sponsor: "/sponsor",
  },
};
