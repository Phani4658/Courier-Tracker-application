import Navbar from "../Navbar";
import "./index.css";

function Home() {
  return (
    <div>
      <section className="top-section">
        <Navbar />
        <div className="tracking-form-container">
          <form className="tracking-number-form">
            <h3 className="tracking-heading">Enter Tracking Number</h3>
            <input placeholder="Enter Tracking No" className="tracking-input" />
            <button className="admin-login">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
