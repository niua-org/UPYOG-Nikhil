import React from "react";
import { LocalShipping } from "./LocalShipping";

export default {
  tags: ['autodocs'],
  argTypes: {
    className: {
        options: ['custom-class'],
        control: { type: 'check' },
    }
  },
  title: "LocalShipping",
  component: LocalShipping,
};

export const Default = () => <LocalShipping />;
export const Fill = () => <LocalShipping fill="blue" />;
export const Size = () => <LocalShipping height="50" width="50" />;
export const CustomStyle = () => <LocalShipping style={{ border: "1px solid red" }} />;
export const CustomClassName = () => <LocalShipping className="custom-class" />;

export const Clickable = () => <LocalShipping onClick={()=>console.log("clicked")} />;

const Template = (args) => <LocalShipping {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  className: "custom-class",
  style: { border: "3px solid green" }
};
