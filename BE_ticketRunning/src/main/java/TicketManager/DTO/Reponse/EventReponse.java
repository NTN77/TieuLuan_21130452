package TicketManager.DTO.Reponse;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EventReponse {
    private UUID id;
    @Column(nullable = false, length = 100)
    private String name;
    private String avatar;
    @Column(nullable = false, length = 250)
    private String location;
    @Column(nullable = false)
    private LocalDate eventDate;
    @Column(nullable = false,columnDefinition = "LONGTEXT")
    private String description;
    private double minPrice;
}
