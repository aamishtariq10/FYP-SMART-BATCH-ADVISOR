import { Footer } from "flowbite-react";
import React from "react";

const FooterWelcome = () => {
  return (
    <Footer container>
      <div className="w-full px-20">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              alt="Flowbite Logo"
              href="https://flowbite.com"
              name="Flowbite"
              src="https://flowbite.com/docs/images/logo.svg"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="Flowbite™" href="#" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={"facebook"} />
            <Footer.Icon href="#" icon={"facebook"} />
            <Footer.Icon href="#" icon={"facebook"} />
            <Footer.Icon href="#" icon={"facebook"} />
            <Footer.Icon href="#" icon={"facebook"} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterWelcome;
