'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getToken, isAuthenticated, getUserRole } from '../lib/api-client'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'

interface UserProfile {
  email: string;
  role: string;
}

const ProfilePage = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        
        setProfile({
          email: response.data.email,
          role: response.data.role || getUserRole() || ''
        })
        setFormData(prev => ({
          ...prev,
          email: response.data.email
        }))
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load profile information')
        setIsLoading(false)
        console.log(err)
      }
    }

    fetchProfile()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    
    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
      
      setSuccess('Password updated successfully!')
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      setIsEditing(false)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to update password. Please check your current password.')
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
     <div className="fixed inset-y-0 left-0 lg:block lg:w-64 w-full z-30">
        <Sidebar />
      </div>
      <Head>
        <title>Your Profile</title>
      </Head>
      
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-lg  overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p>{success}</p>
            </div>
          )}
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-sm font-medium text-gray-500">Email</span>
                  <span className="block mt-1 text-md text-gray-900">{profile?.email}</span>
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-500">Role</span>
                  <span className="block mt-1 text-md text-gray-900 capitalize">{profile?.role}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Password</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isEditing ? 'Cancel' : 'Change Password'}
                </button>
              </div>
              
              {isEditing && (
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage