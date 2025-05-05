package TicketManager.DTO.Request;

import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerSignInRequest {
    String userName,phoneNumber,nationality,country,province,sizeChart,userNameKC,phoneNumberKC,bloodGroup,healthCare;
    boolean gender;
    String identityCard;
    LocalDate birthDate;
    private UUID idUser;
}
