import React, { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataContext } from "../../App";
import Modal from "../Modal/Modal";

export default function BasicTable() {
  const [opened, setOpened] = useState(false);
  const [url, setUrl] = useState("");
  const [owner, setOwner] = useState("");

  const { dataCats } = useContext(DataContext);

  async function handleOpen(id, owner) {
    setOpened(true);
    setOwner(owner);
    setUrl(`https://cataas.com/cat/${id}?json=true`);
  }
  function returnTags(arr) {
    return arr.join(",");
  }
  function closeModal() {
    setOpened(false);
  }

  function timeConverter(timestamp) {
    const u = new Date(timestamp);
    return (
      ("0" + u.getUTCDate()).slice(-2) +
      "/" +
      ("0" + u.getUTCMonth()).slice(-2) +
      "/" +
      u.getUTCFullYear() +
      ",          " +
      ("0" + u.getUTCHours()).slice(-2) +
      ":" +
      ("0" + u.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + u.getUTCSeconds()).slice(-2)
    );
  }

  return (
    <>
      <h2 className="header-table">List of cats</h2>
      {opened && <Modal close={closeModal} owner={owner} link={url} />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCats.map(({ _id, createdAt, tags, owner }) => (
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {owner}
                </TableCell>
                <TableCell align="right">
                  {timeConverter(Date.parse(createdAt))}
                </TableCell>
                <TableCell align="right">{returnTags(tags)}</TableCell>
                <TableCell align="right">
                  <div>
                    <button onClick={() => handleOpen(_id, owner)}>
                      Details
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
