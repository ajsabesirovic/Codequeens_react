import React from "react";

function UserList({ users }) {
  console.log("UserList rendered");
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default React.memo(UserList);
