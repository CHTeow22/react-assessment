import { React, useMemo, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import TableContainer from "./TableContainer.jsx";
import { FilterInput } from './Filter.jsx';
import DropdownSelect from './DropdownSelect.jsx';

function App() {
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.log('Error fetching posts', error));
  };

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "posts",
        Cell: ({ row }) => row.index + 1,
        disableFilters: true,
      },
      {
        Header: "Title",
        accessor: "title",
        Filter: FilterInput,
        filter: 'includes',
      },
      {
        Header: "Summary",
        accessor: "summary",
        Filter: FilterInput,
        filter: 'includes',
      },
      {
        Header: "Categories",
        accessor: (row) => row.categories.map((category) => category.name),
        Cell: ({ row }) => {
          return (
            <ul>
              {row.original.categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          );
        },
        Filter: DropdownSelect,
      },
      {
        Header: "Author",
        accessor: "author.name",
        filter: 'includes',
      },
      {
        Header: "Published Date",
        accessor: "publishDate",
        Cell: ({ row }) => {
          return (
            <Moment format="D MMM YYYY HH:mm:ss">{row.original.publishDate}</Moment>
          )
        },
        filter: 'includes',
      },
    ],
    []
  )

  return <Container style={{ marginTop: 50 }}>
    <h2 style={{ paddingBottom: "0.5em" }}>Posts</h2>
    <TableContainer columns={columns} data={posts} />
  </Container> 
}

export default App;
