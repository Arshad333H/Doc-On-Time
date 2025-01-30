"use client";

import { cn } from "@/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "./button";

interface AppProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export default function ButtonGroup({ className, children }: AppProps) {
  const totalButton = Children.count(children);
  return (
    <div className={cn("flex w-full", className)}>
      {Children.map(children, (child, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === totalButton - 1;
        return cloneElement(child, {
          className: cn(
            {
              "rounded-l-none": !isFirstItem,
              "rounded-r-none": isLastItem,
              "border-l-0": !isFirstItem,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}
