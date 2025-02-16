package TicketManager.Controller;

import TicketManager.DTO.Reponse.APIReponse;
import TicketManager.DTO.Reponse.AuthenticationRes;
import TicketManager.DTO.Request.UserCreateRequest;
import TicketManager.DTO.Request.UserLoginReq;
import TicketManager.Entity.User;
import TicketManager.Exception.AppException;
import TicketManager.Service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@RequestMapping("/user")
public class UserController {
   final UserService userService;
    @PostMapping
    ResponseEntity<APIReponse<AuthenticationRes>> createUser(@RequestBody UserCreateRequest request){
        try {
            AuthenticationRes user = userService.createUser(request);
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
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<APIReponse<Boolean>> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(APIReponse.<Boolean>builder().result(true).build());
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
    //findALl User (Role = ADMIN)
    @GetMapping("/allUser")
    APIReponse<List<User>> allUser(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        authentication.getAuthorities().forEach(grantedAuthority -> System.out.println(grantedAuthority.getAuthority()));
        return APIReponse.<List<User>>builder()
                .result(userService.listUser())
                .build();
    }
    //find User By Id
    @PostMapping("/{id}")
    public ResponseEntity<APIReponse<User>> findUserById(@PathVariable String id) {
        try {
            User user = userService.findUserById(id);
            return ResponseEntity.ok(APIReponse.<User>builder().result(user).build());
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
    @PostMapping("/my-info")
    APIReponse<User> getMyInfo() {
        return APIReponse.<User>builder().result(userService.getInfor()).build();
    }
}
