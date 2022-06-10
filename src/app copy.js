const root = document.querySelector('#root');

function App() {

  const [articles, setArticles] = React.useState([]);
  React.useEffect(function (){
    async function getData(){
      const request = await fetch('https://api.spaceflightnewsapi.net/v3/articles');
      const response = await request.json();
      setArticles(response);
    }
    getData();
  }, []);

  return (
    <>
      <h1>App Todo List</h1>
      <ul>
        {articles.map(function(item){
          return <li key={item.id} style={{ color:'red' }}>{item.title}</li>
        })}
      </ul>
    </>
  )
  
}

ReactDOM.render(<App/>, root);