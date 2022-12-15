import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function MemberPage() {
    const navigate = useNavigate();
    useEffect(() => {
      const checkUser = async () => {
        try {
          const token = localStorage.getItem('token');
          const checkUserResponse = await axios.post(`${BACKEND.URL}/auth/me`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
  
          if (checkUserResponse.status !== 200) {
            console.log(checkUserResponse.data.message);
            navigate("/login")
          }
        } catch (err) {
          console.log(err)
          navigate("/login")
        }
      }
      checkUser();
    },[])
  return (
    <div>MemberPage</div>
  )
}
