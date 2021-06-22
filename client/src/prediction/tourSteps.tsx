import React from "react";
import { Step } from "react-joyride";

export const tourSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    title: "Walkthrough",
    content: (
      <div className="text-left">
        <p>
          Welcome to the{" "}
          <span className="text-primary font-weight-bold">
            Enrollment Scenario Explorer
          </span>
          . Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          aliquam pharetra tortor sit amet suscipit.
        </p>{" "}
        <p>
          Nullam justo felis, fermentum ut turpis ac, auctor tempor quam.
          Pellentesque viverra nec diam pharetra venenatis. Aenean non
          pellentesque lorem, et ullamcorper quam.
        </p>
      </div>
    ),
    styles: {
      options: {
        width: 400,
      },
    },
  },
  {
    target: ".institution-selector",
    title: "Select Your Institution",
    content:
      "Sed vehicula aliquam sem, et dignissim nisl convallis ut. Donec fermentum porta ullamcorper.",
  },
  {
    target: ".market-share-selector",
    title: "Choose a Market Share Model",
    content:
      "Aenean purus turpis, faucibus sed ex vitae, auctor elementum quam. Pellentesque dapibus, ante at pulvinar tincidunt, sapien sem rutrum dui, vitae sagittis orci nibh ut mauris.",
  },
  {
    target: ".region-selector",
    title: "Select a Region",
    content:
      "Cras sed purus eros. Nulla quam odio, lobortis vitae auctor sed, posuere quis quam. Cras eget urna dignissim, dictum sem at, semper massa.",
  },
  {
    target: ".overview-chart",
    title: "View Enrollment Forecasts",
    content:
      "Nullam nec nibh id lorem imperdiet vestibulum. Donec ornare sit amet leo vitae pulvinar. Vivamus pellentesque dignissim justo ut ornare. Sed sed odio ex.",
  },
  {
    target: ".result-grid",
    title: "Explore the Data",
    content:
      "Nulla sed varius sapien, quis condimentum erat. Nunc sit amet ultrices lorem. Nulla ut nisi eget lectus luctus vulputate. Phasellus vel pellentesque ipsum.",
  },
  {
    target: ".nav-links",
    title: "Additional Analyses",
    content: "Aliquam aliquet a elit vitae consequat. Donec eget arcu nunc.",
  },
  {
    target: ".nav-compare",
    title: "Compare Institutions",
    content:
      "Curabitur a egestas tellus. Morbi auctor, neque tortor gravida urna, at pellentesque urna lacus vitae quam.",
  },
  {
    target: ".nav-market",
    title: "Market Analysis",
    content:
      "Phasellus congue semper massa in maximus. Fusce vitae iaculis urna. Ut dolor diam, lobortis vel tellus eu, fringilla porttitor enim.",
  },
  {
    target: ".navbar-context-menu",
    title: "Additional Resources",
    content: (
      <div className="text-left">
        <p>
          To launch this tour again, select <b>Walkthrough</b>
        </p>
        <p>
          You can also find answers to frequently asked questions as well as
          related research content.
        </p>
        <p>
          Still have questions?{" "}
          <b>
            <a href="mailto:todo@eab.com">Contact us</a>
          </b>
        </p>
      </div>
    ),
  },
];

export default tourSteps;
