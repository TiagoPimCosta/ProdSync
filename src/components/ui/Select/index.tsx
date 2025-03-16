import { useState } from "react";
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/src/lib/utils";

interface SelectProps {
  className?: string;
  placeholder?: string;
  data?: {
    label: string;
    value: string;
  }[];
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
}

export default function Select({
  className,
  placeholder,
  data = [],
  value,
  onChange,
}: SelectProps) {
  const [selected, setSelected] = useState(value);
  const [key, setKey] = useState(0); // Unique key to force re-render

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div className={cn("relative", className)}>
      <ShadSelect key={key} value={selected ? selected : undefined} onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
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
