import App from './App/App.jsx'
function RouteManage(){
    const verified=true
    return(
        verified ?<App/>:null
        
    )
}
export default RouteManage