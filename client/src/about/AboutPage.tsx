import React from "react";
//import {Button} from "react-bootstrap";
import Navbar from "../shared/Navbar";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <main role="main" className="container min-height-100-vh pt-3 pb-5">
        <div className="h1">Superb Forecasting</div>
        <div className="h4" id="about-what-is-this">
          What is this?
        </div>
        <p>
          This is a small but useful(?) tool for creating predictions and
          setting a reminder email to check back in on them. The hope is that by
          assigning probabilities and revisiting predictions, one's assertions
          become more thoughtful and rigorous.
        </p>
        <div className="h4" id="about-what-is-this">
          Is this commercial?
        </div>
        <p>
          No. Out of a combination of{" "}
          <a href="https://adtax.paulromer.net/">principle</a> and laziness,
          this app will never have ads.
        </p>
        <div className="h4" id="about-what-is-this">
          Can it support feature XYZ?
        </div>
        <p>
          Probably! If you have a feature request, shoot use an email at{" "}
          <a href="mailto:predictions.ikenley@gmail.com">
            predictions.ikenley@gmail.com
          </a>
          . It's also an Apache-licensed open-source project. Check it out on{" "}
          <a href="https://github.com/ikenley/prediction-app">Github</a>.
          Consider learning to code and filing a pull request (or forking the
          entire project and making a better version).
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
