import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import Typewriter from 'typewriter-effect';
import { useNavigate } from "react-router-dom";



export default function IndexPage() {
  const navigate = useNavigate();
  
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span style={{"fontSize":"30px"}}>嗨，与我们共同构建&nbsp;</span>
         
          <span className={"floating-text"} style={{"fontSize":"34px","fontWeight":"bold"}}>
          <Typewriter
              options={{
                strings: ['更现代', '更快速',"更美观"],
                autoStart: true,
                loop: true,
              }}
            />
            &nbsp;</span>
          
          <span style={{"fontSize":"30px"}}>的应用程序&nbsp;</span>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            onClick={()=>{navigate(siteConfig.links.product)}}
          >
            产品
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideSymbol variant="bordered">
            <Code style={{"fontSize":"24px","fontWeight":"bold"}}>
                <Typewriter
              options={{
                strings: [
                  'Console.WriteLine("Hello World");',
                  'console.log("Hello World");',
                  'cout << "Hello World << endl;";',
                  'print("Hello World");',
                  'System.out.println("Hello World");',
                  'echo("Hello World");'
                ],
                autoStart: true,
                loop: true,
                delay: 20,
              }}
            />
            </Code>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
