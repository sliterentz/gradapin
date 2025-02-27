import Link from 'next/link';
import { IconButton } from '@radix-ui/themes';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-6 flex w-full items-center justify-between px-4 py-2 backdrop-blur-sm dark:bg-[#111111]/60 md:px-6">
      © 2025, Gradapin.
      <Link
            href="https://github.com/sliterentz/gradapin"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton radius="full" size="3" variant="ghost">
              <Github width="24" height="24" />
            </IconButton>
      </Link>      
    </footer>
  );
};

export default Footer;
