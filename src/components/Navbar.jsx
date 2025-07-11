import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-red-200 flex items-center justify-between px-4'>
            <div className="flex items-center gap-0.5 ">
                <img src="/src/assets/icon only.png" alt="" className='h-20' />
                <img src="/src/assets/name only.png" alt="" className='h-16' />
            </div>
            <div className=''>
                <a href="https://github.com/youwe0/visualgorithm"><img src="/src/assets/github-line.svg" alt="" className='h-10' /></a>
            </div>
        </div>
    )
}

export default Navbar