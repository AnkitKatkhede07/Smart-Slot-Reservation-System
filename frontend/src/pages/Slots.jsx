import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import {
  TextField,
  Button,
  Chip,
} from "@mui/material";

function Slots() {
  const [slots, setSlots] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = () => {
    api
      .get("/slots/all")
      .then((res) => {
        setSlots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSlot = () => {
    if (!startTime || !endTime) {
      alert("Select Start Time and End Time");
      return;
    }

    api
      .post("/slots", null, {
        params: {
          startTime,
          endTime,
        },
      })
      .then(() => {
        alert("Slot Added Successfully");

        setStartTime("");
        setEndTime("");

        loadSlots();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed To Add Slot");
      });
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h2>Slots Management</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
           <TextField
  type="datetime-local"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
  sx={{ width: 250 }}
/>

<TextField
  type="datetime-local"
  value={endTime}
  onChange={(e) => setEndTime(e.target.value)}
  sx={{ width: 250 }}
/>

            <Button
              variant="contained"
              onClick={addSlot}
            >
              Add Slot
            </Button>
          </div>

          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.id}</td>

                  <td>
                    {new Date(
                      slot.startTime
                    ).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {new Date(
                      slot.endTime
                    ).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {slot.status ===
                      "AVAILABLE" && (
                      <Chip
                        label="AVAILABLE"
                        color="success"
                      />
                    )}

                    {slot.status ===
                      "BOOKED" && (
                      <Chip
                        label="BOOKED"
                        color="error"
                      />
                    )}

                    {slot.status ===
                      "CANCELLED" && (
                      <Chip
                        label="CANCELLED"
                        color="warning"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Slots;