import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState()

  const onChangeUsernameHandler = (e) => {
    const value = e.target.value;

    setUsername(value);
  }
  const onChangeEmailHandler = (e) => {
    const value = e.target.value;

    setEmail(value);
  }
  const onChangePasswordHandler = (e) => {
    const value = e.target.value;

    setPassword(value);
  }
  const onChangePictureHandler = (e) => {
    const value = e.target.files[0];

    // if (value.type !== "image/png") {
    //   console.log("Format gambar harus .png");
    // }

    setProfilePicture(value);
  }

  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("username", username);
      payload.append("email", email);
      payload.append("password", password);
      payload.append("profile_picture", profilePicture);

      const registerResponse = await axios.post("http://localhost:8000/api/auth/register", payload);

      if (registerResponse.status === 200) {
        console.log("berhasil daftar");
        navigate("/login");
      }
    } catch (err) {
      console.log("gagal daftar:", err)
    }
  }

  return (
    <div>
      <div>
        Username: <input onChange={(e) => onChangeUsernameHandler(e)} />
      </div>
      <div>
        Email:  <input onChange={(e) => onChangeEmailHandler(e)} />
      </div>
      <div>
        Password:  <input onChange={(e) => onChangePasswordHandler(e)} />
      </div>
      <div>
        Profile Picture: <input type="file" onChange={(e) => onChangePictureHandler(e)} />
      </div>
      <button onClick={(e) => onSubmitButtonHandler(e)} >Register</button>
    </div >
  )
}
