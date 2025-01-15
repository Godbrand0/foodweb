import React from "react";
import Header from "../Reuse/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import useSidebar from "../Hooks/useSidebar";
import NavIcons from "../Reuse/NavIcons";

export default function CheckoutSection() {
  const { sidebar, toggleSidebar } = useSidebar();
  return (
    <div>
      <NavIcons icon={faCartShopping} onClick={toggleSidebar} />

      <div className="lg:block hidden">
        <Header content={"checkout section"} />
        <NavIcons icon={faXmark} onClick={toggleSidebar} />
        <div className="flex flex-col">
          <div>
            <span>food name</span> x <span>quantity</span> = <span>total</span>
          </div>
          <div>
            <span>food name</span> x <span>quantity</span> = <span>total</span>
          </div>
          <div>
            <span>food name</span> x <span>quantity</span> = <span>total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
