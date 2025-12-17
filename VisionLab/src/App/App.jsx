import './App.css'
import Nav from './navigation/Nav.jsx'       
import Content from './Content/Content.jsx'

function App() {
  return (
    <>
      <div className="bg-mesh"></div>
      <div className="app-container">
        <Nav />
        <Content />
      </div>
    </>
  )
}

export default App