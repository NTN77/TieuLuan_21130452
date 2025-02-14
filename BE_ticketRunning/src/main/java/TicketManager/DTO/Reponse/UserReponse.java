package TicketManager.DTO.Reponse;

import TicketManager.Entity.Role;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class UserReponse {
    UUID id;
    String username;
    String email;
    LocalDate birthDate;
    boolean status;
    Timestamp createAt, updateAt;
    Role role;
}
