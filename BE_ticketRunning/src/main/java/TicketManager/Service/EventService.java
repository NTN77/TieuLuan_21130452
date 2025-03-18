package TicketManager.Service;

import TicketManager.DTO.Reponse.EventReponse;
import TicketManager.DTO.Request.EventRequest;
import TicketManager.Entity.Event;
import TicketManager.Enum.ErrorCode;
import TicketManager.Exception.AppException;
import TicketManager.Repository.EvenntDetailRepository;
import TicketManager.Repository.EventRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
public class EventService {
    @Autowired
    EventRepository eventRepository;
    @Autowired
    private EvenntDetailRepository eventDetailRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    public Event createEvent(MultipartFile file, EventRequest eventRequest) throws IOException {
        // Kiểm tra nếu sự kiện đã tồn tại theo tên
        if (eventRepository.existsEventByName(eventRequest.getName())) {
            throw new AppException(ErrorCode.NAME_EVENT_EXIST);
        }
        Event event = new Event();
        event.setName(eventRequest.getName());
        event.setDescription(eventRequest.getDescription());
        event.setStatus(true);
        event.setLocation(eventRequest.getLocation());
        event.setEventDate(eventRequest.getEventDate());
        event.setTotal(eventRequest.getTotal());
        event = eventRepository.save(event);
        String imageUrl = cloudinaryService.uploadImage(file.getBytes(), event.getId(), "avatar");
        event.setAvatar(imageUrl);
        return eventRepository.save(event);
    }
    public Optional<Event> getEventbyName(String name) {
        return eventRepository.findEventByName(name);
    }
    //Top 6 event sắp diễn ra
    public List<Event> listTop6Event() {
        return eventRepository.findTop6ByOrderByEventDateAsc();
    }

    //Lấy 6 event gâần nhất
    public List<EventReponse> listTop6EventHome(){
        List<Object[]> rawResults = eventRepository.findTop6Event(LocalDate.now());
        List<EventReponse> events = new ArrayList<>();

        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setName((String) row[0]);
            event.setAvatar((String) row[1]);
            event.setLocation((String) row[2]);
            event.setEventDate((LocalDate) row[3]);
            event.setDescription((String) row[4]);
            event.setTotal((Integer) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        return events;
    }
//GetAll
    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public List<EventReponse> getAll() {
        List<Object[]> rawResults = eventRepository.findAllEventsWithMinPrice(LocalDate.now());
        List<EventReponse> events = new ArrayList<>();

        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setName((String) row[0]);
            event.setAvatar((String) row[1]);
            event.setLocation((String) row[2]);
            event.setEventDate((LocalDate) row[3]);
            event.setDescription((String) row[4]);
            event.setTotal((Integer) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        return events;
    }

}
