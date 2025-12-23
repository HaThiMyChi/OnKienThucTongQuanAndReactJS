import { NavLink } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='grid min-h-screen grid-cols-4'>
      <aside className='col-span-1' aria-label='Sidebar'>
        <div className='flex h-full flex-col overflow-y-auto bg-gray-100 px-4 py-4 shadow-lg'>
          <ul className='space-y-2'>
            <li>
              <NavLink to='/' end className='bg-gray-300'>
                <span className='ml-3 font-bold'>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/students' className='bg-gray-300'>
                <span className='ml-3 font-bold'>Students</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/about' className='bg-gray-300'>
                <span className='ml-3 font-bold'>About</span>
              </NavLink>
            </li>
          </ul>

          <div className='mt-auto'>
            ©️ Copyright{' '}
            <a href='https://duthanhduoc.com' target='_blank' rel='noreferrer' className='text-cyan-500'>
              duthanhduoc.com
            </a>
          </div>
        </div>
      </aside>
      <main className='col-span-3 h-full px-3 py-4'>{children}</main>
    </div>
  )
}
