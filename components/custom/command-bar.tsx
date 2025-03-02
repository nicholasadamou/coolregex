"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { RegexInfo } from "@/lib/regex_info";
import { useEffect, useState } from "react";

type CommandBarProps = {
  search: string;
  setSearch: (search: string) => void;
  filteredRegexInfo: RegexInfo[];
};

export const CommandBar: React.FC<CommandBarProps> = ({
  search,
  setSearch,
  filteredRegexInfo,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if ((e.key === "x" || e.key === "X") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        search !== "" ? setSearch("") : setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [search, setSearch]);

  return (
    <>
      <div
        onClick={() => {
          search !== "" ? setSearch("") : setOpen(true);
        }}
        className="w-full flex justify-center mb-8 cursor-pointer"
      >
        <div className="border rounded-sm px-4 py-2 flex justify-between w-[40rem] text-sm text-muted-foreground">
          <p>{search == "" ? "Search regex" : search}</p>
          <p>
            {search == "" ? (
              <>
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </>
            ) : (
              <>
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>X
                </kbd>
              </>
            )}
          </p>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Regex">
            {filteredRegexInfo.map((info) => {
              const RegexIcon = info.icon;

              return (
                <CommandItem
                  onSelect={(currentValue) => {
                    console.log(currentValue);
                    setSearch(currentValue);
                    setOpen(false);
                  }}
                  onSubmit={() => console.log(info.regex)}
                  key={info.regex}
                  className="flex gap-3"
                >
                  <RegexIcon className="mr-2 h-4 w-4" />
                  <p className="text-bold whitespace-nowrap">{info.title}</p>
                </CommandItem>
              );
            })}
          </CommandGroup>
          {/* <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
};
