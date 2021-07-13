import "./App.scss";
import Routes from "./routes";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import appLogo from "./assets/Group 4.svg";
import { ReactComponent as TelegramIco } from "./assets/telegram_app (1).svg";
import { ReactComponent as TwitterIco } from "./assets/twitter (2).svg";
import { ReactComponent as EmailIco } from "./assets/email.svg";
import AOS from "aos";
import Lang1 from "./assets/us.026a8970.svg";
import Lang2 from "./assets/download (1).svg";
import Lang3 from "./assets/cn.d09f389e.svg";

function openLink(id) {}

const Header = ({ style, languages, setLanguage, language }) => {
  const history = useHistory();

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(history.location.pathname);
  const DropdownTitle = (
    <span>
      <img src={language.src} style={{ marginLeft: "10px", width: "25px" }} />
    </span>
  );

  return (
    <Navbar expand="lg" className="flex-x-between">
      <Navbar.Brand
        onClick={() => {
          history.push("/");
          setActive("/Home");
        }}
      >
        <img src={appLogo} />
      </Navbar.Brand>
      <span className="flex-x nav-a">
        <Nav.Link
          onClick={() => {
            history.push("/Home");
            setActive("/Home");
          }}
          style={{ color: active == "/Home" ? "#ff6002" : "inherit" }}
        >
          Games
        </Nav.Link>
        <Nav.Link
          style={{ color: active == "/FAQ" ? "#ff6002" : "inherit" }}
          onClick={() => {
            history.push("/FAQ");
            setActive("/FAQ");
          }}
        >
          FAQ
        </Nav.Link>
        <div className="flex-x nav-icons">
          <Nav.Link
            onClick={() => {
              openLink("token");
            }}
          >
            <TelegramIco />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              openLink("token");
            }}
          >
            <TwitterIco />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              openLink("token");
            }}
          >
            <EmailIco />
          </Nav.Link>
        </div>
        <NavDropdown
          title={DropdownTitle}
          id="basic-nav-dropdown-1"
          onMouseEnter={() => {
            setMenuOpen(true);
          }}
          onMouseLeave={() => {
            setMenuOpen(false);
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          show={menuOpen}
        >
          <div className="custom-dropdown">
            {languages.map((i, k) => (
              <NavDropdown.Item
                key={k}
                onClick={() => {
                  setMenuOpen(false);
                  setLanguage(i);
                }}
              >
                <img src={i.src} style={{ margin: "10px", width: "25px" }} />
                {i.name}
              </NavDropdown.Item>
            ))}
          </div>
        </NavDropdown>
      </span>
    </Navbar>
  );
};

const Footer = () => {
  const footerItems = [
    {
      heading: "Our games",
      items: [
        { heading: "Coin flip", link: "" },
        { heading: "Dice", link: "" },
        { heading: "Two Dice", link: "" },
        { heading: "Etheroll", link: "" },
      ],
    },
    {
      heading: "Blockchain & Friends",
      items: [
        { heading: "Your Balance 0.00 ETH", link: "" },
        { heading: "Network : Main Net", link: "" },
        { heading: "Smart Contract", link: "" },
      ],
    },
    {
      heading: "Reach out to us",
      items: [
        { heading: "Telegram", link: "" },
        { heading: "Twitter", link: "" },
        { heading: "Email", link: "" },
        { heading: "Terms of service", link: "" },
      ],
    },
    {
      heading: "Featured on",
      items: [
        { heading: "Github", link: "" },
        { heading: "State of the DApps", link: "" },
        { heading: "DApp Radar", link: "" },
        { heading: "Bloomberg", link: "" },
      ],
    },
  ];
  return (
    <div className="footer flex-x">
      {footerItems.map((i, k) => (
        <div>
          <div className="heading">{i.heading}</div>

          {i.items.map((j, l) => (
            <div className="item">{j.heading}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
function App() {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
  const languages = [
    { name: "English", src: Lang1 },
    { name: "Russian", src: Lang2 },
    { name: "Chinese", src: Lang3 },
  ];
  const [language, setLanguage] = useState(languages[0]);
  return (
    <div className="App">
      <Router>
        <Header
          language={language}
          setLanguage={setLanguage}
          languages={languages}
        />

        <Switch>
          <Routes />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
