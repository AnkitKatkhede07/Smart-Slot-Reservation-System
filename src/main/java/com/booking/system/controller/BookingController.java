package com.booking.system.controller;

import com.booking.system.entity.Booking;
import com.booking.system.service.BookingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping   // API call for Postman
    public Booking bookSlot(@RequestParam Long slotId,
                             @RequestParam Long userId) {

        return bookingService.bookSlot(slotId, userId);
    }

@GetMapping("/cancel")
public Booking cancelBooking(@RequestParam Long bookingId) {
    return bookingService.cancelBooking(bookingId);
}
}
