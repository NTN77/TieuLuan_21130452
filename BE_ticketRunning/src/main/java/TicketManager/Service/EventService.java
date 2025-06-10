package TicketManager.Service;

import TicketManager.DTO.Reponse.*;
import TicketManager.DTO.Request.EventPriceRequest;
import TicketManager.DTO.Request.EventRequest;
import TicketManager.Entity.Event;
import TicketManager.Entity.EventDetail;
import TicketManager.Entity.PriceEvent;
import TicketManager.Enum.ErrorCode;
import TicketManager.Exception.AppException;
import TicketManager.Repository.EvenntDetailRepository;
import TicketManager.Repository.EventRepository;
import TicketManager.Repository.PriceEventRepostitory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private PriceEventRepostitory priceEventRepostitory;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private CustomerInformationService customerInformationService;

    public Event findById(UUID id) {
        return eventRepository.findEventById(id).orElseThrow();
    }

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
        event = eventRepository.save(event);
        String imageUrl = cloudinaryService.uploadImage(file.getBytes(), event.getId(), "avatar");
        event.setAvatar(imageUrl);
        return eventRepository.save(event);
    }

    public Optional<Event> getEventbyName(String name) {
        return eventRepository.findEventByName(name);
    }

    public List<EventReponse> listTop6EventHome() {
        List<Object[]> rawResults = eventRepository.findTop9Event(LocalDate.now());
        List<EventReponse> events = new ArrayList<>();

        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setId((UUID) row[0]);
            event.setName((String) row[1]);
            event.setAvatar((String) row[2]);
            event.setLocation((String) row[3]);
            event.setEventDate((LocalDate) row[4]);
            event.setDescription((String) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        return events;
    }

    //GetAll
    public List<EventReponse> getAll() {
        List<Object[]> rawResults = eventRepository.findAllEventsWithMinPrice(LocalDate.now());
        List<EventReponse> events = new ArrayList<>();

        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setId((UUID) row[0]);
            event.setName((String) row[1]);
            event.setAvatar((String) row[2]);
            event.setLocation((String) row[3]);
            event.setEventDate((LocalDate) row[4]);
            event.setDescription((String) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        return events;
    }

    //Lấy tất cả event cho trang quản lý đơn hàng role Admin
    public List<OrderAdminReponse> getAllEventOfOrderManager() {
        List<Object[]> rawResults = eventRepository.findAllEventsWithMinPrice(LocalDate.now());
        List<EventReponse> events = new ArrayList<>();
        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setId((UUID) row[0]);
            event.setName((String) row[1]);
            event.setAvatar((String) row[2]);
            event.setLocation((String) row[3]);
            event.setEventDate((LocalDate) row[4]);
            event.setDescription((String) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        List<OrderAdminReponse> result = new ArrayList<>();
        for (EventReponse ep : events){
            OrderAdminReponse oap = new OrderAdminReponse();
            oap.setId(ep.getId());
            oap.setName(ep.getName());
            oap.setEventDate(ep.getEventDate());
            oap.setMinPrice(ep.getMinPrice());
            oap.setTotalSignIn(customerInformationService.sumSignInOfEvent(ep.getId()));
            oap.setConfirmNumber(customerInformationService.countConfirm(ep.getId()));
            result.add(oap);

        }
        return result;
    }

    //Top 6 sk bán nhiều nhất
    public List<EventReponse> Top6BestSell() {
        List<Object[]> rawResults = eventRepository.findTop6EventsByTotalSold(LocalDate.now(), PageRequest.of(0, 6));
        List<EventReponse> events = new ArrayList<>();

        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setId((UUID) row[0]);
            event.setName((String) row[1]);
            event.setAvatar((String) row[2]);
            event.setLocation((String) row[3]);
            event.setEventDate((LocalDate) row[4]);
            event.setDescription((String) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        return events;
    }

    //Search event
    public List<EventReponse> searchEvent(String month, String year, String name) {
        try {
            int monthI = Integer.parseInt(month);
            int yearI = Integer.parseInt(year);
            List<Object[]> rawResults;
            if (name == null || name.isEmpty()) {
                rawResults = eventRepository.findEventByEventDate(LocalDate.now(), monthI, yearI);
            } else {
                rawResults = eventRepository.findEventByEventDateOrNameContain(LocalDate.now(), monthI, yearI, name);
            }
            List<EventReponse> events = new ArrayList<>();

            for (Object[] row : rawResults) {
                EventReponse event = new EventReponse();
                event.setId((UUID) row[0]);
                event.setName((String) row[1]);
                event.setAvatar((String) row[2]);
                event.setLocation((String) row[3]);
                if (row[4] instanceof java.sql.Date) {
                    event.setEventDate(((java.sql.Date) row[4]).toLocalDate());
                } else if (row[4] instanceof java.sql.Timestamp) {
                    event.setEventDate(((java.sql.Timestamp) row[4]).toLocalDateTime().toLocalDate());
                } else if (row[4] instanceof LocalDate) {
                    event.setEventDate((LocalDate) row[4]);
                } else {
                    throw new IllegalArgumentException("Lỗi:: " + row[4].getClass());
                }
                event.setDescription((String) row[5]);
                event.setMinPrice(row[6] != null ? ((Number) row[6]).doubleValue() : 0.0);

                events.add(event);
            }
            return events;

        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Tháng và Năm cần được validate", e);
        }
    }

    //Filter
    public List<EventReponse> filterEvent(int month, double priceFilter) {
        if (priceFilter == 0.0) {
            priceFilter = 3000000.0;
        }
        List<Object[]> rawResults;
        if (month != 0) {
            rawResults = eventRepository.filterEvent(LocalDate.now(), month, priceFilter);
        } else {
            rawResults = eventRepository.filterEventPrice(LocalDate.now(), priceFilter);
        }
        List<EventReponse> events = new ArrayList<>();

        for (Object[] row : rawResults) {
            EventReponse event = new EventReponse();
            event.setId((UUID) row[0]);
            event.setName((String) row[1]);
            event.setAvatar((String) row[2]);
            event.setLocation((String) row[3]);
            event.setEventDate((LocalDate) row[4]);
            event.setDescription((String) row[5]);
            event.setMinPrice(row[6] != null ? (Double) row[6] : 0.0);
            events.add(event);
        }
        return events;
    }

    //find by Id
    public EventDetailReponse getEventDetail(String id) {
        UUID uuid = UUID.fromString(id);
        EventDetailReponse eventDetailReponse = new EventDetailReponse();

        Event event = eventRepository.findEventById(uuid).orElse(null);
        if (event == null) {
            throw new RuntimeException("Sự kiện không tồn tại!");
        }

        List<PriceEvent> priceEvent = priceEventRepostitory.getPriceEventByIdAndCurrentDate(uuid, LocalDate.now());
        if (priceEvent == null) {
            priceEvent = new ArrayList<>();
        }

        List<EventDetail> details = eventDetailRepository.findEventDetailByEvent_Id(uuid);
        if (details == null) {
            details = new ArrayList<>();
        }

        eventDetailReponse.setId(uuid);
        eventDetailReponse.setName(event.getName());
        eventDetailReponse.setAvatar(event.getAvatar());
        eventDetailReponse.setLocation(event.getLocation());
        eventDetailReponse.setEventDate(event.getEventDate());
        eventDetailReponse.setDescription(event.getDescription());

        // Lấy giá thấp nhất đang bán
        double finalMinPrice = priceEvent.isEmpty() ? 0.0 :
                priceEvent.stream()
                        .map(PriceEvent::getPrice)
                        .min(Double::compare)
                        .orElse(0.0);
        eventDetailReponse.setMinPrice(finalMinPrice);

        for (EventDetail e : details) {
            if (e.getNameImage() == null) continue;
            switch (e.getNameImage()) {
                case "policy" -> eventDetailReponse.setPolicys(e.getUrl());
                case "priceTicket" -> eventDetailReponse.setPrice(e.getUrl());
                case "schedule" -> eventDetailReponse.setSchedule(e.getUrl());
                case "sizeChart" -> eventDetailReponse.setRaceKit(e.getUrl());
                case "award" -> eventDetailReponse.setAward(e.getUrl());
            }
        }

        List<EventPriceReponse> eventPriceReponses = new ArrayList<>();
        for (PriceEvent p : priceEvent) {
            EventPriceReponse eventPriceReponse = new EventPriceReponse();
            eventPriceReponse.setDistance(p.getDistance());
            eventPriceReponse.setDateStart(p.getDateStart());
            eventPriceReponse.setDateFinish(p.getDateFinish());
            eventPriceReponse.setPrice(p.getPrice());
            eventPriceReponse.setName(p.getName());
            eventPriceReponse.setSold(p.getSold());
            eventPriceReponses.add(eventPriceReponse);
        }
        eventDetailReponse.setListPrice(eventPriceReponses);

        return eventDetailReponse;
    }
    //find by Id role Admin
    public EventDetailAdmin getEventDetailAdmin(String id) {
        UUID uuid = UUID.fromString(id);
        EventDetailAdmin eventDetailReponse = new EventDetailAdmin();

        Event event = eventRepository.findEventById(uuid).orElse(null);
        if (event == null) {
            throw new RuntimeException("Sự kiện không tồn tại!");
        }


        List<EventDetail> details = eventDetailRepository.findEventDetailByEvent_Id(uuid);
        if (details == null) {
            details = new ArrayList<>();
        }

        eventDetailReponse.setId(uuid);
        eventDetailReponse.setName(event.getName());
        eventDetailReponse.setAvatar(event.getAvatar());
        eventDetailReponse.setLocation(event.getLocation());
        eventDetailReponse.setEventDate(event.getEventDate());
        eventDetailReponse.setDescription(event.getDescription());

        for (EventDetail e : details) {
            if (e.getNameImage() == null) continue;
            switch (e.getNameImage()) {
                case "policy" -> eventDetailReponse.setPolicys(e.getUrl());
                case "priceTicket" -> eventDetailReponse.setPrice(e.getUrl());
                case "schedule" -> eventDetailReponse.setSchedule(e.getUrl());
                case "sizeChart" -> eventDetailReponse.setRaceKit(e.getUrl());
                case "award" -> eventDetailReponse.setAward(e.getUrl());
            }
        }

        List<PriceEvent> priceEvent = priceEventRepostitory.findPriceEventsByEvent_Id(uuid);
        if (priceEvent == null) {
            priceEvent = new ArrayList<>();
        }

        List<EventPriceRequest> eventPriceRequests = new ArrayList<>();
        for (PriceEvent p : priceEvent) {
            EventPriceRequest eventPriceReponse = new EventPriceRequest();
            eventPriceReponse.setDistance(p.getDistance());
            eventPriceReponse.setDateStart(p.getDateStart());
            eventPriceReponse.setDateFinish(p.getDateFinish());
            eventPriceReponse.setPrice(p.getPrice());
            eventPriceReponse.setName(p.getName());
            eventPriceRequests.add(eventPriceReponse);
        }
        eventDetailReponse.setListPrice(eventPriceRequests);

        return eventDetailReponse;
    }

    //Thong ke giai dau se to chuc theo thang
    public List<DataMonth> eventOrganizeByMonth() {
        List<Object[]> data = eventRepository.thongKeSKDienRaTheoThang();
        List<DataMonth> result = new ArrayList<>();
        for (Object[] row : data) {
            DataMonth re = new DataMonth();
            Integer thang = ((Number) row[0]).intValue();
            Integer number = ((Number) row[1]).intValue();

            re.setMonth(thang);
            re.setNumber(number);
            result.add(re);
        }
        return result;
    }
    public List<Event> eventsAll(){
        return eventRepository.findAll();
    }
    @Transactional
    public boolean updateStatusEvent(UUID idEvent, boolean status) {
        int update = eventRepository.updateStatusEvent(idEvent, status);
        return update > 0;
    }

    public boolean updateEvent(UUID idEvent ,String name,String description,String location,LocalDate date,String urlAvatar) {
        return eventRepository.updateEvent(name,urlAvatar,description,date,location,idEvent) > 0;
    }

    public boolean updateEventNoAvatar(UUID idEvent ,String name,String description,String location,LocalDate date) {
        return eventRepository.updateEventNoAvatar(name,description,date,location,idEvent) > 0;
    }
}
