import React from 'react'

const footer = () => {
  return (
    <div>
        <footer className="w-full bg-primary border-primary sm:text-sm md:text-lg text-center flex justify-center items-center py-4">
            &copy; {new Date().getFullYear()} didanfarizz. All rights reserved.
        </footer>
    </div>
  )
}

export default footer