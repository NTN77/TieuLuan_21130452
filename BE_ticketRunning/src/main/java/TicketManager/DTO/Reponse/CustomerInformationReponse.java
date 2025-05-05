package TicketManager.DTO.Reponse;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
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
public class CustomerInformationReponse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @NotNull
    String userName,phoneNumber,nationality,country,province,sizeChart,userNameKC,phoneNumberKC,bloodGroup,healthCare;
    @Email(message = "Email_INVALID")
    String email;
    @NotNull
    String identityCard;
    @NotNull
    boolean gender;
    @NotNull
    LocalDate birthDate;
    @NotNull
    String eventDistance;
    @NotNull
    double eventPrice;
//    @NotNull
//    private UUID eventId;
    @NotNull
    boolean status;
    Timestamp createAt;
    @NotNull
    String eventName;
}
