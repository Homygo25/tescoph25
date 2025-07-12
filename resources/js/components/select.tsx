import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectInputProps {
  placeholder: string;
  items: { text: string; value: string | number }[];
  className: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled: boolean | undefined;
}

export function SelectInput({
  placeholder,
  items,
  className,
  value,
  onChange,
  disabled
}: SelectInputProps) {
  return (
    <Select disabled={disabled} value={String(value)} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
