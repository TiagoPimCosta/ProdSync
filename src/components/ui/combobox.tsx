"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

type SelectOption = {
  label: string;
  value: string;
};

export type ComboboxProps = {
  className?: string;
  placeholder?: string;
  searchable?: boolean;
  onChange?: (value: string) => void;
  data?: SelectOption[];
  noDataFoundMessage?: string;
  value?: string | undefined;
};

export function Combobox(props: ComboboxProps) {
  const {
    className,
    placeholder = "",
    searchable,
    onChange,
    data = [],
    noDataFoundMessage,
    value,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);

  const handleOnChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className, !selected && "text-muted-foreground")}
        >
          {selected ? data.find((option) => option.value === selected)?.label : placeholder}
          <ChevronsUpDown className="left-0 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popper-anchor-width] min-w-fit">
        <Command>
          {searchable && <CommandInput placeholder={placeholder} />}
          <CommandList>
            <CommandEmpty>
              {noDataFoundMessage ? noDataFoundMessage : "No options found"}
            </CommandEmpty>
            <CommandGroup>
              {data.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    handleOnChange(currentValue === selected ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
