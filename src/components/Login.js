import { useRef, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { checkValidData } from '../utils/validate'
import Header from './Header'
import { auth } from '../utils/firebase'
import { createBrowserRouter, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)

    if (message) return

    //sign in sign up logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user
          console.log(user)
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: 'https://avatars.githubusercontent.com/u/37847566?v=4',
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser
              dispatch(addUser({ uid, email, displayName, photoURL }))

              navigate('/browse')
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message)
            })
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + '-' + errorMessage)
          // ..
        })
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
          navigate('/browse')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + '-' + errorMessage)
        })
    }
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_small.jpg'
          alt='backgroud img'
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black my-44 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90'
      >
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type='text'
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>
          {!isSignInForm
            ? 'Already a user sign in now'
            : 'New to netflix? Sign up now'}
        </p>
      </form>
    </div>
  )
}

export default Login
