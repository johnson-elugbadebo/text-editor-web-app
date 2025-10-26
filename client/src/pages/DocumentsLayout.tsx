import { Outlet } from 'react-router-dom';
// import { type DocumentsLayoutProps } from '../utils';

function DocumentsLayout() {
  return (
    <div className='flex flex-col gap-y-4'>
      {/* <nav className='w-full bg-red-500'>Document Navbar</nav> */}
      <Outlet />
    </div>
  );
}

export default DocumentsLayout;
