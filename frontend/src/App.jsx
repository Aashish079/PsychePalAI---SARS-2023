import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Trash from "./Trash";

function App() {
  return (
    <div className="App flex w-full h-screen">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="trash" element={<Trash />} />
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
