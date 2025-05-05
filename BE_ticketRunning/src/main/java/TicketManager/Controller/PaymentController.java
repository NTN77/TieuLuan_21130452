package TicketManager.Controller;

import TicketManager.DTO.Reponse.APIReponse;
import TicketManager.DTO.Request.CustomerInformationRequest;
import TicketManager.DTO.Request.PaymentDTO;
import TicketManager.Entity.CustomerInformation;
import TicketManager.Entity.Event;
import TicketManager.Entity.User;
import TicketManager.Service.CustomerInformationService;
import TicketManager.Service.EventService;
import TicketManager.Service.MailService;
import TicketManager.Service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Data
@RequiredArgsConstructor
@RequestMapping("/Event/Payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final CustomerInformationService customerInformationService;
    private final EventService eventService;
    final MailService emailService;
    @PostMapping("/vn-pay")
    public APIReponse<PaymentDTO> pay(HttpServletRequest request2, @RequestBody CustomerInformationRequest request) {
        CustomerInformation ci = customerInformationService.save(request);
        return APIReponse.<PaymentDTO>builder().result(paymentService.createVnPayPayment(request2, ci.getId(),ci.getEventId())).build();
    }

    @GetMapping("/vn-pay-callback")
        public APIReponse<PaymentDTO> payCallbackHandler(@RequestParam("customerInformationID") String customerInformationID ,@RequestParam("status") String status) {
        if (status.equals("00")) {
            UUID idCI = UUID.fromString(customerInformationID);
            customerInformationService.setStatus(idCI);
            String subject = "XÁC NHẬN THANH TOÁN THÀNH CÔNG!";
            CustomerInformation ci = customerInformationService.findById(idCI);
            Event event = eventService.findById(ci.getEventId());
            String content = "\uD83C\uDF89 Thanh toán thành công!\n" +
                    "\n" +
                    "Chào "+ci.getUserName() + ",\n" +
                    "\n" +
                    "Bạn đã đăng ký và thanh toán thành công cho sự kiện "+event.getName()+".\n" +
                    "\n" +
                    "Thông tin sự kiện:\n" +
                    "\uD83D\uDD39 Tên sự kiện: "+event.getName()+"\n" +
                    "\uD83D\uDCC5 Ngày tổ chức: "+event.getEventDate()+"\n" +
                    "\uD83D\uDCCD Địa điểm: "+event.getLocation()+"\n" +
                    "\uD83D\uDCB3 Số tiền đã thanh toán: "+ci.getEventPrice()+" VND\n" +
                    "\n" +
                    "Cảm ơn bạn đã đồng hành cùng chúng tôi. Hẹn gặp bạn tại sự kiện!\n" +
                    "\n" +
                    "Trân trọng,\n" +
                    "Ban tổ chức "+event.getName()+"\n";
            emailService.sendEmail(ci.getEmail() , subject,content);
            return APIReponse.<PaymentDTO>builder().result(new PaymentDTO("00", "Success", " tôi trả về nè")).build();
        } else {
            return APIReponse.<PaymentDTO>builder().result(new PaymentDTO("99", "Failed", "")).build();

        }
    }
}
