import styles from './App.module.css'
import Nav from './navigation/Nav.jsx'       
import Content from './Content/Content.jsx'

function App() {
  return (
    <div className={styles.app_body}>
      <div className={styles.bg_mesh}></div>
      <div className={styles.app_container}>
        <Nav />
        <Content />
      </div>
    </div>
  )
}

export default App