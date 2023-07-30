import Navbar from "../(components)/Navbar";
import Footer from "../(components)/Footer";
import Header from "../(components)/Header";
import FeedView from "../(components)/FeedView";

export default function Home() {
  return (
    <div>
      <Navbar logo="Prompai" />
      <Header />
      <FeedView />
      <h1>Hello World</h1>
      <Footer />
    </div>
  );
}
