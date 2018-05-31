import React, {Component} from 'react';
import { Input } from 'antd/lib';
// import 'antd/lib/input/style/css';

const Search = Input.Search;

class SearchBar extends Component {
  render() {
    return (
      <Search
      placeholder="input search text"
      enterButton
    />
      );
  }
}

export default SearchBar;