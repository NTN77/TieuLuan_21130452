package TicketManager.Controller;

import TicketManager.DTO.Reponse.APIReponse;
import TicketManager.DTO.Reponse.AuthenticationRes;
import TicketManager.DTO.Reponse.IntrospecReponse;
import TicketManager.DTO.Request.IntrospecRequest;
import TicketManager.DTO.Request.UserLoginGG;
import TicketManager.DTO.Request.UserLoginReq;
import TicketManager.Entity.User;
import TicketManager.Exception.AppException;
import TicketManager.Service.UserService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/auth")
public class AuthenticationController {
    private String googleClientId;
    final UserService userService;
    @PostMapping("/token")
    ResponseEntity<APIReponse<AuthenticationRes>> login(@RequestBody UserLoginReq req){
        try {
            AuthenticationRes user = userService.login(req);
            return ResponseEntity.ok(APIReponse.<AuthenticationRes>builder().result(user).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<AuthenticationRes>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<AuthenticationRes>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }
    @PostMapping("/introspect")
    APIReponse<IntrospecReponse> authenticate(@RequestBody IntrospecRequest request) throws ParseException, JOSEException {
        var result = userService.introspec(request);
        return APIReponse.<IntrospecReponse>builder()
                .result(result)
                .build();
    }
    @PostMapping("/loginGG")
    ResponseEntity<APIReponse<AuthenticationRes>> googleLogin(@RequestBody UserLoginGG user) {
        try {
            AuthenticationRes user1 = userService.processOAuthLogin(user);
            return ResponseEntity.ok(APIReponse.<AuthenticationRes>builder().result(user1).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<AuthenticationRes>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<AuthenticationRes>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }

    }

    @PostMapping("/facebook")
    ResponseEntity<APIReponse<AuthenticationRes>> facebookLogin(@RequestBody UserLoginGG user) {
        try {
            AuthenticationRes user1 = userService.processOAuthLogin(user);
            return ResponseEntity.ok(APIReponse.<AuthenticationRes>builder().result(user1).build());
        } catch (AppException ex) {
            return ResponseEntity.status(ex.getErrorCode().getHttpStatus())
                    .body(APIReponse.<AuthenticationRes>builder()
                            .code(ex.getErrorCode().getCode())
                            .message(ex.getErrorCode().getMessage())
                            .build());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(APIReponse.<AuthenticationRes>builder()
                            .code(500)
                            .message("An unexpected error occurred")
                            .build());
        }
    }

}
