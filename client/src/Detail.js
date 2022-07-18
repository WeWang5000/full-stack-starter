import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(
    function () {
      if (id) {
        fetch(`https://api.airtable.com/v0/apparv2j6EOOrgYaX/Table%201/recM1Mgty0JhZ5wou${id}?api_key=keyFqsLeVJmDj3HEX`)
          .then((response) => response.json())
          .then((data) => setData(data));
      }
    },
    [id]
  );

  return (
    <main className="container">
      <h1>{data?.fields?.Title}</h1>
      <p>{JSON.stringify(data)}</p>
    </main>
  );
}
export default Detail;
