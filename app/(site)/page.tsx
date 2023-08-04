import Navbar from "../(components)/Navbar";
import Footer from "../(components)/Footer";
import Header from "../(components)/Header";
import FeedView from "../(components)/FeedView";
import Sidebar from "../(components)/Sidebar";

export default function Home() {
  return (
    <div>
      {/* <Sidebar> */}
      <div>
        {/* <div className="p-4 sm:ml-64 mt-[64px]"> */}
        <Header />
        <FeedView />
        {/* <Footer /> */}
        {/* </div> */}
      </div>
      {/* </Sidebar> */}
    </div>
  );
}
