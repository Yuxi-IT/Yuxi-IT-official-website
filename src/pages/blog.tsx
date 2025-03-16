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
  ListboxItem
} from "@heroui/listbox";
import { Divider } from "@heroui/divider";
import { useNavigate } from 'react-router-dom';
import { Link } from "@heroui/link";

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
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

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


// 获取焦点
  const handleFocus = () => {
    setIsFocused(true);
  };

// 失去焦点
  const handleBlur = () => {
    if (!searchValue) {
      setIsFocused(false);
    }
  };
// 搜索框内容修改
    const handleSearchChange = (value: SetStateAction<string>) => {
      setSearchValue(value);
      if(value.length >= 1){

        const filtered = blogList.filter((blog) => {
          return (
            blog.id.toLowerCase().includes(value.toString()) ||
            blog.title.toLowerCase().includes(value.toString()) ||
            blog.tags.some((tag) => tag.toLowerCase().includes(value.toString())) 
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
              onChange={(event) => {handleSearchChange(event.target.value);handleFocus()}}
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
                    <a onClick={()=>{navigate("/view?id=" + blog.id)}}>
                      <p className="font-semibold">{blog.title}</p>
                      <p className="text-sm text-default-500">
                        标签: {blog.tags.join(", ")}
                      </p>
                    </a>
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
                  onClick={() => navigate("/view?id=" + blog.id)}
                >
                  查看
                </Button>
              </CardHeader>
              <CardBody className="px-3 py-0 text-default-400">
                <p>{blog.content}</p>
                <span className="pt-2">
                {blog.tags.map((tag, i) => (
                    <Link href="#" onClick={(e) => {e.preventDefault();}} key={i}>
                      #{tag}
                      &nbsp;
                    </Link>
                  ))}
                </span>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="text-default-400 text-small">发布于</p>
                  <p className="font-semibold text-default-400 text-small">
                    {blog.date}
                  </p>
                </div>
                <div className="flex justify-end gap-1">
                  <p className="font-semibold text-default-400 text-small">
                    {getTimeAgo(blog.date)}前
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}