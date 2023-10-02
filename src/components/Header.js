import React from 'react'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/')
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message)
        navigate('/error')
      })
  }
  return (
    <div className='absolute flex  justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
      <img
        className='w-44'
        src='https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png'
        alt='Netflix Logo'
      />
      {user && (
        <div className='flex p-2 items-center'>
          <img src={user.photoURL} alt='userIcon' className='w-12 h-12' />
          <button
            onClick={handleSignOut}
            className='bg-red-500 text-white font-bold m-2 p-2 rounded-lg'
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
