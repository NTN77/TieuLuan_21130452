package TicketManager.Repository;

import TicketManager.Entity.PriceEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface PriceEventRepostitory extends JpaRepository<PriceEvent, UUID> {
//    @Query("SELECT ep FROM PriceEvent ep " +
//            "WHERE ep.event.id IN :eventIds " +
//            "AND ep.dateStart <= :currentDate " +
//            "AND ep.dateFinish >= :currentDate " +
//            "AND ep.price = (SELECT MIN(ep2.price) FROM PriceEvent ep2 " +
//            "WHERE ep2.event.id = ep.event.id " +
//            "AND ep2.dateStart <= :currentDate " +
//            "AND ep2.dateFinish >= :currentDate)")
//    List<PriceEvent> findMinPriceForEachActiveEvent(@Param("currentDate") Date currentDate,
//                                                    @Param("eventIds") List<Long> eventIds);
}
