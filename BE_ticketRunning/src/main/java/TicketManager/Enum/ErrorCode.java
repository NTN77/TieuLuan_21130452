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
    // Username Group (code 100x)
    USERNAME_CANNOT_BE_BLANK(1000, "Username cannot be blank", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1001, "Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens (e.g., user_name123).", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTED(1002, "Username already exists. Please choose a different username.", HttpStatus.BAD_REQUEST),
    USERNAME_NOT_EXISTED(1003, "Username not found. Please check the username and try again.", HttpStatus.NOT_FOUND),
    // User Group (code 101x)
    USER_EXISTED(1012, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1013, "User not existed", HttpStatus.NOT_FOUND),
    // Password Group (code 103x)
    PASSWORD_CANNOT_BE_BLANK(1030, "Password cannot be blank.", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1031, "Password must be at least 6 characters.", HttpStatus.BAD_REQUEST),
    PASSWORD_EXISTED(1032, "Password is already in use. Please choose a different password.", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_EXISTED(1033, "Password not found. Please check your credentials.", HttpStatus.NOT_FOUND),
    // Email Group (code 102x)
    EMAIL_CANNOT_BE_BLANK(1020, "Email cannot be blank.", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1021, "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1022, "Email already exists. Please use a different email address.", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1023, "Email not found. Please check the email and try again.", HttpStatus.NOT_FOUND),
    // Authentication and Authorization (code 104x),
    UNAUTHENTICATED(1040, "Invalid email or password. Please try again.", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1041, "You do not have permission", HttpStatus.FORBIDDEN),
    UNACCOUNT(1042, "Account no exists", HttpStatus.UNAUTHORIZED),
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
