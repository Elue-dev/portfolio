import { useState } from "react";
import "./Contact.scss";
import { RiContactsFill } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { GiLetterBomb } from "react-icons/gi";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";
import { BsChatRightText, BsCheck2All } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { BiLoader } from "react-icons/bi";
import ReactWhatsapp from "react-whatsapp";
import { TbBrandWhatsapp } from "react-icons/tb";
import axios from "axios";

export default function Contact() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!email || !title || !message) {
      setError("Please fill all fields");
      setTimeout(() => setError(""), 5000);
      return;
    }

    const body = { email, name: title, message };

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/contact/contact-me`,
        body
      );
      if (response) {
        setSuccess(response.data.message);
        setMessage("");
        setEmail("");
        setTitle("");
        setTimeout(() => setSuccess(""), 5000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => setError(""), 5000);
      setLoading(false);
    }
  };

  return (
    <div className="contact" id="contact">
      <div className="title">Contacts</div>
      <div className="contact_items">
        <div className="contact_details">
          <div className="info">
            <div className="name">
              <RiContactsFill className="contact_icon" />
              <p>Wisdom Elue</p>
            </div>
            <div className="location">
              <ImLocation className="contact_icon" />
              <p>Lagos, Nigeria</p>
            </div>
            <div className="email">
              <GiLetterBomb className="contact_icon" />
              <a href="mailto:eluewisdom@gmail.com">eluewisdom@gmail.com</a>
            </div>
            <div className="linkedin">
              <AiOutlineLinkedin className="contact_icon" />
              <a href="https://www.linkedin.com/in/wisdom-elue-8822a5188">
                LinkedIn
              </a>
            </div>
            <div className="github">
              <BsGithub className="contact_icon" />
              <a href="https://github.com/Elue-dev">github.com/Elue-dev</a>
            </div>
            <div className="resume">
              <AiFillFileText className="contact_icon" />
              <a href="https://eluedevresume.netlify.app"> Resume</a>
            </div>
            <div>
              <ReactWhatsapp
                number="234-810-733-9039"
                message="Hi there, i am from your website, i want to leave a message..."
                className="whatsapp"
              >
                <TbBrandWhatsapp size={20} />
                &nbsp; <span>Send Message</span>
              </ReactWhatsapp>
            </div>
          </div>
        </div>
        <form
          className="contact_form"
          onSubmit={sendEmail}
          name="contact-form"
          data-netlify="true"
        >
          <h3 className="heading">Leave a Message.</h3>
          {error && (
            <p className="error">
              {" "}
              <span>
                <FiAlertTriangle />
                &nbsp; {error}
              </span>
            </p>
          )}
          {success && (
            <p className="success">
              {" "}
              <span>
                <BsCheck2All />
                &nbsp; {success}
              </span>
            </p>
          )}
          <input type="hidden" name="form-name" value="contact-form" />
          <RiContactsFill className="form_icon " />
          <input
            type="text"
            name="name"
            placeholder="Your Name / Company Name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <GiLetterBomb className="form_icon" />
          <input
            type="email"
            name="email"
            placeholder=" Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <BsChatRightText className="form_icon" />
          <input
            name="message"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button type="sumbit" className="submit">
            {loading ? <BiLoader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
