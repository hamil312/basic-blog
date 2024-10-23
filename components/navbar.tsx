"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  SearchIcon,
} from "@/components/icons";

export const Navbar = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    alert("Iniciando sesión con:" + { emailOrUsername, password });
    e.preventDefault();
  };

  const handleCancel = () => {
    setEmailOrUsername("");
    setPassword("");
  };
  const searchInput = (
    <Input
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
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/" aria-current="page">
              Publications
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <>
              <Button onPress={onOpen}>Log In</Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Iniciar Sesión</ModalHeader>
                      <ModalBody>
                        <form onSubmit={handleSubmit}>
                          <Input clearable fullWidth underlined labelPlaceholder="Usuario o Correo" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)}/>
                          <Input clearable fullWidth underlined labelPlaceholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4"/>
                        </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button type="submit" color="success" onPress={onClose}>
                            Aceptar
                        </Button>
                        <Button color="danger" variant="light" onClick={handleCancel} onPress={onClose}>
                          Cancelar
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          <NavbarMenu>
            {searchInput}
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    href="#"
                    size="lg"
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </NavbarContent>
      </NextUINavbar>
  );
};
