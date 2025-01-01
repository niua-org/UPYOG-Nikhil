import React from "react";
import { Search } from "./Search";

export default {
  tags: ['autodocs'],
  argTypes: {
    className: {
        options: ['custom-class'],
        control: { type: 'check' },
    }
  },
  title: "Search",
  component: Search,
};

export const Default = () => <Search />;
export const Fill = () => <Search fill="blue" />;
export const Size = () => <Search height="50" width="50" />;
export const CustomStyle = () => <Search style={{ border: "1px solid red" }} />;
export const CustomClassName = () => <Search className="custom-class" />;

export const Clickable = () => <Search onClick={()=>console.log("clicked")} />;

const Template = (args) => <Search {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  className: "custom-class",
  style: { border: "3px solid green" }
};
