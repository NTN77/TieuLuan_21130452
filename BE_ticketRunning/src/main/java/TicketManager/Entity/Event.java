package TicketManager.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "Event")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, length = 100)
    private String name;
    private String avatar;
    @Column(nullable = false, length = 250)
    private String location;
    @Column(nullable = false)
    private LocalDate eventDate;
    private boolean status;
    @Column(nullable = false,columnDefinition = "LONGTEXT")
    private String description;
}
