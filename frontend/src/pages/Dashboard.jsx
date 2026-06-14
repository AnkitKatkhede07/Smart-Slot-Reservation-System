import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    api
      .get("/bookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("/slots/all")
      .then((res) => {
        setSlots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            Booking Management Dashboard
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography variant="h6">
                  Total Slots
                </Typography>

                <Typography variant="h3">
                  {slots.length}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography variant="h6">
                  Available Slots
                </Typography>

                <Typography variant="h3">
                  {
                    slots.filter(
                      (slot) =>
                        slot.status ===
                        "AVAILABLE"
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography variant="h6">
                  Booked Slots
                </Typography>

                <Typography variant="h3">
                  {
                    slots.filter(
                      (slot) =>
                        slot.status ===
                        "BOOKED"
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography variant="h6">
                  Total Bookings
                </Typography>

                <Typography variant="h3">
                  {bookings.length}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography variant="h6">
                  Cancelled Bookings
                </Typography>

                <Typography variant="h3">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.status ===
                        "CANCELLED"
                    ).length
                  }
                </Typography>
              </CardContent>
            </Card>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Recent Bookings
          </Typography>

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
                <th>Customer</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;