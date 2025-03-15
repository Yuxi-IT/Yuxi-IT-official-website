import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="#"
          title="主页"
          style={{"fontSize": "14px"}}
        >
          <span className="text-default-600">Copyright © 2025</span>
          <p className="text-primary">{siteConfig.name}</p>
        </Link>
      </footer>
    </div>
  );
}
