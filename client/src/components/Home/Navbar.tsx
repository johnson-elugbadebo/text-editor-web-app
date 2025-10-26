import SearchInput from '@/components/Home/SearchInput';
import { UserButton, OrganizationSwitcher } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='flex items-center justify-between h-full w-full'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link to='/'>
          <img src='/logo_v6.svg' alt='Logo' width={36} height={36} />
        </Link>
        <h3 className='text-xl'>Docs</h3>
      </div>
      <SearchInput />
      <div className='flex gap-3 items-center pl-6'>
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
