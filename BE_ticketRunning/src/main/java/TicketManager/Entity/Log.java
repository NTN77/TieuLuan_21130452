package TicketManager.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "Log")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String action;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    User idUser;
    LocalDateTime createAt;
    String detail;
}
