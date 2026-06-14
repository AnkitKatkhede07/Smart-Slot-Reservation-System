import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import {
  TextField,
  Button,
  Chip,
} from "@mui/material";

function Bookings() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSlots();
    loadBookings();
  }, []);

  const loadSlots = () => {
    api
      .get("/slots")
      .then((res) => setSlots(res.data))
      .catch((err) => console.log(err));
  };

  const loadBookings = () => {
    api
      .get("/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  };

  const createBooking = (slotId) => {
    if (!customerName || !customerEmail) {
      alert("Enter Name and Email");
      return;
    }

    api
      .post("/bookings", null, {
        params: {
          slotId,
          customerName,
          customerEmail,
        },
      })
      .then(() => {
        alert("Booking Created");

        setCustomerName("");
        setCustomerEmail("");

        loadSlots();
        loadBookings();
      })
      .catch((err) => {
        console.log(err);
        alert("Booking Failed");
      });
  };

  const cancelBooking = (bookingId) => {
    api
      .post(`/bookings/${bookingId}/cancel`)
      .then(() => {
        alert("Booking Cancelled");

        loadSlots();
        loadBookings();
      })
      .catch((err) => {
        console.log(err);
        alert("Cancel Failed");
      });
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h2>Available Slots</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
            />

            <TextField
              label="Customer Email"
              value={customerEmail}
              onChange={(e) =>
                setCustomerEmail(e.target.value)
              }
            />
          </div>

          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginBottom: "40px",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Action</th>
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
                    <Chip
                      label={slot.status}
                      color="success"
                    />
                  </td>

                  <td>
                    {slot.status ===
                      "AVAILABLE" && (
                      <Button
                        variant="contained"
                        onClick={() =>
                          createBooking(slot.id)
                        }
                      >
                        Book
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>All Bookings</h2>

          <TextField
            label="Search Customer"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{ mb: 2 }}
          />

          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings
                .filter((booking) =>
                  booking.customerName
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>

                    <td>
                      {booking.customerName}
                    </td>

                    <td>
                      {booking.customerEmail}
                    </td>

                    <td>
                      {booking.status ===
                        "CONFIRMED" && (
                        <Chip
                          label="CONFIRMED"
                          color="success"
                        />
                      )}

                      {booking.status ===
                        "CANCELLED" && (
                        <Chip
                          label="CANCELLED"
                          color="error"
                        />
                      )}
                    </td>

                    <td>
                      {booking.status ===
                      "CONFIRMED" ? (
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() =>
                            cancelBooking(
                              booking.id
                            )
                          }
                        >
                          Cancel
                        </Button>
                      ) : (
                        "-"
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

export default Bookings;