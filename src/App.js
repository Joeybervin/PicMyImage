import { useState } from "react";
import { Modal, Input, Button } from 'reactstrap';
import "./App.css";

function App() {

  /* -------------------------------- VARIABLES ------------------------------- */

  /* API search parameters */
  const perPage = 50;
  const unsplashApiKey = "E1z8KRKXgbH6GBVDNF-InjgQqYmGpSPzHUmho78Wf8o";
  const [search, setSearch] = useState("");

  /* Modal state */
  const [modalShow, setModalShow] = useState(false);
  const [modalImage, setModalImage] = useState("")

  const [searchResults, setSearchResults] = useState([]);
  const [empty, setEmpty] = useState()

  /* -------------------------------- FUNCTIONS -------------------------------- */
  /* Open the modal */
  const toggleModal = () => setModalShow(!modalShow)
  const showModalImage = (url) => setModalImage(url)

  const imageSearch = async () => {
    /* unsplash API request */
    let request = await fetch(`https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&client_id=${unsplashApiKey}`);
    let rawResponse = await request.json();
    let response = rawResponse.results;
    setSearchResults(response);

    setEmpty(response.length)

  };


  const gallery = searchResults.map((element, index) => {

    /* to show the publication date */

    const publishedDate = new Date(element.created_at)

    return (
      <div
        key={index}
        onClick={() => {
          toggleModal()
          showModalImage(element.urls.raw)
        }
        }
        className="card border border-0 w-25"
      >

        {/* image result */}
        <img className="h-100 w-100 img-fluid img-thumbnail border border-0 " src={element.urls.regular} alt={`${element.description}, from : ${element.user.username} `} />

        {/* hover details */}
        <div className="card-img-overlay d-flex flex-column  ">
          <div className=" d-flex">
            {/* user profile image */}
            <img src={element.user.profile_image.large} alt="..." className="rounded-circle border border-white user-img" />
            {/* user name */}
            <p className="text-white font-weight-bold my-auto ms-2">{element.user.name}</p>
          </div>
          {/* date of the image publication */}
          <p className="card-text text-white text-opacity-50 mt-auto">published {publishedDate.toLocaleDateString()}</p>
        </div>

      </div>
    )
  })

  /* ---------------------------------- PAGE ---------------------------------- */
  return (
    <div className="App">
      {/* modal */}
      <Modal isOpen={modalShow} toggle={toggleModal} centered={true} size={"lg"} style={{ background: "transparent" }}>
        <img src={`${modalImage}`} alt="" className="img-responsive" style={{ background: "black" }} />
      </Modal>
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <header className="mt-5  mb-5 ">
            <h1 className=" fs-1 fw-bold">PicMyImage</h1>
            <p className="mb-4 fw-light">Use Unsplash API to find an image</p>
            <div className="border rounded-3 input-group">
              <Input
                className="border border-0 p-3"
                placeholder="Search ..."
                bsSize="lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* search button */}
              <Button
                className="my-auto me-3 rounded-2 border border-0"
                size="sm"
                onClick={() => imageSearch()}
              >
                <i className="fa fa-search" ></i>
              </Button>


            </div>
          </header>
          <main>
            <div className="col-12 d-flex align-align-items-center flex-wrap mb-5" >
              {empty === 0 ? <p>Sorry... no image found.</p> : gallery}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
