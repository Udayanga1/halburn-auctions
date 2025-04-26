import { useState } from "react";
import Header from "./components/Header"
import Dashboard from "./components/Seller/Dashboard"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { User } from "./types/User";

function App() {
  const [view, setView] = useState<'signin' | 'signup' | 'dashboard'>('signin');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleSignOut = () => {
    setCurrentUser(null);
    setView('signin');
  };

  return (
    <>
      <Header />

      {view === 'signin' && (
        <SignIn
          onSignedIn={(user) => {
            setCurrentUser(user);
            setView('dashboard');
          }}
          onSwitchToSignUp={() => setView('signup')}
        />
      )}

      {view === 'signup' && (
        <SignUp
          onSignedUp={() => setView('signin')}
          onSwitchToSignIn={() => setView('signin')}
        />
      )}

      {view === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} onSignOut={handleSignOut} />
      )}

      <div>Footer</div>
    </>
  );
}

export default App
