import { faBoltLightning, faX } from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-auto pt-12">
      <div className="bg-[#e8f1fd] rounded-t-2xl py-4 overflow-hidden">
        <div className="flex-auto p-5">
          <div className="flex justify-evenly flex-wrap gap-6">
            <div className=" flex flex-col">
              <img
                src="./icon.jpg"
                alt="Logo"
                className="w-[100px] rounded-full"
              />
            </div>
            <div className=" flex flex-col leading-[2] text-sm">
              <h6 className="font-bold">QUICK LINKS</h6>
              <Link to="/terms" className="underline text-[#2f80ed]">
                Terms & Conditions
              </Link>
              <Link to="privacy-policy" className="underline text-[#2f80ed]">
                Privacy Policy
              </Link>
              <Link to="refund-policy" className="underline text-[#2f80ed]">
                Refunds and Cancellation Policy
              </Link>
            </div>
            <div className=" flex flex-col leading-[2]">
              <h6 className="font-bold mb-1.5">Download App</h6>
              <Link className="mb-1.5">
                <img
                  src="https://harkirat.classx.co.in/google-play.svg"
                  alt="Google play"
                />
              </Link>
              <h6 className="font-bold mb-1.5">Follow us</h6>
              <div className="text-xl">
                <a href="https://x.com/deenu_akash" target="_blank">
                  <FontAwesomeIcon icon={faXTwitter} className="mx-2" />
                </a>
                <a
                  href="https://www.linkedin.com/in/deenu-akash/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="mx-2" />
                </a>
                <a href="https://github.com/deenuakash" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="mx-2" />
                </a>
              </div>
              <div>
                Powered by{" "}
                <span>
                  <b>
                    Deenu{" "}
                    <FontAwesomeIcon
                      icon={faBoltLightning}
                      className="text-yellow-500"
                    />
                  </b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
