package TicketManager.Service;

import TicketManager.DTO.Request.EventPriceRequest;
import TicketManager.Entity.Event;
import TicketManager.Entity.PriceEvent;
import TicketManager.Repository.PriceEventRepostitory;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Data
public class PriceEventService {
    final PriceEventRepostitory priceEventRepostitory;
    public PriceEvent createPriceEvent(EventPriceRequest stage, Event event){
        PriceEvent priceEvent = new PriceEvent();
        priceEvent.setPrice(stage.getPrice());
        priceEvent.setEvent(event);
        priceEvent.setDistance(stage.getDistance());
        priceEvent.setDateStart(stage.getDateStart());
        priceEvent.setDateFinish(stage.getDateFinish());
        priceEvent.setName(stage.getName());
        priceEvent.setSold(0);
        return priceEventRepostitory.save(priceEvent);
    }

    public boolean deletePriceEvent(UUID idEvent){
        return priceEventRepostitory.deleteByEventId(idEvent) > 0;
    }

    public List<PriceEvent> findPriceEventByEvent_Id(UUID idEvent){
        return priceEventRepostitory.findPriceEventsByEvent_Id(idEvent);
    }
}
