"use client";

import { ButtonHTMLAttributes, type FC } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: string;
  title: string;
  className?: string;
  isPending?: boolean;
}

export const ButtonSubmit: FC<Props> = ({
  styles,
  title,
  className,
  isPending = false,
  ...buttonProps
}) => {
  return (
    <div className={styles}>
      <button
        type="submit"
        className={twMerge(
          clsx(
            "w-full py-2 rounded bg-sky-500 text-white text-sm font-medium",
            {}
          ),
          className
        )}
        {...buttonProps}
      >
        {title}
      </button>
    </div>
  );
};
