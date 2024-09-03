import React from "react";
import { UserTable} from "./components/UserTable";
import './App.css';
const App: React.FC = () => {
  return (
    <div>
      <h1>User Management</h1>
      <UserTable />
    </div>
  );
};

export default App;
