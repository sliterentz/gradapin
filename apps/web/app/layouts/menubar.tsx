'use client';

import { CheckIcon } from "lucide-react";
import { Flex, Grid, TabNav, Separator } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { Menubar as RadixMenubar, MenubarContent, MenubarCheckboxItem, MenubarItemIndicator, MenubarMenu, MenubarPortal, MenubarTrigger } from "@radix-ui/react-menubar";
import { useDataSource } from '../contexts/DataSourceContext';
import { usePathname } from 'next/navigation';

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
        {dataSource !== 'BPS API Data' && (
        <Flex align="center" justify={{ initial: 'start', sm: 'end' }}>
          <TabNav.Root className="flex flex-wrap items-center gap-2">
            <TabNav.Link href="/" className="whitespace-nowrap">{t('population')}</TabNav.Link>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <TabNav.Link href="/pages/gdpgrowth" className="whitespace-nowrap">{t('gdpGrowth')}</TabNav.Link>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <TabNav.Link href="/pages/gdppercapita" className="whitespace-nowrap">
            <span className="sm:hidden">{t('perCapitaIncome')}</span>
            <span className="hidden sm:inline">{t('perCapitaIncome')}</span>
            </TabNav.Link>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <TabNav.Link href="/pages/gdp" className="whitespace-nowrap">{t('gdp')}</TabNav.Link>
          </TabNav.Root>
        </Flex>
        )}
        <Flex align="center" justify={{ initial: 'start', sm: 'end' }}>
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
        </Flex>
      </Grid>
      </Flex>
    );
};

export default Menubar;



