import { useState, useEffect, SetStateAction } from "react";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { SearchIcon } from "@/components/icons";
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@heroui/listbox";
import { Divider } from "@heroui/divider";

// 定义 BlogCard 类
class BlogCard {
  public id: string = "";
  public title: string = "";
  public content: string = "";
  public author: string = "";
  public tags: string[] = [];
  public date: string = "";
}

// 计算发布时间距离现在的时间差
function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分钟`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小时`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}天`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)}个月`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)}年`;
  }
}
export const ListboxWrapper = ({children}: {children: React.ReactNode}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function DocsPage() {
  const [blogList, setBlogList] = useState<BlogCard[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogCard[]>([]);
  const [searchValue, setSearchValue] = useState(""); 


  // 获取数据
  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => {
        setBlogList(data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, []);

  // 监听CTRL(Command) + K
  useEffect(() => {
    const handleKeyDown = (event: { ctrlKey: any; metaKey: any; key: string; preventDefault: () => void; }) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        const searchInput = document.getElementById("search");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  const handleFocus = (event: { target: { offsetWidth: any; }; }) => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

    // 处理搜索框输入
    const handleSearchChange = (value: SetStateAction<string>) => {
      if(value.length >= 1){
        setSearchValue(value);

        const filtered = blogList.filter((blog) => {
          return (
            blog.id.toLowerCase().includes(value.toString()) || // 匹配 ID
            blog.title.toLowerCase().includes(value.toString()) || // 匹配标题
            blog.tags.some((tag) => tag.toLowerCase().includes(value.toString())) // 匹配标签
          );
        });
    
        setFilteredBlogs(filtered);
      }
    };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <div style={{ position: "relative" }}>
            <Input
            id="search"
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                  K
                </Kbd>
              }
              labelPlacement="outside"
              placeholder="搜索文章标题、ID、标签..."
              variant="bordered"
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(event) => handleSearchChange(event.target.value)}
              type="search"
            />

            {isFocused && (
          <Listbox
              style={{
                border: "1px solid rgba(100,100,100,0.5)",
                marginTop: "8px",
                borderRadius: "15px",
              }}
              className="w-full"
              aria-label="Listbox menu with icons"
              variant="faded"
            >
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <ListboxItem key={blog.id}>
                    <div>
                      <p className="font-semibold">{blog.title}</p>
                      <p className="text-sm text-default-500">
                        标签: {blog.tags.join(", ")}
                      </p>
                    </div>
                  </ListboxItem>
                ))
              ) : (
                <ListboxItem key="no-results">无匹配结果</ListboxItem>
              )}
            </Listbox>
            )}
          </div>

          <br/><Divider /><br/>

          {blogList.map((blog, index) => (
            <Card key={index} style={{transform: "scale(1)"}} 
              className="w-[300px] md:w-[120vh] h-[225px] md:h-[250px] w-full w-auto max-w-full mb-4">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src="logo.jpg" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h3 className="font-semibold leading-none text-default-600">
                      {blog.title}
                    </h3>
                    <h4 className="tracking-tight text-default-400">
                      @{blog.author}
                    </h4>
                  </div>
                </div>
                <Button
                  style={{fontSize:15}}
                  color="primary"
                  radius="full"
                  size="sm"
                  onClick={()=>{
                    document.location = ("/view?id=" + blog.id)
                  }}
                >
                  查看
                </Button>
              </CardHeader>
              <CardBody className="px-3 py-0 text-default-400">
                <p>{blog.content}</p>
                <span className="pt-2">
                  {blog.tags.map((tag, i) => (
                    <span key={i}>
                      #{tag}
                      {i < blog.tags.length - 1 && " "}
                    </span>
                  ))}
                  <span aria-label="computer" className="py-2" role="img">
                    
                  </span>
                </span>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="text-default-400 text-small">发布于</p>
                  <p className="font-semibold text-default-400 text-small">
                    {blog.date}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">
                    {getTimeAgo(blog.date)}
                  </p>
                  <p className="text-default-400 font-semibold text-small">前</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}