import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    console.log('hi', userId)
  }

  const renderPhrase = (number) => {
    let str = ''
    const ostatok = number % 10
    if (number === 0) {
      return (
        <>
          <h3>Никто с тобой не тусанет</h3>
        </>
      )
    }
    if (ostatok > 1 && ostatok < 5) {
      if ((number > 1 && number < 5) || number > 20) {
        str = 'а'
      }
    }

    return (
      <>
        <h3>
          {users.length} человек{str} тусанет с тобой сегодня
        </h3>
      </>
    )
  }
  const renderQualities = (qualities) => {
    const array = qualities.map((object) => {
      return [object.name, object.color]
    })

    const result = array.map((arr) => {
      const spanClass = `badge bg-${arr[1]} m-1`
      return (
        <>
          <span className={spanClass}>{arr[0]}</span>
        </>
      )
    })

    return result
  }

  const renderUsers = () => {
    const users = api.users.fetchAll()
    const tags = users.map((user) => {
      return (
        <>
          <tr>
            <td>{user.name}</td>
            <td>{renderQualities(user.qualities)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
              <button
                onClick={() => {
                  handleDelete(user._id)
                }}
                className="btn bg-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </>
      )
    })

    return <>{tags}</>
  }

  return (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  )
}

export default Users
