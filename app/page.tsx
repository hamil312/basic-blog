"use client"
import { Link } from "@nextui-org/link";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import React from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import {users} from "./data";
import { posts } from "./post";


import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  
  const [values, setValues] = React.useState(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{users.find((user) => `${user.id}` === `${value}`).name}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);
  return (
    <section className="grid grid-cols-[20%_80%] justify-center gap-4 py-8 md:py-10">
      <section>
        <ListboxWrapper>
          <Listbox
            topContent={topContent}
            classNames={{
              base: "max-w-xs",
              list: "max-h-[500px] overflow-scroll",
            }}
            defaultSelectedKeys={["1"]}
            items={users}
            label="Assigned to"
            selectionMode="multiple"
            onSelectionChange={setValues}
            variant="flat"
          >
            {(item) => (
              <ListboxItem key={item.id} textValue={item.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                  <div className="flex flex-col">
                    <span className="text-small">{item.name}</span>
                    <span className="text-tiny text-default-400">{item.email}</span>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      </section>
      <section className="content-center items_center justify-center">
      {posts.map((post) => (
          <Card key={post.id} className="max-w-[400px] m-5">
            <CardHeader className="flex gap-3">
              <Image alt={post.author.name} height={40} radius="sm" src={post.author.avatar} width={40} />
              <div className="flex flex-col">
                <p className="text-md">{post.author.name}</p>
                <p className="text-small text-default-500">{post.author.username}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.content}</p>
            </CardBody>
            <Divider />
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </section>
    </section>
  );
}
