package TicketManager.DTO.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserLoginReq {
    @NotBlank(message = "Email is required")
    @Email(message = "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).")
    private String email;
    @Size(min = 6, message = "Password must be at least 6 characters long.")
    private String password;
}
