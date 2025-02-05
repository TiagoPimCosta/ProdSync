import { useState } from "react";
import { X } from "lucide-react";
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/src/lib/utils";
import { Button } from "../button";

interface SelectProps {
  className?: string;
  placeholder?: string;
  data?: {
    label: string;
    value: string;
  }[];
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
  clearable?: boolean;
}

export default function Select({
  className,
  placeholder,
  data = [],
  value,
  onChange,
  clearable,
}: SelectProps) {
  const [selected, setSelected] = useState(value);
  const [key, setKey] = useState(0); // Unique key to force re-render

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelected(undefined);
    onChange?.(undefined);
  };

  return (
    <div className={cn("relative", className)}>
      <ShadSelect key={key} value={selected ? selected : undefined} onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
          {clearable && selected && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-8 z-50"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center justify-between w-full">{item.label}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>
    </div>
  );
}
