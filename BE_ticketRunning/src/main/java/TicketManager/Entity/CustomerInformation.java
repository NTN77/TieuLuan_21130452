package TicketManager.Entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "CustomerInformation")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerInformation {
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
    @NotNull
    private UUID eventId;
    @NotNull
    boolean status;
    Timestamp createAt;
    @NotNull
    private UUID idUser;
    @Nullable
    String bib;

}
