import Header from './Header/Header.jsx';
import Workspace from './Workspace/Workspace.jsx';
import styles from './content.module.css'
function Content() {
    return (
        <main className={styles.main_area}>
            <Header/>
            <Workspace />
            
        </main>
    );
}
export default Content;