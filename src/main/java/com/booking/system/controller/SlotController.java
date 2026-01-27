package com.booking.system.controller;

import com.booking.system.entity.Slot;
import com.booking.system.service.SlotService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/slots")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping("/create")
    public Slot createSlot(@RequestParam String start,
                           @RequestParam String end) {


        LocalDateTime startTime = LocalDateTime.parse(start);
        LocalDateTime endTime = LocalDateTime.parse(end);

        return slotService.createSlot(startTime, endTime);
    }

    @GetMapping
    public List<Slot> getAllSlots() {
        return slotService.getAllSlots();
    }
}
