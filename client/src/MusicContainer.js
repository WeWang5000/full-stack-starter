import Detail from './Detail';
import { Link } from 'react-router-dom';

function MusicContainer({ id, title, text, img }) {
  return (
    <div className="card col-4">
      <img src={img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text} </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
      </ul>
      <div className="card-body">
        <Link to={`/detail/${id}`} className="detail">
          detail
        </Link>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
}

export default MusicContainer;
