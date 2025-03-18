package TicketManager.DTO.Request;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EventRequest {
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false, length = 250)
    private String location;
    @Column(nullable = false)
    private LocalDate eventDate;
    @Column(nullable = false)
    private String description;
    private int total;
}
