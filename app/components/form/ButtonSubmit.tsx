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
            "w-full py-2 rounded bg-sky-500 text-white text-sm font-medium flex items-center justify-center gap-x-1",
            { "opacity-50": isPending }
          ),
          className
        )}
        {...buttonProps}
      >
        {isPending && (
          <span
            className="
          w-4 h-4 border-4 border-sky-700 rounded-full grid place-items-center relative
          after:absolute after:w-4 after:h-4 after:border-transparent after:border-4 after:border-t-white after:border-r-white after:rounded-full after:animate-spin
          "
          ></span>
        )}
        <span>{title}</span>
      </button>
    </div>
  );
};
