import React from "react";
import "antd/dist/antd.css";

import Adminsearchbar from "../components/book/Adminsearchbar";
import SearchResults from "../components/book/SearchResults";

const BookPage = () => {
  return (
    <div>
      <Adminsearchbar />
      <SearchResults />
    </div>
  );
};

export default BookPage;
