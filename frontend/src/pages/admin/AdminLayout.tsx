import AdminNav from '@/components/admin/AdminNav';

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className='px-4'>
      <AdminNav />
      {children}
    </div>
  );
};
export default AdminLayout;
