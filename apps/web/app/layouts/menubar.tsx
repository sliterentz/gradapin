'use client';

import { CheckIcon } from "lucide-react";
import { Menubar as RadixMenubar, MenubarContent, MenubarCheckboxItem, MenubarItemIndicator, MenubarMenu, MenubarPortal, MenubarTrigger } from "@radix-ui/react-menubar";
import { useDataSource } from '../contexts/DataSourceContext';

const Menubar = () => {
    const menuItems = ["World Bank API Data", "BPS API Data"] as const;
    const { dataSource, setDataSource } = useDataSource();
    
    return (
        <div className="flex-grow flex items-center justify-center">
        <RadixMenubar className="flex rounded-full bg-white p-[3px] shadow-[0_2px_10px] shadow-blackA4">
        <MenubarMenu>
          <MenubarTrigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[13px] font-medium leading-none text-black">
            Data Source
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
						align="start"
						sideOffset={5}
						alignOffset={-3}>
              {menuItems.map((item, index) => (
                <MenubarCheckboxItem 
                key={index} 
                className="relative flex h-[25px] select-none items-center rounded px-2.5 pl-5 text-[13px] leading-none text-black"
                checked={dataSource === item}
                onCheckedChange={(checked) => {
                    if (checked) {
                        setDataSource(item);
                    }
                }}                                
                >
                <MenubarItemIndicator className="absolute left-0 inline-flex w-5 items-center justify-center">
                    <CheckIcon />
                </MenubarItemIndicator>
                  {item}
                </MenubarCheckboxItem>
              ))}
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
        </RadixMenubar>
        </div>
    );
};

export default Menubar;



