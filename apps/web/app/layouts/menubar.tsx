'use client';

import { CheckIcon, ChevronDown } from "lucide-react";
import { Flex, Grid, Separator } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { Menubar as RadixMenubar, MenubarContent, MenubarCheckboxItem, MenubarItemIndicator, MenubarMenu, MenubarPortal, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@radix-ui/react-menubar";
import { useDataSource } from '../contexts/DataSourceContext';
import { usePathname } from 'next/navigation';
import Languages from '../languages';
import ThemeSwitcher from './themes';
import Link from "next/link";

const Menubar = () => {
  const t = useTranslations('HomePage');
  const pathname = usePathname();
  const isPopulationPage = pathname === '/';
  const menuItems = isPopulationPage 
  ? ["World Bank API Data", "BPS API Data"] as const
  : ["World Bank API Data"] as const;
  const { dataSource, setDataSource } = useDataSource();
    
    return (
      <Flex gap="3" direction="column">
      <Grid columns={{ initial: '1', sm: '2' }} gap="1">
        <Flex align="center" justify={{ initial: 'start', sm: 'end' }}>
        <RadixMenubar className="flex rounded-full bg-accent p-[3px] shadow-[0_2px_10px] shadow-blackA4">
        {dataSource !== 'BPS API Data' && (
            <MenubarMenu>
              <MenubarTrigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[13px] font-medium leading-none text-sm ring-offset-background outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                DataType{" "}
                <ChevronDown
                  className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                  aria-hidden
                />
              </MenubarTrigger>
              <MenubarContent className="min-w-[220px] rounded-md bg-accent p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]">
                <Link href="/" passHref>
                  <MenubarCheckboxItem className="relative flex h-[25px] select-none items-center rounded px-2.5 pl-5 text-[13px] leading-none text-sm ring-offset-background">
                    {t('population')}
                  </MenubarCheckboxItem>
                </Link>
                <Link href="/pages/gdpgrowth" passHref>
                  <MenubarCheckboxItem className="relative flex h-[25px] select-none items-center rounded px-2.5 pl-5 text-[13px] leading-none text-sm ring-offset-background">
                    {t('gdpGrowth')}
                  </MenubarCheckboxItem>
                </Link>
                <Link href="/pages/gdppercapita" passHref>
                  <MenubarCheckboxItem className="relative flex h-[25px] select-none items-center rounded px-2.5 pl-5 text-[13px] leading-none text-sm ring-offset-background">
                    {t('perCapitaIncome')}
                  </MenubarCheckboxItem>
                </Link>
                <Link href="/pages/gdp" passHref>
                  <MenubarCheckboxItem className="relative flex h-[25px] select-none items-center rounded px-2.5 pl-5 text-[13px] leading-none text-sm ring-offset-background">
                    {t('gdp')}
                  </MenubarCheckboxItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
        )}
        <div className="flex-grow flex items-center justify-center">
        <MenubarMenu>
          <MenubarTrigger className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[13px] font-medium leading-none text-sm ring-offset-background">
            Data Source
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent className="min-w-[220px] rounded-md bg-accent p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                        align="start"
                        sideOffset={5}
                        alignOffset={-3}>
              {menuItems.map((item, index) => (
                <MenubarCheckboxItem 
                key={index} 
                className="relative flex h-[25px] select-none items-center rounded px-2.5 pl-5 text-[13px] leading-none text-sm ring-offset-background"
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
        </div>
        <div className="flex items-center">
          <Languages lang={'en'} />
          <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
          <ThemeSwitcher />
        </div>
        </RadixMenubar>
        </Flex>
      </Grid>
      </Flex>
    );
};

export default Menubar;