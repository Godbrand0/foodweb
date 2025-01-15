import React, { useState } from "react";

export default function useSidebar() {
  const [sidebar, setSidebar] = useState(true);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return { sidebar, toggleSidebar };
}
