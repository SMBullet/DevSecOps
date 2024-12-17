import * as React from "react";
import NavigationSection from "./NavigationSection";
import SocialIcon from "./SocialIcon";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  const productItems = [
    { text: "Career site & Job posts" },
    { text: "Application forms" },
    { text: "Applicant tracking" },
    { text: "Templates" },
    { text: "All features" },
    { text: "Pricing" },
    { text: "New in Homerun ✨" },
    { text: "Integrations" },
    { text: "Partners" }
  ];

  const learnItems = [
    { text: "Blog" },
    { text: "Help Center" },
    { text: "Hiring an Intern" },
    { text: "Hiring Process" },
    { text: "Remote Hiring" },
    { text: "Employer Branding" },
    { text: "Diversity, Equity & Inclusion" },
    { text: "Attracting Talent" },
    { text: "GDPR Hiring" }
  ];

  const aboutItems = [
    { text: "About us" },
    { text: "Careers" },
    { text: "Contact us" },
    { text: "Terms" },
    { text: "Privacy" }
  ];

  const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/19018e45e75e9d5283409c4e60a4fe6d5a731ad65d46a4d0fa8a88b2f38533ff?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73", alt: "Social media icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/84220759cca086ddcb9626a3bb3499772402b6db571cd406e112541c33b7d45b?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73", alt: "Social media icon 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/23b4662000af1a2bacf3ddb6a8aad4d3dd4a5694f1ccd446b1a166429377b86f?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73", alt: "Social media icon 3" }
  ];

  return (
    <footer className="self-center w-full">
      <div className="max-w-[1600px] mx-auto px-4 py-16">
        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-1">
          {/* Product Section */}
          <div>
            <h3 className="text-2xl font-black text-stone-800">Product</h3>
            <NavigationSection items={productItems} />
          </div>

          {/* Learn Section */}
          <div>
            <h3 className="text-2xl font-black text-stone-800">Learn</h3>
            <NavigationSection items={learnItems} />
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-2xl font-black text-stone-800">About Homerun</h3>
            <NavigationSection items={aboutItems} />
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-2xl font-black text-stone-800">Our newsletter</h3>
            <div className="mt-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/394073bd443b0b35122568ea53453b157c3a34782a556dd624921ff4bfe12812?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
                alt="The Art of Work"
                className="w-full"
              />
              <p className="text-lg text-stone-800 mt-4">
                Receive must-read articles and trends on company culture, hiring
                and work/life balance from leading publications.
              </p>
              <NewsletterForm />
              <div className="flex gap-4 mt-6">
                {socialIcons.map((icon, index) => (
                  <SocialIcon key={index} {...icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;