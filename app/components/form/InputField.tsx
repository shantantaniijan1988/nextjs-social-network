import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
  styles?: string;
  id: string;
  type: string;
  label: string;
}

export const InputField: FC<Props> = ({ styles, id, type, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={twMerge("flex flex-col gap-y-1", styles)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        {...register(id)}
        type={type}
        id={id}
        className="px-3 py-1.5 border border-gray-400 rounded font-bold focus:outline-sky-500"
      />
      {errors[id]?.message && (
        <div>
          <p className="text-red-500 text-sm font-medium">
            {errors[id]?.message as string}
          </p>
        </div>
      )}
    </div>
  );
};
