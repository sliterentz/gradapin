import { TextField } from '@radix-ui/themes';
import { ZoomInIcon } from 'lucide-react';

const SearchBar = () => {
    const tabIndex = true ? undefined : -1;
    
    return (
    <div className="flex-grow flex items-center justify-center">
        <TextField.Root
          color="gray"
          radius="full"
          variant="soft"
          style={{ width: '100%', maxWidth: '400px' }}
          tabIndex={tabIndex}
          placeholder="Search"
        >
          <TextField.Slot>
            <ZoomInIcon />
          </TextField.Slot>
        </TextField.Root>
  
    </div>
    );
};

export default SearchBar;
