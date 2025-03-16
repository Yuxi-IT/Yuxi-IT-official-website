import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {Image} from "@heroui/image";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  HeartFilledIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";

export const Navbar = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Yuxi IT</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color={
                  index === 0 ? "primary" : "foreground"
                }
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            //href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
            onPress={onOpen}
          >
            赞助
      </Button>
      </NavbarContent>
      <Modal
        backdrop="opaque"
        classNames={{
          body: "py-6",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">嗨，感谢你的赞助.</ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <Image
                  isBlurred
                  alt="pay code"
                  src="/images/sk.png"
                  width={240}
                />
                <p className="text-center">
                  你可以扫描上方的赞赏码来进行赞助, 非常感谢你的支持, 
                  请在赞助时留下你的联系方式, 以方便我们后期找到你并提供更好的服务
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#000] shadow-lg shadow-indigo-500/20" style={{color: "#fff"}} onPress={onClose}>
                  好的
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 0 ? "primary" : "foreground"
                }
                href = {item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
            
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
