declare module "@/components/ui/select" {
  import React from "react";
  export interface SelectProps {
    children?: React.ReactNode;
    value?: any;
    onValueChange?: (v: any) => void;
    className?: string;
  }
  export const Select: React.FC<SelectProps>;
  export const SelectItem: React.FC<{
    children?: React.ReactNode;
    value?: any;
    className?: string;
  }>;
  export const SelectContent: React.FC<{
    children?: React.ReactNode;
    className?: string;
  }>;
  export const SelectTrigger: React.FC<{
    children?: React.ReactNode;
    className?: string;
  }>;
  export const SelectValue: React.FC<{
    children?: React.ReactNode;
    className?: string;
  }>;
  export default Select;
}

declare module "date-fns" {
  export function format(date: Date | number | string, fmt: string): string;
}

declare module "@/lib/supabase" {
  export type Note = any;
  export const supabase: any;
  export default supabase;
}

declare module "@/components/ui/button" {
  import React from "react";
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "destructive";
    _size?: any;
    size?: any;
  }
  export const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module "@/components/ui/badge" {
  import React from "react";
  export interface BadgeProps {
    children?: React.ReactNode;
    className?: string;
    _variant?: any;
  }
  export const Badge: React.FC<BadgeProps>;
  export default Badge;
}

declare module "@/components/ui/input" {
  import React from "react";
  const Input: React.FC<any>;
  export { Input };
  export default Input;
}

declare module "@/components/ui/textarea" {
  import React from "react";
  const Textarea: React.FC<any>;
  export { Textarea };
  export default Textarea;
}

declare module "@/components/ui/card" {
  import React from "react";
  export const Card: React.FC<{
    children?: React.ReactNode;
    className?: string;
  }>;
  export default Card;
}
