package TicketManager.DTO.Reponse;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EventDetailReponse {
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

    private String policys;
    private String price;
    private String schedule;
    private String award;
    private String raceKit;

    private List<EventPriceReponse> listPrice;
}
