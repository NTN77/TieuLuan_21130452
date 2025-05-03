package TicketManager.Controller;

import TicketManager.DTO.Reponse.*;
import TicketManager.DTO.Request.EditInformationRequest;
import TicketManager.DTO.Request.EventPriceRequest;
import TicketManager.DTO.Request.EventRequest;
import TicketManager.Entity.Event;
import TicketManager.Entity.EventDetail;
import TicketManager.Entity.PriceEvent;
import TicketManager.Entity.User;
import TicketManager.Enum.ErrorCode;
import TicketManager.Exception.AppException;
import TicketManager.Service.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/admin")
public class AdminController {
    final CustomerInformationService customerInformationService;
    final EventService eventService;
    final PriceEventService priceEventService;
    final EventDetailService eventDetailService;
    final UserService userService;
    final CloudinaryService cloudinaryService;

    //Lấy ra data số lượng đăng ký để làm dashboard
    @GetMapping("/dashboard/dataDashBoard")
    public ResponseEntity<APIReponse<DataDashboard>> dataMonth() {
        try {
            List<DataMonth> dataMonthList = customerInformationService.dataStatistics();
            List<RevenueByMonth> revenueByMonths = customerInformationService.revenueByMonths();
            List<DataMonth> dataEvent = eventService.eventOrganizeByMonth();

            DataDashboard result = new DataDashboard();
            result.setDataMonthList(dataMonthList);
            result.setRevenueByMonths(revenueByMonths);
            result.setDataEvents(dataEvent);
            return ResponseEntity.ok(APIReponse.<DataDashboard>builder().result(result).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<DataDashboard>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<DataDashboard>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    //quyền admin khóa và mở khóa tài khoản
    @PostMapping("/updateStatus")
    public ResponseEntity<APIReponse<Boolean>> updateStatus(@RequestParam String idUser, @RequestParam boolean status) {
        try {
            UUID id = java.util.UUID.fromString(idUser);
            boolean result = userService.updateStatus(id, status);
            return ResponseEntity.ok(APIReponse.<Boolean>builder().result(result).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<Boolean>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<Boolean>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    //quyền admin sửa đổi thông tin
    @PostMapping("/updateInformation")
    public ResponseEntity<APIReponse<Boolean>> updateInformation(@RequestBody EditInformationRequest request) {
        try {
            boolean result = userService.updateInformation(request.getIdUser(), request.getEmail(), request.getNewName(), request.getIdRole());
            return ResponseEntity.ok(APIReponse.<Boolean>builder().result(result).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<Boolean>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<Boolean>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    @GetMapping("/findByUser")
    public ResponseEntity<APIReponse<User>> findByUserById(@RequestParam UUID idUser) {
        try {
            User result = userService.findByUserAdmin(idUser);
            return ResponseEntity.ok(APIReponse.<User>builder().result(result).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<User>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<User>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    @GetMapping("/allEvent")
    public ResponseEntity<APIReponse<List<Event>>> eventAll() {
        try {
            List<Event> events = eventService.eventsAll();
            return ResponseEntity.ok(APIReponse.<List<Event>>builder().result(events).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<Event>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<Event>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    @PostMapping("/updateStatusEvent")
    public ResponseEntity<APIReponse<Boolean>> updateStatusEvent(@RequestParam String idEvent, @RequestParam boolean status) {
        try {
            UUID id = java.util.UUID.fromString(idEvent);
            boolean result = eventService.updateStatusEvent(id, status);
            return ResponseEntity.ok(APIReponse.<Boolean>builder().result(result).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<Boolean>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<Boolean>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    @GetMapping("/eventDetail")
    public ResponseEntity<APIReponse<EventDetailAdmin>> getEventDetail(@RequestParam String id) {
        try {
            EventDetailAdmin event = eventService.getEventDetailAdmin(id);
            return ResponseEntity.ok(APIReponse.<EventDetailAdmin>builder().result(event).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<EventDetailAdmin>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<EventDetailAdmin>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }

    }

    //controller edit Event
    @PostMapping(value = "/editEvent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<APIReponse<Event>> editEventAdmin(@RequestParam("idEvent") UUID idEvent,
                                                            @RequestParam(value = "fileAvatar" , required = false) MultipartFile fileAvatar,
                                                            @RequestParam("name") String name,
                                                            @RequestParam("location") String location,
                                                            @RequestParam("eventDate") LocalDate eventDate,
                                                            @RequestParam("description") String description,
//                                                                       Bảng gia ve
                                                            @RequestParam("ticketStages") String ticketStagesJson,
//                                                                        Ảnh SK
                                                            @RequestPart(value = "priceTicket", required = false) MultipartFile priceTicket,
                                                            @RequestPart(value = "policy", required = false) MultipartFile policy,
                                                            @RequestPart(value = "schedule", required = false) MultipartFile schedule,
                                                            @RequestPart(value = "sizeChart", required = false) MultipartFile sizeChart,
                                                            @RequestPart(value = "award", required = false) MultipartFile award) {
        try {
            Event event = eventService.findById(idEvent);
            boolean setEvent = false;
            if (fileAvatar != null && !fileAvatar.isEmpty()) {
                String imageUrl = cloudinaryService.uploadImage(fileAvatar.getBytes(), idEvent, "avatar");
                setEvent = eventService.updateEvent(idEvent, name, description, location, eventDate, imageUrl);
                if (!setEvent) {
                    throw new AppException(ErrorCode.UPDATE_EVENT_FAILED);
                }
            } else {
                setEvent = eventService.updateEventNoAvatar(idEvent, name, description, location, eventDate);
                if (!setEvent) {
                    throw new AppException(ErrorCode.UPDATE_EVENT_FAILED);
                }
            }

//            //            ảnh sự kiện
            try {
                if (priceTicket != null) {
                    eventDetailService.DeleteEventDetail("priceTicket", idEvent);
                    EventDetail price = eventDetailService.createEventDetail(idEvent, priceTicket, "priceTicket");
                }
                if (policy != null) {
                    eventDetailService.DeleteEventDetail("policy", idEvent);
                    EventDetail policyEvent = eventDetailService.createEventDetail(idEvent, policy, "policy");
                }
                if (schedule != null) {
                    eventDetailService.DeleteEventDetail("schedule", idEvent);
                    EventDetail scheduleEvent = eventDetailService.createEventDetail(idEvent, schedule, "schedule");
                }
                if (sizeChart != null) {
                    eventDetailService.DeleteEventDetail("sizeChart", idEvent);

                    EventDetail sizeChartEvent = eventDetailService.createEventDetail(idEvent, sizeChart, "sizeChart");
                }
                if (award != null) {
                    eventDetailService.DeleteEventDetail("award", idEvent);
                    EventDetail awardEvent = eventDetailService.createEventDetail(idEvent, award, "award");
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(e.getMessage());
            }


//            Giai đoạn bán vé
            List<PriceEvent> priceEvents = priceEventService.findPriceEventByEvent_Id(idEvent);
            if (!priceEvents.isEmpty()) {
                boolean deletePriceEvent = priceEventService.deletePriceEvent(idEvent);
            }
            System.out.println("Danh sách giai đoạn vé:");
            System.out.println("Raw ticketStagesJson: " + ticketStagesJson);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            List<EventPriceRequest> ticketStages = null;
            try {
                ticketStages = objectMapper.readValue(ticketStagesJson, new TypeReference<List<EventPriceRequest>>() {
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
            for (EventPriceRequest stage : ticketStages) {
                System.out.println(stage);
                priceEventService.createPriceEvent(stage, event);
            }
            return ResponseEntity.ok(APIReponse.<Event>builder().result(event).build());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

//  Lấy ra giải chạy cho trang quản lý đơn hàng
    @GetMapping("/orderManagerEvent")
    public ResponseEntity<APIReponse<List<OrderAdminReponse>>> getEventOfOrderManager(){
        try {
            List<OrderAdminReponse> oap = eventService.getAllEventOfOrderManager();
            return ResponseEntity.ok(APIReponse.<List<OrderAdminReponse>>builder().result(oap).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<OrderAdminReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<OrderAdminReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    //Lấy các thông tin đăng ký của giải
    @GetMapping("/allCustomerOfEvent")
    public ResponseEntity<APIReponse<List<CustomerSignInReponse>>> findCustomerOfEvent(@RequestParam("eventId") UUID eventId){
        try {
            List<CustomerSignInReponse> result = customerInformationService.findCustomerInformationByEventId(eventId);
            return ResponseEntity.ok(APIReponse.<List<CustomerSignInReponse>>builder().result(result).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<CustomerSignInReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<CustomerSignInReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

    //Update bib cho người đăng ký khi gửi thông tin
    @PostMapping("/updateBibAndSendMail")
    public ResponseEntity<APIReponse<Boolean>> updateBibAndSendInfor(@RequestParam("idCustomer") UUID idCustomer , @RequestParam("bib") String bib){
        try {
            boolean result = customerInformationService.updateBib(idCustomer,bib);
            return ResponseEntity.ok(APIReponse.<Boolean>builder().result(result).build());
            //Thiếu gửi email
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<Boolean>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<Boolean>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

}
