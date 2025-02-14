package TicketManager.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String username, password;
    @Email(message = "Email_INVALID")
    String email;
    LocalDate birthDate;
    boolean status;
    Timestamp createAt, updateAt;
    @ManyToOne
    @JoinColumn(name = "role_id")
    Role role;
}
