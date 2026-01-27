package com.booking.system.service;

import com.booking.system.entity.*;
import com.booking.system.repository.SlotRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SlotService {

    private final SlotRepository slotRepository;

    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public Slot createSlot(LocalDateTime start, LocalDateTime end) {
        Slot slot = new Slot();
        slot.setStartTime(start);
        slot.setEndTime(end);
        slot.setStatus(SlotStatus.AVAILABLE);
        return slotRepository.save(slot);
    }

    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }
}
