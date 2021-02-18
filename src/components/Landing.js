import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Landing() {
  const history = useHistory();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = (
        await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        )
      ).data;
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  function handleClick(category) {
    history.push(`category/${category}`);
  }

  return (
    <div className="App">
      <h1>Categories</h1>
      {categories &&
        categories.map((cat) => {
          return (
            <div
              key={cat.idCategory}
              onClick={() => {
                handleClick(cat.strCategory);
              }}
              className="clickable"
            >
              <img src={cat.strCategoryThumb} alt={cat.strCategory} />
              <h2>{cat.strCategory}</h2>
            </div>
          );
        })}
    </div>
  );
}

export default Landing;
