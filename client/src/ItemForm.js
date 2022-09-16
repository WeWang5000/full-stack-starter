import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Api from './Api';

function ItemForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    Name: '',
    Created: '',
    Pictures: '',
    Audio: '',
  });

  useEffect(() => {
    if (id) {
      Api.musicwebsite.get(id).then((response) => setData(response.data));
    }
  }, [id]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (id) {
        response = await Api.musicwebsite.update(id, data);
      } else {
        response = await Api.musicwebsite.create(data);
      }
      navigate(`/detail/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(event) {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <h1>Item</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="Name">
                Name
              </label>
              <input type="text" className="form-control" id="Name" name="Name" onChange={onChange} value={data.Name} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Created">
                Created
              </label>
              <input type="text" className="form-control" id="Created" name="Created" onChange={onChange} value={data.Created} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Pictures">
                Pictures
              </label>
              <input type="text" className="form-control" id="Pictures" name="Pictures" onChange={onChange} value={data.Pictures} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Audio">
                Audio
              </label>
              <input type="text" className="form-control" id="Audio" name="Audio" onChange={onChange} value={data.Audio} />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default ItemForm;
