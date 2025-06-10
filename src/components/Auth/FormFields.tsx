"use client";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";

type InputFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type: "email" | "password" | "text" | "file";
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
};

export const InputField = ({
  control,
  name,
  label,
  placeholder,
  type,
  icon = <Mail className="h-5 w-5 text-muted-foreground" />,
  showPasswordToggle = false,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-2.5 h-5 w-5">{icon}</div>
              )}
              <Input
                type={showPasswordToggle && showPassword ? "text" : type}
                placeholder={placeholder}
                className={icon ? "pl-10" : ""}
                {...field}
              />
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type CheckboxFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
};

export const CheckboxField = ({ control, name, label }: CheckboxFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="!mt-0 cursor-pointer">{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};
