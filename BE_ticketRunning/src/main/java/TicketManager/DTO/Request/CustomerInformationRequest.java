package TicketManager.DTO.Request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class CustomerInformationRequest {
    String userName,phoneNumber,nationality,country,province,sizeChart,userNameKC,phoneNumberKC,bloodGroup,healthCare;
    @Email(message = "Email_INVALID")
    String email;
    boolean gender;
    String identityCard;
    LocalDate birthDate;
    String eventDistance;
    double eventPrice;
    private UUID eventId;
    boolean status;
    Timestamp createAt;
    private UUID idUser;

}
