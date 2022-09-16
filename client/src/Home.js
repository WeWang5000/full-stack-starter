import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from './AuthContext';
import Detail from './Detail';
import MusicBackground from './MusicBackground';
import MusicContainer from './MusicContainer';

function Home() {
  const { user } = useAuthContext();
  const [item, setItems] = useState([]); //item is what you put in []

  useEffect(function () {
    const request = fetch('/api/musicwebsite');
    request
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  return (
    <main className="container">
      <h1>Wang's Beat</h1>
      {user?.isAdmin && (
        <p>
          <Link to="/detail/new" className="btn btn-primary">
            New Item
          </Link>
        </p>
      )}
      <div className="row">
        {/* <MusicBackground /> */}
        {item.map((item) => (
          <MusicContainer id={item.id} title={item.Name} text={item.Created} img={item.Pictures} />
          // <MusicContainer id={item.id} title={item.fields.Title} text={item.fields.Text} />
        ))}
      </div>
    </main>
  );
}

export default Home;
