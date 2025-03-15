import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";



export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 style={{"fontSize": "2.2rem"}}>关于 
            <br/>
            <span style={{"fontWeight":"bold"}}>{siteConfig.name}</span>
          </h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
