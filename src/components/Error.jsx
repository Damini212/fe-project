import React from "react";
import { Link } from "react-router-dom";

export default function Error({ message }) {
  return <div className="error-message">{message}</div>;
}
