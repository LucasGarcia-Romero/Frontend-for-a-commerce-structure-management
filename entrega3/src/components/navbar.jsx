import Link from 'next/link';

function Navbar() {
  return (
    <nav className='bg-gray-200 m-4 p-6 rounded-md shadow-md'>
      <ul className='flex gap-4'>
        <li>
          <Link href="/" passHref>
            <div className='cursor-pointer text-gray-600 hover:text-gray-800'>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/administrador" passHref>
            <div className='cursor-pointer text-gray-600 hover:text-gray-800'>Admins</div>
          </Link>
        </li>
        <li>
          <Link href="/comercios" passHref>
            <div className='cursor-pointer text-gray-600 hover:text-gray-800'>Comercios</div>
          </Link>
        </li>
        <li>
          <Link href="/usuarios_no_registrados" passHref>
            <div className='cursor-pointer text-gray-600 hover:text-gray-800'>Usuario Anonimo</div>
          </Link>
        </li>
        <li>
          <Link href="/usuarios_registrados" passHref>
            <div className='cursor-pointer text-gray-600 hover:text-gray-800'>Usuario Registrado</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
