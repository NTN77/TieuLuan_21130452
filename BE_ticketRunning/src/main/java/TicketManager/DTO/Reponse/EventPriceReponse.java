package TicketManager.DTO.Reponse;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EventPriceReponse {
    @Column(nullable = false, length = 100)
    private String distance;
    private LocalDate dateStart;
    private LocalDate dateFinish;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false)
    private int sold;

}
