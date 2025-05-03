package TicketManager.Controller;

import TicketManager.DTO.Reponse.APIReponse;
import TicketManager.DTO.Request.CustomerInformationRequest;
import TicketManager.Entity.CustomerInformation;
import TicketManager.Entity.Event;
import TicketManager.Exception.AppException;
import TicketManager.Service.CustomerInformationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/signUpEvent")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpEvent {

    final CustomerInformationService customerInformationService;

    @PostMapping("/customerInformation")
    public ResponseEntity<APIReponse<UUID>> signUpEvent(@RequestBody CustomerInformationRequest request){
        try {
            CustomerInformation result = customerInformationService.save(request);
            UUID idCustomerSignUp = result.getId();
            return ResponseEntity.ok(APIReponse.<UUID>builder().result(idCustomerSignUp).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<UUID>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<UUID>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }

    }
}
