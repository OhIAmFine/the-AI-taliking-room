import React, {Component} from 'react';
import { Input } from 'antd/lib';
import 'antd/lib/input/style/css'

const Search = Input.Search;

class SearchBar extends Component {
  render() {
    return (
      <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton
    />
      );
  }
}

export default SearchBar;