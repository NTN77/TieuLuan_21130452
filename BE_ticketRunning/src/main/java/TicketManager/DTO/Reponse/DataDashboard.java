package TicketManager.DTO.Reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DataDashboard {
    private List<DataMonth> dataMonthList;
    private List<RevenueByMonth> revenueByMonths;
    private List<DataMonth> dataEvents;
}
