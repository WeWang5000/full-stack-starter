import { useEffect, useState } from 'react';
import MusicContainer from './MusicContainer';
import MusicBackground from './MusicBackground';
import Detail from './Detail';

function Home() {
  const [item, setItems] = useState([]); //item is what you put in []

  useEffect(function () {
    const request = fetch('https://api.airtable.com/v0/apparv2j6EOOrgYaX/Table%201?api_key=keyFqsLeVJmDj3HEX');
    request
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data.records);
      });
  }, []);

  return (
    <main className="container">
      <h1>Wang's Beat</h1>
      <div className="row">
        {/* <MusicBackground /> */}
        {item.map((item) => (
          <MusicContainer id={item.id} title={item.fields.Name} text={item.fields.Created} img={item.fields.Pictures[0].url} />
          // <MusicContainer id={item.id} title={item.fields.Title} text={item.fields.Text} />
        ))}
      </div>
    </main>
  );
}

export default Home;
