import React from 'react'

export default function FormSubmit() {
  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    console.log("username:", e.target.username.value)
    console.log("password:", e.target.password.value)
  }

  return (
    <div>
      <form onSubmit={onSubmitFormHandler}>
        <input name="username" required />
        <input name="password" required />
        <button>Submit</button>
      </form>
    </div>
  )
}
