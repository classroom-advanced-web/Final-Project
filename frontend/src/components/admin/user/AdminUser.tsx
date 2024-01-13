import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { User } from '@/type';
import useAdminUser from '@/hooks/useAdminUser';
import Loading from '@/components/loading/Loading';
import adminApi from '@/api/adminApi';
import { useQueryClient } from 'react-query';

const data: User[] = [
  {
    id: '1',
    email: 'tranminhtoan1280@gmail.com',
    dob: new Date(),
    firstName: 'Toan',
    lastName: 'Tran',
    activated: false,
    gender: 'MALE',
    banned: true
  },
  {
    id: '2',
    email: 'tranminhtoan1280@gmail.com',
    dob: new Date(),
    firstName: 'Toan2',
    lastName: 'Tran',
    activated: false,
    gender: 'MALE',
    banned: false
  },
  {
    id: '3',
    email: 'tranminhtoan1280@gmail.com',
    dob: new Date(),
    firstName: 'Toan3',
    lastName: 'Tran',
    activated: true,
    gender: 'MALE',
    banned: true
  }
];

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Id
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          First Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('firstName')}</div>
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Last Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('lastName')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ row }) => {
      const dob = row.getValue('dob') as Date;
      if (!dob) return null;
      const formatDob = new Date(dob).toLocaleDateString('en-GB');

      return <div className='capitalize'>{formatDob}</div>;
    }
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('gender')}</div>
  },
  {
    accessorKey: 'activated',
    header: 'Activated',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('activated') ? `Activated 🟢` : `Not activated 🔴`}</div>
    )
  },
  {
    accessorKey: 'is_revoked',
    header: '',
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const handleChangeBan = async (id: string, status: boolean) => {
        try {
          const res = await adminApi.banUser(id, status);

          if (res) {
            queryClient.invalidateQueries('users');
          }
        } catch (error) {
          console.error(error);
        }
      };
      return (
        <div>
          {row.getValue('is_revoked') ? (
            <Button
              variant='outline'
              className='min-w-[120px]'
              onClick={() => handleChangeBan(row.getValue('id'), false)}
            >
              Unbanned
            </Button>
          ) : (
            <Button
              variant='destructive'
              className='min-w-[120px]'
              onClick={() => handleChangeBan(row.getValue('id'), true)}
            >
              Ban Account
            </Button>
          )}
        </div>
      );
    }
  }
];

const AdminUser = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { users, isLoading } = useAdminUser();

  const table = useReactTable({
    data: users ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!users) {
    return null;
  }

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
