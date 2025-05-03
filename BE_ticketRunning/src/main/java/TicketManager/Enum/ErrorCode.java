package TicketManager.Enum;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    // Birthday
    BIRTHDAY_CANNOT_BE_BLANK(2000, "Birthday cannot be blank.", HttpStatus.BAD_REQUEST),
    BIRTHDAY_CANNOT_FUTURE (2001, "Ngày Sinh không thể ở tương lai!.", HttpStatus.BAD_REQUEST),

    // Username Group (code 100x)
    USERNAME_CANNOT_BE_BLANK(1000, "Username cannot be blank", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1001, "Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens (e.g., user_name123).", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTED(1002, "Tên đã tồn tại! Hãy chọn tên khác.", HttpStatus.BAD_REQUEST),
    USERNAME_NOT_EXISTED(1003, "Tên không tồn tại. Hãy kiểm tra lại tên.", HttpStatus.NOT_FOUND),

    // User Group (code 101x)
    USER_EXISTED(1012, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1013, "User not existed", HttpStatus.NOT_FOUND),
    // Password Group (code 103x)
    PASSWORD_CANNOT_BE_BLANK(1030, "Password không được bỏ trống", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1031, "Password must be at least 6 characters.", HttpStatus.BAD_REQUEST),
    PASSWORD_EXISTED(1032, "Password is already in use. Please choose a different password.", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_EXISTED(1033, "Password not found. Please check your credentials.", HttpStatus.NOT_FOUND),
    // Email Group (code 102x)
    EMAIL_CANNOT_BE_BLANK(1020, "Email cannot be blank.", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1021, "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1022, "Email đã tồn tại!", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1023, "Email không tồn tại! Hãy dùng email khác và thử lại.", HttpStatus.NOT_FOUND),
    // Authentication and Authorization (code 104x),
    UNAUTHENTICATED(1040, "Email không tồn tại!.", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATEDPW(1041, "Mật khẩu không chính xác!.", HttpStatus.UNAUTHORIZED),
    BLOCKACCOUNT(1042, "Tài Khoản đã bị khóa!.", HttpStatus.FORBIDDEN),


    UNAUTHORIZED(1041, "You do not have permission", HttpStatus.FORBIDDEN),
    UNACCOUNT(1042, "Tài khoản đã tồn tại!", HttpStatus.UNAUTHORIZED),
//    Error EVENT
    NAME_EVENT_EXIST(3001,"Tên sự kiện đã tồn tại!", HttpStatus.BAD_REQUEST),
    UPDATE_EVENT_FAILED(3002,"Chỉnh sửa sự kiện thất bại!", HttpStatus.UNPROCESSABLE_ENTITY),
    DELETE_EVENT_FAILED(3003,"Xóa sự kiện thất bại!", HttpStatus.UNPROCESSABLE_ENTITY),

    //    Error BTC
    NAME_BTC_EXIST(4001,"Tên ban tổ chức đã tồn tại!",HttpStatus.BAD_REQUEST),
    ;
    int code;
    String message;
    HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
