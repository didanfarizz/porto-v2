// import Image from 'next/image';
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">didanfarizz</span>
          </a>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3 text-white hover:text-primary underline-hover">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white hover:text-primary underline-hover">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white hover:text-primary underline-hover">
                  Project
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white hover:text-primary underline-hover">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
