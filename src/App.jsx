import conf from "./conf/conf";

function App(){

  console.log("Appwrite Endpoint is ....");
  console.log(conf.appwriteUrl);
  return <h1>Hello World</h1>
}

export default App;