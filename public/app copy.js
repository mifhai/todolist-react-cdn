const root = document.querySelector('#root');

function App() {
  const [articles, setArticles] = React.useState([]);
  React.useEffect(function () {
    async function getData() {
      const request = await fetch('https://api.spaceflightnewsapi.net/v3/articles');
      const response = await request.json();
      setArticles(response);
    }

    getData();
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "App Todo List"), /*#__PURE__*/React.createElement("ul", null, articles.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      style: {
        color: 'red'
      }
    }, item.title);
  })));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);