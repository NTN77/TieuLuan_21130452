package TicketManager.Controller;

import TicketManager.DTO.Reponse.APIReponse;
import TicketManager.DTO.Reponse.EventDetailReponse;
import TicketManager.DTO.Reponse.EventReponse;
import TicketManager.DTO.Request.BTCRequest;
import TicketManager.DTO.Request.EventPriceRequest;
import TicketManager.DTO.Request.EventRequest;
import TicketManager.Entity.BTC;
import TicketManager.Entity.Event;
import TicketManager.Entity.EventDetail;
import TicketManager.Entity.User;
import TicketManager.Exception.AppException;
import TicketManager.Service.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@RequestMapping("/event")
public class EventController {
    final EventService eventService;
    final BTCService btcService;
    final EventDetailService eventDetailService;
    final PriceEventService priceEventService;
    final UserService userService;
    final LogService logService;

    @PostMapping(value = "/createEvent",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIReponse<Event>> createEvent(
            @RequestParam("idAdmin") UUID idAdmin,
            @RequestParam("fileAvatar") MultipartFile fileAvatar,
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("eventDate") LocalDate eventDate,
            @RequestParam("description") String description,
//            Bảng gia ve
            @RequestParam("ticketStages") String ticketStagesJson,
//            Ảnh SK
            @RequestPart(value = "priceTicket", required = false) MultipartFile priceTicket,
            @RequestPart(value = "policy", required = false) MultipartFile policy,
            @RequestPart(value = "schedule", required = false) MultipartFile schedule,
            @RequestPart(value = "sizeChart", required = false) MultipartFile sizeChart,
            @RequestPart(value = "award", required = false) MultipartFile award
            ){
        try {
            EventRequest newEvent = new EventRequest();
            newEvent.setName(name);
            newEvent.setLocation(location);
            newEvent.setEventDate(eventDate);
            newEvent.setDescription(description);
            Event event = eventService.createEvent(fileAvatar, newEvent);

            //            ảnh sự kiện
           try{
               if(priceTicket != null) {
                   EventDetail price = eventDetailService.createEventDetail(event.getId(),priceTicket,"priceTicket");}
               if(policy != null){EventDetail policyEvent = eventDetailService.createEventDetail(event.getId(),policy,"policy");}
               if(schedule != null){EventDetail scheduleEvent = eventDetailService.createEventDetail(event.getId(),schedule,"schedule");}
               if(sizeChart != null){EventDetail sizeChartEvent = eventDetailService.createEventDetail(event.getId(),sizeChart,"sizeChart");}
               if(award != null){EventDetail awardEvent = eventDetailService.createEventDetail(event.getId(),award,"award");}
           }catch (Exception e) {
               e.printStackTrace();
               System.out.println(e.getMessage());
           }
//            Giai đoạn bán vé
            System.out.println("Danh sách giai đoạn vé:");
            System.out.println("Raw ticketStagesJson: " + ticketStagesJson);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            List<EventPriceRequest> ticketStages = null;
            try {
                ticketStages = objectMapper.readValue(ticketStagesJson, new TypeReference<List<EventPriceRequest>>() {});
            } catch (Exception e) {
                e.printStackTrace();
            }
            for (EventPriceRequest stage : ticketStages) {
                System.out.println(stage);
                priceEventService.createPriceEvent(stage,event);
            }
            User u = userService.findUserById(idAdmin);
            logService.saveLog("Thêm Sự Kiện" , u,"Thêm sự kiện có tên: " + event.getName() );
            return ResponseEntity.ok(APIReponse.<Event>builder().result(event).build());

        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<Event>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<Event>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    @GetMapping("/findByName")
    public ResponseEntity<APIReponse<Event>> createUser(@RequestParam String nameEvent) {
        try {
            Event e = eventService.getEventbyName(nameEvent).orElseThrow(() -> new RuntimeException("Không tìm thấy event!"));
            return ResponseEntity.ok(APIReponse.<Event>builder().result(e).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<Event>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<Event>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }
    //Top 6 giải bán chạy nhất
    @GetMapping("/eventTop6Sell")
    public ResponseEntity<APIReponse<List<EventReponse>>> eventTop6Sell() {
        try {
            List<EventReponse> events = eventService.Top6BestSell();
            return ResponseEntity.ok(APIReponse.<List<EventReponse>>builder().result(events).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }
    @GetMapping("/eventHome")
    public ResponseEntity<APIReponse<List<EventReponse>>> eventHome() {
        try {
            List<EventReponse> events = eventService.listTop6EventHome();
            return ResponseEntity.ok(APIReponse.<List<EventReponse>>builder().result(events).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    @GetMapping("/eventAll")
    public ResponseEntity<APIReponse<List<EventReponse>>> eventAll() {
        try {
            List<EventReponse> events = eventService.getAll();
            return ResponseEntity.ok(APIReponse.<List<EventReponse>>builder().result(events).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }
    //Thêm BTC
    @PostMapping(value = "/addBTC")
    public ResponseEntity<APIReponse<BTC>> addBTC(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name) {
        try {
            BTCRequest btc = new BTCRequest();
            btc.setName(name);
            BTC newBtc = btcService.createEvent(file,btc);
            return ResponseEntity.ok(APIReponse.<BTC>builder().result(newBtc).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<BTC>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<BTC>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }
    //Lấy tất cả các BTC sự kiện
    @GetMapping("/BTC")
    public ResponseEntity<APIReponse<List<BTC>>> BTCAll(){
        try {
            List<BTC> btc = btcService.getAll();
            return ResponseEntity.ok(APIReponse.<List<BTC>>builder().result(btc).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<BTC>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<BTC>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }
    //Tìm kiếm
    @GetMapping("/search")
    public ResponseEntity<APIReponse<List<EventReponse>>> searchEvent(@RequestParam String month,@RequestParam String year,@RequestParam String inforFind){
        try {
            List<EventReponse> eventReponses = eventService.searchEvent(month,year,inforFind);
            return ResponseEntity.ok(APIReponse.<List<EventReponse>>builder().result(eventReponses).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }

    }
    //Filter
    @GetMapping("/filter")
    public ResponseEntity<APIReponse<List<EventReponse>>> filter(@RequestParam int month,@RequestParam double priceFilter){
        try {
            List<EventReponse> eventReponses = eventService.filterEvent(month,priceFilter);
            return ResponseEntity.ok(APIReponse.<List<EventReponse>>builder().result(eventReponses).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<EventReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }

    }
    @GetMapping("/eventDetail")
    public ResponseEntity<APIReponse<EventDetailReponse>> getEventDetail(@RequestParam String id){
        try {
            EventDetailReponse event = eventService.getEventDetail(id);
            return ResponseEntity.ok(APIReponse.<EventDetailReponse>builder().result(event).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<EventDetailReponse>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<EventDetailReponse>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }

    }
}
