import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MyPrompts from "./components/MyPrompts";
import Trash from "./Trash";
import Support from "./components/Support";
import LogOut from "./components/LogOut";
import Account from "./components/Account";

function App() {
  return (
    <div className="App flex w-full h-screen">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/">
            <Route index element={<MyPrompts />} />
            <Route path="trash" element={<Trash />} />
            <Route path="account" element={<Account />} />
            <Route path="support" element={<Support />} />
            <Route path="logout" element={<LogOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
