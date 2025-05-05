package TicketManager.Controller;

import TicketManager.DTO.Reponse.APIReponse;
import TicketManager.DTO.Reponse.CustomerInformationReponse;
import TicketManager.Entity.CustomerInformation;
import TicketManager.Entity.Event;
import TicketManager.Exception.AppException;
import TicketManager.Service.CustomerInformationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@RequestMapping("/information")
public class CustomerInformationController {
    final CustomerInformationService customerInformationService;
    @GetMapping("/listEventSignIn")
    public ResponseEntity<APIReponse<List<CustomerInformationReponse>>> customerInformationList(@RequestParam String idUser){
        try {
            UUID idU = UUID.fromString(idUser);
            List<CustomerInformationReponse> customerInformationList = customerInformationService.listAllSignIn(idU);
            return ResponseEntity.ok(APIReponse.<List<CustomerInformationReponse>>builder().result(customerInformationList).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<List<CustomerInformationReponse>>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<List<CustomerInformationReponse>>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

}
