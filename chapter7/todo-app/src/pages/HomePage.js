import { useEffect, useState } from 'react';
import './home-page.css';
import Header from "../components/Header"
import Student from "../components/Student"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const students = [
  {
    name: "Munwar",
    age: 34
  },
  {
    name: "bunga",
    age: 34
  },
  {
    name: "nabul",
    age: 34
  },
]

function HomePage() {
  const navigate = useNavigate();

  const [studentsState, setStudentsState] = useState(students);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const jwtToken = localStorage.getItem("user_token");

        const validateTokenResponse = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })

        if (validateTokenResponse.status !== 200) {
          navigate("/login");
        } else {
          console.log(validateTokenResponse.data.data.user);
          setLoggedInUser(validateTokenResponse.data.data.user);
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    }

    checkIsLoggedIn();
  }, [loggedInUser])

  const incrementCounter = () => {
    setCount(count + 1);
  }

  const decrementCounter = () => {
    if (count > 0)
      setCount(count - 1);
  }

  const nameEventHandler = (event) => {
    const value = event.target.value;

    setName(value);
  }

  const ageEventHandler = (event) => {
    const value = event.target.value;

    setAge(value);
  }

  const addStudentEventHandler = (event) => {
    event.preventDefault();

    if (name && age) {
      const newStudent = {
        name: name,
        age: age
      }

      setStudentsState([...studentsState, newStudent])

      // const temporaryStudents = studentsState;
      // temporaryStudents.push(newStudent);

      // console.log(temporaryStudents);

      // setStudentsState(temporaryStudents);
    }
  }

  const logoutEventHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem("user_token")
    setLoggedInUser(null);
  }

  return (
    <div>
      <Header />
      <h3>Home Page</h3>
      <h2>Selamat datang, {loggedInUser ? loggedInUser.username : "Loading..."}</h2>
      <button onClick={(e) => logoutEventHandler(e)}>Logout</button>

      <a href="/about">Pindah ke halaman about pake href</a>
      <br />
      <Link to="/about">Pindah ke halaman about pake link</Link>

      <h1 className="text-red">Fitur Student App</h1>
      {
        studentsState.map(student => <Student student={student} />)
      }

      <form>
        <input placeholder="Nama" onChange={(event) => nameEventHandler(event)} />
        <input type="number" placeholder="Umur" onChange={(event) => ageEventHandler(event)} />
        <button onClick={(event) => addStudentEventHandler(event)}>Tambah Student</button>
      </form>

      <h1 className="text-red">Fitur Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => incrementCounter()}>Plus</button>
      <button onClick={() => decrementCounter()}>Min</button>
    </div>
  );
}

export default HomePage;
