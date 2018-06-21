import React, { Component } from 'react';
import { List,  Avatar } from 'antd';
import 'antd/lib/list/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/avatar/style/css';
import 'antd/lib/spin/style/css';

// import reqwest from 'reqwest';

// import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import VList from 'react-virtualized/dist/commonjs/List';
// import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

// class VirtualizedExample extends Component {
//   state = {
//     data: [],
//     loading: false,
//   }
//   loadedRowsMap = {}
//   getData = (callback) => {
//     reqwest({
//       url: fakeDataUrl,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: (res) => {
//         callback(res);
//       },
//     });
//   }
//   componentDidMount() {
//     this.getData((res) => {
//       this.setState({
//         data: res.results,
//       });
//     });
//   }
//   handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
//     let data = this.state.data;
//     this.setState({
//       loading: true,
//     });
//     for (let i = startIndex; i <= stopIndex; i++) {
//       // 1 means loading
//       this.loadedRowsMap[i] = 1;
//     }
//     if (data.length > 19) {
//       message.warning('Virtualized List loaded all');
//       this.setState({
//         loading: false,
//       });
//       return;
//     }
//     this.getData((res) => {
//       data = data.concat(res.results);
//       this.setState({
//         data,
//         loading: false,
//       });
//     });
//   }
//   isRowLoaded = ({ index }) => {
//     return !!this.loadedRowsMap[index];
//   }
//   renderItem = ({ index, key, style }) => {
//     const { data } = this.state;
//     const item = data[index];
//     return (
//       <List.Item key={key} style={style}>
//         <List.Item.Meta
//           avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//           title={<a href="https://ant.design">{item.name.last}</a>}
//           description={item.email}
//         />
//         <div>Content</div>
//       </List.Item>
//     );
//   }
//   render() {
//     const { data } = this.state;
//     const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
//       <VList
//         autoHeight
//         height={height}
//         isScrolling={isScrolling}
//         onScroll={onChildScroll}
//         overscanRowCount={2}
//         rowCount={data.length}
//         rowHeight={73}
//         rowRenderer={this.renderItem}
//         onRowsRendered={onRowsRendered}
//         scrollTop={scrollTop}
//         width={width}
//       />
//     );
//     const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
//       <AutoSizer disableHeight>
//         {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width })}
//       </AutoSizer>
//     );
//     const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
//       <InfiniteLoader
//         isRowLoaded={this.isRowLoaded}
//         loadMoreRows={this.handleInfiniteOnLoad}
//         rowCount={data.length}
//       >
//         {({ onRowsRendered }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered })}
//       </InfiniteLoader>
//     );
//     return (
//       <List>
//         {
//           data.length > 0 && (
//             <WindowScroller>
//               {infiniteLoader}
//             </WindowScroller>
//           )
//         }
//         {this.state.loading && <Spin className="demo-loading" />}
//       </List>
//     );
//   }
// }

// ReactDOM.render(<VirtualizedExample />, mountNode);
// export default VirtualizedExample;


const data = [
  {
    talker: 'robot',
    description: '你好'
  },
  {
    talker: 'levi',
    description: '加油'

  },
  {
    talker: 'vikon',
    description: 'thank you'

  },
  {
    talker: 'kedong',
    description: '...'

  },
];

class ContactList extends Component {
  constructor(props) {
    super(props);

  }
  listClick(e, talker) {

    // alert(this)
    const nodes = Array.prototype.slice.call(e.currentTarget.parentNode.children);
    // console.log(nodes)
    // console.log(e.currentTarget.parentNode.children)
    for(let i in nodes) {
      // console.log(nodes[i])
      nodes[i].classList.remove('black');
    }
    e.currentTarget.classList.add('black');
    // console.log(description)
    this.props.changeTalker(talker)
    this.props.changeContent(talker)
  }
  render() {
    return (
          <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item  
            className="list-style"
            onClick= {(e) => this.listClick(e, item.talker)}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={item.talker}
                description={item.description}
              />
            </List.Item>
          )}
        />
      );
  }
}

export default ContactList;