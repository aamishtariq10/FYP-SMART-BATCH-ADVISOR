import { Footer } from "flowbite-react";
import React from "react";

const FooterWelcome = () => {
  return (
    <Footer container>
      <div className="w-full px-20">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              alt="Logo"
              href="https://www.cuilahore.edu.pk"
              name="CUI Lahore"
              src="https://scontent.flhe5-1.fna.fbcdn.net/v/t39.30808-6/326735146_579187470297376_4092953525416670635_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFzwgTnCeRoyNHezVI9n2jIJQoK6NU8YrslCgro1Txiu2BG24VDo7QkgaRZYLifkxJoW_3juYs48BkxHC9sQqJ4&_nc_ohc=3bp0amTVu8gAX9xN0ZG&_nc_ht=scontent.flhe5-1.fna&oh=00_AfANFlj2Au-0C2LoC4h93zrZ4yyaRtFazOQulW3Ln8HdGQ&oe=6478EC03"
            />
          </div>
          <div className="flex flex-col space-y-4">
            Smart Batch Advisor - 2023
          </div>
         
        </div>
       
      </div>
    </Footer>
  );
};

export default FooterWelcome;
