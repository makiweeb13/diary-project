import memoir from '../assets/memoir.png';
import{ Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
          <img src={memoir} className="logo" alt="memoir-logo"></img>
          <ul className="nav-links">
            <li>About</li>
            <li>Dev</li>
            <li>Privacy Policy</li>
          </ul>
        </header>
    )
}

export const Home = () => {
    return (
      <div>
        <Header />
        <main className="content">
          <p>Welcome to Memoir!</p>
          <h1>Where precious memories become <br></br>timeless tales</h1>
          <Link to="/signup"> <button className="btn sign-up">Sign up</button> </Link>
          <Link to="/login"> <button className="btn log-in">Log in</button> </Link>
          <Link> <button className="my-diary">My Diary</button> </Link>
        </main>
      </div>
    );
}
