import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <ul className='flex items-center justify-center gap-5 px-4 py-8'>
      <li>
        <AdminNavItem href='/admin/user' title='User' />
      </li>
      <li>
        <AdminNavItem href='/admin/classroom' title='Classroom' />
      </li>
    </ul>
  );
};

const AdminNavItem = ({ href, title }: { href: string; title: string }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive
          ? 'rounded-3xl bg-gray-900 px-3 py-2 font-semibold text-white'
          : 'rounded-3xl border px-3  py-2 hover:opacity-60'
      }
    >
      {title}
    </NavLink>
  );
};
export default AdminNav;
