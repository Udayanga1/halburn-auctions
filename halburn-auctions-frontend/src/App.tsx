import Header from "./components/Header"
import Dashboard from "./components/Seller/Dashboard"
import SiginIn from "./components/SiginIn"
import SignUp from "./components/SignUp"

function App() {
  
  return (
    <>
     <Header />
     <SiginIn />
     <SignUp />
     <Dashboard />
     <div>Footer</div>
    </>
  )
}

export default App
