import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "../routes/index.js";
import {UserNameIdProvider} from "./UserNameId/UserNameIdContext"
function App()
{
  return (
    <UserNameIdProvider>
      <Routes/>
    </UserNameIdProvider>
  );
}
export default App;